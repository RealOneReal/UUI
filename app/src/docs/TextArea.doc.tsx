import * as React from 'react';
import { EditableDocContent, DocExample, BaseDocsBlock, UUI3, UUI4 } from '../common';

export class TextAreaDoc extends BaseDocsBlock {
    title = 'TextArea';

    getPropsDocPath() {
        return {
            [UUI3]: './app/src/docProps/loveship/components/inputs/textArea.doc.ts',
            [UUI4]: './app/src/docProps/epam-promo/components/inputs/textArea.doc.ts',
        };
    }

    renderContent() {
        return (
            <>
                <EditableDocContent fileName='textArea-descriptions' />
                { this.renderSectionTitle('Examples') }
                <DocExample
                    title='Basic'
                    path='./examples/textArea/Basic.example.tsx'
                />
                <DocExample
                    title='Advanced'
                    path='./examples/textArea/Advanced.example.tsx'
                />
            </>
        );
    }
}
