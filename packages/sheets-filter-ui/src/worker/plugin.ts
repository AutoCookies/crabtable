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

import type { Dependency } from '@crabtable/core';
import { CrabTableInstanceType, Inject, Injector, Plugin } from '@crabtable/core';
import { fromModule, IRPCChannelService } from '@crabtable/rpc';
import pkg from '../../package.json';
import { ISheetsGenerateFilterValuesService, SHEETS_GENERATE_FILTER_VALUES_SERVICE_NAME, SheetsGenerateFilterValuesService } from './generate-filter-values.service';

export class UniverSheetsFilterUIWorkerPlugin extends Plugin {
    static override type = CrabTableInstanceType.CRABTABLE_SHEET;
    static override pluginName: string = 'SHEET_FILTER_UI_WORKER_PLUGIN';
    static override packageName = pkg.name;
    static override version = pkg.version;

    constructor(
        private readonly _config: unknown,
        @Inject(Injector) protected readonly _injector: Injector,
        @IRPCChannelService private readonly _rpcChannelService: IRPCChannelService
    ) {
        super();
    }

    override onStarting() {
        ([
            [ISheetsGenerateFilterValuesService, { useClass: SheetsGenerateFilterValuesService }],
        ] as Dependency[]).forEach((d) => this._injector.add(d));
    }

    override onReady(): void {
        this._rpcChannelService.registerChannel(
            SHEETS_GENERATE_FILTER_VALUES_SERVICE_NAME,
            fromModule(this._injector.get(ISheetsGenerateFilterValuesService))
        );
    }
}
