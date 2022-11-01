import SwiperCore, {
  EffectCoverflow, Navigation, Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { SliderImages } from '../../interfaces';
import CarImageModel from '../OpenImageModel';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

function CarSlider({ carImages }:SliderImages) {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  const handleImageClick = (src:string) => {
    setOpenModel(true);
    setImageSrc(src);
  };

  return (
    <div className="main-swiper">
      <Swiper
        effect="coverflow"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        grabCursor
        // centeredSlides
        spaceBetween={-70}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          scale: 0.7,
          stretch: 5,
          depth: 50,
          modifier: 1,
        }}
        pagination
        className="mySwiper"
      >
        {carImages.map((img) => (
          <SwiperSlide
            onClick={() => handleImageClick(img.image)}
            key={img.id}
            style={{ cursor: 'pointer' }}
          >
            <img src={img.image} alt="" />
          </SwiperSlide>
        ))}
        <CarImageModel
          imageSrc={imageSrc}
          openModel={openModel}
          setOpenModel={setOpenModel}
        />
      </Swiper>
    </div>
  );
}

export default CarSlider;
