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

import type { Observable } from 'rxjs';
import { UniverType } from '@univerjs/protocol';
import { Disposable } from '../shared/lifecycle';

export type { UniverType as CrabTableType } from '@univerjs/protocol';

/** Instance type enum for CrabTable (matches @univerjs/protocol UniverType values). */
export enum CrabTableInstanceType {
    CRABTABLE_SHEET = UniverType.UNIVER_SHEET,
    CRABTABLE_DOC = UniverType.UNIVER_DOC,
    CRABTABLE_SLIDE = UniverType.UNIVER_SLIDE,
    UNRECOGNIZED = (UniverType as unknown as { UNRECOGNIZED: number }).UNRECOGNIZED ?? -1,
    UNIVER_UNKNOWN = (UniverType as unknown as { UNIVER_UNKNOWN: number }).UNIVER_UNKNOWN ?? 0,
}

export type UnitType = UniverType | number;

/**
 * The base class for all units.
 */
export abstract class UnitModel<D = object, T extends UnitType = UnitType> extends Disposable {
    abstract readonly type: T;

    abstract getUnitId(): string;

    abstract name$: Observable<string>;
    abstract setName(name: string): void;

    abstract getSnapshot(): D;

    /** Get revision of the unit's snapshot. Note that revision should start from 1. */
    abstract getRev(): number;
    /** Increment the current revision. */
    abstract incrementRev(): void;
    /** Set revision of the current snapshot. */
    abstract setRev(rev: number): void;
}
