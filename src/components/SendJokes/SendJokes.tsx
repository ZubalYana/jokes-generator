import React, { useState } from 'react';
import axios from 'axios';

const SendJokes: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [jokeText, setJokeText] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async () => {
    if (!email || !jokeText) {
      setStatus('error');
      return;
    }

    try {
      await axios.post('http://localhost:5000/joke', {
        email,
        jokeText,
        category: 'Any',
        author: 'Анонім',
      });
      setStatus('success');
      setEmail('');
      setJokeText('');
    } catch (error) {
      console.error('Помилка при відправці жарту:', error);
      setStatus('error');
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

        {status === 'success' && (
          <p className="text-green-600 text-center mt-4">
            ✅ Жарт успішно надіслано!
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center mt-4">
            ❌ Помилка: заповніть всі поля або спробуйте пізніше.
          </p>
        )}
      </div>
    </div>
  );
};

export default SendJokes;
