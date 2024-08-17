import React, { useState } from 'react';
import { Button } from '@mui/material';
import { uploadEmployees } from '../../api';

const UploadEmployees = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await uploadEmployees(formData);
            alert('Upload successful!');
        } catch (error) {
            alert('Upload failed!');
        }
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv, .xlsx, .txt" onChange={handleFileChange} />
            <Button type="submit" variant="contained">Upload Employees</Button>
        </form>
    );
};

export default UploadEmployees;