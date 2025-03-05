import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-900 to-black border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors duration-300">
              ElectionTracker
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to='#' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-blue-800">
              About Us
            </Link>
            <Link className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-blue-800">
              Contact Us
            </Link>
            <Link className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors duration-300">
              Live Results
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
