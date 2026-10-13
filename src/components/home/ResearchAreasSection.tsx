"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, Cpu, Leaf, Layers } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { researchAreas } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  "port-infrastructure": Layers,
  "coastal-offshore": Shield,
  "marine-geosciences": Compass,
  "environmental": Leaf,
};

export default function ResearchAreasSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 text-[#0a3d6b] text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>Core R&D Domains</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2240] font-display tracking-tight leading-tight">
              Flagship Maritime Research Areas
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-3">
              Delivering breakthrough technological intelligence, wave-flume physical simulations, and computational hydrodynamic modeling to India&apos;s maritime corridor.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="left">
            <Link
              href="/research"
              id="research-view-all-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0a3d6b] font-semibold text-sm border border-slate-200 shadow-xs hover:shadow-md transition-all group"
            >
              <span>View All 6 Specialized Domains</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {researchAreas.map((area, i) => {
            const Icon = iconMap[area.id] || Layers;
            return (
              <AnimatedSection key={area.id} delay={i * 0.08} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/80 via-transparent to-transparent" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a3d6b]/90 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/20">
                        <Icon className="w-3 h-3 text-[#00b4d8]" />
                        {area.category}
                      </span>
                    </div>

                    {/* Projects counter */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider">
                        {area.projects} Studies
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0a2240] text-lg font-display leading-snug group-hover:text-[#0077b6] transition-colors mb-2.5">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {area.description}
                    </p>

                    {/* Footer link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/research#${area.id}`}
                        id={`research-card-${area.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a3d6b] group-hover:text-[#00b4d8] transition-colors"
                      >
                        <span>Explore Domain</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-[11px] font-medium text-slate-400">
                        NTCPWC Lab
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
