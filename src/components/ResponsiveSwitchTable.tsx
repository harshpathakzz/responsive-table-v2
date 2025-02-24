import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 50),
  visits: Math.floor(Math.random() * 100),
  status: ['Active', 'Inactive', 'Pending'][index % 3],
  progress: Math.floor(Math.random() * 100),
}));

const columnHelper = createColumnHelper<Person>();

const availableColumns: Array<{ key: keyof Person; label: string }> = [
  { key: 'age', label: 'Age' },
  { key: 'visits', label: 'Visits' },
  { key: 'status', label: 'Status' },
  { key: 'progress', label: 'Progress' },
  { key: 'lastName', label: 'Last Name' },
];

function ColumnSwitchTable() {
  const [secondColumnIndex, setSecondColumnIndex] = useState(0);
  const currentColumn = availableColumns[secondColumnIndex];
  
  const columns = useMemo(() => [
    columnHelper.accessor('firstName', {
      cell: info => info.getValue(),
      header: 'First Name',
      size: 200,
    }),
    columnHelper.accessor(currentColumn.key, {
      cell: info => info.getValue(),
      header: () => (
        <button
          onClick={() => {
            setSecondColumnIndex((prev) => 
              (prev + 1) % availableColumns.length
            );
          }}
          className="w-full text-left p-1 rounded transition-colors"
        >
          {currentColumn.label}
        </button>
      ),
    }),
  ], [currentColumn]);

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="text-left px-6 py-4 border-b border-gray-200 font-semibold text-gray-600"
                      style={{ width: header.getSize() }}
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
                  {row.getVisibleCells().map(cell => (
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
    </div>
  );
}

export default ColumnSwitchTable;