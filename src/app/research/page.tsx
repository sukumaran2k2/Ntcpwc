"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { researchAreas } from "@/lib/data";
import { ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Infrastructure", "Coastal", "Marine", "Environment"];

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? researchAreas
      : researchAreas.filter((a) => a.category === activeCategory);

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
                <span>INDIGENOUS R&amp;D FOR NATIONAL INFRASTRUCTURE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Ocean Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Research</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Advancing India&apos;s maritime frontier through multidisciplinary ocean research, hydraulic scale models, and climate-resilient coastal protection systems.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FILTER BAR & GRID */}
        <section className="py-12 md:py-20 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8c6d46] mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>CATEGORIES:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#8c6d46] text-white shadow-xs"
                      : "bg-white text-[#6b5847] border border-[#d8cbbb] hover:border-[#8c6d46] hover:text-[#291e13]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((area) => (
                  <div
                    key={area.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#e8ded0] hover:border-[#c29b68] flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative h-52 overflow-hidden bg-[#241a12]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/75 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-[#f4ece0] text-[#7a5933] border border-[#dfd2be] text-xs font-bold shadow-xs">
                          {area.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#6e4e2a] text-[11px] font-bold rounded-full border border-[#e8ded0]">
                          {area.projects} Active Projects
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-lg font-bold text-[#291e13] font-display mb-2 group-hover:text-[#b45309] transition-colors">
                        {area.title}
                      </h2>
                      <p className="text-[#5e5042] text-sm leading-relaxed mb-6 flex-1">
                        {area.description}
                      </p>
                      
                      <div className="border-t border-[#f0e6d8] pt-4 mt-auto">
                        <Link
                          href={`/research/${area.id}`}
                          className="flex items-center gap-2 text-[#8c6d46] font-semibold text-xs hover:text-[#b45309] transition-colors group/link"
                        >
                          <span>Explore Research Domain</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
