"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Battery, Car, Truck, Bike, Tractor, Search, Phone, Loader2, Info, CheckCircle2, X, RotateCcw } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

export default function VehicleFinder() {
  const settings = useGlobalSettings();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Searching Database...");

  // Data Options
  const [types, setTypes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [fuels, setFuels] = useState<any[]>([]);
  const [years, setYears] = useState<string[]>([]);
  
  // Selected State
  const [selections, setSelections] = useState({
    typeId: "", typeName: "",
    brandId: "", brandName: "",
    modelId: "", modelName: "",
    variantId: "", variantName: "",
    fuelId: "", fuelName: "",
    year: ""
  });

  // Results
  const [fitmentRecords, setFitmentRecords] = useState<any[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<any | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Lead Form
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  async function loadTypes() {
    setLoading(true);
    setLoadingText("Loading vehicle types...");
    const { data } = await supabase.from("vehicle_types").select("*").eq("active", true).order("display_order");
    setTypes(data || []);
    setLoading(false);
  }

  const resetFinder = () => {
    setStep(1);
    setSelections({
      typeId: "", typeName: "",
      brandId: "", brandName: "",
      modelId: "", modelName: "",
      variantId: "", variantName: "",
      fuelId: "", fuelName: "",
      year: ""
    });
    setRecommendedProduct(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    // Search Brands, Models
    const { data: modelsData } = await supabase
      .from("vehicle_models")
      .select("*, brand:brand_id(*)")
      .ilike("name", `%${query}%`)
      .eq("active", true)
      .limit(10);
      
    setSearchResults(modelsData || []);
    setIsSearching(false);
  };

  const selectSearchResult = async (model: any) => {
    setSearchQuery("");
    setSearchResults([]);
    setSelections(s => ({ 
      ...s, 
      typeId: model.brand.vehicle_type_id, typeName: "Selected via Search", 
      brandId: model.brand.id, brandName: model.brand.name, 
      modelId: model.id, modelName: model.name,
      variantId: "", fuelId: "", year: "" 
    }));
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    const { data } = await supabase.from("vehicle_variants").select("*").eq("model_id", model.id).eq("active", true).order("name");
    setVariants(data || []);
    setLoading(false);
  };

  const handleTypeSelect = async (id: string, name: string) => {
    setSelections(s => ({ ...s, typeId: id, typeName: name, brandId: "", modelId: "", variantId: "", fuelId: "", year: "" }));
    setStep(2);
    setLoading(true);
    setLoadingText("Loading brands...");
    const { data } = await supabase.from("vehicle_brands").select("*").eq("vehicle_type_id", id).eq("active", true).order("name");
    setBrands(data || []);
    setLoading(false);
  };

  const handleBrandSelect = async (id: string, name: string) => {
    setSelections(s => ({ ...s, brandId: id, brandName: name, modelId: "", variantId: "", fuelId: "", year: "" }));
    setStep(3);
    setLoading(true);
    setLoadingText("Loading models...");
    const { data } = await supabase.from("vehicle_models").select("*").eq("brand_id", id).eq("active", true).order("name");
    setModels(data || []);
    setLoading(false);
  };

  const handleModelSelect = async (id: string, name: string) => {
    setSelections(s => ({ ...s, modelId: id, modelName: name, variantId: "", fuelId: "", year: "" }));
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    const { data } = await supabase.from("vehicle_variants").select("*").eq("model_id", id).eq("active", true).order("name");
    setVariants(data || []);
    setLoading(false);
  };

  const handleVariantSelect = async (id: string, name: string) => {
    setSelections(s => ({ ...s, variantId: id, variantName: name, fuelId: "", year: "" }));
    setLoading(true);
    setLoadingText("Finding compatible Goodwin battery...");
    
    // Fetch compatibility records for this variant
    const { data } = await supabase.from("vehicle_battery_fitments")
      .select("*, product:goodwin_product_id(*), fuel:fuel_type_id(*)")
      .eq("variant_id", id)
      .eq("public_visible", true)
      .eq("fitment_status", "VERIFIED");
      
    const records = data || [];
    setFitmentRecords(records);

    if (records.length === 0) {
      setRecommendedProduct(null);
      setStep(7);
      setLoading(false);
      return;
    }

    // Extract unique fuels
    const uniqueFuelMap = new Map();
    records.forEach(r => {
      if (r.fuel) uniqueFuelMap.set(r.fuel.id, r.fuel);
    });
    
    const uniqueFuels = Array.from(uniqueFuelMap.values());
    setFuels(uniqueFuels);

    if (uniqueFuels.length === 1) {
      await handleFuelSelect(uniqueFuels[0].id, uniqueFuels[0].name, records);
    } else if (uniqueFuels.length === 0) {
      // No fuel specified, go to years
      await handleFuelSelect("Any", "Any", records);
    } else {
      setStep(5);
      setLoading(false);
    }
  };

  const handleFuelSelect = async (fuelId: string, fuelName: string, currentRecords = fitmentRecords) => {
    setSelections(s => ({ ...s, fuelId, fuelName, year: "" }));
    
    const filteredRecords = fuelId === "Any" 
      ? currentRecords 
      : currentRecords.filter(r => r.fuel_type_id === fuelId);
    
    if (filteredRecords.length === 0) {
      setRecommendedProduct(null);
      setStep(7);
      return;
    }

    const uniqueYears = new Set<string>();
    filteredRecords.forEach(r => {
      if (!r.year_start && !r.year_end) {
        uniqueYears.add("All Years");
      } else {
        const start = r.year_start || 2000;
        const end = r.year_end || new Date().getFullYear();
        for (let y = end; y >= start; y--) {
          uniqueYears.add(y.toString());
        }
      }
    });

    const yearsArr = Array.from(uniqueYears).sort((a, b) => {
      if (a === "All Years") return -1;
      if (b === "All Years") return 1;
      return b.localeCompare(a);
    });
    
    setYears(yearsArr);

    if (yearsArr.length === 1) {
      handleYearSelect(yearsArr[0], filteredRecords);
    } else if (yearsArr.length === 0) {
      setRecommendedProduct(filteredRecords[0].product);
      setStep(7);
    } else {
      setStep(6);
      setLoading(false);
    }
  };

  const handleYearSelect = (year: string, currentRecords = fitmentRecords) => {
    setSelections(s => ({ ...s, year }));
    setStep(7);
    
    const match = currentRecords.find(r => {
      const fuelMatch = r.fuel_type_id === selections.fuelId || selections.fuelId === "Any";
      let yearMatch = true;
      if (year !== "All Years" && r.year_start && r.year_end) {
        const y = parseInt(year);
        yearMatch = y >= r.year_start && y <= r.year_end;
      }
      return fuelMatch && yearMatch;
    });

    if (match && match.product) {
      setRecommendedProduct(match.product);
    } else if (currentRecords.length > 0 && currentRecords[0].product) {
      // Fallback to first if strict year match fails but we have records
      setRecommendedProduct(currentRecords[0].product);
    } else {
      setRecommendedProduct(null);
    }
  };

  const getIconForType = (typeName: string) => {
    if (typeName.includes("Passenger") || typeName.includes("Car")) return <Car size={32} />;
    if (typeName.includes("Two") || typeName.includes("Bike")) return <Bike size={32} />;
    if (typeName.includes("Commercial") || typeName.includes("Truck")) return <Truck size={32} />;
    if (typeName.includes("Tractor")) return <Tractor size={32} />;
    return <Battery size={32} />;
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    
    const enquiryId = `GWB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const payload = {
      enquiry_id: enquiryId,
      vehicle_type: selections.typeName,
      brand: selections.brandName,
      model: selections.modelName,
      variant: selections.variantName,
      fuel: selections.fuelName,
      year: selections.year,
      recommended_product_id: recommendedProduct?.id || null,
      customer_name: leadForm.name,
      phone: leadForm.phone,
      email: leadForm.email,
    };

    await supabase.from("battery_finder_leads").insert(payload);
    
    setLeadSubmitting(false);
    setLeadSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Goodwin Batteries,\n\nI used the Battery Finder and need a battery for:\n\n` +
    `Vehicle: ${selections.brandName}\n` +
    `Model: ${selections.modelName}\n` +
    `Variant: ${selections.variantName}\n` +
    (selections.fuelName && selections.fuelName !== "Any" ? `Fuel: ${selections.fuelName}\n` : "") +
    (selections.year && selections.year !== "All Years" ? `Year: ${selections.year}\n\n` : "\n") +
    (recommendedProduct ? 
      `Recommended Goodwin Battery:\n${recommendedProduct.name}\n${recommendedProduct.voltage} / ${recommendedProduct.ah}\n\n` :
      ``
    ) +
    `Please confirm availability and price.`
  );
  
  const whatsappUrl = `https://wa.me/${settings?.whatsapp_main || "919667724411"}?text=${whatsappMessage}`;

  return (
    <div className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden min-h-[400px] flex flex-col relative">
      {/* Header */}
      <div className="bg-brand text-white p-6 md:p-8 flex items-center justify-between shrink-0 relative">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-1">Find Your Battery</h3>
          <p className="text-white/80 text-sm">Select your vehicle to find a verified Goodwin battery recommendation.</p>
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
                <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map(res => (
                  <button 
                    key={res.id} 
                    onClick={() => selectSearchResult(res)}
                    className="w-full text-left px-4 py-3 border-b border-border hover:bg-brand/10 hover:text-brand text-foreground text-sm font-medium transition-colors"
                  >
                    {res.brand?.name} {res.name}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 text-sm">No matches found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs & Reset */}
      <div className="flex items-center justify-between bg-surface-hover px-4 py-3 border-b border-border">
        <div className="flex text-xs font-bold uppercase tracking-wider text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar shrink-0">
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 1 ? "text-brand" : "")} onClick={() => setStep(1)}>Type</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 2 ? "text-brand" : "")} onClick={() => step >= 2 && setStep(2)}>Brand</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 3 ? "text-brand" : "")} onClick={() => step >= 3 && setStep(3)}>Model</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 4 ? "text-brand" : "")} onClick={() => step >= 4 && setStep(4)}>Variant</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 5 ? "text-brand" : "")} onClick={() => step >= 5 && setStep(5)}>Fuel</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx("cursor-pointer transition-colors hover:text-foreground", step >= 6 ? "text-brand" : "")} onClick={() => step >= 6 && setStep(6)}>Year</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className={clsx(step === 7 ? "text-brand" : "")}>Result</span>
        </div>
        
        <button onClick={resetFinder} className="text-gray-500 hover:text-brand flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors shrink-0 ml-4">
          <RotateCcw size={14} /> Start Over
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col relative min-h-[350px]">
        {loading && (
          <div className="absolute inset-0 z-10 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <Loader2 size={40} className="animate-spin text-brand mb-4" />
            <p className="text-foreground font-bold tracking-widest uppercase text-sm">{loadingText}</p>
          </div>
        )}

        {/* Step 1: Type */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Vehicle Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {types.map((vt) => (
                <button
                  key={vt.id}
                  onClick={() => handleTypeSelect(vt.id, vt.name)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-foreground group"
                >
                  <div className="text-gray-400 group-hover:text-brand transition-colors mb-3">
                    {getIconForType(vt.name)}
                  </div>
                  <span className="font-semibold text-sm text-center">{vt.name}</span>
                </button>
              ))}
            </div>
            {types.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-500">Database is currently empty.</div>
            )}
          </div>
        )}

        {/* Step 2: Brand */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Brand</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand.id, brand.name)}
                  className="py-4 px-6 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground flex flex-col items-center justify-center"
                >
                  <span>{brand.name}</span>
                </button>
              ))}
            </div>
            {brands.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-500 font-bold bg-surface-hover rounded-xl border border-border">No brands found for {selections.typeName}.</div>
            )}
          </div>
        )}

        {/* Step 3: Model */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select {selections.brandName} Model</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id, model.name)}
                  className="py-4 px-6 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground"
                >
                  {model.name}
                </button>
              ))}
            </div>
            {models.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-500 font-bold bg-surface-hover rounded-xl border border-border">No models found for {selections.brandName}.</div>
            )}
          </div>
        )}

        {/* Step 4: Variant */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Variant</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantSelect(variant.id, variant.name)}
                  className="py-4 px-6 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground flex flex-col"
                >
                  <span>{variant.name}</span>
                </button>
              ))}
            </div>
            {variants.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-500 font-bold bg-surface-hover rounded-xl border border-border">No variants found for {selections.modelName}.</div>
            )}
          </div>
        )}

        {/* Step 5: Fuel Type */}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Fuel Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fuels.map((fuel) => (
                <button
                  key={fuel.id}
                  onClick={() => handleFuelSelect(fuel.id, fuel.name)}
                  className="py-4 px-6 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground"
                >
                  {fuel.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Year */}
        {step === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-lg font-bold mb-6 text-center text-foreground">Select Year</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-[250px] overflow-y-auto pr-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className="py-3 px-4 border-2 border-border rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center font-bold text-foreground text-sm"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Result - Success */}
        {step === 7 && recommendedProduct && (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <h4 className="text-xl font-bold mb-6 text-center text-foreground uppercase tracking-widest text-sm">Your Recommended Goodwin Battery</h4>
            
            <div className="w-full max-w-2xl bg-background border-2 border-brand/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand text-white px-4 py-1 text-xs font-bold rounded-bl-lg">VERIFIED MATCH</div>
              
              <div className="w-48 h-48 bg-surface rounded-xl flex items-center justify-center shrink-0 border border-border p-4 relative z-10">
                {recommendedProduct.image ? (
                  <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-contain" />
                ) : (
                  <Battery size={64} className="text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left relative z-10">
                <span className="text-brand font-bold text-sm tracking-widest uppercase mb-1 block">{recommendedProduct.series || "Standard"} Series</span>
                <h5 className="text-3xl font-heading font-bold text-foreground mb-4">{recommendedProduct.name}</h5>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-surface px-3 py-2 rounded-lg border border-border text-center">
                    <span className="text-xs text-gray-500 block mb-0.5 uppercase tracking-wider">Capacity</span>
                    <span className="font-bold text-foreground">{recommendedProduct.ah || "N/A"}</span>
                  </div>
                  <div className="bg-surface px-3 py-2 rounded-lg border border-border text-center">
                    <span className="text-xs text-gray-500 block mb-0.5 uppercase tracking-wider">Voltage</span>
                    <span className="font-bold text-foreground">{recommendedProduct.voltage || "N/A"}</span>
                  </div>
                  <div className="bg-brand/10 px-3 py-2 rounded-lg border border-brand/20 text-center sm:col-span-1 col-span-2">
                    <span className="text-xs text-brand block mb-0.5 uppercase tracking-wider">Warranty</span>
                    <span className="font-bold text-brand">{recommendedProduct.warranty_options?.length ? recommendedProduct.warranty_options.join(" / ") : (recommendedProduct.warranty || "N/A")}</span>
                  </div>
                </div>

                <div className="bg-surface-hover rounded p-3 mb-6 border border-border text-xs text-gray-500 text-left">
                  <span className="font-bold block text-foreground mb-1">Recommended for:</span>
                  {selections.brandName} {selections.modelName} {selections.variantName} {selections.year !== "All Years" && selections.year ? `(${selections.year})` : ""}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/products/${recommendedProduct.slug}`} className="bg-background border-2 border-border text-foreground hover:border-brand hover:text-brand px-6 py-3 rounded-lg font-bold w-full transition-all text-center flex-1">
                    View Product
                  </Link>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-brand text-white hover:bg-brand-dark px-6 py-3 rounded-lg font-bold w-full transition-all flex items-center justify-center gap-2 flex-1 shadow-lg shadow-brand/20">
                    <Phone size={18} /> Enquire
                  </a>
                </div>
              </div>
            </div>

            {/* Optional Lead Capture */}
            {!leadSubmitted && (
              <div className="w-full max-w-2xl mt-8 bg-surface border border-border rounded-2xl p-6">
                <h5 className="font-bold text-foreground mb-2">Want help with your battery?</h5>
                <p className="text-sm text-gray-500 mb-4">Leave your details and a Goodwin expert will guide you.</p>
                <form onSubmit={submitLead} className="flex flex-col sm:flex-row gap-3">
                  <input type="text" placeholder="Name" required value={leadForm.name} onChange={e=>setLeadForm({...leadForm, name: e.target.value})} className="flex-1 bg-background border border-border rounded-lg p-3 text-sm text-foreground" />
                  <input type="tel" placeholder="Phone Number" required value={leadForm.phone} onChange={e=>setLeadForm({...leadForm, phone: e.target.value})} className="flex-1 bg-background border border-border rounded-lg p-3 text-sm text-foreground" />
                  <button type="submit" disabled={leadSubmitting} className="bg-foreground text-background px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap disabled:opacity-50">
                    {leadSubmitting ? "Saving..." : "Get Assistance"}
                  </button>
                </form>
              </div>
            )}
            
            {leadSubmitted && (
              <div className="w-full max-w-2xl mt-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center text-green-600 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 size={20} /> Details saved! We will contact you shortly.
              </div>
            )}
          </div>
        )}

        {/* Step 7: Empty State / No Match */}
        {step === 7 && !recommendedProduct && (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-10">
            <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-6">
              <Info size={32} className="text-brand" />
            </div>
            <h4 className="text-2xl font-heading font-bold mb-4 text-center text-foreground uppercase tracking-wider">We couldn't find a verified match</h4>
            <p className="text-gray-500 mb-8 max-w-md text-center leading-relaxed">
              We don't want to recommend the wrong battery. Please contact Goodwin Batteries and our team will confirm the correct battery for your <strong>{selections.brandName} {selections.modelName} {selections.variantName}</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-brand text-white hover:bg-brand-dark px-6 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
                <Phone size={20} /> WhatsApp Goodwin
              </a>
              <a href={`tel:${settings?.phone_sales || "+919667724411"}`} className="bg-surface border-2 border-border text-foreground hover:border-brand hover:text-brand px-6 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2">
                <Phone size={20} /> Call Sales
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
