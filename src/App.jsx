import { useState } from 'react'
import background from './assets/cat2.jpg'

function App() {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center relative" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-8xl font-light mb-4 text-white">
          <span className="hover:underline">Your Life, Your Gem</span>
        </h1>
        <div className="flex p-8">
          <span className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md transition duration-300 hover:bg-gray-300">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input type="text" id="name" className="rounded-none bg-gray-50 border text-gray-900 focus:ring-0 focus:border-transparent block flex-1 min-w-0 w-full text-lg p-3 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 focus:border-transparent focus:outline-none" placeholder="your name"
          />
          <button className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-e-md transition duration-300 hover:bg-gray-300"><strong>Next</strong></button>
        </div>
      </div>
    </>
  )
}

export default App
