"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      
      {/* 1. HERO SECTION (PIXIS STYLE) */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Glow Effects in Background */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-900/40 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        
        <div className="container relative z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 glass-glow mb-8 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00FF66] animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">The Next Era of Energy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-foreground leading-[1.0] tracking-tighter mb-6 uppercase text-glow">
              WELCOME <br className="hidden md:block" /> TO THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">POWER ERA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Reliable, high-performance battery solutions engineered for extreme endurance and unmatched reliability on every journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="#battery-finder" className="relative group overflow-hidden bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 border-glow">
                <span className="relative z-10">Find Your Battery</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Abstract Cards / Carousel equivalent */}
        <div className="container relative z-10 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] rounded-[2rem] overflow-hidden glass group border-glow"
            >
              <Image src="/assets/pixis/pixis_hero_battery.jpg" alt="Energy Core" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 mix-blend-lighten" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2 text-glow">Quantum Endurance</h3>
                <p className="text-muted-foreground text-sm">Predictive power management for extreme conditions.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[400px] rounded-[2rem] overflow-hidden glass group md:-translate-y-12 border-glow"
            >
              <Image src="/assets/pixis/pixis_card_abstract_1.jpg" alt="Abstract Grid" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 mix-blend-lighten" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2 text-glow">Smart Grid Tech</h3>
                <p className="text-muted-foreground text-sm">Optimized charging cycles and sustained delivery.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative h-[400px] rounded-[2rem] overflow-hidden glass group border-glow"
            >
              <Image src="/assets/pixis/pixis_card_abstract_2.jpg" alt="Nodes" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 mix-blend-lighten" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2 text-glow">AI Diagnostics</h3>
                <p className="text-muted-foreground text-sm">Proactive health monitoring and maintenance.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPATIBLE BRANDS MARQUEE (Glowing Pixis Style) */}
      <section className="py-12 bg-background overflow-hidden relative border-y border-border/30">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll">
             {["HERO", "HONDA", "BAJAJ", "TVS", "YAMAHA", "SUZUKI", "ROYAL ENFIELD", "KTM"].map((brand, i) => (
               <li key={i} className="text-3xl md:text-5xl font-heading font-black text-muted-foreground/20 uppercase tracking-widest hover:text-primary transition-all duration-500 cursor-default whitespace-nowrap hover:text-glow">
                 {brand}
               </li>
             ))}
             {["HERO", "HONDA", "BAJAJ", "TVS", "YAMAHA", "SUZUKI", "ROYAL ENFIELD", "KTM"].map((brand, i) => (
               <li key={i+10} className="text-3xl md:text-5xl font-heading font-black text-muted-foreground/20 uppercase tracking-widest hover:text-primary transition-all duration-500 cursor-default whitespace-nowrap hover:text-glow" aria-hidden="true">
                 {brand}
               </li>
             ))}
          </ul>
        </div>
      </section>

      {/* 3. FIND YOUR BATTERY */}
      <section id="battery-finder" className="py-32 relative bg-surface">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Intelligent Matching</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-black text-foreground">FIND THE EXACT POWER YOU NEED</h3>
          </div>
          
          <div className="max-w-4xl mx-auto glass-glow p-1 rounded-3xl">
             <div className="bg-background/80 backdrop-blur-3xl rounded-[1.4rem] p-8 md:p-12">
               <VehicleFinder />
             </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / BRAND STATS */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-black text-foreground">ENGINEERED FOR EXTREMES</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  {stat.icon}
                </div>
                <div className="text-primary mb-6 drop-shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                  {stat.icon}
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{stat.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-32 bg-surface relative">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Core Range</h2>
              <h3 className="text-4xl md:text-6xl font-heading font-black text-foreground">POWER FOR EVERY APPLICATION</h3>
            </div>
            <Link href="/products" className="text-primary font-bold hover:text-white flex items-center gap-2 whitespace-nowrap transition-colors border-b border-primary pb-1">
              View All Categories <span aria-hidden="true" className="inline-flex"><ChevronRight size={18} /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group relative h-[400px] rounded-[2rem] overflow-hidden glass border-border/50 hover:border-primary/50 transition-all flex flex-col block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent z-10" />
                  
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={app.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 mix-blend-screen"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted transition-transform duration-1000 group-hover:scale-110" />
                  )}
                  
                  <div className="relative z-20 mt-auto p-8 flex flex-col items-start">
                    <h4 className="text-white font-heading font-bold text-3xl mb-3 group-hover:text-primary transition-colors text-glow">{app.name}</h4>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {app.description}
                    </p>
                    <span className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEALER / DISTRIBUTOR CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 glass-glow mb-8 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00FF66] animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Network Expansion</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground mb-6 uppercase">MULTIPLY <br/> YOUR GROWTH</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join the Goodwin network and build your business with a growing, premium battery brand. Benefit from robust marketing support, superior products, and high margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/dealer-distributor" className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-all text-center border-glow">
                Become a Dealer
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-md glass-glow p-1 rounded-3xl">
             <div className="bg-background/90 backdrop-blur-3xl rounded-[1.4rem] p-8 md:p-10">
               <h4 className="text-2xl font-bold text-white mb-6">Quick Enquiry</h4>
               <QuickEnquiryForm />
             </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-surface text-center relative">
        <div className="absolute inset-0 bg-[url('/assets/pixis/pixis_card_abstract_2.jpg')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-background/90" />
        <div className="container max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-8 text-glow">READY TO POWER YOUR JOURNEY?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Experience the next generation of reliable automotive energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/battery-finder" className="bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,102,0.4)]">
              Find Your Battery
            </Link>
            <Link href="/contact" className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
              Contact Goodwin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
