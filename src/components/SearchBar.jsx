import React from 'react';
function SearchBar({ value, onChange, className }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={onChange}
      className={className}
      style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
    />
  );
}
export default SearchBar; 