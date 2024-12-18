import React from 'react'

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-screen ">
    <img 
      src="/bouncing-circles.svg" 
      alt="loading" 
      width={150} 
      height={50} 
    />
  </div>
  )
}
