import privateSeller from './service-1.svg';
import inspected from './service-2.svg';
import rating from './service-3.svg';

interface Image {
  privateSeller: string,
  inspected: string,
  rating: string,
}

const Images:Image = {
  privateSeller,
  inspected,
  rating,
};

export default Images;
