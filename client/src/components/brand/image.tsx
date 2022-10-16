import './style.css';

interface ImageProps {
  src: string,
  alt:string
}

function Image({ src, alt }:ImageProps) {
  return (
    <img
      className="imgesStyle"
      src={src}
      alt={alt}
    />
  );
}

export default Image;
