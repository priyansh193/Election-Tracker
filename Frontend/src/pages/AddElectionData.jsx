import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function AddElectionData() {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useContext(UserContext)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        place: '',
        year: '',
        totalSeats: '',
        majorityMark: '',
        votingPercentage: '',
        parties: [
            {
                name: '',
                seatsWon: '',
                voteShare: '',
                color: '#000000'
            }
        ]
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

    const handlePartyChange = (index, e) => {
        const { name, value } = e.target
        setFormData(prev => {
            const parties = [...prev.parties]
            parties[index] = {
                ...parties[index],
                [name]: value
            }
            return { ...prev, parties }
        })
    }

    const addParty = () => {
        setFormData(prev => ({
            ...prev,
            parties: [...prev.parties, { name: '', seatsWon: '', voteShare: '', color: '#000000' }]
        }))
    }

    const removeParty = (index) => {
        setFormData(prev => ({
            ...prev,
            parties: prev.parties.filter((_, i) => i !== index)
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

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/elections/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                const errorData = await response.text()
                throw new Error(errorData || 'Failed to add election data')
            }

            const data = await response.json()
            navigate(`/election-results/${formData.place}/${formData.year}`)
        } catch (error) {
            setError(error.message)
            console.error('Error adding election data:', error)
            
            // Handle unauthorized access
            if (error.message.includes('401')) {
                navigate('/login')
            }
        }
    }

    // Show error message if present
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Add Election Data</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Place</label>
                        <input
                            type="text"
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Seats</label>
                        <input
                            type="number"
                            name="totalSeats"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Majority Mark</label>
                        <input
                            type="number"
                            name="majorityMark"
                            value={formData.majorityMark}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Voting Percentage</label>
                        <input
                            type="number"
                            name="votingPercentage"
                            value={formData.votingPercentage}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Party Details</h3>
                    {formData.parties.map((party, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Party Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={party.name}
                                    onChange={(e) => handlePartyChange(index, e)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Seats Won</label>
                                <input
                                    type="number"
                                    name="seatsWon"
                                    value={party.seatsWon}
                                    onChange={(e) => handlePartyChange(index, e)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Vote Share (%)</label>
                                <input
                                    type="number"
                                    name="voteShare"
                                    value={party.voteShare}
                                    onChange={(e) => handlePartyChange(index, e)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="color"
                                    name="color"
                                    value={party.color}
                                    onChange={(e) => handlePartyChange(index, e)}
                                    className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeParty(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addParty}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Party
                    </button>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Submit Election Data
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddElectionData