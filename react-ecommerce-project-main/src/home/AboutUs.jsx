  import React from 'react'
  import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

const subTitle = "Why Choose Us";
const title = "Shop Men's Clothing";
const desc = "Explore our extensive collection of men's clothing on our e-commerce website. With our user-friendly interface, you can browse, select, and purchase the latest fashion trends from the comfort of your own home. Just visit our website, create an account, and start shopping!";
const btnText = "Shop now";

const countList = [
{

iconName: 'icofont-users-alt-4',
count: '12600',
text: 'Happy Customers',
},
{
iconName: 'icofont-graduate-alt',
count: '30',
text: 'Stylish Products',
},
{
iconName: 'icofont-notification',
count: '100',
text: 'Rewards and Gift Cards',
},
]
  
  const AboutUs = () => {
    return (
      <div className="instructor-section style-2 padding-tb section-bg-ash">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3">
                        <div className="col">
                            {
                                countList.map((val, i) => (
                                    <div key={i} className="count-item">
                                        <div className="count-inner">
                                            <div className="count-icon">
                                                <i className={val.iconName}></i>
                                            </div>
                                            <div className="count-content">
                                                <h2>
                                                    <span className="count"> <CountUp end={val.count} /> </span>
                                                    <span> + </span>
                                                </h2>
                                                <p> {val.text} </p>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="col">
                            <div className="instructor-content">
                                <span className="subtitle"> {subTitle} </span>
                                <h2 className="title"> {title} </h2>
                                <p> {desc} </p>
                                <Link to="/shop" className="lab-btn"> {btnText} </Link>
                            </div>
                        </div>

                        <div className="col">
                            <div className="instructor-thumb">
                                <img src="/src/assets/images/instructor/01.png" alt="" />
                            </div>
                        </div>

                    </div> 
                </div>
            </div>
      </div>
    )
  }
  
  export default AboutUs