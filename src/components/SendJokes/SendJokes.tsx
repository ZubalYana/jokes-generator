import React from 'react'

export default function SendJokes() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Надішліть жарт 😄
        </h2>

        <input
          type="email"
          placeholder="Ваш емейл"
          className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Напишіть свій жарт тут..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full h-12 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
          Відправити на верифікацію
        </button>
      </div>
    </div>
  )
}
