import { BaseListViewProps, DataRowProps, ICheckable, IEditable, SortingOption, DataSourceState, DataSourceListProps, IDataSourceView } from "../../../types";

export abstract class BaseListView<TItem, TId, TFilter> implements IDataSourceView<TItem, TId, TFilter> {
    public value: DataSourceState<TFilter, TId> = {};
    protected onValueChange: (value: DataSourceState<TFilter, TId>) => void;
    protected checkedByKey: Record<string, boolean> = {};
    public selectAll?: ICheckable;
    protected isDestroyed = false;

    abstract getById(id: TId, index: number): DataRowProps<TItem, TId>;
    abstract getVisibleRows(): DataRowProps<TItem, TId>[];
    abstract getListProps(): DataSourceListProps;

    _forceUpdate() {
        !this.isDestroyed && this.onValueChange({ ...this.value });
    }

    public destroy() {
        this.isDestroyed = true;
    }

    protected constructor(editable: IEditable<DataSourceState<TFilter, TId>>, protected props: BaseListViewProps<TItem, TId, TFilter>) {
        this.onValueChange = editable.onValueChange;
        this.value = editable.value;
        this.updateCheckedLookup(this.value && this.value.checked);
    }

    protected updateCheckedLookup(checked: TId[]) {
        this.checkedByKey = {};
        (checked || []).forEach(id => {
            this.checkedByKey[this.idToKey(id)] = true;
        });
    }

    protected handleCheckedChange(checked: TId[]) {
        this.updateCheckedLookup(checked);
        this.onValueChange({ ...this.value, checked });
    }

    protected idToKey(id: TId) {
        return JSON.stringify(id);
    }

    protected keyToId(key: string) {
        return JSON.parse(key);
    }

    protected setObjectFlag(object: any, key: string, value: boolean) {
        return { ...object, [key]: value };
    }

    public getSelectedRows(): DataRowProps<TItem, TId>[] {
        if (this.value.selectedId !== null && this.value.selectedId !== undefined) {
            return [this.getById(this.value.selectedId, 0)];
        } else if (this.value.checked) {
            return this.value.checked.map((id, n) => this.getById(id, n));
        }
        return [];
    }

    protected handleOnCheck = (rowProps: DataRowProps<TItem, TId>) => {
        let checked = this.value && this.value.checked || [];
        if (rowProps.isChecked) {
            checked = checked.filter(id => id !== rowProps.id);
            this.handleCheckedChange(checked);
        } else {
            checked = [...checked, rowProps.id];
            this.handleCheckedChange(checked);
        }
    }

    protected isSelectAllEnabled() {
        return this.props.selectAll == undefined ? true : this.props.selectAll;
    }

    protected handleOnSelect = (rowProps: DataRowProps<TItem, TId>) => {
        this.onValueChange({
            ...this.value,
            selectedId: rowProps.id,
        });
    }

    protected handleOnFocus = (focusIndex: number) => {
        if (this.onValueChange) {
            this.onValueChange({
                ...this.value,
                focusedIndex: focusIndex,
            });
        }
    }

    protected handleOnFold = (rowProps: DataRowProps<TItem, TId>) => {
        if (this.onValueChange) {
            this.onValueChange({
                ...this.value,
                folded: this.setObjectFlag(this.value && this.value.folded, rowProps.rowKey, !rowProps.isFolded),
            });
        }
    }

    protected handleSort = (sorting: SortingOption) => {
        if (this.onValueChange) {
            this.onValueChange({
                ...this.value,
                sorting: [sorting],
            });
        }
    }

    protected isFolded(item: TItem) {
        const folded = this.value.folded || {};

        const key = this.idToKey(this.props.getId(item));

        if (folded[key] != null) {
            return folded[key];
        }

        if (this.props.isFoldedByDefault) {
            return this.props.isFoldedByDefault(item);
        }

        return true;
    }

    protected getRowProps(item: TItem, index: number, parents: DataRowProps<TItem, TId>[]): DataRowProps<TItem, TId> {
        const id = this.props.getId(item);
        const key = this.idToKey(id);

        const value = this.value;

        const rowOptions = this.props.getRowOptions ? this.props.getRowOptions(item, index) : this.props.rowOptions;

        const isCheckable = rowOptions && rowOptions.checkbox && rowOptions.checkbox.isVisible && !rowOptions.checkbox.isDisabled;
        const isSelectable = rowOptions && rowOptions.isSelectable;

        const path = parents.map(p => ({ id: p.id, isLastChild: p.isLastChild, value: p.value }));

        const rowProps = {
            id,
            rowKey: key,
            index,
            value: item,
            depth: parents.length,
            path,
            ...rowOptions,
            isFocused: value.focusedIndex === index,
            isChecked: !!this.checkedByKey[key],
            isSelected: value.selectedId === id,
            isCheckable: isCheckable,
            onCheck: isCheckable && this.handleOnCheck,
            onSelect: rowOptions && rowOptions.isSelectable && this.handleOnSelect,
            onFocus: (isSelectable || isCheckable) && this.handleOnFocus,
        } as DataRowProps<TItem, TId>;

        return rowProps;
    }

    protected getLoadingRow(id: any, index: number = 0, parents: DataRowProps<TItem, TId>[] = null): DataRowProps<TItem, TId> {
        const rowOptions = this.props.rowOptions;

        const path = parents ? parents.map(p => ({ id: p.id, isLastChild: p.isLastChild, value: p.value })) : [];

        return {
            id,
            rowKey: this.idToKey(id),
            index,
            isLoading: true,
            depth: parents ? parents.length : 0,
            path,
            checkbox: rowOptions?.checkbox?.isVisible && { isVisible: true, isDisabled: true },
        };
    }
}

