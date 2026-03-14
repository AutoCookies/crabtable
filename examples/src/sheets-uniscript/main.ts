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
import { CrabTableDebuggerPlugin } from '@crabtable/debugger';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import { UNISCRIT_WORKBOOK_DATA_DEMO } from '@crabtable/mockdata';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';
import { UniverSheetsUIPlugin } from '@crabtable/sheets-ui';
import { UniverUIPlugin } from '@crabtable/ui';
import { UniverUniscriptPlugin } from '@crabtable/uniscript';

import '../global.css';

/* eslint-disable-next-line node/prefer-global/process */
const IS_E2E: boolean = !!process.env.IS_E2E;

// univer
const univer = new CrabTable({
    locale: LocaleType.ZH_CN,
    locales: {
        [LocaleType.ZH_CN]: zhCN,
    },
    logLevel: LogLevel.VERBOSE,
});

// core plugins
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverUIPlugin, {
    container: 'app',
    ribbonType: 'classic',
});

univer.registerPlugin(UniverDocsPlugin);
univer.registerPlugin(UniverDocsUIPlugin);

univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);

// sheet feature plugins
univer.registerPlugin(UniverSheetsNumfmtPlugin);
univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);
univer.registerPlugin(UniverUniscriptPlugin, {
    getWorkerUrl(_: string, label: string) {
        if (label === 'typescript' || label === 'javascript') {
            return '/vs/language/typescript/ts.worker.js';
        }

        return '/vs/editor/editor.worker.js';
    },
});

// If we are running in e2e platform, we should immediately register the debugger plugin.
if (IS_E2E) {
    univer.registerPlugin(CrabTableDebuggerPlugin, {
        fab: false,
        performanceMonitor: {
            enabled: false,
        },
    });
}

// create univer sheet instance
univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, UNISCRIT_WORKBOOK_DATA_DEMO);

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        univer?: CrabTable;
    }
}

window.univer = univer;
