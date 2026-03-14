# @crabtable/sheets-hyper-link-ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-hyper-link-ui` | `UniverSheetsHyperLinkUi` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/sheets-hyper-link-ui` provides a hyperlink feature that allows users to create links for quick access to resources both within and outside of the spreadsheet, including web pages, files, email addresses, or other locations in the workbook.

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/sheets-hyper-link-ui

# Using yarn
yarn add @crabtable/sheets-hyper-link-ui
```

### Register the plugin

```typescript
import { UniverSheetsHyperLinkUIPlugin } from '@crabtable/sheets-hyper-link-ui';

univer.registerPlugin(UniverSheetsHyperLinkUIPlugin);
```

### API
```typescript
// All commands
import { AddHyperLinkCommand, type IAddHyperLinkCommandParams } from '@crabtable/sheets-hyper-link-ui';
import { RemoveHyperLinkCommand, CancelHyperLinkCommand, type IRemoveHyperLinkCommandParams } from '@crabtable/sheets-hyper-link-ui';
import { UpdateHyperLinkCommand, type IUpdateHyperLinkCommandParams } from '@crabtable/sheets-hyper-link-ui';

// Add hyperlink by command
const commandService = univer.__getInjector().get(ICommandService);

commandService.executeCommand(AddHyperLinkCommand.id, {
    unitId: 'unitId',
    subUnitId: 'subUnitId',
    link: {
        // comment content
        payload: 'https://crabtable.dev',
        id: '1',
        row: 0,
        column: 0
    },
} as IAddCommentCommandParams);
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-hyper-link-ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-hyper-link-ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-hyper-link-ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-hyper-link-ui?style=flat-square
