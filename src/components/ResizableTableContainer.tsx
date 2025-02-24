import MyTable from "./Mytable";

const ResizableTableContainer = () => {
    return (
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
          <MyTable />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 hover:bg-gray-300" />
        </div>
      </div>
    );
  };

export default ResizableTableContainer;