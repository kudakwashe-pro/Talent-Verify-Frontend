import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createCompany } from '../../api';

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
    await createCompany(formData);
    onCompanyCreated();
    setFormData({}); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Company Name" onChange={handleChange} required />
      <TextField name="registration_date" label="Registration Date" type="date" onChange={handleChange} required />
      <TextField name="registration_number" label="Registration Number" onChange={handleChange} required />
      <TextField name="address" label="Address" onChange={handleChange} required />
      <TextField name="contact_person" label="Contact Person" onChange={handleChange} required />
      <TextField name="departments" label="Departments" onChange={handleChange} required />
      <TextField name="number_of_employees" label="Number of Employees" type="number" onChange={handleChange} required />
      <TextField name="contact_phone" label="Contact Phone" onChange={handleChange} required />
      <TextField name="email" label="Email" type="email" onChange={handleChange} required />
      <Button type="submit" variant="contained">Create Company</Button>
    </form>
  );
};

export default CompanyForm;