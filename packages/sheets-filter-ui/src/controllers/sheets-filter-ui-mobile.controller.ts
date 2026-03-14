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

import type { Dependency } from '@crabtable/core';
import { CrabTableInstanceType, Inject, RxDisposable } from '@crabtable/core';
import { IRenderManagerService } from '@crabtable/engine-render';
import { ReCalcSheetsFilterMutation, RemoveSheetsFilterMutation, SetSheetsFilterCriteriaMutation, SetSheetsFilterRangeMutation } from '@crabtable/sheets-filter';
import { SheetsRenderService } from '@crabtable/sheets-ui';
import { SheetsFilterRenderController } from '../views/render-modules/sheets-filter.render-controller';

export class SheetsFilterUIMobileController extends RxDisposable {
    constructor(
        @IRenderManagerService private readonly _renderManagerService: IRenderManagerService,
        @Inject(SheetsRenderService) private _sheetsRenderService: SheetsRenderService
    ) {
        super();

        [
            SetSheetsFilterRangeMutation,
            SetSheetsFilterCriteriaMutation,
            RemoveSheetsFilterMutation,
            ReCalcSheetsFilterMutation,
        ].forEach((m) => this.disposeWithMe(this._sheetsRenderService.registerSkeletonChangingMutations(m.id)));

        this.disposeWithMe(this._renderManagerService.registerRenderModule(
            CrabTableInstanceType.CRABTABLE_SHEET,
            [SheetsFilterRenderController] as Dependency
        ));
    }
}
