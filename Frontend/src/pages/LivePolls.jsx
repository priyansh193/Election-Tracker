import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND_URL)

function LivePolls() {
    const { isLoggedIn, user } = useContext(UserContext);
    const [polls, setPolls] = useState([]);
    const [votedPolls, setVotedPolls] = useState(new Map());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);

    const isPollActive = (endDate) => {
        return new Date() < new Date(endDate);
    };

    useEffect(() => {
        const fetchPolls = async () => {            
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/polls`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch polls');
                }

                if (data.success) {
                    setPolls(data.data);
                    const votes = new Map();
                    data.data.forEach(poll => {
                        const userVote = poll.voters.find(v => v.userId === user._id);
                        if (userVote) votes.set(poll._id, userVote.partyVotedFor);
                    });
                    setVotedPolls(votes);
                }
            } catch (error) {
                setError(error.message);
                console.error('Poll fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();

        socket.on('voteUpdate', (data) => {
            setPolls((currentPolls) =>
                currentPolls.map((poll) => {
                    if (poll._id !== data.pollId) return poll;

                    const isAlreadyUpdated =
                    poll.totalVotes === data.totalVotes &&
                    JSON.stringify(poll.parties) === JSON.stringify(data.parties);

                return isAlreadyUpdated
                    ? poll
                    : {
                        ...poll,
                        totalVotes: data.totalVotes,
                        parties: data.parties
                    };
                })
            );

            return () => {
                socket.off('voteUpdate', voteUpdateHandler);
            };
        });
    }, [isLoggedIn, user]);

    const handleVote = async (pollId, partyName) => {
        if (!isLoggedIn || voting) return;

        setVoting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/polls/vote`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pollId, partyName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to cast vote');
            }

            setVotedPolls(current => new Map(current.set(pollId, partyName)));
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <h2 className="text-2xl font-bold mb-4">Please Login to Vote</h2>
                <p className="text-gray-600 mb-6">You need to be logged in to participate in polls</p>
                <Link
                    to="/login"
                    className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                    Login Now
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Live Election Polls
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {polls.length === 0 ? (
                    <div className="text-center text-gray-600">
                        No active polls at the moment
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {polls.map(poll => (
                            <div
                                key={poll._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {poll.place}
                                        </h2>
                                        <span className={`text-sm px-2 py-1 rounded ${
                                            isPollActive(poll.endDate)
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {isPollActive(poll.endDate) ? 'Active' : 'Ended'}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Ends: {new Date(poll.endDate).toLocaleDateString()}
                                    </p>

                                    <div className="space-y-4">
                                        {poll.parties.map(party => {
                                            const hasVoted = votedPolls.has(poll._id);
                                            const isVotedParty = votedPolls.get(poll._id) === party.name;

                                            return (
                                                <button
                                                    key={party._id}
                                                    onClick={() => handleVote(poll._id, party.name)}
                                                    disabled={!isPollActive(poll.endDate) || voting}
                                                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                                                        hasVoted
                                                            ? isVotedParty
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'opacity-50'
                                                            : 'hover:border-purple-300'
                                                    } ${
                                                        (!isPollActive(poll.endDate) || voting)
                                                            ? 'cursor-not-allowed'
                                                            : 'cursor-pointer'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">
                                                            {party.name}
                                                            {isVotedParty && (
                                                                <span className="ml-2 text-green-600 text-sm">
                                                                    ✓ Your vote
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            {((party.votes / (poll.totalVotes || 1)) * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full transition-all duration-300"
                                                            style={{
                                                                width: `${(party.votes / (poll.totalVotes || 1)) * 100}%`,
                                                                backgroundColor: party.color
                                                            }}
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LivePolls;