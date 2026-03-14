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

import type { SlideDataModel, Workbook } from '@crabtable/core';
import {
    CrabTableInstanceType,
    IContextService,
    ICrabTableInstanceService,
    RxDisposable,
} from '@crabtable/core';
import { IRenderManagerService } from '@crabtable/engine-render';
import { takeUntil } from 'rxjs';

/**
 * This controller is responsible for managing units of a specific kind to be rendered on the canvas.
 */
export class SlideRenderService extends RxDisposable {
    // private _skeletonChangeMutations = new Set<string>();

    constructor(
        @IContextService private readonly _contextService: IContextService,
        @ICrabTableInstanceService private readonly _instanceSrv: ICrabTableInstanceService,
        @IRenderManagerService private readonly _renderManagerService: IRenderManagerService
    ) {
        super();

        // It should be initialized after all other plugins are ready.
        Promise.resolve().then(() => this._init());
    }

    private _init() {
        this._initSlideDataListener();
        this._initContextListener();
    }

    private _initSlideDataListener(): void {
        this._instanceSrv.getTypeOfUnitAdded$<Workbook>(CrabTableInstanceType.CRABTABLE_SLIDE)
            .pipe(takeUntil(this.dispose$))
            .subscribe((slideModel) => {
                // TODO when does this function get called?
                this._createRenderer(slideModel?.getUnitId());
            });

        this._instanceSrv.getAllUnitsForType<SlideDataModel>(CrabTableInstanceType.CRABTABLE_SLIDE).forEach((slideModel) => {
            this._createRenderer(slideModel.getUnitId());
        });

        this._instanceSrv.getTypeOfUnitDisposed$<Workbook>(CrabTableInstanceType.CRABTABLE_SLIDE)
            .pipe(takeUntil(this.dispose$))
            .subscribe((workbook) => this._disposeRenderer(workbook));
    }

    private _createRenderer(unitId: string): void {
        if (unitId == null) {
            return;
        }

        const model = this._instanceSrv.getUnit(unitId, CrabTableInstanceType.CRABTABLE_SLIDE);
        if (model == null) {
            return;
        }

        this._renderManagerService.createRender(unitId);
    }

    private _disposeRenderer(workbook: Workbook): void {
        const unitId = workbook.getUnitId();
        this._renderManagerService.removeRender(unitId);
    }

    private _initContextListener(): void {
        // If we toggle the raw formula, we need to refresh all spreadsheets.
        // this._contextService.subscribeContextValue$(RENDER_RAW_FORMULA_KEY)
        //     .pipe(distinctUntilChanged(), takeUntil(this.dispose$))
        //     .subscribe(() => {
        //         this._renderManagerService.getRenderAll().forEach((renderer) => {
        //             if (renderer.mainComponent instanceof Spreadsheet) {
        //                 (renderer.mainComponent as Spreadsheet).makeForceDirty(true);
        //             }
        //         });
        //     });
    }
}
