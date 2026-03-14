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

import path from 'node:path';
import { CrabTable, LocaleType } from '@crabtable/core';
import { UniverDataValidationPlugin } from '@crabtable/data-validation';
import { UniverDocsPlugin } from '@crabtable/docs';
import { UniverDocsDrawingPlugin } from '@crabtable/docs-drawing';
import { UniverDrawingPlugin } from '@crabtable/drawing';
import { UniverFormulaEnginePlugin } from '@crabtable/engine-formula';
import zhCN from '@crabtable/mockdata/locales/zh-CN';
import { UniverRPCNodeMainPlugin } from '@crabtable/rpc-node';
import { UniverSheetsPlugin } from '@crabtable/sheets';
import { UniverSheetsConditionalFormattingPlugin } from '@crabtable/sheets-conditional-formatting';
import { UniverSheetsDataValidationPlugin } from '@crabtable/sheets-data-validation';
import { UniverSheetsDrawingPlugin } from '@crabtable/sheets-drawing';
import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFormulaPlugin } from '@crabtable/sheets-formula';
import { UniverSheetsHyperLinkPlugin } from '@crabtable/sheets-hyper-link';
import { UniverSheetsSortPlugin } from '@crabtable/sheets-sort';
import { UniverThreadCommentPlugin } from '@crabtable/thread-comment';

import './facade';

export interface ICreateCrabTableOnNodeOptions {
    useComputingWorker?: boolean;
}

export function createCrabTableOnNode(options: ICreateCrabTableOnNodeOptions = {}): CrabTable {
    const { useComputingWorker = false } = options;

    const univer = new CrabTable({
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: zhCN,
        },
    });

    registerBasicPlugins(univer, useComputingWorker);
    registerSharedPlugins(univer);

    if (useComputingWorker) {
        registerRPCPlugin(univer);
    }

    registerDocPlugins(univer);
    registerSheetPlugins(univer);

    return univer;
}

function registerBasicPlugins(univer: CrabTable, useComputingWorker: boolean): void {
    univer.registerPlugin(UniverFormulaEnginePlugin, { notExecuteFormula: useComputingWorker });
}

function registerSharedPlugins(univer: CrabTable): void {
    univer.registerPlugin(UniverThreadCommentPlugin);
    univer.registerPlugin(UniverDrawingPlugin);
}

function registerDocPlugins(univer: CrabTable): void {
    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsDrawingPlugin);
}

function registerSheetPlugins(univer: CrabTable): void {
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsConditionalFormattingPlugin);
    univer.registerPlugin(UniverDataValidationPlugin);
    univer.registerPlugin(UniverSheetsDataValidationPlugin);
    univer.registerPlugin(UniverSheetsFilterPlugin);
    univer.registerPlugin(UniverSheetsHyperLinkPlugin);
    univer.registerPlugin(UniverSheetsDrawingPlugin);
    univer.registerPlugin(UniverSheetsSortPlugin);
}

function registerRPCPlugin(univer: CrabTable): void {
    const childPath = path.join(__dirname, '../sdk/worker.js');
    univer.registerPlugin(UniverRPCNodeMainPlugin, { workerSrc: childPath });
}
