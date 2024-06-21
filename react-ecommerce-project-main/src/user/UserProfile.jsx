import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';

function UserProfile() {
  const { user, handleLogout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="user-profile-container">
      <div className="user-info">
        <h2 className="text-center">Welcome to ShopCart!</h2>
        <p className="text-center">
          Your ultimate destination for men's fashion! <br />
          Explore our curated collection of stylish clothing and accessories designed to elevate your wardrobe. <br />
          Whether you are searching for timeless classics or the latest trends, we've got you covered.
        </p>
        <h2 className="text-center">User Profile</h2>
        <p className="text-center">These are your informations that you submitted</p>
        {user && (
          <div className="profile-details">
            <p>Name: {user.fullName}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Address: {user.address}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      <div className="user-menu">
        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={`icofont-navigation-menu ${showMenu ? 'open' : ''}`}></i>
        </div>
        {showMenu && (
          <div className="menu">
            <ul className="d-flex flex-column list-group">
              <li>
                <Link to="/user/cart-page" onClick={closeMenu}>
                  <i className="icofont-cart-alt"></i> Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/user/orders" onClick={closeMenu}>
                  <i className="icofont-shopping-cart"></i> Orders
                </Link>
              </li>
              <li>
                <Link to="/user/logout" onClick={() => { handleLogout(); closeMenu(); }}>
                  <i className="icofont-logout"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
