import React, { useState } from 'react';
import axios from 'axios';

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
            await axios.post('http://localhost:8000/api/employees/upload/', formData, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            alert('Upload successful!');
        } catch (error) {
            alert('Upload failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv, .xlsx, .txt" onChange={handleFileChange} />
            <button type="submit">Upload Employees</button>
        </form>
    );
};

export default UploadEmployees;