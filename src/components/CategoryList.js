import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://local.spd221.com/HW2/get_categories.php');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete('http://local.spd221.com/HW2/delete_category.php', {
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
                    <h3>{category.name}</h3>
                    <img src={`http://local.spd221.com/HW2/${category.photo}`} alt={category.name} />
                    <button onClick={() => handleDelete(category.id)}>Delete</button>
                </div>
            ))}
            <div className="category-box add-category">
                <Link to="/create-category">Add Category</Link>
            </div>
        </div>
    );
};

export default CategoryList;
