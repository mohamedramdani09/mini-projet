import React from 'react'
import { Link } from 'react-router-dom';

const title = "Most Popular Post";

const postList = [ 
    { id:1, imgUrl: '/src/assets/images/blog/10.jpg', imgAlt: 'rajibraj91', title: 'ShopCart', date: 'Jun 01,2024', }, 
    { id:2, imgUrl: '/src/assets/images/blog/11.jpg', imgAlt: 'rajibraj91', title: 'Ecommerce Field', date: 'May 20,2024', }, 
    { id:3, imgUrl: '/src/assets/images/blog/12.jpg', imgAlt: 'rajibraj91', title: 'Addidas', date: 'Jun 03,2024', }, 
    { id:4, imgUrl: '/src/assets/images/blog/09.jpg', imgAlt: 'rajibraj91', title: 'Tommy Hielfieger', date: 'Jun 05,2024', }, 
]

const PopularPost = () => {
  return (
    <div className='widget widget-post'>
        <div className='widget-header'>
            <h5 className='title'> {title} </h5>
        </div>

        <ul className='widget-wrapper'>
            {
                postList.map((blog, i) => (
                    <li key={i} className='d-flex flex-wrap justify-content-between'>
                        <div className='post-thumb'>
                            <Link to={`/blog/${blog.id}`}> <img src={blog.imgUrl} alt="" /> </Link>
                        </div>
                        <div className='post-content'>
                            <Link to={`/blog/${blog.id}`}> <h5> {blog.title} </h5> </Link>
                            <p> {blog.date} </p>
                        </div>
  
                    </li>
                ))
            }
        </ul>

    </div>
  )
}

export default PopularPost