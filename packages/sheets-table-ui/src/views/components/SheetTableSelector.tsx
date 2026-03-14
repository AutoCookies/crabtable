/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ITableSelectionInfo } from '../../commands/operations/open-table-selector.operation';
import { ICrabTableInstanceService, LocaleService, Rectangle } from '@crabtable/core';
import { Button } from '@crabtable/design';
import { deserializeRangeWithSheet, serializeRange } from '@crabtable/engine-formula';
import { getSheetCommandTarget } from '@crabtable/sheets';
import { RangeSelector } from '@crabtable/sheets-formula-ui';
import { TableManager } from '@crabtable/sheets-table';
import { useDependency } from '@crabtable/ui';
import { useState } from 'react';

export const SheetTableSelector = (props: ITableSelectionInfo & {
    onConfirm: (info: ITableSelectionInfo) => void;
    onCancel: () => void;
}) => {
    const { unitId, subUnitId, range, onCancel, onConfirm, tableId } = props;

    const tableManager = useDependency(TableManager);
    const [selectedRange, setSelectedRange] = useState(range);
    const [rangeError, setRangeError] = useState('');
    const localeService = useDependency(LocaleService);
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);

    return (
        <>
            <RangeSelector
                maxRangeCount={1}
                unitId={unitId}
                subUnitId={subUnitId}
                initialValue={serializeRange(range)}
                onChange={(_, text) => {
                    const originValue = serializeRange(range);
                    const newRange = deserializeRangeWithSheet(text).range;
                    const target = getSheetCommandTarget(crabtableInstanceService, { unitId, subUnitId });
                    if (!target) {
                        return;
                    }
                    const worksheet = target.worksheet;
                    const merges = worksheet.getMergeData();
                    const hasOverlapWithMerge = merges.some((merge) => {
                        return Rectangle.intersects(newRange, merge);
                    });

                    if (hasOverlapWithMerge) {
                        setRangeError(localeService.t('sheets-table.tableRangeWithMergeError'));
                        return;
                    }

                    const hasOverlapWithOtherTable = tableManager.getTablesBySubunitId(unitId, subUnitId).some((table) => {
                        if (table.getId() === tableId) {
                            return false;
                        }
                        const tableRange = table.getRange();
                        return Rectangle.intersects(newRange, tableRange);
                    });

                    if (hasOverlapWithOtherTable) {
                        setRangeError(localeService.t('sheets-table.tableRangeWithOtherTableError'));
                        return;
                    }
                    const { startRow, endRow } = newRange;
                    const isSingleRow = startRow === endRow;
                    if (isSingleRow) {
                        setRangeError(localeService.t('sheets-table.tableRangeSingleRowError'));
                        return;
                    }

                    if (originValue === text) {
                        return;
                    }

                    if (tableId) {
                        const table = tableManager.getTableById(unitId, tableId);
                        if (table) {
                            const oldRange = table.getRange();
                            if (Rectangle.intersects(newRange, oldRange) && oldRange.startRow === newRange.startRow) {
                                setSelectedRange(newRange);
                                setRangeError('');
                                onConfirm({
                                    unitId,
                                    subUnitId,
                                    range: newRange,
                                });
                                return;
                            } else {
                                setRangeError(localeService.t('sheets-table.updateError'));
                                return;
                            }
                        }
                    }

                    setSelectedRange(newRange);
                    setRangeError('');
                }}
                supportAcrossSheet={false}
            />
            {rangeError && (
                <div className="univer-mt-1 univer-text-xs univer-text-red-500">
                    {rangeError}
                </div>
            )}

            <div className="univer-mt-4 univer-flex univer-justify-end">
                <Button onClick={onCancel}>{localeService.t('sheets-table.cancel')}</Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        if (rangeError) {
                            return;
                        }
                        onConfirm({
                            unitId,
                            subUnitId,
                            range: selectedRange,
                        });
                    }}
                    className="univer-ml-2"
                >
                    {localeService.t('sheets-table.confirm')}
                </Button>
            </div>
        </>
    );
};
