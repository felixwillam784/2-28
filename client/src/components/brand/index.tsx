import { Link } from 'react-router-dom';
import Images from '../../assets';
import './style.css';
import Image from './image';

function Brand() {
  return (
    <section className="brandLaing">
      <div className="companyName">
        <h4>find your favorite car by brand</h4>
      </div>
      <div className="imgCarLogo">
        <Link to="/cars?brand=audi">
          <Image src={Images.audi} alt="audi" />
        </Link>
        <Link to="/cars?brand=mitsbishi">
          <Image src={Images.mitsbishi} alt="mitsbishi" />
        </Link>
        <Link to="/cars?brand=nissan">
          <Image src={Images.nissan} alt="nissan" />
        </Link>
        <Link to="/cars?brand=toyota">
          <Image src={Images.toyota} alt="toyota" />
        </Link>
        <Link to="/cars?brand=lamborghini">
          <Image src={Images.lamborghini} alt="lamborghini" />
        </Link>
      </div>
    </section>
  );
}
export default Brand;
