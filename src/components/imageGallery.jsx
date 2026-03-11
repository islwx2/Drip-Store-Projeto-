import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Efeito para resetar a imagem selecionada se as imagens do produto mudarem
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Sem imagem</div>;
  }

  const selectNext = () => setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  const selectPrev = () => setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  
  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={images[selectedIndex]}
          alt="Imagem principal do produto"
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        {/* Setas que aparecem no hover */}
        <button onClick={selectPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none">
          <FiChevronLeft size={24} />
        </button>
        <button onClick={selectNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none">
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Miniaturas Selecionáveis */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`aspect-square w-full bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
              selectedIndex === index ? 'border-pink-500 shadow-md' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img src={imgSrc} alt={`Miniatura ${index + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;