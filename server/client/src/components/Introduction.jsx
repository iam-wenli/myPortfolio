import React from 'react';
import {animated, useSpring} from '@react-spring/web';
import car from '../assets/P2car.png';

function Introduction() {

  const carAnimation= useSpring({
    from:{ x:0 },
    to:{ x:1000 },
    config:{ duration:4000 },
    loop: true,
  });

  return (
    <div className="font-serif px-16 py-10 bg-orange-200 h-screen">
      <h1 className='text-left font-bold text-2xl py-3 pb-10 sm:text-4xl'>Introduction</h1>
      <p className='font-normal text-justify text-base sm:text-xl leading-6 sm:leading-7 first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-bold first-letter:text-rose-900  first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3'>
        Wen Li is my name. My passion in web development was first uncovered in late 2019, when I was encouraged to acquire programming knowledge for the purpose of infusing AI in my job.  
         <br/><br /> Since then, i began to learn the ropes for developing websites.  In my free time, I had watched countless hours of videos, participated in developers community discussion, 
        and done online research in due diligent. In 2022, i had participated in digital design internship, and in 2024 obtained a Diploma in Computer Science and Engineering.
      </p>
      <animated.img src={car} style={carAnimation} className="h-24 mt-10 sm:mt-60 sm:h-44" alt="car"/>
    </div>
  );
}

export default Introduction;