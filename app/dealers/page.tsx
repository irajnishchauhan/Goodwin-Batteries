import { getDealers } from "@/lib/data";
import { Search, MapPin, Phone, Clock, Navigation } from "lucide-react";

export default async function DealersLocatorPage() {
  const dealers = await getDealers();
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <section className="bg-background py-16 border-b border-border">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            FIND <span className="text-brand">GOODWIN</span> NEAR YOU
          </h1>
          <p className="text-gray-500 text-lg">
            Locate authorized Goodwin dealers and service centers in your city.
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface flex-1">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Search and List */}
            <div className="lg:col-span-1 flex flex-col h-[600px]">
              <div className="bg-background border border-border rounded-xl p-6 mb-6 shadow-sm">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by City, Pincode or State" 
                    className="w-full bg-surface border border-border rounded-lg pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-brand"
                  />
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {dealers.map(dealer => (
                  <div key={dealer.id} className="bg-background border border-border rounded-xl p-6 hover:border-brand/50 transition-colors cursor-pointer shadow-sm">
                    <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                      {dealer.name}
                      <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">Verified</span>
                    </h3>
                    <div className="flex items-start gap-3 text-sm text-gray-500 mb-2">
                      <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                      <span>{dealer.address}, {dealer.city}, {dealer.state} - {dealer.pincode}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <Phone size={16} className="text-brand shrink-0" />
                      <span>{dealer.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-500 mb-4">
                      <Clock size={16} className="text-brand shrink-0 mt-0.5" />
                      <span>{dealer.openingHours}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <a href={`tel:+91${dealer.phone}`} className="bg-surface border border-border hover:bg-surface-hover py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Phone size={14} /> Call
                      </a>
                      <a href={`https://wa.me/91${dealer.whatsapp || dealer.phone}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white hover:bg-[#128C7E] py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors">
                        WhatsApp
                      </a>
                      <a href={`https://maps.google.com/?q=${dealer.latitude},${dealer.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-brand text-white hover:bg-brand-dark py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Navigation size={14} /> Map
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-2 h-[600px] bg-background border border-border rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-surface flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
              <div className="relative z-10 text-center bg-background/80 p-8 rounded-2xl backdrop-blur-md border border-border shadow-xl">
                <MapPin size={48} className="text-brand mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Interactive Map</h3>
                <p className="text-gray-500 text-sm">Select a dealer from the list to view their exact location.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
