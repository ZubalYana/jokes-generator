import React from 'react'

export default function SendJokes() {
  return (
    <div className='w-full h-[100vh] flex flex-col'>

      <h2 className='text-center text-3xl'>Send Jokes</h2>

      <input type="text" placeholder='Емейл' className='w-[80%] h-[40px] pl-2 '/>

      <textarea name="" id="" placeholder='Напишите свою шутку'/>

      <button>Відправити на веріфікацію</button>


    </div>
  )
}
