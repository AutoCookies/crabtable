# @crabtable/rpc

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/rpc` | `UniverRpc` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ❌ | ❌ |

## Introduction

When handling some time-intensive tasks, such as formula computation, CrabTable can offload them to a location outside of the main thread, such as a Web Worker thread. The `@crabtable/rpc` library provides an RPC mechanism that simplifies communication between the main thread and other threads.

For more information, see the [Architecture of Web Worker](https://docs.crabtable.dev/guides/recipes/architecture/web-worker).

## Usage

### Installation

```shell
# Using npm
npm install @crabtable/rpc

# Using yarn
yarn add @crabtable/rpc
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/rpc?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/rpc
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/rpc?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/rpc?style=flat-square
