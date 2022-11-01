import './style.css';
import Images from '../../assets';

function NotFound(): JSX.Element {
  return (
    <div className="pageBody">
      <div className="content">
        <h1 className="notFoundHeader">NOT FOUND</h1>
        <img
          className="imgNotFound"
          src={Images.notFound}
          alt="Not Found"
        />
      </div>
    </div>
  );
}

export default NotFound;
