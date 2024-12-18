// pages/404.js
import React  from 'react';

const Custom404 = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
        <section className=" bg-white font-serif">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="text-center">
              <div
                className="bg-center bg-no-repeat h-[400px] flex items-center justify-center"
                style={{
                  backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                }}
              >
                <h1 className="text-8xl">404</h1>
              </div>
      
              <div className="mt-[-50px]">
                <h3 className="text-3xl font-bold">Look like you're lost</h3>
                <p className="mt-4">The page you are looking for is not available!</p>
                <a
                  href="/"
                  className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      
    );
};

export default Custom404;