"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { publications } from "@/lib/data";
import { Download, Search, Calendar } from "lucide-react";

const tabs = ["All", "Technical Reports", "Research Papers", "Project Reports", "Guidelines"];
const tabKeys: Record<string, string> = {
  All: "all",
  "Technical Reports": "technical",
  "Research Papers": "research",
  "Project Reports": "technical",
  Guidelines: "guidelines",
};

const typeBadgeStyles: Record<string, string> = {
  "Technical Report": "bg-[#f4ece0] text-[#7a5933] border-[#dfd2be]",
  "Research Paper": "bg-[#fdf3e7] text-[#b45309] border-[#f6d7b0]",
  "Project Report": "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
  Guidelines: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
};

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = publications.filter((p) => {
    const matchesTab = activeTab === "All" || p.category === tabKeys[activeTab];
    const matchesSearch =
      !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
                <span>KNOWLEDGE REPOSITORY • TECHNICAL MONOGRAPHS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Publications &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Reports</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Access peer-reviewed research papers, port technical monographs, project findings, and national maritime engineering standards.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* SEARCH & FILTER */}
        <section className="py-12 md:py-20 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#8c6d46] text-white shadow-xs"
                        : "bg-white text-[#6b5847] border border-[#d8cbbb] hover:border-[#8c6d46] hover:text-[#291e13]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#8c6d46] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-[#d8cbbb] focus:border-[#8c6d46] focus:ring-1 focus:ring-[#8c6d46] text-[#291e13] placeholder-[#9c8b7c] outline-hidden transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Publication Cards */}
            <div className="space-y-4">
              {filtered.map((pub, idx) => {
                const badgeStyle = typeBadgeStyles[pub.type] || "bg-[#f4ece0] text-[#7a5933] border-[#dfd2be]";
                return (
                  <AnimatedSection key={idx} delay={idx * 0.04}>
                    <div className="p-6 rounded-2xl bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle}`}>
                            {pub.type}
                          </span>
                          <span className="text-xs text-[#736353] flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#8c6d46]" />
                            {pub.year}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#291e13] font-display hover:text-[#b45309] transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-xs text-[#5e5042]">
                          <strong className="text-[#382a1c]">Authors:</strong> {pub.authors} &bull; <strong className="text-[#382a1c]">Publisher:</strong> {pub.journal}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button className="px-4 py-2 rounded-xl bg-[#faf6f0] hover:bg-[#8c6d46] text-[#6e4e2a] hover:text-white font-semibold text-xs border border-[#d8cbbb] hover:border-[#8c6d46] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs">
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
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
