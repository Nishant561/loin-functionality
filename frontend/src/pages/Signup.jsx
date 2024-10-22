import React from 'react'
import './../App.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import OAuth from '../components/OAuth'

function Signup() {
  const [signup , setSignup] = useState({})
  const [isloading , setIsLoading]= useState(false)
  const [err , setErr] = useState(false)
  const handelSignupChanges = (e)=>{
    setSignup((prev)=>({...prev ,[e.target.id]:e.target.value}))
  }

  const handelSignupSubmit =async(e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      setErr(false)
      const response = await fetch('/api/user/signup',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(signup)

      })
      const data = await response.json()
      if(data.success === true){
        setIsLoading(false)
        console.log(data.message)
      }else{
        setErr(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className='w-full  manage flex items-center justify-center '>
          <div className='w-[450px] shadow-2xl rounded-lg flex gap-5 flex-col px-[40px] py-[30px] border-2 border-black'>
              <h1 className='font-semibold text-3xl'>Sign-Up</h1>
              <form onSubmit={handelSignupSubmit} className='flex flex-col gap-5'>
                <input type='text' onChange={handelSignupChanges} id='username' className='w-[100%] text-xl px-3 rounded-lg placeholder:text-black bg-slate-200 py-2' placeholder='Username'  />
                <input type='email' onChange={handelSignupChanges} id='email'  className='w-[100%] text-xl px-3 rounded-lg placeholder:text-black bg-slate-200 py-2' placeholder='Email'  />
                <input type='password' onChange={handelSignupChanges} id='password'  className='w-[100%] text-xl px-3 rounded-lg placeholder:text-black bg-slate-200 py-2' placeholder='Password'  />
                
                <button disabled={isloading} type='submit' className='w-full text-white rounded-md text-2xl py-2 bg-gray-600'>{isloading? "Loading":"Sign Up"}</button>
                <OAuth/>
                <p>Already have an account? <Link className='text-blue-600' to={'/sigin'}>Sign-In</Link></p>
              
              
              {err && <p className='text-red-700'>Something Went Wrong!</p>}
              </form>
          
          </div>


      </div>
    </>
  )
}

export default Signup
