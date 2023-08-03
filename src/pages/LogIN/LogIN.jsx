import {  useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import img from '../../../public/login2.png'
import { AuthContext } from "../../Authprovider/Authprovider";
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIN = () => {

    const [show, setShow] = useState(false);
    const { user, signIN , googleSignIN} = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const { handleSubmit, register, formState: { errors } } = useForm();
    const from = location.state?.from?.pathname || "/";


    const handleLogin = handleSubmit((data) => {
    const email = data.email;
    const password = data.password;
    signIN(email, password)
            .then(result => {
                const user = result.user;
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
              })
              .catch(error => {
                setError(error.message); 
              });
    });
    return (
        <div className="bg-base-200">
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col  lg:flex-row-reverse">
                    <div className="md:w-1/2 lg:text-left">
                        <img className="ml-16 mt-16" style={{ width: '700px', height: '600px' }} src={img} alt="" />
                    </div>
                    {/* Login form */}
                    <div className="md:w-1/2">
                        <h1 className="text-5xl font-bold ml-16 mb-10">Login now!</h1>
                        <form onSubmit={handleLogin} className="card max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                {/* email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" {...register('email', { required: true })} />
                                    {errors.email && <span className="error-message">Email is required</span>}
                                </div>
                                {/* password */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <p className="absolute mt-14 ml-72" onClick={() => setShow(!show)}>
                                        <small>
                                            {show ? <span className="text-5xl font-bold">𓁹</span> : <span className=" text-5xl font-bold">𓁹</span>}
                                        </small>
                                    </p>
                                    <input type={show ? "text" : "password"} name="password" placeholder="password" className="relative input input-bordered" {...register('password', { required: true })} />
                                    <p className=" text-red-800">{error}</p>
                                    
                                    {errors.password && <span className="error-message">Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="login" />
                                </div>
                            </div>
                            <div>
                                <p className=" text-center mb-10"><small>New Here? <Link className="link link-primary" to={'/signup'}>Create an Account</Link></small></p>
                                {/* Social LOgIN */}
                                <SocialLogin/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIN;