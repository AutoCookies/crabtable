# @crabtable/sheets-filter-ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-filter-ui` | `UniverSheetsFilterUi` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/sheets-filter-ui` provides a user interface for filtering in sheets.

## Usage

You should use this plugin with the `@crabtable/sheets-filter` package.

```typescript
import '@crabtable/sheets-filter-ui/lib/index.css';

import { UniverSheetsFilterPlugin } from '@crabtable/sheets-filter';
import { UniverSheetsFilterUIPlugin } from '@crabtable/sheets-filter-ui';

univer.registerPlugin(UniverSheetsFilterPlugin);
univer.registerPlugin(UniverSheetsFilterUIPlugin);
```

### Installation

```shell
# Using npm
npm install @crabtable/sheets-filter-ui

# Using yarn
yarn add @crabtable/sheets-filter-ui
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-filter-ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-filter-ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-filter-ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-filter-ui?style=flat-square
