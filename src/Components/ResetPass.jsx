import React from 'react';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';
import { Link } from 'react-router';



const ResetPass = () => {

    const { resetPass } = useAuth();

    const handleReset = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        console.log(email)
        resetPass(email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    return (
        <div>

            <Link to='/'>
                <div className=' flex justify-center mt-10 '>
                    <Logo></Logo>
                </div>
            </Link>

            <div className='h-[100vh] my-20 '>
                <form onSubmit={handleReset} className="card-body w-90 flex  mx-auto bg-base-400">
                    <h1 className="text-4xl font-bold">Reset Password</h1>
                    <fieldset className="fieldset ">
                        <label className="label ">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />
                        <button className="btn btn-neutral mt-4 ">Reset Password</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;