// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';
import Manufacturers from './pages/Manufacturers';
import PriceSum from './pages/PriceSum';
import UnitFilter from './pages/UnitFilter';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />
        <Route path="/manufacturers" element={<Manufacturers />} />
        <Route path="/price-sum" element={<PriceSum />} />
        <Route path="/filter-unit" element={<UnitFilter />} />
      </Routes>
    </Router>
  );
}

export default App;
