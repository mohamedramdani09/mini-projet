import React, { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const title = "Login Admin to Dashboard";
const btnText = "Login Now";

const LoginAdmin = () => {


    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("ADMIN_TOKEN");
      if (token) {
        navigate("admin/");
      }
    }, [navigate]);
  
    const usernameRef = useRef();
    const passwordRef = useRef();
  
    const { handleLoginAdmin, loading } = useContext(AuthContext);
  
    const handleSuccess = () => {
      window.location.href = "/admin/";
    };
  
    const Submit = (e) => {
      e.preventDefault();
      const payload = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
      }
      handleLoginAdmin(payload, handleSuccess);
    };

  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title"> {title} </h3>
            <form className="account-form" onSubmit={Submit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={usernameRef}
                  placeholder="Username *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="Password *"
                  required
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="d-block lab-btn"
                  disabled={loading}
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
