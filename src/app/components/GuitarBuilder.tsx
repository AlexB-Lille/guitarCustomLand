import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

interface GuitarBuilderProps {
  necks: Product[];
  bodies: Product[];
}

export function GuitarBuilder({ necks, bodies }: GuitarBuilderProps) {
  const [currentNeckIndex, setCurrentNeckIndex] = useState(0);
  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);
  const [neckDirection, setNeckDirection] = useState(0);
  const [bodyDirection, setBodyDirection] = useState(0);
  const { addToCart } = useCart();

  const currentNeck = necks[currentNeckIndex];
  const currentBody = bodies[currentBodyIndex];
  const total = currentNeck.price + currentBody.price;

  const nextNeck = () => {
    setNeckDirection(1);
    setCurrentNeckIndex((prev) => (prev + 1) % necks.length);
  };

  const prevNeck = () => {
    setNeckDirection(-1);
    setCurrentNeckIndex((prev) => (prev - 1 + necks.length) % necks.length);
  };

  const nextBody = () => {
    setBodyDirection(1);
    setCurrentBodyIndex((prev) => (prev + 1) % bodies.length);
  };

  const prevBody = () => {
    setBodyDirection(-1);
    setCurrentBodyIndex((prev) => (prev - 1 + bodies.length) % bodies.length);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${currentNeck.id}-${Date.now()}`,
      name: currentNeck.name,
      price: currentNeck.price,
      image: currentNeck.image,
      type: 'neck',
    });
    addToCart({
      id: `${currentBody.id}-${Date.now()}`,
      name: currentBody.name,
      price: currentBody.price,
      image: currentBody.image,
      type: 'body',
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
      {/* Left Side - Neck and Body Info */}
      <div className="lg:col-span-3 space-y-8">
        {/* Neck Controls */}
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
              Selected Neck
            </h3>
            <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
              {currentNeck.name}
            </h4>
            <p className="text-zinc-400 text-sm mb-4">{currentNeck.description}</p>
            <div className="text-3xl font-black text-red-600">${currentNeck.price}</div>
          </div>

          
        </div>

        {/* Body Controls */}
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
              Selected Body
            </h3>
            <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
              {currentBody.name}
            </h4>
            <p className="text-zinc-400 text-sm mb-4">{currentBody.description}</p>
            <div className="text-3xl font-black text-red-600">${currentBody.price}</div>
          </div>
        </div>
      </div>

      {/* Center - Assembled Guitar */}
      <div className="lg:col-span-6 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-[2/3] flex flex-col items-center">
          <div className="absolute top-[35%] flex items-center gap-4 w-full justify-between">
            <button
              onClick={prevNeck}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Previous neck"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* <div className="flex gap-2">
              {necks.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentNeckIndex ? 'bg-red-600 w-6' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div> */}
            <button
              onClick={nextNeck}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Next neck"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {/* Neck Layer (on top) */}
          <div className=" flex items-center justify-center w-[31%]">
            <AnimatePresence initial={false} custom={neckDirection} mode="wait">
              <motion.img
                key={currentNeck.id}
                src={guitarImages[currentNeck.image]}
                alt={currentNeck.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                custom={neckDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              />
            </AnimatePresence>
          </div>
          {/* Body Layer */}
          <div className="absolute flex items-center justify-center w-[63%] right-[100px] top-[289px]">
            <AnimatePresence initial={false} custom={bodyDirection} mode="wait">
              <motion.img
                key={currentBody.id}
                src={guitarImages[currentBody.image]}
                alt={currentBody.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                custom={bodyDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              />
            </AnimatePresence>
          </div>
          <div className="absolute flex items-center gap-4 w-full justify-between bottom-[35%]">
            <button
              onClick={prevBody}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Previous body"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* <div className="flex gap-2">
              {bodies.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentBodyIndex ? 'bg-red-600 w-6' : 'bg-zinc-700'
                    }`}
                />
              ))}
            </div> */}
            <button
              onClick={nextBody}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Next body"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Summary */}
      <div className="lg:col-span-3">
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-lg p-6 lg:sticky lg:top-24">
          <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
            Your Build
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-sm">
                  Neck:
                </div>
                <div className="text-zinc-500 text-xs">{currentNeck.name}</div>
              </div>
              <div className="text-red-600 font-black text-xl">${currentNeck.price}</div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-sm">
                  Body:
                </div>
                <div className="text-zinc-500 text-xs">{currentBody.name}</div>
              </div>
              <div className="text-red-600 font-black text-xl">${currentBody.price}</div>
            </div>

            <div className="flex justify-between items-center pt-3">
              <div className="text-white text-2xl font-black uppercase tracking-wider">
                Total:
              </div>
              <div className="text-red-600 text-3xl font-black">${total}</div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-red-900/50"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
