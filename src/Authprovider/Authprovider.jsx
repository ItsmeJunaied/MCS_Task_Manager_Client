import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const googleProvider= new GoogleAuthProvider();
    const [allTask, setAllTask] = useState([]);
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)

    }
    const signIN=(email,password,user)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleSignIN =()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUser=(name,photoURL)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          
          });
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,loggeduser=>{
            console.log('log inned')
            setUser(loggeduser);
            setLoading(false);
        })
        return()=>{
            unsubscribe();
        }
    },[])
    
    const authInfo={
        user,
        createUser,
        signIN,
        logOut,
        loading,
        updateUser,
        allTask, 
        setAllTask,
        googleSignIN 
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;