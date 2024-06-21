import React from 'react'
import { Link } from 'react-router-dom';

const title = "About ShopCart"; 
const desc = "ShopCart is a top-tier e-commerce platform specializing in men's fashion, offering a curated selection from renowned brands like Adidas, Nike, Armani, Hugo Boss, Ralph Lauren, and Tommy Hilfiger. Now, ShopCart aims to enhance the online shopping experience by launching an innovative website and user-friendly mobile app."; 
const ItemTitle = "Categories"; 
const quickTitle = "Quick Links"; 
const tweetTitle = "Recent Tweets";

const addressList = [ 
    { iconName: 'icofont-google-map', text: 'Ouled Fayet, Algiers, Algeria.', }, 
    { iconName: 'icofont-phone', text: '+213 723 456 789', }, 
    { iconName: 'icofont-envelope', text: 'info@shopcart.com', }, 
]

const socialList = [ 
    { iconName: 'icofont-facebook', siteLink: '#', className: 'facebook', }, 
    { iconName: 'icofont-twitter', siteLink: '#', className: 'twitter', }, 
    { iconName: 'icofont-linkedin', siteLink: '#', className: 'linkedin', }, 
    { iconName: 'icofont-instagram', siteLink: '#', className: 'instagram', }, 
    { iconName: 'icofont-pinterest', siteLink: '#', className: 'pinterest', }, 
]

const ItemList = [ 
    { text: 'All Products', link: '/shop', }, 
    { text: 'Shop', link: '/shop', }, 
    { text: 'Blog', link: '/blog', }, 
    { text: 'About', link: '/about', }, 
    { text: 'Policy', link: '#', }, 
    { text: 'FAQs', link: '/about', } 
]

const quickList = [ 
    { text: 'Summer Sessions', link: '#', }, 
    { text: 'Events', link: '#', }, 
    { text: 'Gallery', link: '#', }, 
    { text: 'Forums', link: '#', }, 
    { text: 'Privacy Policy', link: '#', }, 
    { text: 'Terms of Use', link: '#', }, ]

const tweetList = [ 
    { 
        iconName: 'icofont-twitter', 
        desc: '@CasbahExplorer "Kudos to @ShopCart for their commitment to customer satisfaction. Their seamless online shopping experience and top-notch product range keep me coming back for more! #ShopSmart"', 
    }, 
    { 
        iconName: 'icofont-twitter', 
        desc: ' @KabyleNomad "Just received my latest order from @ShopCart and I couldnt be happier! Fast shipping, excellent quality, and fantastic customer service. #HappyCustomer"', 
    }, 
]

const footerbottomList = [ 
    { text: 'ShopCart', link: '#', }, 
    { text: 'Staff', link: '#', }, 
    { text: 'Google Map', link: '#', }, 
    { text: 'Alumni', link: '#', }, 
]

const Footer = () => {
  return (
    <footer className="style-2">
        <div className="footer-top dark-view padding-tb">
            <div className="container">
                <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
        {/* Footer Top - La partie noire du Footer */}
                    {/* About ShopCart + Icons Section */}
                    <div className="col">
                        <div className="footer-item our-address">
                            <div className="footer-inner">
                                <div className="footer-content">
                                    <div className="title">
                                        <h4>  {title}  </h4>
                                    </div>
                                    <div className="content">
                                        <p> {desc} </p>
                                        <ul className="lab-ul office-address">
                                            {
                                                addressList.map((val, i) => (
                                                    <li key={i}>
                                                        <i className={val.iconName}> {val.text} </i>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <ul className="lab-ul social-icons">
                                            {
                                                socialList.map((val, i) => (
                                                    <li key={i}>
                                                        <a href="#" className={val.className}> <i className={val.iconName}> {val.text} </i> </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Section */}                            
                    <div className="col">
                        <div className="footer-item our-address">
                            <div className="footer-inner">
                                <div className="footer-content">
                                    <div className="title">
                                        <h4>  {ItemTitle}  </h4>
                                    </div>
                                    <div className="content">
                                        <ul className="lab-ul office-address">
                                            {
                                                ItemList.map((val, i) => (
                                                    <li key={i}>
                                                        <a href="#"> {val.text} </a>
                                                    </li>
                                                ))
                                            }
                                        </ul> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Links Section */}
                    <div className="col">
                        <div className="footer-item our-address">
                            <div className="footer-inner">
                                <div className="footer-content">
                                    <div className="title">
                                        <h4>  {quickTitle}  </h4>
                                    </div>
                                    <div className="content">
                                        <ul className="lab-ul office-address">
                                            {
                                                quickList.map((val, i) => (
                                                    <li key={i}>
                                                        <a href="#"> {val.text} </a>
                                                    </li>
                                                ))
                                            }
                                        </ul> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recent Tweets Section */}
                    <div className="col">
                        <div className="footer-item our-address">
                            <div className="footer-inner">
                                <div className="footer-content">
                                    <div className="title">
                                        <h4>  {tweetTitle}  </h4>
                                    </div>
                                    <div className="content">
                                        <ul className="lab-ul office-address">
                                            {
                                                tweetList.map((val, i) => (
                                                    <li key={i}>
                                                        <i className={val.iconName}></i>
                                                        {val.desc}
                                                    </li>
                                                ))
                                            }
                                        </ul> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>                                     

                </div>
            </div>
        </div>

        {/* Footer Bottom - la partie blanche du footer */}
        <div className="footer-bottom">
            <div className="container">
                <div className="section-wrapper">
                    <p> &copy; 2024 <Link to="/"> Shop Cart </Link> Designed by <a href="/" target="_blank"> Fellag M., Ramdani M., Ouahabi A. </a> </p>
                    <div className="footer-bottom-list">
                         {
                            footerbottomList.map((val, i) => (
                                <a href="#" key={i}> {val.text} </a>
                            ))
                         }                       
                    </div>
                </div>                               
            </div>                                       
        </div>                                          

    </footer>
  )
}

export default Footer