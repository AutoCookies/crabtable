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

import type { IAccessor, IMutation } from '@crabtable/core';
import { CommandType, ICrabTableInstanceService } from '@crabtable/core';
import { getSheetMutationTarget } from '../commands/utils/target-util';

export interface ISetWorksheetRowCountMutationParams {
    unitId: string;
    subUnitId: string;
    rowCount: number;
}

export const SetWorksheetRowCountUndoMutationFactory = (
    accessor: IAccessor,
    params: ISetWorksheetRowCountMutationParams
): ISetWorksheetRowCountMutationParams => {
    const target = getSheetMutationTarget(accessor.get(ICrabTableInstanceService), params);
    if (!target) {
        throw new Error('[SetWorksheetRowCountUndoMutationFactory]: worksheet is null error!');
    }

    return {
        unitId: params.unitId,
        subUnitId: params.subUnitId,
        rowCount: target.worksheet.getRowCount(),
    };
};

export const SetWorksheetRowCountMutation: IMutation<ISetWorksheetRowCountMutationParams> = {
    id: 'sheet.mutation.set-worksheet-row-count',
    type: CommandType.MUTATION,
    handler: (accessor, params) => {
        const crabtableInstanceService = accessor.get(ICrabTableInstanceService);
        const target = getSheetMutationTarget(crabtableInstanceService, params);
        if (!target) return false;

        target.worksheet.setRowCount(params.rowCount);

        return true;
    },
};
