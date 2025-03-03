
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Search, MapPin, Navigation } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import { cn } from '@/lib/utils';

// Mock data for restaurants - in a real app, this would come from an API
const restaurantData = [
  {
    id: '1',
    name: 'Le Petit Bistro',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Français',
    rating: 4.7,
    reviews: 243,
    location: 'Paris, 6ème',
    price: '€€€',
    latitude: 48.8566,
    longitude: 2.3522,
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
    latitude: 45.7640,
    longitude: 4.8357,
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
    latitude: 43.2965,
    longitude: 5.3698,
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
    latitude: 43.7102,
    longitude: 7.2620,
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
    latitude: 44.8378,
    longitude: -0.5792,
  },
  {
    id: '6',
    name: 'Le Café des Artistes',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Français',
    rating: 4.6,
    reviews: 198,
    location: 'Montpellier, Centre',
    price: '€€',
    latitude: 43.6108,
    longitude: 3.8767,
  },
];

interface RestaurantWithDistance extends Omit<typeof restaurantData[0], 'distance'> {
  distance?: number;
}

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initial load of restaurants
    setRestaurants(restaurantData);
  }, []);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const findNearbyRestaurants = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
          // Calculate distance for each restaurant
          const restaurantsWithDistance = restaurantData.map(restaurant => {
            const distance = calculateDistance(
              latitude,
              longitude,
              restaurant.latitude,
              restaurant.longitude
            );
            return { ...restaurant, distance };
          });
          
          // Sort by distance
          const sortedRestaurants = [...restaurantsWithDistance].sort((a, b) => 
            (a.distance || Infinity) - (b.distance || Infinity)
          );
          
          setRestaurants(sortedRestaurants);
          setIsLoading(false);
          toast.success("Restaurants triés par proximité");
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsLoading(false);
          toast.error("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.");
        }
      );
    } else {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleSearch = (searchValue: string, locationValue: string) => {
    setSearchQuery(searchValue);
    
    // Filter restaurants based on search query
    if (searchValue) {
      const filteredRestaurants = restaurantData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchValue.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchValue.toLowerCase())
      );
      setRestaurants(filteredRestaurants);
    } else {
      setRestaurants(restaurantData);
    }
  };

  return (
    <div className="pb-20 pt-28">
      <div className="resto-container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-resto-900 sm:text-4xl">
            Découvrez les restaurants
          </h1>
          <p className="mt-4 text-resto-600">
            Trouvez et réservez les meilleurs restaurants près de chez vous
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-12 flex justify-between items-center">
          <div>
            <p className="text-sm text-resto-600">
              {restaurants.length === 0 ? 'Aucun restaurant trouvé' : 
                searchQuery ? 
                `${restaurants.length} résultat${restaurants.length > 1 ? 's' : ''} pour "${searchQuery}"` : 
                `${restaurants.length} restaurant${restaurants.length > 1 ? 's' : ''}`
              }
            </p>
          </div>
          <button
            onClick={findNearbyRestaurants}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 rounded-full bg-resto-accent px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-resto-accent-light",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Localisation...</span>
              </>
            ) : (
              <>
                <Navigation size={16} />
                <span>Restaurants à proximité</span>
              </>
            )}
          </button>
        </div>

        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex flex-col">
                <RestaurantCard
                  id={restaurant.id}
                  name={restaurant.name}
                  image={restaurant.image}
                  cuisine={restaurant.cuisine}
                  rating={restaurant.rating}
                  reviews={restaurant.reviews}
                  location={restaurant.location}
                  price={restaurant.price}
                />
                {restaurant.distance && (
                  <div className="mt-2 flex items-center justify-end gap-1 text-xs text-resto-500">
                    <MapPin size={12} className="text-resto-400" />
                    <span>{restaurant.distance.toFixed(1)} km de vous</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 rounded-full bg-resto-100 p-4">
              <Search size={24} className="text-resto-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-resto-900">Aucun restaurant trouvé</h3>
            <p className="text-center text-resto-600">
              Essayez de modifier vos critères de recherche ou explorez d'autres quartiers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
