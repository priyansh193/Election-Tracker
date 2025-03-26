import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { UserContext } from '../context/UserContext'

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(UserContext)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('UserData')
    setUser(null)
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-900 to-black border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-auto py-4">
          {/* Logo Section */}
          <div className="flex items-center w-full sm:w-auto justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
              ElectionTracker
            </Link>
            
            {/* User Profile Dropdown - Mobile */}
            <div className="sm:hidden relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-300 hover:text-white focus:outline-none"
              >
                <FaUserCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-8 mt-4 sm:mt-0">
            <Link to="/about" className="hidden sm:block text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-800">
              About Us
            </Link>
            <Link to="/contact" className="hidden sm:block text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-800">
              Contact Us
            </Link>
            
            <Link to="/live" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto text-center">
              Live Polls
            </Link>

            <div className="hidden sm:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-300 hover:text-white focus:outline-none"
              >
                <FaUserCircle className="h-8 w-8" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
