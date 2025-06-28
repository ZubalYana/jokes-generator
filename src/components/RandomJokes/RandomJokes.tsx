import React from 'react'

export default function RandomJokes() {
  return (
    <div className="w-full h-screen flex items-start justify-start flex-col bg-gradient-to-br from-blue-100 to-blue-200 px-4 pt-20">
        <div className="w-full h-[380px] bg-white rounded-2xl shadow-2xl p-8 text-center flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Random Jokes</h1>
<textarea  name="" id="" disabled className='w-full h-[220px] resize-none text-center px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400'></textarea>

 

        <button className="w-[220px] h-[50px] bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">Get Random Jokes</button>

       
        </div>
    </div>
  )
}
