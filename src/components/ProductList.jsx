import React from 'react';
import ProductCard from './ProductCard';
function ProductList({ products, search, isAuthenticated, likedProducts, onLike }) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="product-list">
      {filtered.map(product => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          liked={likedProducts && likedProducts.includes(product.id)}
          isAuthenticated={isAuthenticated}
          onLike={() => onLike(product.id)}
        />
      ))}
    </div>
  );
}
export default ProductList; 