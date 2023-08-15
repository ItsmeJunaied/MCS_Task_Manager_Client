import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/Authprovider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";

const img_hosting_token = import.meta.env.VITE_img_token;
const UpdatePage = () => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    
        const fromData = new FormData();
        fromData.append('image', data.image[0]);
    
        fetch(img_hosting_url, {
            method: 'POST',
            body: fromData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;
    
                const updatedFields = {
                    ItemName: data.ItemName,
                    category: data.category,
                    location: data.location,
                    Date: data.Date,
                    Time: data.Time,
                    Description: data.Description,
                    image: imgURL, // Add the uploaded image URL
                };
    
                fetch(`http://localhost:5000/update/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedFields),
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Updated',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        reset();
                        navigate("/");
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href="">Why do I have this issue?</a>',
                        });
                    }
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    


    return (
        <div>
            <h2 className=" text-center font-bold text-3xl text-teal-600 mt-20"><span className=" text-yellow-500 uppercase">{user?.displayName}</span> Update Item</h2>
            <div>
                <div className="bg-white border border-sky-900">
                    <div className="container mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-sky-900 mt-20 mb-20">
                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email<span className=" text-red-700">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className=" file-input file-input-bordered file-input-warning w-full text-center"
                                    {...register("email", { required: true })}
                                    defaultValue={user?.email} required readOnly
                                />
                            </div>
                            {/* Poster Name*/}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="file-input file-input-bordered file-input-warning w-full text-center uppercase"
                                    {...register("Name", { required: true })} required defaultValue={user?.displayName} readOnly
                                />
                            </div>
                            {/* Item Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Item Name<span className=" text-red-700">*</span></label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="file-input file-input-bordered file-input-warning w-full text-center"
                                    {...register("ItemName", { required: true })} 
                                />
                            </div>
                            {/* Lost Item Name*/}
                            <div className="w-full ">
                                <label className="block text-gray-700 font-bold mb-2">Category<span className=" text-red-700">*</span></label>
                                <select {...register("category", { required: true })} className="select select-warning w-full">
                                    <option value="" disabled>
                                        Pick one
                                    </option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing & Accessories">Clothing & Accessories</option>
                                    <option value="Personal Items">Personal Items</option>
                                    <option value="Home & Lifestyle">Home & Lifestyle</option>
                                    <option value="Toys & Games">Toys & Games</option>
                                    <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                                    <option value="Books & Stationery">Books & Stationery</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>
                            {/* Image */}
                            <div className="mb-4  ">
                                <label className="block text-gray-700 font-bold mb-2">Lost Item Name<span className=" text-red-700">*</span></label>
                                <input type="file" className="file-input file-input-bordered file-input-warning w-full "
                                    {...register('image', { required: true })} 
                                />
                            </div>
                            {/* Location */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Location<span className=" text-red-700">*</span></label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="file-input file-input-bordered file-input-warning w-full text-center"
                                    {...register("location", { required: true })} required 
                                />
                            </div>
                            {/* DATE*/}
                            <div className="w-full mr-2">
                                <label className="block text-gray-700 font-bold mb-2">Date<span className=" text-red-700">*</span></label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="file-input file-input-bordered file-input-warning w-full text-center"
                                    {...register("Date", { required: true })} required 
                                />
                            </div>
                            {/* Time */}
                            <div className="w-full ml-2">
                                <label className="block text-gray-700 font-bold mb-2">Time<span className=" text-red-700">*</span></label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="file-input file-input-bordered file-input-warning w-full text-center"
                                    {...register("Time", { required: true })} required 
                                />
                            </div>
                            {/* Description */}
                            <div className="mb-4 col-span-2">
                                <label className="block text-gray-700 font-bold mb-2">Description<span className=" text-red-700">*</span></label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className="textarea textarea-warning w-full text-center"
                                    {...register("Description", { required: true })} required 
                                ></textarea>
                            </div>
                            <div className="flex justify-center items-center align-middle col-span-2">
                                <input type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UpdatePage;