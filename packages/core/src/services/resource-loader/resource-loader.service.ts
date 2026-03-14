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

import type { DocumentDataModel } from '../../docs';
import type { Workbook } from '../../sheets/workbook';
import type { IResourceHook } from '../resource-manager/type';
import type { IResourceLoaderService } from './type';
import { isInternalEditorID } from '../../common/const';
import { Inject } from '../../common/di';
import { CrabTableInstanceType } from '../../common/unit';
import { Tools } from '../../shared';
import { Disposable } from '../../shared/lifecycle';
import { ICrabTableInstanceService } from '../instance/instance.service';
import { IResourceManagerService } from '../resource-manager/type';

export class ResourceLoaderService extends Disposable implements IResourceLoaderService {
    constructor(
        @Inject(IResourceManagerService) private readonly _resourceManagerService: IResourceManagerService,
        @Inject(ICrabTableInstanceService) private readonly _crabtableInstanceService: ICrabTableInstanceService
    ) {
        super();
        this._init();
    }

    private _init() {
        const handleHookAdd = (hook: IResourceHook) => {
            hook.businesses.forEach((business) => {
                switch (business) {
                    case CrabTableInstanceType.UNRECOGNIZED:
                    case CrabTableInstanceType.UNIVER_UNKNOWN:
                    case CrabTableInstanceType.CRABTABLE_SLIDE:
                    case CrabTableInstanceType.CRABTABLE_DOC: {
                        this._crabtableInstanceService.getAllUnitsForType<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC).forEach((doc) => {
                            const snapshotResource = doc.getSnapshot().resources || [];
                            const plugin = snapshotResource.find((r) => r.name === hook.pluginName);
                            if (plugin) {
                                try {
                                    const data = hook.parseJson(plugin.data);
                                    hook.onLoad(doc.getUnitId(), data);
                                } catch (err) {
                                    console.error(`Load Document{${doc.getUnitId()}} Resources{${hook.pluginName}} Data Error.`);
                                }
                            }
                        });
                        break;
                    }
                    case CrabTableInstanceType.CRABTABLE_SHEET: {
                        this._crabtableInstanceService.getAllUnitsForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET).forEach((workbook) => {
                            const snapshotResource = workbook.getSnapshot().resources || [];
                            const plugin = snapshotResource.find((r) => r.name === hook.pluginName);
                            if (plugin) {
                                try {
                                    const data = hook.parseJson(plugin.data);
                                    hook.onLoad(workbook.getUnitId(), data);
                                } catch (err) {
                                    console.error(`Load Workbook{${workbook.getUnitId()}} Resources{${hook.pluginName}} Data Error.`);
                                }
                            }
                        });
                    }
                }
            });
        };

        const allResourceHooks = this._resourceManagerService.getAllResourceHooks();
        allResourceHooks.forEach((hook) => handleHookAdd(hook));

        this.disposeWithMe(this._resourceManagerService.register$.subscribe((hook) => handleHookAdd(hook)));

        this.disposeWithMe(
            this._crabtableInstanceService.getTypeOfUnitAdded$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET).subscribe((workbook) => {
                this._resourceManagerService.loadResources(workbook.getUnitId(), workbook.getSnapshot().resources);
            })
        );
        this.disposeWithMe(
            this._crabtableInstanceService.getTypeOfUnitAdded$<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC).subscribe((doc) => {
                const unitId = doc.getUnitId();
                if (!isInternalEditorID(unitId)) {
                    this._resourceManagerService.loadResources(doc.getUnitId(), doc.getSnapshot().resources);
                }
            })
        );

        // TODO: add slides in the future

        this.disposeWithMe(
            this._crabtableInstanceService.getTypeOfUnitDisposed$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET).subscribe((workbook) => {
                this._resourceManagerService.unloadResources(workbook.getUnitId(), CrabTableInstanceType.CRABTABLE_SHEET);
            })
        );

        this.disposeWithMe(
            this._crabtableInstanceService.getTypeOfUnitDisposed$<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC).subscribe((doc) => {
                this._resourceManagerService.unloadResources(doc.getUnitId(), CrabTableInstanceType.CRABTABLE_DOC);
            })
        );
    }

    saveUnit<T = object>(unitId: string) {
        const unit = this._crabtableInstanceService.getUnit(unitId);
        if (!unit) {
            return null;
        }
        const resources = this._resourceManagerService.getResources(unitId, unit.type);
        const snapshot = Tools.deepClone(unit.getSnapshot()) as { resources: typeof resources } & T;
        snapshot.resources = resources;
        return snapshot;
    }
}
