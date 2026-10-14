"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe, FlaskConical } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Safety & Reliability",
    description: "Every recommendation backed by rigorous field surveys and validated numerical models.",
    color: "#0a3d6b",
  },
  {
    icon: Globe,
    title: "Sustainable Development",
    description: "Balancing infrastructure growth with environmental preservation of coastal ecosystems.",
    color: "#00b4d8",
  },
  {
    icon: FlaskConical,
    title: "Scientific Excellence",
    description: "World-class laboratories and international collaborations driving cutting-edge research.",
    color: "#2dd4bf",
  },
];

export default function MissionStrip() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=50"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#00b4d8]" />
            <span className="text-[#00b4d8] text-xs font-semibold tracking-widest uppercase">Our Mission</span>
            <div className="w-8 h-0.5 bg-[#00b4d8]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white font-display mb-4">
            Safer Coasts. Smarter Waterways.{" "}
            <span className="gradient-text">Stronger Nation.</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Providing scientific, technical and advisory services to the national maritime sector through world-class research and innovation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection key={pillar.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-7 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${pillar.color}40` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: pillar.color === "#0a3d6b" ? "#00b4d8" : pillar.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-3">{pillar.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
