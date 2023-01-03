import * as React from 'react';
import { EditableDocContent, DocExample, BaseDocsBlock, UUI4, UUI3 } from '../common';

export class IconButtonDoc extends BaseDocsBlock {
    title = 'Icon Button';

    getPropsDocPath() {
        return {
            [UUI3]: './app/src/docProps/loveship/components/buttons/iconButton.doc.ts',
            [UUI4]: './app/src/docProps/epam-promo/components/buttons/iconButton.doc.tsx',
        };
    }


    renderContent() {
        return (
            <>
                <EditableDocContent fileName='icon-button-descriptions' />
                { this.renderSectionTitle('Examples') }
                <DocExample
                    title='Basic'
                    path='./examples/iconButton/Basic.example.tsx'
                />
            </>
        );
    }
}
