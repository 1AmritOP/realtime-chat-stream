import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <nav className=' bg-gray-400 h-16 pl-2 pr-6'>
        <ul className='flex justify-between items-center'>
          <li>
            <Link to="/">
              <img src={logo} className="h-14" alt="img" />
            </Link>
          </li>
          <li></li>
          <li>
            <Link to="/login">
              <button className=' cursor-pointer px-4 py-1 bg-transparent border border-white rounded-2xl'>
                Join-Us
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header