import React from 'react';
import { EditableDocContent, DocExample, BaseDocsBlock, UUI3, UUI4 } from '../common';

export class TabButtonDoc extends BaseDocsBlock {
    title = 'Tab Button';

    getPropsDocPath() {
        return {
            [UUI3]: './app/src/docProps/loveship/components/buttons/tabButton.doc.ts',
            [UUI4]: './app/src/docProps/epam-promo/components/buttons/tabButton.doc.ts',
        };
    }
    
    renderContent() {
        return (
            <>
                <EditableDocContent fileName='tab-button-descriptions' />
                { this.renderSectionTitle('Examples') }
                <DocExample
                    title='Basic'
                    path='./examples/tabButton/Basic.example.tsx'
                />
            </>
        );
    }
}
