"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Phone, Calendar, Search } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    setLoading(true);
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (data) setEnquiries(data);
    setLoading(false);
  }

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'New' ? 'Contacted' : currentStatus === 'Contacted' ? 'Resolved' : 'New';
    await supabase.from("enquiries").update({ status: newStatus }).eq("id", id);
    fetchEnquiries();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Enquiries & Leads</h1>
          <p className="text-muted-foreground">View incoming messages from Contact and Quick Enquiry forms.</p>
        </div>
        <div className="bg-surface border border-border rounded-lg flex items-center px-4 py-2 w-full md:w-auto">
          <Search size={18} className="text-muted-foreground mr-2 shrink-0" />
          <input type="text" placeholder="Search enquiries..." className="bg-transparent text-foreground focus:outline-none w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-brand/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{enquiry.name}</h3>
                  <button 
                    onClick={() => updateStatus(enquiry.id, enquiry.status)}
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                      enquiry.status === 'New' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      enquiry.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}
                  >
                    {enquiry.status}
                  </button>
                </div>
                <h4 className="text-brand font-semibold text-sm uppercase tracking-wider">{enquiry.subject}</h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-background border border-border px-3 py-1.5 rounded">
                <Calendar size={14} />
                {new Date(enquiry.created_at).toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-background border border-border rounded-lg text-muted-foreground mb-4 whitespace-pre-wrap leading-relaxed">
              {enquiry.message || "No message content."}
            </div>

            <div className="flex flex-wrap gap-6 border-t border-border pt-4">
              <a href={`tel:+91${enquiry.mobile}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors font-mono">
                <Phone size={16} className="text-muted-foreground" />
                +91 {enquiry.mobile}
              </a>
              {enquiry.email && (
                <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors">
                  <Mail size={16} className="text-muted-foreground" />
                  {enquiry.email}
                </a>
              )}
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="bg-surface border border-border rounded-xl p-12 text-center text-muted-foreground">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>No enquiries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
