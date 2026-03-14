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

import { CellValueType, LocaleType, LogLevel, UserManagerService } from '@crabtable/core';
import { FCrabTable } from '@crabtable/core/facade';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsDrawingUIPlugin } from '@crabtable/docs-drawing-ui';
import { UniverDocsMentionUIPlugin } from '@crabtable/docs-mention-ui';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsConditionalFormattingPlugin } from '@crabtable/sheets-conditional-formatting';
import { UniverSheetsDataValidationPlugin } from '@crabtable/sheets-data-validation';
import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsFormulaUIPlugin } from '@crabtable/sheets-formula-ui';
import { UniverSheetsHyperLinkPlugin } from '@crabtable/sheets-hyper-link';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';
import { UniverSheetsSortPlugin } from '@crabtable/sheets-sort';
import { UniverSheetsThreadCommentPlugin } from '@crabtable/sheets-thread-comment';
import { UniverSheetsThreadCommentUIPlugin } from '@crabtable/sheets-thread-comment-ui';
import { UniverSheetsUIPlugin } from '@crabtable/sheets-ui';
import { UniverSheetsZenEditorPlugin } from '@crabtable/sheets-zen-editor';
import { UniverThreadCommentUIPlugin } from '@crabtable/thread-comment-ui';
import { UniverUIPlugin } from '@crabtable/ui';
import { SwitchUnits } from './switch-units';
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
import '@crabtable/sheets-sort/facade';
import '../global.css';

const LOAD_LAZY_PLUGINS_TIMEOUT = 100;
const LOAD_VERY_LAZY_PLUGINS_TIMEOUT = 1_000;

export const mockUser = {
    userID: 'Owner_qxVnhPbQ',
    name: 'Owner',
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
    anonymous: false,
    canBindAnonymous: false,
};

    // univer
const univer = new CrabTable({
    locale: LocaleType.ZH_CN,
    locales: {
        [LocaleType.ZH_CN]: zhCN,
    },
    logLevel: LogLevel.VERBOSE,
});

univer.registerPlugin(UniverDocsPlugin);
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverUIPlugin, {
    container: 'app',
    ribbonType: 'classic',
});
univer.registerPlugin(UniverDocsUIPlugin);
univer.registerPlugin(UniverDocsDrawingUIPlugin);
univer.registerPlugin(UniverDocsMentionUIPlugin);

univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverSheetsNumfmtPlugin);
univer.registerPlugin(UniverSheetsZenEditorPlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);
univer.registerPlugin(UniverSheetsFormulaUIPlugin);
univer.registerPlugin(UniverSheetsDataValidationPlugin);
univer.registerPlugin(UniverSheetsConditionalFormattingPlugin);
univer.registerPlugin(UniverSheetsFilterPlugin);
univer.registerPlugin(UniverSheetsSortPlugin);
univer.registerPlugin(UniverSheetsHyperLinkPlugin);
univer.registerPlugin(UniverThreadCommentUIPlugin);
univer.registerPlugin(UniverSheetsThreadCommentPlugin);
univer.registerPlugin(UniverSheetsThreadCommentUIPlugin);

const injector = univer.__getInjector();
const userManagerService = injector.get(UserManagerService);
userManagerService.setCurrentUser(mockUser);

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
    window.univer = undefined;
    window.crabtableAPI = undefined;
});

window.univer = univer;
window.crabtableAPI = FCrabTable.newAPI(univer);

const crabtableAPI = window.crabtableAPI;

crabtableAPI.createWorkbook({
    id: 'workbook1',
    sheetOrder: ['sheet-01'],
    resources: [
    ],
    sheets: {
        'sheet-01': {
            id: 'sheet-01',
            name: 'Sheet 01',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                0: {
                    1: { t: CellValueType.NUMBER, v: 10 },
                },
                5: {
                    0: {
                    },
                },
            },
        },
        'sheet-02': {
            id: 'sheet-02',
            name: 'foobar',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                5: {
                    0: {
                    },
                },
            },
        },
    },
});

crabtableAPI.createWorkbook(
    {
        id: 'workbook2',
        sheetOrder: ['sheet-01'],
        sheets: {
            'sheet-01': {
                id: 'sheet-01',
                name: 'Sheet 01',
                rowCount: 20,
                columnCount: 40,
                cellData: {
                    0: {
                        0: { v: 1 },
                        1: { v: 2 },
                    },
                    1: {
                        0: { v: 3 },
                        1: { v: 4 },
                    },
                    5: {
                        0: {
                        },
                    },
                },
            },
            'sheet-02': {
                id: 'sheet-02',
                name: 'foobar',
                rowCount: 20,
                columnCount: 40,
                cellData: {
                    5: {
                        0: {
                        },
                    },
                },
            },
        },
    },
    {
        makeCurrent: false,
    }
);

crabtableAPI.createWorkbook({
    id: 'workbook3',
    sheetOrder: ['sheet-01'],
    sheets: {
        'sheet-01': {
            id: 'sheet-01',
            name: 'Sheet 01',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                0: {
                    0: { v: 1 },
                    1: { v: 2 },
                },
                1: {
                    0: { v: 3 },
                    1: { v: 4 },
                },
                5: {
                    0: {
                        f: "='[workbook1]Sheet 01'!A5 * '[workbook2]Sheet 01'!A5 * '[workbook3]Sheet 01'!A5* '[workbook4]Sheet 01'!A5",
                    },
                },
            },
        },
        'sheet-02': {
            id: 'sheet-02',
            name: 'foobar',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                5: {
                    0: {
                    },
                },
            },
        },
    },
});

crabtableAPI.createWorkbook({
    id: 'workbook4',
    sheetOrder: ['sheet-01'],
    sheets: {
        'sheet-01': {
            id: 'sheet-01',
            name: 'Sheet 01',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                0: {
                    0: { v: 1 },
                    1: { v: 2 },
                },
                1: {
                    0: { v: 3 },
                    1: { v: 4 },
                },
                5: {
                    0: {
                        f: "='[workbook1]Sheet 01'!A5 * '[workbook2]Sheet 01'!A5 * '[workbook3]Sheet 01'!A5* '[workbook4]Sheet 01'!A5",
                    },
                },
            },
        },
        'sheet-02': {
            id: 'sheet-02',
            name: 'foobar',
            rowCount: 20,
            columnCount: 40,
            cellData: {
                5: {
                    0: {
                    },
                },
            },
        },
    },
});

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        univer?: CrabTable;
        crabtableAPI?: ReturnType<typeof FCrabTable.newAPI>;
    }
}

crabtableAPI.registerUIPart(
    crabtableAPI.Enum.BuiltInUIPart.CUSTOM_HEADER,
    SwitchUnits
);
