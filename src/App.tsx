import { ResponsiveTable } from './components/ResponsiveTable';
import { createColumnHelper } from '@tanstack/react-table';
import ResizableTableContainer from './components/ResizableTableContainer';
import MyTable from './components/Mytable';
import ColumnSwitchTable from './components/ResponsiveSwitchTable';
import ResStyle from './components/ResStyle';
import FeatCol from './components/FeatCol';
import RowExpansion from './components/RowExpansion';
import DndRow from './components/DndRow';
import NewAPI from './components/NewAPI';

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


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Wrapper</h1>
      <ResponsiveTable
        data={data}
        columns={columns}
        responsiveConfig={responsiveConfig}
      />
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Resizable Direct usage</h1>
     
      <ResizableTableContainer />
      <h1 className="text-2xl font-bold mb-4">Responsive Table Example Direct usage</h1>
      <MyTable />
      <h1 className="text-2xl font-bold mb-4">Column switch</h1>
      <ColumnSwitchTable/>
      <div className="p-4">
              <div 
                className="relative overflow-hidden border border-gray-200 rounded-lg"
                style={{
                  resize: 'both',
                  overflow: 'auto',
                  minHeight: '200px',
                  minWidth: '300px',
                  maxHeight: '800px',
                  maxWidth: '100%',
                  backgroundColor: 'white',
                }}
              >
                <ResStyle />
                <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Colmn Switch Feat</h1>
            <div className="p-4">
                    <div 
                      className="relative overflow-hidden border border-gray-200 rounded-lg"
                      style={{
                        resize: 'both',
                        overflow: 'auto',
                        minHeight: '200px',
                        minWidth: '300px',
                        maxHeight: '800px',
                        maxWidth: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <FeatCol />
                      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">Row Expansion</h1>
            <div className="p-4">
                    <div 
                      className="relative overflow-hidden border border-gray-200 rounded-lg"
                      style={{
                        resize: 'both',
                        overflow: 'auto',
                        minHeight: '200px',
                        minWidth: '300px',
                        maxHeight: '800px',
                        maxWidth: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <RowExpansion />
                      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
                    </div>

                  </div>
                  <h1 className="text-2xl font-bold mb-4">Dnd Rows</h1>
                  <div className="p-4">
                    <div 
                      className="relative overflow-hidden border border-gray-200 rounded-lg"
                      style={{
                        resize: 'both',
                        overflow: 'auto',
                        minHeight: '200px',
                        minWidth: '300px',
                        maxHeight: '800px',
                        maxWidth: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <DndRow />
                      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
                    </div>

                  </div>
                  <h1 className="text-2xl font-bold mb-4">New API</h1>
                  <div className="p-4">
                    <div 
                      className="relative overflow-hidden border border-gray-200 rounded-lg"
                      style={{
                        resize: 'both',
                        overflow: 'auto',
                        minHeight: '200px',
                        minWidth: '300px',
                        maxHeight: '800px',
                        maxWidth: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <NewAPI />
                      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
                    </div>

                  </div>

      </div>

  );
}

export default App;