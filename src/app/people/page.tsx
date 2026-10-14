import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { teamMembers } from "@/lib/data";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "People & Leadership | NTCPWC",
  description: "Leadership team, domain heads, researchers, and technical faculty at NTCPWC IIT Madras.",
};

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#291e13] font-sans antialiased selection:bg-[#c29b68]/30 selection:text-[#291e13]">
      <Navbar />
      
      <main className="pt-24 sm:pt-28">
        {/* HERO SECTION IN WARM SANDSTONE */}
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
                <span>SCIENTIFIC &amp; ENGINEERING FACULTY • IIT MADRAS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Leadership &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Domain Heads</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                World-class scientists, ocean engineers, and research faculty from IIT Madras leading indigenous maritime research and national port advisory.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* TEAM GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {teamMembers.map((member, i) => (
                <AnimatedSection key={member.name} delay={i * 0.08}>
                  <div className="group rounded-2xl overflow-hidden bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-xl transition-all duration-300 flex flex-col h-full text-center hover:-translate-y-1">
                    <div className="relative h-64 bg-[#241a12] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#6e4e2a] text-[11px] font-bold border border-[#e8ded0]">
                          IIT Madras
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-[#291e13] font-display mb-1 group-hover:text-[#b45309] transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-[#8c6d46] mb-2">
                        {member.title}
                      </div>
                      <div className="text-xs text-[#736353] leading-relaxed mb-4">
                        {member.qualification}
                      </div>
                      
                      <div className="mt-auto border-t border-[#f0e6d8] pt-4 flex items-center justify-center gap-2 text-[#8c6d46]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium text-[#736353]">
                          Dept. of Ocean Engineering
                        </span>
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
