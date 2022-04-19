import NextImage from 'next/image';

const Icon = ({ src, width, height, altText }) => {

    return (
        <>
            <NextImage src={src} width={width ? width : 20} height={height ? height : 20} altText={altText}/> 
        </>
    )
}

export default Icon