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

import type { CrabTableInstanceType, IAccessor } from '@crabtable/core';
import { DocumentFlavor, ICrabTableInstanceService } from '@crabtable/core';
import { Observable } from 'rxjs';

export function getMenuHiddenObservable(
    accessor: IAccessor,
    targetUniverType: CrabTableInstanceType,
    matchUnitId?: string,
    needHideUnitId?: string | string[]
): Observable<boolean> {
    const crabtableInstanceService = accessor.get(ICrabTableInstanceService);

    return new Observable((subscriber) => {
        const subscription = crabtableInstanceService.focused$.subscribe((unitId) => {
            if (unitId == null) {
                return subscriber.next(true);
            }
            if (matchUnitId && matchUnitId !== unitId) {
                return subscriber.next(true);
            }

            if (needHideUnitId && (Array.isArray(needHideUnitId) ? needHideUnitId.includes(unitId) : needHideUnitId === unitId)) {
                return subscriber.next(true);
            }
            const univerType = crabtableInstanceService.getUnitType(unitId);

            subscriber.next(univerType !== targetUniverType);
        });

        const focusedUniverInstance = crabtableInstanceService.getFocusedUnit();

        if (focusedUniverInstance == null) {
            return subscriber.next(true);
        }

        const univerType = crabtableInstanceService.getUnitType(focusedUniverInstance.getUnitId());
        subscriber.next(univerType !== targetUniverType);

        return () => subscription.unsubscribe();
    });
}

export function getHeaderFooterMenuHiddenObservable(
    accessor: IAccessor
): Observable<boolean> {
    const crabtableInstanceService = accessor.get(ICrabTableInstanceService);

    return new Observable((subscriber) => {
        const subscription = crabtableInstanceService.focused$.subscribe((unitId) => {
            if (unitId == null) {
                return subscriber.next(true);
            }
            const docDataModel = crabtableInstanceService.getUniverDocInstance(unitId);
            const documentFlavor = docDataModel?.getSnapshot().documentStyle.documentFlavor;

            subscriber.next(documentFlavor !== DocumentFlavor.TRADITIONAL);
        });

        const docDataModel = crabtableInstanceService.getCurrentUniverDocInstance();

        if (docDataModel == null) {
            return subscriber.next(true);
        }

        const documentFlavor = docDataModel?.getSnapshot().documentStyle.documentFlavor;
        subscriber.next(documentFlavor !== DocumentFlavor.TRADITIONAL);

        return () => subscription.unsubscribe();
    });
}
