import { supabase } from "./supabase";
import { Product, Category, VehicleType, VehicleBrand, VehicleModel, VehicleVariant, Dealer } from "@/types";
import { unstable_cache } from "next/cache";

// ==========================================
// GLOBAL SETTINGS
// ==========================================
export const getGlobalSettings = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("global_settings").select("*").single();
    if (error) {
      console.error("Error fetching global settings:", error);
      return null;
    }
    return data;
  },
  ['global-settings'],
  { revalidate: 3600, tags: ['global-settings'] }
);

// ==========================================
// PRODUCTS & CATEGORIES
// ==========================================
export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categories").select("*").order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    return data || [];
  },
  ['categories'],
  { revalidate: 3600, tags: ['categories'] }
);

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const { data, error } = await supabase.from("products").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }
    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      series: row.series,
      category: row.category_id,
      voltage: row.voltage,
      ah: row.ah,
      cca: row.cca,
      warranty: row.warranty,
      warranty_options: row.warranty_options,
      is_featured: row.is_featured,
      is_published: row.is_published,
      application: [], // We'll simplify this or fetch from an assoc table if needed
      image: row.image,
      description: row.description,
      features: row.features || [],
      terminalLayout: row.terminal_layout,
      dimensions: row.dimensions,
      weight: row.weight,
    }));
  },
  ['products'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).eq("is_published", true).single();
    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }
    return data ? { 
      id: data.id,
      name: data.name,
      slug: data.slug,
      series: data.series,
      category: data.category_id,
      voltage: data.voltage,
      ah: data.ah,
      cca: data.cca,
      warranty: data.warranty,
      warranty_options: data.warranty_options,
      is_featured: data.is_featured,
      is_published: data.is_published,
      application: [], 
      image: data.image,
      description: data.description,
      features: data.features || [],
      terminalLayout: data.terminal_layout,
      dimensions: data.dimensions,
      weight: data.weight
    } : null;
  },
  ['product-by-slug'],
  { revalidate: 3600, tags: ['products'] }
);

export const getApplications = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("applications").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
    return data || [];
  },
  ['applications'],
  { revalidate: 3600, tags: ['applications'] }
);

// ==========================================
// BATTERY FINDER
// ==========================================
export async function getVehicleTypes(): Promise<VehicleType[]> {
  const { data, error } = await supabase.from("vehicle_types").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle types:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleBrands(): Promise<VehicleBrand[]> {
  const { data, error } = await supabase.from("vehicle_brands").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle brands:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleModels(): Promise<VehicleModel[]> {
  const { data, error } = await supabase.from("vehicle_models").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle models:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleVariants(): Promise<VehicleVariant[]> {
  const { data, error } = await supabase.from("vehicle_variants").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle variants:", error);
    return [];
  }
  return data || [];
}

// ==========================================
// DEALERS
// ==========================================
export const getDealers = unstable_cache(
  async (): Promise<Dealer[]> => {
    const { data, error } = await supabase.from("dealers").select("*").eq("is_published", true);
    if (error) {
      console.error("Error fetching dealers:", error);
      return [];
    }
    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      city: row.city,
      state: row.state,
      pincode: row.pincode,
      phone: row.phone,
      openingHours: row.opening_hours,
      latitude: row.latitude,
      longitude: row.longitude,
    }));
  },
  ['dealers'],
  { revalidate: 3600, tags: ['dealers'] }
);

// ==========================================
// FAQS
// ==========================================
export const getFAQs = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("faqs").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
    return data || [];
  },
  ['faqs'],
  { revalidate: 3600, tags: ['faqs'] }
);
