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

import type { DocumentDataModel, ICrabTableInstanceService, Nullable } from '@crabtable/core';
import type { DocBackground, Documents, Engine, IRenderContext, IRenderManagerService, Scene } from '@crabtable/engine-render';
import { CrabTableInstanceType } from '@crabtable/core';
import { DOCS_VIEW_KEY } from './docs-view-key';

export interface IDocObjectParam {
    document: Documents;
    docBackground: DocBackground;
    scene: Scene;
    engine: Engine;
}

export function neoGetDocObject(renderContext: IRenderContext<DocumentDataModel>) {
    const { mainComponent, scene, engine, components } = renderContext;
    const document = mainComponent as Documents;
    const docBackground = components.get(DOCS_VIEW_KEY.BACKGROUND) as DocBackground;

    return {
        document,
        docBackground,
        scene,
        engine,
    };
}

/** @deprecated After migrating to `RenderUnit`, use `neoGetDocObject` instead. */
export function getDocObject(
    crabtableInstanceService: ICrabTableInstanceService,
    renderManagerService: IRenderManagerService
): Nullable<IDocObjectParam> {
    const documentModel = crabtableInstanceService.getCurrentUnitOfType(CrabTableInstanceType.CRABTABLE_DOC);
    if (!documentModel) {
        return null;
    }

    const unitId = documentModel.getUnitId();
    const currentRender = renderManagerService.getRenderById(unitId);
    if (currentRender == null) {
        return;
    }

    const { mainComponent, scene, engine, components } = currentRender;
    const document = mainComponent as Documents;
    const docBackground = components.get(DOCS_VIEW_KEY.BACKGROUND) as DocBackground;

    return {
        document,
        docBackground,
        scene,
        engine,
    };
}

export function getDocObjectById(
    unitId: string,
    renderManagerService: IRenderManagerService
): Nullable<IDocObjectParam> {
    const currentRender = renderManagerService.getRenderById(unitId);
    if (currentRender == null) {
        return;
    }

    const { mainComponent, scene, engine, components } = currentRender;
    const document = mainComponent as Documents;
    const docBackground = components.get(DOCS_VIEW_KEY.BACKGROUND) as DocBackground;

    return {
        document,
        docBackground,
        scene,
        engine,
    };
}
