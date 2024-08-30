import React, { useState } from 'react'
import {
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  FormLabel
} from '@mui/material'
import { login } from '../../api'
import { Person } from '@mui/icons-material'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@mui/material'
import { green } from '@mui/material/colors'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const theme = useTheme()
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const notifyStatusSuccess = status => {
    toast.success(status, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
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
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await login(credentials)
    // Store token
    if (response.status === axios.HttpStatusCode.Ok) {
      sessionStorage.setItem('accessToken', response.data.access)
      sessionStorage.setItem('refreshToken', response.data.refresh)

      notifyStatusSuccess('Login successful')
      const newTimer = setTimeout(() => {
        window.location.href = '/home' // Redirect to home
      }, 5000)
      return () => clearTimeout(newTimer)
    } else {
      notifyStatusError('Login failed')
    }
  }

  return (
    <Paper
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '' : green[50],
        height: '70vh',
        padding: '20px',
        width: 350,
        margin: '20px auto'
      }}
    >
      <form name='LoginForm' onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ ml: 2, mb: 3 }}>
          <Grid item sx={{ ml: 8, mb: 3 }} xs={12} md={6}>
            <Avatar sx={{ height: '60px', width: '60px' }}>
              <Person sx={{ height: '50px', width: '50px' }} />
            </Avatar>
          </Grid>
          <FormLabel
            sx={{ fontFamily: 'cursive', fontSize: '3ex', fontWeight: 'bold' }}
          >
            Enter Login Details
          </FormLabel>
          <Grid item xs={12} md={12}>
            <TextField
              name='username'
              label='Username'
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name='password'
              label='Password'
              type='password'
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button sx={{ mb: 3 }} type='submit' variant='contained'>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
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
    </Paper>
  )
}

export default Login
