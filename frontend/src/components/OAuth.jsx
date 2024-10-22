import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase'
import {useDispatch , useSelector} from 'react-redux'
import { signInSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handelGoogleClick = async()=>{
        try {
            // create provider
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth , provider)
            const response = await fetch('/api/auth/google' ,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            } )

            const data = await response.json()
            console.log(data)
            dispatch(signInSuccess(data.data.user))
            if(data.success===true){
                navigate('/')
            }
        } catch (error) {
            console.log('Cannot signin with google' , error)
        }
    }



  return (
    <>
      <button type='button' onClick={handelGoogleClick} className='w-full hover:opacity-95 bg-red-600 text-white p-3 rounded-lg font-semibold text-xl'>Continue With Google</button>

   
   
    </>





  )
}

export default OAuth

