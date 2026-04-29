import { GuitarBuilder } from '../components/GuitarBuilder';
import productsData from '../../data/products.json';

export function Build() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Build Your <span className="text-red-600">Custom Guitar</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Choose your neck and body to create the ultimate rock machine.
            Each combination creates a unique sound and aesthetic.
          </p>
        </div>

        <GuitarBuilder necks={productsData.necks} bodies={productsData.bodies} />
      </div>
    </div>
  );
}
