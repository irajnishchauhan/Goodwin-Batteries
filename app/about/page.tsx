"use client";

import { ShieldCheck, Zap, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-black py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6">
              DRIVING POWER, <span className="text-brand">DELIVERING TRUST.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              We are committed to providing robust, technologically advanced, and long-lasting energy storage solutions that empower Indian industries, vehicles, and everyday lives.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-surface border border-border overflow-hidden flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent pointer-events-none" />
                <div className="w-full h-full bg-background rounded-xl border border-border shadow-xl flex items-center justify-center text-brand font-bold text-6xl shadow-brand/10 relative z-10">
                  G
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="text-brand font-bold uppercase tracking-widest text-sm">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Power is the backbone of progress
              </h2>
              <div className="prose prose-lg dark:prose-invert text-gray-500">
                <p>
                  At Goodwin Batteries, we believe that power is the backbone of progress. Founded with a clear vision to provide reliable and long-lasting battery solutions, we have grown into a trusted name in the power industry. Whether it’s for your vehicle, home, office, or industrial needs, our wide range of batteries is designed to keep you going without interruption.
                </p>
                <p>
                  From the very beginning, our mission has been simple — to offer quality battery products backed by excellent service and expert support. Every battery we provide is crafted to deliver consistent performance, safety, and durability in real-life conditions.
                </p>
                <p>
                  What truly sets us apart is our customer-first approach. We’re not just in the business of selling batteries — we provide complete power solutions. From helping you select the right product to offering home delivery, installation, and after-sales service, our team is committed to making your experience smooth and hassle-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} className="text-brand" />
              </div>
              <span className="text-brand font-bold uppercase tracking-widest text-sm block mb-4 relative z-10">Our Mission</span>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 relative z-10">Moving Forward</h3>
              <p className="text-gray-500 leading-relaxed text-lg relative z-10">
                To deliver powerful, safe, and eco-friendly battery solutions that keep people and businesses moving forward.
              </p>
            </div>

            <div className="bg-background border border-border p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={120} className="text-brand" />
              </div>
              <span className="text-brand font-bold uppercase tracking-widest text-sm block mb-4 relative z-10">Our Vision</span>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 relative z-10">A Part of Every Household</h3>
              <p className="text-gray-500 leading-relaxed text-lg relative z-10">
                To be a leading name in the battery industry known for trust, quality, and innovation — and to make Goodwin Batteries a part of every household. Experience the power of reliability and service. Choose Goodwin Batteries — where energy meets excellence, and every home matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-surface">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-background border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-full relative bg-surface-hover">
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Users size={120} className="text-foreground" />
              </div>
              <img 
                src="/assets/leadership/aman-rajar-wall.jpg" 
                alt="Leadership at Goodwin Batteries"
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => {
                  // Fallback if the supplied photo isn't uploaded yet
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
              <span className="text-brand font-bold uppercase tracking-widest text-sm mb-2 block">Leadership</span>
              <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Driving Our Vision</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Under strong leadership, Goodwin Batteries has continuously pushed the boundaries of power storage technology. Our focus remains on delivering uncompromised quality, building long-lasting relationships with our dealers, and ensuring every customer has a reliable power source.
              </p>
              <div className="pt-6 border-t border-border">
                <p className="font-bold text-foreground text-lg">Aman / Rajar Wall</p>
                <p className="text-brand text-sm font-semibold uppercase tracking-wider">Leadership Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-24 bg-background">
        <div className="container text-center max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-16">Why Choose Goodwin</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Uncompromising Quality</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every battery undergoes rigorous testing to ensure it meets our strict standards for durability and performance in Indian conditions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Customer First</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                From selection to installation and after-sales support, our dedicated team is always ready to assist you.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Continuous Innovation</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                We invest in advanced technologies to ensure our batteries deliver higher cranking power and longer life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
