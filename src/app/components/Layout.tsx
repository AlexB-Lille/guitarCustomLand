import { Outlet, Link, useLocation } from 'react-router';
import { ShoppingCart, Guitar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from './Breadcrumb';

export function Layout() {
  const { items } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <Guitar className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  GUITAR CUSTOM LAND
                </h1>
                <p className="text-xs text-zinc-400 uppercase tracking-widest">Build Your Legend</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-zinc-300 hover:text-red-500 transition-colors uppercase tracking-wider text-sm font-semibold"
              >
                Home
              </Link>
              <Link
                to="/build"
                className="text-zinc-300 hover:text-red-500 transition-colors uppercase tracking-wider text-sm font-semibold"
              >
                Build Your Guitar
              </Link>
              <Link
                to="/basket"
                className="flex items-center gap-2 text-zinc-300 hover:text-red-500 transition-colors uppercase tracking-wider text-sm font-semibold relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Basket</span>
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </Link>
            </nav>

            <Link
              to="/basket"
              className="md:hidden flex items-center gap-2 text-zinc-300 hover:text-red-500 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {location.pathname !== '/' && (
        <div className="border-b border-zinc-800/50 bg-zinc-900/30">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb />
          </div>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 bg-black/70 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider">About Us</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Guitar Custom Land - Where your rock dreams become reality.
                Custom-built guitars for those who dare to be different.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/build" className="text-zinc-400 hover:text-red-500 text-sm transition-colors">
                    Build Your Guitar
                  </Link>
                </li>
                <li>
                  <Link to="/basket" className="text-zinc-400 hover:text-red-500 text-sm transition-colors">
                    View Basket
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Contact</h3>
              <p className="text-zinc-400 text-sm">Email: info@guitarcustomland.com</p>
              <p className="text-zinc-400 text-sm">Phone: +1 (555) ROCK-123</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-center text-zinc-500 text-sm">
              © 2026 Guitar Custom Land. Built for those who rock hard.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
