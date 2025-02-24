import { useRef, useEffect } from 'react';
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
}

const columns: ColumnDef<Person>[] = [
  { id: 'firstName', header: 'First Name', accessorKey: 'firstName' },
  { id: 'lastName', header: 'Last Name', accessorKey: 'lastName' },
  { id: 'age', header: 'Age', accessorKey: 'age' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'phone', header: 'Phone', accessorKey: 'phone' },
  { id: 'address', header: 'Address', accessorKey: 'address' },
];

const data: Person[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com', phone: '098-765-4321', address: '456 Oak Ave' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', age: 35, email: 'bob@example.com', phone: '555-555-5555', address: '789 Pine Rd' },
  { id: '4', firstName: 'Alice', lastName: 'Williams', age: 28, email: 'alice@example.com', phone: '111-222-3333', address: '321 Elm St' },
  { id: '5', firstName: 'Charlie', lastName: 'Brown', age: 42, email: 'charlie@example.com', phone: '444-444-4444', address: '654 Maple Dr' },
];

export function ResStyle() {
  const containerRef = useRef<HTMLDivElement>(null);

  const responsiveConfig = {
    breakpoints: [
      { minWidth: 1200, columns: ['firstName', 'lastName', 'age', 'email', 'phone', 'address'] },
      { minWidth: 768, columns: ['firstName', 'lastName', 'email', 'phone'] },
      { minWidth: 0, columns: ['firstName', 'lastName', 'email'] },
    ],
    defaultColumns: ['firstName', 'lastName'],
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
    return table.initResizeObserver(containerRef.current);
  }, [table]);

  const visibleColumns = table.getVisibleColumns();
  const containerWidth = table.getContainerWidth();

  return (
    <div ref={containerRef} className={`p-4 rounded-lg shadow-lg ${containerWidth < 768 ? 'bg-gray-50' : 'bg-white'}`}>
      <p className="text-sm text-gray-600 mb-4 font-medium">Current Width: {containerWidth}px</p>

      {/* Mobile View - Card Style */}
      {containerWidth < 768 ? (
        <div className="grid gap-4">
          {data.map(person => (
            <div key={person.id} className="p-4 bg-white shadow rounded-lg border border-gray-200">
              <p className="text-lg font-semibold">{person.firstName} {person.lastName}</p>
              <p className="text-sm text-gray-600">{person.email}</p>
              <p className="text-sm text-gray-500">{person.phone}</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Tablet & Desktop - Table View
        <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers
                  .filter(header => visibleColumns.includes(header.column.id))
                  .map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                {/* Inject Action Column */}
                {containerWidth >= 768 && <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells()
                  .filter(cell => visibleColumns.includes(cell.column.id))
                  .map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                {/* Inject Action Buttons */}
                {containerWidth >= 768 && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResStyle;
