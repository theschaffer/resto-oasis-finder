
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedRestaurants from '@/components/FeaturedRestaurants';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Hero />
        <FeaturedRestaurants />
        
        {/* Features section */}
        <section className="bg-resto-50 py-16">
          <div className="resto-container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-resto-900 sm:text-4xl">
                Comment ça marche
              </h2>
              <p className="mt-4 text-resto-600">
                Trouvez et réservez votre table en quelques clics
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="animate-slideUp relative rounded-xl bg-white p-6 shadow-card">
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-resto-accent text-lg font-bold text-white">
                  1
                </div>
                <div className="mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-resto-900">
                    Recherchez un restaurant
                  </h3>
                  <p className="text-resto-600">
                    Utilisez notre moteur de recherche avancé pour trouver le restaurant idéal selon vos préférences.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="animate-slideUp animation-delay-150 relative rounded-xl bg-white p-6 shadow-card">
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-resto-accent text-lg font-bold text-white">
                  2
                </div>
                <div className="mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-resto-900">
                    Réservez une table
                  </h3>
                  <p className="text-resto-600">
                    Choisissez une date, une heure et le nombre de personnes, puis confirmez votre réservation en quelques clics.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="animate-slideUp animation-delay-300 relative rounded-xl bg-white p-6 shadow-card">
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-resto-accent text-lg font-bold text-white">
                  3
                </div>
                <div className="mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-resto-900">
                    Profitez et partagez
                  </h3>
                  <p className="text-resto-600">
                    Après votre visite, partagez votre expérience et aidez la communauté à découvrir de nouveaux restaurants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-16">
          <div className="resto-container">
            <div className="rounded-xl bg-resto-900 p-8 md:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Recevez nos recommandations
                </h2>
                <p className="mt-4 text-resto-300">
                  Inscrivez-vous à notre newsletter pour découvrir les nouveaux restaurants et nos offres exclusives.
                </p>
                
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="rounded-full rounded-r-none border-0 px-5 py-3 text-resto-900 sm:flex-1"
                  />
                  <button className="rounded-full rounded-l-none bg-resto-accent px-6 py-3 font-medium text-white transition-colors hover:bg-resto-accent-light">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
