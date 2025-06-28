import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendJokes: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [jokeText, setJokeText] = useState<string>('');

  const handleSubmit = async () => {
    if (!email || !jokeText) {
      toast.warning(' Заповніть всі поля');
      return;
    }

    try {
      await axios.post('http://localhost:5000/joke', {
        email,
        jokeText,
        category: 'Any',
        author: 'Анонім',
      });

      toast.success(' Жарт надіслано!');
      setEmail('');
      setJokeText('');
    } catch (error) {
      toast.error(' Помилка! Спробуйте ще раз');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Надішліть жарт 😄
        </h2>

        <input
          type="email"
          placeholder="Ваш емейл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Напишіть свій жарт тут..."
          value={jokeText}
          onChange={(e) => setJokeText(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Відправити на верифікацію
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        limit={1}
      />
    </div>
  );
};

export default SendJokes;
