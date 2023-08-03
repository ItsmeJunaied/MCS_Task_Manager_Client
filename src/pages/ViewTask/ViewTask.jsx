import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { Link} from "react-router-dom";

const ViewTask = () => {

    
    const { user, allTask, setAllTask } = useContext(AuthContext);
    // const [allTask, setAllTask] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/Task?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setAllTask(data))
            .catch(error => console.error(error));
    }, []);

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
                fetch(`http://localhost:5000/Task/${id}`, {
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
        fetch(`http://localhost:5000/Task/${id}`, {
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
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            allTask.map((item, index) => < tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item?.TaskName}</td>
                                <td>{item?.Date}</td>
                                <td>{item?.Time}</td>
                                <td>{item?.Description}</td>
                                <th>
                                    {item.status === 'confirm' ? (
                                        <span className="mr-3 text-amber-500 font-bold">Confirmed</span>
                                    ) : (
                                        <>
                                            {/* <span>Confirm</span> */}
                                            <button onClick={() => handleTaskStatusUpdate(item._id)} className="btn btn-sm btn-square btn-primary w-20">
                                                Confirm
                                            </button>
                                        </>
                                    )}
                                </th>



                                <td>
                                    <Link to={`/update/${item._id}`}><button onClick={() => handleUpdate(item._id)} className="btn btn-sm btn-square btn-primary w-20" disabled={item.status === 'confirm'}>
                                        Update
                                    </button></Link>
                                </td>                                
                                
                                <td><button onClick={() => handleDelete(item._id)} className="btn btn-circle btn-sm btn-error w-20">X</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTask;