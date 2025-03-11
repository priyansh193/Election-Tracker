import React, {useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function AddData() {
    const navigate = useNavigate()
    const {isLoggedIn, user} = useContext(UserContext)
    console.log(user)

    useEffect(() => {
        if (!isLoggedIn || user?.username !== import.meta.env.VITE_ADMIN_USERNAME) {
            navigate('/')
        }
    }, [isLoggedIn, user, navigate])


    const adminActions = [
        {
            title: 'Add Election Data',
            description: 'Add new election results for states',
            link: '/addElection',
            icon: '📊'
        },
        {
            title: 'Add Upcoming Election',
            description: 'Schedule new upcoming elections',
            link: '/addUpcommingElection',
            icon: '📅'
        },
        {
            title: 'Manage Polls',
            description: 'Create and manage election polls',
            link: '/managePoll',
            icon: '📈'
        },
        {
            title: 'Delete Election Data',
            description: 'Remove existing election results',
            link: '/deleteElection',
            icon: '🗑️'
        },
        {
            title: 'Delete Upcoming Election',
            description: 'Remove scheduled elections',
            link: '/deleteUpcoming',
            icon: '❌'
        }
    ]


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminActions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.link}
                            className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="p-6">
                                <div className="text-4xl mb-4">{action.icon}</div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {action.title}
                                </h2>
                                <p className="text-gray-600">
                                    {action.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddData