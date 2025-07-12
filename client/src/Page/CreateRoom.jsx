import React from 'react'

const CreateRoom = () => {
  return (
    <>
        <div className="Room flex justify-center items-center h-[calc(100vh-64px)] w-full bg-gradient-to-t from-indigo-500  to-gray-500">
            <div className="box h-1/2 w-1/2 bg-blue-400 text-black ">

                <div className="chat-box h-[calc(100%-64px)] ">
                    <p className='my-message'>hey</p>
                    <p className='other-message'>Hello</p>
                    <p className='my-message'>bol bhai</p>
                    <p className='other-message'>sun bhai</p>
                    <p className='other-message'>Chill karte hai</p>
                    <p className='my-message'>hey</p>
                    <p className='other-message'>Hello</p>
                    <p className='my-message'>bol bhai</p>
                    <p className='other-message'>sun bhai</p>
                    <p className='other-message'>Chill karte hai</p>
                </div>
                <form className=' flex gap-2 items-center justify-between h-16 w-full px-2'>
                    <input type="text" 
                    placeholder='Type your message'
                    className='h-12 w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:outline-none' />
                    <button type='submit' className='bg-white text-black font-bold px-4 py-2 rounded-2xl'>Send</button>
                </form>
            </div>

        </div>
    </>
  )
}

export default CreateRoom