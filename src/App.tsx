import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Products from './pages/Products/Products';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage/CreateProductPage';
import EditProductPage from './pages/EditProductPage/EditProductPage';

function App() {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='products' element={<Products/>} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="*" element={<Products />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
