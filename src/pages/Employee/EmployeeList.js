import React, { useEffect, useState } from 'react'
import { deleteEmployee, fetchEmployees, updateEmployee } from '../../api'
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
  DialogTitle
} from '@mui/material'
import { GridToolbar } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import ChildTabs from '../../components/childTabs'
import EmployeeForm from './EmployeeForm'
import { useTheme } from '@emotion/react'
import StripedGrid from '../../components/DataGrid'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  useEffect(() => {
    const getEmployees = async accessToken => {
      const newTimer = setTimeout(async () => {
        const response = await fetchEmployees(accessToken);
        setEmployees(response.data)
      }, 500)
      return () => clearTimeout(newTimer)
    }
    getEmployees(localStorage.getItem('accessToken'))
  })

  const notifyStatusSuccess = status => {
    toast.success(status, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })
  }
  const notifyStatusError = status => {
    toast.error(status, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })
  }

  const handleDelete = async id => {
    setEmployees(employees.filter(employee => employee.id !== id))
    try {
      const response = await deleteEmployee(id)
      if (response.status === 200) {
        notifyStatusSuccess('Employee Deleted successfully')
      } else if (response.status === axios.HttpStatusCode.Unauthorized) {
        window.location.href ='/login'
      } else {
        notifyStatusError('Error Occurred While Deletion')
      }
    } catch (error) {
      notifyStatusError('Error Occurred While Updating: ' + error)
    }
    

  }

  const handleEdit = employee => {
    setEditingEmployee(employee)
    setOpenDialog(true)
  }

  const handleSave = async () => {
    if (editingEmployee.id) {
      try {
        const response = await updateEmployee(
          editingEmployee.id,
          editingEmployee
        )
        if (response.status === 200) {
          notifyStatusSuccess('Employee updated successfully')
        } else if (response.status === axios.HttpStatusCode.Unauthorized) {
          window.location.href ='/login'
        } else {
          notifyStatusError('Error Occurred While Updating')
        }
      } catch (error) {
        notifyStatusError('Error Occurred While Updating: ' + error)
      }

      setEmployees(
        employees.map(emp =>
          emp.id === editingEmployee.id ? editingEmployee : emp
        )
      )
    } else {
      setEmployees([
        ...employees,
        { ...editingEmployee, id: employees.length + 1 }
      ])
      const response = await updateEmployee(editingEmployee)
      if (response.status === 200) {
        alert(response.status)
      }
    }
    setOpenDialog(false)
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { field: 'id', headerName: '', width: 30 },
    { field: 'employee_id', headerName: 'ID', width: 60, editable: true },
    { field: 'company', headerName: 'Company', width: 130, editable: true },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'department',
      headerName: 'Department',
      width: 100,
      editable: true
    },
    { field: 'role', headerName: 'Role', width: 100, editable: true },
    { field: 'date_started', headerName: 'Date Started', width: 100 },
    { field: 'date_left', headerName: 'Date Left', width: 100, editable: true },
    { field: 'duties', headerName: 'Duties', width: 120, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      width: 100
    }
  ]
  const theme = useTheme()

  return (
    <Box>
      <Card sx={{ bgcolor: theme.palette.mode === 'dark' ? '' : '#F1F3F1DC' }}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={12} md={8}>
            <TextField
              xs={{
                backgroundColor: theme.palette.mode === 'dark' ? '' : '#FFFFFF'
              }}
              variant='standard'
              placeholder='Search by name'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                )
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <StripedGrid
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: theme.palette.mode === 'dark' ? '' : ''
          }
        }}
        style={{
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '',
          fontSize: '1.5ex',
          fontFamily: 'Arial',
          color: theme.palette.mode === 'dark' ? 'white' : ''
        }}
        slots={{ toolbar: GridToolbar }}
        getRowId={row => row.id}
        getRowSpacing={() => ({ top: 5, bottom: 5 })}
        columns={columns}
        rows={filteredEmployees}
        onCellClick={params => alert(params.id)}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingEmployee?.id ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          {Object.keys(editingEmployee || {}).map(key => (
            <TextField
              key={key}
              label={key.replace('_', ' ').toUpperCase()}
              fullWidth
              type={
                String(key.replace('_', ' ').toUpperCase()) === 'DATE STARTED'
                  ? 'date'
                  : String(key.replace('_', ' ').toUpperCase()) === 'DATE LEFT'
                  ? 'date'
                  : ''
              }
              margin='dense'
              value={editingEmployee[key] || ''}
              onChange={e =>
                setEditingEmployee({
                  ...editingEmployee,
                  [key]: e.target.value
                })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </Box>
  )
}

const tabs = [
  {
    label: 'Record List',
    content: <EmployeeListPage />
  },
  {
    label: 'Employees Form',
    content: <EmployeeForm onCompanyCreated={() => alert('Company created!')} />
  }
]

const EmployeeList = () => {
  return <ChildTabs tabs={tabs} />
}

export default EmployeeList
