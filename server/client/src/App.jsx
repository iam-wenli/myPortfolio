import React, { useState, useEffect, useRef } from 'react';
import Welcome from './components/Welcome';
import Introduction from './components/Introduction';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


  function App() {

    const [initialSlide, setInitialSlide] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const swiperRef = useRef(null);
    const routesWithSwiper = ["/welcome","/introduction","/skills","/projects"];

    const getSlideIndex = (path) => {
      switch (path) {
        case '/welcome':
          return 0;
        case '/introduction':
          return 1;
        case '/skills':
          return 2;
        case '/projects':
          return 3;
        default:
          return 0;
      }
    };

  useEffect(() => {
    const savedSlideIndex = parseInt(localStorage.getItem('currentSlide'), 10);
    const targetIndex = !isNaN(savedSlideIndex)
      ? savedSlideIndex
      : getSlideIndex(location.pathname);
    setInitialSlide(targetIndex);

    // 👇 Use slideTo instead of re-mounting Swiper
    if (swiperRef.current) {
      swiperRef.current.slideTo(targetIndex, 0);
    }
  }, [location]);

    // useEffect(() => {
    //   const savedSlideIndex = localStorage.getItem('currentSlide');
    //   if (savedSlideIndex !== null) {
    //     const parsedIndex = parseInt(savedSlideIndex, 10);
    //     if (!isNaN(parsedIndex)) {
    //     setInitialSlide(parsedIndex);
    //     }
    //   } else {
    //     const slideIndex = getSlideIndex(location.pathname);
    //     setInitialSlide(slideIndex);
    //   }
    // }, []);

    // useEffect(() => {
    //   const slideIndex = getSlideIndex(location.pathname);
    //   setInitialSlide(slideIndex);
    // }, [location]);

    const handleSlideChange = (swiper) => {
      const index = swiper.activeIndex;
      localStorage.setItem('currentSlide', index);
      switch (index) {
        case 0:
          navigate('/welcome');
          break;
        case 1:
          navigate('/introduction');
          break;
        case 2:
          navigate('/skills');
          break;
        case 3:
          navigate('/projects');
          break;
        default:
          navigate('/welcome');
          break;
      }
    };
  
    
    return (
      <>
      {routesWithSwiper.includes(location.pathname) ? (
        <Swiper
         onSwiper={(swiper) => { swiperRef.current = swiper; }}
         style={{
           '--swiper-navigation-color': '#fff',
           '--swiper-pagination-color': '#fff',
         }}
         speed={600}
         parallax={true}
         pagination={{clickable: true}}
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
      ) : (
      <Outlet/>
      )} 
      </>
    );
  }

export default App;
