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

const FinancialReports = (financialReports) => {
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
  const renderList = (data, renderItem) => (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>{renderItem(item)}</ListItem>
      ))}
    </List>
  )
  const handleGenerateFinancialReports = () => {
    handleOpenModal(
      renderList(financialReports, report => (
        <ListItemText primary={`Report: ${report.type}`} />
      ))
    )
  }
  const handleViewFinancialInsights = () => {
    handleOpenModal(
      <Typography>
        View detailed financial insights and analytics here.
      </Typography>
    )
  }
  return (
    <SplitView
      left={
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h6' gutterBottom>
              Financial Reporting
            </Typography>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleGenerateFinancialReports}
            >
              Generate Financial Reports
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleViewFinancialInsights}
            >
              View Financial Insights
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

export default FinancialReports
