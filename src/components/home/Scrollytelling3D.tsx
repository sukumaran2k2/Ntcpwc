'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Waves, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  ChevronRight, 
  Maximize2, 
  Eye, 
  Layers, 
  Activity, 
  Compass,
  ArrowDown
} from 'lucide-react';

interface StoryChapter {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  hudTitle: string;
  telemetry: { label: string; value: string; unit?: string }[];
  accentColor: string;
  badgeBg: string;
  statsTitle: string;
  statsDesc: string;
}

const chapters: StoryChapter[] = [
  {
    id: 'wave-basin',
    tag: 'IITM DISCOVERY CAMPUS · 3D DIGITAL TWIN',
    title: 'Physical & Numerical Wave Basin Simulation',
    subtitle: 'Next-Generation Deepwater Fluid Dynamics',
    description:
      'India’s largest deepwater wave testing facility couples physical hydrodynamic wave flumes with high-fidelity 3D numerical particle simulation. Real-time laser telemetry and sensor arrays capture turbulent wave kinematics down to millisecond precision.',
    image: '/images/scrollytelling/wave_basin_3d.jpg',
    icon: Waves,
    hudTitle: 'TELEMETRY: TANK_FLUME_01 · ACTIVE',
    telemetry: [
      { label: 'Wave Height', value: '1.45', unit: 'm' },
      { label: 'Velocity Vector', value: '3.2', unit: 'm/s' },
      { label: 'Wave Period', value: '8.8', unit: 'sec' },
      { label: 'Mesh Resolution', value: '99.4', unit: '%' }
    ],
    accentColor: '#00b4d8',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    statsTitle: 'Wave Energy Modeling',
    statsDesc: 'Coupled hydrodynamic Navier-Stokes numerical wave solver.'
  },
  {
    id: 'smart-port',
    tag: 'SAGARMALA INITIATIVE · PORT 4.0',
    title: 'Autonomous Smart Port Terminals',
    subtitle: 'AI-Orchestrated Quay Cranes & Logistics',
    description:
      'Pioneering digital twin architecture for Indian mega-ports. Our autonomous container berth telemetry tracks Automated Guided Vehicles (AGVs), laser-guided quay cranes, and deepwater vessel berthing kinematics with predictive turnaround analytics.',
    image: '/images/scrollytelling/smart_port_3d.jpg',
    icon: Cpu,
    hudTitle: 'HUD: BERTH_LOGISTICS_HUB · LIVE',
    telemetry: [
      { label: 'Port Efficiency', value: '94', unit: '%' },
      { label: 'AGV Fleet Status', value: 'Optimized', unit: '' },
      { label: 'Vessel Turnaround', value: '-42', unit: '%' },
      { label: 'Crane Telemetry', value: '100', unit: '% Up' }
    ],
    accentColor: '#10b981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    statsTitle: 'Autonomous Logistics',
    statsDesc: 'Zero-emission electric transport routes with millimeter telemetry.'
  },
  {
    id: 'survey-vessel',
    tag: 'HYDROGRAPHIC INTELLIGENCE · USV FLEET',
    title: 'Autonomous Subsea Survey Catamaran',
    subtitle: '3D Sonar Bathymetry & Pipeline Integrity',
    description:
      'Unmanned Surface Vessels (USVs) slice through heavy sea states to perform multi-beam LiDAR and subsea acoustic mapping. Real-time point-cloud visualization maps seafloor topography, sediment dispersion, and underwater hydrocarbon pipelines.',
    image: '/images/scrollytelling/survey_vessel_3d.jpg',
    icon: Radio,
    hudTitle: 'SONAR: MULTI-BEAM_BATHYMETRY',
    telemetry: [
      { label: 'Survey Depth', value: '0 - 300', unit: 'm' },
      { label: 'Point Cloud Acc.', value: '2', unit: 'mm' },
      { label: 'Vessel Endurance', value: '72', unit: 'hrs' },
      { label: 'Sonar Beams', value: '512', unit: 'ch' }
    ],
    accentColor: '#38bdf8',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    statsTitle: 'Bathymetric Mapping',
    statsDesc: 'Sub-centimeter resolution underwater pipeline telemetry.'
  },
  {
    id: 'coastal-defense',
    tag: 'CLIMATE RESILIENCE · COASTAL PROTECTION',
    title: 'Engineered Breakwater Armor Units',
    subtitle: 'Wave Dissipation & Sediment Dynamics',
    description:
      'Designing heavy coastal defense structures utilizing interlocking concrete tetrapod units. Embedded wave pressure sensors and dynamic force-vector analytics monitor wave dissipation and sediment transport to safeguard India’s 7,500 km coastline.',
    image: '/images/scrollytelling/coastal_defense_3d.jpg',
    icon: ShieldCheck,
    hudTitle: 'SENSOR: ARMOR_FORCE_VECTORS',
    telemetry: [
      { label: 'Wave Dissipation', value: '88', unit: '%' },
      { label: 'Sensor Nodes', value: '50+', unit: 'pts' },
      { label: 'Pressure Load', value: '305', unit: 'kPa' },
      { label: 'Erosion Arrest', value: '96', unit: '%' }
    ],
    accentColor: '#f59e0b',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    statsTitle: 'Coastal Defense Vectors',
    statsDesc: 'Advanced shoreline morphology simulation against storm surges.'
  }
];

