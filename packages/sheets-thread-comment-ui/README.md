# @crabtable/sheets-thread-comment-ui

## Package Overview

| Package Name | UMD Namespace | Version | License | Downloads | Contains CSS | Contains i18n locales |
| --- | --- | --- | --- | --- | :---: | :---: |
| `@crabtable/sheets-thread-comment-ui` | `UniverSheetsThreadComment` | [![][npm-version-shield]][npm-version-link] | ![][npm-license-shield] | ![][npm-downloads-shield] | ⭕️ | ⭕️ |

## Introduction

`@crabtable/sheets-thread-comment-ui` provides the comment/annotation function of CrabTable Sheets.

## Usage

### Installation

```shell
# Use npm
npm install @crabtable/sheets-thread-comment-ui

# Use yarn
yarn add @crabtable/sheets-thread-comment-ui
```

### Register the plugin

```typescript
import { UniverSheetsThreadCommentPlugin, IThreadCommentMentionDataService} from '@crabtable/sheets-thread-comment-ui';

const mockUser = {
    userID: 'mockId',
    name: 'MockUser',
    avatar: 'icon-url',
    anonymous: false,
    canBindAnonymous: false,
};

class CustomMentionDataService implements IThreadCommentMentionDataService {
    trigger: string = '@';

     // Get the common interface implementation of the mentioned user
    async getMentions(search: string) {
        return [
            {
                id: mockUser.userID,
                label: mockUser.name,
                type: 'user',
                icon: mockUser.avatar,
            },
            {
                id: '2',
                label: 'User2',
                type: 'user',
                icon: mockUser.avatar,
            },
        ];
    }
}

univer.registerPlugin(UniverSheetsThreadCommentPlugin);
```

### API
```typescript
import {
    AddCommentCommand,
    DeleteCommentCommand,
    UpdateCommentCommand,
    ResolveCommentCommand,
    DeleteCommentTreeCommand,
} from '@crabtable/sheets-thread-comment-ui';
import type {
    IAddCommentCommandParams,
    IDeleteCommentCommandParams,
    IResolveCommentCommandParams,
    IUpdateCommentCommandParams,
    IDeleteCommentTreeCommandParams,
} from '@crabtable/sheets-thread-comment-ui';

// Add comment by command
const commandService = univer.__getInjector().get(ICommandService);

commandService.executeCommand(AddCommentCommand.id, {
    unitId: 'unitId',
    subUnitId: 'subUnitId',
    comment: {
        // comment content
    },
} as IAddCommentCommandParams);
```

<!-- Links -->
[npm-version-shield]: https://img.shields.io/npm/v/@crabtable/sheets-thread-comment-ui?style=flat-square
[npm-version-link]: https://npmjs.com/package/@crabtable/sheets-thread-comment-ui
[npm-license-shield]: https://img.shields.io/npm/l/@crabtable/sheets-thread-comment-ui?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dm/@crabtable/sheets-thread-comment-ui?style=flat-square
