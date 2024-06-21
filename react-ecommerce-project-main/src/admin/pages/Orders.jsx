import React, { useState, useEffect } from "react";
import {
  getOrder,
  deleteOrder,
  getProduct,
  fetchUsers,
  getpayment,
} from "./../apiFunction/apiService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setpayments] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    getUsers();
    fetchpayments();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrder();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await getProduct();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const getUsers = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserName = (userId) => {
    const category = users.find((cat) => cat.user_id === userId);
    return category ? category.name_user : "Unknown";
  };

  const fetchpayments = async () => {
    try {
      const paymentData = await getpayment();
      setpayments(paymentData);
    } catch (error) {
      console.error("Error fetching payment:", error);
    }
  };

  const getpaymentMethod = (paymentId) => {
    const payment = payments.find((cat) => cat.id_payment === paymentId);
    return payment ? payment.method_payment : "Unknown";
  };

  return (
    <>
      <div className="main-title">
        <h3>Orders managment</h3>
      </div>
      <div>
        <table className="table table-striped animated fadeInUp">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Method Payment</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Products</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id_order}>
                <th scope="row">{index + 1}</th>
                <td>{getUserName(order.user_id)}</td>
                <td>{getpaymentMethod(order.payment_id)}</td>
                <td>{order.total_amount_order}</td>
                <td>{order.status_order}</td>
                <td>
                  <button
                    className="btn btn-info px-3 me-3 animated fadeInUp text-light"
                    data-bs-toggle="modal"
                    data-bs-target="#portfolioModal1"
                  >
                    Affiche
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger px-3 animated fadeInUp"
                  onClick={() => handleDeleteOrder(order.id_order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="portfolio-modal modal fade"
        id="portfolioModal1"
        tabIndex="-1"
        aria-labelledby="portfolioModal1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="mx-5">
              <h1 className="text-black mb-3">Products</h1>

              <table className="table table-striped mb-5 animated fadeInUp">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id_product}>
                      <td>{product.id_product}</td>
                      <td>{product.name_product}</td> 
                      <td>{product.price_product}</td> 
                      <td>{product.quantity_product}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
