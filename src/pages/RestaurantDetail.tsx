
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Star, MapPin, Phone, Clock, Calendar, Share2, Bookmark, Heart, ChevronDown, ChevronUp, User, Users, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock restaurant data
const restaurantDetails = {
  id: '1',
  name: 'Le Petit Bistro',
  description: 'Découvrez notre cuisine française authentique, préparée avec des produits frais et locaux. Notre chef renommé vous propose une carte variée qui change au fil des saisons.',
  images: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ],
  cuisine: 'Français',
  rating: 4.7,
  reviews: 243,
  location: '123 Avenue des Champs-Élysées, Paris 8ème',
  phone: '+33 1 23 45 67 89',
  website: 'www.lepetitbistro.fr',
  price: '€€€',
  hours: {
    'Lundi': '12:00 - 22:00',
    'Mardi': '12:00 - 22:00',
    'Mercredi': '12:00 - 22:00',
    'Jeudi': '12:00 - 22:00',
    'Vendredi': '12:00 - 23:00',
    'Samedi': '12:00 - 23:00',
    'Dimanche': '12:00 - 21:00',
  },
  menu: [
    {
      category: 'Entrées',
      items: [
        { name: 'Soupe à l\'oignon', price: '9€', description: 'Soupe à l\'oignon traditionnelle avec fromage gratiné' },
        { name: 'Foie gras maison', price: '15€', description: 'Foie gras fait maison avec confiture d\'oignons' },
        { name: 'Salade Niçoise', price: '12€', description: 'Salade fraîche avec thon, œufs et olives' },
      ]
    },
    {
      category: 'Plats',
      items: [
        { name: 'Bœuf Bourguignon', price: '24€', description: 'Mijoté de bœuf au vin rouge, carottes et champignons' },
        { name: 'Magret de canard', price: '26€', description: 'Magret de canard rôti, sauce au poivre et pommes de terre' },
        { name: 'Filet de bar', price: '28€', description: 'Filet de bar, purée de céleri et sauce aux herbes' },
      ]
    },
    {
      category: 'Desserts',
      items: [
        { name: 'Crème brûlée', price: '8€', description: 'Crème brûlée à la vanille de Madagascar' },
        { name: 'Tarte Tatin', price: '9€', description: 'Tarte aux pommes caramélisées servie avec crème fraîche' },
        { name: 'Mousse au chocolat', price: '7€', description: 'Mousse au chocolat noir 70% cacao' },
      ]
    },
  ],
  features: ['Terrasse', 'Bar à vins', 'Accessible PMR', 'Climatisé', 'Parking', 'Wi-Fi gratuit'],
};

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(true);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationGuests, setReservationGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reservationDate || !reservationTime) {
      toast.error("Veuillez sélectionner une date et une heure");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Réservation confirmée !");
      
      // Reset form
      setReservationDate("");
      setReservationTime("");
      setReservationGuests(2);
      
    } catch (error) {
      toast.error("Une erreur est survenue lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-16">
        {/* Restaurant header */}
        <section className="resto-container py-8">
          <div className="animate-fadeIn">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
              {/* Main image */}
              <div className="lg:col-span-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img 
                    src={restaurantDetails.images[selectedImage]} 
                    alt={restaurantDetails.name} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Smaller images */}
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                {restaurantDetails.images.slice(1, 4).map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(index + 1)}
                  >
                    <img 
                      src={image} 
                      alt={`${restaurantDetails.name} ${index + 1}`} 
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Restaurant info */}
        <section className="resto-container py-6">
          <div className="animate-slideUp mx-auto max-w-3xl lg:max-w-none lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Left content: Restaurant details */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-resto-900">{restaurantDetails.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-resto-accent text-resto-accent" />
                      <span className="font-medium text-resto-700">{restaurantDetails.rating}</span>
                      <span className="text-sm text-resto-500">({restaurantDetails.reviews} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-resto-700">
                      <MapPin size={14} className="text-resto-500" />
                      <span>Paris 8ème</span>
                    </div>
                    <div className="rounded-full bg-resto-100 px-2.5 py-0.5 text-xs font-medium text-resto-700">
                      {restaurantDetails.cuisine}
                    </div>
                    <div className="rounded-full bg-resto-100 px-2.5 py-0.5 text-xs font-medium text-resto-700">
                      {restaurantDetails.price}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="rounded-full bg-resto-100 p-2 text-resto-700 transition-colors hover:bg-resto-200" aria-label="Partager">
                    <Share2 size={18} />
                  </button>
                  <button className="rounded-full bg-resto-100 p-2 text-resto-700 transition-colors hover:bg-resto-200" aria-label="Sauvegarder">
                    <Bookmark size={18} />
                  </button>
                  <button className="rounded-full bg-resto-100 p-2 text-resto-700 transition-colors hover:bg-resto-200" aria-label="Aimer">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-resto-700">{restaurantDetails.description}</p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-resto-200 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-resto-900">
                    <MapPin size={16} className="text-resto-accent" />
                    Adresse
                  </h3>
                  <p className="mt-2 text-sm text-resto-700">{restaurantDetails.location}</p>
                </div>
                
                <div className="rounded-lg border border-resto-200 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-resto-900">
                    <Phone size={16} className="text-resto-accent" />
                    Contact
                  </h3>
                  <p className="mt-2 text-sm text-resto-700">{restaurantDetails.phone}</p>
                  <p className="text-sm text-resto-700">{restaurantDetails.website}</p>
                </div>
              </div>
              
              {/* Hours */}
              <div className="mt-8">
                <h3 className="flex items-center gap-2 font-semibold text-resto-900">
                  <Clock size={16} className="text-resto-accent" />
                  Horaires d'ouverture
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 rounded-lg border border-resto-200 p-4 sm:grid-cols-2">
                  {Object.entries(restaurantDetails.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-1 text-sm">
                      <span className="font-medium text-resto-900">{day}</span>
                      <span className="text-resto-700">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Menu */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-resto-900">
                    <Utensils size={16} className="text-resto-accent" />
                    Menu
                  </h3>
                  <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-full p-1 text-resto-600 hover:bg-resto-100"
                  >
                    {menuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
                
                <div className={cn(
                  "mt-3 overflow-hidden rounded-lg border border-resto-200 transition-all duration-500 ease-in-out",
                  menuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 border-0"
                )}>
                  {restaurantDetails.menu.map((section, index) => (
                    <div key={index} className={cn(
                      "p-4",
                      index > 0 && "border-t border-resto-200"
                    )}>
                      <h4 className="font-medium text-resto-900">{section.category}</h4>
                      <div className="mt-3 space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-resto-900">{item.name}</span>
                              <span className="text-resto-accent">{item.price}</span>
                            </div>
                            <p className="mt-1 text-sm text-resto-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Features */}
              <div className="mt-8">
                <h3 className="font-semibold text-resto-900">Équipements et services</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurantDetails.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="rounded-full bg-resto-100 px-3 py-1 text-sm text-resto-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right content: Reservation form */}
            <div className="mt-10 lg:mt-0">
              <div className="sticky top-24 rounded-xl border border-resto-200 bg-white p-6 shadow-card">
                <h3 className="text-lg font-semibold text-resto-900">Réserver une table</h3>
                
                <form onSubmit={handleReservation} className="mt-4 space-y-4">
                  {/* Date input */}
                  <div>
                    <label htmlFor="date" className="mb-1 block text-sm font-medium text-resto-800">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-resto-500" />
                      <input
                        type="date"
                        id="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="w-full rounded-md border border-resto-200 bg-white py-2.5 pl-9 pr-3 input-focus-ring"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Time input */}
                  <div>
                    <label htmlFor="time" className="mb-1 block text-sm font-medium text-resto-800">
                      Heure
                    </label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-resto-500" />
                      <select
                        id="time"
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="w-full rounded-md border border-resto-200 bg-white py-2.5 pl-9 pr-3 input-focus-ring"
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
                  
                  {/* Guests input */}
                  <div>
                    <label htmlFor="guests" className="mb-1 block text-sm font-medium text-resto-800">
                      Nombre de personnes
                    </label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-resto-500" />
                      <div className="flex">
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-resto-200 bg-resto-50 text-resto-700 transition-colors hover:bg-resto-100"
                          onClick={() => setReservationGuests(prev => Math.max(1, prev - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="guests"
                          value={reservationGuests}
                          onChange={(e) => setReservationGuests(Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                          className="w-12 border-y border-resto-200 bg-white px-0 py-2.5 text-center"
                        />
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-r-md border border-l-0 border-resto-200 bg-resto-50 text-resto-700 transition-colors hover:bg-resto-100"
                          onClick={() => setReservationGuests(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md bg-resto-accent px-6 py-3 text-white transition-all duration-300 hover:bg-resto-accent-light ${
                      isSubmitting ? 'cursor-wait opacity-90' : ''
                    }`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {isSubmitting && (
                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                    </span>
                    <span
                      className={`transform transition-all duration-300 ${
                        isSubmitting ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
                      }`}
                    >
                      Réserver maintenant
                    </span>
                    <span
                      className={`absolute inset-0 flex items-center justify-center font-medium transition-all duration-300 ${
                        isSubmitting ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                      }`}
                    >
                      Traitement en cours...
                    </span>
                  </button>
                </form>
                
                <p className="mt-4 text-center text-xs text-resto-500">
                  Annulation gratuite jusqu'à 2 heures avant la réservation
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
