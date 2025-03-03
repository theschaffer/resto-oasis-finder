
import React from 'react';
import RestaurantCard from './RestaurantCard';

// Mock data for featured restaurants
const featuredRestaurants = [
  {
    id: '1',
    name: 'Le Petit Bistro',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Français',
    rating: 4.7,
    reviews: 243,
    location: 'Paris, 6ème',
    price: '€€€',
    isLarge: true,
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Japonais',
    rating: 4.5,
    reviews: 187,
    location: 'Lyon, Centre',
    price: '€€',
  },
  {
    id: '3',
    name: 'La Trattoria',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Italien',
    rating: 4.2,
    reviews: 156,
    location: 'Marseille, Vieux Port',
    price: '€€',
  },
  {
    id: '4',
    name: 'Le Jardin Secret',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Méditerranéen',
    rating: 4.8,
    reviews: 102,
    location: 'Nice, Promenade',
    price: '€€€',
  },
  {
    id: '5',
    name: 'Chez Paul',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Français',
    rating: 4.4,
    reviews: 167,
    location: 'Bordeaux, Centre',
    price: '€€',
  },
];

const FeaturedRestaurants: React.FC = () => {
  return (
    <section className="py-16">
      <div className="resto-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-resto-900 sm:text-4xl">
            Restaurants populaires
          </h2>
          <p className="mt-4 text-resto-600">
            Découvrez les restaurants les mieux notés par notre communauté
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              {...restaurant}
              isLarge={index === 0} // Make first item larger
              className={index === 0 ? 'md:col-span-2' : ''}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="rounded-full border-2 border-resto-200 bg-white px-6 py-2.5 text-sm font-medium text-resto-700 transition-all duration-200 hover:border-resto-accent hover:text-resto-accent">
            Voir plus de restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
