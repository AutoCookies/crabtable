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

import type { ICommandInfo, IExecutionOptions, Nullable, Workbook } from '@crabtable/core';
import type { IFunctionInfo, ISetSuperTableMutationParam, ISetSuperTableMutationSearchParam } from '@crabtable/engine-formula';
import {
    CrabTableInstanceType,
    Disposable,
    ICommandService,
    ICrabTableInstanceService,
    toDisposable,
} from '@crabtable/core';
import { FunctionType, ISuperTableService, RemoveSuperTableMutation, serializeRangeWithSheet, SetSuperTableMutation } from '@crabtable/engine-formula';
import { SetWorksheetActiveOperation } from '@crabtable/sheets';

import { IDescriptionService } from '../services/description.service';

/**
 * header highlight
 * column menu: show, hover and mousedown event
 */
export class SuperTableController extends Disposable {
    private _preUnitId: Nullable<string> = null;

    constructor(
        @IDescriptionService private readonly _descriptionService: IDescriptionService,
        @ICrabTableInstanceService private readonly _crabtableInstanceService: ICrabTableInstanceService,
        @ICommandService private readonly _commandService: ICommandService,
        @ISuperTableService private readonly _superTableService: ISuperTableService

    ) {
        super();

        this._initialize();
    }

    private _initialize() {
        this._descriptionListener();

        this._changeUnitListener();

        this._changeSheetListener();
    }

    private _descriptionListener() {
        toDisposable(
            this._superTableService.update$.subscribe(() => {
                this._registerDescriptions();
            })
        );
    }

    private _changeUnitListener() {
        toDisposable(
            this._crabtableInstanceService.getCurrentTypeOfUnit$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET).subscribe((workbook) => {
                this._unRegisterDescriptions();
                if (workbook) {
                    this._registerDescriptions();
                }
            })
        );
    }

    private _changeSheetListener() {
        this.disposeWithMe(
            this._commandService.onCommandExecuted((command: ICommandInfo, options?: IExecutionOptions) => {
                if (options?.fromCollab) {
                    return;
                }

                if (command.id === SetWorksheetActiveOperation.id) {
                    this._unregisterDescriptionsForNotInSheetId();
                    this._registerDescriptions();
                }
                // Since command interception will supplement mutation, it is necessary to monitor mutation changes here
                // SetDefinedNameMutation and RemoveDefinedNameMutation already cover all possible Defined Name updates
                else if (command.id === SetSuperTableMutation.id) {
                    const param = command.params as ISetSuperTableMutationParam;
                    this._registerDescription(param);
                } else if (command.id === RemoveSuperTableMutation.id) {
                    const param = command.params as ISetSuperTableMutationSearchParam;
                    this._unregisterDescription(param);
                }
            })
        );
    }

    private _registerDescription(param: ISetSuperTableMutationParam) {
        const target = this._getUnitIdAndSheetId(param);
        if (!target) return;

        const { unitId } = target;

        const { tableName, reference } = param;
        if (!this._descriptionService.hasDescription(tableName)) {
            const sheetName = this._crabtableInstanceService.getUnit<Workbook>(unitId)?.getSheetBySheetId(reference.sheetId)?.getName() || '';
            const refString = serializeRangeWithSheet(sheetName, reference.range);
            this._descriptionService.registerDescriptions([{
                functionName: tableName,
                description: refString,
                abstract: refString,
                functionType: FunctionType.Table,
                functionParameter: [],
            }]);
        }
    }

    private _unregisterDescription(param: ISetSuperTableMutationSearchParam) {
        const { tableName } = param;
        this._descriptionService.unregisterDescriptions([tableName]);
    }

    private _unRegisterDescriptions() {
        if (this._preUnitId == null) {
            return;
        }
        const superTables = this._superTableService.getTableMap(this._preUnitId);

        if (superTables == null) {
            return;
        }

        const functionList: string[] = [];
        superTables.forEach((_, tableName) => {
            functionList.push(tableName);
        });

        this._descriptionService.unregisterDescriptions(functionList);

        this._preUnitId = null;
    }

    private _getUnitIdAndSheetId(params: { unitId?: string; subUnitId?: string } = {}) {
        const { unitId, subUnitId } = params;

        const workbook = unitId
            ? this._crabtableInstanceService.getUnit<Workbook>(unitId, CrabTableInstanceType.CRABTABLE_SHEET)
            : this._crabtableInstanceService.getCurrentUnitOfType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
        if (!workbook) return null;

        const worksheet = subUnitId
            ? workbook.getSheetBySheetId(subUnitId)
            : workbook.getActiveSheet(true);
        if (!worksheet) return null;

        return {
            unitId: workbook.getUnitId(),
            sheetId: worksheet.getSheetId(),
        };
    }

    private _registerDescriptions() {
        const target = this._getUnitIdAndSheetId();
        if (!target) return;

        const { unitId } = target;

        const superTables = this._superTableService.getTableMap(unitId);
        if (!superTables) {
            return;
        }

        const functionList: IFunctionInfo[] = [];

        this._preUnitId = unitId;

        superTables.forEach((table, tableName) => {
            const sheetName = this._crabtableInstanceService.getUnit<Workbook>(unitId)?.getSheetBySheetId(table.sheetId)?.getName() || '';
            const refString = serializeRangeWithSheet(sheetName, table.range);
            if (!this._descriptionService.hasDescription(tableName)) {
                functionList.push({
                    functionName: tableName,
                    description: refString,
                    abstract: refString,
                    functionType: FunctionType.Table,
                    functionParameter: [],
                });
            }
        });

        this._descriptionService.registerDescriptions(functionList);
    }

    private _unregisterDescriptionsForNotInSheetId() {
        const target = this._getUnitIdAndSheetId();
        if (!target) return;

        const { unitId } = target;

        const superTables = this._superTableService.getTableMap(unitId);
        if (!superTables) {
            return;
        }

        const functionList: string[] = [];

        superTables.forEach((_, tableName) => {
            functionList.push(tableName);
        });

        this._descriptionService.unregisterDescriptions(functionList);
    }
}
