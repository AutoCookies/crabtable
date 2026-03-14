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

import { ILogService } from '@crabtable/core';
import { BuiltInUIPart } from '@crabtable/ui';
import { ButtonRangeSelector } from './button';

// eslint-disable-next-line max-lines-per-function, complexity
export function initEvent() {
    const logService = window.univer!.__getInjector().get(ILogService);

    // Workbook Events
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.WorkbookCreated, (params) => {
        logService.log('===WorkbookCreated', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.WorkbookDisposed, (params) => {
        logService.log('===WorkbookDisposed', params);
    });

    // Sheet Lifecycle Events
    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetCreate, (params) => {
        logService.log('===BeforeSheetCreate', params);
    });
    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetCreated, (params) => {
        logService.log('===SheetCreated', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetDelete, (params) => {
        logService.log('===BeforeSheetDelete', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetDeleted, (params) => {
        logService.log('===SheetDeleted', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetMove, (params) => {
        logService.log('===BeforeSheetMove', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetMoved, (params) => {
        logService.log('===SheetMoved', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetNameChange, (params) => {
        logService.log('===BeforeSheetNameChange', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetNameChanged, (params) => {
        logService.log('===SheetNameChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetHideChange, (params) => {
        logService.log('===BeforeSheetHideChange', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetHideChanged, (params) => {
        logService.log('===SheetHideChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CellClicked, (params) => {
        logService.log('===CellClicked', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CellHover, (params) => {
        logService.log('===CellHover', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CellPointerDown, (params) => {
        logService.log('===CellPointerDown', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CellPointerUp, (params) => {
        logService.log('===CellPointerUp', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CellPointerMove, (params) => {
        logService.log('===CellPointerMove', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SelectionChanged, (params) => {
        logService.log('===SelectionChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SelectionMoveStart, (params) => {
        logService.log('===SelectionMoveStart', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SelectionMoveEnd, (params) => {
        logService.log('===SelectionMoveEnd', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SelectionMoving, (params) => {
        logService.log('===SelectionMoving', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetEditStart, (params) => {
        logService.log('===BeforeSheetEditStart', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetEditStarted, (params) => {
        logService.log('===SheetEditStarted', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetEditChanging, (params) => {
        logService.log('===SheetEditChanging', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetEditEnd, (params) => {
        logService.log('===BeforeSheetEditEnd', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetEditEnded, (params) => {
        logService.log('===SheetEditEnded', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetValueChanged, (params) => {
        logService.log('===SheetValueChanged', params);
    });

    // Clipboard Events
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeClipboardChange, (params) => {
        logService.log('===BeforeClipboardChange', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ClipboardChanged, (params) => {
        logService.log('===ClipboardChanged', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeClipboardPaste, (params) => {
        logService.log('===BeforeClipboardPaste', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ClipboardPasted, (params) => {
        logService.log('===ClipboardPasted', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeGridlineEnableChange, (params) => {
        logService.log('===BeforeGridlineEnableChange', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeGridlineColorChange, (params) => {
        logService.log('===BeforeGridlineColorChange', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.GridlineChanged, (params) => {
        logService.log('===GridlineChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetZoomChange, (params) => {
        logService.log('===BeforeSheetZoomChange', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetZoomChanged, (params) => {
        logService.log('===SheetZoomChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.Scroll, (params) => {
        logService.log('===Scroll', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetSkeletonChanged, (params) => {
        logService.log('===SheetSkeletonChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetDataValidationAdd, (params) => {
        logService.log('===BeforeSheetDataValidationAdd', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetDataValidationChanged, (params) => {
        logService.log('===SheetDataValidationChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetDataValidatorStatusChanged, (params) => {
        logService.log('===SheetDataValidatorStatusChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetBeforeRangeFilter, (params) => {
        logService.log('===SheetBeforeRangeFilter', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetRangeFiltered, (params) => {
        logService.log('===SheetRangeFiltered', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetBeforeRangeSort, (params) => {
        logService.log('===SheetBeforeRangeSort', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetRangeSorted, (params) => {
        logService.log('===SheetRangeSorted', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetBeforeRangeFilterClear, (params) => {
        logService.log('===SheetBeforeRangeFilterClear', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetRangeFilterCleared, (params) => {
        logService.log('===SheetRangeFilterCleared', params);
    });

    // Image Events
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeOverGridImageInsert, (params) => {
        logService.log('===BeforeOverGridImageInsert', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.OverGridImageInserted, (params) => {
        logService.log('===OverGridImageInserted', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeOverGridImageChange, (params) => {
        logService.log('===BeforeOverGridImageChange', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.OverGridImageChanged, (params) => {
        logService.log('===OverGridImageChanged', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeOverGridImageRemove, (params) => {
        logService.log('===BeforeOverGridImageRemove', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.OverGridImageRemoved, (params) => {
        logService.log('===OverGridImageRemoved', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeOverGridImageSelect, (params) => {
        logService.log('===BeforeOverGridImageSelect', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.OverGridImageSelected, (params) => {
        logService.log('===OverGridImageSelected', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeCommentAdd, (params) => {
        logService.log('===BeforeCommentAdd', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CommentAdded, (params) => {
        logService.log('===CommentAdded', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeCommentUpdate, (params) => {
        logService.log('===BeforeCommentUpdate', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CommentUpdated, (params) => {
        logService.log('===CommentUpdated', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeCommentDelete, (params) => {
        logService.log('===BeforeCommentDelete', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CommentDeleted, (params) => {
        logService.log('===CommentDeleted', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeCommentResolve, (params) => {
        logService.log('===BeforeCommentResolve', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CommentResolved, (params) => {
        logService.log('===CommentResolved', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.RowHeaderClick, (params) => {
        logService.log('===RowHeaderClick', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.RowHeaderHover, (params) => {
        logService.log('===RowHeaderHover', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.RowHeaderPointerDown, (params) => {
        logService.log('===RowHeaderPointerDown', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.RowHeaderPointerUp, (params) => {
        logService.log('===RowHeaderPointerUp', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ColumnHeaderClick, (params) => {
        logService.log('===ColumnHeaderClick', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ColumnHeaderHover, (params) => {
        logService.log('===ColumnHeaderHover', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ColumnHeaderPointerDown, (params) => {
        logService.log('===ColumnHeaderPointerDown', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ColumnHeaderPointerUp, (params) => {
        logService.log('===ColumnHeaderPointerUp', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetLinkAdd, (params) => {
        logService.log('===BeforeSheetLinkAdd', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetLinkUpdate, (params) => {
        logService.log('===BeforeSheetLinkUpdate', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetLinkCancel, (params) => {
        logService.log('===BeforeSheetLinkCancel', params);
    });

    // Drag and Drop Events
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.DragOver, (params) => {
        logService.log('===DragOver', params);
    });

    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.Drop, (params) => {
        logService.log('===Drop', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CrosshairHighlightColorChanged, (params) => {
        logService.log('===CrosshairHighlightColorChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.CrosshairHighlightEnabledChanged, (params) => {
        logService.log('===CrosshairHighlightEnabledChanged', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.BeforeSheetEditStart, (params) => {
        const { row, column } = params;
        if (row === 0 && column === 0) {
            params.cancel = true;
        }
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.ActiveSheetChanged, (params) => {
        logService.log('===active sheet changed', params);
    });

    // checked
    window.crabtableAPI?.addEvent(window.crabtableAPI.Event.SheetEditChanging, (params) => {
        logService.log('===SheetEditChanging', params);
    });
}

// initEvent();
export function initFacadeBtns() {
    window.crabtableAPI?.registerUIPart(BuiltInUIPart.CUSTOM_HEADER, ButtonRangeSelector);
}

// setTimeout(() => {
//     const active = window.crabtableAPI?.getActiveSheet();
//     console.log('==active', active, window.crabtableAPI);
//     if (!active) {
//         return;
//     }

//     window.crabtableAPI?.showRangeSelectorDialog({
//         unitId: active.workbook.getId(),
//         subUnitId: active.worksheet.getSheetId(),
//         callback: (ranges, isCancel) => {
//             console.log('===range selector dialog result', ranges, isCancel);
//         },
//     });
// }, 5000);
