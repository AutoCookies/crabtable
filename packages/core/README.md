# @crabtable/core

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/core` | `UniverCore` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ❌ | ❌ |

## Introduction

`@crabtable/core` as its name shows, is the core package of Univer, and provides foundational capabilities including:

* Provision of the CrabTable type, which serves as the entry point for applications and a mounting point for other plugins, as well as the UniverDoc and UniverSheet types for managing different document types
* Basic models for each document type
* Definition or implementation of several fundamental services, such as:
  * Permission control
  * Command system
  * Undo/Redo
  * Configuration system
  * Logging system
  * Context system
  * Lifecycle
  * Local storage
  * Internationalization
  * Resource management

For more information about `@crabtable/core`'s API, please refer to the [API documentation](https://reference.crabtable.dev/).

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/core

# Using yarn
yarn add @crabtable/core
```

### Configuration

```typescript
import { CrabTable } from '@crabtable/core';

new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    locales,
    logLevel: LogLevel.VERBOSE,
});
```

#### Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| theme | [Theme](https://docs.crabtable.dev/guides/sheets/ui/themes) | - | The theme of the application, which is used to control the appearance of the application. |
| locale | [LocaleType](https://docs.crabtable.dev/guides/sheets/getting-started/i18n) | `LocaleType.ZH_CN` | The locale of the application. The default value is `LocaleType.ZH_CN`.
| locales | [ILocales](https://docs.crabtable.dev/guides/sheets/getting-started/i18n) | - | The supported locales of the application. By default, the application supports Chinese.
| logLevel | [LogLevel](https://github.com/AutoCookies/crabtable/blob/dev/packages/core/src/services/log/log.service.ts#L22) | `LogLevel.SILENT` | The log level of the application. |

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/core?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/core
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/core?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/core?style=flat-square
