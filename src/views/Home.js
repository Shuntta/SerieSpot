// Home.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../assets/styles/Home.css";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';




const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <div className="movie" id="movie1">
              {/* Conteúdo do primeiro filme */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="movie" id="movie2">
              {/* Conteúdo do segundo filme */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="movie" id="movie3">
              {/* Conteúdo do terceiro filme */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="movie" id="movie4">
              {/* Conteúdo do quarto filme */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="movie" id="movie5">
              {/* Conteúdo do quinto filme */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="movie" id="movie6">
              {/* Conteúdo do sexto filme */}
            </div>
          </SwiperSlide>
          {/* Adicione mais SwiperSlides conforme necessário */}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
