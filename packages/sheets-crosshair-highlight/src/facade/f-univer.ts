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

import type { Injector } from '@crabtable/core';
import type { IEventBase } from '@crabtable/core/facade';
import type { ISetCrosshairHighlightColorOperationParams } from '@crabtable/sheets-crosshair-highlight';
import type { FWorkbook, FWorksheet } from '@crabtable/sheets/facade';
import { ICommandService } from '@crabtable/core';
import { FCrabTable, FEventName } from '@crabtable/core/facade';
import { CROSSHAIR_HIGHLIGHT_COLORS, DisableCrosshairHighlightOperation, EnableCrosshairHighlightOperation, SetCrosshairHighlightColorOperation, SheetsCrosshairHighlightService, ToggleCrosshairHighlightOperation } from '@crabtable/sheets-crosshair-highlight';

/**
 * @ignore
 */
export interface IFSheetCrosshairHighlightEventMixin {
    /**
     * Triggered when the crosshair highlight is enabled or disabled.
     * @see {@link ICrosshairHighlightEnabledChangedEvent}
     * @example
     * ```ts
     * const disposable = crabtableAPI.addEvent(crabtableAPI.Event.CrosshairHighlightEnabledChanged, (params) => {
     *   const { enabled, workbook, worksheet } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly CrosshairHighlightEnabledChanged: 'CrosshairHighlightEnabledChanged';

    /**
     * Triggered when the crosshair highlight color is changed.
     * @see {@link ICrosshairHighlightColorChangedEvent}
     * @example
     * ```ts
     * const disposable = crabtableAPI.addEvent(crabtableAPI.Event.CrosshairHighlightColorChanged, (params) => {
     *   const { color, workbook, worksheet } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly CrosshairHighlightColorChanged: 'CrosshairHighlightColorChanged';
}

export interface ICrosshairHighlightEnabledChangedEvent extends IEventBase {
    /**
     * Whether the crosshair highlight is enabled.
     */
    enabled: boolean;
    /**
     * The workbook that the crosshair highlight is enabled in.
     */
    workbook: FWorkbook;
    /**
     * The worksheet that the crosshair highlight is enabled in.
     */
    worksheet: FWorksheet;
}

export interface ICrosshairHighlightColorChangedEvent extends IEventBase {
    /**
     * The color of the crosshair highlight.
     */
    color: string;
    /**
     * The workbook that the crosshair highlight is enabled in.
     */
    workbook: FWorkbook;
    /**
     * The worksheet that the crosshair highlight is enabled in.
     */
    worksheet: FWorksheet;
}

/**
 * @ignore
 */
export class FSheetCrosshairHighlightEventMixin implements IFSheetCrosshairHighlightEventMixin {
    get CrosshairHighlightEnabledChanged(): 'CrosshairHighlightEnabledChanged' {
        return 'CrosshairHighlightEnabledChanged';
    }

    get CrosshairHighlightColorChanged(): 'CrosshairHighlightColorChanged' {
        return 'CrosshairHighlightColorChanged';
    }
}

/**
 * @ignore
 */
export interface ISheetCrosshairHighlightEventConfigs {
    CrosshairHighlightEnabledChanged: ICrosshairHighlightEnabledChangedEvent;
    CrosshairHighlightColorChanged: ICrosshairHighlightColorChangedEvent;
}

/**
 * @ignore
 */
export interface IFUniverCrosshairHighlightMixin {
    /**
     * Enable or disable crosshair highlight.
     * @param {boolean} enabled - Whether to enable the crosshair highlight
     * @returns {FUniver} The FCrabTable instance for chaining
     * @example
     * ```ts
     * crabtableAPI.setCrosshairHighlightEnabled(true);
     * ```
     */
    setCrosshairHighlightEnabled(enabled: boolean): FCrabTable;

    /**
     * Set the color of the crosshair highlight.
     * @param {string} color - The color of the crosshair highlight, if the color not has alpha channel, the alpha channel will be set to 0.5
     * @returns {FUniver} The FCrabTable instance for chaining
     * @example
     * ```ts
     * crabtableAPI.setCrosshairHighlightColor('#FF0000');
     * // or
     * crabtableAPI.setCrosshairHighlightColor('rgba(232, 11, 11, 0.2)');
     * ```
     */
    setCrosshairHighlightColor(color: string): FCrabTable;

