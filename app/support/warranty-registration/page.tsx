"use client";

import { useState } from "react";
import { ChevronRight, ShieldCheck, Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/mock";

export default function WarrantyRegistrationPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [warrantyId, setWarrantyId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Mock Supabase insertion
    setTimeout(() => {
      setStatus("success");
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setWarrantyId(`GW-WTY-2026-${randomNum}`);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col w-full min-h-screen pt-20">
        <section className="py-24 flex-1 flex items-center justify-center bg-background">
          <div className="container max-w-2xl text-center">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Registration Successful</h1>
            <p className="text-gray-400 text-lg mb-8">
              Your Goodwin battery has been successfully registered. Please save your Warranty ID for future reference.
            </p>
            <div className="bg-surface border border-border rounded-xl p-8 mb-8 inline-block shadow-lg">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Your Warranty ID</p>
              <p className="text-3xl font-mono font-bold text-brand">{warrantyId}</p>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/support/warranty-status" className="bg-brand text-white px-8 py-3 rounded font-bold transition-all hover:bg-brand-dark">
                Check Status
              </Link>
              <Link href="/products" className="bg-surface border border-border text-foreground px-8 py-3 rounded font-bold hover:border-brand transition-all">
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Header */}
      <section className="bg-surface py-20 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-bold mb-6 tracking-wider uppercase">
            <Link href="/support" className="hover:text-brand transition-colors">Support</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">Warranty Registration</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            WARRANTY <span className="text-brand">REGISTRATION</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Register your new Goodwin Battery to activate your warranty and ensure hassle-free support.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <ShieldCheck size={32} className="text-brand" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Register Your Product</h2>
                <p className="text-sm text-gray-500">All fields are mandatory unless marked otherwise.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Details */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="e.g. Rahul Sharma" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Mobile Number</label>
                    <input required type="tel" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="+91" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="rahul@example.com" />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Battery Model</label>
                    <select required className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors appearance-none">
                      <option value="">Select Battery Model</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.ah})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Serial Number</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors uppercase" placeholder="e.g. GW-12345678" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Date of Purchase</label>
                    <input required type="date" className="w-full bg-background border border-border rounded p-3 text-gray-400 focus:outline-none focus:border-brand transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Invoice Number</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="Invoice No." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Dealer Name</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="Name of the shop/dealer" />
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Vehicle Registration Number</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors uppercase" placeholder="e.g. DL 1C AB 1234" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Vehicle Make & Model</label>
                    <input required type="text" className="w-full bg-background border border-border rounded p-3 text-foreground focus:outline-none focus:border-brand transition-colors" placeholder="e.g. Maruti Swift" />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-brand transition-colors cursor-pointer bg-background">
                    <Upload size={24} className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-semibold text-foreground mb-1">Upload Invoice</p>
                    <p className="text-xs text-gray-500">PDF, JPG or PNG (Max 5MB)</p>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-brand transition-colors cursor-pointer bg-background">
                    <Upload size={24} className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-semibold text-foreground mb-1">Upload Battery Photo (Optional)</p>
                    <p className="text-xs text-gray-500">Showing serial number clearly</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <p className="text-xs text-gray-500 max-w-md">By submitting this form, you agree to our Warranty Terms & Conditions and Privacy Policy.</p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-brand text-white px-10 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Registering..." : "Register Warranty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
