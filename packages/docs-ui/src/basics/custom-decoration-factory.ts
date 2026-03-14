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

import type { CustomDecorationType, DocumentDataModel, IAccessor, IMutationInfo } from '@crabtable/core';
import type { IRichTextEditingMutationParams } from '@crabtable/docs';
import type { ITextRangeWithStyle } from '@crabtable/engine-render';
import { BuildTextUtils, CrabTableInstanceType, ICrabTableInstanceService, JSONX } from '@crabtable/core';
import { DocSelectionManagerService, RichTextEditingMutation } from '@crabtable/docs';

interface IAddCustomDecorationParam {
    unitId: string;
    ranges: ITextRangeWithStyle[];
    segmentId?: string;
    id: string;
    type: CustomDecorationType;
}

export function addCustomDecorationFactory(param: IAddCustomDecorationParam) {
    const { unitId, ranges, id, type, segmentId } = param;

    const doMutation: IMutationInfo<IRichTextEditingMutationParams> = {
        id: RichTextEditingMutation.id,
        params: {
            unitId,
            actions: [],
            textRanges: undefined,
            // noHistory: true,
            segmentId,
        },
    };

    const jsonX = JSONX.getInstance();
    const textX = BuildTextUtils.customDecoration.add({ ranges, id, type });

    doMutation.params.actions = jsonX.editOp(textX.serialize());
    return doMutation;
}

interface IAddCustomDecorationFactoryParam {
    segmentId?: string;
    id: string;
    type: CustomDecorationType;
    unitId?: string;
}

export function addCustomDecorationBySelectionFactory(accessor: IAccessor, param: IAddCustomDecorationFactoryParam) {
    const { segmentId, id, type, unitId: propUnitId } = param;
    const docSelectionManagerService = accessor.get(DocSelectionManagerService);
    const crabtableInstanceService = accessor.get(ICrabTableInstanceService);

    const documentDataModel = propUnitId ?
        crabtableInstanceService.getUnit<DocumentDataModel>(propUnitId, CrabTableInstanceType.CRABTABLE_DOC)
        : crabtableInstanceService.getCurrentUnitForType<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC);
    if (!documentDataModel) {
        return false;
    }

    const unitId = documentDataModel.getUnitId();
    const selections = docSelectionManagerService.getTextRanges({ unitId, subUnitId: unitId });
    if (!selections) {
        return false;
    }
    const body = documentDataModel.getBody();
    if (!body) {
        return false;
    }

    const doMutation = addCustomDecorationFactory(
        {
            unitId,
            ranges: selections as ITextRangeWithStyle[],
            id,
            type,
            segmentId,
        }
    );

    return doMutation;
}

export interface IDeleteCustomRangeParam {
    unitId: string;
    id: string;
    segmentId?: string;
}

export function deleteCustomDecorationFactory(accessor: IAccessor, params: IDeleteCustomRangeParam) {
    const { unitId, id, segmentId } = params;
    const crabtableInstanceService = accessor.get(ICrabTableInstanceService);

    const documentDataModel = crabtableInstanceService.getUnit<DocumentDataModel>(unitId);
    if (!documentDataModel) {
        return false;
    }

    const doMutation: IMutationInfo<IRichTextEditingMutationParams> = {
        id: RichTextEditingMutation.id,
        params: {
            unitId,
            actions: [],
            textRanges: undefined,
            // noHistory: true,
            segmentId,
        },
    };

    const textX = BuildTextUtils.customDecoration.delete({ id, segmentId, documentDataModel });
    if (!textX) {
        return false;
    }
    const jsonX = JSONX.getInstance();

    doMutation.params.actions = jsonX.editOp(textX.serialize());
    return doMutation;
}
