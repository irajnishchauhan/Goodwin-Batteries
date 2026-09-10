import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Save, Loader2 } from "lucide-react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: any;
  onSuccess: () => void;
}

export default function ClaimModal({ isOpen, onClose, claim, onSuccess }: ClaimModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    customer_name: "",
    mobile: "",
    warranty_id: "",
    serial_number: "",
    dealer_name: "",
    issue_description: "",
    status: "",
    admin_notes: ""
  });

  useEffect(() => {
    if (claim) {
      setFormData({
        customer_name: claim.customer_name || "",
        mobile: claim.mobile || "",
        warranty_id: claim.warranty_id || "",
        serial_number: claim.serial_number || "",
        dealer_name: claim.dealer_name || "",
        issue_description: claim.issue_description || "",
        status: claim.status || "Pending Review",
        admin_notes: claim.admin_notes || ""
      });
    }
    setError("");
  }, [claim, isOpen]);

  if (!isOpen || !claim) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("warranty_claims")
        .update({
          customer_name: formData.customer_name,
          mobile: formData.mobile,
          warranty_id: formData.warranty_id,
          serial_number: formData.serial_number,
          dealer_name: formData.dealer_name,
          issue_description: formData.issue_description,
          status: formData.status,
          admin_notes: formData.admin_notes
        })
        .eq("id", claim.id);

      if (updateError) throw updateError;
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl relative my-8">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Edit Warranty Claim</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">{claim.id}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Customer Name</label>
              <input required type="text" value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Mobile</label>
              <input required type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground font-mono" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground appearance-none">
                <option value="Pending Review">Pending Review</option>
                <option value="Under Inspection">Under Inspection</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Dealer Name</label>
              <input type="text" value={formData.dealer_name} onChange={(e) => setFormData({...formData, dealer_name: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Warranty ID</label>
              <input type="text" value={formData.warranty_id} onChange={(e) => setFormData({...formData, warranty_id: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground font-mono" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Serial Number</label>
              <input required type="text" value={formData.serial_number} onChange={(e) => setFormData({...formData, serial_number: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground font-mono uppercase" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-muted-foreground mb-1">Issue Description</label>
              <textarea required rows={4} value={formData.issue_description} onChange={(e) => setFormData({...formData, issue_description: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-muted-foreground mb-1">Admin Notes (Reason for Rejection, Internal Comments)</label>
              <textarea rows={3} value={formData.admin_notes} onChange={(e) => setFormData({...formData, admin_notes: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-foreground" placeholder="These notes will be visible to the customer when checking status." />
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded font-bold text-foreground bg-background border border-border hover:bg-surface-hover">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 rounded font-bold text-white bg-brand hover:bg-brand-dark flex items-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
