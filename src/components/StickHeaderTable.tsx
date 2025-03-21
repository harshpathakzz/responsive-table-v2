import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const defaultData = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 25,
    city: 'New York',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Engineer',
    department: 'R&D',
    salary: 75000,
    startDate: '2020-01-15',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 30,
    city: 'San Francisco',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Designer',
    department: 'Marketing',
    salary: 70000,
    startDate: '2019-03-10',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 28,
    city: 'Chicago',
    email: 'charlie@example.com',
    phone: '555-9012',
    occupation: 'Manager',
    department: 'Operations',
    salary: 85000,
    startDate: '2018-11-05',
  },
];

const defaultColumns = [
  { header: 'First Name', accessorKey: 'firstName' },
  { header: 'Last Name', accessorKey: 'lastName' },
  { header: 'Age', accessorKey: 'age' },
  { header: 'City', accessorKey: 'city' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Phone', accessorKey: 'phone' },
  { header: 'Occupation', accessorKey: 'occupation' },
  { header: 'Department', accessorKey: 'department' },
  { header: 'Salary', accessorKey: 'salary' },
  { header: 'Start Date', accessorKey: 'startDate' },
];

function StickyHeaderTable() {
  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-gray-300 w-full">
      <table className="min-w-full border-collapse">
        {/* Sticky Header */}
        <thead className="sticky top-0 bg-white z-50 shadow-md overflow-x-auto">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="p-2 border border-gray-300 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StickyHeaderTable;
