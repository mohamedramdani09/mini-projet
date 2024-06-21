import React from 'react'
import PageHeader from '../components/PageHeader';

const subTitle = "About Our Brand"; 
const title = "ShopCart : Elevating Men's Fashion with Digital Innovation - Good Qualification Services And Better Expriences"; 
const desc = "ShopCart stands as a pinnacle in the realm of men's fashion, offering a meticulously curated selection of apparel from prestigious brands like Adidas, Nike, Armani, Hugo Boss, Ralph Lauren, and Tommy Hilfiger. With an unwavering commitment to excellence, ShopCart provides its clientele with an unparalleled shopping experience, seamlessly blending high-quality products with cutting-edge digital innovation. Their expansive warehouse ensures a diverse and ever-evolving inventory, catering to the diverse tastes and preferences of fashion-forward men. From stylish shirts and sophisticated suits to comfortable activewear and trendy accessories, ShopCart offers a comprehensive range of clothing options to suit every occasion and style. Embracing the digital age, ShopCart has embarked on a journey to enhance its services further, with the introduction of an innovative e-commerce website and a user-friendly mobile application. Through these digital platforms, ShopCart aims to elevate the shopping experience, offering convenience, accessibility, and style at the fingertips of its discerning customers. With ShopCart, men can not only stay ahead of the fashion curve but also indulge in a seamless and enjoyable shopping journey unlike any other.";

const year = "30+"; 
const expareance = "Years Of Experiences";

const aboutList = [ 
  { imgUrl: '/src/assets/images/about/icon/01.jpg', imgAlt: 'about icon rajibraj91 rajibraj', title: 'Skilled Instructors', desc: 'In our project, skilled instructors provide invaluable guidance, ensuring mastery of essential techniques and principles in mens fashion. With their expertise, learners gain a comprehensive understanding of style, fit, and trends, empowering them to curate their wardrobe with confidence. Through personalized instruction and hands-on experience, our skilled instructors elevate the learning process, nurturing the development of fashion-forward individuals.', }, 
  { imgUrl: '/src/assets/images/about/icon/02.jpg', imgAlt: 'about icon rajibraj91 rajibraj', title: '1st Position Nationally', desc: 'ShopCart dominates the mens fashion scene nationwide, offering a curated selection of top-tier brands and trendsetting styles. With a commitment to excellence and customer satisfaction, ShopCart has become the go-to choice for quality apparel and impeccable service, solidifying its position as the number one destination for mens fashion nationwide. From timeless classics to cutting-edge trends, ShopCart delivers style, quality, and service that sets the standard in the industry.', }, 
  { imgUrl: '/src/assets/images/about/icon/03.jpg', imgAlt: 'about icon rajibraj91 rajibraj', title: 'Online Style Academy Mastery', desc: '"Online Style Academy Mastery" encapsulates a transformative journey in mens fashion education, providing a comprehensive curriculum tailored for aspiring style enthusiasts. Through interactive modules and expert guidance, learners delve into the intricacies of design, fit, and trend analysis, honing their skills to become tastemakers in the fashion world. With a dynamic blend of theory and practical application, our program empowers students to unleash their creativity and cultivate a signature style that reflects their personality and preferences.', }, 
]

const About = () => {
  return (
    <div>
        <PageHeader title={"About our Brand"} curPage={"About"} />
        <div className='about-section style-3 padding-tb section-bg'>
          <div className="container">
            <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
              <div className='col'>
                <div className='about-left'>
                  <div className="about-thumb">
                    <img src="/src/assets/images/about/01.jpg" alt="" />
                  </div>
                  <div className='abs-thumb'>
                    <img src="/src/assets/images/about/02.jpg" alt="" />
                  </div>
                  <div className='about-left-content'>
                    <h3> {year} </h3>
                    <p> {expareance} </p>
                  </div>
                </div>
              </div>

              {/* 2eme Col */}
              <div className='col'>
                <div className="about-right">
                  <div className="section-header">
                    <span className='subtitle'> {subTitle} </span>
                    <h2 className='title'> {title} </h2>
                    <p> {desc} </p>
                  </div>

                  <div className='section-wrapper'>
                    <ul className='lab-ul'>
                      {
                        aboutList.map((val, i) => (
                          <li key={i}>
                            <div className='sr-left'>
                              <img src={val.imgUrl} alt="" />
                            </div>
                            <div className='sr-right'>
                              <h5> {val.title} </h5>
                              <p> {val.desc} </p>
                            </div>
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
  )
}

export default About