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

import type { DocumentDataModel } from '@crabtable/core';
import type { IDocPopup } from '../services/doc-quick-insert-popup.service';
import { CrabTableInstanceType, ICrabTableInstanceService } from '@crabtable/core';
import { borderClassName, clsx } from '@crabtable/design';
import { DocSelectionManagerService } from '@crabtable/docs';
import { IRenderManagerService } from '@crabtable/engine-render';
import { ILayoutService, useDependency, useEvent, useObservable } from '@crabtable/ui';
import { IncreaseIcon } from '@univerjs/icons';
import { useMemo } from 'react';
import { combineLatest, map } from 'rxjs';
import { DocQuickInsertPopupService } from '../services/doc-quick-insert-popup.service';
import { QuickInsertButtonComponentKey } from './const';
import { DocQuickInsertMenuController } from './doc-quick-insert-menu.controller';

interface IQuickInsertButtonProps {
    className?: string;
}

export const QuickInsertButton = ({ className = '' }: IQuickInsertButtonProps) => {
    const docQuickInsertPopupService = useDependency(DocQuickInsertPopupService);
    const crabtableInstanceService = useDependency(ICrabTableInstanceService);
    const renderManagerService = useDependency(IRenderManagerService);
    const currentDoc = useObservable(useMemo(() => crabtableInstanceService.getCurrentTypeOfUnit$<DocumentDataModel>(CrabTableInstanceType.CRABTABLE_DOC), [crabtableInstanceService]));
    const currentUnit = currentDoc && renderManagerService.getRenderById(currentDoc.getUnitId());
    const docQuickInsertMenuController = currentUnit?.with(DocQuickInsertMenuController);
    const layoutService = useDependency(ILayoutService);
    const docSelectionManagerService = useDependency(DocSelectionManagerService);
    const editPopup = useObservable(docQuickInsertPopupService.editPopup$);

    const onClick: React.MouseEventHandler<HTMLDivElement> = useEvent((event) => {
        const p = docQuickInsertMenuController?.popup;
        if (!p) {
            return;
        }

        const allPopups = docQuickInsertPopupService.popups;
        // combine all popups into one
        const popup: IDocPopup = {
            keyword: '',
            menus$: combineLatest(allPopups.map((p) => p.menus$))
                .pipe(
                    map((menusCollection) => menusCollection.flat())
                ),
        };

        docSelectionManagerService.replaceDocRanges([{
            startOffset: p.startIndex,
            endOffset: p.startIndex,
        }]);
        docQuickInsertPopupService.setInputOffset({ start: p.startIndex - 1, end: p.startIndex - 1 });
        docQuickInsertPopupService.showPopup({
            popup,
            index: p.startIndex - 1,
            unitId: currentDoc?.getUnitId() ?? '',
        });
        setTimeout(() => {
            // keep the cursor in doc
            layoutService.focus();
        });
    });

    return (
        <div
            className={clsx(`
              univer-mr-1 univer-flex univer-cursor-pointer univer-items-center univer-gap-2.5 univer-rounded-full
              univer-p-1.5 univer-shadow-sm
              hover:univer-bg-gray-100
              dark:!univer-text-gray-200
              dark:hover:!univer-bg-gray-700
            `, borderClassName, {
                'univer-bg-gray-100 dark:!univer-bg-gray-700': editPopup,
                'univer-bg-white dark:!univer-bg-gray-900': !editPopup,
            }, className)}
            role="button"
            tabIndex={0}
            onClick={onClick}
        >
            <IncreaseIcon
                className={`
                  univer-text-gray-800
                  dark:!univer-text-gray-200
                `}
            />
        </div>
    );
};

QuickInsertButton.componentKey = QuickInsertButtonComponentKey;
