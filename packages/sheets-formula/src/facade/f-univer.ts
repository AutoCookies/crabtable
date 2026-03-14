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

import type { IDisposable } from '@crabtable/core';
import type { IRegisterFunctionParams } from '@crabtable/sheets-formula';
import { debounce } from '@crabtable/core';
import { FCrabTable } from '@crabtable/core/facade';
import { SetTriggerFormulaCalculationStartMutation } from '@crabtable/engine-formula';
import { IRegisterFunctionService, RegisterFunctionService } from '@crabtable/sheets-formula';

/**
 * @ignore
 */
export interface IFUniverSheetsFormulaMixin {
    /**
     * Register a function to the spreadsheet.
     * @deprecated Use `crabtableAPI.getFormula().registerFunction` instead.
     * @param {IRegisterFunctionParams} config The configuration of the function.
     * @returns {IDisposable} The disposable instance.
     */
    registerFunction(config: IRegisterFunctionParams): IDisposable;
}

/**
 * @ignore
 */
export class FCrabTableSheetsFormulaMixin extends FCrabTable implements IFUniverSheetsFormulaMixin {
    /**
     * RegisterFunction may be executed multiple times, triggering multiple formula forced refreshes.
     */
    declare private _debouncedFormulaCalculation: () => void;

    /**
     * Initialize the FCrabTable instance.
     * @ignore
     */
    override _initialize(): void {
        this._debouncedFormulaCalculation = debounce(() => {
            this._commandService.executeCommand(
                SetTriggerFormulaCalculationStartMutation.id,
                {
                    commands: [],
                    forceCalculation: true,
                },
                {
                    onlyLocal: true,
                }
            );
        }, 10);
    }

    override registerFunction(config: IRegisterFunctionParams): IDisposable {
        let registerFunctionService = this._injector.get(IRegisterFunctionService);

        if (!registerFunctionService) {
            this._injector.add([IRegisterFunctionService, { useClass: RegisterFunctionService }]);
            registerFunctionService = this._injector.get(IRegisterFunctionService);
        }

        const functionsDisposable = registerFunctionService.registerFunctions(config);

        // When the initialization workbook data already contains custom formulas, and then register the formula, you need to trigger a forced calculation to refresh the calculation results
        // TODO@Dushusir: this should be moved to the services not API.
        this._debouncedFormulaCalculation();
        return functionsDisposable;
    }
}

FCrabTable.extend(FUniverSheetsFormulaMixin);
declare module '@crabtable/core/facade' {
    // eslint-disable-next-line ts/naming-convention
    interface FCrabTable extends IFUniverSheetsFormulaMixin {}
}
