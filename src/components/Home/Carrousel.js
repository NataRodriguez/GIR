import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function HomeCarousel() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        {/* Slides */}
        <SwiperSlide>
          <img src="/images/imagen1.jpg" alt="Imagen 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/imagen2.jpg" alt="Imagen 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/imagen1.jpg" alt="Imagen 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
      </Swiper>

      {/* Bloque de texto y botón flotante */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-3/5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-3/5 bg-gray-500 bg-opacity-60 p-4 rounded-lg">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Medicio</h1>
          <p className="text-lg mb-8 text-white">
            Your health is our top priority. Schedule your medical appointments with ease.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
