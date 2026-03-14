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

import type { Workbook } from '@crabtable/core';

import type { IRangeSelectorInstance } from '@crabtable/sheets-formula-ui';
import { CrabTableInstanceType, ICrabTableInstanceService, ILogService } from '@crabtable/core';
import { Button } from '@crabtable/design';
import { RangeSelector } from '@crabtable/sheets-formula-ui';
import { useDependency, useObservable } from '@crabtable/ui';
import { useMemo, useRef } from 'react';

export const ButtonRangeSelector = () => {
    const selectorRef = useRef<IRangeSelectorInstance>(null);
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const workbook = useObservable(useMemo(() => crabtableInstanceService.getCurrentTypeOfUnit$<Workbook>(CrabTableInstanceType.CRABTABLE_SHEET), []));
    const worksheet = useObservable(useMemo(() => workbook?.activeSheet$, [workbook]));
    const loggerSerive = useDependency(ILogService);

    return (
        <>
            <Button onClick={() => selectorRef.current?.showDialog([])}>Start Select</Button>
            <RangeSelector
                key={`${workbook?.getUnitId() ?? ''}_${worksheet?.getSheetId() ?? ''}`}
                selectorRef={selectorRef}
                hideEditor
                unitId={workbook?.getUnitId() ?? ''}
                subUnitId={worksheet?.getSheetId() ?? ''}
                onChange={(_, str) => {
                    loggerSerive.log('==onChange', str);
                }}
            />
        </>
    );
};
