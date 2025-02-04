import React, { useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { ResponsiveColumnsFeature, ResponsiveConfig } from '../features/responsiveColumns';

interface ResponsiveTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  responsiveConfig: ResponsiveConfig;
  className?: string;
}

export function ResponsiveTable<T>({
  data,
  columns,
  responsiveConfig,
  className = '',
}: ResponsiveTableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    _features: [ResponsiveColumnsFeature],
    enableResponsiveColumns: true,
    responsiveConfig,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = table.initResizeObserver(containerRef.current);
    return cleanup;
  }, [table]);

  const visibleColumns = table.getVisibleColumns();

  return (
    <div ref={containerRef} className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers
                .filter(header => visibleColumns.includes(header.column.id))
                .map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells()
                .filter(cell => visibleColumns.includes(cell.column.id))
                .map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}