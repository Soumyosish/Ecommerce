import React from 'react';
const placeholder = 'https://via.placeholder.com/90x90?text=Product';
function ProductCard({ name, price, image, liked, isAuthenticated, onLike, disableLike }) {
  return (
    <div className="product-card">
      <img src={image || placeholder} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p>Price: Rs {price}</p>
      {!disableLike && (
        <button
          className={liked ? 'liked' : ''}
          onClick={isAuthenticated ? onLike : undefined}
          disabled={!isAuthenticated}
          title={isAuthenticated ? '' : 'Login to like products'}
          aria-pressed={liked}
        >
          {liked ? 'Liked ❤️' : 'Like 🤍'}
        </button>
      )}
    </div>
  );
}
export default ProductCard; 