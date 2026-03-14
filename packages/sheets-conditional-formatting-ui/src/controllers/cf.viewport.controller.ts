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
import { CrabTableInstanceType, Disposable, ICrabTableInstanceService, Inject } from '@crabtable/core';
import { IRenderManagerService } from '@crabtable/engine-render';
import { CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH, ConditionalFormattingViewModel } from '@crabtable/sheets-conditional-formatting';
import { SheetSkeletonManagerService } from '@crabtable/sheets-ui';

export class ConditionalFormattingViewportController extends Disposable {
    constructor(
        @Inject(ConditionalFormattingViewModel) private _conditionalFormattingViewModel: ConditionalFormattingViewModel,
        @ICrabTableInstanceService private _crabtableInstanceService: ICrabTableInstanceService,
        @IRenderManagerService private _renderManagerService: IRenderManagerService
    ) {
        super();
        this._init();
    }

    private _init() {
        const unit = this._crabtableInstanceService.getCurrentUnitForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
        const bindUnit = (unit: Workbook) => {
            const unitId = unit.getUnitId();
            const render = this._renderManagerService.getRenderById(unitId);
            if (!render) {
                return;
            }
            const sheetSkeletonManagerService = render.with(SheetSkeletonManagerService);
            this.disposeWithMe(sheetSkeletonManagerService.currentSkeleton$.subscribe((s) => {
                if (s) {
                    const range = s.skeleton.rowColumnSegment;
                    const col = range.endColumn - range.startColumn + 1;
                    const row = range.endRow - range.startRow + 1;
                    const length = row * col * 9;
                    const result = Math.max(CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH, length);
                    this._conditionalFormattingViewModel.setCacheLength(result);
                }
            }));
        };

        if (unit) {
            bindUnit(unit);
        }
        this._crabtableInstanceService.getCurrentTypeOfUnit$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET).subscribe((unit) => {
            if (!unit) {
                return;
            }
            bindUnit(unit);
        });
    }
}
