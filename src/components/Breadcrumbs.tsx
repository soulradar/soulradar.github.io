import React from 'react';
import { ChevronRight, Home, Compass } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
      <ol className="flex items-center gap-1.5 text-xs text-[#AA5E7A] dark:text-[#D49A9A]">
        <li className="flex items-center gap-1">
          <a
            href="/"
            className="flex items-center gap-1 transition hover:text-[#7C0E44] dark:hover:text-[#F2DACE]"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </a>
        </li>
        <li className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="flex items-center gap-1 font-medium text-[#7C0E44] dark:text-[#F2DACE]" aria-current="page">
            <Compass className="h-3.5 w-3.5" />
            <span>Soulmate Country Finder</span>
          </span>
        </li>
      </ol>
    </nav>
  );
};
