import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

import './style.css'

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price))) newErrors.price = 'Valid price is required';
    if (!description) newErrors.description = 'Description is required';
    if (!image) newErrors.image = 'Image URL is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addProduct({
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      image,
      liked: false,
    });

    navigate('/products');
  };

  return (
    <div className="create-product-page">
      <button type='submit' className='goBack' onClick={() =>  navigate('/products')}>Go to Products</button>
      <div className='create-product'>
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          <button type="submit">Create Product</button>
        </form>
          <button type='submit' className='cancel' onClick={() =>  navigate('/products')} >Cancel</button>
      </div>
      
    </div>
  );
};

export default CreateProductPage;
