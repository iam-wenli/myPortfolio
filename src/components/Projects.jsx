import React from 'react';
import loading from '../assets/P4loading.gif';

function Projects() {

  return (
    <div className="font-sans p-12 bg-red-300 h-screen relative">
      <h1 className="text-left font-bold text-2xl sm:text-4xl py-3 pb-10">Projects</h1>
      <div className='flex flex-col justify-center items-center'>
        <img src={loading} className="h-60 mt-4 sm:h-96 sm:mt-14" alt="loading" />
        <p className="text-lg sm:text-2xl mt-10">Work in progress ...</p>
      </div>
    </div>
  )
}

export default Projects;