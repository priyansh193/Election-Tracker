import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <Link to='/states' className="w-[90%] h-18 my-6 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300">
        State Elections(Vidhna Sabha)
      </Link>
      <Link to='/india' className="w-[90%] h-18 my-6 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300">
        Indian Elections(Lok Sabha)
      </Link>
      <Link to='international' className="w-[90%] h-18 my-6 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300">
        International Elections
      </Link>
      <Link to='/upcomming' className="w-[90%] h-18 my-6 bg-gradient-to-r from-purple-500 to-pink-500 relative flex items-center justify-center text-white font-bold transform -skew-x-12 cursor-pointer hover:from-blue-500 hover:to-purple-900 transition-all duration-300">
        Upcoming Elections
      </Link>
    </div>
  );
};

export default Home;
