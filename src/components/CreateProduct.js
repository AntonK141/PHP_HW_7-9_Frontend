import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateProduct.css';

const CreateProduct = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', categoryId);
        formData.append('photo', photo);

        try {
            const response = await axios.post('http://local.spd221.com/HW2/add_product.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate(`/products/${categoryId}`);
        } catch (error) {
            console.error('There was an error uploading the file!', error);
        }
    };

    return (
        <div className="create-product">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleNameChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={handleDescriptionChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={handlePriceChange} required />
                </div>
                <div>
                    <label>Photo:</label>
                    <input type="file" onChange={handlePhotoChange} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;

