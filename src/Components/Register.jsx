import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import Logo from './Logo';
import { AuthContext } from '../Provider/AuthContext';
import { updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
    const { registerUser, setUser,  googleSignIn } = use(AuthContext)
    const { register, handleSubmit,  formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const handleRegister = (data) => {
        const { email, name, password, photo } = data
        const userInfo = { name: name, email: email, photoURL: photo }

        registerUser(email, password)
            .then((res) => {
                return updateProfile(res.user, {
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    // Update React state after profile update
                    setUser({
                        ...res.user,
                        displayName: name,
                        photoURL: photo
                    });
                    axiosInstance.post('/users', userInfo)
                    Swal.fire({
                        title: "User Registered",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/')
                });

            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message.split(':')[1],
                });
            });
    }

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user)
                setUser(res.user)
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL
                }
                axiosInstance.post('/users', userInfo)
                navigate('/')
                
            })
    }

    // console.log(user)

    return (
        <div className='max-w-7xl mx-auto flex flex-col items-center '>
            <Link to='/'><Logo></Logo></Link>

            <div className='my-10 bg-base-300 p-10 rounded-2xl'>
                <h2 className='text-3xl font-bold text-center'>Register Page</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <fieldset className="fieldset">
                        {/* name */}
                        <label className="label">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                        {/* photo */}
                        <label className="label">Photo</label>
                        <input type="text" {...register('photo', { required: true })} className="input input-neutral" placeholder='Your Photo' />
                        {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,?{}[\]()\-_=+|:;"'<>\/~`]).{6,}$/ })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password required</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have 1 capital letter, 1 small letter and 1, 1 special charachter and a length of minimum 6 chars?</p>
                        }
                        <div><Link to='/login' className="link link-hover">Already have an account? <span className='text-blue-500'>login</span></Link></div>



                        <button className="btn btn-neutral mt-4 ">Register</button>
                    </fieldset>

                </form>

                <button onClick={handleGoogleLogIn} className="mt-2 w-full btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>

            <div className='flex'>
                <div className='flex-'>

                </div>
            </div>
        </div>


    );
};

export default Register;