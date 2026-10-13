"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Calendar, FileText } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { publications } from "@/lib/data";

const tabs = ["All", "Technical Reports", "Research Papers", "Guidelines"];
const tabKeys: Record<string, string> = {
  All: "all",
  "Technical Reports": "technical",
  "Research Papers": "research",
  Guidelines: "guidelines",
};

const typeColors: Record<string, string> = {
  "Technical Report": "bg-blue-100 text-blue-700",
  "Research Paper": "bg-purple-100 text-purple-700",
  "Project Report": "bg-teal-100 text-teal-700",
  Guidelines: "bg-amber-100 text-amber-700",
};

export default function LatestPublications() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? publications
      : publications.filter((p) => p.category === tabKeys[activeTab]);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-[#00b4d8]" />
              <span className="text-[#00b4d8] text-xs font-semibold tracking-widest uppercase">Publications</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a2240] font-display leading-tight">
              Latest Publications
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <Link
              href="/publications"
              id="publications-view-all-btn"
              className="flex items-center gap-2 text-[#0a3d6b] font-semibold hover:text-[#00b4d8] transition-colors text-sm whitespace-nowrap"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                id={`pub-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#0a3d6b] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Publication cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.slice(0, 4).map((pub, i) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-100 transition-all card-hover"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      typeColors[pub.type] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {pub.type}
                  </span>
                  <FileText className="w-5 h-5 text-gray-300 group-hover:text-[#0a3d6b] transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#0a2240] leading-snug mb-3 group-hover:text-[#0a3d6b] transition-colors">
                  {pub.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {pub.date}
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      pub.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {pub.status}
                  </span>
                </div>

                {/* Download */}
                <button
                  id={`pub-download-${pub.id}`}
                  className="flex items-center gap-2 text-[#0a3d6b] text-xs font-semibold hover:text-[#00b4d8] transition-colors group"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
