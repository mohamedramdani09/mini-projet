import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const desc =
  "Energistia an deliver atactica metrcs after avsionary Apropria trnsition enterpris an sources applications emerging psd template.";

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

  ///////////////////
  const initialQuantity = item.quantity || 1; // Ensure initial quantity is a valid number
  const [prequantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    if (prequantity > 1) {
      setQuantity(prequantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(prequantity + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id_product: item.id,
      quantity: prequantity,
    };
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCart.findIndex(
      (cartItem) => cartItem.id_product === product.id_product
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setQuantity(1); // Reset quantity after adding to cart
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
            <h4> {product.name_product} </h4>
            <p>{product.description_product}</p>
            <h4>${product.price_product}</h4>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="cart-plus-minus">
                <div className="dec qtybutton" onClick={handleDecrease}>
                  {" "}
                  -{" "}
                </div>
                <input
                  className="cart-plus-minus-box"
                  type="text"
                  name="qtybutton"
                  id="qtybutton"
                  value={prequantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
                <div className="inc qtybutton" onClick={handleIncrease}>
                  {" "}
                  +{" "}
                </div>
              </div>

              <button type="submit" className="lab-btn">
                <span> Add to Cart </span>
              </button>
              <Link to="/cart-page" className="lab-btn bg-primary">
                <span> Check Out </span>
              </Link>
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
