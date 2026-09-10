"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, BatteryCharging, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "PRODUCTS", href: "/products" },
  { name: "APPLICATIONS", href: "/applications" },
  { name: "WHY GOODWIN", href: "/why-goodwin" },
  { name: "ABOUT US", href: "/about" },
  { name: "SUPPORT", href: "/support" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const settings = useGlobalSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        {
          "glass-glow py-3": isScrolled,
          "bg-transparent py-5": !isScrolled,
        }
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image 
            src="/assets/logo/tilak.svg" 
            alt="Tirupati Tilak" 
            width={24} 
            height={28} 
            className="object-contain"
            priority
          />
          <Image 
            src="/assets/logo/Goodwin.png" 
            alt={settings?.company_name || "Goodwin Batteries"} 
            width={160} 
            height={50} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors relative group",
                    pathname === link.href ? "text-brand" : "text-gray-200 hover:text-foreground"
                  )}
                >
                  {link.name}
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-gray-200 hover:text-foreground p-2 rounded-full hover:bg-white/10 transition-colors">
            <Search size={20} />
          </button>
          
          <Link
            href="/dealer-distributor"
            className="text-xs font-bold uppercase tracking-wider text-white border border-primary/30 hover:border-primary px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:bg-primary/10"
          >
            <Briefcase size={14} />
            Become a Dealer
          </Link>
          
          <Link
            href="/battery-finder"
            className="text-xs font-bold uppercase tracking-wider bg-primary text-black px-5 py-2.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:scale-105 transition-all"
          >
            <BatteryCharging size={16} />
            Find Your Battery
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full lg:hidden flex flex-col"
          >
            <div className="container py-6 flex flex-col gap-4 bg-surface border-b border-border shadow-2xl">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-3 text-lg font-bold border-b border-border text-foreground hover:text-brand transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/dealer-distributor"
                  className="py-3 px-4 border border-border text-foreground text-center rounded font-bold uppercase text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Become a Dealer
                </Link>
                <Link
                  href="/battery-finder"
                  className="py-3 px-4 bg-brand text-white text-center rounded font-bold uppercase text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Your Battery
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
