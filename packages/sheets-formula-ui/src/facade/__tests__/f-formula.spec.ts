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

import type { Injector } from '@crabtable/core';
import type { FCrabTable } from '@crabtable/core/facade';
import type { IUniverSheetsFormulaBaseConfig } from '@crabtable/sheets-formula';
import { ICommandService, IConfigService } from '@crabtable/core';
import { SetArrayFormulaDataMutation, SetFormulaCalculationNotificationMutation, SetFormulaCalculationResultMutation, SetFormulaCalculationStartMutation, SetFormulaCalculationStopMutation, SetTriggerFormulaCalculationStartMutation } from '@crabtable/engine-formula';
import { CalculationMode, PLUGIN_CONFIG_KEY_BASE } from '@crabtable/sheets-formula';
import { beforeEach, describe, expect, it } from 'vitest';
import { createFormulaTestBed } from './create-formula-test-bed';

describe('Test FFormula', () => {
    let get: Injector['get'];
    let commandService: ICommandService;
    let crabtableAPI: FCrabTable;

    beforeEach(() => {
        const testBed = createFormulaTestBed();
        get = testBed.get;
        crabtableAPI = testBed.crabtableAPI;

        commandService = get(ICommandService);
        commandService.registerCommand(SetFormulaCalculationStartMutation);
        commandService.registerCommand(SetTriggerFormulaCalculationStartMutation);
        commandService.registerCommand(SetFormulaCalculationStopMutation);
        commandService.registerCommand(SetFormulaCalculationNotificationMutation);
        commandService.registerCommand(SetFormulaCalculationResultMutation);
        commandService.registerCommand(SetArrayFormulaDataMutation);
    });

    it('FFormula executeCalculation', () => {
        const formula = crabtableAPI.getFormula();

        formula.calculationStart((forceCalculate) => {
            expect(forceCalculate).toBe(true);
        });

        formula.calculationProcessing((stageInfo) => {
            expect(stageInfo).toBeDefined();
        });

        formula.calculationEnd((functionsExecutedState) => {
            expect(functionsExecutedState).toBeDefined();
        });

        formula.executeCalculation();
        formula.stopCalculation();
    });

    it('FFormula setInitialFormulaComputing', () => {
        const formula = crabtableAPI.getFormula();

        const configService = get(IConfigService);

        configService.setConfig(PLUGIN_CONFIG_KEY_BASE, {});

        const config = configService.getConfig<Partial<IUniverSheetsFormulaBaseConfig>>(PLUGIN_CONFIG_KEY_BASE);

        expect(config?.initialFormulaComputing).toBeUndefined();

        formula.setInitialFormulaComputing(CalculationMode.FORCED);

        expect(config?.initialFormulaComputing).toBe(CalculationMode.FORCED);
    });
});
