import * as types from '../types';
import { Checkbox as uuiCheckbox, CheckboxProps, CheckboxMods as UuiCheckboxMods } from '@epam/uui';
import { withMods } from '@epam/uui-core';
import css from './Checkbox.scss';
import { ReactComponent as TickIcon } from '../icons/checkbox-checked.svg';
import { ReactComponent as IndeterminateIcon } from '../icons/checkbox-partial.svg';

export interface CheckboxMods extends UuiCheckboxMods {
    theme?: 'light' | 'dark';
}

export function applyCheckboxMods(mods: CheckboxMods & CheckboxProps) {
    return [
        'uui-theme-loveship',
        mods.theme === 'dark' && css['theme-dark'],
    ];
}

export const Checkbox = withMods<CheckboxProps, CheckboxMods>(
    uuiCheckbox,
    applyCheckboxMods,
    () => ({ icon: TickIcon, indeterminateIcon: IndeterminateIcon }),
);
