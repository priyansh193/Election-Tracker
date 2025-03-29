import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <Link 
        to='/states' 
        className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 
          relative flex items-center justify-center text-white font-bold 
          rounded-full cursor-pointer hover:from-blue-500 hover:to-purple-900 
          transition-all duration-300 px-6 py-3"
      >
        State Elections(Vidhna Sabha)
      </Link>
      
      <Link 
        to='/india' 
        className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 
          relative flex items-center justify-center text-white font-bold 
          rounded-full cursor-pointer hover:from-blue-500 hover:to-purple-900 
          transition-all duration-300 px-6 py-3"
      >
        Indian Elections(Lok Sabha)
      </Link>
      
      <Link 
        to='international' 
        className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 
          relative flex items-center justify-center text-white font-bold 
          rounded-full cursor-pointer hover:from-blue-500 hover:to-purple-900 
          transition-all duration-300 px-6 py-3"
      >
        International Elections
      </Link>
      
      <Link 
        to='/upcomming' 
        className="w-[90%] h-15 my-4 bg-gradient-to-r from-purple-500 to-pink-500 
          relative flex items-center justify-center text-white font-bold 
          rounded-full cursor-pointer hover:from-blue-500 hover:to-purple-900 
          transition-all duration-300 px-6 py-3"
      >
        Upcoming Elections
      </Link>
    </div>
  );
};

export default Home;
