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

import type { CrabTable, Nullable } from '@crabtable/core';
import type { FCrabTable, IEventBase } from '@crabtable/core/facade';
import type { IRender } from '@crabtable/engine-render';
import type { IRemoveColByRangeCommandParams } from '@crabtable/sheets';
import type { FWorkbook, FWorksheet } from '@crabtable/sheets/facade';
import { CanceledError, CrabTableInstanceType, DisposableCollection, ICommandService, LifecycleService, LifecycleStages } from '@crabtable/core';
import { IRenderManagerService } from '@crabtable/engine-render';
import { RemoveColByRangeCommand } from '@crabtable/sheets';
import { SHEET_VIEW_KEY } from '@crabtable/sheets-ui';
import { IContextMenuService } from '@crabtable/ui';
import { combineLatest } from 'rxjs';

interface IMainRightClickEventParams extends IEventBase {
    event: MouseEvent;
    row?: number;
    column?: number;
}

interface IRemoveColumnEventParams extends IEventBase {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    startColumn: number;
    endColumn: number;
}

interface IBeforeRemoveColumnEventParams extends IEventBase {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    startColumn: number;
    endColumn: number;
}

interface ICustomEventParamConfig {
    MainRightClickEvent: IMainRightClickEventParams;
    RemoveColumnEvent: IRemoveColumnEventParams;
    BeforeRemoveColumnEvent: IBeforeRemoveColumnEventParams;
}

export function customRegisterEvent(univer: CrabTable, crabtableAPI: FCrabTable) {
    registerMainRightClickEvent(univer, crabtableAPI);

    crabtableAPI.addEvent(crabtableAPI.Event.LifeCycleChanged, ({ stage }) => {
        if (stage === crabtableAPI.Enum.LifecycleStages.Steady) {
            registerRemoveColumnEvent(univer, crabtableAPI);
            registerBeforeRemoveColumnEvent(univer, crabtableAPI);

            crabtableAPI.addEvent('MainRightClickEvent', (params) => {
                const { row, column } = params;
                console.warn(`Right clicked on cell at ${crabtableAPI.Util.tools.chatAtABC(column as number)}${row as number + 1}`);
                // If the cell is A1, do not show the context menu
                if (row === 0 && column === 0) {
                    params.cancel = true;
                }
            });

            crabtableAPI.addEvent('RemoveColumnEvent', (params) => {
                const { startColumn, endColumn } = params;
                console.warn(`Removed columns from ${crabtableAPI.Util.tools.chatAtABC(startColumn)} to ${crabtableAPI.Util.tools.chatAtABC(endColumn)}`);
            });

            const beforeRemoveColumnEventDisposable = crabtableAPI.addEvent('BeforeRemoveColumnEvent', (params) => {
                const { startColumn, endColumn } = params;
                console.warn(`Before removing columns from ${crabtableAPI.Util.tools.chatAtABC(startColumn)} to ${crabtableAPI.Util.tools.chatAtABC(endColumn)}`);
                // If the column to be deleted includes column C to E, prevent the deletion
                if (!(startColumn > 4 || endColumn < 2)) {
                    params.cancel = true;
                    console.warn('Cannot delete column C to E');
                }
            });

            // Remove the BeforeRemoveColumnEvent listener after 10 seconds
            setTimeout(() => {
                beforeRemoveColumnEventDisposable.dispose();
                console.warn('BeforeRemoveColumnEvent listener has been removed, you can delete any columns now.');
            }, 10000);
        }
    });
}

function registerMainRightClickEvent(univer: CrabTable, crabtableAPI: FCrabTable) {
    const injector = univer.__getInjector();
    const renderManagerService = injector.get(IRenderManagerService);
    const lifeCycleService = injector.get(LifecycleService);
    const contextMenuService = injector.get(IContextMenuService);

    let sheetRenderUnit: Nullable<IRender>;
    const combined$ = combineLatest([
        renderManagerService.created$,
        lifeCycleService.lifecycle$,
    ]);
    const disposable = new DisposableCollection();

    crabtableAPI.disposeWithMe(combined$.subscribe(([created, lifecycle]) => {
        if (created.type === CrabTableInstanceType.CRABTABLE_SHEET) {
            sheetRenderUnit = created;
        }
        if (lifecycle <= LifecycleStages.Rendered) return;
        if (!sheetRenderUnit) return;

        const { components } = sheetRenderUnit;
        const mainComponent = components.get(SHEET_VIEW_KEY.MAIN);
        if (!mainComponent) return;

        const fWorkbook = crabtableAPI.getWorkbook(sheetRenderUnit.unitId);
        if (!fWorkbook) return;

        const fWorksheet = fWorkbook.getActiveSheet();
        if (!fWorksheet) return;

        disposable.dispose();

        disposable.add(
            crabtableAPI.registerEventHandler(
                'MainRightClickEvent',
                () => mainComponent.onPointerDown$.subscribeEvent((event) => {
                    if (event.button !== 2) return;

                    const activeRange = fWorksheet.getActiveRange();
                    const eventParams: IMainRightClickEventParams = {
                        event,
                        row: activeRange?.getRow() ?? 0,
                        column: activeRange?.getColumn() ?? 0,
                    };

                    crabtableAPI.fireEvent('MainRightClickEvent', eventParams);

                    // If the event is canceled, do not show the context menu
                    if (eventParams.cancel) {
                        requestAnimationFrame(() => {
                            contextMenuService.hideContextMenu();
                        });
                    }
                })
            )
        );

        crabtableAPI.disposeWithMe(disposable);
    }));
}

function registerRemoveColumnEvent(univer: CrabTable, crabtableAPI: FCrabTable) {
    const injector = univer.__getInjector();
    const commandService = injector.get(ICommandService);

    crabtableAPI.disposeWithMe(
        crabtableAPI.registerEventHandler(
            'RemoveColumnEvent',
            () => commandService.onCommandExecuted((commandInfo) => {
                if (commandInfo.id !== RemoveColByRangeCommand.id) return;

                const target = crabtableAPI.getCommandSheetTarget(commandInfo);
                if (!target) return;

                const { range } = commandInfo.params as IRemoveColByRangeCommandParams;
                const eventParams: IRemoveColumnEventParams = {
                    workbook: target.workbook,
                    worksheet: target.worksheet,
                    startColumn: range.startColumn,
                    endColumn: range.endColumn,
                };

                crabtableAPI.fireEvent('RemoveColumnEvent', eventParams);
            })
        )
    );
}

function registerBeforeRemoveColumnEvent(univer: CrabTable, crabtableAPI: FCrabTable) {
    const injector = univer.__getInjector();
    const commandService = injector.get(ICommandService);

    crabtableAPI.disposeWithMe(
        crabtableAPI.registerEventHandler(
            'BeforeRemoveColumnEvent',
            () => commandService.beforeCommandExecuted((commandInfo) => {
                if (commandInfo.id !== RemoveColByRangeCommand.id) return;

                const target = crabtableAPI.getCommandSheetTarget(commandInfo);
                if (!target) return;

                const { range } = commandInfo.params as IRemoveColByRangeCommandParams;
                const eventParams: IBeforeRemoveColumnEventParams = {
                    workbook: target.workbook,
                    worksheet: target.worksheet,
                    startColumn: range.startColumn,
                    endColumn: range.endColumn,
                };

                crabtableAPI.fireEvent('BeforeRemoveColumnEvent', eventParams);

                if (eventParams.cancel) {
                    throw new CanceledError();
                }
            })
        )
    );
}

declare module '@crabtable/core/facade' {
    interface IEventParamConfig extends ICustomEventParamConfig { }
}
