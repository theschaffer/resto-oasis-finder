
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Star, MapPin, Clock, Phone, Globe, Share, Heart, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for restaurants - in a real app, this would come from an API
const restaurantData = [
  {
    id: '1',
    name: 'Le Petit Bistro',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    cuisine: 'Français',
    rating: 4.7,
    reviews: 243,
    description: 'Un bistro traditionnel au cœur de Paris, servant des plats français authentiques dans une atmosphère chaleureuse et conviviale.',
    address: '15 Rue Saint-Jacques, 75005 Paris',
    phone: '+33 1 42 34 56 78',
    website: 'www.lepetitbistro.fr',
    hours: {
      monday: '12:00 - 22:00',
      tuesday: '12:00 - 22:00',
      wednesday: '12:00 - 22:00',
      thursday: '12:00 - 22:00',
      friday: '12:00 - 23:00',
      saturday: '12:00 - 23:00',
      sunday: '12:00 - 21:00',
    },
    location: 'Paris, 6ème',
    price: '€€€',
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    cuisine: 'Japonais',
    rating: 4.5,
    reviews: 187,
    description: 'Sushi Master propose les meilleurs sushis de Lyon, préparés avec des ingrédients frais et de qualité par nos chefs expérimentés.',
    address: '10 Rue Mercière, 69002 Lyon',
    phone: '+33 4 78 12 34 56',
    website: 'www.sushimaster.fr',
    hours: {
      monday: '11:30 - 22:00',
      tuesday: '11:30 - 22:00',
      wednesday: '11:30 - 22:00',
      thursday: '11:30 - 22:00',
      friday: '11:30 - 23:00',
      saturday: '11:30 - 23:00',
      sunday: '12:00 - 21:30',
    },
    location: 'Lyon, Centre',
    price: '€€',
    latitude: 45.7640,
    longitude: 4.8357,
  },
  // Add more restaurant details as needed
];

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<typeof restaurantData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call to get restaurant details
    setIsLoading(true);
    setTimeout(() => {
      const foundRestaurant = restaurantData.find(r => r.id === id);
      setRestaurant(foundRestaurant || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Veuillez sélectionner une date et une heure pour votre réservation.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for reservation
    setTimeout(() => {
      toast.success(`Réservation confirmée pour ${guests} personne(s) le ${selectedDate} à ${selectedTime}`);
      setIsSubmitting(false);
      setSelectedDate('');
      setSelectedTime('');
      setGuests(2);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="animate-spin h-8 w-8 border-4 border-resto-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-resto-900">Restaurant non trouvé</h2>
        <p className="mb-8 text-resto-600">Le restaurant que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/restaurants" className="rounded-full bg-resto-accent px-6 py-2.5 text-white transition-all duration-200 hover:bg-resto-accent-light">
          Voir tous les restaurants
        </Link>
      </div>
    );
  }

  // Format today's date as YYYY-MM-DD for the date input min value
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pb-20 pt-28">
      <div className="resto-container">
        {/* Restaurant Gallery */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2 overflow-hidden rounded-xl">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {restaurant.gallery?.slice(0, 2).map((image, index) => (
              <div key={index} className="overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`${restaurant.name} image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-resto-900">{restaurant.name}</h1>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-resto-100 px-3 py-1 text-sm text-resto-700">
                    {restaurant.cuisine}
                  </span>
                  <span className="rounded-full bg-resto-100 px-3 py-1 text-sm text-resto-700">
                    {restaurant.price}
                  </span>
                  <div className="flex items-center">
                    <Star size={16} className="fill-resto-accent text-resto-accent" />
                    <span className="ml-1 text-sm font-medium text-resto-700">{restaurant.rating}</span>
                    <span className="ml-1 text-sm text-resto-500">({restaurant.reviews} avis)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-white p-2.5 text-resto-700 shadow-subtle transition-all duration-200 hover:text-resto-accent">
                  <Heart size={18} />
                </button>
                <button className="rounded-full bg-white p-2.5 text-resto-700 shadow-subtle transition-all duration-200 hover:text-resto-accent">
                  <Share size={18} />
                </button>
              </div>
            </div>

            <p className="mb-8 text-resto-700">{restaurant.description}</p>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 text-resto-accent" />
                <div>
                  <h3 className="mb-1 font-semibold text-resto-900">Adresse</h3>
                  <p className="text-sm text-resto-700">{restaurant.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 text-resto-accent" />
                <div>
                  <h3 className="mb-1 font-semibold text-resto-900">Téléphone</h3>
                  <p className="text-sm text-resto-700">{restaurant.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={20} className="mt-0.5 text-resto-accent" />
                <div>
                  <h3 className="mb-1 font-semibold text-resto-900">Site Web</h3>
                  <p className="text-sm text-resto-700">{restaurant.website}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 text-resto-accent" />
                <div>
                  <h3 className="mb-1 font-semibold text-resto-900">Heures d'ouverture</h3>
                  <p className="text-sm text-resto-700">Aujourd'hui: {restaurant.hours.monday}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-resto-900">Horaires d'ouverture</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(restaurant.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between rounded-lg bg-resto-50 p-3">
                    <span className="font-medium capitalize text-resto-900">
                      {day === 'monday' ? 'Lundi' :
                        day === 'tuesday' ? 'Mardi' :
                        day === 'wednesday' ? 'Mercredi' :
                        day === 'thursday' ? 'Jeudi' :
                        day === 'friday' ? 'Vendredi' :
                        day === 'saturday' ? 'Samedi' : 'Dimanche'}
                    </span>
                    <span className="text-resto-700">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-resto-200 bg-white p-6 shadow-subtle">
              <h2 className="mb-4 text-xl font-semibold text-resto-900">Réserver une table</h2>
              <form onSubmit={handleReservation}>
                <div className="mb-4">
                  <label htmlFor="date" className="mb-1 block text-sm font-medium text-resto-700">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-resto-500" />
                    <input
                      type="date"
                      id="date"
                      min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-lg border border-resto-200 bg-white py-2.5 pl-10 pr-3 text-resto-900 outline-none focus:border-resto-accent"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="mb-1 block text-sm font-medium text-resto-700">
                    Heure
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-resto-500" />
                    <select
                      id="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full rounded-lg border border-resto-200 bg-white py-2.5 pl-10 pr-3 text-resto-900 outline-none focus:border-resto-accent"
                      required
                    >
                      <option value="">Sélectionner une heure</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="guests" className="mb-1 block text-sm font-medium text-resto-700">
                    Nombre de personnes
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-l-lg border border-resto-200 bg-resto-50 text-resto-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="guests"
                      min="1"
                      max="20"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="h-10 w-16 border-y border-resto-200 py-2 text-center text-resto-900 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setGuests(prev => Math.min(20, prev + 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-r-lg border border-resto-200 bg-resto-50 text-resto-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-lg bg-resto-accent py-3 text-center font-medium text-white transition-all duration-200 hover:bg-resto-accent-light",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Réservation en cours...
                    </span>
                  ) : (
                    "Réserver maintenant"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
