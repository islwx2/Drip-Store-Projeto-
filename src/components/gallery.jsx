import { useState } from 'react';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const Gallery = ({ images, width = '100%', height = 'auto', radius = 'xl', showThumbs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto" style={{ height }}>

      <div className={`w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] rounded-${radius} overflow-hidden`}>
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-30"
        aria-label="Imagem anterior"
      >
        <img src={arrowLeft} alt="Anterior" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-30"
        aria-label="Próxima imagem"
      >
        <img src={arrowRight} alt="Próxima" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
              currentIndex === index ? 'bg-pink-600 scale-110' : 'bg-gray-300'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {showThumbs && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Miniatura ${index + 1}`}
              className={`w-20 h-16 object-cover border-2 cursor-pointer transition ${
                currentIndex === index ? 'border-pink-600' : 'border-transparent'
              } rounded-${radius}`}
              onClick={() => setCurrentIndex(index)}
              style={{ borderRadius: radius }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;