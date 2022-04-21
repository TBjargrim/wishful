import NextImage from 'next/image';

const Icon = ({ src, width, height, alttext }) => {
  return (
    <>
      <NextImage
        src={src}
        width={width ? width : 20}
        height={height ? height : 20}
        alttext={alttext}
      />
    </>
  );
};

export default Icon;
