'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Waves, 
  Building2, 
  Compass, 
  Radio, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface FeaturedWork {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string };
  href: string;
  accent: string;
  glowColor: string;
}

const featuredWorks: FeaturedWork[] = [
  {
    id: 'discovery-campus',
    category: 'CENTRE OF EXCELLENCE',
    title: 'IIT Madras Discovery Campus',
    subtitle: 'National Technology Arm under Sagarmala',
    description: 'World-class academic and testing infrastructure at Thaiyur, Chennai, dedicated to port modernization, inland waterways, and coastal protection.',
    image: '/images/ntcpwc/campus.jpg',
    tags: ['MoPSW Mandate', 'Sagarmala', '150+ Projects'],
    metrics: { label: 'Assessed Assets', value: '₹1,450 Cr+' },
    href: '/about',
    accent: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.35)'
  },
  {
    id: 'wave-basin',
    category: 'HYDRODYNAMIC TESTING',
    title: '360° Physical Wave Basin',
    subtitle: 'Numerical Flumes & Computational Fluid Dynamics',
    description: 'Coupling segmented directional wavemakers with 3D Navier-Stokes simulations to model deepwater surges, harbor resonance, and wave forces.',
    image: '/images/ntcpwc/wave_basin.jpg',
    tags: ['50m × 30m Basin', '90m Flume', '99.4% Accuracy'],
    metrics: { label: 'Physical Basin', value: '360° Flume' },
    href: '/facilities',
    accent: 'from-sky-400 to-indigo-600',
    glowColor: 'rgba(56, 189, 248, 0.35)'
  },
  {
    id: 'ship-simulator',
    category: 'NAVIGATION SIMULATION',
    title: '360° Full-Mission Bridge Simulator',
    subtitle: 'Real-Time Vessel Pilotage & Channel Design',
    description: 'High-fidelity cylindrical panoramic projection replicating Indian port entry fairways, tidal flows, and tug assistance for ultra-large vessels.',
    image: '/images/ntcpwc/simulator.jpg',
    tags: ['360° Cylinder Arc', '25+ Ports', 'Pilotage Ops'],
    metrics: { label: 'Pilots Trained', value: '1,200+' },
    href: '/training-education',
    accent: 'from-amber-400 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.35)'
  },
  {
    id: 'autonomous-surveys',
    category: 'OCEAN ROBOTICS',
    title: 'Autonomous Hydrographic USVs',
    subtitle: 'Multi-Beam Sonar & Subsea Bathymetry',
    description: 'Unmanned catamaran vessels mapping navigational fairways, dredging profiles, and underwater pipelines with millimetric acoustic precision.',
    image: '/images/ntcpwc/survey.jpg',
    tags: ['Dual Sonar', '±2mm Acc.', '72hr Range'],
    metrics: { label: 'Survey Depth', value: '0 - 300m' },
    href: '/services',
    accent: 'from-teal-400 to-cyan-600',
    glowColor: 'rgba(20, 184, 166, 0.35)'
  },
  {
    id: 'smart-ports',
    category: 'PORT 4.0 & BREAKWATERS',
    title: 'Deepwater Ports & Coastal Defense',
    subtitle: 'Berth Automation & Interlocking Tetrapods',
    description: 'Engineered shore protection structures dissipating 88%+ storm surge energy while optimizing automated container handling kinematics.',
    image: '/images/ntcpwc/coastal.jpg',
    tags: ['Tetrapod Units', 'Erosion Control', 'Port 4.0'],
    metrics: { label: 'Coast Safeguarded', value: '450+ km' },
    href: '/research',
    accent: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  }
];

