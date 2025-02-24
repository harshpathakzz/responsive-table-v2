import { TableFeature, Table, RowData } from '@tanstack/react-table';

export interface ColumnSwitcherOptions {
  enableColumnSwitcher?: boolean;
  onColumnSwitch?: (
    currentVisible: string[],
    clickedColumn: string,
    newColumn: string
  ) => string[];
}

declare module '@tanstack/react-table' {
  interface TableOptionsResolved<TData extends RowData> extends ColumnSwitcherOptions {}
  interface Table<TData extends RowData> {
    switchColumn?: (clickedColumnId: string) => void;
  }
}

export const ColumnSwitcherFeature: TableFeature = {
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.switchColumn = (clickedColumnId: string) => {
      if (!table.options.enableColumnSwitcher) return;
      
      // Get all leaf columns from TanStack Table and extract their IDs.
      const allLeafColumnIds = table.getAllLeafColumns().map(col => col.id);

      // Get currently visible columns from state.
      const currentVisible = table.getState().visibleColumns;

      // Determine which columns are hidden.
      const hiddenColumns = allLeafColumnIds.filter(id => !currentVisible.includes(id));
      if (hiddenColumns.length === 0) return; // Nothing to swap in

      // For simplicity, choose the first hidden column to swap in.
      const newColumnId = hiddenColumns[0];

      // Swap the clicked column with the new column.
      const newVisibleColumns = currentVisible.map(colId =>
        colId === clickedColumnId ? newColumnId : colId
      );

      // Allow custom switching logic if provided.
      const finalVisibleColumns = table.options.onColumnSwitch
        ? table.options.onColumnSwitch(currentVisible, clickedColumnId, newColumnId)
        : newVisibleColumns;

      // Update the table state.
      table.setState((old) => ({
        ...old,
        visibleColumns: finalVisibleColumns,
      }));
      table.options.onVisibleColumnsChange?.(finalVisibleColumns);
    };
  },
};
