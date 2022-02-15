import * as React from 'react';
import { ICanBeInvalid, IHasForwardedRef, IHasCX, IEditable, IDisableable, IHasDirection, directionMode, ICanBeReadonly, cx, IHasRawProps } from '@epam/uui-core';
import { CheckboxProps } from '../inputs/Checkbox';
import * as css from './CheckboxGroup.scss';

interface CheckboxGroupItem<TValue> {
    name: string;
    id: TValue;
    renderName?: () => React.ReactNode;
}

export interface CheckboxGroupProps<TValue> extends ICanBeInvalid, IHasCX, IEditable<TValue[]>, IDisableable, IHasDirection, ICanBeReadonly, IHasRawProps<HTMLFieldSetElement>, IHasForwardedRef<HTMLFieldSetElement> {
    CheckboxInput?: React.ComponentType<CheckboxProps>;
    items: CheckboxGroupItem<TValue>[];
}

export class CheckboxGroup<TValue> extends React.Component<CheckboxGroupProps<TValue>> {
    handleChange = (selected: boolean, newVal: TValue) => {
        let newSelection;
        const currentValue = this.props.value || [];

        if (selected) {
            newSelection = currentValue.concat([newVal]);
        } else {
            newSelection = currentValue.filter(i => i !== newVal);
        }

        this.props.onValueChange(newSelection);
    }

    render() {
        const { CheckboxInput, isDisabled, isInvalid } = this.props;
        const currentValue = this.props.value || [];
        const direction = this.props.direction || 'vertical';

        return (
            <fieldset ref={ this.props.forwardedRef } className={ cx(directionMode[direction], this.props.cx, css.container) } { ...this.props.rawProps }>
                {
                    this.props.items.map(i =>
                        <CheckboxInput
                            renderLabel={ i.renderName ? i.renderName : () => i.name }
                            value={ currentValue.indexOf(i.id) !== -1 }
                            onValueChange={ (selected) => this.handleChange(selected, i.id) }
                            isDisabled={ isDisabled }
                            isReadonly={ this.props.isReadonly }
                            isInvalid={ isInvalid }
                            isRequired={ this.props.isRequired }
                            key={ i.id.toString() }
                        />,
                    )
                }
            </fieldset>
        );
    }
}