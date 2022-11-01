import Images from '../../assets/index';
import Imag from './images';
import './styles.css';

function NotFound(): JSX.Element {
  return (
    <Imag src={Images.notFound} alt="not" />
  );
}

export default NotFound;
