import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { newsEvents } from "@/lib/data";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | NTCPWC",
  description: "Latest announcements, research milestones, conferences, and events from NTCPWC IIT Madras.",
};

export default function NewsEventsPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#291e13] font-sans antialiased selection:bg-[#c29b68]/30 selection:text-[#291e13]">
      <Navbar />
      
      <main className="pt-24 sm:pt-28">
        {/* HERO */}
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
                <span>UPDATES &amp; INSTITUTIONAL MILESTONES</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                News &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Events</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Stay informed on key technological achievements, major port project handovers, international delegations, and maritime symposia.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* NEWS & EVENTS GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsEvents.map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.08}>
                  <div className="group rounded-2xl overflow-hidden bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                    <div className="relative h-48 bg-[#241a12] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/75 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#f4ece0] text-[#7a5933] border border-[#dfd2be] text-[11px] font-bold shadow-xs">
                          {item.type}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90">
                        <Calendar className="w-3.5 h-3.5 text-[#deb887]" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#291e13] font-display mb-2 group-hover:text-[#b45309] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5e5042] leading-relaxed mb-6 flex-1">
                        {item.summary}
                      </p>

                      <div className="border-t border-[#f0e6d8] pt-4 mt-auto">
                        <Link
                          href={`/news-events/${item.id}`}
                          className="flex items-center gap-2 text-[#8c6d46] font-semibold text-xs hover:text-[#b45309] transition-colors group/link"
                        >
                          <span>Read Full Release</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
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
