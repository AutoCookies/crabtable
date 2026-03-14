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
import type { IMenuButtonItem, IMenuSelectorItem } from '@crabtable/ui';
import { CrabTableInstanceType } from '@crabtable/core';
import { RangeProtectionPermissionViewPoint, WorksheetFilterPermission, WorksheetViewPermission } from '@crabtable/sheets';
import { ClearSheetsFilterCriteriaCommand, ReCalcSheetsFilterCommand, SheetsFilterService, SmartToggleSheetsFilterCommand } from '@crabtable/sheets-filter';

import { getCurrentRangeDisable$, getObservableWithExclusiveRange$ } from '@crabtable/sheets-ui';
import { getMenuHiddenObservable, MenuItemType } from '@crabtable/ui';
import { map, of, switchMap } from 'rxjs';

export function SmartToggleFilterMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    const sheetsFilterService = accessor.get(SheetsFilterService);

    return {
        id: SmartToggleSheetsFilterCommand.id,
        type: MenuItemType.BUTTON_SELECTOR,
        icon: 'FilterIcon',
        tooltip: 'sheets-filter.toolbar.smart-toggle-filter-tooltip',
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_SHEET),
        activated$: sheetsFilterService.activeFilterModel$.pipe(map((model) => !!model)),
        disabled$: getObservableWithExclusiveRange$(
            accessor,
            getCurrentRangeDisable$(
                accessor,
                {
                    worksheetTypes: [WorksheetFilterPermission, WorksheetViewPermission],
                    rangeTypes: [RangeProtectionPermissionViewPoint],
                }
            )
        ),
    };
}

export function ClearFilterCriteriaMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    const sheetsFilterService = accessor.get(SheetsFilterService);

    return {
        id: ClearSheetsFilterCriteriaCommand.id,
        type: MenuItemType.BUTTON,
        title: 'sheets-filter.toolbar.clear-filter-criteria',
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_SHEET),
        disabled$: sheetsFilterService.activeFilterModel$.pipe(switchMap((model) => model?.hasCriteria$.pipe(map((m) => !m)) ?? of(true))),
    };
}

export function ReCalcFilterMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    const sheetsFilterService = accessor.get(SheetsFilterService);

    return {
        id: ReCalcSheetsFilterCommand.id,
        type: MenuItemType.BUTTON,
        title: 'sheets-filter.toolbar.re-calc-filter-conditions',
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_SHEET),
        disabled$: sheetsFilterService.activeFilterModel$.pipe(switchMap((model) => model?.hasCriteria$.pipe(map((m) => !m)) ?? of(true))),
    };
}
