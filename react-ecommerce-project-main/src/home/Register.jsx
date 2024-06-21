import React from 'react'
import { Link } from 'react-router-dom';

const subTitle ="save the day";
const title = (
    <h2 className='title'>  Join all Day Long Free Workshop for <b> Advance <span> Mastering </span> </b> on Sales </h2>
)

const desc = "Limited Time Offer ! Hurry Up";

const Register = () => {
  return (
    <section className='register-section padding-tb pb-0'>
        <div className='container'>
            <div className='row g-4 row-cols-lg-2 row-cols-1 align-items-center'>
                <div className='col'>
                    <div className='section-header'>
                        <span className='subtitle'>  {subTitle}  </span>
                        {title}
                        <p> {desc} </p>
                    </div>
                </div>

                <div className='col'>
                    <div className='section-wrapper'>
                        <h4> Register Now </h4>
                        <form className='register-form'>
                            <input type="text" name='name' placeholder='Username' className='reg-input' />
                            <input type="email" name='email' placeholder='Email' className='reg-input' />
                            <input type="number" name='number' placeholder='Phone' className='reg-input' />
                            <button type='submit' className='lab-btn'> <Link to="/sign-up"> Register Now </Link> </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register