    /**
     * Get whether the crosshair highlight is enabled.
     * @returns {boolean} Whether the crosshair highlight is enabled
     * @example
     * ```ts
     * console.log(crabtableAPI.getCrosshairHighlightEnabled());
     * ```
     */
    getCrosshairHighlightEnabled(): boolean;

    /**
     * Get the color of the crosshair highlight.
     * @returns {string} The color of the crosshair highlight
     * @example
     * ```ts
     * console.log(crabtableAPI.getCrosshairHighlightColor());
     * ```
     */
    getCrosshairHighlightColor(): string;

    /**
     * Get the available built-in colors for the crosshair highlight.
     */
    readonly CROSSHAIR_HIGHLIGHT_COLORS: string[];
}

/**
 * @ignore
 */
export class FCrabTableCrosshairHighlightMixin extends FCrabTable implements IFUniverCrosshairHighlightMixin {
    /**
     * @ignore
     */
    override _initialize(injector: Injector): void {
        const commandService = injector.get(ICommandService);

        this.disposeWithMe(
            this.registerEventHandler(
                this.Event.CrosshairHighlightEnabledChanged,
                () => commandService.onCommandExecuted((commandInfo) => {
                    if (
                        commandInfo.id === EnableCrosshairHighlightOperation.id ||
                    commandInfo.id === DisableCrosshairHighlightOperation.id ||
                    commandInfo.id === ToggleCrosshairHighlightOperation.id
                    ) {
                        const activeSheet = this.getActiveSheet();
                        if (!activeSheet) return;
                        this.fireEvent(this.Event.CrosshairHighlightEnabledChanged, {
                            enabled: this.getCrosshairHighlightEnabled(),
                            ...activeSheet,
                        });
                    }
                })
            )
        );

        this.disposeWithMe(
            this.registerEventHandler(
                this.Event.CrosshairHighlightColorChanged,
                () => commandService.onCommandExecuted((commandInfo) => {
                    if (commandInfo.id === SetCrosshairHighlightColorOperation.id) {
                        const activeSheet = this.getActiveSheet();
                        if (!activeSheet) return;
                        this.fireEvent(this.Event.CrosshairHighlightColorChanged, {
                            color: this.getCrosshairHighlightColor(),
                            ...activeSheet,
                        });
                    }
                })
            )
        );
    }

    override setCrosshairHighlightEnabled(enabled: boolean): FCrabTable {
        if (enabled) {
            this._commandService.syncExecuteCommand(EnableCrosshairHighlightOperation.id);
        } else {
            this._commandService.syncExecuteCommand(DisableCrosshairHighlightOperation.id);
        }

        return this;
    }

    override setCrosshairHighlightColor(color: string): FCrabTable {
        this._commandService.syncExecuteCommand(SetCrosshairHighlightColorOperation.id, {
            value: color,
        } as ISetCrosshairHighlightColorOperationParams);
        return this;
    }

    override getCrosshairHighlightEnabled(): boolean {
        const crosshairHighlightService = this._injector.get(SheetsCrosshairHighlightService);
        return crosshairHighlightService.enabled;
    }

    override getCrosshairHighlightColor(): string {
        const crosshairHighlightService = this._injector.get(SheetsCrosshairHighlightService);
        return crosshairHighlightService.color;
    }

    override get CROSSHAIR_HIGHLIGHT_COLORS(): string[] {
        return CROSSHAIR_HIGHLIGHT_COLORS;
    }
}

FEventName.extend(FSheetCrosshairHighlightEventMixin);
FCrabTable.extend(FUniverCrosshairHighlightMixin);

declare module '@crabtable/core/facade' {
    // eslint-disable-next-line ts/naming-convention
    interface FCrabTable extends IFUniverCrosshairHighlightMixin {}

    // eslint-disable-next-line ts/naming-convention
    interface FEventName extends IFSheetCrosshairHighlightEventMixin {
    }

    interface IEventParamConfig extends ISheetCrosshairHighlightEventConfigs {}
}
