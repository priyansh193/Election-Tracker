import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function India() {
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchYears = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/elections/years/india', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch election years');
      }

      const data = await response.json();
      setYears(data.data.years);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleYearClick = (year) => {
    navigate(`/election-results/india/${year}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button 
          onClick={() => fetchYears()}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Indian Election History</h2>
      {years.length === 0 ? (
        <div className="text-gray-500">No election data available</div>
      ) : (
        years.map((year, index) => (
          <div
            key={index}
            onClick={() => handleYearClick(year)}
            className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300 py-4"
          >
            {year}
          </div>
        ))
      )}
    </div>
  );
}

export default India
