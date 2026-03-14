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
import { IRenderManagerService } from '@crabtable/engine-render';
import { useDependency, useObservable } from '@crabtable/ui';
import { useMemo } from 'react';
import { map, merge, of, startWith } from 'rxjs';
import { SheetSkeletonManagerService } from '../services/sheet-skeleton-manager.service';

export function useActiveWorkbook(): Workbook | null {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const workbook = useObservable(() => crabtableInstanceService.getCurrentTypeOfUnit$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET), undefined, undefined, []);
    return workbook ?? null;
}

export function useActiveWorksheet(workbook?: Workbook | null) {
    const worksheet = useObservable(() => workbook?.activeSheet$ ?? of(null), undefined, undefined, [workbook]);
    return worksheet;
}

export function useWorkbooks(): Workbook[] {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    return useObservable(() => {
        return merge([
            crabtableInstanceService.getTypeOfUnitAdded$(CrabTableInstanceType.CRABTABLE_SHEET),
            crabtableInstanceService.getTypeOfUnitDisposed$(CrabTableInstanceType.CRABTABLE_SHEET),
        ]).pipe(
            map(() => crabtableInstanceService.getAllUnitsForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET)),
            startWith(crabtableInstanceService.getAllUnitsForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET))
        );
    }, [], undefined, [crabtableInstanceService]);
}

export function useSheetSkeleton() {
    const renderManagerService = useDependency(IRenderManagerService);
    const workbook = useActiveWorkbook();

    const { sheetSkeletonManagerService } = useMemo(() => {
        if (workbook) {
            const ru = renderManagerService.getRenderById(workbook.getUnitId());
            return {
                sheetSkeletonManagerService: ru?.with(SheetSkeletonManagerService),
            };
        }

        return { sheetSkeletonManagerService: null };
    }, [workbook, renderManagerService]);

    return sheetSkeletonManagerService;
}
