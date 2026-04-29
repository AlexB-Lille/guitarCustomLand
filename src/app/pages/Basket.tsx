import { Link } from 'react-router';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { guitarImages } from '../utils/imageImports';

export function Basket() {
  const { items, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-zinc-700 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Your Basket is Empty
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Time to build your dream guitar!
          </p>
          <Link
            to="/build"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-wider">
          Your <span className="text-red-600">Basket</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center gap-6 hover:border-red-600/50 transition-colors"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-zinc-800 to-black rounded-lg flex items-center justify-center p-4 flex-shrink-0">
                  <img
                    src={guitarImages[item.image]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                        {item.name}
                      </h3>
                      <span className="inline-block mt-1 text-xs uppercase tracking-wider px-2 py-1 bg-red-600/20 text-red-500 rounded">
                        {item.type}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-2xl font-black text-red-600 mt-4">
                    ${item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Items ({items.length})</span>
                  <span className="font-bold">${total}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-bold">Calculated at checkout</span>
                </div>
                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-white text-xl font-black">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="text-red-600">${total}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-lg font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-900/50"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/build"
                className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-red-500 px-6 py-3 font-bold uppercase tracking-wider transition-all"
              >
                Continue Building
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
