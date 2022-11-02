import { Link } from 'react-router-dom';
import './style.css';
import Image from './image';
import Images from '../../assets';

function Brand() {
  return (
    <section className="brandLaing">
      <div className="companyName">
        <h4>find your favorite car by brand</h4>
      </div>
      <div className="imgCarLogo">
        <Link
          className="brand_link"
          state={{ brand: 'Audi' }}
          to="/cars"
        >
          <Image src={Images.audi} alt="audi" />
        </Link>
        <Link state={{ brand: 'Mitsubishi' }} to="/cars">
          <Image src={Images.mitsbishi} alt="mitsubishi" />
        </Link>
        <Link state={{ brand: 'Nissan' }} to="/cars">
          <Image src={Images.nissan} alt="nissan" />
        </Link>
        <Link state={{ brand: 'Toyota' }} to="/cars">
          <Image src={Images.toyota} alt="toyota" />
        </Link>
        <Link state={{ brand: 'Lamborghini' }} to="/cars">
          <Image src={Images.lamborghini} alt="lamborghini" />
        </Link>
      </div>
    </section>
  );
}
export default Brand;
