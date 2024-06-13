import React, { useState, useEffect } from 'react';
import Introduction from './components/Introduction';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Welcome from './components/Welcome';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';


  function App() {
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
      const savedSlideIndex = localStorage.getItem('currentSlide');
      if (savedSlideIndex !== null) {
        const parsedIndex = parseInt(savedSlideIndex, 10);
        setInitialSlide(parsedIndex);
      //   if (!isNaN(parsedIndex)) {
      //     console.log(`Setting initial slide to: ${parsedIndex}`); // Debugging
      //     setInitialSlide(parsedIndex);
      //   } else {
      //     console.log('Parsed index is NaN'); // Debugging
      //   }
      // } else {
      //   console.log('No saved slide index found'); // Debugging
      }
    }, []);



  
    const handleSlideChange = (swiper) => {
      localStorage.setItem('currentSlide', swiper.activeIndex);
    };
    
    return (
      <>
       <Swiper
        key={initialSlide}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <Welcome/>
        </SwiperSlide>
        <SwiperSlide>
          <Introduction/>
        </SwiperSlide>
        <SwiperSlide>
          <Skills/>
        </SwiperSlide>
        <SwiperSlide>
          <Projects/>
        </SwiperSlide>
      </Swiper>
      </>
    );
  }

export default App;
