# @crabtable/sheets-numfmt-ui
sheets-numfmt

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-numfmt-ui` | `UniverSheetsNumfmt` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

Providing editing/rendering capabilities around `number format`, such as edit panels, toolbar buttons, real-time previews, row/column variations, etc.

> [!NOTE]
> Numerical format is one of the core functions of electronic spreadsheets, and therefore, parsing and handling of numerical format is done within `@crabtable/sheets`.

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/sheets-numfmt-ui

# Using yarn
yarn add @crabtable/sheets-numfmt-ui
```

### How to use

Import `@crabtable/sheets-numfmt-ui` at the entrance .

```typescript
import { LocaleType, LogLevel, CrabTable } from '@crabtable/core';
import { defaultTheme } from '@crabtable/design';
import { UniverSheetsNumfmtPlugin } from '@crabtable/sheets-numfmt-ui';

// univer
const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    locales,
    logLevel: LogLevel.VERBOSE,
});

// ... Other plug-ins are registered

univer.registerPlugin(UniverSheetsNumfmtPlugin);
```

> [!NOTE]
> If you need to export the snapshot to support the export data format, you need to add [some additional code](/)

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-numfmt-ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-numfmt-ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-numfmt-ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-numfmt-ui?style=flat-square