export default function JitterMotionShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeModal, setActiveModal] = useState<FeaturedWork | null>(null);

  // Auto-play timer (slides smoothly every 5 seconds if playing)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredWorks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeWork = featuredWorks[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? featuredWorks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredWorks.length);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-between py-12 px-4 sm:px-8 lg:px-12">
      
      {/* Dynamic Animated Glowing 3D Halo Light Ring (Jitter Style) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full pointer-events-none transition-all duration-1000 ease-out opacity-60 filter blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${activeWork.glowColor} 0%, rgba(2, 6, 23, 0) 70%)`
        }}
      />

      {/* Floating Motion Graphic Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
        <div className="w-[800px] h-[400px] rounded-[100%] border border-cyan-500/20 rotate-[-15deg] animate-[spin_40s_linear_infinite]" />
        <div className="w-[1000px] h-[500px] rounded-[100%] border border-blue-500/10 rotate-[25deg] animate-[spin_60s_linear_infinite_reverse]" />
      </div>

      {/* Top Floating Pill Controls (Signature Jitter Motion Design) */}
      <div className="relative z-30 pt-16 sm:pt-20 flex justify-center">
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          
          {/* Pause / Play Toggle */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none"
            title={isPlaying ? 'Pause auto-cycle' : 'Play auto-cycle'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Mini Thumbnail Filmstrip Reel */}
          <div className="flex items-center gap-1.5 px-1">
            {featuredWorks.map((work, idx) => (
              <button
                key={work.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative w-8 h-5 sm:w-10 sm:h-6 rounded-md overflow-hidden transition-all duration-300 border ${
                  idx === activeIndex 
                    ? 'ring-2 ring-cyan-400 scale-110 border-transparent shadow-[0_0_10px_#00b4d8]' 
                    : 'opacity-40 hover:opacity-80 border-white/20'
                }`}
                title={work.title}
                aria-label={`Select ${work.title}`}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Sound / Mute Indicator */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none"
            title={isMuted ? 'Ambient Audio Muted' : 'Audio On'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {/* Expand Fullscreen / Inspect */}
          <button
            onClick={() => setActiveModal(activeWork)}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-all focus:outline-none"
            title="Inspect active visual"
            aria-label="Inspect active visual"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Main Kinetic Content Header & Carousel Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Technology Centre · Motion Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Work & Facilities
            </h1>
          </div>

          {/* Right Controls: View All + Arrow Navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/facilities"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 backdrop-blur-md transition-all"
            >
              View All Facilities
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-all focus:outline-none"
                aria-label="Previous card"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-all focus:outline-none"
                aria-label="Next card"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Motion Cards Slider (Horizontal Scroll / Jitter Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Card Focus (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-700"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={activeWork.image}
                  alt={activeWork.title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-mono font-semibold tracking-wider text-cyan-300">
                    {activeWork.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE MODEL
                  </span>
                </div>

                {/* Bottom Card Title in Media */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {activeWork.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                        {activeWork.subtitle}
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs uppercase font-mono text-slate-400">
                        {activeWork.metrics.label}
                      </div>
                      <div className="text-xl font-bold font-mono text-cyan-300">
                        {activeWork.metrics.value}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Story Narrative & Metadata Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                0{activeIndex + 1} OF 0{featuredWorks.length} · FACILITY ARCHIVE
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3 leading-snug">
                {activeWork.title}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {activeWork.description}
              </p>

              {/* Tags Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeWork.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <Link
                  href={activeWork.href}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,180,216,0.3)] transition-all flex items-center gap-2"
                >
                  <span>Explore Facility</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setActiveModal(activeWork)}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/10 transition-colors flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>Specs</span>
                </button>
              </div>

            </div>

            {/* Quick-Switch Cards Rail */}
            <div className="grid grid-cols-2 gap-3">
              {featuredWorks.filter((_, i) => i !== activeIndex).slice(0, 2).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const idx = featuredWorks.findIndex(w => w.id === item.id);
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-cyan-500/30 text-left transition-all group"
                >
                  <div className="text-[10px] font-mono uppercase text-cyan-400 mb-1">
                    {item.category}
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 line-clamp-1">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Minimal Footer Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-8 pb-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 NTCPWC · National Technology Centre for Ports, Waterways & Coasts, IIT Madras Discovery Campus
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-cyan-300 transition-colors">About</Link>
          <Link href="/facilities" className="hover:text-cyan-300 transition-colors">Facilities</Link>
          <Link href="/services" className="hover:text-cyan-300 transition-colors">Services</Link>
          <Link href="/research" className="hover:text-cyan-300 transition-colors">Research</Link>
          <Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact</Link>
        </div>
      </div>

      {/* Lightbox / Specs Modal */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">{activeModal.category}</span>
                <h3 className="text-xl font-bold text-white">{activeModal.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden my-4">
              <Image 
                src={activeModal.image} 
                alt={activeModal.title} 
                fill 
                className="object-cover"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {activeModal.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400">
                Official facility of NTCPWC at IIT Madras Discovery Campus
              </span>
              <Link
                href={activeModal.href}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Visit Facility Page →
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
