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

import { CrabTableInstanceType, LocaleType, LogLevel, Tools } from '@crabtable/core';
import { render } from '@crabtable/design';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsUIPlugin } from '@crabtable/docs-ui';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import { UniverRenderEnginePlugin } from '@crabtable/engine-render';
import { DEFAULT_WORKBOOK_DATA_DEMO } from '@crabtable/mockdata';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsFormulaUIPlugin } from '@crabtable/sheets-formula-ui';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@crabtable/sheets-numfmt-ui';
import { UniverSheetsUIPlugin } from '@crabtable/sheets-ui';
import { UniverUIPlugin } from '@crabtable/ui';
import { useEffect } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';

import 'react-mosaic-component/react-mosaic-component.css';

import '../global.css';

function factory(id: string) {
    return function createUniverOnContainer() {
        const univer = new CrabTable({
            locale: LocaleType.ZH_CN,
            locales: {
                [LocaleType.ZH_CN]: zhCN,
            },
            logLevel: LogLevel.VERBOSE,
        });

        univer.registerPlugin(UniverFormulaEnginePlugin);
        univer.registerPlugin(UniverRenderEnginePlugin);
        univer.registerPlugin(UniverUIPlugin, {
            container: id,
            ribbonType: 'classic',
        });
        univer.registerPlugin(UniverDocsPlugin);
        univer.registerPlugin(UniverDocsUIPlugin);

        // sheets plugin
        univer.registerPlugin(UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUIPlugin);
        univer.registerPlugin(UniverSheetsFormulaUIPlugin);
        // sheet feature plugins
        univer.registerPlugin(UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
        univer.registerPlugin(UniverSheetsFormulaPlugin);

        const data = Tools.deepClone(DEFAULT_WORKBOOK_DATA_DEMO);
        data.id = id;
        // create univer sheet instance
        univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, data);
    };
}

const TITLE_MAP: Record<ViewId, string> = {
    a: 'Sheet 1',
    b: 'Sheet 2',
    c: 'Sheet 3',
};

export type ViewId = 'a' | 'b' | 'c';

export function App() {
    useEffect(() => {
        factory('app-a')();
        factory('app-b')();
        factory('app-c')();
    }, []);

    return (
        <Mosaic<ViewId>
            renderTile={(id, path) => (
                <MosaicWindow<ViewId>
                    path={path}
                    title={TITLE_MAP[id]}
                    toolbarControls={<div />}
                >
                    <div id={`app-${id}`} className="univer-h-full">
                        {TITLE_MAP[id]}
                    </div>
                </MosaicWindow>
            )}
            initialValue={{
                direction: 'row',
                first: 'a',
                second: {
                    direction: 'column',
                    first: 'b',
                    second: 'c',
                },
            }}
        />
    );
};

render(<App />, document.getElementById('app')!);
