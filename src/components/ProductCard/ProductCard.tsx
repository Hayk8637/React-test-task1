import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import heartActive from '../../assets/icons/heartActive.png';
import heartPass from '../../assets/icons/heartPass.png';
import deleteIcon from '../../assets/icons/delete.png';
import defaultImg from '../../assets/icons/image.png';
import editIcon from '../../assets/icons/editing.png';
import './style.css';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    liked: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { toggleLike, deleteProduct } = useProducts();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img
        src={product.image}
        className="product-img"
        alt={product.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `${defaultImg}`;
        }}
      />
      <h3>{product.title.slice(0, 40)}...</h3>
      <p>${product.price}</p>

      <div className="actions">
        <button
          className={`like-btn ${product.liked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          {product.liked ? <img src={heartActive} alt="like" /> : <img src={heartPass} alt="dislike" />}
        </button>
        <button className="edit-btn" onClick={handleEditClick}>
          <img src={editIcon} alt="edit" />
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
