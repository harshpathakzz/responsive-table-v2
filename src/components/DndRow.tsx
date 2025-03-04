import React, { CSSProperties, useState, useMemo } from 'react';
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// dnd-kit imports
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Original data source
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}

const initialData: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    email: 'jane@example.com',
    phone: '098-765-4321',
    address: '456 Oak Ave',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 35,
    email: 'bob@example.com',
    phone: '555-555-5555',
    address: '789 Pine Rd',
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Williams',
    age: 28,
    email: 'alice@example.com',
    phone: '111-222-3333',
    address: '321 Elm St',
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 42,
    email: 'charlie@example.com',
    phone: '444-444-4444',
    address: '654 Maple Dr',
  },
];

// --- Drag Handle Cell Component ---
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  // Attaches the necessary attributes and listeners for drag functionality.
  const { attributes, listeners } = useSortable({ id: rowId });
  return (
    <button
      {...attributes}
      {...listeners}
      style={{ cursor: 'grab', background: 'transparent', border: 'none' }}
    >
      🟰
    </button>
  );
};

// --- Draggable Row Component ---
const DraggableRow = ({ row }: { row: Row<Person> }) => {
  // Use the row's unique id for drag-and-drop.
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map(cell => (
        <td
          key={cell.id}
          style={{
            width: cell.column.columnDef.size || 'auto',
            padding: '0.5rem',
            border: '1px solid #ddd',
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

// --- Main Table Component ---
function MyTable() {
  // Define columns and add a dedicated drag-handle column at the beginning.
  const columns = useMemo<ColumnDef<Person>[]>(() => [
    {
      id: 'drag-handle',
      header: 'Move',
      cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
      size: 60,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      size: 150,
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      size: 150,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      size: 100,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      size: 150,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      size: 250,
    },
  ], []);

  // Use stateful data so that the order can be updated after drag-and-drop.
  const [data, setData] = useState<Person[]>(initialData);

  // Generate an array of unique identifiers from the data.
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  );

  // Initialize the table instance.
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Ensure each row has a stable id.
    getRowId: row => row.id,
  });

  // Handle row reordering on drag end.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      setData(data => arrayMove(data, oldIndex, newIndex));
    }
  };

  // Setup dnd-kit sensors.
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div style={{ padding: '1rem' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      textAlign: 'left',
                      background: '#f3f3f3',
                    }}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map(row => (
                <DraggableRow key={row.id} row={row} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}

export default MyTable;
