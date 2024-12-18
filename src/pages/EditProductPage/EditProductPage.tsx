import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import './style.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  liked: boolean;
}

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();

  const productToEdit = products.find((product) => product.id === Number(id));

  const [formData, setFormData] = useState<Product | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      navigate('/products');
    }
  }, [productToEdit, navigate]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData?.title) newErrors.title = 'Title is required';
    if (!formData?.price || isNaN(Number(formData.price)))
      newErrors.price = 'Valid price is required';
    if (!formData?.description) newErrors.description = 'Description is required';
    if (!formData?.image) newErrors.image = 'Image URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData) {
      updateProduct(formData);
      navigate('/products');
    }
  };

  return (
    <div className="create-product-page">
      <button type="submit" className="goBack" onClick={() => navigate('/products')}>
        Go to Products
      </button>
      <div className="create-product">
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          <button type="submit">Save</button>
          <button
            type="button"
            className="cancel"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
