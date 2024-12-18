import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const { products } = useProducts();
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const productsPerPage = 5;
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLiked = showLiked ? product.liked : true;
    const withinMinPrice = minPrice === '' || product.price >= Number(minPrice);
    const withinMaxPrice = maxPrice === '' || product.price <= Number(maxPrice);
    return matchesSearch && matchesLiked && withinMinPrice && withinMaxPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-page">
      <h1>Product List</h1>

      

      <div className="filter-buttons">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); 
        }}
        className="search-input"
      />
        <button
          onClick={() => {
            setShowLiked(false);
            setCurrentPage(1);
          }}
        >
          Show All
        </button>
        <button
          onClick={() => {
            setShowLiked(true);
            setCurrentPage(1);
          }}
        >
          Show Liked
        </button>
        <button onClick={() => navigate('/create-product')}>Create Product</button>
      </div>
      <div className="price-filter">
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 10"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 100"
          />
        </label>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Products;
