import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isEditor = location.pathname.includes('/editor') || location.pathname.includes('/preview');

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-body transition-colors duration-200">
      <nav className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                 <span className="font-display font-bold text-2xl text-primary tracking-wide">OLAMI<span className="text-black dark:text-white">GEN</span></span>
              </Link>
               {!isEditor && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="border-primary text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Дашборд</Link>
                  <a href="#" className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Шаблоны</a>
                </div>
               )}
            </div>
            <div className="flex items-center space-x-4">
                 <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold cursor-pointer">A</div>
            </div>
          </div>
        </div>
      </nav>
      {/* For editor/preview, we might want full width or different padding, but for now max-w-7xl is standard */}
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
};
