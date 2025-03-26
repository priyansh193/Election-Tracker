import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid gap-8">
              {/* Email Contact */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Email Us</h2>
                <p className="text-gray-600">
                  For general inquiries: info@electiontracker.com<br />
                  For technical support: support@electiontracker.com
                </p>
              </div>

              {/* Phone Contact */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Call Us</h2>
                <p className="text-gray-600">
                  General Helpline: +91 123 456 7890<br />
                  Technical Support: +91 098 765 4321
                </p>
              </div>

              {/* Office Address */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Visit Us</h2>
                <p className="text-gray-600">
                  Election Tracker Headquarters<br />
                  123 Democracy Avenue<br />
                  New Delhi, 110001<br />
                  India
                </p>
              </div>

              {/* Business Hours */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Business Hours</h2>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-blue-50 p-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Connect With Us
            </h2>
            <p className="text-center text-gray-600">
              Follow us on social media for updates and announcements.<br />
              We typically respond to queries within 24 hours on business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact