import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const PINNED_COL_WIDTH = 150;

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
  // ... add more rows as needed
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

function StickyHeaderTableWithPinning() {
  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  // Initial state: left pin 'firstName' and 'email'
  const [columnPinning, setColumnPinning] = React.useState<{
    left: string[];
    right: string[];
  }>({
    left: ['firstName', 'email'],
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    onColumnPinningChange: (updater) => {
      setColumnPinning((prev) => {
        const result = typeof updater === 'function' ? updater(prev) : updater;
        return {
          left: result.left || [],
          right: result.right || [],
        };
      });
    },
    getCoreRowModel: getCoreRowModel(),
  });

  // Toggle the pinning of a column (here, toggling the "firstName" column)
  interface ColumnPinningState {
    left: string[];
    right: string[];
  }

  const togglePinning = (columnId: string): void => {
    const isPinnedLeft = columnPinning.left.includes(columnId);
    const newPinning: ColumnPinningState = { ...columnPinning };

    if (isPinnedLeft) {
      newPinning.left = newPinning.left.filter((id) => id !== columnId);
    } else {
      newPinning.left = [...newPinning.left, columnId];
    }
    setColumnPinning(newPinning);
  };

  return (
    <div className="border border-gray-300 w-full relative">
      {/* Button to toggle pinning of the "First Name" column */}
      <button
        onClick={() => togglePinning('firstName')}
        className="mb-2 p-2 bg-blue-500 text-white rounded"
      >
        Toggle Pin "First Name"
      </button>

      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white z-50 shadow-md">
          {table.getHeaderGroups().map((headerGroup) => {
            const leftPinnedHeaders = headerGroup.headers.filter(
              (header) => header.column.getIsPinned() === 'left'
            );
            const rightPinnedHeaders = headerGroup.headers.filter(
              (header) => header.column.getIsPinned() === 'right'
            );
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const pinPosition = header.column.getIsPinned();
                  let pinStyle = {};

                  if (pinPosition === 'left') {
                    const leftIndex = leftPinnedHeaders.findIndex(
                      (h) => h.id === header.id
                    );
                    pinStyle = {
                      position: 'sticky',
                      left: `${leftIndex * PINNED_COL_WIDTH}px`,
                      zIndex: 20,
                      backgroundColor: '#f1f1f1',
                      width: `${PINNED_COL_WIDTH}px`,
                      minWidth: `${PINNED_COL_WIDTH}px`,
                    };
                  } else if (pinPosition === 'right') {
                    const rightIndex = rightPinnedHeaders.findIndex(
                      (h) => h.id === header.id
                    );
                    pinStyle = {
                      position: 'sticky',
                      right: `${rightIndex * PINNED_COL_WIDTH}px`,
                      zIndex: 20,
                      backgroundColor: '#f1f1f1',
                      width: `${PINNED_COL_WIDTH}px`,
                      minWidth: `${PINNED_COL_WIDTH}px`,
                    };
                  }

                  return (
                    <th
                      key={header.id}
                      style={pinStyle}
                      className="p-2 border border-gray-300 text-left"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const leftPinnedCells = row.getVisibleCells().filter(
              (cell) => cell.column.getIsPinned() === 'left'
            );
            const rightPinnedCells = row.getVisibleCells().filter(
              (cell) => cell.column.getIsPinned() === 'right'
            );
            return (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  const pinPosition = cell.column.getIsPinned();
                  let pinStyle = {};

                  if (pinPosition === 'left') {
                    const leftIndex = leftPinnedCells.findIndex(
                      (c) => c.id === cell.id
                    );
                    pinStyle = {
                      position: 'sticky',
                      left: `${leftIndex * PINNED_COL_WIDTH}px`,
                      zIndex: 10,
                      backgroundColor: '#f9f9f9',
                      width: `${PINNED_COL_WIDTH}px`,
                      minWidth: `${PINNED_COL_WIDTH}px`,
                    };
                  } else if (pinPosition === 'right') {
                    const rightIndex = rightPinnedCells.findIndex(
                      (c) => c.id === cell.id
                    );
                    pinStyle = {
                      position: 'sticky',
                      right: `${rightIndex * PINNED_COL_WIDTH}px`,
                      zIndex: 10,
                      backgroundColor: '#f9f9f9',
                      width: `${PINNED_COL_WIDTH}px`,
                      minWidth: `${PINNED_COL_WIDTH}px`,
                    };
                  }
                  return (
                    <td
                      key={cell.id}
                      style={pinStyle}
                      className="p-2 border border-gray-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StickyHeaderTableWithPinning;
