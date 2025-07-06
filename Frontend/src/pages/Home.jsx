import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
	{
		to: '/states',
		label: 'State Elections (Vidhan Sabha)',
		img: 'public/assembly.png',
		bg: 'from-purple-400 to-pink-400',
	},
	{
		to: '/india',
		label: 'Indian Elections (Lok Sabha)',
		img: '/public/india.png',
		bg: 'from-blue-400 to-purple-400',
	},
	{
		to: '/international',
		label: 'International Elections',
		img: 'public/globe--v2.png',
		bg: 'from-green-400 to-blue-400',
	},
	{
		to: '/upcomming',
		label: 'Upcoming Elections',
		img: 'public/calendar--v2.png',
		bg: 'from-yellow-400 to-pink-400',
	},
];

const Home = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-10'>
			<div className='grid gap-10 md:grid-cols-2 place-items-center w-full max-w-7xl px-4'>
				{cards.map((card, idx) => (
					<Link
						to={card.to}
						key={idx}
						className='h-80 w-[100%] rounded-2xl shadow-xl bg-white hover:scale-105 transition-transform duration-300 flex flex-col border-2 border-transparent hover:border-purple-400'
					>
						<div
							className={`w-full flex-1 flex items-center justify-center bg-gradient-to-br ${card.bg} rounded-t-2xl`}
						>
							<img
								src={card.img}
								alt={card.label}
								className='h-36 w-36 object-contain p-4'
							/>
						</div>
						<div className='w-full bg-white rounded-b-2xl flex items-center justify-center text-lg font-semibold text-gray-800 py-6 px-2 text-center min-h-[70px]'>
							{card.label}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
