"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Battery, Car, Truck, Bike, Tractor, Search, Phone, Loader2, Info, CheckCircle2, X, RotateCcw, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

import vehicleFitments from "@/data/vehicleFitments.json";
import goodwinProducts from "@/data/goodwinProducts.json";

export default function VehicleFinder() {
  const settings = useGlobalSettings();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Data Options
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  
  const [selections, setSelections] = useState({
    type: "",
    brand: "",
    model: "",
    variant: "",
    fuel: "",
    year: ""
  });

  // Results
  const [recommendedProduct, setRecommendedProduct] = useState<any | null>(null);
  const [fitmentStatus, setFitmentStatus] = useState<"verified" | "unverified">("verified");

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Lead Form
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    // Initial load of Types
    const uniqueTypes = Array.from(new Set(vehicleFitments.map(f => f.type))).sort();
    setTypes(uniqueTypes);
  }, []);

  const resetFinder = () => {
    setStep(1);
    setSelections({ type: "", brand: "", model: "", variant: "", fuel: "", year: "" });
    setRecommendedProduct(null);
    setSearchQuery("");
    setSearchResults([]);
    setLeadSubmitted(false);
  };

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    // Find matching models
    const matches = vehicleFitments.filter(f => 
      f.model.toLowerCase().includes(query.toLowerCase()) || 
      f.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    // Deduplicate by brand + model
    const uniqueMatches = [];
    const seen = new Set();
    for (const m of matches) {
      const key = `${m.brand}-${m.model}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(m);
      }
      if (uniqueMatches.length >= 10) break;
    }
      
    setSearchResults(uniqueMatches);
    setIsSearching(false);
  };

  const selectSearchResult = (fitment: any) => {
    setSearchQuery("");
    setSearchResults([]);
    setSelections(s => ({ 
      ...s, 
      type: fitment.type, 
      brand: fitment.brand, 
      model: fitment.model,
      variant: "", fuel: "", year: ""
    }));
    
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    
    setTimeout(() => {
      const v = Array.from(new Set(vehicleFitments
        .filter(f => f.type === fitment.type && f.brand === fitment.brand && f.model === fitment.model)
        .map(f => f.variant)
      ));
      setVariants(v.sort());
      setLoading(false);
    }, 250);
  };

  const handleTypeSelect = (type: string) => {
    setSelections(s => ({ ...s, type, brand: "", model: "", variant: "", fuel: "", year: "" }));
    setStep(2);
    setLoading(true);
    setLoadingText("Loading brands...");
    setTimeout(() => {
      const b = Array.from(new Set(vehicleFitments.filter(f => f.type === type).map(f => f.brand)));
      setBrands(b.sort());
      setLoading(false);
    }, 250);
  };

  const handleBrandSelect = (brand: string) => {
    setSelections(s => ({ ...s, brand, model: "", variant: "", fuel: "", year: "" }));
    setStep(3);
    setLoading(true);
    setLoadingText("Loading models...");
    setTimeout(() => {
      const m = Array.from(new Set(vehicleFitments.filter(f => f.type === selections.type && f.brand === brand).map(f => f.model)));
      setModels(m.sort());
      setLoading(false);
    }, 250);
  };

  const handleModelSelect = (model: string) => {
    setSelections(s => ({ ...s, model, variant: "", fuel: "", year: "" }));
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    setTimeout(() => {
      const v = Array.from(new Set(vehicleFitments
        .filter(f => f.type === selections.type && f.brand === selections.brand && f.model === model)
        .map(f => f.variant)
      ));
      setVariants(v.sort());
      setLoading(false);
    }, 250);
  };

  const handleVariantSelect = (variant: string) => {
    setSelections(s => ({ ...s, variant, fuel: "", year: "" }));
    setStep(5);
    setLoading(true);
    setLoadingText("Loading fuel types...");
    setTimeout(() => {
      const fList = Array.from(new Set(vehicleFitments
        .filter(f => f.type === selections.type && f.brand === selections.brand && f.model === selections.model && f.variant === variant)
        .map(f => f.fuel)
      ));
      setFuels(fList.sort());
      setLoading(false);
    }, 250);
  };

  const handleFuelSelect = (fuel: string) => {
    setSelections(s => ({ ...s, fuel, year: "" }));
    setStep(6);
    setLoading(true);
    setLoadingText("Loading years...");
    setTimeout(() => {
      const f = vehicleFitments.find(f => 
        f.type === selections.type && 
        f.brand === selections.brand && 
        f.model === selections.model && 
        f.variant === selections.variant && 
        f.fuel === fuel
      );
      if (f) {
        const y = [];
        for (let i = f.yearTo; i >= f.yearFrom; i--) {
          y.push(i.toString());
        }
        setYears(y);
      } else {
        setYears([]);
      }
      setLoading(false);
    }, 250);
  };

  const handleYearSelect = (year: string) => {
    setSelections(s => ({ ...s, year }));
    setStep(7);
    setLoading(true);
    setLoadingText("Finding compatible Goodwin battery...");
    
    setTimeout(() => {
      const f = vehicleFitments.find(f => 
        f.type === selections.type && 
        f.brand === selections.brand && 
        f.model === selections.model && 
        f.variant === selections.variant && 
        f.fuel === selections.fuel
      );
      
      if (f && f.verificationStatus === "verified" && f.batteryProductId) {
        const prod = goodwinProducts.find(p => p.id === f.batteryProductId);
        if (prod) {
          setRecommendedProduct(prod);
          setFitmentStatus("verified");
        } else {
          setRecommendedProduct(null);
          setFitmentStatus("unverified");
        }
      } else {
        setRecommendedProduct(null);
        setFitmentStatus("unverified");
      }
      
      setLoading(false);
    }, 500);
  };

  const getIconForType = (typeName: string) => {
    if (typeName.includes("Passenger") || typeName.includes("Car")) return <Car size={32} />;
    if (typeName.includes("Two") || typeName.includes("Bike") || typeName.includes("Motorcycle") || typeName.includes("Scooter")) return <Bike size={32} />;
    if (typeName.includes("Commercial") || typeName.includes("Truck")) return <Truck size={32} />;
    if (typeName.includes("Tractor")) return <Tractor size={32} />;
    return <Battery size={32} />;
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setTimeout(() => {
      setLeadSubmitting(false);
      setLeadSubmitted(true);
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Goodwin Batteries,\n\nI used the Battery Finder and need a battery for:\n\n` +
    `Vehicle: ${selections.brand} ${selections.model}\n` +
    `Variant: ${selections.variant}\n` +
    `Fuel: ${selections.fuel}\n` +
    `Year: ${selections.year}\n\n` +
    (recommendedProduct ? 
      `Recommended Goodwin Battery:\n${recommendedProduct.name}\n${recommendedProduct.voltage} / ${recommendedProduct.capacity}\n\n` :
      `The database showed this as Unverified. Can you please help me find the exact match?\n\n`
    ) +
    `Please confirm availability and price.`
  );
  
  const whatsappUrl = `https://wa.me/${settings?.whatsapp_main || "919667724411"}?text=${whatsappMessage}`;

  return (
    <div className="bg-navy rounded-2xl shadow-2xl border border-silver/20 overflow-hidden min-h-[500px] flex flex-col relative">
      {/* Header */}
      <div className="bg-transparent text-white p-6 md:p-8 flex items-center justify-between shrink-0 relative border-b border-silver/10">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-1 tracking-wide uppercase">System Diagnostic</h3>
          <p className="text-silver text-sm">Select vehicle parameters to find a verified Goodwin battery recommendation.</p>
        </div>
        
        {/* Search */}
        <div className="hidden md:block relative z-20 w-64">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search your vehicle..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-white/50"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-white/50" />
            {searchQuery && (
              <button onClick={() => {setSearchQuery(""); setSearchResults([])}} className="absolute right-3 top-2.5 text-white/50 hover:text-white">
                <X size={18} />
              </button>
            )}
          </div>
          
          {searchQuery.length >= 2 && (
            <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-muted-foreground text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map(res => (
                  <button 
                    key={res.id} 
                    onClick={() => selectSearchResult(res)}
                    className="w-full text-left px-4 py-3 border-b border-border hover:bg-brand/10 hover:text-brand text-foreground text-sm font-medium transition-colors"
                  >
                    {res.brand} {res.model}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">No matches found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs & Reset */}
      <div className="flex items-center justify-between bg-navy-dark px-6 py-4 border-b border-silver/20">
        <div className="flex text-[10px] sm:text-xs font-bold uppercase tracking-widest text-silver overflow-x-auto whitespace-nowrap hide-scrollbar shrink-0 items-center">
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 1 ? "text-brand" : "")} onClick={() => setStep(1)}>Type</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 2 ? "text-brand" : "")} onClick={() => step >= 2 && setStep(2)}>Brand</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 3 ? "text-brand" : "")} onClick={() => step >= 3 && setStep(3)}>Model</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 4 ? "text-brand" : "")} onClick={() => step >= 4 && setStep(4)}>Variant</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 5 ? "text-brand" : "")} onClick={() => step >= 5 && setStep(5)}>Fuel</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx("cursor-pointer transition-colors hover:text-white", step >= 6 ? "text-brand" : "")} onClick={() => step >= 6 && setStep(6)}>Year</span>
          <span className="w-2 sm:w-4 h-px bg-silver/30 mx-1 sm:mx-2" />
          <span className={clsx(step === 7 ? "text-brand" : "")}>Result</span>
        </div>
        
        <button onClick={resetFinder} className="text-silver hover:text-white flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors shrink-0 ml-4">
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-surface m-0 md:m-4 md:rounded-xl p-6 md:p-8 flex-1 flex flex-col relative min-h-[350px]">
        {loading && (
          <div className="absolute inset-0 z-10 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
            <Loader2 size={40} className="animate-spin text-brand mb-4" />
            <p className="text-foreground font-bold tracking-widest uppercase text-sm">{loadingText}</p>
          </div>
        )}

        {/* Back Button (Mobile friendly) */}
        {step > 1 && step < 7 && !loading && (
          <button onClick={goBack} className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm font-bold tracking-wider uppercase z-10">
            <ArrowLeft size={16} /> Back
          </button>
        )}

        {/* Step 1: Type */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Vehicle Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {types.map((vt) => (
                <button
                  key={vt}
                  onClick={() => handleTypeSelect(vt)}
                  className="flex flex-col items-center justify-center p-6 border border-silver/30 rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-foreground group bg-background"
                >
                  <div className="text-silver group-hover:text-brand transition-colors mb-3">
                    {getIconForType(vt)}
                  </div>
                  <span className="font-semibold text-sm text-center">{vt}</span>
                </button>
              ))}
            </div>
            {types.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground bg-background rounded-xl border border-border">Database is currently empty.</div>
            )}
          </div>
        )}

        {/* Step 2: Brand */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Brand</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className="py-4 px-4 border border-silver/30 bg-background rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground flex flex-col items-center justify-center"
                >
                  <span>{brand}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Model */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select {selections.brand} Model</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="py-4 px-4 border border-silver/30 bg-background rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Variant */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Variant</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => handleVariantSelect(variant)}
                  className="py-4 px-4 border border-silver/30 bg-background rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground flex flex-col"
                >
                  <span>{variant}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Fuel */}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Fuel Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fuels.map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => handleFuelSelect(fuel)}
                  className="py-6 px-6 border border-silver/30 bg-background rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">{fuel === "Electric" ? "⚡" : "⛽"}</span>
                  <span>{fuel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Year */}
        {step === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8 md:pt-0">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Manufacturing Year</h4>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className="py-4 px-2 border border-silver/30 bg-background rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Result - VERIFIED MATCH */}
        {step === 7 && fitmentStatus === "verified" && recommendedProduct && (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <h4 className="text-xl font-bold mb-6 text-center text-foreground uppercase tracking-widest text-sm">Your Goodwin Battery</h4>
            
            <div className="w-full max-w-2xl bg-background border border-silver rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand text-white px-4 py-1 text-xs font-bold rounded-bl-lg">VERIFIED MATCH</div>
              
              <div className="w-48 h-48 bg-surface rounded-xl flex items-center justify-center shrink-0 border border-border p-4 relative z-10">
                {recommendedProduct.image ? (
                  <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-contain" />
                ) : (
                  <Battery size={64} className="text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left relative z-10">
                <span className="text-brand font-bold text-sm tracking-widest uppercase mb-1 block">{recommendedProduct.series || "Standard"} Series</span>
                <h5 className="text-3xl font-heading font-bold text-foreground mb-4">{recommendedProduct.name}</h5>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-surface px-3 py-2 rounded-lg border border-border text-center">
                    <span className="text-xs text-muted-foreground block mb-0.5 uppercase tracking-wider">Capacity</span>
                    <span className="font-bold text-foreground">{recommendedProduct.capacity || "N/A"}</span>
                  </div>
                  <div className="bg-surface px-3 py-2 rounded-lg border border-border text-center">
                    <span className="text-xs text-muted-foreground block mb-0.5 uppercase tracking-wider">Voltage</span>
                    <span className="font-bold text-foreground">{recommendedProduct.voltage || "N/A"}</span>
                  </div>
                  <div className="bg-brand/10 px-3 py-2 rounded-lg border border-brand/20 text-center sm:col-span-1 col-span-2">
                    <span className="text-xs text-brand block mb-0.5 uppercase tracking-wider">Warranty</span>
                    <span className="font-bold text-brand">{recommendedProduct.warrantyOptions?.length ? recommendedProduct.warrantyOptions.join(" / ") : "N/A"}</span>
                  </div>
                </div>

                <div className="bg-surface-hover rounded p-3 mb-6 border border-border text-xs text-muted-foreground text-left">
                  <span className="font-bold block text-foreground mb-1">Recommended for:</span>
                  {selections.brand} {selections.model} ({selections.variant}) - {selections.fuel} - {selections.year}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/products/${recommendedProduct.slug}`} className="bg-background border-2 border-border text-foreground hover:border-brand hover:text-brand px-6 py-3 rounded-lg font-bold w-full transition-all text-center flex-1">
                    View Battery
                  </Link>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-brand text-white hover:bg-brand-dark px-6 py-3 rounded-lg font-bold w-full transition-all flex items-center justify-center gap-2 flex-1 shadow-lg shadow-brand/20">
                    <Phone size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Why this battery */}
            <div className="w-full max-w-2xl mt-8 pt-8 border-t border-border">
              <h5 className="font-bold text-foreground mb-4 text-center">Why this battery?</h5>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="bg-surface-hover text-muted-foreground border border-border px-4 py-2 rounded-full text-sm">Maintenance-free</span>
                <span className="bg-surface-hover text-muted-foreground border border-border px-4 py-2 rounded-full text-sm">Spill-proof design</span>
                <span className="bg-surface-hover text-muted-foreground border border-border px-4 py-2 rounded-full text-sm">Vibration resistant</span>
                <span className="bg-surface-hover text-muted-foreground border border-border px-4 py-2 rounded-full text-sm">Reliable starting power</span>
                <span className="bg-surface-hover text-muted-foreground border border-border px-4 py-2 rounded-full text-sm">Designed for Indian riding conditions</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Empty State / UNVERIFIED MATCH */}
        {step === 7 && fitmentStatus === "unverified" && (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-6">
            <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-6">
              <Info size={32} className="text-brand" />
            </div>
            <h4 className="text-2xl font-heading font-bold mb-4 text-center text-foreground uppercase tracking-wider">Unverified Fitment</h4>
            <p className="text-foreground font-bold mb-2 text-center text-lg">
              Goodwin battery fitment for this vehicle is currently being verified.
            </p>
            <p className="text-muted-foreground mb-8 max-w-md text-center leading-relaxed">
              We do not want to recommend the wrong battery. For your <strong>{selections.brand} {selections.model} {selections.variant}</strong> ({selections.fuel}, {selections.year}), please contact our experts directly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-10">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-brand text-white hover:bg-brand-dark px-6 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
                <Phone size={20} /> WhatsApp Goodwin
              </a>
              <Link href="/contact" className="bg-surface border-2 border-border text-foreground hover:border-brand hover:text-brand px-6 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2">
                Contact Support
              </Link>
            </div>
            
            <div className="pt-8 border-t border-border w-full max-w-xl text-center">
               <p className="text-sm text-muted-foreground mb-4">Or explore our entire range of batteries</p>
               <Link href="/products" className="inline-block bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-dark transition-colors">
                  Browse Goodwin Batteries
               </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
