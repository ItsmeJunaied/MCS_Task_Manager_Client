import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authprovider/Authprovider';
import { Link, NavLink, Outlet } from 'react-router-dom';
import ViewTask from '../ViewTask/ViewTask';

const DashBoard = () => {

    const { user, logOut, allTask, setAllTask } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState([]);

    const filterUser = loggedUser.find(item => item?.email === user?.email);
    // console.log(filterUser.email)
    // console.log(user.email)

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setLoggedUser(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogout = () => {
        logOut()
            .then()
            .catch(error => console.log(error));

    }
    const navlink = <>
        {
            user
            &&

            <div className="avatar indicator">

                <div className="w-32 ml-24 mt-24 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} />
                    <h3 className=' text-white text-center uppercase font-serif font-bold text-2xl'>{user?.displayName} </h3>

                </div>
            </div>

        }
        <li><NavLink to='/' >Home</NavLink  ></li>

        {user && filterUser && filterUser.role === "User" ? (
            <div className='indicator'>
                <span className="indicator-item badge badge-primary">{allTask.length}</span>
                <li><NavLink to='/dashboard/viewTask'>My Post</NavLink></li>
            </div>
        ) : (
            <li><NavLink to='/dashboard/feedback'>Comments</NavLink></li>
        )}



    </>
    return (
        <div className="drawer lg:drawer-open bg-[#000000]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu text-white p-4 w-80 h-full bg-[#181818]">
                    {navlink}
                    <div className=' flex flex-col justify-end '>
                        <div className="divider"></div>
                        <li><Link to='/' >Home</Link ></li>
                        <li><Link to='/alldata' >Lost & Found</Link ></li>
                        <li>
                            <details style={{ position: 'relative', zIndex: '100' }}>
                                <summary>Post</summary>
                                <ul className="p-2" style={{ position: 'absolute', zIndex: '100', backgroundColor: 'white' }}>
                                    <li className=" text-black"><Link to='/addTask' >Lost Item</Link></li>
                                    <li className=" text-black"><Link to='/foundItem' >Found Item</Link></li>
                                </ul>
                            </details>
                        </li>
                    </div>
                </ul>

            </div>

        </div>
    );
};

export default DashBoard;