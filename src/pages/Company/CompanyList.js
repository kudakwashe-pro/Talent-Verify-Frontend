import React, { useEffect, useState } from 'react'
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
import { useTheme } from '@emotion/react'
import StripedGrid from '../../components/DataGrid'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { deleteCompanies, fetchCompanies, updateCompanies } from '../../api'
import CompanyForm from './CompanyForm'

const CompaniesListPage = () => {
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)

  useEffect(() => {
    const getCompany = async accessToken => {
      const newTimer = setTimeout(async () => {
        const response = await fetchCompanies(accessToken)
        setCompanies(response.data)
      }, 500)
      return () => clearTimeout(newTimer)
    }
    getCompany(localStorage.getItem('accessToken'))
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
    setCompanies(companies.filter(company => company.id !== id))
    try {
      const response = await deleteCompanies(id)
      if (response.status === 200) {
        notifyStatusSuccess('Company Deleted successfully')
      } else if (response.status === axios.HttpStatusCode.Unauthorized) {
        window.location.href = '/'
      } else {
        notifyStatusError('Error Occurred While Deletion')
      }
    } catch (error) {
      notifyStatusError('Error Occurred While Updating: ' + error)
    }
  }

  const handleEdit = companies => {
    setEditingCompany(companies)
    setOpenDialog(true)
  }

  const handleSave = async () => {
    if (editingCompany.id) {
      try {
        const response = await updateCompanies(
          editingCompany.id,
          editingCompany
        )
        if (response.status === 200) {
          notifyStatusSuccess('Company updated successfully')
        } else if (response.status === axios.HttpStatusCode.Unauthorized) {
          window.location.href = '/'
        } else {
          notifyStatusError('Error Occurred While Updating')
        }
      } catch (error) {
        notifyStatusError('Error Occurred While Updating: ' + error)
      }

      setCompanies(
        companies.map(emp =>
          emp.id === editingCompany.id ? editingCompany : emp
        )
      )
    } else {
      setCompanies([
        ...companies,
        { ...editingCompany, id: companies.length + 1 }
      ])
      const response = await updateCompanies(editingCompany)
      if (response.status === 200) {
        alert(response.status)
      }
    }
    setOpenDialog(false)
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { field: 'id', headerName: '', width: 30 },
    { field: 'name', headerName: 'Name', width: 120, editable: true },
    {
      field: 'registration_date',
      headerName: 'Reg Date',
      width: 130,
      editable: true
    },
    {
      field: 'registration_number',
      headerName: 'Reg No.',
      width: 100,
      editable: true
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 180,
      editable: true
    },
    {
      field: 'contact_person',
      headerName: 'Contact Person',
      width: 100,
      editable: true
    },
    { field: 'departments', headerName: 'Departments', width: 100 },
    {
      field: 'number_of_employees',
      headerName: 'No.Employees',
      width: 60,
      editable: true
    },
    {
      field: 'contact_phone',
      headerName: 'Contact Phone',
      width: 100,
      editable: true
    },
    { field: 'email', headerName: 'Email', width: 100, editable: true },
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
        rows={filteredCompanies}
        onCellClick={params => alert(params.id)}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingCompany?.id ? 'Edit Company' : 'Add New Company'}
        </DialogTitle>
        <DialogContent>
          {Object.keys(editingCompany || {}).map(key => (
            <TextField
              key={key}
              label={key.replace('_', ' ').toUpperCase()}
              fullWidth
              required
              type={
                String(key.replace('_', ' ').toUpperCase()) === 'REGISTRATION DATE'
                  ? 'date'
                  : String(key.replace('_', ' ').toUpperCase()) === 'EMAIL'
                  ? 'email'
                  : String(key.replace('_', ' ').toUpperCase()) === 'CONTACT PHONE'
                  ? "tel"
                  : String(key.replace('_', ' ').toUpperCase()) === 'NUMBER OF_EMPLOYEES'
                  ? "number"
                  :''

              }
              margin='dense'
              value={editingCompany[key] || ''}
              onChange={e =>
                setEditingCompany({
                  ...editingCompany,
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
    content: <CompaniesListPage />
  },
  {
    label: 'Company Form',
    content: <CompanyForm onCompanyCreated={() => alert('Company created!')} />
  }
]

const CompanyList = () => {
  return <ChildTabs tabs={tabs} />
}

export default CompanyList
