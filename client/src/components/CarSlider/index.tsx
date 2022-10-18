import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function CarSlider() {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <img
          src="https://images.carswitch.com/331753nissan/1740762051796217.jpg?fit=crop&w=414&h=310&auto=format,compress&sat=30&vib=10&q=46"
          alt="car"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.carswitch.com/331753nissan/1740762051796217.jpg?fit=crop&w=414&h=310&auto=format,compress&sat=30&vib=10&q=46"
          alt="car"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.carswitch.com/331753nissan/1740762051796217.jpg?fit=crop&w=414&h=310&auto=format,compress&sat=30&vib=10&q=46"
          alt="car"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.carswitch.com/331753nissan/1740762051796217.jpg?fit=crop&w=414&h=310&auto=format,compress&sat=30&vib=10&q=46"
          alt="car"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default CarSlider;
