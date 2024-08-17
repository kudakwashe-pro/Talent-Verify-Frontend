import { Box, Button, Grid, List, ListItem, ListItemText, Modal, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import SplitView from '../../../components/SplitView'

const Payments = (payments) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const handleOpenModal = content => {
        setModalContent(content)
        setModalOpen(true)
      }

      const handleCloseModal = () => {
        setModalOpen(false)
        setModalContent(null)
      }
    const handleProcessPayments = () => {
        handleOpenModal(
          renderList(payments, payment => (
            <ListItemText
              primary={`${payment.student}: Paid $${payment.amount} on ${payment.date}`}
            />
          ))
        )
      }
      const renderList = (data, renderItem) => (
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>{renderItem(item)}</ListItem>
          ))}
        </List>
      )

      const handleGenerateReceipts = () => {
        handleOpenModal(
          renderList(payments, payment => (
            <ListItemText
              primary={`Receipt: ${payment.student} paid $${payment.amount} on 
    ${payment.date}`}
            />
          ))
        )
      }
      const handleIssueRefunds = () => {
        handleOpenModal(
          <Typography>
            Refunds can be issued through the payment processing system.
          </Typography>
        )
      }


  return (
    <SplitView
      left={
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h6' gutterBottom>
              Payment Processing
            </Typography>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleProcessPayments}
            >
              Process Payments
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleGenerateReceipts}
            >
              Generate Receipts
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleIssueRefunds}
            >
              Issue Refunds
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
        </Grid>
        
      }
    />
  )
}

export default Payments
