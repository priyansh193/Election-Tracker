import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

function ElectionResults() {
  const { stateName, year } = useParams();
  const [electionData, setElectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchElectionData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/elections/data/${stateName}/${year}`);
      if (response.data.success) {
        setElectionData(response.data.data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElectionData();
  }, [stateName, year]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {"data Not Found"}</div>;
  if (!electionData) return <div className="flex justify-center items-center min-h-screen">No data available</div>;

  // Chart configuration
  const chartData = {
    labels: electionData.parties.map(party => `${party.name} (${party.seatsWon} seats)`),
    datasets: [
      {
        data: electionData.parties.map(party => party.seatsWon),
        backgroundColor: electionData.parties.map(party => party.color),
        borderColor: electionData.parties.map(() => '#fff'),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: '60%',
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{stateName.toUpperCase()} Assembly Election {year}</h1>
        <p className="text-gray-600">Total Seats: {electionData.totalSeats} | Voting Percentage: {electionData.votingPercentage}%</p>
      </div>

      {/* Chart and Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Semicircular Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Seat Distribution</h2>
          <div className="h-[300px] relative">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{electionData.totalSeats}</div>
                <div className="text-sm text-gray-600">Total Seats</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Seats</p>
              <p className="text-xl font-bold text-indigo-600">{electionData.totalSeats}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Major Parties</p>
              <p className="text-xl font-bold text-teal-600">{electionData.parties.length - 1}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rejected Votes</p>
              <p className="text-xl font-bold text-rose-600"></p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Winning Margin</p>
              <p className="text-xl font-bold text-amber-600"></p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Party-wise Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Party-wise Results</h2>
          <div className="space-y-4">
            {electionData.parties.map((party, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{party.name}</span>
                  <span>{party.seatsWon} seats ({party.voteShare}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="h-4 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(party.seatsWon / electionData.totalSeats) * 100}%`,
                      backgroundColor: party.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Winning Party</p>
              <p className="text-xl font-bold text-blue-600">Party A</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Vote Share</p>
              <p className="text-xl font-bold text-green-600">38%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Voter Turnout</p>
              <p className="text-xl font-bold text-purple-600">{electionData.votingPercentage}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Leading Margin</p>
              <p className="text-xl font-bold text-orange-600">10 seats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Overall Free and Fair Elections were Conducted</li>
          <li>Highest voter turnout recorded in last 20 years</li>
          <li>Total of 1,200 candidates contested the election</li>
          <li>Electronic Voting Machines used in all constituencies</li>
        </ul>
      </div>
    </div>
  );
}

export default ElectionResults;