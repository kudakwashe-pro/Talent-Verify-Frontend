import React from 'react';
import SplitView from '../../components/SplitView';
import { Paper } from '@mui/material';
import DataTable from './DataTable';
import TabBar from './DockableTabs';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
  { field: 'major', headerName: 'Major' },
  { field: 'date', headerName: 'Date' },
];

const initialData = [
  { id: 1, name: 'John Doe', age: 22, major: 'Computer Science' },
  { id: 2, name: 'Jane Smith', age: 21, major: 'Mathematics' },
  { id: 3, name: 'Alice Johnson', age: 23, major: 'Physics' },
];

const Basic = () => {
  return (
    <div >
      <div>
        <SplitView
          left={<Paper style={{ margin: "1rem",width: 'flex',height: 'flex' }}><TabBar/></Paper>}
          right={<div style={{ margin: "1rem" }}><DataTable columns={columns} initialData={initialData} /></div>}
        />
      </div>
    </div>
  );
};

export default Basic;
