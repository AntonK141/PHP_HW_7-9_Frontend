import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoryList.css';

const API_URL = process.env.REACT_APP_API_URL;

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_categories.php`);
            console.log('Fetched categories:', response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_category.php`, {
                data: { id },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('Delete response:', response.data);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="category-container">
            {categories.map((category) => (
                <div className="category-box" key={category.id}>
                    <Link to={`/products/${category.id}`}>
                        <h3>{category.name}</h3>
                    </Link>
                    <img src={`${API_URL}/${category.photo}`} alt={category.name} />
                    <button onClick={() => handleDelete(category.id)} className="delete-button">Delete</button>
                </div>
            ))}
            <div className="category-box add-category">
                <Link to="/create-category">Add Category</Link>
            </div>
        </div>
    );
};

export default CategoryList;



