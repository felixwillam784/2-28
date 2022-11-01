import './styles.css';

interface ImageProp {
  src:string,
  alt:string,
}
function Imag({ src, alt }:ImageProp) {
  return (
    <div className="pageBody">
      <div className="content">
        <h1 className="notFoundHeader">NOT FOUND</h1>
        <img
          className="imgNotFound"
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
}

export default Imag;
