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

import type { DocumentDataModel } from '@crabtable/core';
import type { ISetTextSelectionsOperationParams } from '@crabtable/docs';
import { CrabTableInstanceType, Disposable, ICommandService, ICrabTableInstanceService, Inject } from '@crabtable/core';
import { SetTextSelectionsOperation } from '@crabtable/docs';
import { DocHyperLinkPopupService } from '../services/hyper-link-popup.service';

export class DocHyperLinkSelectionController extends Disposable {
    constructor(
        @ICommandService private readonly _commandService: ICommandService,
        @ICrabTableInstanceService private readonly _crabtableInstanceService: ICrabTableInstanceService,
        @Inject(DocHyperLinkPopupService) private readonly _docHyperLinkService: DocHyperLinkPopupService
    ) {
        super();

        this._initSelectionChange();
    }

    private _initSelectionChange() {
        this.disposeWithMe(
            this._commandService.onCommandExecuted((commandInfo) => {
                if (commandInfo.id === SetTextSelectionsOperation.id) {
                    const params = commandInfo.params as ISetTextSelectionsOperationParams;
                    const { unitId, ranges, segmentId } = params;

                    const doc = this._crabtableInstanceService.getUnit<DocumentDataModel>(unitId, CrabTableInstanceType.CRABTABLE_DOC);
                    const primary = ranges[0];
                    if (primary && doc) {
                        const { startOffset, endOffset, collapsed, segmentPage } = primary;
                        const customRanges = doc.getSelfOrHeaderFooterModel(segmentId)?.getBody()?.customRanges;
                        if (collapsed) {
                            // cursor
                            const index = customRanges?.findIndex((value) => (value.startIndex) < startOffset && value.endIndex > endOffset - 1) ?? -1;
                            if (index > -1) {
                                const customRange = customRanges![index];
                                this._docHyperLinkService.showInfoPopup({ unitId, linkId: customRange.rangeId, segmentId, segmentPage, startIndex: customRange.startIndex, endIndex: customRange.endIndex });
                                return;
                            }
                        } else {
                            // range
                            const range = customRanges?.find((value) => value.startIndex <= startOffset && value.endIndex >= (endOffset - 1));
                            if (range) {
                                return;
                            }
                        }
                    }

                    this._docHyperLinkService.hideInfoPopup();
                    this._docHyperLinkService.hideEditPopup();
                }
            })
        );
    }
}
