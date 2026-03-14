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

import type { ISocket } from '@crabtable/network';
import { FCrabTable } from '@crabtable/core/facade';
import { WebSocketService } from '@crabtable/network';
import { FNetwork } from './f-network';

/**
 * @ignore
 */
interface IFUniverNetworkMixin {
    /**
     * Get the network API of Univer, with the help of which you can send HTTP requests.
     */
    getNetwork(): FNetwork;

    /**
     * Set WebSocket URL for WebSocketService
     *
     * @param {string} url WebSocket URL
     * @returns {ISocket} WebSocket instance
     * @example
     * ```typescript
     * // Replace the URL with the address of your own WebSocket service
     * const ws = crabtableAPI.createSocket('ws://47.100.177.253:8449/ws');
     *
     * ws.open$.subscribe(() => {
     *   console.log('websocket opened');
     *   ws.send('hello');
     * });
     *
     * ws.message$.subscribe((message) => {
     *   console.log('websocket message', message);
     *   const content = JSON.parse(message.data).content;
     *   if (!content.includes('command')) {
     *     return;
     *   }
     *
     *   const commandInfo = JSON.parse(content);
     *   const { command, options } = commandInfo;
     *   const { id, params } = command;
     *
     *   // Upon receiving collaborative data, it is locally saved
     *   crabtableAPI.executeCommand(id, params, options);
     * });
     *
     * ws.close$.subscribe(() => {
     *   console.log('websocket closed');
     * });
     *
     * ws.error$.subscribe((error) => {
     *   console.log('websocket error', error);
     * });
     *
     * crabtableAPI.onCommandExecuted((command, options) => {
     *   // Only synchronize local mutations
     *   if (command.type !== 2 || options?.fromCollab || options?.onlyLocal || command.id === 'doc.mutation.rich-text-editing') {
     *     return;
     *   }
     *
     *   const commandInfo = JSON.stringify({ command, options: { fromCollab: true } });
     *   ws.send(commandInfo);
     * });
     * ```
     */
    createSocket(url: string): ISocket;
}

export class FCrabTableNetworkMixin extends FCrabTable implements IFUniverNetworkMixin {
    override getNetwork(): FNetwork {
        return this._injector.createInstance(FNetwork);
    }

    override createSocket(url: string): ISocket {
        const wsService = this._injector.createInstance(WebSocketService);
        const ws = wsService.createSocket(url);

        if (!ws) {
            throw new Error('[WebSocketService]: failed to create socket!');
        }

        return ws;
    }
}

FCrabTable.extend(FUniverNetworkMixin);
declare module '@crabtable/core/facade' {
    // eslint-disable-next-line ts/naming-convention
    interface FCrabTable extends IFUniverNetworkMixin { }
}
