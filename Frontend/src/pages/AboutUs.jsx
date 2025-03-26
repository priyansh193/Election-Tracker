import React from 'react'
import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About ElectionTracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted platform for election monitoring and analysis, 
            providing accurate and transparent electoral information.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Detailed Analysis
            </h3>
            <p className="text-gray-600">
              Track election results with our advanced analytics 
              dashboard, featuring updates and detailed statistical analysis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Voting System
            </h3>
            <p className="text-gray-600">
              Participate in polls with our secure and transparent voting system, 
              ensuring the integrity of every vote cast.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Data Privacy
            </h3>
            <p className="text-gray-600">
              Your privacy is our priority. We implement robust security measures 
              to protect user data and maintain confidentiality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Mobile Friendly
            </h3>
            <p className="text-gray-600">
              Access election information on any device with our responsive 
              platform designed for seamless mobile experience.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To provide transparent, accurate, and accessible election information 
              to empower voters and strengthen democratic processes through 
              technology and innovation.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Reach out to our team for support.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutUs