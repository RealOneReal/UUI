import { EText, PlateEditor, TText, Value, isMarkActive } from '@udecode/plate-common';
import type { StyledLeafProps } from '@udecode/plate-styled-components';
import React from 'react';

import { isPluginActive } from '../../helpers';

import { ToolbarButton } from '../../implementation/ToolbarButton';

import { MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE, createBoldPlugin, createItalicPlugin, createUnderlinePlugin } from '@udecode/plate-basic-marks';
import { ReactComponent as BoldIcon } from "../../icons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../icons/italic.svg";
import { ReactComponent as UnderlineIcon } from "../../icons/underline.svg";
import { onClickToolbarButton } from '../../utils/onClickToolbarButton';

const BOLD_KEY = 'uui-richTextEditor-bold';
const ITALIC_KEY = 'uui-richTextEditor-italic';
const UNDERLINE_KEY = 'uui-richTextEditor-underlined';

const Bold = <V extends Value = Value, N extends TText = EText<V>>(
    props: StyledLeafProps<V, N>,
) => {
    const { attributes, children } = props;

    return (
        <span { ...attributes }><strong>{ children }</strong></span>
    );
};

const Italic = <V extends Value = Value, N extends TText = EText<V>>(
    props: StyledLeafProps<V, N>,
) => {
    const { attributes, children } = props;

    return (
        <span { ...attributes }><i>{ children }</i></span>
    );
};

const Underline = <V extends Value = Value, N extends TText = EText<V>>(
    props: StyledLeafProps<V, N>,
) => {
    const { attributes, children } = props;

    return (
        <span { ...attributes }><u>{ children }</u></span>
    );
};

const boldPlugin = createBoldPlugin({
    type: BOLD_KEY,
    component: Bold,
});

const italicPlugin = createItalicPlugin({
    type: ITALIC_KEY,
    component: Italic,
});

const underlinePlugin = createUnderlinePlugin({
    type: UNDERLINE_KEY,
    component: Underline,
});

interface IToolbarButton {
    editor: PlateEditor;
}

export const BoldButton = ({ editor }: IToolbarButton) => {
    if (!isPluginActive(MARK_BOLD)) return null;
    return (
        <ToolbarButton
            onClick={ onClickToolbarButton(editor, BOLD_KEY) }
            icon={ BoldIcon }
            isActive={ !!editor?.selection && isMarkActive(editor, BOLD_KEY!) }
        />
    );
};

export const ItalicButton = ({ editor }: IToolbarButton) => {
    if (!isPluginActive(MARK_ITALIC)) return null;
    return (
        <ToolbarButton
            onClick={ onClickToolbarButton(editor, ITALIC_KEY) }
            icon={ ItalicIcon }
            isActive={ !!editor?.selection && isMarkActive(editor, ITALIC_KEY!) }
        />
    );
};

export const UnderlineButton = ({ editor }: IToolbarButton) => {
    if (!isPluginActive(MARK_UNDERLINE)) return null;
    return (
        <ToolbarButton
            onClick={ onClickToolbarButton(editor, UNDERLINE_KEY) }
            icon={ UnderlineIcon }
            isActive={ !!editor?.selection && isMarkActive(editor, UNDERLINE_KEY!) }
        />
    );
};

export const baseMarksPlugin = () => ([
    boldPlugin,
    underlinePlugin,
    italicPlugin,
]);



