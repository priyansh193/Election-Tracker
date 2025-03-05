import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function StateDetails() {
  const navigate = useNavigate();
  const { stateName } = useParams();
  
  const years = [
    "2023", "2018", "2013", "2008", 
    "2003", "1998", "1993", "1988",
    "1983", "1978", "1973", "1968"
  ];

  const handleYearClick = (yearName) => {
    navigate(`/election-results/${stateName}/${yearName}`);
  };

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

