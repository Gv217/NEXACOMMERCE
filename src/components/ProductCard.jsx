function ProductCard({ title, price, addToCart }) {
  return (
    <div className="product-card">
      <h4>{title}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;