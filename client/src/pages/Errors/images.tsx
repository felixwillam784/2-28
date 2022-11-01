import './styles.css';

interface ImageProp {
  src:string,
  alt:string,
}
function Imag({ src, alt }:ImageProp) {
  return (
    <div className="pageBody">
      <div className="content">
        <h1 className="header">NOT FOUND</h1>
        <img
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
}

export default Imag;
