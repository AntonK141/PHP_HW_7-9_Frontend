import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoryName();
        fetchProducts();
    }, [categoryId]);

    const fetchCategoryName = async () => {
        try {
            const response = await axios.get('http://local.spd221.com/HW2/get_categories.php');
            const category = response.data.find(cat => cat.id === parseInt(categoryId));
            if (category) {
                setCategoryName(category.name);
            }
        } catch (error) {
            console.error('Error fetching category name:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://local.spd221.com/HW2/get_product.php?category_id=${categoryId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete('http://local.spd221.com/HW2/delete_product.php', {
                data: { id },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('Delete response:', response.data);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2>Product List: {categoryName}</h2>
                <button onClick={() => navigate('/')}>Back to Categories</button>
            </div>
            {products.map((product) => (
                <div className="product-item" key={product.id}>
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                    <div className="product-image">
                        <img src={`http://local.spd221.com/HW2/${product.photo}`} alt={product.name} />
                    </div>
                    <button onClick={() => handleDelete(product.id)} className="delete-button">Delete</button>
                </div>
            ))}
            <div className="add-product-item">
                <Link to={`/create-product/${categoryId}`} className="add-product-link">Add Product</Link>
            </div>
        </div>
    );
};

export default ProductList;



