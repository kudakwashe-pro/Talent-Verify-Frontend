import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import { createEmployee } from '../../api';
import {Bounce, ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeCreated }) => {
  const [formData, setFormData] = useState({
    company_id: '',
    company: '',
    name: '',
    employee_id: '',
    department: '',
    role: '',
    date_started: '',
    date_left: '',
    duties: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEmployee(formData);
      if (response.status === axios.HttpStatusCode.Created){
        notify();
      }else if (response.status === axios.HttpStatusCode.Unauthorized){
        toast.error("Unauthorized",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        return;
      }
      
    } catch (error) {
      toast.error("ERROR: "+String(error),{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      
    }
   
    onEmployeeCreated();
    setFormData({}); // Reset form
  };
  const notify = ()=> toast.success("Employee Created Successfully !",{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    })

  return (
    <Paper sx={{margin:'24px auto',width:'70vh'}}>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
      <TextField name="company_id" label="Company ID" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="company" label="Company Name" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="name" label="Employee Name" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="employee_id" label="Employee ID" onChange={handleChange} />
      </Grid><Grid item xs={12} md={6}>
      <TextField name="department" label="Department" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="role" label="Role" onChange={handleChange} required />
      </Grid><Grid item xs={12} md={6}>
      <TextField name="date_started" label="Date Started" type="date" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="date_left" label="Date Left" type="date" onChange={handleChange} />
      </Grid><Grid item xs={12} md={6}>
      <TextField name="duties" label="Duties" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={12} sx={{p:3}}>
      <Button  fullWidth type="submit" variant="contained">Create Employee</Button>
      </Grid>
    </Grid>
    </form>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
        />
    </Paper>
  );
};

export default EmployeeForm;