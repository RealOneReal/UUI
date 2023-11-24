import React, { useContext, useEffect } from 'react';
import {
    DataTableCellProps, RenderEditorProps, uuiMod,
} from '@epam/uui-core';
import css from './DataTableCell.module.scss';
import { FlexCell } from '../layout';
import { DataTableCellOverlay } from './DataTableCellOverlay';
import { DataTableFocusContext, DataTableFocusContextState } from './tableCellsFocus';

interface DataTableCellState {
    inFocus: boolean;
}

const uuiDataTableCellMarkers = {
    uuiTableCell: 'uui-table-cell',
} as const;

export function DataTableCell<TItem, TId, TCellValue>(props: DataTableCellProps<TItem, TId, TCellValue>) {
    const [state, setState] = React.useState<DataTableCellState>({ inFocus: false });
    const row = props.rowProps;
    const ref = React.useRef<HTMLDivElement>();
    const editorRef = React.useRef<HTMLElement>();
    const isEditable = !!props.onValueChange;

    const tableFocusContext = useContext<DataTableFocusContextState<TId>>(DataTableFocusContext);

    useEffect(() => {
        if (props.isTableCell && isEditable) {
            tableFocusContext?.dataTableFocusManager
                ?.registerCell({ id: row.id, index: row.index }, {
                    index: props.index,
                    isDisabled: props.isDisabled,
                    isReadonly: props.isReadonly,
                    key: props.key,
                    focus: () => editorRef.current?.focus(),
                });
        }

        return () => {
            if (props.isTableCell && isEditable) {
                tableFocusContext?.dataTableFocusManager
                    ?.unregisterCell(row.id, props.index);
            }
        };
    }, [
        tableFocusContext?.dataTableFocusManager,
        row.index,
        props.index,
        props.isDisabled,
        props.isReadonly,
    ]);

    let content: React.ReactNode;

    const handleEditableCellClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback((e) => {
        if (editorRef.current === e.target || editorRef.current.parentNode === e.target) {
            editorRef.current?.focus();
        }
    }, []);

    if (props.rowProps.isLoading) {
        content = props.renderPlaceholder(props);
    } else if (props.rowProps.isUnknown) {
        content = props.renderUnknown(props);
    } else if (isEditable) {
        const onFocus = () => {
            props.rowProps.onSelect?.(props.rowProps);
            setState((currentState) => ({ ...currentState, inFocus: true }));
            if (props.isTableCell) {
                tableFocusContext?.dataTableFocusManager?.setNewFocusCoordinates(row.id, props.index);
            }
        };

        // Copy all attributes explicitly, to avoid bypassing unnecessary DataTableCell props
        // We don't use any helpers and/or deconstruction syntax, as this is performance-sensitive part of code
        const editorProps: RenderEditorProps<TItem, TId, any> = {
            value: props.value,
            onValueChange: props.onValueChange,
            isDisabled: props.isDisabled ?? props.rowProps.isDisabled,
            isInvalid: props.isInvalid ?? props.rowProps.isInvalid,
            isReadonly: props.isReadonly ?? props.rowProps.isReadonly,
            isRequired: props.isRequired ?? props.rowProps.isRequired,
            validationMessage: props.validationMessage ?? props.rowProps.validationMessage,
            validationProps: props.validationProps ?? props.rowProps.validationProps,
            onFocus,
            onBlur: () => setState({ ...state, inFocus: false }),
            rowProps: props.rowProps,
            mode: 'cell',
            ref: editorRef,
        };

        content = (
            <div className={ css.editorWrapper } onClick={ handleEditableCellClick }>
                {props.renderEditor(editorProps)}
                <DataTableCellOverlay
                    { ...editorProps }
                    renderTooltip={ props.renderTooltip }
                    inFocus={ state.inFocus }
                    rowIndex={ row.index }
                    columnIndex={ props.index }
                />
            </div>
        );
    } else {
        content = props.column.render(props.rowProps.value, props.rowProps);
    }

    let justifyContent = props.column.justifyContent;
    if (!justifyContent && props.column.textAlign) {
        justifyContent = props.column.textAlign;
    }

    const { textAlign, alignSelf } = props.column;
    const styles = {
        textAlign,
        alignSelf: alignSelf ?? (isEditable ? 'stretch' : undefined),
        justifyContent,
    };

    const getWrappedContent = () => (
        <div style={ styles } className={ css.contentWrapper }>
            {content}
        </div>
    );

    return (
        <FlexCell
            ref={ ref }
            grow={ props.column.grow }
            width={ props.column.width }
            minWidth={ props.column.width }
            textAlign={ props.isFirstColumn ? undefined : props.column.textAlign }
            alignSelf={ props.isFirstColumn ? undefined : props.column.alignSelf }
            rawProps={ { role: 'cell' } }
            cx={ [
                uuiDataTableCellMarkers.uuiTableCell, css.cell, props.column.cx, props.cx, props.isInvalid && uuiMod.invalid, state.inFocus && uuiMod.focus,
            ] }
            style={ !props.isFirstColumn && { justifyContent: justifyContent } }
        >
            {props.addons}
            {props.isFirstColumn ? getWrappedContent() : content}
        </FlexCell>
    );
}
