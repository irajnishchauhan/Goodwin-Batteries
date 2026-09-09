"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

export default function Footer() {
  const settings = useGlobalSettings();

  return (
    <footer className="bg-navy pt-20 pb-10 border-t border-silver/10 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/assets/logo/Goodwin.png" 
                alt={settings?.company_name || "Goodwin Batteries"} 
                width={180} 
                height={60} 
                className="object-contain"
              />
            </Link>
            
            <p className="text-sm font-bold text-brand uppercase tracking-wider">
              {settings?.tagline || "YOUR TRUSTED POWER SOURCE"}
            </p>

            <p className="text-sm leading-relaxed text-gray-400">
              Powering every journey. Reliable battery solutions engineered to keep your vehicle, business, and machines powered with confidence.
            </p>

            <div className="flex items-center gap-4">
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-colors text-xs font-bold font-heading">
                  Fb
                </a>
              )}
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-colors text-xs font-bold font-heading">
                  Ig
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-colors text-xs font-bold font-heading">
                  Yt
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-lg">Explore</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/products" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Products</Link></li>
              <li><Link href="/battery-finder" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Find Your Battery</Link></li>
              <li><Link href="/applications" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Applications</Link></li>
              <li><Link href="/why-goodwin" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Why Goodwin</Link></li>
              <li><Link href="/about" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> About Us</Link></li>
            </ul>
          </div>

          {/* Network & Support */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-lg">Support & Network</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/dealer-distributor" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Become a Dealer</Link></li>
              <li><Link href="/dealers" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Find a Dealer</Link></li>
              <li><Link href="/support" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Warranty Support</Link></li>
              <li><Link href="/battery-care" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Battery Care</Link></li>
              <li><Link href="/contact" className="text-sm text-silver hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-brand opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  <strong className="text-white">Head Office:</strong><br />
                  Shop No. 51, Gokhale Market,<br />
                  Opposite Tis Hazari Court, Delhi – 110054
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  <strong className="text-white">Corporate Office:</strong><br />
                  202, 2nd Floor – Samiksh Landmark,<br />
                  Near Choithram Circle, A.B. Road, Indore – 452012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand shrink-0" />
                <div className="flex flex-col text-sm text-gray-400">
                  <span><strong className="text-white">Sales:</strong> <a href="tel:9667724411" className="hover:text-white transition-colors">96677 24411</a></span>
                  <span className="mt-1"><strong className="text-white">Support:</strong> <a href="tel:9220404411" className="hover:text-white transition-colors">92204 04411</a></span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand shrink-0" />
                <div className="flex flex-col text-sm text-gray-400">
                  <span><strong className="text-white">Sales:</strong> <a href="mailto:sales@goodwinbatteries.com" className="hover:text-white transition-colors">sales@goodwinbatteries.com</a></span>
                  <span className="mt-1"><strong className="text-white">Support:</strong> <a href="mailto:support@goodwinbatteries.com" className="hover:text-white transition-colors">support@goodwinbatteries.com</a></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {settings?.company_name || "Goodwin Batteries"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
