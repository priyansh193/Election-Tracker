import React, { useState, useEffect } from 'react'

function Upcomming() {
  const [upcomingElections, setUpcomingElections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUpcomingElections = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upcommingElections`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch upcoming elections')
        }

        const data = await response.json()
        setUpcomingElections(data.data)
      } catch (error) {
        setError(error.message)
        console.error('Error fetching elections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingElections()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Elections</h1>
      
      {upcomingElections.length === 0 ? (
        <div className="text-center text-gray-500">No upcoming elections found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingElections.map((election, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                <div className="text-4xl text-center text-white mb-2">
                  {election.icon}
                </div>
                <h2 className="text-xl font-semibold text-white text-center">
                  {election.place.toUpperCase()}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">{election.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Seats</span>
                    <span className="font-semibold">{election.totalSeats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold">{election.category}</span>
                  </div>
                </div>

                <button 
                  className="mt-6 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors duration-300"
                  onClick={() => {/* Add notification or reminder logic */}}
                >
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Upcomming
