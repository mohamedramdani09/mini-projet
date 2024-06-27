import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductDisplay from './ProductDisplay';
import Review from './Review';
import PopularPost from './PopularPost';
import Tags from './Tags';

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('There was an error fetching the product details!', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop / Single Product"} />

      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation]}
                            navigation={{
                              prevEl: '.pro-single-prev',
                              nextEl: '.pro-single-next',
                            }}
                            className="mySwiper"
                          >
                            <SwiperSlide key={product.id}>
                              <div className="single-thumb">
                                <img src={`/src/assets/images/shop/${product.img_product}`} />
                              </div>
                            </SwiperSlide>
                          </Swiper>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <ProductDisplay item={product} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside className="ps-lg-4">
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
