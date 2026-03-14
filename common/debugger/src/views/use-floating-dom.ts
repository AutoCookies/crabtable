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

import { CrabTableInstanceType, ICrabTableInstanceService } from '@crabtable/core';
import { DocFloatDomController } from '@crabtable/docs-drawing-ui';
import { SheetCanvasFloatDomManagerService } from '@crabtable/sheets-drawing-ui';
import { useDependency } from '@crabtable/ui';

export function useFloatingDom(entryUnitType?: CrabTableInstanceType) {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const floatDomService = entryUnitType === CrabTableInstanceType.CRABTABLE_SHEET ? useDependency(SheetCanvasFloatDomManagerService) : null;
    const floatDomController = entryUnitType === CrabTableInstanceType.CRABTABLE_DOC ? useDependency(DocFloatDomController) : null;

    const onSelect = () => {
        if (entryUnitType === CrabTableInstanceType.CRABTABLE_SHEET) {
            const currentSheet = crabtableInstanceService.getCurrentUnitOfType(CrabTableInstanceType.CRABTABLE_SHEET);
            if (!currentSheet) return;

            floatDomService?.addFloatDomToPosition({
                allowTransform: true,
                initPosition: {
                    startX: 200,
                    endX: 400,
                    startY: 200,
                    endY: 400,
                },
                componentKey: 'ImageDemo',
                data: {
                    aa: '128',
                },
            });
        } else if (entryUnitType === CrabTableInstanceType.CRABTABLE_DOC) {
            const currentDoc = crabtableInstanceService.getCurrentUnitOfType(CrabTableInstanceType.CRABTABLE_DOC);
            if (!currentDoc) return;

            floatDomController?.insertFloatDom({
                allowTransform: true,
                componentKey: 'ImageDemo',
                data: {
                    aa: '128',
                },
            }, {
                height: 300,
            });
        }
    };

    return {
        type: 'item' as const,
        children: '☁️ Create floating DOM',
        onSelect,
    };
}
