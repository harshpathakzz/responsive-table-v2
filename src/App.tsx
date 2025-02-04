import { ResponsiveTable } from './components/ResponsiveTable';
import { createColumnHelper } from '@tanstack/react-table';
import ResizableTableContainer from './components/Mytable';
import { MyTable } from './components/Mytable';

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    id: 'firstName',
    header: 'First Name',
  }),
  columnHelper.accessor('lastName', {
    id: 'lastName',
    header: 'Last Name',
  }),
  columnHelper.accessor('age', {
    id: 'age',
    header: 'Age',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    id: 'phone',
    header: 'Phone',
  }),
  columnHelper.accessor('address', {
    id: 'address',
    header: 'Address',
  }),
];

const data: Person[] = [
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
];

const responsiveConfig = {
  breakpoints: [
    {
      minWidth: 1200, // Desktop
      columns: ['firstName', 'lastName', 'age', 'email', 'phone', 'address'],
    },
    {
      minWidth: 768, // Tablet
      columns: ['firstName', 'lastName', 'email', 'phone'],
    },
    {
      minWidth: 0, // Mobile
      columns: ['firstName', 'lastName', 'email'],
    },
  ],
  defaultColumns: ['firstName', 'lastName'], // Fallback columns
};

function App() {

  const listenToCallbaxck = () => {

  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Wrapper</h1>
      <ResponsiveTable
        data={data}
        columns={columns}
        responsiveConfig={responsiveConfig}
        fireCaLLback={listenToCallbaxck}
      />
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Resizable Direct usage</h1>
     
      <ResizableTableContainer />
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Direct usage</h1>
      <MyTable />
      </div>
  );
}

export default App;