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

import type { IAccessor } from '@crabtable/core';
import type { IMenuButtonItem } from '@crabtable/ui';
import { CrabTableInstanceType, ICrabTableInstanceService, SHEET_EDITOR_UNITS } from '@crabtable/core';
import { DocSelectionManagerService, DocSkeletonManagerService } from '@crabtable/docs';
import { DocumentEditArea, IRenderManagerService, withCurrentTypeOfRenderer } from '@crabtable/engine-render';
import { getMenuHiddenObservable, MenuItemType } from '@crabtable/ui';
import { debounceTime, Observable } from 'rxjs';
import { StartAddCommentOperation, ToggleCommentPanelOperation } from '../commands/operations/show-comment-panel.operation';

export const shouldDisableAddComment = (accessor: IAccessor) => {
    const renderManagerService = accessor.get(IRenderManagerService);
    const docSelectionManagerService = accessor.get(DocSelectionManagerService);
    const skeleton = withCurrentTypeOfRenderer(
        CrabTableInstanceType.CRABTABLE_DOC,
        DocSkeletonManagerService,
        accessor.get(ICrabTableInstanceService),
        renderManagerService
    )?.getSkeleton();

    const editArea = skeleton?.getViewModel().getEditArea();
    if (editArea === DocumentEditArea.FOOTER || editArea === DocumentEditArea.HEADER) {
        return true;
    }

    const range = docSelectionManagerService.getActiveTextRange();

    if (range == null || range.collapsed) {
        return true;
    }

    return false;
};

export function AddDocCommentMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: StartAddCommentOperation.id,
        type: MenuItemType.BUTTON,
        icon: 'CommentIcon',
        title: 'threadCommentUI.panel.addComment',
        tooltip: 'threadCommentUI.panel.addComment',
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_DOC, undefined, SHEET_EDITOR_UNITS),
        disabled$: new Observable(function (subscribe) {
            const textSelectionService = accessor.get(DocSelectionManagerService);
            const observer = textSelectionService.textSelection$.pipe(debounceTime(16)).subscribe(() => {
                subscribe.next(shouldDisableAddComment(accessor));
            });

            return () => {
                observer.unsubscribe();
            };
        }),
    };
}

export function ToolbarDocCommentMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: ToggleCommentPanelOperation.id,
        type: MenuItemType.BUTTON,
        icon: 'CommentIcon',
        title: 'threadCommentUI.panel.addComment',
        tooltip: 'threadCommentUI.panel.addComment',
        hidden$: getMenuHiddenObservable(accessor, CrabTableInstanceType.CRABTABLE_DOC),
    };
}
