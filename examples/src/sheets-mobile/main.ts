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

import type { FCrabTable } from '@crabtable/core/facade';
import { CrabTableInstanceType, LocaleType, LogLevel, UserManagerService } from '@crabtable/core';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import { DEFAULT_WORKBOOK_DATA_DEMO } from '@crabtable/mockdata';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverRPCMainThreadPlugin } from '@crabtable/rpc';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsConditionalFormattingMobileUIPlugin } from '@crabtable/sheets-conditional-formatting-ui';
import { UniverSheetsDataValidationPlugin } from '@crabtable/sheets-data-validation';
import { UniverSheetsDataValidationMobileUIPlugin } from '@crabtable/sheets-data-validation-ui';
import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFilterMobileUIPlugin } from '@crabtable/sheets-filter-ui';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsFormulaUIPlugin } from '@crabtable/sheets-formula-ui';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';

import { UniverSheetsMobileUIPlugin } from '@crabtable/sheets-ui';
import { UniverMobileUIPlugin } from '@crabtable/ui';
import '../global.css';

// univer
const univer = new CrabTable({
    locale: LocaleType.ZH_CN,
    locales: {
        [LocaleType.ZH_CN]: zhCN,
    },
    logLevel: LogLevel.VERBOSE,
});

univer.registerPlugin(UniverFormulaEnginePlugin);

// core plugins
univer.registerPlugin(UniverDocsPlugin);
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverMobileUIPlugin, {
    container: 'app',
});

const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
univer.registerPlugin(UniverRPCMainThreadPlugin, { workerURL: worker });
univer.onDispose(() => worker.terminate());

univer.registerPlugin(UniverDocsUIPlugin);
univer.registerPlugin(UniverSheetsPlugin);

univer.registerPlugin(UniverSheetsMobileUIPlugin);
univer.registerPlugin(UniverSheetsFilterPlugin);
univer.registerPlugin(UniverSheetsFilterMobileUIPlugin);
univer.registerPlugin(UniverSheetsNumfmtPlugin);
univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);
univer.registerPlugin(UniverSheetsFormulaUIPlugin);
univer.registerPlugin(UniverSheetsConditionalFormattingMobileUIPlugin);
univer.registerPlugin(UniverSheetsDataValidationPlugin);
univer.registerPlugin(UniverSheetsDataValidationMobileUIPlugin);

const mockUser = {
    userID: 'Owner_qxVnhPbQ',
    name: 'Owner',
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
    anonymous: false,
    canBindAnonymous: false,
};

const injector = univer.__getInjector();
const userManagerService = injector.get(UserManagerService);
userManagerService.setCurrentUser(mockUser);

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        univer?: CrabTable;
        crabtableAPI?: ReturnType<typeof FCrabTable.newAPI>;
    }
}

univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, DEFAULT_WORKBOOK_DATA_DEMO);
