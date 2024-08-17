import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Typography
} from '@mui/material'
import { useState } from 'react'
import SplitView from '../../../components/SplitView'

const Budgets = (budgets) => {
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
  const handleMonitorBudgets = () => {
    handleOpenModal(
      renderList(budgets, budget => (
        <ListItemText
          primary={`${budget.department}: Allocated $${budget.allocated}, Spent $${budget.spent}`}
        />
      ))
    )
  }
  const handleApproveExpenditures = () => {
    handleOpenModal(
      <Typography>
        Expenditures can be approved through the budget manag ement system.
      </Typography>
    )
  }
  const handleGenerateBudgetReports = () => {
    handleOpenModal(
      renderList(budgets, budget => (
        <ListItemText primary={`${budget.department}: Budget Report`} />
      ))
    )
  }
  return (
    <SplitView
      left={
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h6' gutterBottom>
              Budget Management
            </Typography>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleMonitorBudgets}
            >
              Monitor Budgets
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleApproveExpenditures}
            >
              Approve Expenditures
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleGenerateBudgetReports}
            >
              Generate Budget Reports
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

export default Budgets
