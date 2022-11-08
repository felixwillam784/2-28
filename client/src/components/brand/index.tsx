import { Link } from 'react-router-dom';
import './style.css';
import Image from './image';
import Images from '../../assets';

function Brand() {
  return (
    <section className="brandLaing">
      <div className="companyName">
        <h4 className="brand-text">Just Click, You Will Find It</h4>
      </div>
      <div className="imgCarLogo">
        <Link
          state={{ brand: 'BMW' }}
          to="/cars"
        >
          <Image src={Images.bmw} alt="bmw" />
        </Link>
        <Link
          state={{ brand: 'Audi' }}
          to="/cars"
        >
          <Image src={Images.audi} alt="audi" />
        </Link>
        <Link
          state={{ brand: 'Mitsubishi' }}
          to="/cars"
        >
          <Image src={Images.mitsbishi} alt="mitsubishi" />
        </Link>
        <Link
          state={{ brand: 'Toyota' }}
          to="/cars"
        >
          <Image src={Images.toyota} alt="toyota" />
        </Link>
        <Link
          state={{ brand: 'Lamborghini' }}
          to="/cars"
        >
          <Image src={Images.lamborghini} alt="lamborghini" />
        </Link>
        <Link
          state={{ brand: 'Nissan' }}
          to="/cars"
        >
          <Image src={Images.nissan} alt="nissan" />
        </Link>
      </div>
    </section>
  );
}
export default Brand;
