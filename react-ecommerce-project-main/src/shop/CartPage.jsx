import React, { useEffect, useState, useContext } from 'react'
import PageHeader from '../components/PageHeader';
import { Link, Navigate } from 'react-router-dom';
import delImgUrl from "../assets/images/shop/del.png";
import CheckOutPage from './CheckOutPage';

const CartPage = () => {
    const [cartItems, setcartItems] = useState([]);

    useEffect(() =>{
        // Fetch Cart Item from Local Storage
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setcartItems(storedCartItems);
    }, [])

    // Calculate Prices
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    }

    // Handle quantity increase - pour incrémenter (+) la quantité du produit dans le panier
    const handleIncrease = (item) => {
        item.quantity += 1;
        setcartItems([...cartItems]);

        // Update Local Storage with New Cart Items
        localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    // Handle quantity decrease - pour décrémenter (-) la quantité du produit dans le panier
    const handleDecrease = (item) => {
        if(item.quantity > 1){
            item.quantity -= 1;
            setcartItems([...cartItems]);

        // Update Local Storage with New Cart Items
        localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    };

    // Handle Item Remove - pour supprimer un produit du panier
    const handleRemoveItem = (item) => {
       const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

       // Update New Cart 
       setcartItems(updatedCart);
       updateLocalStorage(updatedCart);
    }

    const updateLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Cart Subtotal
    const cartSubtotal = cartItems.reduce((total, item) =>{
        return total + calculateTotalPrice(item);
    }, 0)

    // Order Total
    const orderTotal = cartSubtotal;


  return (
    <div>
        <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />

        <div className="shop-cart padding-tb">
            <div className="container">
                <div className="section-wrapper">
                    {/* Cart Top - le menu du panier */}
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
                                {
                                    cartItems.map((item, indx) => (
                                        <tr key={indx}>
                                            <td className="product-item cat-product">
                                                <div className="p-thumb">
                                                    <Link to="/shop"> <img src={item.img} alt=""/> </Link>
                                                </div>
                                                <div className="p-content">
                                                    <Link to="/shop"> {item.name} </Link>
                                                </div>
                                            </td>
                                                                    {/* Ici on peut remplacer avec le DA */}
                                            <td className="cat-price"> ${item.price} </td>
                                            <td className="cat-quantity">
                                                <div className="cart-plus-minus">
                                                    <div className="dec qtybutton" onClick={() => handleDecrease(item)}> - </div>
                                                    <input type="text" className="cart-plus-minus-box" name="qtybutton" value={item.quantity} />
                                                    <div className="inc qtybutton" onClick={() => handleIncrease(item)}> + </div>
                                                </div>
                                            </td>
                                            <td className="cat-toprice"> ${calculateTotalPrice(item)} </td>
                                            <td className="cat-edit">
                                                <a href="#" onClick={() => handleRemoveItem(item) }>
                                                    <img src={delImgUrl} alt="" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>

                    {/* Cart Top Ends - la fin de menu du panier */}

                    {/* Cart Bottom - le bas du menu du panier */}
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
                                    <CheckOutPage/>
                                </div>
                            </form>
                        </div>
                        {/* ------- CheckOut Box End ----- */}

                        {/* Shopping Box */}
                        <div className="shiping-box">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="calculate-shiping">
                                        <h3> Calculate Shipping </h3>
                                        <div className="outline-select">
                                            <select>
                                                <option value="uk"> Algeria </option>
                                                <option value="uk"> Tunis </option>
                                                <option value="morocco"> Morocco </option>
                                                <option value="france"> France </option>
                                                <option value="uk"> United Kingdom (UK) </option>
                                                <option value="us"> United States (USA) </option>
                                                <option value="canada"> Canada </option>
                                                <option value="spain"> Spain </option>
                                                <option value="egypt"> Egypt </option>
                                                <option value="italy"> Italy </option>
                                                <option value="Japan"> Japan </option>
                                                <option value="china"> China </option>
                                            </select>
                                            <span className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </span>
                                        </div>

                                        <div className="outline-select shipping-select">
                                            <select>
                                                <option value="alger"> Algiers </option>
                                                <option value="bejaia"> Béjaïa </option>
                                                <option value="tiziouzou"> Tizi Ouzou </option>
                                                <option value="constantine"> Constantine </option>
                                                <option value="setif"> Setif </option>
                                                <option value="Tipaza"> Tipaza </option>
                                                <option value="tunis"> Tunis </option>
                                                <option value="Rabat"> Rabat </option>
                                                <option value="Paris"> Paris </option>
                                                <option value="ny"> New York </option>
                                                <option value="uk"> London </option>
                                                <option value="ottawa"> Ottawa </option>
                                                <option value="Rabat"> Toronto </option>
                                                <option value="madrid"> Madrid </option>
                                                <option value="Cairo"> Cairo </option>
                                                <option value="tokyo"> Tokyo </option>
                                            </select>
                                            <span className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </span>
                                        </div>
                                        <input type="text" name="postalCode" id="postalCode" placeholder="Postocode/ZIP *" className="cart-page-input-text"/>
                                        <button type="submit"> Update Address </button>
                                    </div> 
                                </div>

                                <div className="col-md-6 col-12">
                                    <div className="cart-overview">
                                        <h3> Cart Totals </h3>
                                        <ul className="lab-ul">
                                            <li> 
                                                <span className="pull-left"> Cart Subtotal </span>
                                                <p className="pull-right"> $ {cartSubtotal} </p>
                                            </li>
                                            <li> 
                                                <span className="pull-left"> Shipping and Handling </span>
                                                <p className="pull-right"> Free Shipping </p>
                                            </li>
                                            <li> 
                                                <span className="pull-left"> Order Total </span>
                                                <p className="pull-right"> $ {orderTotal.toFixed(2)} </p>
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
  )
}

export default CartPage