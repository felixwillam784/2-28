import './styles.css';

interface ImageProp {
  src:string,
  alt:string,
}
function Imag({ src, alt }:ImageProp) {
  return (
    <div className="content">
      <h1 className="header">NOT FOUND</h1>
      <img
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default Imag;
