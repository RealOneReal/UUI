import React, { useMemo } from 'react';
import { DataTableFocusContext } from './DataTableFocusContext';
import { DataTableFocusManager } from '../DataTableFocusManager';

export interface DataTableFocusProviderProps<TId> extends React.PropsWithChildren {
    dataTableFocusManager?: DataTableFocusManager<TId>;
}

export function DataTableFocusProvider<TId>({ dataTableFocusManager, children }: DataTableFocusProviderProps<TId>) {
    const value = useMemo(
        () => ({ dataTableFocusManager }),
        [dataTableFocusManager],
    );

    if (!value.dataTableFocusManager) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return (<>{children}</>);
    }

    return (
        <DataTableFocusContext.Provider value={ value }>
            {children}
        </DataTableFocusContext.Provider>
    );
}
