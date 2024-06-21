import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const title = "Login";
const socialTitle = "Login with Social Media";
const btnText = "Login Now";

const socialList = [
  { iconName: "icofont-facebook", siteLink: "#", className: "facebook" },
  { iconName: "icofont-twitter", siteLink: "#", className: "twitter" },
  { iconName: "icofont-linkedin", siteLink: "#", className: "linkedin" },
  { iconName: "icofont-instagram", siteLink: "#", className: "instagram" },
  { iconName: "icofont-pinterest", siteLink: "#", className: "pinterest" },
];

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { handleLogin, loading } = useContext(AuthContext);

  const handleSuccess = () => {
    window.location.href = "/";
  };

  const Submit = (e) => {
    e.preventDefault();
    const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
    }
    handleLogin(payload, handleSuccess);
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
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  placeholder="Email Address *"
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
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember"> Remember Me </label>
                  </div>
                  <Link to="/forgetpass"> Forget Password ? </Link>
                </div>
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

            {/* Account Buttom */}
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Do not have an Account ? <Link to="/sign-up"> Sign Up </Link>
              </span>
              <span className="or">
                <span> or </span>
              </span>

              {/* Social Login */}
              <h5 className="subtitle"> {socialTitle} </h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  {" "}
                  <button className="github">
                    {" "}
                    <i className="icofont-github"> </i>{" "}
                  </button>{" "}
                </li>
                <li>
                  {" "}
                  <a className="facebook">
                    {" "}
                    <i className="icofont-facebook"> </i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="twitter">
                    {" "}
                    <i className="icofont-twitter"> </i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="linkedin">
                    {" "}
                    <i className="icofont-linkedin"> </i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="instagram">
                    {" "}
                    <i className="icofont-instagram"> </i>{" "}
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
