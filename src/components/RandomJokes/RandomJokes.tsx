import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RandomJokes() {
  const [joke, setJoke] = useState('');

  const randomeJoke = () => {
    axios.get('http://localhost:5000/joke/random').then((response) => {
        setJoke(response.data.jokeText);
        toast.success('Все добре 😄!');
       
        if (response.data.isVerified) {
          setJoke(response.data.jokeText);
        } else {
          toast.error('Щось пішло не так, спробуйте ще раз!');
        }
    })
  };

  return (
    <div className="w-full h-screen flex items-start justify-start flex-col bg-gradient-to-br from-blue-100 to-blue-200 px-4 pt-20">
      <div className="w-full h-[380px] bg-white rounded-2xl shadow-2xl p-8 text-center flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Random Jokes</h1>

        <textarea
          disabled
          className="w-full h-[220px] resize-none text-center px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={joke || "Дуже смішний жарт"}
        />

        <button
          className="w-[220px] h-[50px] bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={randomeJoke}
        >
          Get Random Joke
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
