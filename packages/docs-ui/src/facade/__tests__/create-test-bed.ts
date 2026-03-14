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

import type { Dependency, DocumentDataModel, IDocumentData } from '@crabtable/core';
import {
    CrabTableInstanceType,
    ICrabTableInstanceService,
    ILogService,
    Inject,
    Injector,
    LocaleService,
    LogLevel,
    Plugin,
} from '@crabtable/core';
import { FCrabTable } from '@crabtable/core/facade';
import { DocSelectionManagerService, DocSkeletonManagerService, DocStateEmitService } from '@crabtable/docs';
import { DocIMEInputManagerService, DocsRenderService, DocStateChangeManagerService } from '@crabtable/docs-ui';
import enUS from '@crabtable/docs-ui/locale/en-US';
import zhCN from '@crabtable/docs-ui/locale/zh-CN';
import { DumbCanvasColorService, ICanvasColorService, IRenderManagerService, RenderManagerService } from '@crabtable/engine-render';

function getTestDocumentDataDemo(): IDocumentData {
    return {
        id: 'test',
        body: {
            dataStream: 'Hello,\r\n',
        },
        documentStyle: {
            pageSize: {
                width: 594.3,
                height: 840.51,
            },
            marginTop: 72,
            marginBottom: 72,
            marginRight: 90,
            marginLeft: 90,
        },
    };
}

export interface ITestBed {
    univer: CrabTable;
    get: Injector['get'];
    doc: DocumentDataModel;
    crabtableAPI: FCrabTable;
}

export function createTestBed(documentConfig?: IDocumentData, dependencies?: Dependency[]): ITestBed {
    const univer = new CrabTable();
    const injector = univer.__getInjector();

    class TestPlugin extends Plugin {
        static override pluginName = 'test-plugin';

        constructor(
            _config: undefined,
            @Inject(Injector) override readonly _injector: Injector
        ) {
            super();
        }

        override onStarting(): void {
            const injector = this._injector;
            injector.add([IRenderManagerService, { useClass: RenderManagerService }]);
            injector.add([DocSelectionManagerService]);
            injector.add([DocStateEmitService]);
            injector.add([DocStateChangeManagerService]);
            injector.add([DocsRenderService]);
            injector.add([ICanvasColorService, { useClass: DumbCanvasColorService }]);

            dependencies?.forEach((d) => injector.add(d));

            const renderManagerService = injector.get(IRenderManagerService);
            renderManagerService.registerRenderModule(CrabTableInstanceType.CRABTABLE_DOC, [DocSkeletonManagerService] as Dependency);
            renderManagerService.registerRenderModule(CrabTableInstanceType.CRABTABLE_DOC, [DocIMEInputManagerService] as Dependency);
        }

        override onReady(): void {
            this._injector.get(DocStateChangeManagerService);
            this._injector.get(DocsRenderService);
        }
    }

    injector.get(LocaleService).load({ zhCN, enUS });

    univer.registerPlugin(TestPlugin);
    const doc = univer.createUnit<IDocumentData, DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC, documentConfig ?? getTestDocumentDataDemo());

    const crabtableInstanceService = injector.get(ICrabTableInstanceService);
    crabtableInstanceService.focusUnit('test');
    const logService = injector.get(ILogService);

    logService.setLogLevel(LogLevel.SILENT);

    const crabtableAPI = FCrabTable.newAPI(injector);

    return {
        univer,
        get: injector.get.bind(injector),
        doc,
        crabtableAPI,
    };
}
