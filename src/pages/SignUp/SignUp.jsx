import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Authprovider/Authprovider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img from '../../../public/login2.png'
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const from = location.state?.from?.pathname || "/";
    const { createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {

            return;
        }
        const { name, email, password, photoURL } = data;
        createUser(email, password)
        .then((result) => {
            const loggedUser = result.user;
                
            updateUser(name, photoURL)
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'logged in',
                showConfirmButton: false,
                timer: 1500
              });
              
              navigate(from, { replace: true });
              reset();
            })
            .catch((error) => {
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className=" w-1/2">
                        <img src={img} style={{ width: '1000px', height: '600px' }} alt="" />
                    </div>

                    <div className=" w-1/2">
                        <h1 className="text-5xl font-bold mb-3 ml-3">Sign Up now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                            <div className="card-body">
                                {/* Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="email" className="input input-bordered" />
                                    {errors.name && <span className=" text-red-600">Name required</span>}
                                </div>
                                {/* photo url */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoURL" , { required: true })} placeholder="photo Url" className="input input-bordered" />
                                    {errors.photoURL && <span className=" text-red-600">URL required</span>}
                                </div>
                                {/* Email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="Name" className="input input-bordered" />
                                    {errors.email && <span className=" text-red-600">Email required</span>}
                                </div>
                                {/* password */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                                    })} name="password" placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <span className=" text-red-600">Password required</span>}
                                    {errors.password?.type === 'minLength' && <span className=" text-red-600">Must Be 6 characters</span>}
                                    {errors.password?.type === 'maxLength' && <span className=" text-red-600">Must Be 6 characters</span>}
                                    {errors.password?.type === 'maxLength' && <span className=" text-red-600">Must Be within 20 characters</span>}
                                    {errors.password?.type === 'pattern' && <span className=" text-red-600">Must Be one uppercase,lowercase,digit,special character  </span>}

                                </div>
                                {/* confirm password */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("confirmPassword", {
                                            required: true,
                                            validate: value => value === watch("password")
                                        })}
                                        name="confirmPassword"
                                        placeholder="confirm password"
                                        className="input input-bordered"
                                    />
                                    {errors.confirmPassword?.type === 'required' && <span className="text-red-600">Confirm password required</span>}
                                    {errors.confirmPassword?.type === 'validate' && <span className="text-red-600">Passwords must match</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="signUp" />
                                </div>
                            </div>
                            <p className=" mb-5 ml-7"><small> Already Have Account?<Link className="link link-primary" to={'/login'}>Log In</Link></small></p>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignUp;