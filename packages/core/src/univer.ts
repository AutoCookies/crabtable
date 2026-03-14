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

import type { Theme } from '@crabtable/themes';
import type { Dependency, IDisposable } from './common/di';
import type { UnitModel, UnitType } from './common/unit';
import type { LogLevel } from './services/log/log.service';
import type { DependencyOverride } from './services/plugin/plugin-override';
import type { Plugin, PluginCtor } from './services/plugin/plugin.service';
import type { ILocales } from './shared';
import type { IWorkbookData } from './sheets/typedef';
import type { LocaleType } from './types/enum/locale-type';
import type { IDocumentData, ISlideData } from './types/interfaces';
import { Injector, touchDependencies } from './common/di';
import { CrabTableInstanceType } from './common/unit';
import { DocumentDataModel } from './docs/data-model/document-data-model';
import { AuthzIoLocalService } from './services/authz-io/authz-io-local.service';
import { IAuthzIoService } from './services/authz-io/type';
import { COMMAND_LOG_EXECUTION_CONFIG_KEY, CommandService, ICommandService } from './services/command/command.service';
import { ConfigService, IConfigService } from './services/config/config.service';
import { ContextService, IContextService } from './services/context/context.service';
import { ErrorService } from './services/error/error.service';
import { CrabTableInstanceService, ICrabTableInstanceService } from './services/instance/instance.service';
import { LifecycleStages } from './services/lifecycle/lifecycle';
import { LifecycleService } from './services/lifecycle/lifecycle.service';
import { LocaleService } from './services/locale/locale.service';
import { DesktopLogService, ILogService } from './services/log/log.service';
import { MentionIOLocalService } from './services/mention-io/mention-io-local.service';
import { IMentionIOService } from './services/mention-io/type';
import { PermissionService } from './services/permission/permission.service';
import { IPermissionService } from './services/permission/type';
import { mergeOverrideWithDependencies } from './services/plugin/plugin-override';
import { PluginService } from './services/plugin/plugin.service';
import { ResourceLoaderService } from './services/resource-loader/resource-loader.service';
import { IResourceLoaderService } from './services/resource-loader/type';
import { ResourceManagerService } from './services/resource-manager/resource-manager.service';
import { IResourceManagerService } from './services/resource-manager/type';
import { ThemeService } from './services/theme/theme.service';
import { IUndoRedoService, LocalUndoRedoService } from './services/undoredo/undoredo.service';
import { UserManagerService } from './services/user-manager/user-manager.service';
import { DisposableCollection, toDisposable } from './shared';
import { Workbook } from './sheets/workbook';
import { SlideDataModel } from './slides/slide-model';

export interface ICrabTableConfig {
    /**
     * The theme of the CrabTable instance, default using the default theme.
     */
    theme?: Theme;

    /**
     * Whether to use dark mode.
     * @default false
     */
    darkMode?: boolean;

    /**
     * The locale of the CrabTable instance.
     */
    locale?: LocaleType;

    /**
     * The locales to be used
     */
    locales?: ILocales;

    /**
     * The log level of the CrabTable instance.
     */
    logLevel?: LogLevel;

    /**
     * Whether to enable logging for command execution.
     * @default false
     */
    logCommandExecution?: boolean;

    /**
     * The override dependencies of the CrabTable instance.
     */
    override?: DependencyOverride;
}

/**
 * @hideconstructor
 */
export class CrabTable implements IDisposable {
    private _startedTypes = new Set<UnitType>();
    private _injector: Injector;

    private get _crabtableInstanceService(): ICrabTableInstanceService {
        return this._injector.get(ICrabTableInstanceService);
    }

    private get _pluginService(): PluginService {
        return this._injector.get(PluginService);
    }

    private _disposingCallbacks = new DisposableCollection();

    /**
     * Create a CrabTable instance.
     * @param config Configuration data for CrabTable
     * @param parentInjector An optional parent injector of the CrabTable injector. For more information, see https://redi.wendell.fun/docs/hierarchy.
     */
    constructor(config: Partial<ICrabTableConfig> = {}, parentInjector?: Injector) {
        const injector = this._injector = createUniverInjector(parentInjector, config?.override);

        const { theme, darkMode, locale, locales, logLevel, logCommandExecution } = config;
        if (theme) this._injector.get(ThemeService).setTheme(theme);
        if (darkMode) this._injector.get(ThemeService).setDarkMode(darkMode);
        if (locales) this._injector.get(LocaleService).load(locales);
        if (locale) this._injector.get(LocaleService).setLocale(locale);
        if (logLevel) this._injector.get(ILogService).setLogLevel(logLevel);
        if (logCommandExecution !== undefined) {
            this._injector.get(IConfigService).setConfig(COMMAND_LOG_EXECUTION_CONFIG_KEY, logCommandExecution);
        }

        this._init(injector);
    }

    /**
     * @ignore
     */
    __getInjector(): Injector {
        return this._injector;
    }

    /**
     * Register a callback function which will be called when this CrabTable instance is disposing.
     *
     * @ignore
     *
     * @param callback The callback function.
     * @returns To remove this callback function from this CrabTable instance's on disposing list.
     */
    onDispose(callback: () => void): IDisposable {
        const d = this._disposingCallbacks.add(toDisposable(callback));
        return toDisposable(() => d.dispose(true));
    }

    dispose(): void {
        this._disposingCallbacks.dispose();
        this._injector.dispose();
    }

