export default function DealerDistributorPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <section className="bg-surface py-20 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-foreground mb-6">
            GROW WITH <span className="text-brand">GOODWIN</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Join the Goodwin network and build your business with a growing, premium battery brand.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">Business Enquiry Form</h2>
            
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input type="text" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Company Name</label>
                  <input type="text" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Phone / Mobile</label>
                  <input type="tel" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input type="email" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">City</label>
                  <input type="text" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">State</label>
                  <input type="text" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Business Type</label>
                  <select className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand">
                    <option value="">Select Type</option>
                    <option value="dealer">Become a Dealer</option>
                    <option value="distributor">Become a Distributor</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Years in Business</label>
                  <input type="number" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Current Brands Handled</label>
                <input type="text" className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Message / Enquiry Details</label>
                <textarea rows={4} className="bg-background border border-border rounded-lg p-4 text-foreground focus:outline-none focus:border-brand"></textarea>
              </div>

              <button type="button" className="mt-4 bg-brand text-white font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
