import * as React from 'react';
import {
    IEditable, IHasCX, IDisableable, IHasPlaceholder, ICanBeReadonly, IAnalyticableOnChange, UuiContexts, IDropdownToggler, UuiContext,
    isChildFocusable,
} from '@epam/uui-core';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { PickerBodyValue, defaultFormat, valueFormat, ViewType } from '..';
import { toValueDateFormat, toCustomDateFormat } from './helpers';
import { Dropdown } from '../..';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export interface BaseDatePickerProps extends IEditable<string | null>, IHasCX, IDisableable, IHasPlaceholder, ICanBeReadonly, IAnalyticableOnChange<string> {
    format: string;
    filter?(day: Dayjs): boolean;
    renderTarget?(props: IDropdownToggler): React.ReactNode;
    iconPosition?: 'left' | 'right';
    disableClear?: boolean;
    renderDay?: (day: Dayjs, onDayClick: (day: Dayjs) => void) => React.ReactElement<Element>;
    isHoliday?: (day: Dayjs) => boolean;
}

interface DatePickerState extends PickerBodyValue<string> {
    isOpen: boolean;
    inputValue: string | null;
}

const getStateFromValue = (value: string | null, format: string) => {
    if (!value) {
        return {
            inputValue: '',
            selectedDate: value,
            displayedDate: dayjs().startOf('day'),
        };
    }

    const inputFormat = format || defaultFormat;
    let inputValue = toCustomDateFormat(value, inputFormat);

    return {
        inputValue,
        selectedDate: value,
        displayedDate: dayjs(value, valueFormat).isValid() ? dayjs(value, valueFormat) : dayjs().startOf('day'),
    };
};

export abstract class BaseDatePicker<TProps extends BaseDatePickerProps> extends React.Component<TProps, DatePickerState> {
    static contextType = UuiContext;
    context: UuiContexts;

    state: DatePickerState = {
        isOpen: false,
        view: 'DAY_SELECTION',
        ...getStateFromValue(this.props.value, this.props.format),
    };

    abstract renderInput(props: IDropdownToggler): React.ReactNode;
    abstract renderBody(): React.ReactNode;

    static getDerivedStateFromProps(props: any, state: DatePickerState): DatePickerState | null {
        if (props.value !== state.selectedDate) {
            return {
                ...state,
                ...getStateFromValue(props.value, props.format),
            };
        }

        return null;
    }

    getFormat() {
        return this.props.format || defaultFormat;
    }

    getIsValidDate = (value: string) => {
        const parsedDate = dayjs.utc(value, this.getFormat(), true);
        const isValidDate = parsedDate.isValid();
        if (!isValidDate) return false;
        return this.props.filter ? this.props.filter(parsedDate) : true;
    }

    handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        this.onToggle(true);
    }

    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isChildFocusable(e)) return;
        this.onToggle(false);
        if (!this.getIsValidDate(this.state.inputValue)) {
            this.handleValueChange(null);
            this.setState({ inputValue: null });
        }
    }

    handleInputChange = (value: string) => {
        const resultValue = toValueDateFormat(value, this.getFormat());
        if (this.getIsValidDate(value)) {
            this.handleValueChange(resultValue);
            this.setState({ inputValue: value });
        } else {
            this.setState({ inputValue: value });
        }
    }

    setSelectedDate = (value: string) => {
        this.props.value !== value && this.handleValueChange(value);

        this.setState({ selectedDate: value, inputValue: toCustomDateFormat(value, this.getFormat()) });
    }

    setDisplayedDateAndView = (displayedDate: Dayjs, view: ViewType) => this.setState({...this.state, displayedDate: displayedDate, view: view});

    handleCancel = () => {
        this.handleValueChange(null);
        this.setState({ inputValue: null, selectedDate: null });
    }

    getValue(): PickerBodyValue<string> {
        return {
            selectedDate: this.props.value,
            displayedDate: this.state.displayedDate,
            view: this.state.view,
        };
    }

    onToggle = (value: boolean) => {
        this.setState({
            isOpen: value,
            view: 'DAY_SELECTION',
            displayedDate: this.state.selectedDate ? dayjs(this.state.selectedDate) : dayjs(),
        });
    }

    handleValueChange = (newValue: string | null) => {
        this.props.onValueChange(newValue);

        if (this.props.getValueChangeAnalyticsEvent) {
            const event = this.props.getValueChangeAnalyticsEvent(newValue, this.props.value);
            this.context.uuiAnalytics.sendEvent(event);
        }
    }

    render() {
        return (
            <Dropdown
                renderTarget={ props => this.props.renderTarget ? this.props.renderTarget(props) : this.renderInput(props) }
                renderBody={ () => !this.props.isDisabled && !this.props.isReadonly && this.renderBody() }
                onValueChange={ !this.props.isDisabled && !this.props.isReadonly ? this.onToggle : null }
                value={ this.state.isOpen }
                modifiers={ [{ name: 'offset', options: {offset: [0, 6]}}] }
            />
        );
    }
}