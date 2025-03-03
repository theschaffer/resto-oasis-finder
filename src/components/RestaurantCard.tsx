
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  className?: string;
  isLarge?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  cuisine,
  rating,
  reviews,
  location,
  price,
  className,
  isLarge = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/restaurant/${id}`}
      className={cn(
        'group block overflow-hidden rounded-xl bg-white card-hover',
        isLarge ? 'col-span-2' : 'col-span-1',
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={cn(
          'absolute inset-0 transition-opacity duration-500',
          imageLoaded ? 'opacity-0' : 'opacity-100 image-loading'
        )} />
        <img
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
        
        {/* Cuisine tag */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-resto-700 backdrop-blur-sm">
          {cuisine}
        </div>
        
        {/* Price tag */}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-resto-700 backdrop-blur-sm">
          {price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-resto-900 transition-colors duration-200 group-hover:text-resto-accent">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            <Star size={16} className="fill-resto-accent text-resto-accent" />
            <span className="ml-1 text-sm font-medium text-resto-700">{rating}</span>
          </div>
          <span className="text-xs text-resto-500">({reviews} avis)</span>
        </div>
        
        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-xs text-resto-500">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-resto-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-resto-400" />
            <span>20-30 min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
