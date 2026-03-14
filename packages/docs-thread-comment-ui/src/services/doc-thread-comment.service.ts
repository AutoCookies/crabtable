/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ITextRange, Nullable } from '@crabtable/core';
import type { IThreadComment } from '@crabtable/thread-comment';
import { Disposable, Inject } from '@crabtable/core';
import { ThreadCommentPanelService } from '@crabtable/thread-comment-ui';
import { ISidebarService } from '@crabtable/ui';
import { BehaviorSubject } from 'rxjs';

export class DocThreadCommentService extends Disposable {
    private _addingComment$ = new BehaviorSubject<Nullable<IThreadComment & ITextRange>>(undefined);
    readonly addingComment$ = this._addingComment$.asObservable();

    get addingComment() {
        return this._addingComment$.getValue();
    }

    constructor(
        @ISidebarService private readonly _sidebarService: ISidebarService,
        @Inject(ThreadCommentPanelService) private readonly _threadCommentPanelService: ThreadCommentPanelService
    ) {
        super();

        this.disposeWithMe(() => {
            this._addingComment$.complete();
        });
    }

    startAdd(comment: IThreadComment & ITextRange) {
        this._addingComment$.next(comment);
    }

    endAdd() {
        this._addingComment$.next(undefined);
    }
}
