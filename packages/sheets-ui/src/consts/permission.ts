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

import { UnitAction } from '@univerjs/protocol';

export const CRABTABLE_SHEET_PERMISSION_PLUGIN_NAME = 'CRABTABLE_SHEET_PERMISSION_PLUGIN';
export const CRABTABLE_SHEET_PERMISSION_PANEL = 'CRABTABLE_SHEET_PERMISSION_PANEL';
export const CRABTABLE_SHEET_PERMISSION_USER_PART = 'CRABTABLE_SHEET_PERMISSION_USER_PART';
export const CRABTABLE_SHEET_PERMISSION_PANEL_FOOTER = 'CRABTABLE_SHEET_PERMISSION_PANEL_FOOTER';
export const CRABTABLE_SHEET_PERMISSION_USER_DIALOG = 'CRABTABLE_SHEET_PERMISSION_USER_DIALOG';
export const CRABTABLE_SHEET_PERMISSION_DIALOG = 'CRABTABLE_SHEET_PERMISSION_DIALOG';
export const CRABTABLE_SHEET_PERMISSION_USER_DIALOG_ID = 'CRABTABLE_SHEET_PERMISSION_USER_DIALOG_ID';
export const CRABTABLE_SHEET_PERMISSION_DIALOG_ID = 'CRABTABLE_SHEET_PERMISSION_DIALOG_ID';

export const subUnitPermissionTypeMap: Partial<Record<UnitAction, string>> = {
    [UnitAction.Copy]: 'Copy',
    [UnitAction.SetCellStyle]: 'SetCellStyle',
    [UnitAction.SetCellValue]: 'SetCellValue',
    [UnitAction.SetRowStyle]: 'SetRowStyle',
    [UnitAction.SetColumnStyle]: 'SetColumnStyle',
    [UnitAction.InsertRow]: 'InsertRow',
    [UnitAction.InsertColumn]: 'InsertColumn',
    [UnitAction.InsertHyperlink]: 'InsertHyperlink',
    [UnitAction.DeleteRow]: 'DeleteRow',
    [UnitAction.DeleteColumn]: 'DeleteColumn',
    [UnitAction.Sort]: 'Sort',
    [UnitAction.Filter]: 'Filter',
    [UnitAction.PivotTable]: 'PivotTable',
    [UnitAction.EditExtraObject]: 'EditExtraObject',
};

export const defaultWorksheetUnitActionList: UnitAction[] = [
    UnitAction.Copy,
    UnitAction.SetCellStyle,
    UnitAction.SetCellValue,
    UnitAction.SetRowStyle,
    UnitAction.SetColumnStyle,
    UnitAction.InsertRow,
    UnitAction.InsertColumn,
    UnitAction.InsertHyperlink,
    UnitAction.DeleteRow,
    UnitAction.DeleteColumn,
    UnitAction.Sort,
    UnitAction.Filter,
    UnitAction.PivotTable,
    UnitAction.EditExtraObject,
    UnitAction.View,
];

export const permissionMenuIconKey = 'sheet-permission-menu-icon';
export const permissionDeleteIconKey = 'sheet-permission-delete-icon';
export const permissionEditIconKey = 'sheet-permission-edit-icon';
export const permissionCheckIconKey = 'sheet-permission-check-icon';
export const permissionLockIconKey = 'sheet-permission-lock-icon';
