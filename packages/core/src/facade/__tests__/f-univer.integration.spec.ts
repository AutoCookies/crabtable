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

import type { ICommand, IDisposable, IDocumentData } from '@crabtable/core';
import { CommandType, CrabTable, CrabTableInstanceType, HorizontalAlign, ICommandService, ICrabTableInstanceService, IUndoRedoService, LocaleService, ThemeService } from '@crabtable/core';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FCrabTable } from '../f-univer';

const TEST_COMMAND_ID = 'test.facade.command';
const TEST_MUTATION_ID = 'test.facade.mutation';

function createDocData(id: string): Partial<IDocumentData> {
    return {
        id,
        body: {
            dataStream: 'Hello\r\n',
        },
        documentStyle: {
            pageSize: { width: 100, height: 100 },
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
        },
    };
}

describe('FCrabTable integration', () => {
    let univer: CrabTable;
    let crabtableAPI: FCrabTable;

    beforeEach(() => {
        univer = new CrabTable();
        univer.createUnit(CrabTableInstanceType.CRABTABLE_SHEET, {
            id: 'sheet-for-facade',
            name: 'Sheet',
            styles: {},
            sheetOrder: ['sheet-1'],
            sheets: {
                'sheet-1': {
                    id: 'sheet-1',
                    name: 'Sheet1',
                    cellData: {},
                    rowCount: 5,
                    columnCount: 5,
                },
            },
        });
        crabtableAPI = FCrabTable.newAPI(univer);
    });

    afterEach(() => {
        univer.dispose();
    });

    it('should bridge lifecycle, locale, unit and command flows through the facade api', async () => {
        const injector = univer.__getInjector();
        const commandService = injector.get(ICommandService);
        const localeService = injector.get(LocaleService);
        const themeService = injector.get(ThemeService);
        const logs: string[] = [];
        const disposables: IDisposable[] = [];

        commandService.registerCommand({
            id: TEST_COMMAND_ID,
            type: CommandType.COMMAND,
            handler: (_accessor, params?: { value: string }) => params?.value === 'ok',
        } as ICommand<{ value: string }, boolean>);

        disposables.push(
            crabtableAPI.addEvent(crabtableAPI.Event.LifeCycleChanged, ({ stage }) => logs.push(`lifecycle:${stage}`)),
            crabtableAPI.addEvent(crabtableAPI.Event.BeforeCommandExecute, ({ id }) => logs.push(`before:${id}`)),
            crabtableAPI.addEvent(crabtableAPI.Event.CommandExecuted, ({ id }) => logs.push(`after:${id}`)),
            crabtableAPI.addEvent(crabtableAPI.Event.DocCreated, ({ unitId }) => logs.push(`doc-created:${unitId}`)),
            crabtableAPI.addEvent(crabtableAPI.Event.DocDisposed, ({ unitId }) => logs.push(`doc-disposed:${unitId}`))
        );

        crabtableAPI.loadLocales('esES', {
            facade: { hello: 'Hola {0}' },
        } as never);
        crabtableAPI.setLocale('esES');
        crabtableAPI.toggleDarkMode(true);

        expect(localeService.getCurrentLocale()).toBe('esES');
        expect(localeService.t('facade.hello', 'Univer')).toBe('Hola Univer');
        expect(themeService.darkMode).toBe(true);

        expect(await crabtableAPI.executeCommand(TEST_COMMAND_ID, { value: 'ok' })).toBe(true);
        expect(crabtableAPI.syncExecuteCommand(TEST_COMMAND_ID, { value: 'ok' })).toBe(true);

        const doc = univer.createUnit(CrabTableInstanceType.CRABTABLE_DOC, createDocData('doc-from-facade'));
        expect(crabtableAPI.getCurrentLifecycleStage()).toBeGreaterThanOrEqual(1);
        expect(crabtableAPI.disposeUnit(doc.getUnitId())).toBe(true);

        const user = crabtableAPI.getUserManager().getCurrentUser();
        expect(user).toBeDefined();

        const blob = crabtableAPI.newBlob()
            .setDataFromString('facade-data', 'text/plain')
            .getAs('text/csv');

        expect(await blob.getDataAsString()).toBe('facade-data');
        expect(blob.getContentType()).toBe('text/csv');
        expect((await blob.copyBlob().getBytes()).length).toBeGreaterThan(0);

        const textStyle = crabtableAPI.newTextStyle({
            ff: 'Inter',
            fs: 12,
        }).build();
        const paragraph = crabtableAPI.newParagraphStyle({
            horizontalAlign: HorizontalAlign.CENTER,
            textStyle,
        }).build();

        expect(textStyle.ff).toBe('Inter');
        expect(paragraph.horizontalAlign).toBe(HorizontalAlign.CENTER);
        expect(crabtableAPI.newTextDecoration({ s: crabtableAPI.Enum.BooleanNumber.TRUE }).build().s).toBe(crabtableAPI.Enum.BooleanNumber.TRUE);
        expect(crabtableAPI.newRichTextValue(createDocData('facade-rich-text') as IDocumentData).getData().body?.dataStream).toBe('Hello\r\n');
        expect(crabtableAPI.Util.tools.deleteBlank(' f a c a d e ')).toBe('facade');
        expect(crabtableAPI.Util.rectangle.intersects(
            { startRow: 0, endRow: 1, startColumn: 0, endColumn: 1 },
            { startRow: 1, endRow: 2, startColumn: 1, endColumn: 2 }
        )).toBe(true);
        expect(crabtableAPI.Util.numfmt.format('#,##0.00', 1234.5)).toBe('1,234.50');

        expect(logs).toEqual(expect.arrayContaining([
            `before:${TEST_COMMAND_ID}`,
            `after:${TEST_COMMAND_ID}`,
            'doc-created:doc-from-facade',
            'doc-disposed:doc-from-facade',
        ]));

        disposables.forEach((disposable) => disposable.dispose());
    });

    it('should support cancelable commands and undo-redo facade events', async () => {
        const injector = univer.__getInjector();
        const commandService = injector.get(ICommandService);
        const undoRedoService = injector.get(IUndoRedoService);
        injector.get(ICrabTableInstanceService).focusUnit('sheet-for-facade');
        const executed: string[] = [];
        const undoRedoLogs: string[] = [];

        commandService.registerCommand({
            id: TEST_COMMAND_ID,
            type: CommandType.COMMAND,
            handler: () => {
                executed.push('command');
                return true;
            },
        } as ICommand);
        commandService.registerCommand({
            id: TEST_MUTATION_ID,
            type: CommandType.MUTATION,
            handler: (_accessor, params?: { label: string }) => {
                executed.push(params?.label ?? 'mutation');
                return true;
            },
        } as ICommand<{ label: string }, boolean>);

        const cancelCommand = crabtableAPI.addEvent(crabtableAPI.Event.BeforeCommandExecute, (event) => {
            if (event.id === TEST_COMMAND_ID) {
                event.cancel = true;
            }
        });

        expect(await crabtableAPI.executeCommand(TEST_COMMAND_ID)).toBe(false);
        expect(executed).toEqual([]);
        cancelCommand.dispose();

        undoRedoService.pushUndoRedo({
            unitID: 'sheet-for-facade',
            id: 'undo-item',
            undoMutations: [{ id: TEST_MUTATION_ID, params: { label: 'undo' } }],
            redoMutations: [{ id: TEST_MUTATION_ID, params: { label: 'redo' } }],
        });

        const beforeUndo = crabtableAPI.addEvent(crabtableAPI.Event.BeforeUndo, (event) => {
            undoRedoLogs.push(`before-undo:${event.id}`);
            event.cancel = true;
        });

        expect(await crabtableAPI.undo()).toBe(false);
        expect(executed).toEqual([]);

        beforeUndo.dispose();

        const beforeRedo = crabtableAPI.addEvent(crabtableAPI.Event.BeforeRedo, ({ id }) => undoRedoLogs.push(`before-redo:${id}`));
        const undoEvent = crabtableAPI.addEvent(crabtableAPI.Event.Undo, ({ id }) => undoRedoLogs.push(`undo:${id}`));
        const redoEvent = crabtableAPI.addEvent(crabtableAPI.Event.Redo, ({ id }) => undoRedoLogs.push(`redo:${id}`));

        expect(await crabtableAPI.undo()).toBe(true);
        expect(await crabtableAPI.redo()).toBe(true);
        expect(executed).toEqual(['undo', 'redo']);
        expect(undoRedoLogs).toEqual(expect.arrayContaining([
            'before-undo:univer.command.undo',
            'undo:univer.command.undo',
            'before-redo:univer.command.redo',
            'redo:univer.command.redo',
        ]));

        beforeRedo.dispose();
        undoEvent.dispose();
        redoEvent.dispose();
    });
});
