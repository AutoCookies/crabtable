# @crabtable/sheets-data-validation

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-data-validation` | `UniverSheetsDataValidation` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ️❌ | ❌️ |

## Introduction

> `@crabtable/sheets-data-validation` provides full capabilities for CrabTable Sheet data validation.

## Usage

### Installation

```shell
# Using npm
npm i @crabtable/sheets-data-validation

# Using yarn
pnpm add
```

### Register the plugin

```typescript
import type { IWorkbookData } from '@crabtable/core';
import { DataValidationType, ICommandService, LocaleType, Univer, CrabTableInstanceType } from '@crabtable/core';
import { UniverDataValidationPlugin } from '@crabtable/data-validation';
import {
    DATA_VALIDATION_PLUGIN_NAME,
    UniverSheetsDataValidationPlugin,
} from '@crabtable/sheets-data-validation';

univer.registerPlugin(UniverDataValidationPlugin);
univer.registerPlugin(UniverSheetsDataValidationPlugin);

// initial data validation
// dentation: https://github.com/AutoCookies/crabtable/blob/dev/packages/core/src/types/interfaces/i-data-validation.ts#L48
const dataValidation = [
    {
        uid: 'xxx-2',
        type: DataValidationType.CHECKBOX,
        ranges: [{
            startRow: 6,
            endRow: 10,
            startColumn: 0,
            endColumn: 5,
        }],
    },
];

export const DEFAULT_WORKBOOK_DATA_DEMO: IWorkbookData = {
    id: 'workbook-01',
    locale: LocaleType.ZH_CN,
    name: 'UniverSheet Demo',
    resources: [{
        name: DATA_VALIDATION_PLUGIN_NAME,
        data: JSON.stringify({
            'sheetId-1': dataValidation,
        }),
    }],
    // ...
};

// load initial snapshot
univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, DEFAULT_WORKBOOK_DATA_DEMO);
```

### API
```typescript
// Commands and Command params for sheet-data-validation management
import type {
    IAddSheetDataValidationCommandParams,
    IRemoveSheetDataValidationCommandParams,
    IUpdateSheetDataValidationOptionsCommandParams,
    IUpdateSheetDataValidationRangeCommandParams,
    IUpdateSheetDataValidationSettingCommandParams,
} from '@crabtable/sheets-data-validation';
import {
    AddSheetDataValidationCommand,
    DATA_VALIDATION_PLUGIN_NAME,
    RemoveSheetDataValidationCommand,
    UniverSheetsDataValidationPlugin,
    UpdateSheetDataValidationOptionsCommand,
    UpdateSheetDataValidationRangeCommand,
    UpdateSheetDataValidationSettingCommand,
    // internal service
    SheetsDataValidationValidatorService
} from '@crabtable/sheets-data-validation';

// eg. Add data validation from command
const commandService = univer.__getInjector().get(ICommandService);

commandService.executeCommand(AddSheetDataValidationCommand.id, {
    unitId: 'unitId',
    subUnitId: 'subUnitId',
    rule: {
        uid: 'xxx-2',
        type: DataValidationType.CHECKBOX,
        ranges: [{
            startRow: 6,
            endRow: 10,
            startColumn: 0,
            endColumn: 5,
        }],
    },
} as IAddSheetDataValidationCommandParams);

// Using internal service Such as validator
const sheetsDataValidationValidatorService = univer.__getInjector().get(SheetsDataValidationValidatorService);
sheetsDataValidationValidatorService.validatorWorksheet('unitId', 'sheetId')
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-data-validation?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-data-validation
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-data-validation?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-data-validation?style=flat-square
