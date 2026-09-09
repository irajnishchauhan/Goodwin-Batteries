"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2 } from "lucide-react";

export default function GlobalSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase.from("global_settings").select("*").single();
      if (data) {
        setSettings(data);
      } else {
        console.error("Error loading settings:", error);
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const { error } = await supabase
        .from("global_settings")
        .update({
          company_name: settings.company_name,
          tagline: settings.tagline,
          phone_support: settings.phone_support,
          phone_sales: settings.phone_sales,
          whatsapp_main: settings.whatsapp_main,
          email_support: settings.email_support,
          email_sales: settings.email_sales,
          address: settings.address,
          city: settings.city,
          state: settings.state,
          pincode: settings.pincode,
          google_maps_url: settings.google_maps_url,
          facebook_url: settings.facebook_url,
          instagram_url: settings.instagram_url,
          youtube_url: settings.youtube_url,
          updated_at: new Date().toISOString()
        })
        .eq("id", settings.id);

      if (error) throw error;
      setMessage({ text: "Settings saved successfully!", type: "success" });
    } catch (error: any) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;
  if (!settings) return <div className="p-12 text-center">Settings not found. Please ensure database schema is initialized.</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Global Settings</h1>
          <p className="text-muted-foreground">Manage company information, contact details, and social links.</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl mb-6 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 bg-surface border border-border rounded-xl p-8 shadow-sm">
        {/* Brand Details */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Brand Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Company Name</label>
              <input type="text" name="company_name" value={settings.company_name || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Official Tagline</label>
              <input type="text" name="tagline" value={settings.tagline || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Contact Numbers (10 digits)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Sales Phone</label>
              <input type="text" name="phone_sales" value={settings.phone_sales || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Support Phone</label>
              <input type="text" name="phone_support" value={settings.phone_support || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand mb-2">Main WhatsApp</label>
              <input type="text" name="whatsapp_main" value={settings.whatsapp_main || ""} onChange={handleChange} className="w-full bg-background border border-brand/50 rounded-xl p-3 text-foreground" />
              <p className="text-xs text-muted-foreground mt-1">Used for Quick Enquiries</p>
            </div>
          </div>
        </div>

        {/* Emails */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Email Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Sales Email</label>
              <input type="email" name="email_sales" value={settings.email_sales || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Support Email</label>
              <input type="email" name="email_support" value={settings.email_support || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Head Office Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-muted-foreground mb-2">Street Address / Area</label>
              <textarea name="address" value={settings.address || ""} onChange={handleChange} rows={2} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">City</label>
              <input type="text" name="city" value={settings.city || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">State</label>
              <input type="text" name="state" value={settings.state || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Pincode</label>
              <input type="text" name="pincode" value={settings.pincode || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Google Maps URL</label>
              <input type="text" name="google_maps_url" value={settings.google_maps_url || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" />
            </div>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Social Media & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Facebook URL</label>
              <input type="text" name="facebook_url" value={settings.facebook_url || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" placeholder="Leave blank to hide" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">Instagram URL</label>
              <input type="text" name="instagram_url" value={settings.instagram_url || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" placeholder="Leave blank to hide" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">YouTube URL</label>
              <input type="text" name="youtube_url" value={settings.youtube_url || ""} onChange={handleChange} className="w-full bg-background border border-border rounded-xl p-3 text-foreground" placeholder="Leave blank to hide" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-brand text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl hover:bg-brand-dark transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
