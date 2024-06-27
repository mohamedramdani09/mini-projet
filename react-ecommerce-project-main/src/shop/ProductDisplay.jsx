import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDisplay = ({ item }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("There was an error fetching the product details!", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const initialQuantity = 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      id_product: product.id_product,
      name_product: product.name_product,
      price_product: product.price_product,
      img_product: product.img_product,
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCart.findIndex(
      (cartItem) => cartItem.id_product === productToAdd.id_product
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      existingCart.push(productToAdd);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setQuantity(1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  return (
    <>
      {product ? (
        <div>
          <div>
            <h4>{product.name_product}</h4>
            <p>{product.description_product}</p>
            <h4>${product.price_product}</h4>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="cart-plus-minus">
                <div className="dec qtybutton" onClick={handleDecrease}> - </div>
                <input
                  className="cart-plus-minus-box"
                  type="text"
                  name="qtybutton"
                  id="qtybutton"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <div className="inc qtybutton" onClick={handleIncrease}> + </div>
              </div>

              <button type="submit" className="lab-btn">
                <span>Add to Cart</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductDisplay;
