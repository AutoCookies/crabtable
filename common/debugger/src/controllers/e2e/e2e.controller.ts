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

import type { CrabTable } from '@crabtable/core';
import type { FCrabTable } from '@crabtable/core/facade';
import { awaitTime, CrabTableInstanceType, Disposable, ICrabTableInstanceService, Inject, ThemeService } from '@crabtable/core';
import { DEFAULT_WORKBOOK_DATA_DEMO, DEFAULT_WORKBOOK_DATA_DEMO_DEFAULT_STYLE } from '@crabtable/mockdata';
import { getDefaultDocData } from './data/default-doc';
import { getDefaultWorkbookData } from './data/default-sheet';

const AWAIT_LOADING_TIMEOUT = 5000;
const AWAIT_DISPOSING_TIMEOUT = 5000;

// NOTE: this interface is copied to `e2e/e2e.d.ts`. When you modify this interface, make sure
// the duplication is updated as well.
export interface IE2EControllerAPI {
    loadAndRelease(id: number, loadTimeout?: number, disposeTimeout?: number): Promise<void>;
    loadDefaultSheet(loadTimeout?: number): Promise<void>;
    loadDemoSheet(loadTimeout?: number): Promise<void>;
    loadMergeCellSheet(loadTimeout?: number): Promise<void>;
    loadDefaultStyleSheet(loadTimeout?: number): Promise<void>;
    loadDefaultDoc(loadTimeout?: number,): Promise<void>;
    setDarkMode(darkMode: boolean): void;
    disposeUniver(): Promise<void>;
    disposeCurrSheetUnit(disposeTimeout?: number): Promise<void>;
}

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        E2EControllerAPI: IE2EControllerAPI;
        univer?: CrabTable;
        crabtableAPI?: FCrabTable;
    }
}

/**
 * This controller expose a API on `Window` for the E2E tests.
 */
export class E2EController extends Disposable {
    constructor(
        @ICrabTableInstanceService private readonly _crabtableInstanceService: ICrabTableInstanceService,
        @Inject(ThemeService) private readonly _themeService: ThemeService
    ) {
        super();

        this._initPlugin();
    }

    override dispose(): void {
        // @ts-ignore
        window.E2EControllerAPI = undefined;
    }

    private _initPlugin(): void {
        window.E2EControllerAPI = {
            loadAndRelease: (id, loadTimeout, disposeTimeout) => this._loadAndRelease(id, loadTimeout, disposeTimeout),
            loadDefaultSheet: (loadTimeout) => this._loadDefaultSheet(loadTimeout),
            loadDemoSheet: () => this._loadDemoSheet(),
            loadMergeCellSheet: () => this._loadMergeCellSheet(2000),
            loadDefaultStyleSheet: (loadTimeout) => this._loadDefaultStyleSheet(loadTimeout),
            disposeCurrSheetUnit: (disposeTimeout?: number) => this._disposeDefaultSheetUnit(disposeTimeout),
            setDarkMode: (darkMode) => this._setDarkMode(darkMode),
            loadDefaultDoc: (loadTimeout) => this._loadDefaultDoc(loadTimeout),
            disposeUniver: () => this._disposeUniver(),
        };
    }

    private _setDarkMode(darkMode: boolean): void {
        this._themeService.setDarkMode(darkMode);
    }

    private async _loadAndRelease(releaseId: number, loadingTimeout: number = AWAIT_LOADING_TIMEOUT, disposingTimeout: number = AWAIT_DISPOSING_TIMEOUT): Promise<void> {
        const unitId = `e2e${releaseId}`;
        const snapshot = getDefaultWorkbookData();
        snapshot.id = unitId;

        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, snapshot);
        await awaitTime(loadingTimeout);

        this._crabtableInstanceService.disposeUnit(unitId);
        await awaitTime(disposingTimeout);
    }

    private async _loadDefaultSheet(loadingTimeout: number = AWAIT_LOADING_TIMEOUT): Promise<void> {
        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, getDefaultWorkbookData());
        await awaitTime(loadingTimeout);
    }

    private async _loadDemoSheet(): Promise<void> {
        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, DEFAULT_WORKBOOK_DATA_DEMO);
        await awaitTime(AWAIT_LOADING_TIMEOUT);
    }

    /**
     * sheet-003 in default data
     */
    private async _loadMergeCellSheet(loadingTimeout: number = AWAIT_LOADING_TIMEOUT): Promise<void> {
        const data = { ...DEFAULT_WORKBOOK_DATA_DEMO };
        data.sheetOrder = ['sheet-0003'];
        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, data);
        await awaitTime(loadingTimeout);
    }

    private async _loadDefaultStyleSheet(loadingTimeout: number = AWAIT_LOADING_TIMEOUT): Promise<void> {
        const data = { ...DEFAULT_WORKBOOK_DATA_DEMO_DEFAULT_STYLE };
        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, data);
        await awaitTime(loadingTimeout);
    }

    private async _loadDefaultDoc(loadingTimeout: number = AWAIT_LOADING_TIMEOUT): Promise<void> {
        this._crabtableInstanceService.createUnit(CrabTableInstanceType.CRABTABLE_DOC, getDefaultDocData());
        await awaitTime(loadingTimeout);
    }

    private async _disposeUniver(): Promise<void> {
        window.univer?.dispose();
        window.univer = undefined;
        window.crabtableAPI = undefined;
    }

    private async _disposeDefaultSheetUnit(disposingTimeout: number = AWAIT_DISPOSING_TIMEOUT): Promise<void> {
        const unit = this._crabtableInstanceService.getCurrentUnitForType(CrabTableInstanceType.CRABTABLE_SHEET);
        const unitId = unit?.getUnitId();
        await this._crabtableInstanceService.disposeUnit(unitId || '');
        await awaitTime(disposingTimeout);
    }
}
