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

import { CrabTableInstanceType, LocaleType, LogLevel, UserManagerService } from '@crabtable/core';
import { FCrabTable } from '@crabtable/core/facade';
import { CrabTableDebuggerPlugin } from '@crabtable/debugger';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import { DEFAULT_WORKBOOK_DATA_DEMO } from '@crabtable/mockdata';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverNetworkPlugin } from '@crabtable/network';
import { UniverRPCMainThreadPlugin } from '@crabtable/rpc';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsConditionalFormattingPlugin } from '@crabtable/sheets-conditional-formatting';
import { UniverSheetsDataValidationPlugin } from '@crabtable/sheets-data-validation';
import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsHyperLinkPlugin } from '@crabtable/sheets-hyper-link';
import { UniverSheetsNotePlugin } from '@crabtable/sheets-note';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsSortPlugin } from '@crabtable/sheets-sort';
import { UniverSheetsTablePlugin } from '@crabtable/sheets-table';
import { UniverSheetsThreadCommentPlugin } from '@crabtable/sheets-thread-comment';
import { UniverSheetsUIPlugin } from '@crabtable/sheets-ui';
import { UniverSheetsZenEditorPlugin } from '@crabtable/sheets-zen-editor';
import { UniverUIPlugin } from '@crabtable/ui';

import '@crabtable/sheets/facade';
import '@crabtable/ui/facade';
import '@crabtable/docs-ui/facade';
import '@crabtable/sheets-ui/facade';
import '@crabtable/sheets-data-validation/facade';
import '@crabtable/engine-formula/facade';
import '@crabtable/sheets-filter/facade';
import '@crabtable/sheets-formula/facade';
import '@crabtable/sheets-numfmt/facade';
import '@crabtable/sheets-hyper-link-ui/facade';
import '@crabtable/sheets-thread-comment/facade';
import '@crabtable/sheets-conditional-formatting/facade';
import '@crabtable/sheets-find-replace/facade';
import '@crabtable/sheets-drawing-ui/facade';
import '@crabtable/sheets-zen-editor/facade';
import '@crabtable/sheets-crosshair-highlight/facade';
import '@crabtable/sheets-formula-ui/facade';
import '@crabtable/sheets-table/facade';
import '@crabtable/sheets-sort/facade';
import '@crabtable/network/facade';
import '@crabtable/sheets-note/facade';
import '../global.css';

/* eslint-disable-next-line node/prefer-global/process */
const IS_E2E: boolean = !!process.env.IS_E2E;

const LOAD_LAZY_PLUGINS_TIMEOUT = 100;
const LOAD_VERY_LAZY_PLUGINS_TIMEOUT = 1_000;

export const mockUser = {
    userID: 'Owner_qxVnhPbQ',
    name: 'Owner',
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
    anonymous: false,
    canBindAnonymous: false,
};

// eslint-disable-next-line max-lines-per-function
function createNewInstance() {
    // univer
    const univer = new CrabTable({
        // theme: greenTheme,
        darkMode: localStorage.getItem('local.darkMode') === 'dark',
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: zhCN,
        },
        logLevel: LogLevel.VERBOSE,
    });

    const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    univer.registerPlugin(UniverRPCMainThreadPlugin, { workerURL: worker });

    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
        container: 'app',
        ribbonType: 'classic',
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin, {
        autoHeightForMergedCells: true,
    });
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverSheetsZenEditorPlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin, { writeArrayFormulaToSnapshot: true });
    univer.registerPlugin(UniverSheetsDataValidationPlugin);
    univer.registerPlugin(UniverSheetsConditionalFormattingPlugin);
    univer.registerPlugin(UniverSheetsFilterPlugin);
    univer.registerPlugin(UniverSheetsSortPlugin);
    univer.registerPlugin(UniverSheetsHyperLinkPlugin);
    univer.registerPlugin(UniverSheetsThreadCommentPlugin);

    univer.registerPlugin(UniverSheetsTablePlugin);
    univer.registerPlugin(UniverNetworkPlugin);
    univer.registerPlugin(UniverSheetsNotePlugin);

    // If we are running in e2e platform, we should immediately register the debugger plugin.
    if (IS_E2E) {
        univer.registerPlugin(CrabTableDebuggerPlugin, {
            fab: false,
            performanceMonitor: {
                enabled: false,
            },
        });
    }

    const injector = univer.__getInjector();
    const userManagerService = injector.get(UserManagerService);
    userManagerService.setCurrentUser(mockUser);

    // create univer sheet instance
    if (!IS_E2E) {
        univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, DEFAULT_WORKBOOK_DATA_DEMO);
    }

    setTimeout(() => {
        import('./lazy').then((lazy) => {
            const plugins = lazy.default();
            plugins.forEach((p) => univer.registerPlugin(p[0], p[1]));
        });
    }, LOAD_LAZY_PLUGINS_TIMEOUT);

    setTimeout(() => {
        import('./very-lazy').then((lazy) => {
            const plugins = lazy.default();
            plugins.forEach((p) => univer.registerPlugin(p[0], p[1]));
        });
    }, LOAD_VERY_LAZY_PLUGINS_TIMEOUT);

    univer.onDispose(() => {
        worker.terminate();
        window.univer = undefined;
        window.crabtableAPI = undefined;
    });

    window.univer = univer;
    window.crabtableAPI = FCrabTable.newAPI(univer);
}

createNewInstance();
window.createNewInstance = createNewInstance;

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        univer?: CrabTable;
        crabtableAPI?: ReturnType<typeof FCrabTable.newAPI>;
        createNewInstance?: typeof createNewInstance;
    }
}
