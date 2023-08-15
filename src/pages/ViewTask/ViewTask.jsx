import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ViewTask = () => {


    const { user, allTask, setAllTask } = useContext(AuthContext);
    // const [allTask, setAllTask] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://task-manager-server-itsmejunaied.vercel.app/Task?email=${user?.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllTask(data);
                } else {
                    console.error("Failed to fetch data:", response.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);

                setTimeout(fetchData, 3000);
            }
        };

        fetchData();
    }, [user?.email, setAllTask]);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://task-manager-server-itsmejunaied.vercel.app/Task/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            const restTask = allTask.filter(item => item._id !== id);
                            setAllTask(restTask);
                        }
                    })
            }
        })
    }

    const handleTaskStatusUpdate = (id) => {
        fetch(`https://task-manager-server-itsmejunaied.vercel.app/Task/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const nonChangedTask = allTask.filter(item => item._id !== id);
                    const updated = allTask.find(item => item._id === id);

                    updated.status = 'confirm'
                    const newUpdatedTask = [updated, ...nonChangedTask];
                    setAllTask(newUpdatedTask);
                }
            })

    }

    // const handleUpdate = id => {
    //     console.log(id);
    // }
    return (
        <div>
            <h2 className="text-center font-bold text-3xl text-teal-600 mt-20 mb-20"><span className=" text-amber-500 uppercase">{user?.displayName}</span> Your Tasks</h2>

            <div className="overflow-x-auto container mx-auto">


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-[#1F2937] dark:bg-gray-700 dark:text-gray-400">

                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Update
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allTask.map((item, index) => < tr key={item._id}
                                    className="bg-[#1F2937] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-32 p-4">
                                        <img src={item.image} alt="Apple Watch" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.ItemName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            {item?.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.Time}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.Date}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.Date}
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td> */}
                                    <td>
                                        <Link to={`/update/${item._id}`}><button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" disabled={item.status === 'confirm'}>
                                            Update
                                        </button></Link>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td> */}
                                    <td><button onClick={() => handleDelete(item._id)} className="btn btn-circle btn-sm btn-error w-20">X</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ViewTask;