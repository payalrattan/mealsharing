type imageProps = {
  src: string;
  alt: string;
  className?: string;
};
export const Image = ({ src, alt, className }: imageProps) => {
  return <img src={src} alt={alt} className={className} />;
};
