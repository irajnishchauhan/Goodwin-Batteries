"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ShieldCheck, Zap, Cog, ArrowRight, MapPin, CheckCircle2, BatteryCharging } from "lucide-react";
import VehicleFinder from "@/components/vehicle-finder/VehicleFinder";
import QuickEnquiryForm from "@/components/forms/QuickEnquiryForm";
import Image from "next/image";
import { GlobalSettings } from "@/components/GlobalSettingsProvider";

export default function HomePageClient({ applications, settings }: { applications: any[], settings: GlobalSettings | null }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-center pt-24 pb-16 overflow-hidden bg-surface">
        {/* Subtle structural background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 rounded-bl-[100px] pointer-events-none" />
        
        <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start w-full lg:w-1/2 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Reliable Power for Every Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[1.1] tracking-tight mb-6 uppercase">
              Power That Keeps <br /> <span className="text-primary">You Moving.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Engineered for Indian roads. Goodwin Batteries deliver uncompromising performance, long life, and everyday reliability for cars, bikes, and commercial vehicles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#battery-finder" className="bg-primary text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]">
                Find Your Battery
              </Link>
              <Link href="/products" className="bg-white border border-border text-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-surface-hover transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                Explore Products
              </Link>
            </div>
          </motion.div>

          {/* Hero Product Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Soft backdrop instead of neon glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[80px]" />
            <Image 
              src="/assets/pixis/pixis_hero_battery.jpg" 
              alt="Goodwin Premium Battery" 
              fill 
              className="object-contain drop-shadow-2xl z-10" 
              priority
            />
          </motion.div>

        </div>
      </section>

      {/* 2. QUICK APPLICATION ACCESS */}
      <section className="py-12 bg-white border-b border-border z-30 relative shadow-sm">
        <div className="container">
          <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">What do you need power for?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Car", icon: "🚗" },
              { name: "Motorcycle", icon: "🏍️" },
              { name: "SUV", icon: "🚙" },
              { name: "Commercial", icon: "🚚" },
              { name: "Tractor", icon: "🚜" },
              { name: "Inverter", icon: "⚡" },
            ].map((app, i) => (
              <Link key={i} href="#battery-finder" className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-surface hover:border-primary hover:bg-primary/5 transition-colors group cursor-pointer">
                <span className="text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100">{app.icon}</span>
                <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{app.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY GOODWIN (EDITORIAL) */}
      <section className="py-24 relative bg-background overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">The Goodwin Standard</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-[1.1] mb-8">
                BUILT FOR EVERYDAY RELIABILITY.
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe in practical, dependable power. Our batteries are engineered to withstand extreme temperatures, tough roads, and heavy usage without missing a beat.
              </p>
              
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Quality Manufacturing</h4>
                    <p className="text-muted-foreground">Stringent quality control ensuring high cranking power and longer life.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Cog className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Wide Application Coverage</h4>
                    <p className="text-muted-foreground">From compact hatchbacks to heavy earthmovers, we have the right fit.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Dedicated Support</h4>
                    <p className="text-muted-foreground">Backed by a nationwide dealer network for prompt service and warranty support.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image 
                  src="/assets/categories/commercial-heavy-duty.jpg" 
                  alt="Goodwin Battery Manufacturing Quality" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-border max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="text-primary" size={28} />
                  <span className="font-heading font-black text-2xl text-foreground">100%</span>
                </div>
                <p className="text-sm text-muted-foreground font-semibold">Factory Tested for Maximum Performance</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Core Range</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-black text-foreground uppercase">Power For Every Application</h3>
            </div>
            <Link href="/products" className="text-primary font-bold hover:text-primary-dark flex items-center gap-2 whitespace-nowrap transition-colors group">
              View All Categories <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <Link
                key={app.id}
                href={`/products`}
                className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all active:scale-[0.98]"
              >
                <div className="relative h-64 w-full bg-surface-hover overflow-hidden">
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={app.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted-foreground">
                      <BatteryCharging size={48} opacity={0.2} />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-foreground font-heading font-bold text-2xl mb-2 group-hover:text-primary transition-colors">{app.name}</h4>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {app.description || `High performance batteries designed specifically for ${app.name.toLowerCase()}.`}
                  </p>
                  <div className="mt-auto flex items-center text-primary font-bold text-sm uppercase tracking-wide">
                    Explore Range <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FIND YOUR BATTERY (BATTERY FINDER) */}
      <section id="battery-finder" className="py-24 bg-white relative">
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Intelligent Matching</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">FIND THE RIGHT BATTERY FOR YOUR VEHICLE</h3>
            <p className="text-muted-foreground text-lg">Select your vehicle details and get a verified Goodwin battery recommendation.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
             <VehicleFinder />
          </div>
        </div>
      </section>

      {/* 6. DEALER / DISTRIBUTOR CTA */}
      <section className="py-24 bg-secondary text-secondary-foreground border-y border-border relative overflow-hidden">
        {/* Subtle background graphic */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[url('/assets/categories/passenger-vehicles.jpg')] bg-cover bg-center mix-blend-overlay pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Network Expansion</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 uppercase leading-[1.1]">GROW WITH <br/> GOODWIN</h3>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
              Become a Goodwin dealer or distributor and build your battery business with a growing product portfolio and dedicated support. Benefit from strong margins and reliable supply.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dealer-distributor" className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors text-center active:scale-[0.98]">
                Become a Dealer
              </Link>
              <Link href="/contact" className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition-colors text-center active:scale-[0.98]">
                Talk to Sales
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-border">
             <h4 className="text-2xl font-bold text-foreground mb-6">Quick Enquiry</h4>
             <QuickEnquiryForm />
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 bg-surface text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6 uppercase">READY TO POWER YOUR JOURNEY?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Find the exact fit for your vehicle or get in touch with our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/battery-finder" className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors active:scale-[0.98]">
              Find Your Battery
            </Link>
            <Link href="/contact" className="bg-white border border-border text-foreground px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-surface-hover transition-colors active:scale-[0.98]">
              Contact Goodwin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
