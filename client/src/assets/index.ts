import privateSeller from './service-1.svg';
import inspected from './service-2.svg';
import rating from './service-3.svg';
import lamborghini from './lamborghini.png';
import nissan from './nissan.png';
import toyota from './toyota.png';
import mitsbishi from './mitsubishi_v2.png';
import audi from './audi.png';
import car from './2.jpg';

interface Image {
  privateSeller: string,
  inspected: string,
  rating: string,
  lamborghini: string,
  nissan: string,
  toyota: string,
  mitsbishi: string,
  audi: string,
  car: string
}

const Images: Image = {
  privateSeller,
  inspected,
  rating,
  lamborghini,
  nissan,
  toyota,
  mitsbishi,
  audi,
  car,
};

export default Images;
