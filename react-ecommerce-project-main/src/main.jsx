import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Admin from "./admin/Admin.jsx";
import "./index.css";
import "./admin/Admin.css";

import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home.jsx";
import Blog from "./blog/Blog.jsx";
import Shop from "./shop/Shop.jsx";
import SingleProduct from "./shop/SingleProduct.jsx";
import CartPage from "./shop/CartPage.jsx";
import SingleBlog from "./blog/SingleBlog.jsx";
import About from "./about/About.jsx";
import Contact from "./contactPage/Contact.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import UserLogout from "./user/UserLogout.jsx";
import UserProfile from "./user/UserProfile.jsx";
import UserCart from "./user/UserCart.jsx";
import UserOrders from "./user/UserOrders.jsx";

// Admin files import
import HomeAdmin from "./admin/pages/Home.jsx";
import Users from "./admin/pages/Users.jsx";
import Products from "./admin/pages/Products.jsx";
import Categories from "./admin/pages/Categories.jsx";
import Orders from "./admin/pages/Orders.jsx";
import LoginAdmin from "./admin/pages/LoginAdmin.jsx";
// import LogoutAdmin from './admin/pages/LogoutAdmin.jsx';
import PrivateRouteAdmin from "./PrivateRoute/PrivateRouteAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:id", element: <SingleBlog /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
              <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

      // Espace Utilisateur
      {
        path: "/user/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/cart",
        element: (
          <PrivateRoute>
            <UserCart />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/orders",
        element: (
          <PrivateRoute>
            <UserOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/logout",
        element: (
          <PrivateRoute>
            <UserLogout />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },

  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "", element: <HomeAdmin /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      // { path: 'products', element: <PrivateRouteAdmin>  <Products />  </PrivateRouteAdmin>},
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
      // { path: 'logout', element: <PrivateRouteAdmin> <LogoutAdmin/> </PrivateRouteAdmin>},
    ],
  },

  { path: "/admin/login", element: <LoginAdmin /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
