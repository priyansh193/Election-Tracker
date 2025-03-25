import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function AddPoll() {
    const { isLoggedIn, user } = useContext(UserContext)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        place: '',
        totalSeats: '',
        date: '',
        endDate: '',
        parties: [{ name: '', color: '#000000' }],
        isActive: true
    })

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

    const handlePartyChange = (index, field, value) => {
        setFormData(prev => {
            const updatedParties = [...prev.parties]
            updatedParties[index] = {
                ...updatedParties[index],
                [field]: value
            }
            return {
                ...prev,
                parties: updatedParties
            }
        })
    }

    const addParty = () => {
        setFormData(prev => ({
            ...prev,
            parties: [...prev.parties, { name: '', color: '#000000' }]
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
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/polls/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create poll')
            }

            navigate('/live')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Create New Poll
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Place</label>
                        <input
                            type="text"
                            name="place"
                            required
                            value={formData.place}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Seats</label>
                        <input
                            type="number"
                            name="totalSeats"
                            required
                            value={formData.totalSeats}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            required
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Parties</label>
                            <button
                                type="button"
                                onClick={addParty}
                                className="py-1 px-3 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add Party
                            </button>
                        </div>

                        {formData.parties.map((party, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Party Name"
                                    value={party.name}
                                    onChange={(e) => handlePartyChange(index, 'name', e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="color"
                                    value={party.color}
                                    onChange={(e) => handlePartyChange(index, 'color', e.target.value)}
                                    className="w-12 h-10 p-1 border border-gray-300 rounded"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeParty(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                        >
                            {loading ? 'Creating...' : 'Create Poll'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPoll
