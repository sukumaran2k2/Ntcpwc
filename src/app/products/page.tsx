import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Indigenous Products & Technologies | NTCPWC",
  description: "Proprietary maritime monitoring systems, autonomous surface vessels, and numerical modeling suites developed by NTCPWC.",
};

const productsList = [
  {
    id: "usv",
    title: "Indigenous Autonomous Survey Vessel (USV)",
    category: "Autonomous Systems",
    desc: "Uncrewed surface vessel equipped with dual-frequency multi-beam echo sounders, autonomous obstacle avoidance, and real-time telemetry for inland waterways and port approaches.",
    specs: ["Hull: Carbon-composite catamaran", "Endurance: 8+ hours electric", "Payload: MBES, ADCP, LiDAR", "Navigation: RTK-GPS + INS"],
    badge: "Operational",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "monitoring",
    title: "Real-Time Coastal Monitoring Network",
    category: "Ocean Instrumentation",
    desc: "Telemetry network deployed along 2,000 km of Indian coast transmitting wave climate, sea level variations, and sediment dynamics to central MoPSW dashboard.",
    specs: ["Sensors: Acoustic wave gauges, radar tide probes", "Transmission: Satellite / 4G telemetry", "Update Interval: 15 minutes", "Coverage: Major ports"],
    badge: "Field Proven",
    image: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dredging",
    title: "AI-Powered Dredging Optimization Suite",
    category: "Software & Analytics",
    desc: "Predictive siltation algorithm combining hydrodynamic flume models with machine learning to optimize dredger deployment and annual maintenance budgets.",
    specs: ["Model: Flume calibrated AI/ML", "Accuracy: >92% volume prediction", "Supported Ports: Chennai, Haldia, Cochin", "Export: PDF/GIS format"],
    badge: "Sagarmala Patented",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "basin-sim",
    title: "Digital Twin Port Wave Simulator",
    category: "Digital Twins",
    desc: "3D digital representation of harbor basins and container terminals simulating vessel maneuvering in varying sea states, tidal currents, and extreme cyclones.",
    specs: ["Engine: 3D hydrodynamic flume solver", "Vessel Types: Capesize, ULCS, Barges", "Displays: 360-degree immersive bridge", "Accuracy: Class-A approved"],
    badge: "R&D Prototype",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#291e13] font-sans antialiased selection:bg-[#c29b68]/30 selection:text-[#291e13]">
      <Navbar />
      
      <main className="pt-24 sm:pt-28">
        {/* HERO SECTION */}
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#f5ede1] via-[#faf5ec] to-[#fcfaf7] border-b border-[#e8ded0] overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#8c6d46 1px, transparent 1px), linear-gradient(90deg, #8c6d46 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d8cbbb] text-xs font-bold text-[#b45309] shadow-xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#b45309] animate-pulse" />
                <span>MAKE IN INDIA • SAGARMALA TECHNOLOGY INNOVATION</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Indigenous <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Products &amp; Systems</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Cutting-edge ocean instrumentation, autonomous survey robotics, and digital twin simulation tools engineered at IIT Madras.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productsList.map((prod, i) => (
                <AnimatedSection key={prod.id} delay={i * 0.08}>
                  <div id={prod.id} className="rounded-2xl overflow-hidden bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                    <div className="relative h-60 bg-[#241a12] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/75 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#f4ece0] text-[#7a5933] border border-[#dfd2be] text-xs font-bold shadow-xs">
                        {prod.category}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#b45309] font-bold text-xs border border-[#e8ded0] shadow-xs">
                        {prod.badge}
                      </div>
                    </div>
                    
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#291e13] font-display mb-2 group-hover:text-[#b45309] transition-colors">
                        {prod.title}
                      </h3>
                      <p className="text-sm text-[#5e5042] leading-relaxed mb-6">
                        {prod.desc}
                      </p>
                      
                      <div className="mt-auto border-t border-[#f0e6d8] pt-4">
                        <h4 className="text-[11px] font-bold uppercase text-[#8c6d46] tracking-wider mb-3">
                          Technical Specifications
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5e5042]">
                          {prod.specs.map((s, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] shrink-0" />
                              <span className="truncate">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
