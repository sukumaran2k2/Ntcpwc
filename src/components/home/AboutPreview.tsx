"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, BookOpen, Anchor, FileCheck2, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CountUp from "@/components/ui/CountUp";

const institutionalStats = [
  {
    value: 156,
    suffix: "+",
    label: "Publications & Patents",
    sub: "Peer-reviewed international research",
    icon: BookOpen,
    color: "#0a3d6b",
  },
  {
    value: 42,
    suffix: "+",
    label: "Active Major Port Projects",
    sub: "Major ports & Sagarmala corridor",
    icon: Anchor,
    color: "#00b4d8",
  },
  {
    value: 89,
    suffix: "+",
    label: "Technical Guidelines Published",
    sub: "Adopted by Indian port authorities",
    icon: FileCheck2,
    color: "#10b981",
  },
  {
    value: 25,
    suffix: "+",
    label: "Years of Academic Heritage",
    sub: "Rooted in IIT Madras Ocean Eng.",
    icon: Award,
    color: "#f59e0b",
  },
];

const highlights = [
  "Centre of Excellence under Sagarmala Programme",
  "Physical 3D Wave Basin & 2D Hydraulic Wave Flumes",
  "Numerical Modeling Suite (DELFT3D, MIKE, OpenFOAM)",
  "Real-Time Coastal Monitoring Network across 2,000+ km",
];

export default function AboutPreview() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7">
            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#0a3d6b] text-xs font-bold uppercase tracking-wider mb-5">
                <ShieldCheck className="w-4 h-4 text-[#00b4d8]" />
                <span>Centre of Excellence · Sagarmala Programme</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2240] font-display tracking-tight leading-[1.15] mb-6">
                India&apos;s Apex Technology Centre for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a3d6b] via-[#0077b6] to-[#00b4d8]">
                  Maritime & Coastal Engineering
                </span>
              </h2>

              <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6 font-normal">
                The <strong>National Technology Centre for Ports, Waterways and Coasts (NTCPWC)</strong> was established under the Ministry of Ports, Shipping and Waterways at the <strong>IIT Madras Discovery Campus</strong>. Serving as the primary technological arm of the Government of India, the centre provides breakthrough indigenous R&D, physical flume modeling, and ocean computational simulations for safe, economical, and climate-resilient waterways.
              </p>

              {/* Bullet highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00b4d8] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {institutionalStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/70 shadow-xs flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Icon className="w-4.5 h-4.5 text-[#0a3d6b]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#0a2240] font-display leading-tight">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-1 leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  id="about-learn-more-btn"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0a3d6b] hover:bg-[#062740] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Explore Centre Overview & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/facilities"
                  id="about-facilities-btn"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all duration-200 border border-slate-200"
                >
                  <span>View Lab Infrastructure</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Facility / Lab Video Card */}
          <div className="lg:col-span-5">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="relative">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#0a3d6b]/20 to-[#00b4d8]/20 blur-lg -z-10" />

                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group cursor-pointer"
                  onClick={() => setVideoOpen(true)}
                >
                  {/* Real Maritime Hydraulic Lab Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
                    alt="NTCPWC Hydraulic Wave Basin and Testing Facility"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a30] via-[#061a30]/40 to-transparent" />

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-18 h-18 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/80 flex items-center justify-center shadow-2xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#00b4d8] text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Video Metadata Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#0a3d6b]/90 border border-blue-400/30 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 mb-2">
                      Official Overview
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm font-display">
                      Inside NTCPWC: Wave Basins & Ship Simulators
                    </h3>
                    <p className="text-blue-200 text-xs mt-1">
                      Discovery Campus, Thaiyur · IIT Madras
                    </p>
                  </div>
                </div>

                {/* Micro info pill below */}
                <div className="mt-4 flex items-center justify-between px-3 text-xs text-slate-500 font-medium">
                  <span>🎥 High-Definition Virtual Tour</span>
                  <span>Accredited by PIANC & MoPSW</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-white/20">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              ✕ Close Video
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="NTCPWC Overview"
              allow="autoplay; encrypted-media"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
