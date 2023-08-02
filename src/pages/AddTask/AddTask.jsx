import { useForm } from "react-hook-form";

const AddTask = () => {
    const {
        register,
        handleSubmit,
        watch,
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watch("example"))
    return (
        <div>
            <h2 className=" text-center font-bold text-3xl text-teal-600 mt-20">Add Your Task</h2>
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
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Task Name:</label>
                                <input
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("TaskName", { required: true })}
                                />
                            </div>
                            {/* <div className="flex mb-4 md:mb-0"> */}
                            <div className="w-full mr-2">
                                <label className="block text-gray-700 font-bold mb-2">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Date", { required: true })}
                                />
                            </div>
                            <div className="w-full ml-2">
                                <label className="block text-gray-700 font-bold mb-2">Time:</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Time", { required: true })}
                                />
                            </div>
                            {/* </div> */}
                            <div className="mb-4 col-span-2">
                                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    {...register("Description", { required: true })}
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

export default AddTask;