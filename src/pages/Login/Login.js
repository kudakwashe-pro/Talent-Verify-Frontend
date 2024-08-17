import React, { useState } from 'react'
import { TextField, Button, Paper, Grid, Avatar, FormLabel } from '@mui/material'
import { login } from '../../api'
import {Person} from '@mui/icons-material';


const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await login(credentials)
    
    // Store token
    localStorage.setItem('access_token', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
    alert('Login successful')
    window.location.href = '/home' // Redirect to home
  }

  return (
    <Paper sx={{ height: 'flex', ml: 60, mr: 60, mt: 10,bgcolor:'#DAF3CF' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ml:2, mb:3}}>
        <Grid item sx={{ml:12,mb:3}} xs={12} md={6}>
            <Avatar sx={{height:'60px',width:'60px'}}>
              <Person sx={{height:'50px',width:'50px'}}/>
            </Avatar>
            
          </Grid>
          <FormLabel sx={{fontFamily:'cursive',fontSize:'3ex',fontWeight:'bold'}}>Enter Login Details</FormLabel>
          <Grid item  xs={12} md={12}>
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
            <Button sx={{mb:3}} type='submit' variant='contained'>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Login
