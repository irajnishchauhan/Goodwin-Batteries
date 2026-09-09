"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Zap, Cog, ArrowRight, MapPin, Star } from "lucide-react";
import VehicleFinder from "@/components/vehicle-finder/VehicleFinder";
import QuickEnquiryForm from "@/components/forms/QuickEnquiryForm";
import Image from "next/image";
import { GlobalSettings } from "@/components/GlobalSettingsProvider";

const trustStats = [
  { icon: <ShieldCheck size={32} />, title: "Built for Indian Roads", desc: "Designed to withstand extreme temperatures and tough road conditions." },
  { icon: <Zap size={32} />, title: "Reliable Power", desc: "High cranking power ensures your vehicle starts the first time, every time." },
  { icon: <Cog size={32} />, title: "Wide Application Range", desc: "Batteries for every need: from hatchbacks to heavy earthmovers." },
  { icon: <MapPin size={32} />, title: "Nationwide Network", desc: "Extensive dealer network ensuring support wherever you go." },
];

export default function HomePageClient({ applications, settings }: { applications: any[], settings: GlobalSettings | null }) {
  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={settings?.hero_image_mobile || "/assets/hero/hero_composite_mobile.webp"} />
            <img 
              src={settings?.hero_image_desktop || "/assets/hero/hero_composite_desktop.webp"} 
              alt={settings?.hero_image_alt || "Goodwin Batteries Premium Range"} 
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10" />
        </div>

        <div className="container relative z-20 flex flex-col items-start pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">Premium Automotive Batteries</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-white leading-[1.1] tracking-tight mb-6">
              POWER THAT <br className="hidden md:block" />
              <span className="text-brand">MOVES YOU</span> FORWARD.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Reliable battery solutions engineered to keep your journey, business and machines powered with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#battery-finder" className="bg-brand text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand-dark transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-brand/30">
                Find Your Battery
              </Link>
              <Link href="/products" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                Explore Products <span aria-hidden="true" className="inline-flex"><ArrowRight size={18} /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST / BRAND STATS */}
      <section className="bg-[#09090b] py-16 border-b border-white/5 relative z-30 -mt-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#18181b] border border-white/5 p-8 rounded-xl hover:border-brand/50 transition-colors group"
              >
                <div className="text-brand mb-6 bg-brand/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{stat.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FIND YOUR BATTERY */}
      <section id="battery-finder" className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Battery Finder</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Find the right Goodwin battery for your vehicle</h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VehicleFinder />
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Our Range</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Power for every application</h3>
            </div>
            <Link href="/products" className="text-brand font-bold hover:text-brand-dark flex items-center gap-2 whitespace-nowrap">
              View All Categories <span aria-hidden="true" className="inline-flex"><ChevronRight size={18} /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/products`}
                  className="group relative h-[320px] rounded-2xl overflow-hidden bg-background border border-border flex flex-col block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={app.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 transition-transform duration-700 group-hover:scale-105" />
                  )}
                  
                  <div className="relative z-20 mt-auto p-8 flex flex-col items-start">
                    <h4 className="text-white font-heading font-bold text-2xl mb-2">{app.name}</h4>
                    <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 line-clamp-2">
                      {app.description}
                    </p>
                    <span className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                      Explore Power <span aria-hidden="true" className="inline-flex"><ArrowRight size={14} /></span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 COMPATIBLE BRANDS */}
      <section className="py-16 bg-white dark:bg-[#0a0a0c] overflow-hidden border-t border-b border-border">
        <div className="container mb-8 text-center">
          <h2 className="text-sm font-bold tracking-widest text-brand uppercase">Trusted Fitment For</h2>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
             {["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Kia", "Toyota", "Honda", "Renault"].map((brand, i) => (
               <li key={i} className="text-2xl md:text-4xl font-heading font-bold text-gray-300 dark:text-gray-800 uppercase tracking-widest hover:text-brand dark:hover:text-brand transition-colors cursor-default whitespace-nowrap">
                 {brand}
               </li>
             ))}
             {["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Kia", "Toyota", "Honda", "Renault"].map((brand, i) => (
               <li key={i+10} className="text-2xl md:text-4xl font-heading font-bold text-gray-300 dark:text-gray-800 uppercase tracking-widest hover:text-brand dark:hover:text-brand transition-colors cursor-default whitespace-nowrap" aria-hidden="true">
                 {brand}
               </li>
             ))}
          </ul>
        </div>
      </section>

      {/* 4.6 TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Customer Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Why drivers trust Goodwin</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", location: "Delhi", text: "Got the Goodwin Swift replacement battery delivered and installed in 45 minutes. Superb emergency service!" },
              { name: "Vikram M.", location: "Gurugram", text: "Using Goodwin for my commercial fleet. The durability is unmatched on tough roads." },
              { name: "Priya K.", location: "Noida", text: "Excellent customer service and transparent pricing. Highly recommend their doorstep delivery." }
            ].map((review, i) => (
              <div key={i} className="bg-surface border border-border p-8 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all">
                <div className="flex gap-1 text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-foreground leading-relaxed italic">"{review.text}"</p>
                <div className="mt-auto pt-6 border-t border-border">
                  <span className="font-bold block text-foreground">{review.name}</span>
                  <span className="text-sm text-gray-500 block">{review.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEALER / DISTRIBUTOR CTA */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/10 blur-[150px] pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Partner With Us</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">GROW WITH GOODWIN</h3>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Join the Goodwin network and build your business with a growing, premium battery brand. Benefit from robust marketing support, superior products, and high margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dealer-distributor" className="bg-brand text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors text-center shadow-lg shadow-brand/20">
                Become a Dealer
              </Link>
              <Link href="/dealer-distributor" className="bg-transparent text-white border border-white/30 px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white/10 transition-colors text-center">
                Become a Distributor
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-6">Quick Enquiry</h4>
            <QuickEnquiryForm />
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 bg-brand text-white text-center">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">READY TO POWER YOUR JOURNEY?</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Find the right Goodwin battery for your vehicle or application today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/battery-finder" className="bg-brand text-white px-10 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand-dark transition-all hover:scale-105 shadow-xl">
              Find Your Battery
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-brand text-brand px-10 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand/10 transition-colors">
              Contact Goodwin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
