import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_img_token;
const AddTask = () => {
    const { user } = useContext(AuthContext);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm()

    const onSubmit = (data) => {



        const fromData = new FormData();
        fromData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: fromData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { email, Name, ItemName,category, location, Date, Time, Description } = data;
                    const item = { email, Name,category, ItemName, image: imgURL, location, Date, Time, Description };
                    const newData = { ...item, post: 'lost', status: 'Not Taken' , point: parseInt(0)};
                    console.log(newData);
                    fetch('http://localhost:5000/Task', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newData)
                    })
                        .then(res => res.json())
                        .then(newData => {
                            console.log(newData);
                            if (newData.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Task added successfully",
                                    timer: 1500,
                                });
                                reset();
                            }
                        })
                }
            })




    }

    console.log(watch("example"))
    return (
        <div>
            <h2 className=" text-center font-bold text-3xl text-teal-600 mt-20"><span className=" text-yellow-500 uppercase">{user?.displayName}</span> Add Lost Item</h2>
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
                                    defaultValue={user.email} required readOnly
                                />
                            </div>
                            {/* Poster Name*/}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Your Name<span className=" text-red-700">*</span></label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="file-input file-input-bordered file-input-warning w-full text-center uppercase"
                                    {...register("Name", { required: true })} required value={user?.displayName}
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
                                    {...register("ItemName", { required: true })} required
                                />
                            </div>
                            {/* Lost Item Name*/}
                            <div className="w-full ">
                                <label className="block text-gray-700 font-bold mb-2">Category<span className=" text-red-700">*</span></label>
                                <select defaultValue={"Pick One"} {...register("category", { required: true })} className="select select-warning w-full">
                                    <option disabled selected>Pick one</option>
                                    <option>Electronics</option>
                                    <option>Clothing & Accessories</option>
                                    <option>Personal Items</option>
                                    <option>Home & Lifestyle</option>
                                    <option>Toys & Games</option>
                                    <option>Beauty & Cosmetics</option>
                                    <option>Sports & Outdoors</option>
                                    <option>Books & Stationery</option>
                                    <option>Others</option>
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
                                <input type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Sumbit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AddTask;