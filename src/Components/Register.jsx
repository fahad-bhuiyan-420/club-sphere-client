import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import Logo from './Logo';
import { AuthContext } from '../Provider/AuthContext';
import { updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdLock, MdPerson, MdLink } from 'react-icons/md';

const Register = () => {
    const { registerUser, setUser, googleSignIn } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const handleRegister = (data) => {
        const { email, name, password, photo } = data;
        const userInfo = { name: name, email: email, photoURL: photo };

        registerUser(email, password)
            .then((res) => {
                return updateProfile(res.user, {
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    setUser({
                        ...res.user,
                        displayName: name,
                        photoURL: photo
                    });
                    axiosInstance.post('/users', userInfo);
                    Swal.fire({
                        title: "Account Created!",
                        text: "Welcome to ClubSphere",
                        icon: "success",
                        confirmButtonColor: '#4f46e5',
                    });
                    navigate('/');
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message.includes(':') ? error.message.split(':')[1] : error.message,
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
                axiosInstance.post('/users', userInfo);
                navigate('/');
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 py-12">
            <div className="mb-8 transform hover:scale-105 transition-transform">
                <Link to='/'><Logo /></Link>
            </div>

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="p-8 lg:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
                        <p className="text-slate-500 mt-2">Join the community and start exploring clubs</p>
                    </div>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name Field */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold text-slate-700">Full Name</span>
                                </label>
                                <div className="relative">
                                    <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                    <input 
                                        type="text" 
                                        {...register('name', { required: 'Name is required' })} 
                                        className="input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Photo URL Field */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold text-slate-700">Photo URL</span>
                                </label>
                                <div className="relative">
                                    <MdLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                    <input 
                                        type="text" 
                                        {...register('photo', { required: 'Photo URL is required' })} 
                                        className="input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl" 
                                        placeholder="https://..." 
                                    />
                                </div>
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
                            </div>
                        </div>

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
                                    className="input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl" 
                                    placeholder="name@example.com" 
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
                                    {...register('password', { 
                                        required: 'Password required', 
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,?{}[\]()\-_=+|:;"'<>\/~`]).{6,}$/ 
                                    })} 
                                    className="input w-full pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all rounded-xl" 
                                    placeholder="••••••••" 
                                />
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-500 text-[10px] mt-1 leading-tight">
                                    Must include 6+ chars, uppercase, lowercase, number, and special character.
                                </p>
                            )}
                        </div>

                        <button className="btn w-full bg-indigo-600 hover:bg-indigo-700 border-none text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-100 transition-all mt-4">
                            Create Account
                        </button>
                    </form>

                    <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-100"></span>
                        </div>
                        <span className="relative px-4 bg-white text-slate-400 text-sm font-medium">Or register with</span>
                    </div>

                    <button 
                        onClick={handleGoogleLogIn} 
                        className="w-full btn bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
                    >
                        <FcGoogle className="text-2xl" />
                        Google Account
                    </button>

                    <p className="text-center text-slate-600 mt-8 text-sm">
                        Already have an account? {' '}
                        <Link to='/login' className="text-indigo-600 font-bold hover:underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;