import React from 'react'
import { useNavigate } from 'react-router-dom'

function International() {
  const navigate = useNavigate();
  
  const states = [
    "USA", "Australia", "Germany", "UK", "Canada"
  ];

  const handleStateClick = (stateName) => {
    navigate(`/state-details/${stateName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8">
      {states.map((state, index) => (
        <div
          key={index}
          onClick={() => handleStateClick(state)}
          className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300"
        >
          {state}
        </div>
      ))}
    </div>
  )
}

export default International
