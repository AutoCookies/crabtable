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

import type { Workbook } from '@crabtable/core';
import { CrabTableInstanceType, ICrabTableInstanceService } from '@crabtable/core';
import { SheetsSelectionsService } from '@crabtable/sheets';
import { useDependency } from '@crabtable/ui';
import { useCallback } from 'react';

export const useResetSelection = (isNeed: boolean, unitId: string, subUnitId: string) => {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const sheetsSelectionsService = useDependency(SheetsSelectionsService);

    const resetSelection = useCallback(() => {
        if (isNeed) {
            const selections = [...sheetsSelectionsService.getWorkbookSelections(unitId).getSelectionsOfWorksheet(subUnitId)];
            const workbook = crabtableInstanceService.getCurrentUnitForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
            const currentSheet = workbook?.getActiveSheet();
            if (workbook?.getUnitId() !== unitId) {
                crabtableInstanceService.setCurrentUnitForType(unitId);
            }

            if (currentSheet && currentSheet.getSheetId() === subUnitId) {
                sheetsSelectionsService.setSelections(selections);
            }
        };
    }, [isNeed, sheetsSelectionsService, subUnitId, unitId, crabtableInstanceService]);

    return resetSelection;
};
