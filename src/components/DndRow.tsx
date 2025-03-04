import { useRef, useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { ResponsiveColumnsFeature, ResponsiveConfig } from '../features/responsiveColumns';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'address', header: 'Address' },
];

const initialData: Person[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com', phone: '098-765-4321', address: '456 Oak Ave' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', age: 35, email: 'bob@example.com', phone: '555-555-5555', address: '789 Pine Rd' },
  { id: '4', firstName: 'Alice', lastName: 'Williams', age: 28, email: 'alice@example.com', phone: '111-222-3333', address: '321 Elm St' },
  { id: '5', firstName: 'Charlie', lastName: 'Brown', age: 42, email: 'charlie@example.com', phone: '444-444-4444', address: '654 Maple Dr' },
];

const responsiveConfig: ResponsiveConfig = {
  breakpoints: [
    { minWidth: 1200, columns: ['firstName', 'lastName', 'age', 'email', 'phone', 'address'] },
    { minWidth: 768, columns: ['firstName', 'lastName', 'email', 'phone'] },
    { minWidth: 0, columns: ['firstName', 'lastName', 'email'] },
  ],
  defaultColumns: ['firstName', 'lastName'],
};

const SortableRow = ({ row, visibleColumns }: { row: any; visibleColumns: string[] }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="hover:bg-gray-50 cursor-pointer">
      {row.getVisibleCells()
        .filter((cell) => visibleColumns.includes(cell.column.id))
        .map((cell) => (
          <td key={cell.id} className="px-4 py-2 border-b">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
    </tr>
  );
};

export function MyTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initialData);


 

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    _features: [ResponsiveColumnsFeature],
    enableResponsiveColumns: true,
    responsiveConfig,
  });

  // Use the provided snippet: pass the outermost container ref to the table's resize observer.
  useEffect(() => {
    if (!containerRef.current) return;
    return table.initResizeObserver(containerRef.current);
  }, [table]);

  const visibleColumns = table.getVisibleColumns();


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((oldData) => {
      const oldIndex = oldData.findIndex((item) => item.id === active.id);
      const newIndex = oldData.findIndex((item) => item.id === over.id);
      return arrayMove(oldData, oldIndex, newIndex);
    });
  };

  return (
    <div ref={containerRef} className="overflow-x-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers
                  .filter((header) => visibleColumns?.includes(header.column.id))
                  .map((header) => (
                    <th key={header.id} className="px-4 py-2 border-b text-left">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
              )}
            </tr>
          </thead>
          <tbody>
            <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map((row) => (
                <SortableRow key={row.id} row={row} visibleColumns={visibleColumns} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}

export default MyTable;
