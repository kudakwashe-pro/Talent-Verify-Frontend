import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Modal,
  List
} from '@mui/material';
import {
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';


const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({})


  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [usersRes, coursesRes, announcementsRes] = await Promise.all([
        axios.get('/api/user/'),
        axios.get('/api/courses'),
        axios.get('/api/announcements')
      ])
      setUsers(usersRes.data)
      setCourses(coursesRes.data)
      setAnnouncements(announcementsRes.data)
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleOpenModal = content => {
    setDialogContent(content)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setDialogContent({})
  }
  
  const handleViewUsers = () => {
    handleOpenModal({
      title: 'User Management',
      content: renderList(users, user => (
        <ListItemText primary={`${user.username} (${user.userType})`} />
      ))
    })
  }
  const handleViewCourses = () => {
    handleOpenModal({
      title: 'Course Management',
      content: renderList(courses, course => (
        <ListItemText primary={`${course.name} (${course.code})`} />
      ))
    })
  }
  const handleViewAnnouncements = () => {
    handleOpenModal({
      title: 'Announcements',
      content: renderList(announcements, announcement => (
        <ListItemText
          primary={`${announcement.title}: ${announcement.content}`}
        />
      ))
    })
  }
  const handleAddUser = () => {
    setDialogContent({
      title: 'Add User',
      content: (
        <Box>
          <TextField label='Name' fullWidth margin='normal' />
          <TextField label='Email' fullWidth margin='normal' />
          <TextField label='Role' fullWidth margin='normal' />
        </Box>
      ),
      actions: (
        <Button onClick={() => setDialogOpen(false)} color='primary'>
          Add User
        </Button>
      )
    })
    setDialogOpen(true)
  }
  const renderList = (data, renderItem) => (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>{renderItem(item)}</ListItem>
      ))}
    </List>
  )
  if (loading) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }
  if (error) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <Alert severity='error'>{error}</Alert>
        </Box>
      </Container>
    )
  }
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant='h4' gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant='h6' gutterBottom>
            Welcome, Admin! Manage the administrative operations of the school.
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {/* User Management */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant='h6' gutterBottom>
                  User Management
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={handleViewUsers}
                >
                  View Users
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
              </Paper>
            </Grid>
            {/* Course Management */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Course Management
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={handleViewCourses}
                >
                  View Courses
                </Button>
              </Paper>
            </Grid>
            {/* Announcements */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Announcements
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={handleViewAnnouncements}
                >
                  View Announcements
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            padding: 4,
            margin: 'auto',
            mt: '10%'
          }}
        >
          <Typography variant='h6' component='h2'>
            {dialogContent.title}
          </Typography>
          <Box sx={{ mt: 2 }}>{dialogContent.content}</Box>
        </Box>
      </Modal>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>{dialogContent.content}</DialogContent>
        <DialogActions>
          {dialogContent.actions}
          <Button onClick={() => setDialogOpen(false)} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
export default AdminDashboard
