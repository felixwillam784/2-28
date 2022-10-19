import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './style.css';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const slideImg = [
  {
    id: 1,
    image: 'https://swiperjs.com/demos/images/nature-1.jpg',
  },
  {
    id: 2,
    image: 'https://swiperjs.com/demos/images/nature-2.jpg',
  },
  {
    id: 3,
    image: 'https://swiperjs.com/demos/images/nature-3.jpg',
  },
  {
    id: 4,
    image: 'https://swiperjs.com/demos/images/nature-4.jpg',
  },
  {
    id: 5,
    image: 'https://swiperjs.com/demos/images/nature-5.jpg',
  },
  {
    id: 6,
    image: 'https://swiperjs.com/demos/images/nature-6.jpg',
  },
  {
    id: 7,
    image: 'https://swiperjs.com/demos/images/nature-7.jpg',
  },
  {
    id: 8,
    image: 'https://swiperjs.com/demos/images/nature-8.jpg',
  },
  {
    id: 9,
    image: 'https://swiperjs.com/demos/images/nature-9.jpg',
  },

];
function CarSlider() {
  return (
    <div className="main-swiper">
      <Swiper
        effect="coverflow"
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        navigation
        // grabCursor
        // centeredSlides
        // slidesPerView="auto"
        spaceBetween={0}
        slidesPerView={3}
        coverflowEffect={{
          // rotate: 50,
          scale: 0.9,
          // opacity: 0.5,
          stretch: 5,
          depth: 50,
          modifier: 1,
        }}
        pagination
        className="mySwiper"
      >
        {/* using array */}
        {slideImg.map((img) => (
          <SwiperSlide key={img.id}>
            <img src={img.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarSlider;
