import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const res1 = await supabase.from("vehicle_types").select("*");
  console.log("Types:", res1.data, res1.error);
  
  const res2 = await supabase.from("vehicle_types").select("*").eq("active", true);
  console.log("Types with active:", res2.error);
  
  const res3 = await supabase.from("vehicle_brands").select("*");
  console.log("Brands:", res3.error);
  
  const res4 = await supabase.from("manufacturers").select("*");
  console.log("Manufacturers:", res4.data, res4.error);
}
test();
