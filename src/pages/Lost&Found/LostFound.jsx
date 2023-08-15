import React, { useContext, useEffect, useState } from 'react';
import './LostFound.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarDays, faClock, faComment, faPaperPlane, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import AllDataDrawer from '../AllDataDrawer/AllDataDrawer';
import { AuthContext } from '../../Authprovider/Authprovider';
import FilteredDataDrawer from '../../FilteredDataDrawer/FilteredDataDrawer';
const LostFound = () => {
    const { user } = useContext(AuthContext);
    const [alldata, setAlldata] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeCategorypost, setactiveCategorypost] = useState('');
    const [comment, setComment] = useState([]);
    const [getcomment, setGetComment] = useState([]);
    const [claimedItems, setClaimedItems] = useState([]);
    const [search, setSearch] = useState('');

    // console.log('bb',activeCategorypost);
    const filteredCategory = alldata.filter(item =>
        (item.category === activeCategory || !activeCategory) &&
        (item.post === activeCategorypost || !activeCategorypost || (activeCategory && !activeCategorypost))
    );

    const uniquePosts = [...new Set(alldata.map(item => item.post))];
    // console.log(uniquePosts);




    useEffect(() => {
        fetch('http://localhost:5000/allLostandFound')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setAlldata(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // comments
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


    const handleComment = (item) => {
        fetch('http://localhost:5000/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                itemId: item?._id,
                posterEmail: item?.email,
                posterName: item?.ItemName,
                PosterImage: item?.image
            })
        })
            .then(res => res.json())
            .then(newData => {
                console.log(newData);
                if (newData.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added successfully",
                        timer: 1500,
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })
    }

    const handleCategorypost = (post) => {
        setactiveCategorypost(post)
    }

    const handleCategory = (category) => {
        setActiveCategory(category);
    }


    const handleClaim = (item) => {
        const newPoint = parseInt(item.point) + 1;
        fetch(`http://localhost:5000/Task/${item._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'Taken',
                point: newPoint
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const updatedItems = alldata.map(task => {
                        if (task._id === item._id) {
                            return { ...task, status: 'Taken', point: newPoint };
                        }
                        return task;
                    });

                    setAlldata(updatedItems);

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task added successfully",
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "status added successfully",
                        timer: 1500,
                    }).then(() => {
                        window.location.reload();
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        // searchar
        <div className=' '>
            <div className='bgLF'>

            </div>

            {/* category */}
            <div className=" container mx-auto">
                <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="mt-24 border-r-2">
                        <div className="flex flex-col justify-start">
                            <div className="relative p-6 w-full sm:max-w-md sm:mx-auto">
                                <div className="overflow-hidden z-0 rounded-full relative p-2">
                                    <form role="form" className="relative flex z-50 rounded-full">
                                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Enter your search here" className="rounded-full flex-1 px-4 py-2 text-gray-700 bg-slate-200  focus:outline-none" />
                                        <button className="bg-[#76965D] text-white rounded-full font-semibold px-6 py-2">Search</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        {/* Lost or Found */}
                        <h2 className="text-3xl text-[#76965D] text-center mb-10 pb-2 font-extrabold  border-t-2 border-b-2  border-slate-00">
                            Lost or Fornd!
                        </h2>
                        <ul>
                            {[...new Set(alldata.map(item => item.post))].map(post => (
                                <li key={post} className="mr-2 mb-2">
                                    <button
                                        onClick={() => handleCategorypost(post)}
                                        className={`px-4 py-2 uppercase rounded border ${activeCategorypost === post ? 'bg-[#76965D] text-white' : ' border border-sky-500 text-[#76965D]'
                                            }`}
                                    >
                                        {post}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* category */}
                        <h2 className="text-3xl text-[#76965D] text-center mb-10 pb-2 font-extrabold  border-t-2 border-b-2  border-slate-00">
                            Category
                        </h2>
                        <ul className="category-list flex flex-col">
                            {[...new Set(alldata.map(item => item.category))].map(category => (
                                <li key={category} className="mr-2 mb-2">
                                    <button
                                        onClick={() => handleCategory(category)}
                                        className={`px-4 py-2 rounded border ${activeCategory === category ? 'bg-[#76965D] text-white' : ' border border-sky-500 text-[#76965D]'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>


                    </div>

                    {
                        activeCategory === '' ?
                            <div className="col-span-2  grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
                                {alldata
                                    .filter((item) =>
                                        search.toLowerCase() === ''
                                            ? true
                                            : item.ItemName.toLowerCase().includes(search)
                                    )
                                    .map((item) => (
                                        <div key={item._id}>
                                            <div className="max-w-xl bg-white border border-gray-200 rounded-3xl">
                                                <div className=' flex justify-center'>
                                                    <img
                                                        className="rounded-lg w-auto h-60 "
                                                        src={item?.image}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="p-5">
                                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:">
                                                        {item?.ItemName}
                                                    </h5>

                                                    <div className=" font-normal flex mb-3  justify-between items-end">
                                                        <div>
                                                            <p className=' text-slate-400'>Location</p>
                                                            <h1><FontAwesomeIcon className=' text-yellow-500 mr-3' icon={faMapMarkerAlt} />{item.location}</h1>
                                                        </div>

                                                        {/* drawer */}
                                                        <AllDataDrawer item={item} getcomment={getcomment} user={user}></AllDataDrawer>
                                                    </div>

                                                    <div className="font-normal flex justify-between items-end">
                                                        <div>
                                                            <p className="text-slate-400">Post</p>
                                                            <h1>{item.post}</h1>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400">Status</p>
                                                            <h1>{item.status}</h1>
                                                        </div>
                                                    </div>
                                                    <div className=' flex justify-between items-center'>
                                                        <div className="dropdown dropdown-right dropdown-end">
                                                            <label tabIndex={0} className="btn m-1 bg-transparent border-none"><FontAwesomeIcon className=' text-violet-700 text-2xl' icon={faComment} /></label>
                                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                <textarea onChange={(e) => setComment(e.target.value)} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                                                                <button onClick={() => handleComment(item)} className='btn btn-circle btn-sm bg-transparent'><FontAwesomeIcon className=' text-yellow-500' icon={faPaperPlane} /></button>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h2><FontAwesomeIcon icon={faShareFromSquare} /></h2>
                                                        </div>
                                                        <div><button onClick={() => handleClaim(item)} className=' btn btn-sm btn-primary'>Claim</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            :

                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
                                {filteredCategory.filter((item) => {
                                    return search.toLowerCase() === '' ? item : item.ItemName.toLowerCase().includes(search)
                                }).map((item, index) => (
                                    <div key={item._id}>
                                        <div className="max-w-xl bg-white border border-gray-200 rounded-3xl">
                                            <div className=' flex justify-center'>
                                                <img
                                                    className="rounded-lg w-auto h-60 "
                                                    src={item?.image}
                                                    alt=""
                                                />
                                            </div>

                                            <div className="p-5">
                                                <a href="#">
                                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:">
                                                        {item?.ItemName}
                                                    </h5>
                                                </a>

                                                <div className=" font-normal flex  justify-between items-end">
                                                    <div>
                                                        <p className=' text-slate-400'>Location</p>
                                                        <h1><FontAwesomeIcon className=' text-yellow-500 mr-3' icon={faMapMarkerAlt} />{item.location}</h1>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor={`my-drawer-${item._id}`}
                                                            className="drawer-button btn btn-[#76965D] bg-[#76965D] btn-sm inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg "
                                                        >
                                                            Details

                                                        </label>
                                                        {/* drawer */}
                                                        <FilteredDataDrawer item={item}></FilteredDataDrawer>

                                                    </div>

                                                </div>
                                                <div className="font-normal flex justify-between items-end">
                                                    <div>
                                                        <p className="text-slate-400">Post</p>
                                                        <h1>{item.post}</h1>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-400">Status</p>
                                                        <h1>{item.status}</h1>
                                                    </div>
                                                </div>
                                                <div className=' flex justify-between items-center'>
                                                    <div className="dropdown dropdown-right dropdown-end">
                                                        <label tabIndex={0} className="btn m-1 bg-transparent border-none"><FontAwesomeIcon className=' text-violet-700 text-2xl' icon={faComment} /></label>
                                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <textarea onChange={(e) => setComment(e.target.value)} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                                                            <button onClick={() => handleComment(item)} className='btn btn-circle btn-sm bg-transparent'><FontAwesomeIcon className=' text-yellow-500' icon={faPaperPlane} /></button>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h2><FontAwesomeIcon icon={faShareFromSquare} /></h2>
                                                    </div>
                                                    <div><button onClick={() => handleClaim(item)} className=' btn btn-sm btn-primary'>Claim</button></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default LostFound;