import { faComments, faPaperPlane, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const AdminComment = () => {
    const [getcomment, setGetComment] = useState([]);
    const [feedback, setFeedback] = useState([]);
    // console.log(getcomment)
    useEffect(() => {
        fetch('http://localhost:5000/comment')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setGetComment(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleFeedback = (item) => {
        fetch(`http://localhost:5000/comment/${item._id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feedback: feedback 
            })
        })
            .then(res => res.json())
            .then(newData => {
                console.log(newData);
                if (newData.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added successfully",
                        timer: 1500,
                    })
                }
            })
    }
    return (

        <div>


            <div className="overflow-x-auto container mx-auto">


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-[#1F2937] dark:bg-gray-700 dark:text-gray-400">

                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Comment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Feedback
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                getcomment.map((item, index) => < tr key={item._id}
                                    className="bg-[#1F2937] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-32 p-4">
                                        <img src={item.PosterImage} alt="Apple Watch" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.posterName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            {item?.posterEmail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item?.comment}
                                    </td>
                                    <td>
                                        <div className="dropdown dropdown-left dropdown-end">
                                            <label tabIndex={0} className="btn m-1 btn-sm btn-circle btn-primary "><FontAwesomeIcon icon={faComments} /></label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <textarea onChange={(e) => setFeedback(e.target.value)} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                                                <button onClick={() => handleFeedback(item)} className='btn btn-circle btn-sm bg-transparent'><FontAwesomeIcon className=' text-yellow-500' icon={faPaperPlane} /></button>

                                            </ul>

                                        </div>
                                    </td>

                                    {/* <td>
                                    <Link to={`/update/${item._id}`}><button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" disabled={item.status === 'confirm'}>
                                        Update
                                    </button></Link>
                                </td> */}
                                    {/* <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td> */}
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>


    );
};

export default AdminComment;