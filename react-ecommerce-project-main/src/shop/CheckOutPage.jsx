import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckOutPage = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState("shipping");
    const [userDetails, setUserDetails] = useState({
        fullname: '',
        email: '',
        address: '',
        phoneNumber: '',
        paymentMethod: 'shipping'
    });

    const handleTabChange = (tabId) => setActiveTab(tabId);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleOrderConfirm = async () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart || cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            const response = await axios.post('http://your-backend-api.com/api/process-payment', {
                user_id: 1,
                method: userDetails.paymentMethod,
                items: cart
            });

            if (response.status === 201) {
                alert("Your Order is placed successfully!");
                localStorage.removeItem("cart");
                navigate(from, { replace: true });
            } else {
                alert("There was an error placing your order. Please try again.");
            }
        } catch (error) {
            console.error("There was an error placing your order:", error);
            alert("There was an error placing your order. Please try again.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='modalCard'>
            <Button variant='primary' className='py-2' onClick={handleShow}> Proceed to Checkout </Button>
            
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                className='modal fade'
                centered
            >
                <div className='modal-dialog'>
                    <h5 className='px-3 mb-3'> Select Your Payment Method </h5>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div className="tabs mt-3">
                                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                                    <li className='nav-item' role='presentation'> 
                                        <a className={`nav-link ${activeTab === "shipping" ? "active" : ""}`} 
                                            id='shipping-tab'
                                            data-toggle="tab"
                                            role='tab'
                                            aria-controls='shipping'
                                            aria-selected={activeTab === "shipping"}
                                            onClick={() => handleTabChange("shipping")}
                                            href="#shipping"> <img src="https://static.vecteezy.com/system/resources/previews/011/385/023/original/moving-truck-flat-icon-free-vector.jpg" alt="" width="80" /> </a> 
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade ${activeTab === "shipping" ? "show active" : ""}`}
                                        id='shipping-tab'
                                        role='tabpanel'
                                        aria-labelledby='shipping-tab'
                                    >
                                        <div className='mt-4 mx-4'>
                                            <div className='text-center'>
                                                <h5> Shipping Payment Info </h5>
                                            </div>
                                            <div className='form mt-3'>
                                                <div className='inputbox'>
                                                    <input type="text" name="fullname" className='form-control' value={userDetails.fullname} onChange={handleChange} required />
                                                    <span> Your Full Name </span>
                                                </div>
                                                <div className='inputbox'>
                                                    <input type="email" name="email" className='form-control' value={userDetails.email} onChange={handleChange} required />
                                                    <span> Enter your email </span>
                                                </div>
                                                <div className='inputbox'>
                                                    <input type="text" name="address" className='form-control' value={userDetails.address} onChange={handleChange} required />
                                                    <span> Your Address </span>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <div className="inputbox">
                                                        <input type="text" name="phoneNumber" className='form-control' value={userDetails.phoneNumber} onChange={handleChange} required />
                                                        <span> Your Phone Number </span>
                                                    </div>
                                                </div>
                                                <div className="px-5 pay">
                                                    <button className="btn btn-success btn-block" onClick={handleOrderConfirm}> Ship Now </button>
                                                </div>
                                            </div>
                                        </div>             
                                    </div>
                                </div>
                                <p className="mt-3 px-4 p-Disclaimer"> <em> Payment Disclaimer : </em> In no event shall payment or partial payment by Owner for any material or service </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CheckOutPage;
