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
}

export interface ResponsiveColumnsOptions {
  enableResponsiveColumns?: boolean;
  responsiveConfig?: ResponsiveConfig;
  onVisibleColumnsChange?: (columns: string[]) => void;
}

export interface ResponsiveColumnsInstance {
  setContainerWidth: (width: number) => void;
  getVisibleColumns: () => string[];
  getResponsiveConfig: () => ResponsiveConfig | undefined;
  getContainerWidth: () => number;
  initResizeObserver: (element: HTMLElement) => () => void;
}

declare module '@tanstack/react-table' {
  interface TableState extends ResponsiveColumnsState {}
  interface TableOptionsResolved<TData extends RowData> extends ResponsiveColumnsOptions {}
  interface Table<TData extends RowData> extends ResponsiveColumnsInstance {}
}

export const ResponsiveColumnsFeature: TableFeature = {
  getInitialState: (state): ResponsiveColumnsState => ({
    visibleColumns: [],
    containerWidth: 0,
    ...state,
  }),

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): ResponsiveColumnsOptions => ({
    enableResponsiveColumns: true,
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

      const matchingBreakpoint = [...config.breakpoints]
        .sort((a, b) => b.minWidth - a.minWidth)
        .find((bp) => width >= bp.minWidth);

      return matchingBreakpoint?.columns || config.defaultColumns || [];
    };

    table.setContainerWidth = (width) => {
      if (!table.options.enableResponsiveColumns) return;

      const newVisibleColumns = calculateVisibleColumns(width);
      
      table.setState((old) => ({
        ...old,
        containerWidth: width,
        visibleColumns: newVisibleColumns,
      }));

      table.options.onVisibleColumnsChange?.(newVisibleColumns);
    };

    table.getVisibleColumns = () => table.getState().visibleColumns;
    
    table.getResponsiveConfig = () => table.options.responsiveConfig;

    table.getContainerWidth = () => table.getState().containerWidth;

    table.initResizeObserver = (element) => {
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
  },
};
