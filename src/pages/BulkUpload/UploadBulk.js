import React, { useState } from 'react'
import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Paper,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material'
import { uploadCompanies, uploadEmployees } from '../../api'
import { green, grey } from '@mui/material/colors'
import { Bounce, toast, ToastContainer } from 'react-toastify'

const BulkUpload = () => {
  const [file, setFile] = useState(null)
  const theme = useTheme()

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }
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

  const handleSubmit = async e => {
    e.preventDefault()

    if (!file) {
      notifyStatusError('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    if (value === '') {
      notifyStatusError('Select File First')
    } else if (value === 'Employees') {
      try {
        const response = await uploadEmployees(formData)
        console.log('Upload response:', response)
        notifyStatusSuccess('Upload successful!')
      } catch (error) {
        console.error('Upload error:', error)
        notifyStatusError('Upload failed! ' + (error.response?.data?.error || ''))
      }
    } else if (value === "Companies"){

        try {
            const response = await uploadCompanies(formData)
            console.log('Upload response:', response)
            alert('Companies Upload successful!')
          } catch (error) {
            console.error('Companies Upload error:', error)
            alert('Companies Upload failed! ' + (error.response?.data?.error || ''))
          }
    }
  }
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
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
      <form onSubmit={handleSubmit}>
        <Grid container sx={{ p: 2, mb: 3 }}>
          <Grid item xs={12} md={12} sx={{ mb: 3 }}>
            <Input
              type='file'
              accept='.csv, .xlsx, .txt'
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            
            <FormLabel required component='legend'>
              Choose An Option
            </FormLabel>
            <Container sx={{bgcolor:grey[700],mb:3}}>
            <RadioGroup
            
              aria-label='options'
              name='options'
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
              style={{color: '   '}}
                value='Employees'
                control={<Radio />}
                label='Employees Data'
              />
              <FormControlLabel
                value='Companies'
                control={<Radio />}
                label='Companies Data'
              />
            </RadioGroup>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type='submit' variant='contained'>
              {value.toUpperCase()} Bulk
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

export default BulkUpload
