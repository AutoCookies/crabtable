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

import type { Plugin, PluginCtor } from '@crabtable/core';
import { UniverDocsDrawingUIPlugin } from '@crabtable/docs-drawing-ui';
import { UniverDocsMentionUIPlugin } from '@crabtable/docs-mention-ui';
import { UniverSheetsConditionalFormattingUIPlugin } from '@crabtable/sheets-conditional-formatting-ui';
import { UniverSheetsDataValidationUIPlugin } from '@crabtable/sheets-data-validation-ui';
import { UniverSheetsDrawingUIPlugin } from '@crabtable/sheets-drawing-ui';
import { UniverSheetsFilterUIPlugin } from '@crabtable/sheets-filter-ui';
import { UniverSheetsFormulaUIPlugin } from '@crabtable/sheets-formula-ui';
import { UniverSheetsNoteUIPlugin } from '@crabtable/sheets-note-ui';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';
import { UniverSheetsTableUIPlugin } from '@crabtable/sheets-table-ui';
import { UniverSheetsThreadCommentUIPlugin } from '@crabtable/sheets-thread-comment-ui';
import { UniverThreadCommentUIPlugin } from '@crabtable/thread-comment-ui';

export default function getLazyPlugins(): Array<[PluginCtor<Plugin>] | [PluginCtor<Plugin>, unknown]> {
    return [
        [UniverDocsDrawingUIPlugin],
        [UniverDocsMentionUIPlugin],
        [UniverSheetsNumfmtUIPlugin],
        [UniverThreadCommentUIPlugin],
        [UniverSheetsThreadCommentUIPlugin],
        [UniverSheetsNoteUIPlugin],
        [UniverSheetsTableUIPlugin],
        [UniverSheetsFormulaUIPlugin],
        [UniverSheetsDataValidationUIPlugin],
        [UniverSheetsConditionalFormattingUIPlugin],
        [UniverSheetsFilterUIPlugin, { useRemoteFilterValuesGenerator: false }],
        [UniverSheetsDrawingUIPlugin],
    ];
}
