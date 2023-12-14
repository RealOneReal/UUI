import { withMods } from '@epam/uui-core';
import * as uuiComponents from '@epam/uui-components';
import { systemIcons } from '../../icons/icons';
import css from './Accordion.module.scss';

interface AccordionMods {
    /**
     * Defines component positioning mode.
     * @default 'block'
     */
    mode?: 'block' | 'inline';
    /*
    * Defines component padding.
    */
    padding?: '0' | '6' | '12' | '18';
}

/** Represents the properties of the Accordion component. */
export type AccordionProps = AccordionMods & uuiComponents.AccordionProps;

const getMode = (mode: AccordionMods['mode']) => {
    return mode || 'block';
};

function applyAccordionMods(mods: AccordionProps) {
    return [
        css.root,
        css['mode-' + getMode(mods.mode)],
        mods.padding && css['padding-' + mods.padding],
    ];
}

export const Accordion = withMods<uuiComponents.AccordionProps, AccordionMods>(uuiComponents.Accordion, applyAccordionMods, (mods) => ({
    dropdownIcon: mods.dropdownIcon !== null && systemIcons[getMode(mods.mode) === 'block' ? '60' : '30'].foldingArrow,
}));
