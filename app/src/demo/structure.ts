import { DemoForm } from './form';
import { DemoDnd } from './dnd';
import { TimelineDemo } from './timeline/TimelineDemo';
import { DemoTable } from "./table";
import { RichTextEditorDemo } from "./RTE/RichTextEditorDemo";
import { DemoTablePaged } from "./tablePaged";

export interface DemoItem {
    id: string;
    name: string;
    component?: any;
    source: string;
    previewImage: string;
}

export const demoItems: DemoItem[] = [
    { id: 'dnd', name: 'Drag & Drop', component: DemoDnd, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/dnd', previewImage: '/static/images/DemoDnD.png' },
    { id: 'form', name: 'Form', component: DemoForm, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/form', previewImage: '/static/images/DemoForms.png' },
    { id: 'table', name: 'Table', component: DemoTable, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/table', previewImage: '/static/images/DemoTable.png' },
    { id: 'RTE', name: 'Rich Text Editor', component: RichTextEditorDemo, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/RTE', previewImage: '/static/images/DemoRTE.png' },
    { id: 'timeline', name: 'Timeline', component: TimelineDemo, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/timeline', previewImage: '/static/images/DemoTimeline.png' },
    { id: 'tablePaged', name: 'Demo Table Paged', component: DemoTablePaged, source: 'https://github.com/epam/UUI/tree/main/app/src/demo/table', previewImage: '/static/images/DemoTable.png' },
];