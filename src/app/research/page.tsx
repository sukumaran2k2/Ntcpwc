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
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-6xl font-black text-white font-display mb-4">
                Research <span className="gradient-text">Areas</span>
              </h1>
              <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                Advancing India&apos;s maritime sector through multidisciplinary research and innovation.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filter & Cards */}
        <section className="section-padding bg-[#f8fafc]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <AnimatedSection className="flex flex-wrap items-center gap-3 mb-10">
              <Filter className="w-4 h-4 text-gray-400" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`research-filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#0a3d6b] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </AnimatedSection>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filtered.map((area, i) => (
                  <motion.div
                    key={area.id}
                    id={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2240]/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-[#00b4d8] text-white text-xs font-semibold rounded-full">
                          {area.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1.5 bg-black/40 text-white text-xs rounded-full backdrop-blur-sm">
                          {area.projects} Active Projects
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#0a2240] font-display mb-3 group-hover:text-[#0a3d6b] transition-colors">
                        {area.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">{area.description}</p>
                      <Link
                        href={`/research/${area.id}`}
                        className="flex items-center gap-2 text-[#0a3d6b] font-semibold text-sm hover:text-[#00b4d8] transition-colors group"
                      >
                        Explore Research
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
