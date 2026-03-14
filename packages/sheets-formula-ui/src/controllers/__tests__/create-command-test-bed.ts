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

import type { Dependency, IWorkbookData, Workbook } from '@crabtable/core';
import { CrabTableInstanceType, ICrabTableInstanceService, ILogService, Inject, Injector, LocaleType, LogLevel, Plugin } from '@crabtable/core';
import { DocSelectionManagerService } from '@crabtable/docs';
import { EditorService, IEditorService } from '@crabtable/docs-ui';
import { CalculateFormulaService, DefinedNamesService, FormulaCurrentConfigService, FormulaDataModel, FormulaRuntimeService, HyperlinkEngineFormulaService, ICalculateFormulaService, IDefinedNamesService, IFormulaCurrentConfigService, IFormulaRuntimeService, IHyperlinkEngineFormulaService, LexerTreeBuilder } from '@crabtable/engine-formula';
import { IRenderManagerService, RenderManagerService } from '@crabtable/engine-render';
import { DefinedNameDataController, IRefSelectionsService, RangeProtectionRuleModel, SheetInterceptorService, SheetsSelectionsService, WorkbookPermissionService, WorksheetPermissionService, WorksheetProtectionPointModel, WorksheetProtectionRuleModel } from '@crabtable/sheets';
import { EditorBridgeService, IEditorBridgeService, SheetSkeletonManagerService } from '@crabtable/sheets-ui';

const TEST_WORKBOOK_DATA_DEMO: IWorkbookData = {
    id: 'test',
    appVersion: '3.0.0-alpha',
    sheets: {
        sheet1: {
            id: 'sheet1',
            cellData: {
                0: {
                    0: {
                        v: 1,
                    },
                    1: {
                        f: '=SUM(A1)',
                    },
                },
                1: {
                    1: {
                        v: 1,
                    },
                },
                9: {
                    0: {
                        f: '=B10',
                    },
                },
                19: {
                    0: {
                        v: 20,
                    },
                },
                20: {
                    0: {
                        f: '=B21',
                    },
                },
            },
        },
    },
    locale: LocaleType.ZH_CN,
    name: '',
    sheetOrder: [],
    styles: {},
};

export interface ITestBed {
    univer: CrabTable;
    get: Injector['get'];
    has: Injector['has'];
    sheet: Workbook;
}

export function createCommandTestBed(workbookData?: IWorkbookData, dependencies?: Dependency[]): ITestBed {
    const univer = new CrabTable();
    const injector = univer.__getInjector();
    const get = injector.get.bind(injector);
    const has = injector.has.bind(injector);

    class TestPlugin extends Plugin {
        static override pluginName = 'test-plugin';
        static override type = CrabTableInstanceType.CRABTABLE_SHEET;

        private _formulaDataModel: FormulaDataModel | null = null;

        constructor(
            _config: undefined,
            @Inject(Injector) override readonly _injector: Injector
        ) {
            super();
        }

        override onStarting(): void {
            const injector = this._injector;
            injector.add([WorksheetPermissionService]);
            injector.add([WorksheetProtectionPointModel]);
            injector.add([RangeProtectionRuleModel]);
            injector.add([WorkbookPermissionService]);
            injector.add([WorksheetProtectionRuleModel]);
            injector.add([SheetsSelectionsService]);
            injector.add([SheetInterceptorService]);
            injector.add([ICalculateFormulaService, { useClass: CalculateFormulaService }]);
            injector.add([FormulaDataModel]);
            injector.add([LexerTreeBuilder]);
            injector.add([DocSelectionManagerService]);
            injector.add([IDefinedNamesService, { useClass: DefinedNamesService }]);
            injector.add([DefinedNameDataController]);
            injector.add([IHyperlinkEngineFormulaService, { useClass: HyperlinkEngineFormulaService }]);
            injector.add([IFormulaRuntimeService, { useClass: FormulaRuntimeService }]);
            injector.add([IFormulaCurrentConfigService, { useClass: FormulaCurrentConfigService }]);
            injector.add([SheetSkeletonManagerService]);
            injector.add([IEditorBridgeService, { useClass: EditorBridgeService }]);
            injector.add([IEditorService, { useClass: EditorService }]);
            injector.add([IRenderManagerService, { useClass: RenderManagerService }]);
            injector.add([IRefSelectionsService, { useClass: SheetsSelectionsService }]);

            dependencies?.forEach((d) => injector.add(d));

            this._injector.get(SheetInterceptorService);
            this._injector.get(WorkbookPermissionService);
            this._injector.get(WorksheetPermissionService);
            this._injector.get(DefinedNameDataController);
        }

        override onReady(): void {
            this._formulaDataModel = get(FormulaDataModel);
        }
    }

    univer.registerPlugin(TestPlugin);
    const sheet = univer.createUnit<IWorkbookData, Workbook>(CrabTableInstanceType.CRABTABLE_SHEET, workbookData || TEST_WORKBOOK_DATA_DEMO);

    const crabtableInstanceService = injector.get(ICrabTableInstanceService);
    crabtableInstanceService.focusUnit('test');

    const logService = injector.get(ILogService);
    logService.setLogLevel(LogLevel.SILENT); // change this to `LogLevel.VERBOSE` to debug tests via logs

    return {
        univer,
        get,
        has,
        sheet,
    };
}
