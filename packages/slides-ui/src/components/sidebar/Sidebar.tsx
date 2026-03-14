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

import type { Nullable, SlideDataModel } from '@crabtable/core';
import type { BaseObject } from '@crabtable/engine-render';
import { CrabTableInstanceType, ICrabTableInstanceService } from '@crabtable/core';
import { ObjectType } from '@crabtable/engine-render';
import { useDependency } from '@crabtable/ui';
import { CanvasView } from '../../controllers/canvas-view';
import ArrangePanel from '../panels/ArrangePanel';
import FillPanel from '../panels/FillPanel';
import TransformPanel from '../panels/TransformPanel';

export const COMPONENT_SLIDE_SIDEBAR = 'COMPONENT_SLIDE_SIDEBAR';

export default function RectSidebar() {
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const canvasView = useDependency(CanvasView);

    const currentSlide = crabtableInstanceService.getCurrentUnitForType<SlideDataModel>(CrabTableInstanceType.CRABTABLE_SLIDE);
    const pageId = currentSlide?.getActivePage()?.id;

    // see packages/sheets-ui/src/views/permission/permission-dialog/index.tsx@SheetPermissionDialog
    // see packages/sheets-conditional-formatting-ui/src/components/panel/rule-edit/index.tsx@getUnitId
    // const unitId = crabtableInstanceService.getCurrentUnitForType(CrabTableInstanceType.CRABTABLE_SLIDE)!.getUnitId();
    const unitId = crabtableInstanceService.getFocusedUnit()?.getUnitId() || '';

    if (!pageId || !unitId) return null;

    const page = canvasView.getRenderUnitByPageId(pageId, unitId);
    const transformer = page.scene?.getTransformer();

    if (!transformer) return null;

    const selectedObjects = transformer.getSelectedObjectMap();

    const object = selectedObjects.values().next().value as Nullable<BaseObject>;
    if (!object) {
        return null;
    }

    return (
        <section className="univer-p-2 univer-text-center univer-text-sm">
            <ArrangePanel pageId={pageId} unitId={unitId} />
            <TransformPanel pageId={pageId} unitId={unitId} />
            {object.objectType === ObjectType.RECT && <FillPanel pageId={pageId} unitId={unitId} />}
        </section>
    );
}
