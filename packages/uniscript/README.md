# @crabtable/uniscript

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/uniscript` | `UniveUniscript` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

![](./assets/uniscript.jpeg)

`@crabtable/uniscript` uses the DSL (Domain-Specific Language) provided by `@crabtable/facade` and creates a code editor for Users to write code for operating Univer's data structures and business logic.

Users can write business logic in the code editor to meet more flexible business requirements. For instance, as shown in the illustration, users can write a Uniscript to read identity card numbers from a selected area and validate their legality, and mark the background of invalid identity card numbers with red.

> [!CAUTION]
> The Uniscript is currently in the experimental stage, and it is not recommended to use it in production environments. You can refer to the [Roadmap](https://crabtable.dev/guides/sheet/roadmap) to understand the iteration plan of Uniscript.

> [!TIP]
> Indeed, Uniscript's Domain-Specific Language (DSL) is a set of Facade APIs that encapsulate the internal implementation details of CrabTable. This API is defined [here](https://docs.crabtable.dev/guides/sheets/getting-started/facade).

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/uniscript

# Using yarn
yarn add @crabtable/uniscript
```

### Get the Editor Instance

The `@crabtable/uniscript` uses [Monaco Editor](https://microsoft.github.io/monaco-editor/) as its code editor. You can obtain an instance of the editor through the following method:

```ts
const editor = univer.__getInjector().get(ScriptEditorService).getEditorInstance();
```

Or inject `ScriptEditorService` into your module to obtain the editor instance.

```ts
export class YourModule {
  constructor(
    @Inject(ScriptEditorService) private readonly _scriptEditorService
  ) {}

  private _getEditor() {
    return this._scriptEditorService.getEditorInstance();
  }
}
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/uniscript?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/uniscript
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/uniscript?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/uniscript?style=flat-square
