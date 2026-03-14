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

import type { IAccessor } from '@crabtable/core';
import type { IMenuButtonItem } from '@crabtable/ui';
import { CrabTableInstanceType } from '@crabtable/core';
import { RangeProtectionPermissionEditPoint, WorkbookEditablePermission, WorksheetEditPermission, WorksheetSetCellStylePermission, WorksheetSetCellValuePermission } from '@crabtable/sheets';
import { getCurrentRangeDisable$ } from '@crabtable/sheets-ui';
import { getMenuHiddenObservable, MenuItemType } from '@crabtable/ui';
import { ToggleScriptPanelOperation } from '../commands/operations/panel.operation';

export function UniscriptMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: ToggleScriptPanelOperation.id,
        title: 'toggle-script-panel',
        tooltip: 'script-panel.tooltip.menu-button',
        icon: 'CodeIcon',
        type: MenuItemType.BUTTON,
        // FIXME hidden$ and disabled$ are not correctly in doc
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_SHEET),
        disabled$: getCurrentRangeDisable$(accessor, { workbookTypes: [WorkbookEditablePermission], worksheetTypes: [WorksheetEditPermission, WorksheetSetCellStylePermission, WorksheetSetCellValuePermission], rangeTypes: [RangeProtectionPermissionEditPoint] }),
    };
}
