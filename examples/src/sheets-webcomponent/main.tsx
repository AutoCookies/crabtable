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

import { CrabTableInstanceType, LocaleType, LogLevel } from '@crabtable/core';
import { FCrabTable } from '@crabtable/core/facade';
import { render } from '@crabtable/design';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import { DEFAULT_WORKBOOK_DATA_DEMO } from '@crabtable/mockdata';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverNetworkPlugin } from '@crabtable/network';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsConditionalFormattingPlugin } from '@crabtable/sheets-conditional-formatting';
import { UniverSheetsConditionalFormattingUIPlugin } from '@crabtable/sheets-conditional-formatting-ui';
import { UniverSheetsCrosshairHighlightPlugin } from '@crabtable/sheets-crosshair-highlight';
import { UniverSheetsDataValidationPlugin } from '@crabtable/sheets-data-validation';
import { UniverSheetsDataValidationUIPlugin } from '@crabtable/sheets-data-validation-ui';
import { UniverSheetsDrawingPlugin } from '@crabtable/sheets-drawing';
import { UniverSheetsDrawingUIPlugin } from '@crabtable/sheets-drawing-ui';
import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFilterUIPlugin } from '@crabtable/sheets-filter-ui';
import { UniverSheetsFindReplacePlugin } from '@crabtable/sheets-find-replace';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsFormulaUIPlugin } from '@crabtable/sheets-formula-ui';
import { UniverSheetsHyperLinkPlugin } from '@crabtable/sheets-hyper-link';
import { UniverSheetsHyperLinkUIPlugin } from '@crabtable/sheets-hyper-link-ui';
import { UniverSheetsNotePlugin } from '@crabtable/sheets-note';
import { UniverSheetsNoteUIPlugin } from '@crabtable/sheets-note-ui';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';
import { UniverSheetsSortPlugin } from '@crabtable/sheets-sort';
import { UniverSheetsSortUIPlugin } from '@crabtable/sheets-sort-ui';
import { UniverSheetsTablePlugin } from '@crabtable/sheets-table';
import { UniverSheetsTableUIPlugin } from '@crabtable/sheets-table-ui';
import { UniverSheetsThreadCommentPlugin } from '@crabtable/sheets-thread-comment';
import { UniverSheetsThreadCommentUIPlugin, UniverThreadCommentUIPlugin } from '@crabtable/sheets-thread-comment-ui';
import { UniverSheetsUIPlugin } from '@crabtable/sheets-ui';
import { UniverSheetsZenEditorPlugin } from '@crabtable/sheets-zen-editor';
import { UniverThreadCommentPlugin } from '@crabtable/thread-comment';
import { UniverUIPlugin } from '@crabtable/ui';
import { UniverVue3AdapterPlugin } from '@crabtable/ui-adapter-vue3';
import { UniverWebComponentAdapterPlugin } from '@crabtable/ui-adapter-web-component';
import { UniverWatermarkPlugin } from '@crabtable/watermark';
import { createComponent } from '@lit/react';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import * as React from 'react';
import '../global.css';
import '@crabtable/sheets/facade';

@customElement('my-univer')
class MyWebComponent extends LitElement {
    override firstUpdated() {
        const container = this.renderRoot.querySelector('#containerId') as HTMLDivElement;

        const univer = new CrabTable({
            locale: LocaleType.ZH_CN,
            locales: {
                [LocaleType.ZH_CN]: zhCN,
            },
            logLevel: LogLevel.VERBOSE,
        });
        // basic plugins
        univer.registerPlugin(UniverNetworkPlugin);
        univer.registerPlugin(UniverFormulaEnginePlugin);
        univer.registerPlugin(UniverRenderEnginePlugin);
        univer.registerPlugin(UniverUIPlugin, {
            container,
            ribbonType: 'classic',
        });
        // docs plugin
        univer.registerPlugin(UniverDocsPlugin);
        univer.registerPlugin(UniverDocsUIPlugin);
        // sheets plugin
        univer.registerPlugin(UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUIPlugin);
        // sheet feature plugins
        univer.registerPlugin(UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
        univer.registerPlugin(UniverSheetsFormulaPlugin);
        univer.registerPlugin(UniverSheetsFormulaUIPlugin);
        // sheet drawing plugins
        univer.registerPlugin(UniverSheetsDrawingPlugin);
        univer.registerPlugin(UniverSheetsDrawingUIPlugin);
        // sheet conditional formatting plugins
        univer.registerPlugin(UniverSheetsConditionalFormattingPlugin);
        univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin);
        // sheet data validation plugins
        univer.registerPlugin(UniverSheetsDataValidationPlugin);
        univer.registerPlugin(UniverSheetsDataValidationUIPlugin);
        // sheet filter plugins
        univer.registerPlugin(UniverSheetsFilterPlugin);
        univer.registerPlugin(UniverSheetsFilterUIPlugin);
        // sheet sort plugins
        univer.registerPlugin(UniverSheetsSortPlugin);
        univer.registerPlugin(UniverSheetsSortUIPlugin);
        // sheet hyperlink plugins
        univer.registerPlugin(UniverSheetsHyperLinkPlugin);
        univer.registerPlugin(UniverSheetsHyperLinkUIPlugin);
        // sheet table plugins
        univer.registerPlugin(UniverSheetsTablePlugin);
        univer.registerPlugin(UniverSheetsTableUIPlugin);
        // sheet note plugins
        univer.registerPlugin(UniverSheetsNotePlugin);
        univer.registerPlugin(UniverSheetsNoteUIPlugin);
        // sheet thread comment plugins
        univer.registerPlugin(UniverThreadCommentPlugin);
        univer.registerPlugin(UniverThreadCommentUIPlugin);
        univer.registerPlugin(UniverSheetsThreadCommentPlugin);
        univer.registerPlugin(UniverSheetsThreadCommentUIPlugin);
        // sheet find and replace plugins
        univer.registerPlugin(UniverSheetsFindReplacePlugin);
        // zen editor plugin
        univer.registerPlugin(UniverSheetsZenEditorPlugin);
        // crosshair highlight plugin
        univer.registerPlugin(UniverSheetsCrosshairHighlightPlugin);
        // watermark plugin
        univer.registerPlugin(UniverWatermarkPlugin);
        // adapter plugins
        univer.registerPlugin(UniverWebComponentAdapterPlugin);
        univer.registerPlugin(UniverVue3AdapterPlugin);

        univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, DEFAULT_WORKBOOK_DATA_DEMO);

        window.crabtableAPI = FCrabTable.newAPI(univer);
    }

    override render() {
        return html`
            <link rel="stylesheet" href="./main.css">
            <div style="height: 100%;" id="containerId" />
        `;
    }
}

const App = createComponent({
    tagName: 'my-univer',
    elementClass: MyWebComponent,
    react: React,
    events: {
        onMyEvent: 'my-event',
    },
});

render(<App />, document.getElementById('app')!);
