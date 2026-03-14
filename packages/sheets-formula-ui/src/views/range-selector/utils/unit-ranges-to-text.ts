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

import type { ICrabTableInstanceService, IUnitRangeName, Workbook } from '@crabtable/core';
import { serializeRange, serializeRangeToRefString, serializeRangeWithSheet } from '@crabtable/engine-formula';

export function getSheetIdByName(crabtableInstanceService: ICrabTableInstanceService, unitId: string, name: string) {
    return crabtableInstanceService.getUnit<Workbook>(unitId)?.getSheetBySheetName(name)?.getSheetId() || '';
}
export function getSheetNameById(crabtableInstanceService: ICrabTableInstanceService, unitId: string, sheetId: string) {
    return crabtableInstanceService.getUnit<Workbook>(unitId)?.getSheetBySheetId(sheetId)?.getName() || '';
}

export const unitRangesToText = (ranges: IUnitRangeName[], isNeedSheetName: boolean = false, originSheetName = '', isNeedWorkbookName = false) => {
    if (!isNeedSheetName && !isNeedWorkbookName) {
        return ranges.map((item) => serializeRange(item.range));
    } else {
        return ranges.map((item) => {
            if (isNeedWorkbookName) {
                return serializeRangeToRefString(item);
            }
            if (item.sheetName !== '' && item.sheetName !== originSheetName) {
                return serializeRangeWithSheet(item.sheetName, item.range);
            }
            return serializeRange(item.range);
        });
    }
};
