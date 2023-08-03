import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/Authprovider";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm()

    const onSubmit = (data) => {
        const { email, TaskName, Date, Time, Description } = data;
        const newData = { ...data, status: 'Pending' };



        console.log(newData);
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
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

                    // Navigate("/viewTask");
                    navigate("/viewTask");
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>',
                    });
                }
            });
    };
    return (
        <div>
            <h2 className=" text-center font-bold text-3xl text-teal-600 mt-20 mb-20">{user.displayName} Update Task</h2>
            <div>
                <div className="bg-white border border-gradient p-8 rounded-lg">
                    <div className="container mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-gradient">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("email", { required: true })}
                                    defaultValue={user.email} readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Task Name <span className=" text-red-700">*</span></label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("TaskName", { required: true })} defaultValue={user.TaskName} required
                                />
                            </div>
                            {/* <div className="flex mb-4 md:mb-0"> */}
                            <div className="w-full mr-2">
                                <label className="block text-gray-700 font-bold mb-2">Date<span className=" text-red-700">*</span></label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Date", { required: true })} defaultValue={user.Date} required
                                />
                            </div>
                            <div className="w-full ml-2">
                                <label className="block text-gray-700 font-bold mb-2">Time<span className=" text-red-700">*</span></label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Time", { required: true })} defaultValue={user.Time} required
                                />
                            </div>
                            {/* </div> */}
                            <div className="mb-4 col-span-2">
                                <label className="block text-gray-700 font-bold mb-2">Description<span className=" text-red-700">*</span></label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Description", { required: true })} defaultValue={user.Description} required
                                ></textarea>
                            </div>
                            <div className="flex justify-center">
                                <input type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Sumbit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UpdatePage;