    setLocale(locale: LocaleType): void {
        this._injector.get(LocaleService).setLocale(locale);
    }

    createUnit<T, U extends UnitModel>(type: UnitType, data: Partial<T>): U {
        return this._crabtableInstanceService.createUnit(type, data);
    }

    /**
     * Create a CrabTable sheet instance with internal dependency injection.
     *
     * @deprecated use `createUnit` instead
     */
    createCrabTableSheet(data: Partial<IWorkbookData>): Workbook {
        this._injector.get(ILogService).warn('[CrabTable]', 'CrabTable.createCrabTableSheet is deprecated, use createUnit instead');
        return this._crabtableInstanceService.createUnit<IWorkbookData, Workbook>(CrabTableInstanceType.CRABTABLE_SHEET, data);
    }

    /**
     * @deprecated use `createUnit` instead
     */
    createCrabTableDoc(data: Partial<IDocumentData>): DocumentDataModel {
        this._injector.get(ILogService).warn('[CrabTable]', 'CrabTable.createCrabTableDoc is deprecated, use createUnit instead');
        return this._crabtableInstanceService.createUnit<IDocumentData, DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC, data);
    }

    /**
     * @deprecated use `createUnit` instead
     */
    createCrabTableSlide(data: Partial<ISlideData>): SlideDataModel {
        this._injector.get(ILogService).warn('[CrabTable]', 'CrabTable.createCrabTableSlide is deprecated, use createUnit instead');
        return this._crabtableInstanceService.createUnit<ISlideData, SlideDataModel>(CrabTableInstanceType.CRABTABLE_SLIDE, data);
    }

    private _init(injector: Injector): void {
        this._crabtableInstanceService.registerCtorForType(CrabTableInstanceType.CRABTABLE_SHEET, Workbook);
        this._crabtableInstanceService.registerCtorForType(CrabTableInstanceType.CRABTABLE_DOC, DocumentDataModel);
        this._crabtableInstanceService.registerCtorForType(CrabTableInstanceType.CRABTABLE_SLIDE, SlideDataModel);

        const crabtableInstanceService = injector.get(ICrabTableInstanceService) as CrabTableInstanceService;
        crabtableInstanceService.__setCreateHandler(
            (type: UnitType, data, ctor, options) => {
                if (!this._startedTypes.has(type)) {
                    this._pluginService.startPluginsForType(type);
                    this._startedTypes.add(type);

                    const model = injector.createInstance(ctor, data);
                    crabtableInstanceService.__addUnit(model, options);

                    this._tryProgressToReady();

                    return model;
                }

                const model = injector.createInstance(ctor, data);
                crabtableInstanceService.__addUnit(model, options);
                return model;
            }
        );
    }

    private _tryProgressToReady(): void {
        const lifecycleService = this._injector.get(LifecycleService);
        if (lifecycleService.stage < LifecycleStages.Ready) {
            this._injector.get(LifecycleService).stage = LifecycleStages.Ready;
        }
    }

    /** Register a plugin into univer. */
    registerPlugin<T extends PluginCtor<Plugin>>(plugin: T, config?: ConstructorParameters<T>[0]): void {
        this._pluginService.registerPlugin(plugin, config);
    }

    /**
     * Register multiple plugins into univer.
     * @param plugins An array of tuples, where each tuple contains a plugin constructor and its optional configuration.
     */
    registerPlugins<
        T extends readonly (
            | readonly [PluginCtor<Plugin>]
            | readonly [PluginCtor<Plugin>, unknown]
        )[]
    >(
        plugins: {
            readonly [K in keyof T]: T[K] extends readonly [infer P]
                ? P extends PluginCtor<Plugin>
                    ? readonly [P]
                    : T[K]
                : T[K] extends readonly [infer P, unknown]
                    ? P extends PluginCtor<Plugin>
                        ? readonly [P, ConstructorParameters<P>[0]?]
                        : T[K]
                    : T[K];
        }
    ): void {
        plugins.forEach((item) => {
            const [plugin, config] = item;
            this._pluginService.registerPlugin(plugin, config);
        });
    }
}

function createUniverInjector(parentInjector?: Injector, override?: DependencyOverride): Injector {
    const dependencies: Dependency[] = mergeOverrideWithDependencies([
        [ErrorService],
        [LocaleService],
        [ThemeService],
        [LifecycleService],
        [PluginService],
        [UserManagerService],

        // abstract services
        [ICrabTableInstanceService, { useClass: CrabTableInstanceService }],
        [IPermissionService, { useClass: PermissionService }],
        [ILogService, { useClass: DesktopLogService, lazy: true }],
        [ICommandService, { useClass: CommandService }],
        [IUndoRedoService, { useClass: LocalUndoRedoService, lazy: true }],
        [IConfigService, { useClass: ConfigService }],
        [IContextService, { useClass: ContextService }],
        [IResourceManagerService, { useClass: ResourceManagerService, lazy: true }],
        [IResourceLoaderService, { useClass: ResourceLoaderService, lazy: true }],
        [IAuthzIoService, { useClass: AuthzIoLocalService }],
        [IMentionIOService, { useClass: MentionIOLocalService, lazy: true }],
    ], override);

    const injector = parentInjector ? parentInjector.createChild(dependencies) : new Injector(dependencies);
    touchDependencies(injector, [
        [UserManagerService],
        [IResourceLoaderService],
    ]);

    return injector;
}
