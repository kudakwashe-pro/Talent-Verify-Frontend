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

import React from 'react'

const FinancialAid = (scholarships) => {
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
      
    const handleManageScholarships = () => {
        handleOpenModal(
          renderList(scholarships, scholarship => (
            <ListItemText
              primary={`${scholarship.student}: Scholarship of $${scholarship.amount} (${scholarship.status})`}
            />
          ))
        )
      }
      const handleTrackFinancialAid = () => {
        handleOpenModal(
          renderList(scholarships, scholarship => (
            <ListItemText
              primary={`${scholarship.student}: Financial aid of $${scholarship.amount} (${scholarship.status})`}
            />
          ))
        )
      }
  return (
    <SplitView
      left={
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h6' gutterBottom>
              Financial Aid and Scholarships
            </Typography>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleManageScholarships}
            >
              Manage Scholarships
            </Button>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleTrackFinancialAid}
            >
              Track Financial Aid
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

export default FinancialAid
