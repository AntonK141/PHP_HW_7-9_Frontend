import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css';

const API_URL = process.env.REACT_APP_API_URL;

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo', photo);

        try {
            const response = await axios.post(`${API_URL}/add_category.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Add category response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('There was an error uploading the file!', error);
        }
    };

    return (
        <div className="create-category">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleNameChange} required />
                </div>
                <div>
                    <label>Photo:</label>
                    <input type="file" onChange={handlePhotoChange} required />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default CreateCategory;

