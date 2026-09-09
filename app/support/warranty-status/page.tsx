"use client";

import { useState } from "react";
import { ChevronRight, Search, Activity, Package, Wrench, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function WarrantyStatusPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "found" | "not_found">("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setStatus("searching");
    
    // Mock Supabase lookup
    setTimeout(() => {
      // Mock logic: if it starts with GW-, it's found
      if (query.toUpperCase().startsWith("GW-")) {
        setStatus("found");
      } else {
        setStatus("not_found");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Header */}
      <section className="bg-surface py-20 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-bold mb-6 tracking-wider uppercase">
            <Link href="/support" className="hover:text-brand transition-colors">Support</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">Track Warranty / Claim</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            TRACK <span className="text-brand">STATUS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Enter your Warranty ID, Claim ID, or Battery Serial Number to check current status.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-background flex-1">
        <div className="container max-w-4xl">
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 shadow-2xl mb-12">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 relative">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-brand transition-colors uppercase font-mono text-lg" 
                  placeholder="Enter ID (e.g., GW-WTY-... or GW-12345678)" 
                />
              </div>
              <button 
                type="submit"
                disabled={status === "searching" || !query.trim()}
                className="bg-brand text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "searching" ? "Searching..." : "Track Status"}
              </button>
            </form>
          </div>

          {/* Results Area */}
          {status === "not_found" && (
            <div className="text-center py-12 animate-in fade-in">
              <Activity size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Record Not Found</h3>
              <p className="text-gray-500 mb-6">We couldn&apos;t find a warranty claim matching that Ticket ID and Phone Number. Please check the details and try again, or <Link href="/contact" className="text-brand hover:underline">contact support</Link>.</p>
              <div className="flex justify-center gap-4">
                <Link href="/support/warranty-registration" className="text-brand font-bold hover:underline">Register New Warranty</Link>
                <span className="text-gray-600">•</span>
                <Link href="/contact" className="text-brand font-bold hover:underline">Contact Support</Link>
              </div>
            </div>
          )}

          {status === "found" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-surface-hover border-b border-border p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Record Found</p>
                    <p className="text-xl font-mono font-bold text-foreground">{query.toUpperCase()}</p>
                  </div>
                  <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} /> Active
                  </div>
                </div>
                
                <div className="p-8">
                  <h4 className="text-lg font-bold text-foreground mb-6">Status Timeline</h4>
                  
                  {/* Timeline Mock */}
                  <div className="relative border-l-2 border-border ml-4 space-y-8">
                    <div className="relative pl-8">
                      <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-brand border-4 border-surface" />
                      <h5 className="font-bold text-foreground">Warranty Registered</h5>
                      <p className="text-sm text-gray-500 mb-1">12 Oct 2024, 10:30 AM</p>
                      <p className="text-sm text-gray-400">Battery model Goodwin DuraMax 65 successfully registered to Rahul Sharma.</p>
                    </div>
                    
                    {query.includes("CLM") && (
                      <div className="relative pl-8">
                        <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-brand border-4 border-surface" />
                        <h5 className="font-bold text-foreground">Claim Submitted</h5>
                        <p className="text-sm text-gray-500 mb-1">15 Nov 2024, 02:15 PM</p>
                        <p className="text-sm text-gray-400">Claim regarding low cranking power submitted and pending review.</p>
                      </div>
                    )}

                    {query.includes("CLM") && (
                      <div className="relative pl-8">
                        <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-yellow-500 border-4 border-surface" />
                        <h5 className="font-bold text-yellow-500">Under Inspection</h5>
                        <p className="text-sm text-gray-500 mb-1">16 Nov 2024, 09:00 AM</p>
                        <p className="text-sm text-gray-400">The battery is currently being inspected at the authorized dealer location.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
