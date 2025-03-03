
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Search } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/restaurants', label: 'Restaurants' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-subtle py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="resto-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight text-resto-900 transition-opacity duration-200 hover:opacity-80"
          >
            Rest'O<span className="text-resto-accent">Coin</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-all duration-200',
                  isActive(link.path)
                    ? 'text-resto-accent'
                    : 'text-resto-700 hover:text-resto-900'
                )}
              >
                {link.label}
              </Link>
            ))}
            <button 
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-resto-100 transition-all duration-200 hover:bg-resto-200"
              aria-label="Search"
            >
              <Search size={18} className="text-resto-700 transition-colors duration-200 group-hover:text-resto-900" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-resto-700" />
            ) : (
              <Menu size={24} className="text-resto-700" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-x-0 top-[61px] z-40 transform bg-white/95 backdrop-blur-md shadow-subtle transition-all duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
      >
        <div className="py-6 px-6 flex flex-col space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'py-2 text-base font-medium transition-colors duration-200',
                isActive(link.path)
                  ? 'text-resto-accent'
                  : 'text-resto-700 hover:text-resto-900'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between py-2 mt-2 border-t border-resto-200">
            <span className="text-sm text-resto-500">Rechercher un restaurant</span>
            <Search size={18} className="text-resto-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
