import React from 'react';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt: string;
}

const ImageRepeater: React.FC<{ images: ImageData[] }> = ({ images }) => {
  return (
    <div className="image-repeater">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          width={33.33} // Adjust width as needed (percentage for responsiveness)
          height={200} // Adjust height as needed
          layout="fixed" // Use "fill" for full container width
        />
      ))}
    </div>
  );
};

export default ImageRepeater;
