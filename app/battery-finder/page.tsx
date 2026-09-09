import VehicleFinder from "@/components/vehicle-finder/VehicleFinder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find the Right Battery for Your Vehicle | Goodwin Batteries",
  description: "Find the right Goodwin battery for your motorcycle or scooter. Select your vehicle brand, model, variant and year to find a compatible Goodwin battery.",
};

export default function FindYourBatteryPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <section className="bg-[#09090b] py-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/5 blur-[100px] pointer-events-none" />
        <div className="container relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            FIND YOUR <span className="text-brand">BATTERY</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Use our intelligent battery finder to discover the perfect power solution for your specific vehicle and requirements.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background flex-1">
        <div className="container max-w-5xl">
          <VehicleFinder />
        </div>
      </section>
    </div>
  );
}
