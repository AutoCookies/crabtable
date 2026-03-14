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

import type { ICrabTableInstanceService, Nullable, Workbook, Worksheet } from '@crabtable/core';
import { CrabTableInstanceType } from '@crabtable/core';

export function getSheetCommandTargetWorkbook(crabtableInstanceService: ICrabTableInstanceService, params: { unitId?: string }): Nullable<{
    workbook: Workbook;
    unitId: string;
}> {
    const { unitId } = params;
    const workbook = unitId
        ? crabtableInstanceService.getUnit<Workbook>(unitId, CrabTableInstanceType.CRABTABLE_SHEET)
        : crabtableInstanceService.getCurrentUnitOfType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);

    if (!workbook) return null;

    return {
        workbook,
        unitId: workbook.getUnitId(),
    };
}

export interface IResult {
    workbook: Workbook;
    worksheet: Worksheet;
    unitId: string;
    subUnitId: string;
}

/**
 * Get targeted Workbook & Worksheet of a command. If `unitId` and `subUnitId` are given, the function would
 * try to get these instances. If not, it would try to get the current active instances.
 *
 * @param crabtableInstanceService
 * @param params - unitId and subUnitId
 * @param params.unitId - The unitId of the Workbook
 * @param params.subUnitId - The subUnitId of the Worksheet
 * @returns Targeted Workbook & Worksheet
 */
export function getSheetCommandTarget(crabtableInstanceService: ICrabTableInstanceService, params: { unitId?: string; subUnitId?: string } = {}): Nullable<IResult> {
    const { unitId, subUnitId } = params;

    const workbook = unitId
        ? crabtableInstanceService.getUnit<Workbook>(unitId, CrabTableInstanceType.CRABTABLE_SHEET)
        : crabtableInstanceService.getCurrentUnitOfType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
    if (!workbook) return null;

    const worksheet = subUnitId ? workbook.getSheetBySheetId(subUnitId) : workbook.getActiveSheet(true);
    if (!worksheet) return null;

    return {
        worksheet,
        workbook,
        unitId: workbook.getUnitId(),
        subUnitId: worksheet.getSheetId(),
    };
}

export function getSheetMutationTarget(crabtableInstanceService: ICrabTableInstanceService, params: { unitId: string; subUnitId: string }): Nullable<Pick<IResult, 'workbook' | 'worksheet'>> {
    const { unitId, subUnitId } = params;

    const workbook = crabtableInstanceService.getUnit<Workbook>(unitId, CrabTableInstanceType.CRABTABLE_SHEET);
    if (!workbook) return null;

    const worksheet = workbook.getSheetBySheetId(subUnitId);
    if (!worksheet) return null;

    return {
        worksheet,
        workbook,
    };
}
