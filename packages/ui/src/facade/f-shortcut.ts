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

import type { IDisposable, Workbook } from '@crabtable/core';
import type { IShortcutItem } from '@crabtable/ui';
import { CrabTableInstanceType, ICrabTableInstanceService, Inject, Injector } from '@crabtable/core';
import { FBase } from '@crabtable/core/facade';
import { IRenderManagerService } from '@crabtable/engine-render';
import { IShortcutService } from '@crabtable/ui';

/**
 * The Facade API object to handle shortcuts in Univer
 * @hideconstructor
 */
export class FShortcut extends FBase {
    private _forceDisableDisposable: IDisposable | null = null;

    constructor(
        @Inject(Injector) protected readonly _injector: Injector,
        @Inject(IRenderManagerService) private _renderManagerService: IRenderManagerService,
        @ICrabTableInstanceService protected readonly _crabtableInstanceService: ICrabTableInstanceService,
        @IShortcutService protected readonly _shortcutService: IShortcutService
    ) {
        super();
    }

    /**
     * Enable shortcuts of CrabTable.
     * @returns {FShortcut} The Facade API instance itself for chaining.
     *
     * @example
     * ```typescript
     * fShortcut.enableShortcut(); // Use the FShortcut instance used by disableShortcut before, do not create a new instance
     * ```
     */
    enableShortcut(): this {
        this._forceDisableDisposable?.dispose();
        this._forceDisableDisposable = null;
        return this;
    }

    /**
     * Disable shortcuts of CrabTable.
     * @returns {FShortcut} The Facade API instance itself for chaining.
     *
     * @example
     * ```typescript
     * const fShortcut = crabtableAPI.getShortcut();
     * fShortcut.disableShortcut();
     * ```
     */
    disableShortcut(): this {
        if (!this._forceDisableDisposable) {
            this._forceDisableDisposable = this._shortcutService.forceDisable();
        }

        return this;
    }

    /**
     * Trigger shortcut of CrabTable by a KeyboardEvent and return the matched shortcut item.
     * @param {KeyboardEvent} e - The KeyboardEvent to trigger.
     * @returns {IShortcutItem<object> | undefined} The matched shortcut item.
     *
     * @example
     * ```typescript
     * // Assum the current sheet is empty sheet.
     * const fWorkbook = crabtableAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getActiveSheet();
     * const fRange = fWorksheet.getRange('A1');
     *
     * // Set A1 cell active and set value to 'Hello Univer'.
     * fRange.activate();
     * fRange.setValue('Hello Univer');
     * console.log(fRange.getCellStyle().bold); // false
     *
     * // Set A1 cell bold by shortcut.
     * const fShortcut = crabtableAPI.getShortcut();
     * const pseudoEvent = new KeyboardEvent('keydown', {
     *   key: 'b',
     *   ctrlKey: true,
     *   keyCode: crabtableAPI.Enum.KeyCode.B
     * });
     * const ifShortcutItem = fShortcut.triggerShortcut(pseudoEvent);
     * if (ifShortcutItem) {
     *   const commandId = ifShortcutItem.id;
     *   console.log(fRange.getCellStyle().bold); // true
     * }
     * ```
     */
    triggerShortcut(e: KeyboardEvent): IShortcutItem<object> | undefined {
        const workbook = this._crabtableInstanceService.getCurrentUnitForType<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET);
        if (!workbook) {
            return;
        }

        const renderUnit = this._renderManagerService.getRenderById(workbook.getUnitId());
        if (!renderUnit) {
            return;
        }

        const canvas = renderUnit.engine.getCanvasElement();
        canvas.dispatchEvent(e);

        return this._shortcutService.dispatch(e);
    }

    /**
     * Dispatch a KeyboardEvent to the shortcut service and return the matched shortcut item.
     * @param {KeyboardEvent} e - The KeyboardEvent to dispatch.
     * @returns {IShortcutItem<object> | undefined} The matched shortcut item.
     *
     * @example
     * ```typescript
     * const fShortcut = crabtableAPI.getShortcut();
     * const pseudoEvent = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
     * const ifShortcutItem = fShortcut.dispatchShortcutEvent(pseudoEvent);
     * if (ifShortcutItem) {
     *   const commandId = ifShortcutItem.id;
     *   // Do something with the commandId.
     * }
     * ```
     */
    dispatchShortcutEvent(e: KeyboardEvent): IShortcutItem<object> | undefined {
        return this._shortcutService.dispatch(e);
    }
}
