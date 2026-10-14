import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { facilities } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities & Laboratories | NTCPWC",
  description: "World-class hydraulic laboratories, wave flumes, numerical modeling centre, and field survey capabilities at NTCPWC IIT Madras.",
};

const categoryBadgeStyles: Record<string, string> = {
  Hydraulic: "bg-[#f4ece0] text-[#7a5933] border-[#dfd2be]",
  Numerical: "bg-[#fdf3e7] text-[#b45309] border-[#f6d7b0]",
  "Field Survey": "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
  Laboratory: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
};

export default function FacilitiesPage() {
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
                <span>20-ACRE DISCOVERY CAMPUS TESTBED • IIT MADRAS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Facilities</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                State-of-the-art wave basins, high-discharge flumes, autonomous survey vessels, and High-Performance Computing clusters built for India&apos;s maritime growth.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FACILITIES GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, i) => {
                const badgeStyle = categoryBadgeStyles[facility.category] || "bg-[#f4ece0] text-[#7a5933] border-[#dfd2be]";
                return (
                  <AnimatedSection key={facility.id} delay={i * 0.08} id={facility.id}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#e8ded0] hover:border-[#c29b68] h-full flex flex-col hover:-translate-y-1">
                      <div className="relative h-52 overflow-hidden bg-[#241a12]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={facility.image}
                          alt={facility.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/75 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeStyle}`}>
                            {facility.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-[#291e13] text-lg font-display mb-2 group-hover:text-[#b45309] transition-colors">
                          {facility.title}
                        </h3>
                        <p className="text-[#5e5042] text-sm leading-relaxed mb-6 flex-1">
                          {facility.description}
                        </p>
                        
                        <div className="border-t border-[#f0e6d8] pt-4 mt-auto">
                          <p className="text-[11px] font-bold text-[#8c6d46] uppercase tracking-wider mb-3">
                            Key Specifications
                          </p>
                          <ul className="space-y-2">
                            {facility.specs.map((spec, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-[#5e5042]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] mt-0.5 flex-shrink-0" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
