# @crabtable/ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/ui` | `UniveUi` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/ui` defines basic UI services and provides a set of desktop Workbench implementations based on React.

Please note that this implementation can only display only 1 unit in the workbench. If you would like to embed units
into a rich text document, or a mind node, you should implement a new UI plugin for that. Refer to our uniui
plugin for an example.

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/ui

# Using yarn
yarn add @crabtable/ui
```

This package contains CSS and has the second highest priority. Please import it after `@crabtable/design` and before any other CrabTable style files.

### UI service

UI services define a set of user interface services that run on the client side but are agnostic to the specific host environment (such as desktop browsers, mobile webviews, etc.). By injecting these services, business functionalities can invoke the same interfaces across different hosts without worrying about host disparities.

These UI services include:

- Menu service, used to register menu items and their associated commands.
- Shortcut service, for registering keyboard shortcuts and their corresponding commands.
- Clipboard service, to read from or write to the clipboard.
- Popup service, which includes confirmations, dialogs, and more.

### Workbench

In addition to UI services, `@crabtable/ui` also implements a workspace based on React, which includes elements such as the title bar, toolbar, main content area, context menu, sidebar, and more. Businesses can customize the rendered content using the APIs provided by the Workbench.

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/ui?style=flat-square
