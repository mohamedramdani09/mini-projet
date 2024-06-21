import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../contexts/AuthProvider";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const { handleLogout } = useContext(AuthContext);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    // Optionally, render a loading state while checking auth status
    return <div>Loading...</div>;
  }

  const onLogout =  (ev) =>{
    ev.preventDefault();
    handleLogout();
   
}

  return (
    <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
      {/* Header Top Start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : "empty"}`}>
        <div className='container'>
          <div className='header-top-area'>
            {!user ? (
              <>
                <Link to="/sign-up" className='lab-btn me-3'> <span> Create Account </span> </Link>
                <Link to="/login"> Log in </Link>
              </>
            ) : (
              <>
                <Link to="/account" className='lab-btn me-3 d-none d-md-block'> <span> My Account </span> </Link>
                <Link to="#" onClick={onLogout} className='lab-btn me-3 d-none d-md-block'> Logout </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Header Bottom */}
      <div className='header-bottom'>
        <div className='container'>
          <div className='header-wrapper'>
            {/* Logo */}
            <div className='logo-search-acte'>
              <div className='logo'>
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>

            {/* Menu Area */}
            <div className='menu-area'>
              <div className='menu'>
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li> <Link to="/"> Home </Link> </li>
                  <li> <Link to="/shop"> Shop </Link> </li>
                  <li> <Link to="/blog"> Blog </Link> </li>
                  <li> <Link to="/about"> About </Link> </li>
                  <li> <Link to="/cart-page"> Cart </Link> </li>
                  <li> <Link to="/contact"> Contact </Link> </li>
                  {!user ? (
                <>
                  <li>
                    <Link to="/sign-up" className='lab-btn me-3 d-none d-md-block'> Create Account </Link>
                  </li>
                  <li>
                    <Link to="/login" className='d-none d-md-block'> Log In </Link>
                  </li>
                </>
              ) : (
                <>
                <li>
                  <Link to="/account" className='lab-btn me-3 '> <span> My Account </span> </Link>
                </li>
                <li>
                  <Link to="#" onClick={onLogout} className='lab-btn me-3'> Logout </Link>
                </li>
                </>
              )}
                </ul>
                
              </div>

              {/* Sign In & Log In */}
              

              {/* Menu toggler */}
              <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavItems;
