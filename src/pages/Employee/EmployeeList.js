import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../api';
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await fetchEmployees();
      setEmployees(response.data);
    };
    getEmployees();
  }, []);

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setOpenDialog(true);
  };

  const handleAddNew = () => {
    setEditingEmployee({ name: '', company: '', department: '', role: '', date_started: '', date_left: '', duties: '' });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingEmployee.id) {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? editingEmployee : emp)));
    } else {
      setEmployees([...employees, { ...editingEmployee, id: employees.length + 1 }]);
    }
    setOpenDialog(false);
  };

  const handleExport = () => {
    const csvData = employees.map(emp => Object.values(emp).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const importedEmployees = text.split('\n').map(line => {
        const [id, employee_id, company, name, department, role, date_started, date_left, duties] = line.split(',');
        return { id, employee_id, company, name, department, role, date_started, date_left, duties };
      });
      setEmployees(importedEmployees);
    };
    reader.readAsText(file);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: '', width: 30 },
    { field: 'employee_id', headerName: 'ID', width: 60, editable: true },
    { field: 'company', headerName: 'Company', width: 130, editable: true },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'department', headerName: 'Department', width: 100, editable: true },
    { field: 'role', headerName: 'Role', width: 100, editable: true },
    { field: 'date_started', headerName: 'Date Started', width: 100 },
    { field: 'date_left', headerName: 'Date Left', width: 100, editable: true },
    { field: 'duties', headerName: 'Duties', width: 120, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <Box>
      <Card sx={{ bgcolor: '#F1F3F1DC' }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
            xs={{backgroundColor: '#FFFFFF'}}
              variant="standard"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              sx={{
                bgcolor: '#469634',
                mb: 1,
                fontFamily: 'cursive',
                ":hover": { bgcolor: '#176606' },
              }}
              variant='contained'
              onClick={handleAddNew}
            >
              Add New
            </Button>
            <Button
              sx={{ mb: 1, ml: 1 }}
              variant='contained'
              onClick={handleExport}
              startIcon={<ImportExportIcon />}
            >
              Export
            </Button>
            <input
              accept=".csv"
              style={{ display: 'none' }}
              id="import-button"
              type="file"
              onChange={handleImport}
            />
            <label htmlFor="import-button">
              <Button
                variant='contained'
                component="span"
                startIcon={<ImportExportIcon />}
              >
                Import
              </Button>
            </label>
          </Grid>
        </Grid>
      </Card>
      <DataGrid
      
        style={{ backgroundColor: '#FFFFFF', fontSize: '1.5ex', fontFamily: 'Arial' }}
        getRowId={(row) => row.id}
        getRowSpacing={() => ({ top: 5, bottom: 5 })}
        columns={columns}
        rows={filteredEmployees}
        onCellClick={(params) => alert(params.id)}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingEmployee?.id ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          {Object.keys(editingEmployee || {}).map((key) => (
            <TextField
              key={key}
              label={key.replace('_', ' ').toUpperCase()}
              fullWidth
              margin="dense"
              value={editingEmployee[key] || ''}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, [key]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;