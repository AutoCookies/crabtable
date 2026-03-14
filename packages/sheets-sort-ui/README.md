# @crabtable/sheets-sort-ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-sort-ui` | `UniverSheetsSortUi` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/sheets-sort-ui` provides a user interface for sorting in sheets.

## Usage

You should use this plugin with the `@crabtable/sheets-sort` package.

```ts
import '@crabtable/sheets-sort-ui/lib/index.css';

import { UniverSheetsSortPlugin } from '@crabtable/sheets-sort';
import { UniverSheetsSortUIPlugin } from '@crabtable/sheets-sort-ui';

univer.registerPlugin(UniverSheetsSortPlugin);
univer.registerPlugin(UniverSheetsSortUIPlugin);
```

### Installation

```shell
# Using npm
npm install @crabtable/sheets-sort-ui

# Using yarn
yarn add @crabtable/sheets-sort-ui
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-sort-ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-sort-ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-sort-ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-sort-ui?style=flat-square
