import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Authprovider";


const Navbar = () => {
    const {user, logOut}= useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then()
            .catch(error => console.log(error));

    }
    const navlink = <>
        <li><Link to='/' >Home</Link ></li>
        <li><Link to='/addTask' >Add Task</Link ></li>
        
        {
            user? <>
            
            <li><Link to='/viewTask' >View Task</Link ></li>
            <li><Link to='/login' onClick={handleLogout}>Log Out</Link></li>
            </> 
            : 
            <><li><Link to='/login' >Log In</Link ></li></>
        }

{
            user
            &&
            <div className="avatar online">
                <div className="w-10 rounded-full">
                    <img src={user.photoURL} title={user.displayName} alt="User avatar" />
                </div>
            </div>

        }

        {
            user ? null : <li><Link to='/signup' >Sign Up</Link ></li>
        }
    </>
    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlink}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">TaskManager</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlink}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;