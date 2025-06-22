import React from 'react';
import Card from './Card';
import coffee from '../assets/P4coffee.png';


function Projects() {

  return (
    <div className="font-serif pl-16 py-10 bg-red-300 h-screen relative">
      <h1 className="text-left font-bold text-2xl sm:text-4xl py-3 pb-10 sm:pb-14">
        Projects
      </h1>
      <Card title={"Inventory Management"} navigateTo="projects/bookinventory" />
      <img className="w-28 h-28 sm:w-48 sm:h-52 absolute bottom-0 right-14 mb-12" src={coffee} alt="coffee" />
    </div>
  );
}

export default Projects;
