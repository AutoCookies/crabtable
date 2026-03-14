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

import type { FCrabTable } from '@crabtable/core/facade';
import { beforeEach, describe, expect, it } from 'vitest';
import { createWorksheetTestBed } from './create-worksheet-test-bed';

describe('Test FWorksheet', () => {
    let crabtableAPI: FCrabTable;
    beforeEach(() => {
        const testBed = createWorksheetTestBed();

        crabtableAPI = testBed.crabtableAPI;
    });

    it('Worksheet getDataValidations', async () => {
        const activeSheet = crabtableAPI.getActiveWorkbook()?.getSheetByName('sheet1');
        expect(activeSheet?.getDataValidations()).toBeDefined();
    });

    it('Worksheet getValidatorStatus', async () => {
        const activeSheet = crabtableAPI.getActiveWorkbook()?.getSheetByName('sheet1');
        expect(activeSheet?.getValidatorStatus()).toBeDefined();
    });
});
