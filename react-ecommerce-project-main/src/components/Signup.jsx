import React, { useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const title = "Register";
const socialTitle = "Login with Social Media";
const btnText = "Sign Up Now";


const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const { handleRegister, loading } = useContext(AuthContext);

    const nameRef = useRef();
    const phoneRef =  useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSuccess = () => {
        window.location.href = '/';
      };

    const Submit = (e) => {
        e.preventDefault();
        const payload = {
            fullName: nameRef.current.value,
            phoneNumber: phoneRef.current.value,
            address: addressRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        handleRegister(payload, handleSuccess);
    }

  return (
    <div className='login-section padding-tb section-bg'>
        <div className="container">
            <div className="account-wrapper">
                <h3 className='title'> {title} </h3>
                    <form className='account-form' onSubmit={Submit}>
                        <div className='form-group'>
                            <input type="text" name="fullName" id="fullName" ref={nameRef} placeholder='Full Name *' required/>
                        </div>
                        <div className='form-group'>
                            <input type="text" name="phoneNumber" id="phoneNumber" ref={phoneRef} placeholder='Phone Number *' required/>
                        </div>
                        <div className='form-group'>
                            <input type="text" name="address" id="address" ref={addressRef} placeholder='Address *' required/>
                        </div>
                        <div className='form-group'>
                            <input type="email" name="email" id="email" ref={emailRef} placeholder='Email Address *' required/>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" id="password" ref={passwordRef} placeholder='Password *' required/>
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='d-block lab-btn' disabled={loading}>
                                <span> {btnText} </span>
                            </button>
                        </div>
                    </form>

                    {/* Account Buttom */}
                    <div className='account-bottom'>
                        <span className='d-block cate pt-10'>
                            Do you have an Account already ? <Link to="/login"> Login </Link>
                        </span>
                        <span className='or'>
                            <span> or </span>
                        </span>

                        {/* Social Login */}
                        <h5 className='subtitle'> {socialTitle} </h5>
                        <ul className='lab-ul social-icons justify-content-center'>
                            <li> <button className='github'> <i className='icofont-github'> </i> </button> </li>
                            <li> <a className='facebook'> <i className='icofont-facebook'> </i> </a> </li>
                            <li> <a className='twitter'> <i className='icofont-twitter'> </i> </a> </li>
                            <li> <a className='linkedin'> <i className='icofont-linkedin'> </i> </a> </li>
                            <li> <a className='instagram'> <i className='icofont-instagram'> </i> </a> </li>
                        </ul>
                    </div>

            </div>
        </div>
    </div>
  );
};

export default Signup;
