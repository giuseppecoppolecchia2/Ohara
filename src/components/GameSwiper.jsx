import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

export default function GameSwiper({ games = [] }) {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2.1}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 1.8,
          },
          1024: {
            slidesPerView: 2.1,
          },
        }}
        
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={games.length > 2}
        
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <Link to={`/detail/${game.id}`}>
              <div className="h-96 relative rounded-2xl transition-all duration-500 hover:scale-102 cursor-pointer group overflow-hidden bg-[#0f2a3a] shadow-lg z-0">
                <img
                  src={`${game.background_image}`}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                />
                <div className="  w-full text-center px-3 pb-4">
                <p className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-[#0f2a3a]/80 backdrop-blur-md hover:cursor-default text-[#e8d8b5] border border-[#e8d8b5]/30 shadow-md  ">{game.rating}  <IoStarSharp className="text-yellow-400 text-sm mb-0.5 inline" /></p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a3a]/95 via-[#0f2a3a]/50 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                <div className="absolute inset-0 rounded-2xl border border-[#e8d8b5]/30 pointer-events-none shadow-[inset_0_0_25px_rgba(0,0,0,0.6)]" />

                <div className="absolute bottom-0 w-full text-center px-3 pb-4">
                  <p className="text-[#e8d8b5] font-serif text-lg drop-shadow-lg transition-all duration-500 group-hover:-translate-y-4">
                    {game.name}
                  </p>
                  
                  <p className="text-xs text-[#e8d8b5]/70 italic opacity-0 group-hover:opacity-100 transition duration-500">
                    Scopri di piu...
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#e8d8b5]/10" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
