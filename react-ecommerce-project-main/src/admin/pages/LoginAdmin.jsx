import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./../../contexts/AuthProvider";

const title = "Login Admin to Dashboard";
const btnText = "Login Now";

const LoginAdmin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { user, handleLoginAdmin } = useContext(AuthContext);

    const handleSuccess = () => {
        window.location.href = "/admin";
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(credentials);
        await handleLoginAdmin(credentials, handleSuccess);
        // Redirect or perform any other action after successful login
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const adminToken = localStorage.getItem('token');
        if (adminToken) {
            window.location.href = "/admin";
        }
    }, []);

  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title"> {title} </h3>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password *"
                  required
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="d-block lab-btn"
                >
                  <span> {btnText} </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
