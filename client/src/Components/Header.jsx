import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/Logo.png'
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/UserSlice';
import socket from '../socket';



const Header = () => {
  const dispatch=useDispatch();
  const auth=getAuth(app);
  const user=useSelector(state=>state.user.user);
  // console.log(user.photoURL);

  const handleLogout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(logout());
      socket.disconnect();
      console.log("logged out");
      
    }).catch((error) => {
      // An error happened.
      console.log(error.message);
      
    })
  }

  return (
    <>
      <nav className=' bg-gray-400 h-16 pl-2 pr-6'>
        <ul className='flex justify-between items-center'>
          <li >
            <Link to="/">
              <img src={logo} className="h-14" alt="img" />
            </Link>
          </li>

          <li>
            {
              user ? (
                <div className='flex gap-4'>
                  <Link to="/profile">
                    {/* // display user image or name */}
                    <img src={user.photoURL} alt="img" className="h-10 rounded-3xl " />
                  </Link>
                  <button onClick={handleLogout} className=' cursor-pointer px-4 py-1 bg-transparent border border-white rounded-2xl'>Logout</button>
                </div>
              ) : (
                <Link to="/login">
                  <button className=' cursor-pointer px-4 py-1 bg-transparent border border-white rounded-2xl'>
                    Join-Us
                  </button>
                </Link>
              )
            }
            {/* <Link to="/login">
              <button className=' cursor-pointer px-4 py-1 bg-transparent border border-white rounded-2xl'>
                Join-Us
              </button>
            </Link> */}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header