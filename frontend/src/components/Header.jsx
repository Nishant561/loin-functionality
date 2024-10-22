import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Header() {
  const {currentUser} = useSelector(state=> state.user)
  return (
    <>
      <div className='w-screen h-[78px] bg-slate-400'>
        <div className="max-w-[1200px] mx-auto py-4 flex items-center justify-between">
        <div className="logo">
                    <Link to={'/'} ><h1 className='font-bold text-4xl'>Auth</h1></Link>
                </div>
                <div className="links-container flex items-center gap-6">
                    <Link to={'/'} className='font-semibold text-zinc-800 text-xl'>Home</Link>
                    <Link to={'/about'} className='font-semibold text-zinc-800 text-xl'>About</Link>
                    <div>
                      {
                        currentUser? (<Link to={'/profile'} className='font-semibold text-zinc-800 text-xl'>
                    
                          <img src={currentUser.profilePicture} className='w-10 h-10 object-cover object-center rounded-full' alt='profile-pic' />
                          </Link>):(<Link to={'/signin'} className='font-semibold text-zinc-800 text-xl'>
                      
                          Sign In
                          </Link>)
                      }
                    </div>
                    
                    
                    
                </div>
        </div>
                
      </div>
    </>
  )
}

export default Header
