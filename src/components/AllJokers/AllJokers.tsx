import React,{ useEffect, useState } from 'react'
import axios from 'axios';

const GetJokers: React.FC = () => {
    const [joker, setJoker] = useState<[]>([]);

    useEffect(() => {
        const fetchJoker = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jokes');
        setJoker(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    };
    fetchJoker();
    },[])
    return (
        <div>
          <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>All Jokers</h1>
            <ul className='flex justify-around mt-10 flex-wrap'>
                {joker.map((joke: any) => (
                    <li key={joke._id} className='bg-gray-400 rounded-lg p-3'>{joke.author}</li>
                ))}
            </ul>
        </div>
    )
}

export default GetJokers