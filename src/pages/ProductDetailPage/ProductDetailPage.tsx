import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import './style.css';
import defaultImg from '../../assets/icons/image.png'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();

  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((prod) => prod.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <p className="error-message">Product not found!</p>
        <button className="goBack" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className='product-detail-page-main' >
       <button className="goBack" type='submit' onClick={() => navigate('/products')}>
        Back to Products
      </button>
      <div className="product-detail-page">
        <div className="product-detail-container">
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title}  onError={(e) => {
          (e.target as HTMLImageElement).src = `${defaultImg}`;
        }}/>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="description">{product.description}</p>
        </div>
      </div>      
    </div>
  );
};

export default ProductDetailPage;
