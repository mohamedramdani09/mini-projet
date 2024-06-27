import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from '../assets/images/shop/del.png';

const UserOrders = () => {
  
  const [orders, setOrders] = useState([]);

  const handleRemoveOrder = (orderId) => {
  };

  return (
    <div>
      <PageHeader title={'User Orders'} curPage={'User Orders'} />

      <div className="user-orders padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="order-list">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div key={index} className="order-item">
                    <div className="order-details">
                      <h4> Order ID S: {order.id}</h4>
                      <ul className="ordered-products">
                        {order.products.map((product, indx) => (
                          <li key={indx}>
                            <span className="product-name">{product.name}</span>
                            <span className="product-quantity">Quantity: {product.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleRemoveOrder(order.id)}>
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p> No orders available </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
