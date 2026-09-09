"use client";

import { useState } from "react";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function QuickEnquiryForm() {
  const settings = useGlobalSettings();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
    vehicle: "",
    callbackTime: "",
    requirement: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const combinedMessage = `Requirement: ${formData.requirement}
Vehicle: ${formData.vehicle || 'Not specified'}
Preferred Callback: ${formData.callbackTime || 'Anytime'}`;

      // 1. Generate ID and save to database
      const id = `GW-ENQ-${Date.now().toString().slice(-6)}`;
      const { error } = await supabase.from("enquiries").insert({
        id,
        name: formData.name,
        mobile: formData.mobile,
        message: combinedMessage,
        subject: `Quick Enquiry from ${formData.city || 'Unknown City'}`,
      });

      if (error) {
        console.error("Failed to save enquiry:", error);
      }

      // 2. Generate WhatsApp message
      const text = `Hello Goodwin Batteries,
I have a Quick Enquiry.
Name: ${formData.name}
Mobile: ${formData.mobile}
City: ${formData.city}
Vehicle: ${formData.vehicle || "Not specified"}
Callback Time: ${formData.callbackTime || "Anytime"}
Requirement: ${formData.requirement || "General Enquiry"}

Please contact me regarding my enquiry.`;

      // 3. Open WhatsApp
      const whatsappNum = settings?.whatsapp_main?.replace(/\D/g, "") || "9667724411";
      window.open(`https://wa.me/91${whatsappNum}?text=${encodeURIComponent(text)}`, "_blank");

      // Reset form
      setFormData({ name: "", mobile: "", city: "", vehicle: "", callbackTime: "", requirement: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="text" 
        required
        placeholder="Your Name" 
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand" 
      />
      <input 
        type="tel" 
        required
        placeholder="Phone Number" 
        value={formData.mobile}
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand" 
      />
      <input 
        type="text" 
        placeholder="City" 
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand" 
      />
      <input 
        type="text" 
        placeholder="Vehicle Make/Model (Optional)" 
        value={formData.vehicle}
        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand" 
      />
      <select
        value={formData.callbackTime}
        onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand appearance-none"
      >
        <option value="" disabled>Preferred Callback Time</option>
        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
        <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
        <option value="Anytime">Anytime</option>
      </select>
      <textarea 
        placeholder="What are you looking for?" 
        value={formData.requirement}
        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
        className="w-full bg-[#18181b] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-brand resize-none h-24" 
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-white text-black font-bold uppercase tracking-wider p-4 rounded mt-2 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : "Submit Request"}
      </button>
    </form>
  );
}
