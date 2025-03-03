
import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (searchValue: string, locationValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue, locationValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div 
      className={cn(
        'glassmorphism w-full max-w-2xl rounded-full transition-all duration-300 ease-in-out mx-auto',
        searchFocused ? 'shadow-elevated' : 'shadow-subtle'
      )}
    >
      <div className="flex items-center divide-x divide-resto-200">
        {/* Search input */}
        <div className="relative flex flex-1 items-center pl-4">
          <Search 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-resto-500"
          />
          <input
            type="text"
            placeholder="Cuisine, restaurant, plat..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyPress={handleKeyPress}
            className="w-full bg-transparent py-3.5 pl-8 pr-3 text-resto-900 placeholder-resto-500 outline-none"
          />
        </div>
        
        {/* Location input */}
        <div className="relative hidden flex-1 items-center md:flex">
          <MapPin 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-resto-500"
          />
          <input
            type="text"
            placeholder="Où ? Ville, quartier..."
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyPress={handleKeyPress}
            className="w-full bg-transparent py-3.5 pl-8 pr-3 text-resto-900 placeholder-resto-500 outline-none"
          />
        </div>
        
        {/* Search button */}
        <button 
          className="flex items-center justify-center gap-2 rounded-r-full bg-resto-accent px-6 py-3.5 text-white transition-all duration-200 hover:bg-resto-accent-light"
          onClick={handleSearch}
        >
          <span className="hidden md:inline">Rechercher</span>
          <Search size={18} />
        </button>
      </div>
      
      {/* Search filters */}
      <div className={cn(
        'flex items-center justify-between px-4 py-2 overflow-hidden transition-all duration-300 ease-in-out',
        searchFocused ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="flex gap-2 text-xs">
          <button className="rounded-full border border-resto-200 bg-white px-3 py-1 text-resto-700 transition-colors hover:bg-resto-50">
            Tous les restaurants
          </button>
          <button className="rounded-full border border-resto-200 bg-white px-3 py-1 text-resto-700 transition-colors hover:bg-resto-50">
            Français
          </button>
          <button className="rounded-full border border-resto-200 bg-white px-3 py-1 text-resto-700 transition-colors hover:bg-resto-50">
            Italien
          </button>
          <button className="rounded-full border border-resto-200 bg-white px-3 py-1 text-resto-700 transition-colors hover:bg-resto-50">
            Japonais
          </button>
        </div>
        <button className="flex items-center gap-1 text-xs text-resto-700">
          <Filter size={14} />
          <span>Plus de filtres</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
