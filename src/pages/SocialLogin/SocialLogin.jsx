
import { useContext } from 'react';
import img from '../../../public/Screenshot_418.png'; 
import { AuthContext } from '../../Authprovider/Authprovider';
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const {googleSignIN}=useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const handleGooglesignIN=()=>{
        googleSignIN()
        .then(res=>{
            const loggeduser= res.user;
            console.log(loggeduser);
            const saveUser={name:loggeduser.displayName,email:loggeduser.email, role: 'User'}
            fetch('https://task-manager-server-itsmejunaied.vercel.app/users',{
                            method: 'POST',
                            headers:{
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(()=> {
                                navigate('/addTask');
                            })

        })
    }
    return (
        <div className=' flex justify-center align-center mb-10' >
            <button className='btn bg-transparent ' onClick={handleGooglesignIN}>
                <img src={img} alt="" />
            </button>
        </div>
    );
};

export default SocialLogin;