import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function StateDetails() {
  const navigate = useNavigate();
  const { stateName } = useParams();
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/elections/years/${stateName}`);
        console.log(response)
        setYears(response.data.data.years);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching years:", error);
        setError("No data available for this state");
        setLoading(false);
      }
    };

    fetchYears();
  }, [stateName]);

  const handleYearClick = (yearName) => {
    navigate(`/election-results/${stateName}/${yearName}`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">{stateName} Election History</h2>
      {years.map((year, index) => (
        <div
          key={index}
          onClick={() => handleYearClick(year)}
          className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300"
        >
          {year}
        </div>
      ))}
    </div>
  )
}

export default StateDetails

