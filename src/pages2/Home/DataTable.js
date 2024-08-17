import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TableFooter,
  TablePagination,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  AddCircleOutline,
  Edit,
  Save,
  Cancel,
  SearchSharp,
  SaveOutlined,
  Delete
} from '@mui/icons-material';

const DataTable = ({ columns, initialData }) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  
  const handleDelete = id => {
    setRowToDelete(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== rowToDelete));
    setOpenConfirmDialog(false);
    setRowToDelete(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setFormData({ id: 0, name: '', age: '', major: '' , date: Date.now()});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAdd = () => {
    setData([...data, formData]);
    handleCloseModal();
  };

  const handleEdit = row => {
    setEditRow(row.id);
    setFormData(row);
  };

  const handleUpdate = () => {
    setData(data.map(item => (item.id === editRow ? formData : item)));
    setEditRow(null);
    setFormData({});
  };

  const handleCancelEdit = () => {
    setEditRow(null);
    setFormData({});
  };

  const filteredData = data.filter(item =>
    columns.some(
      col =>
        item[col.field] != null &&
        item[col.field]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = columns.map(col => col.headerName);
    csvRows.push(headers.join(','));

    filteredData.forEach(row => {
      const values = headers.map(header => {
        const field = columns.find(col => col.headerName === header).field;
        return JSON.stringify(row[field] || '');
      });
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Paper sx={{width:'flex'}}>
      <Toolbar sx={{ backgroundColor: '#FAF6F6C2' }}>
        <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
          <Grid item xs={12} md={5}>
            <Typography variant='h6' component='div'>
             
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
          <Tooltip title="Search record">
            <TextField
              variant='standard'
              placeholder='Search...'
              onChange={e => setSearchTerm(e.target.value)}
              sx={{ ml: 1, width: 'flex', bgcolor: 'white' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchSharp />
                  </InputAdornment>
                ),}}
            />
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={1}>
          <Tooltip title="Save File To *.CSV">
            <IconButton color='primary' onClick={exportToCSV} sx={{ ml: 1 }}>
              <SaveOutlined />
            </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <TableContainer variant='none' component={Paper} sx={{ mt: 0, boxShadow: 0 }}>
        <Table spellCheck> 
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F7EFEFD3'}}>
              {columns.map(col => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {columns.map(col => (
                    <TableCell key={col.field} sx={{ paddingLeft:'15px',paddingTop:'5px',paddingBottom:'5px', fontSize: '1.4ex' }}>
                      {editRow === row.id ? (
                        <TextField
                          value={formData[col.field] || ''}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              [col.field]: e.target.value,
                            })
                          }
                          sx={{ width: 'auto' }}
                        />
                      ) : (
                        row[col.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editRow === row.id ? (
                      <>
                        <Tooltip title="Save">
                          <IconButton size='small' onClick={handleUpdate}>
                            <Save />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton size='small' onClick={handleCancelEdit}>
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      hoveredRow === row.id && (
                        <Grid container>
                          <Grid item xs={12} md={6}>
                          <Tooltip title="Edit">
                            <IconButton size='small' onClick={() => handleEdit(row)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          </Grid>
                          <Grid item xs={12} md={6}>
                          <Tooltip  title="Delete">
                            <IconButton color='warning' size='small' onClick={() => handleDelete(row.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                          </Grid>
                        </Grid>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
            <Tooltip title="Add New Record">
              <Button
                variant='contained'
                color='success'
                onClick={handleOpenModal}
                sx={{ ml: 2, mt: 1 }}
              >
                <AddCircleOutline /> NEW
              </Button>
              </Tooltip>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{color:'mediumseagreen'}}>Add New Item</DialogTitle>
        
        <DialogContent sx={{backgroundColor:'#B8B8B8DC'}}>
        <Grid container >
          {columns.map(col => (
            <Grid item xs={12} md={5.305} sx={{ml:2}}>
            <TextField
              variant='standard'
              key={col.field}
              label={col.headerName}
              value={formData[col.field] || ''}
              onChange={e =>
                setFormData({ ...formData, [col.field]: e.target.value })
              }
              fullWidth
              sx={{backgroundColor:'#FFFFFF',borderRadius:'5px',paddingLeft:'15px'}}
              margin='normal'
            />
            </Grid>
          ))}
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseModal} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAdd} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color='secondary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;