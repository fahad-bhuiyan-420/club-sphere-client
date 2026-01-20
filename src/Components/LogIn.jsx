import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../hooks/useAxiosSecure';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdLock } from 'react-icons/md';

const LogIn = () => {
    const { signInUser, setUser, googleSignIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    const handleLogIn = (data) => {
        signInUser(data.email, data.password)
            .then((res) => {
                if (res.user) {
                    setUser(res.user);
                    const userInfo = {
                        name: res.user.displayName,
                        email: res.user.email,
                        photoURL: res.user.photoURL
                    };
                    axiosSecure.post('/users', userInfo);
                    navigate('/');
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Authentication Failed",
                    text: error.message,
                    confirmButtonColor: '#4f46e5',
                });
            });
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(res => {
                setUser(res.user);
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL
                };
                axiosSecure.post('/users', userInfo);
                navigate('/');
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            {/* Logo area */}
            <div className="mb-8 transform hover:scale-105 transition-transform">
                <Link to='/'><Logo /></Link>
            </div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="p-8 lg:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(handleLogIn)} className="space-y-5">
                        {/* Email Field */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Email Address</span>
                            </label>
                            <div className="relative">
                                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                <input 
                                    type="email" 
                                    {...register('email', { required: 'Email is required' })} 
                                    className={`input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl ${errors.email ? 'border-red-400' : ''}`} 
                                    placeholder="name@example.com" 
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Password</span>
                            </label>
                            <div className="relative">
                                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                <input 
                                    type="password" 
                                    {...register('password', { required: 'Password is required' })} 
                                    className={`input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl ${errors.password ? 'border-red-400' : ''}`} 
                                    placeholder="••••••••" 
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
                            
                            <div className="flex justify-end mt-2">
                                <Link to='/reset' className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button className="btn w-full bg-indigo-600 hover:bg-indigo-700 border-none text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-100 transition-all mt-2">
                            Sign In
                        </button>
                    </form>

                    <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-100"></span>
                        </div>
                        <span className="relative px-4 bg-white text-slate-400 text-sm uppercase tracking-widest font-medium">Or continue with</span>
                    </div>

                    <button 
                        onClick={handleGoogleLogIn} 
                        className="w-full btn bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
                    >
                        <FcGoogle className="text-2xl" />
                        Google Account
                    </button>

                    <p className="text-center text-slate-600 mt-8 text-sm">
                        Don't have an account? {' '}
                        <Link to='/register' className="text-indigo-600 font-bold hover:underline underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
            
            <p className="mt-8 text-slate-400 text-xs">
                &copy; {new Date().getFullYear()} ClubSphere. All rights reserved.
            </p>
        </div>
    );
};

export default LogIn;