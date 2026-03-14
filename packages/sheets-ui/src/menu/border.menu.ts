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
import type { IBorderInfo } from '@crabtable/sheets';
import type { IMenuSelectorItem } from '@crabtable/ui';
import { CrabTableInstanceType, FOCUSING_COMMON_DRAWINGS, ICommandService, IContextService } from '@crabtable/core';
import { BorderStyleManagerService, RangeProtectionPermissionEditPoint, SetBorderBasicCommand, WorkbookEditablePermission, WorksheetEditPermission, WorksheetSetCellStylePermission } from '@crabtable/sheets';
import { getMenuHiddenObservable, MenuItemType } from '@crabtable/ui';
import { combineLatest, map, Observable, startWith } from 'rxjs';

import { BORDER_LINE_CHILDREN, BORDER_PANEL_COMPONENT } from '../components/border-panel/interface';
import { getCurrentRangeDisable$ } from './menu-util';

export function CellBorderSelectorMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<IBorderInfo, IBorderInfo> {
    const borderStyleManagerService = accessor.get(BorderStyleManagerService);

    const disabled$ = getCurrentRangeDisable$(accessor, { workbookTypes: [WorkbookEditablePermission], worksheetTypes: [WorksheetEditPermission, WorksheetSetCellStylePermission], rangeTypes: [RangeProtectionPermissionEditPoint] });

    return {
        id: SetBorderBasicCommand.id,
        icon: new Observable<string>((subscriber) => {
            const defaultIcon = 'AllBorderIcon';
            const borderManager = accessor.get(BorderStyleManagerService);

            const disposable = accessor.get(ICommandService).onCommandExecuted((c) => {
                const id = c.id;
                if (id !== SetBorderBasicCommand.id) {
                    return;
                }

                const { type } = borderManager.getBorderInfo();

                const item = BORDER_LINE_CHILDREN.find((item) => item.value === type);

                const icon = item?.icon ?? defaultIcon;

                subscriber.next(icon);
            });

            subscriber.next(defaultIcon);

            return disposable.dispose;
        }),
        tooltip: 'toolbar.border.main',
        type: MenuItemType.BUTTON_SELECTOR,
        slot: true,
        selections: [
            {
                label: {
                    name: BORDER_PANEL_COMPONENT,
                    hoverable: false,
                    selectable: false,
                },
                value$: borderStyleManagerService.borderInfo$,
            },
        ],
        value$: borderStyleManagerService.borderInfo$,
        hidden$: combineLatest([
            getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_SHEET),
            accessor.get(IContextService).subscribeContextValue$(FOCUSING_COMMON_DRAWINGS).pipe(startWith(false)),
        ]).pipe(map(([hidden, focusingDrawing]) => hidden || focusingDrawing)),
        disabled$,
    };
}
