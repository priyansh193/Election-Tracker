import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function AddUpcommingElection() {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useContext(UserContext)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        place: '',
        date: '',
        totalSeats: '',
        category: ''
    })

    // Protect route for admin only
    useEffect(() => {
        if (!isLoggedIn || user?.username !== import.meta.env.VITE_ADMIN_USERNAME) {
            navigate('/')
        }
    }, [isLoggedIn, user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        
        try {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                throw new Error('No access token found')
            }

            const response = await fetch('http://localhost:5001/api/upcommingElections/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            })
    
            if (!response.ok) {
                const text = await response.text()
                throw new Error(`Error: ${response.status} - ${text}`)
            }
    
            const data = await response.json()
            navigate('/upcomming')
        } catch (error) {
            setError(error.message)
            console.error("Error adding election:", error)
            
            // Handle unauthorized access
            if (error.message.includes('401')) {
                navigate('/login')
            }
        }
    }
    
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Upcoming Election</h2>
            
            {error && (
                <div className="max-w-lg mx-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Place Name
                        </label>
                        <input
                            type="text"
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Election Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Seats
                        </label>
                        <input
                            type="number"
                            name="totalSeats"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Election Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="State Assembly">State Assembly</option>
                            <option value="Lok Sabha">Lok Sabha</option>
                            <option value="By-Election">By-Election</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
                    >
                        Add Election
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/upcoming')}
                        className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUpcommingElection
