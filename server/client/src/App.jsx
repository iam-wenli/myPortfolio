import React, { useState, useEffect } from 'react';
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
    const routesWithSwiper = ["/welcome","/introduction","/skills","/projects"];

    useEffect(() => {
      const savedSlideIndex = localStorage.getItem('currentSlide');
      if (savedSlideIndex !== null) {
        const parsedIndex = parseInt(savedSlideIndex, 10);
        if (!isNaN(parsedIndex)) {
        setInitialSlide(parsedIndex);
        }
      } else {
        const slideIndex = getSlideIndex(location.pathname);
        setInitialSlide(slideIndex);
      }
    }, []);

    useEffect(() => {
      console.log('Location changed:', location.pathname);
      const slideIndex = getSlideIndex(location.pathname);
      setInitialSlide(slideIndex);
    }, [location]);

    const handleSlideChange = (swiper) => {
      console.log('Slide changed to:', swiper.activeIndex);
      localStorage.setItem('currentSlide', swiper.activeIndex);
      switch (swiper.activeIndex) {
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
  
    const getSlideIndex = (path) => {
      console.log('Getting slide index for path:', path);
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
    
    return (
      <>
      {routesWithSwiper.includes(location.pathname) ? (
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
            <Outlet/>
         </SwiperSlide>
         <SwiperSlide>
            <Outlet/>
         </SwiperSlide>
         <SwiperSlide>
            <Outlet/>
         </SwiperSlide>
         <SwiperSlide>
            <Outlet/>
         </SwiperSlide>
       </Swiper> 
      ) : (
      <Outlet/>
      )} 
      </>
    );
  }

export default App;
