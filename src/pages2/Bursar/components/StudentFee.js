import {
  List,
  Button,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Modal,
  Box
} from '@mui/material'
import { useState } from 'react'
import SplitView from '../../../components/SplitView'
import DataTable from '../../Home/DataTable'

const StudentFee = (students) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const renderList = (data, renderItem) => (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>{renderItem(item)}</ListItem>
      ))}
    </List>
  )
  const handleOpenModal = content => {
    setModalContent(content)
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
    setModalContent(null)
  }
  const handleViewUpdateFeeStructure = () => {
    handleOpenModal(
      renderList(students, student => (
        <ListItemText primary={`${student.name}: $${student.fee}`} />
      ))
    )
  }
  const handleTrackFeePayments = () => {
    handleOpenModal(
      renderList(students, student => (
        <ListItemText
          primary={`${student.name}: Paid $${student.paid}, Balance $${student.balance}`}
        />
      ))
    )
  }
  const handleGenerateInvoices = () => {
    handleOpenModal(
      renderList(students, student => (
        <ListItemText
          primary={`${student.name}: Invoice for $${student.balance}`}
        />
      ))
    )
  }
  const columns = [
    { field: 'ID', headerName: 'ID' },
    { field: 'fullname ', headerName: 'Fullname' },
    { field: 'age', headerName: 'Age' },
    { field: 'gender', headerName: 'gender' },
    { field: 'address', headerName: 'address' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'email', headerName: 'Email' },
    { field: 'classname', headerName: 'Classname' },
    { field: 'Regdate', headerName: 'Regdate' },
    { field: 'Status ', headerName: 'Status ' },
  ];

  const initialData = [
    { ID: 1,
     fullname:'dj' ,
     age:23,
     gender: 'f' ,
     address:'katana' ,
     phone: 771297997,
     email:'@contact',
     classname:'upper' ,
     Regdate:'12/131/33' ,
     Status:'alive' },
  ];
  

  
  return (
    <SplitView
    left={
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant='h6' gutterBottom>
          Student Fee Management
        </Typography>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleViewUpdateFeeStructure}
        >
          View/Update Fee Structure
        </Button>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleTrackFeePayments}
        >
          Track Fee Payments
        </Button>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleGenerateInvoices}
        >
          Generate Invoices
        </Button>
      </Paper>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            padding: 4,
            margin: 'auto',
            mt: '10%'
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2'>
            Details
          </Typography>
          <Box id='modal-description' sx={{ mt: 2 }}>
            {modalContent}
          </Box>
        </Box>
      </Modal>
    </Grid>}
    right={<div ><DataTable columns={columns} initialData={initialData} /></div>}
    />
  )
}
export default StudentFee
