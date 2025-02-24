import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { ResponsiveColumnsFeature } from '../features/responsiveColumns';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  visits: number;
  status: string;
  progress: number;
}

const availableColumns: Array<{ key: keyof Person; label: string }> = [
  { key: 'age', label: 'Age' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'visits', label: 'Visits' },
  { key: 'status', label: 'Status' },
  { key: 'progress', label: 'Progress' },
];

const data: Person[] = Array.from({ length: 5 }, (_, index) => ({
  id: `${index + 1}`,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 50),
  email: `user${index + 1}@example.com`,
  phone: `${index + 1}23-456-7890`,
  address: `${index + 1}23 Main St`,
  visits: Math.floor(Math.random() * 100),
  status: ['Active', 'Inactive', 'Pending'][index % 3],
  progress: Math.floor(Math.random() * 100),
}));

export function ResponsiveSwitchTable() {
  const [switchableColumnIndex, setSwitchableColumnIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSwitchableColumn = availableColumns[switchableColumnIndex];

  const columns = useMemo<ColumnDef<Person>[]>(() => [
    {
      id: 'firstName',
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      id: 'lastName',
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      id: 'switchable',
      header: () => (
        <button
          onClick={() => {
            setSwitchableColumnIndex((prev) => 
              (prev + 1) % availableColumns.length
            );
          }}
          className="w-full text-left hover:bg-gray-100 rounded p-1"
        >
          {currentSwitchableColumn.label}
        </button>
      ),
      accessorKey: currentSwitchableColumn.key,
    },
  ], [currentSwitchableColumn]);

  const responsiveConfig = {
    breakpoints: [
      {
        minWidth: 1024,
        columns: ['firstName', 'lastName', 'email', 'switchable'],
      },
      {
        minWidth: 768,
        columns: ['firstName', 'lastName', 'email', 'switchable'],
      },
      {
        minWidth: 0,
        columns: ['firstName', 'switchable'],
      },
    ],
    defaultColumns: ['firstName', 'switchable'],
  };

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div 
        ref={containerRef} 
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-x-auto"
      >
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers
                  .filter(header => visibleColumns.includes(header.column.id))
                  .map(header => (
                    <th
                      key={header.id}
                      className="text-left px-6 py-4 border-b border-gray-200 font-semibold text-gray-600"
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
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells()
                  .filter(cell => visibleColumns.includes(cell.column.id))
                  .map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 border-b border-gray-200"
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
    </div>
  );
}

export default ResponsiveSwitchTable;