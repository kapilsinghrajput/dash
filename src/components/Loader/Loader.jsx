import React from 'react'

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-screen ">
<div className="flex space-x-2 items-center h-24">
  <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce"></div>
  <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
  <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce delay-300"></div>
</div>
  </div>
  )
}

