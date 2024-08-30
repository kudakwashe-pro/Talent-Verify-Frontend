import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import { createCompany } from '../../api';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const CompanyForm = ({ onCompanyCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    registration_date: '',
    registration_number: '',
    address: '',
    contact_person: '',
    departments: '',
    number_of_employees: '',
    contact_phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCompany(formData);
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
    onCompanyCreated();
    setFormData({});// Reset form
  };
  const notify = ()=> toast.success("Company Created Successfully !",{
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
      <TextField name="name" label="Company Name" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="registration_date" label="Registration Date" type="date" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="registration_number" label="Registration Number" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="address" label="Address" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="contact_person" label="Contact Person" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="departments" label="Departments" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="number_of_employees" label="Number of Employees" type="number" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField name="contact_phone" label="Contact Phone" type ='tel' onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={12}>
      <TextField name="email" label="Email" type="email" onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} md={12} sx={{p:3}}>
      <Button type="submit" fullWidth variant="contained">Create Company</Button>
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

export default CompanyForm;