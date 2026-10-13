"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { publications } from "@/lib/data";
import { Download, Search, Calendar, FileText, Filter } from "lucide-react";

const tabs = ["All", "Technical Reports", "Research Papers", "Project Reports", "Guidelines"];
const tabKeys: Record<string, string> = {
  All: "all",
  "Technical Reports": "technical",
  "Research Papers": "research",
  "Project Reports": "technical",
  Guidelines: "guidelines",
};

const typeColors: Record<string, string> = {
  "Technical Report": "bg-blue-100 text-blue-700",
  "Research Paper": "bg-purple-100 text-purple-700",
  "Project Report": "bg-teal-100 text-teal-700",
  Guidelines: "bg-amber-100 text-amber-700",
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
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-6xl font-black text-white font-display mb-4">
                Publications <span className="gradient-text">&amp; Reports</span>
              </h1>
              <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                Browse our library of technical reports, research papers, project reports, and guidelines.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="publications-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search publications..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b]"
                />
              </div>
              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    id={`pub-filter-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-[#0a3d6b] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="section-padding bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm text-gray-500 mb-6">
              Showing {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + search}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filtered.map((pub, i) => (
                  <motion.div
                    key={pub.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#0a3d6b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeColors[pub.type] || "bg-gray-100 text-gray-600"}`}>
                          {pub.type}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${pub.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {pub.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#0a2240] text-sm group-hover:text-[#0a3d6b] transition-colors">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {pub.date}
                        <span>·</span>
                        <span>{pub.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    <button
                      id={`pub-dl-${pub.id}`}
                      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[#0a3d6b] text-white text-xs font-semibold rounded-xl hover:bg-[#1a5fa8] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-20 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No publications found matching your search.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
