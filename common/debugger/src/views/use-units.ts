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
import { useDependency, useObservable } from '@crabtable/ui';
import { useEffect, useState } from 'react';

const defaultMenu = [
    {
        label: 'Create another sheet',
        value: 'create',
    },
];

export function useUnits() {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const [menu, setMenu] = useState<{ label: string; value: string }[]>([...defaultMenu]);
    const unitAdded = useObservable(crabtableInstanceService.unitAdded$);
    const unitDisposed = useObservable(crabtableInstanceService.unitDisposed$);

    useEffect(() => {
        const sheets = crabtableInstanceService.getAllUnitsForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
        const options = sheets.map((sheet) => ({
            label: sheet.getName() || sheet.getUnitId(),
            value: sheet.getUnitId(),
        }));

        setMenu([
            ...defaultMenu,
            ...(options as any[]),
        ]);
    }, [unitAdded, unitDisposed]);

    const onSelect = (value: string) => {
        if (value === 'create') {
            crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, {});
        } else {
            if (!crabtableInstanceService.getUnit(value)) return false;
            crabtableInstanceService.setCurrentUnitForType(value);
        }
    };

    return {
        type: 'subItem' as const,
        children: '🪸 Units',
        options: menu.map((item) => ({
            type: 'item' as const,
            children: item.label,
            onSelect: () => onSelect(item.value),
        })),
    };
}
