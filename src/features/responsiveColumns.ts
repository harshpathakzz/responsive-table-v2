import { TableFeature, Table, RowData } from '@tanstack/react-table';

export type BreakpointConfig = {
  minWidth: number;
  columns: string[];
};

export type ResponsiveConfig = {
  breakpoints: BreakpointConfig[];
  defaultColumns?: string[];
};

export interface ResponsiveColumnsState {
  visibleColumns: string[];
  containerWidth: number;
  swappedLastColumn?: string | null;
}

export interface ResponsiveColumnsOptions {
  enableResponsiveColumns?: boolean;
  responsiveConfig?: ResponsiveConfig;
  onVisibleColumnsChange?: (columns: string[]) => void;
  lastColumnSwitchable?: boolean;
}

export interface ResponsiveColumnsInstance {
  setContainerWidth: (width: number) => void;
  getVisibleColumns: () => string[];
  getResponsiveConfig: () => ResponsiveConfig | undefined;
  getContainerWidth: () => number;
  initResizeObserver: (element: HTMLElement) => () => void;
  toggleLastColumn?: () => void;
  getDefaultVisibleColumns: (width: number) => string[];
}

declare module '@tanstack/react-table' {
  interface TableState extends ResponsiveColumnsState {}
  interface TableOptionsResolved<TData extends RowData> extends ResponsiveColumnsOptions {}
  interface Table<TData extends RowData> extends ResponsiveColumnsInstance {}
}

// Exposed standalone function used internally.
export const getDefaultVisibleColumnsStandalone = (
  width: number,
  config: ResponsiveConfig
): string[] => {
  const matchingBreakpoint = [...config.breakpoints]
    .sort((a, b) => b.minWidth - a.minWidth)
    .find((bp) => width >= bp.minWidth);
  return matchingBreakpoint?.columns || config.defaultColumns || [];
};

export const ResponsiveColumnsFeature: TableFeature = {
  getInitialState: (state): ResponsiveColumnsState => ({
    visibleColumns: [],
    containerWidth: 0,
    swappedLastColumn: null,
    ...state,
  }),

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): ResponsiveColumnsOptions => ({
    enableResponsiveColumns: true,
    lastColumnSwitchable: true,
    onVisibleColumnsChange: (columns) => {
      table.setState((old) => ({
        ...old,
        visibleColumns: columns,
      }));
    },
  }),

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    const calculateVisibleColumns = (width: number): string[] => {
      const config = table.options.responsiveConfig;
      if (!config) return [];
      return getDefaultVisibleColumnsStandalone(width, config);
    };

    table.setContainerWidth = (width) => {
      if (!table.options.enableResponsiveColumns) return;

      const defaultVisible = calculateVisibleColumns(width);
      let newVisibleColumns = defaultVisible;

      if (table.options.lastColumnSwitchable) {
        const { swappedLastColumn } = table.getState();
        if (swappedLastColumn && !defaultVisible.includes(swappedLastColumn)) {
          newVisibleColumns = [...defaultVisible];
          newVisibleColumns[newVisibleColumns.length - 1] = swappedLastColumn;
        }
      }

      table.setState((old) => ({
        ...old,
        containerWidth: width,
        visibleColumns: newVisibleColumns,
      }));

      table.options.onVisibleColumnsChange?.(newVisibleColumns);
    };

    table.toggleLastColumn = () => {
      if (!table.options.lastColumnSwitchable) return;

      const width = table.getState().containerWidth;
      const config = table.options.responsiveConfig;
      if (!config) return;
      const defaultVisible = getDefaultVisibleColumnsStandalone(width, config);
      const allColumns = table.options.columns as { id: string }[];

      // Build a list of candidate columns not in the default visible set.
      const candidateList = allColumns
        .map((col) => col.id)
        .filter((id) => !defaultVisible.includes(id));

      const currentSwap = table.getState().swappedLastColumn;

      if (currentSwap) {
        // Try to select the next candidate.
        const currentIndex = candidateList.indexOf(currentSwap);
        let nextCandidate: string | null = null;
        if (currentIndex >= 0 && currentIndex < candidateList.length - 1) {
          nextCandidate = candidateList[currentIndex + 1];
        }
        if (nextCandidate) {
          const newVisible = [...defaultVisible];
          newVisible[newVisible.length - 1] = nextCandidate;
          table.setState((old) => ({
            ...old,
            swappedLastColumn: nextCandidate,
            visibleColumns: newVisible,
          }));
          table.options.onVisibleColumnsChange?.(newVisible);
        } else {
          // Revert to default.
          table.setState((old) => ({
            ...old,
            swappedLastColumn: null,
            visibleColumns: defaultVisible,
          }));
          table.options.onVisibleColumnsChange?.(defaultVisible);
        }
      } else {
        // No swap active: pick the first candidate if available.
        if (candidateList.length > 0) {
          const newVisible = [...defaultVisible];
          newVisible[newVisible.length - 1] = candidateList[0];
          table.setState((old) => ({
            ...old,
            swappedLastColumn: candidateList[0],
            visibleColumns: newVisible,
          }));
          table.options.onVisibleColumnsChange?.(newVisible);
        }
      }
    };

    table.getVisibleColumns = () => table.getState().visibleColumns;

    table.getResponsiveConfig = () => table.options.responsiveConfig;

    table.getContainerWidth = () => table.getState().containerWidth;

    table.initResizeObserver = (element: HTMLElement) => {
      const width = element.getBoundingClientRect().width;
      table.setContainerWidth(width);

      const resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width;
        if (width) {
          table.setContainerWidth(width);
        }
      });

      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    };

    // Expose getDefaultVisibleColumns as a method on the table instance.
    table.getDefaultVisibleColumns = (width: number): string[] => {
      const config = table.options.responsiveConfig;
      if (!config) return [];
      return getDefaultVisibleColumnsStandalone(width, config);
    };
  },
};
