import { Link } from 'react-router';
import { Guitar, Flame, Zap } from 'lucide-react';

export function Home() {
  return (
    <div className="relative">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-950"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Flame className="w-16 h-16 text-red-600 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            BUILD YOUR
            <span className="block text-red-600 mt-2">LEGEND</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Custom electric guitars crafted for rebels, rockers, and road warriors.
            Your sound. Your style. Your statement.
          </p>

          <Link
            to="/build"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-red-900/50"
          >
            <Guitar className="w-6 h-6" />
            Start Building
            <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12 uppercase tracking-wider">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-zinc-800 p-8 text-center hover:border-red-600/50 transition-colors">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Guitar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                Custom Built
              </h3>
              <p className="text-zinc-400">
                Every guitar is assembled to your exact specifications. Choose your neck, body, and make it yours.
              </p>
            </div>

            <div className="bg-black/50 border border-zinc-800 p-8 text-center hover:border-red-600/50 transition-colors">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                Rock Aesthetics
              </h3>
              <p className="text-zinc-400">
                Inspired by the grit of biker culture and the art of tattoos. Bold designs for bold players.
              </p>
            </div>

            <div className="bg-black/50 border border-zinc-800 p-8 text-center hover:border-red-600/50 transition-colors">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                Premium Quality
              </h3>
              <p className="text-zinc-400">
                Hand-selected woods, premium hardware, and meticulous craftsmanship in every instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/30 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wider">
            Ready to Rock?
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Start building your custom guitar today. Mix and match necks and bodies to create your perfect axe.
          </p>
          <Link
            to="/build"
            className="inline-flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 font-bold uppercase tracking-wider transition-all"
          >
            Build Your Guitar
          </Link>
        </div>
      </section>
    </div>
  );
}
