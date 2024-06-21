/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Ratting from '../components/Ratting';

const ProductCards = ({ GridList }) => {

    const [products, setProducts] = useState([])


    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        await axios.get('http://127.0.0.1:8000/api/products/')
        .then(({ data }) => { 
            setProducts(data)
        })
    }

    return (
        <div className={`shop-product-wrap row justify-content-center ${GridList ? "grid" : "list"}`}>
            {
                products.length > 0 && (
                    products.map((row, key) => (
                        <div key={key} className='col-lg-4 col-md-6 col-12'>

                            <div className='product-item'>
                                {/* Product Images */}
                                <div className='product-thumb'>
                                    <div className='pro-thumb'>
                                        <img src={`src/assets/images/shop/${row.img_product}`} alt="image" />
                                    </div>

                                    {/* Product Images */}
                                    <div className='product-action-link'>
                                        <Link to={`/shop/${row.id_product}`}> <i className='icofont-eye'>  </i> </Link>
                                        <a href="#">
                                            <i className='icofont-heart'></i>
                                        </a>

                                        <Link to="/cart-page"> <i className='icofont-cart-alt'>  </i> </Link>
                                    </div>

                                </div>

                                {/* Product Images */}
                                <div className='product-content'>
                                    <h5>
                                        <Link to={`/shop/${row.id_product}`}> {row.name_product} </Link>
                                    </h5>
                                    <p className='productRating'>
                                        <Ratting />
                                    </p>
                                    {/* On peut ici modifier avec le dinnar (da) mais on a collecté des produits étrangers */}
                                    <h6> ${row.price_product} </h6>
                                </div>
                            </div>

                            {/* List Style */}
                            <div className='product-list-item'>
                                {/* Product Images */}
                                <div className='product-thumb'>
                                    <div className='pro-thumb'>
                                        <img src={`src/assets/images/shop/${row.img_product}`} alt="image" />
                                    </div>

                                    {/* Product Images */}
                                    <div className='product-action-link'>
                                        <Link to={`/shop/${row.id_product}`}> <i className='icofont-eye'>  </i> </Link>
                                        <a href="#">
                                            <i className='icofont-heart'></i>
                                        </a>

                                        <Link to="/cart-page"> <i className='icofont-cart-alt'>  </i> </Link>
                                    </div>

                                </div>

                                {/* Product Images */}
                                <div className='product-content'>
                                    <h5>
                                        <Link to={`/shop/${row.id_product}`}> {row.name_product} </Link>
                                    </h5>
                                    <p className='productRating'>
                                        <Ratting />
                                    </p>
                                    {/* On peut ici modifier avec le dinnar (da) mais on a collecté des produits étrangers */}
                                    <h6> ${row.price_product} </h6>
                                </div>

                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}
export default ProductCards