"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealers();
  }, []);

  async function fetchDealers() {
    setLoading(true);
    const { data, error } = await supabase.from("dealers").select("*").order("created_at", { ascending: false });
    if (data) setDealers(data);
    setLoading(false);
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    await supabase.from("dealers").update({ is_published: !currentStatus }).eq("id", id);
    fetchDealers();
  };

  const deleteDealer = async (id: string) => {
    if (confirm("Are you sure you want to delete this dealer?")) {
      await supabase.from("dealers").delete().eq("id", id);
      fetchDealers();
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Dealers & Network</h1>
          <p className="text-muted-foreground">Manage your dealer and distributor locations.</p>
        </div>
        <button className="bg-brand text-white font-bold px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center gap-2">
          <Plus size={18} /> Add Dealer
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Dealer Name</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Location</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Contact</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Status</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer.id} className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-foreground">{dealer.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{dealer.address}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <div className="font-semibold">{dealer.city}, {dealer.state}</div>
                    <div className="text-xs text-muted-foreground">{dealer.pincode}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <div className="font-mono text-sm">{dealer.phone}</div>
                    <div className="text-xs text-muted-foreground">{dealer.opening_hours}</div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => togglePublish(dealer.id, dealer.is_published)} className="flex items-center gap-2">
                      {dealer.is_published ? (
                        <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14} /> Published</span>
                      ) : (
                        <span className="bg-gray-500/10 text-muted-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={14} /> Draft</span>
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-background border border-border rounded hover:text-brand transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => deleteDealer(dealer.id)} className="p-2 bg-background border border-border rounded hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {dealers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No dealers found. Add your first dealer.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
