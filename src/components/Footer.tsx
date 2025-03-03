
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-resto-900 text-white">
      <div className="resto-container py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Rest'O<span className="text-resto-accent">Coin</span></h3>
            <p className="text-sm text-resto-300">
              Découvrez les meilleurs restaurants près de chez vous. Réservez votre table en quelques clics et partagez votre expérience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Facebook size={16} className="text-white" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Twitter size={16} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-resto-300">
              <li>
                <Link to="/" className="transition-colors hover:text-white">Accueil</Link>
              </li>
              <li>
                <Link to="/restaurants" className="transition-colors hover:text-white">Restaurants</Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">À propos</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">Mentions légales</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Catégories</h3>
            <ul className="space-y-2 text-sm text-resto-300">
              <li>
                <Link to="#" className="transition-colors hover:text-white">Français</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">Italien</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">Japonais</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">Méditerranéen</Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-white">Tous les restaurants</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-resto-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-resto-300" />
                <span>123 Avenue de la Gastronomie<br />75000 Paris, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-resto-300" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-resto-300" />
                <span>contact@restocoin.fr</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 border-t border-resto-800 pt-8 text-center text-xs text-resto-400">
          <p>© {new Date().getFullYear()} Rest'OCoin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
