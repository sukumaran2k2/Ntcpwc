"use client";

import { motion } from "framer-motion";
import { Anchor, Waves, Navigation, Leaf, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Anchor,
  Waves,
  Navigation,
  Leaf,
  BarChart3,
  GraduationCap,
};

export default function ServiceCards() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#00b4d8] uppercase tracking-wider">
            Technological Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2240] font-display mt-1">
            Specialized Capabilities & Technical Services
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Comprehensive ocean, port, and waterway solutions backed by IIT Madras research faculty and high-precision laboratories.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Anchor;
            return (
              <AnimatedSection key={service.id} delay={i * 0.05} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col h-full p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400/80 hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0a2240] leading-snug group-hover:text-[#0077b6] transition-colors mb-2 font-display">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-[#0a3d6b] group-hover:text-[#00b4d8]">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
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
