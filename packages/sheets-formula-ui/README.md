# @crabtable/sheets-formula-ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-formula-ui` | `UniverSheetsFormulaUi` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/sheets-formula` provides the ability to edit formulas in spreadsheets, including features such as auto-completion, formula suggestions, drop-down filling for formulas, and copy-paste functionality.

> [!NOTE]
> Formula calculation is one of the core functionalities of spreadsheets, and formula calculation scheduling is done in `@crabtable/sheets`.

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/sheets-formula-ui

# Using yarn
yarn add @crabtable/sheets-formula-ui
```

### How To Customize Formulas

If the officially provided formula does not meet your needs, you can expand the formula yourself. Depending on different needs, we provide multiple ways to support registering one or more custom formulas.

- [Register formula using Facade API](https://reference.crabtable.dev/zh-CN/classes/FFormula#registerfunction)
- [Custom Formula](https://docs.crabtable.dev/guides/recipes/tutorials/custom-formula)

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-formula?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-formula
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-formula?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-formula?style=flat-square
