import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from '../assets/images/shop/del.png';
import CheckOutPage from "../shop/CheckOutPage";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch Cart Item from Local Storage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Calculate Prices - Calcul des prix 
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase - incrémnter la quantité des produits
  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);

    // Update Local Storage with New Cart Items - Mise à jour du panier
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  // Handle quantity decrease - fonction pour décrementer la quantité du produit
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);

      // Update Local Storage with New Cart Items - mise à jour
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  };

  // Handle Item Remove - fonction pour la suppression du panier
  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

    // Update New Cart - mise à jour du panier
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Cart Subtotal - Totale du panier
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Order Total
  const orderTotal = cartSubtotal;

  return (
    <div>
      <PageHeader title={'Shop Cart'} curPage={'Cart Page'} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* Cart Top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product"> Product </th>
                    <th className="cat-price"> Price </th>
                    <th className="cat-quantity"> Quantity </th>
                    <th className="cat-toprice"> Total </th>
                    <th className="cat-edit"> Edit </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {cartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop">
                            <img src={item.img} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop">{item.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div className="dec qtybutton" onClick={() => handleDecrease(item)}>
                            -
                          </div>
                          <input type="text" className="cart-plus-minus-box" name="qtybutton" value={item.quantity} />
                          <div className="inc qtybutton" onClick={() => handleIncrease(item)}>
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">${calculateTotalPrice(item)}</td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Bottom */}
            <div className="cart-bottom">
              {/* CheckOut Box */}
              <div className="cart-checkout-box">
                <form className="coupon">
                  <input className="cart-page-input-text" type="text" name="coupon" id="coupon" placeholder="Coupon Code ..." />
                  <input type="submit" value="Apply Coupon" />
                </form>

                <form className="cart-checkout">
                  <input type="submit" value="Update Cart" />
                  <div>
                    <CheckOutPage />
                  </div>
                </form>
              </div>

              {/* Shopping Box */}
              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3> Calculate Shipping </h3>
                      {/* Shipping calculation form */}
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3> Cart Totals </h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left"> Cart Subtotal </span>
                          <p className="pull-right"> ${cartSubtotal} </p>
                        </li>
                        <li>
                          <span className="pull-left"> Shipping and Handling </span>
                          <p className="pull-right"> Free Shipping </p>
                        </li>
                        <li>
                          <span className="pull-left"> Order Total </span>
                          <p className="pull-right"> ${orderTotal.toFixed(2)} </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
