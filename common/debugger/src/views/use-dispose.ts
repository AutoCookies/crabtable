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

import { ICrabTableInstanceService } from '@crabtable/core';
import { useDependency } from '@crabtable/ui';

const menu = [
    {
        label: 'Dispose Univer',
        value: 'univer',
    },
    {
        label: 'Dispose current unit',
        value: 'unit',
    },
];

export function useDispose() {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);

    const onSelect = (value: string) => {
        if (value === 'univer') {
            window.univer?.dispose();
            window.univer = undefined;
            window.crabtableAPI = undefined;
        } else if (value === 'unit') {
            const focused = crabtableInstanceService.getFocusedUnit();
            if (!focused) return false;

            return crabtableInstanceService.disposeUnit(focused.getUnitId());
        }
    };

    return {
        type: 'subItem' as const,
        children: '🗑️ Dispose',
        options: menu.map((item) => ({
            type: 'item' as const,
            children: item.label,
            onSelect: () => onSelect(item.value),
        })),
    };
}