export default function Scrollytelling3D() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const viewportCenter = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((el, index) => {
        if (!el) return;
        const box = el.getBoundingClientRect();
        const dist = Math.abs(box.top - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = index;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (index: number) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeChapter = chapters[activeIdx];

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#051121] text-white overflow-hidden border-t border-b border-cyan-900/30 py-16"
    >
      {/* Background ambient grid and glow */}
      <div className="absolute inset-0 bg-radial from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#00b4d8 1px, transparent 1px), linear-gradient(90deg, #00b4d8 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Banner / Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive 3D Digital Twin Scrollytelling</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Engineering India&apos;s Maritime Tech in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Real-Time 3D</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
          Scroll down to explore how NTCPWC fuses physical marine testbeds with 3D AI simulations, 
          autonomous vessels, and resilient coastal infrastructure.
        </p>

        {/* Scroll hint indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-cyan-300/80 uppercase tracking-widest">
          <span>Scroll to travel through 3D models</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </div>
      </div>

      {/* Main Scrollytelling Two-Column Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">

          {/* Sticky 3D AI Visual Screen (Pinned Column - 7 cols) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 z-20">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md group">
              
              {/* Top HUD Status Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#040e1c]/90 border-b border-cyan-500/20 text-xs font-mono text-cyan-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wider font-semibold">{activeChapter.hudTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-slate-400">FRAME: CH_0{activeIdx + 1}/04</span>
                  <button 
                    onClick={() => setModalImage(activeChapter.image)}
                    className="p-1.5 rounded-md hover:bg-cyan-500/20 text-cyan-300 hover:text-white transition-colors"
                    title="Enlarge 3D AI Visual"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Visual Viewport with Transitioning Images */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                {chapters.map((chap, idx) => (
                  <div
                    key={chap.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                      idx === activeIdx 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : idx < activeIdx
                        ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                        : 'opacity-0 scale-105 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={chap.image}
                      alt={chap.title}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center"
                    />
                    
                    {/* Subtle Holographic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Active HUD telemetry pill in bottom-left */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs">
                      <div>
                        <div className="text-cyan-400 font-semibold font-mono">{chap.statsTitle}</div>
                        <div className="text-slate-300 text-[11px]">{chap.statsDesc}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModalImage(chap.image)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Full Res</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Telemetry Matrix Grid Below Screen */}
              <div className="p-4 sm:p-5 bg-[#061527] border-t border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeChapter.telemetry.map((item, tIdx) => (
                  <div 
                    key={tIdx} 
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/10 flex flex-col justify-between"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      {item.label}
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                        {item.value}
                      </span>
                      {item.unit && (
                        <span className="text-xs text-slate-400 font-mono">{item.unit}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chapter Rail Dots Indicator */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#030c18] border-t border-cyan-500/10 text-xs">
                <span className="text-slate-400 font-mono">STORY CHAPTERS:</span>
                <div className="flex items-center gap-2">
                  {chapters.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => scrollToChapter(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dotIdx === activeIdx
                          ? 'w-8 bg-cyan-400 shadow-[0_0_8px_#00b4d8]'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Jump to chapter ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Narrative Story Column (Scrolls past sticky 3D view - 5 cols) */}
          <div className="lg:col-span-5 space-y-24 lg:py-6">
            {chapters.map((chap, idx) => {
              const Icon = chap.icon;
              const isActive = idx === activeIdx;

              return (
                <div
                  key={chap.id}
                  ref={(el) => { sectionRefs.current[idx] = el; }}
                  className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-900/90 to-[#061930]/90 border-cyan-500/50 shadow-[0_10px_30px_rgba(0,180,216,0.15)] ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/40 border-white/5 opacity-60 hover:opacity-90'
                  }`}
                >
                  {/* Chapter badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${chap.badgeBg}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{chap.tag}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400/80 font-bold">
                      0{idx + 1} / 04
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    {chap.title}
                  </h3>
                  
                  <div className="text-sm font-medium text-cyan-300 mb-4">
                    {chap.subtitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {chap.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Validated against physical wave basins & deepwater ports.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Direct technical advisories for Ministry & Maritime Boards.</span>
                    </div>
                  </div>

                  {/* Action button to select or explore */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => scrollToChapter(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <span>{isActive ? 'Active 3D Model' : 'View Model in 3D'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setModalImage(chap.image)}
                      className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      Inspect HD Render
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Modal for 3D AI Visual */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 text-xs font-mono text-cyan-400">
              <span>NTCPWC 3D AI VISUALIZATION · 8K ULTRA-HD</span>
              <button 
                onClick={() => setModalImage(null)}
                className="px-2 py-1 rounded hover:bg-white/10 text-white text-sm"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative aspect-[16/9] w-full mt-2 rounded-xl overflow-hidden">
              <Image 
                src={modalImage} 
                alt="3D AI Marine Visual" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
