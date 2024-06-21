import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from '../assets/images/shop/del.png';

const UserOrders = () => {
  // State pour stocker les commandes de l'utilisateur
  const [orders, setOrders] = useState([]);

  // Fonction pour supprimer une commande
  const handleRemoveOrder = (orderId) => {
    // Logique pour supprimer la commande avec l'ID donné
    // Mise à jour de l'état des commandes
    // updateOrders(updatedOrders);
  };

  return (
    <div>
      <PageHeader title={'User Orders'} curPage={'User Orders'} />

      <div className="user-orders padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* Liste des commandes de l'utilisateur */}
            <div className="order-list">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div key={index} className="order-item">
                    {/* Détails de la commande */}
                    <div className="order-details">
                      <h4> Order ID S: {order.id}</h4>
                      {/* Affichage des produits commandés */}
                      <ul className="ordered-products">
                        {order.products.map((product, indx) => (
                          <li key={indx}>
                            <span className="product-name">{product.name}</span>
                            <span className="product-quantity">Quantity: {product.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Bouton pour supprimer la commande */}
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
