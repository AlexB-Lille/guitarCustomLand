import { Link, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbMap: Record<string, string> = {
    'build': 'Build Your Guitar',
    'basket': 'Basket',
    'checkout': 'Checkout',
  };

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/" className="text-zinc-400 hover:text-red-500 transition-colors">
        Home
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            {isLast ? (
              <span className="text-red-500 font-semibold uppercase tracking-wider">
                {breadcrumbMap[path] || path}
              </span>
            ) : (
              <Link to={href} className="text-zinc-400 hover:text-red-500 transition-colors">
                {breadcrumbMap[path] || path}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
