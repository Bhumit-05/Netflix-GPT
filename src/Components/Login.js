import React, { useRef, useState } from 'react'
import Header from './Header';
import {  LOGIN_BG_URL } from '../utils/Constants';
import Validate from '../utils/Validate';
import {auth} from '../utils/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();;
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    }

    const handleButtonClick = () => {
        const msg = Validate(email.current.value, password.current.value);
        setErrorMessage(msg);
        if(msg) return;

        if(isSignUp){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name.current.value, photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-qTJp9xP_GujBm_L_IVIwT9hxpGHDeuhJQg&s"
                  })
                  .then(() => {
                    dispatch();
                  })
                  .catch((error) => {
                  });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ " " +errorMessage)
                // ..
            });
        }
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ " " +errorMessage)
            });
        }
    }

    const name= useRef(null);
    const email= useRef(null);
    const password= useRef(null);

    return (
    <div><Header/>
        <div className='absolute'>
            <img className='w-screen object-cover' src={LOGIN_BG_URL} alt="bg"></img>
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='bg-black absolute w-[400px] rounded-xl mx-auto right-0 left-0  mt-[200px] h-[500px] text-white pl-[50px] bg-opacity-80'>
            <h1 
            className='text-3xl mt-[50px] ml-[5px] mb-[20px]'>
                {isSignUp? "Sign Up" : "Sign In"}
            </h1>

            {isSignUp && (<input 
            type='text'
            ref={name} 
            placeholder='Full Name' 
            className='m-2 p-2 bg-gray-700 h-[50px] w-[280px] rounded-[4px]'>
            </input> )}

            <input 
            ref={email}
            type='text' 
            placeholder='Email Address' 
            className='m-2 p-2 bg-gray-700 h-[50px] w-[280px] rounded-[4px]'>   
            </input>

            <input 
            ref={password}
            type='password' 
            placeholder='Password' 
            className='m-2 p-2 bg-gray-700 h-[50px] w-[280px] rounded-[4px]'>
            </input>

            <p className='text-red-600 ml-[10px] text-lg py-1 '>{errorMessage}</p>

            <button 
            className='bg-custom-gold w-[280px] ml-[7px] h-11 rounded-[5px] m-2 p-2'
            onClick={handleButtonClick}>
                {isSignUp? "Sign Up" : "Sign In"}
            </button>

            <h1 
            className='py-6 px-2 cursor-pointer' 
            onClick={toggleSignUp}>
                {isSignUp? "Already a user? Sign In now." : "New to BingeBox? Sign Up now."}
            </h1>
        </form>
    </div>

  )
}

export default Login;