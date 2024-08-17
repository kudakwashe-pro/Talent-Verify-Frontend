import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createEmployee } from '../../api';

const EmployeeForm = ({ onEmployeeCreated }) => {
  const [formData, setFormData] = useState({
    company_id: '',
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
    await createEmployee(formData);
    onEmployeeCreated();
    setFormData({}); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="company_id" label="Company ID" onChange={handleChange} required />
      <TextField name="name" label="Employee Name" onChange={handleChange} required />
      <TextField name="employee_id" label="Employee ID" onChange={handleChange} />
      <TextField name="department" label="Department" onChange={handleChange} required />
      <TextField name="role" label="Role" onChange={handleChange} required />
      <TextField name="date_started" label="Date Started" type="date" onChange={handleChange} required />
      <TextField name="date_left" label="Date Left" type="date" onChange={handleChange} />
      <TextField name="duties" label="Duties" onChange={handleChange} required />
      <Button type="submit" variant="contained">Create Employee</Button>
    </form>
  );
};

export default EmployeeForm;