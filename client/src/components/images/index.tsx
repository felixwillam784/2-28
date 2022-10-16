interface ImageProps {
  src: string,
  alt:string
}

function Image({ src, alt }:ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '150px',
        height: '150px',
      }}
    />
  );
}

export default Image;
