import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/lib/data";
import { Anchor, Waves, Navigation, Leaf, BarChart3, GraduationCap, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities | NTCPWC",
  description: "Specialized maritime and ocean engineering technical services provided by NTCPWC IIT Madras.",
};

const iconMap: Record<string, React.ElementType> = {
  Anchor,
  Waves,
  Navigation,
  Leaf,
  BarChart3,
  GraduationCap,
};

export default function ServicesPage() {
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
                <span>TECHNICAL ADVISOR TO 12 MAJOR PORTS • SAGARMALA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Services &amp; Solutions</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Comprehensive engineering advisory, physical hydraulic modeling, numerical hydrodynamic simulations, and techno-economic validation for ports and waterways.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] || Anchor;
                return (
                  <AnimatedSection key={service.id} delay={i * 0.06}>
                    <div id={service.id} className="h-full flex flex-col p-7 rounded-2xl bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#f4ece0] text-[#8c6d46] border border-[#dfd2be]">
                        <Icon className="w-6 h-6 text-[#755530]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#291e13] font-display mb-2 group-hover:text-[#b45309] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#5e5042] leading-relaxed flex-1 mb-6">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 text-xs text-[#736353] border-t border-[#f0e6d8] pt-4">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] flex-shrink-0" />
                          <span>Detailed Coastal &amp; Port Engineering Analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] flex-shrink-0" />
                          <span>Validated Flume &amp; Numerical Hydrodynamics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] flex-shrink-0" />
                          <span>Ministry &amp; Port Regulatory Compliance</span>
                        </li>
                      </ul>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
