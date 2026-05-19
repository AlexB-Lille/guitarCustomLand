import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { guitarImages } from '../utils/imageImports';

interface Product {
  id: string;
  name: string;
  type: 'neck' | 'body';
  description: string;
  price: number;
  image: string;
  specs: {
    material: string;
    [key: string]: string | number;
  };
}

interface GuitarCarouselProps {
  products: Product[];
  title: string;
  type: 'neck' | 'body';
}

export function GuitarCarousel({ products, title, type }: GuitarCarouselProps) {
  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20%',
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '10%',
        },
      },
    ],
  };

  const handleAddToCart = () => {
    const product = products[currentIndex];
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      image: product.image,
      type: product.type,
    });
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-8 uppercase tracking-wider">
        {title}
      </h2>

      <div className="relative px-4 md:px-12">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <div key={product.id} className="px-4">
              <div
                className={`transition-all duration-300 ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
                }`}
              >
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-lg overflow-hidden hover:border-red-600/50 transition-colors">
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center p-8">
                    <img
                      src={guitarImages[product.image]}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-red-600">${product.price}</span>
                      <div className="text-right text-sm text-zinc-500">
                        <div>{product.specs.material}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-red-900/50"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Basket
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-red-600 w-8' : 'bg-zinc-700 hover:bg-zinc-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
