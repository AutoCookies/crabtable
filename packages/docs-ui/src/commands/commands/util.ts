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

import type { DocumentDataModel, IAccessor } from '@crabtable/core';
import { BuildTextUtils, CrabTableInstanceType, ICrabTableInstanceService } from '@crabtable/core';
import { DocSelectionManagerService } from '@crabtable/docs';

export function getCurrentParagraph(accessor: IAccessor) {
    const instanceService = accessor.get(ICrabTableInstanceService);
    const docSelectionManagerService = accessor.get(DocSelectionManagerService);
    const range = docSelectionManagerService.getActiveTextRange();
    const doc = instanceService.getCurrentUnitOfType<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC);
    if (!range || !range.collapsed || !doc || range.segmentId) {
        return false;
    }

    const paragraph = BuildTextUtils.range.getParagraphsInRange(range, doc.getBody()?.paragraphs ?? [], doc.getBody()?.dataStream ?? '')[0];
    return paragraph;
}
