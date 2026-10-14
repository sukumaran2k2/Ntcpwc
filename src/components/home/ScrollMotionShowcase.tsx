'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Waves, 
  Ship, 
  Radio, 
  Cpu, 
  Activity, 
  Compass, 
  Crosshair, 
  Layers, 
  Navigation,
  Wind,
  Gauge,
  Zap,
  Building2,
  Anchor,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface MotionSection {
  id: string;
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  borderColor: string;
  tagColor: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetry: { label: string; value: string; sub: string }[];
  statusBadge: string;
  footerCallout: string;
}

const motionSections: MotionSection[] = [
  {
    id: 'wave-basin',
    tag: 'IIT MADRAS • PHYSICAL WAVE BASIN & 90M FLUME',
    title: 'Physical Wave Basin',
    titleHighlight: '& Numerical Flume Modeling',
    subtitle: 'Discovery Campus, Thaiyur, Chennai',
    description:
      'India\'s flagship 90-meter shallow water wave flume and multi-directional random wave basin. Automated hydraulic paddles generate deepwater monsoon sea states coupled with high-resolution laser surface mapping.',
    image: '/images/motion/section_wave_basin.jpg',
    accentColor: '#10b981',
    borderColor: 'border-emerald-500/40',
    tagColor: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300',
    icon: Waves,
    telemetry: [
      { label: 'Flume Length', value: '90.0 m', sub: 'Glass Observation Channel' },
      { label: 'Wave Height (H)', value: '1.45 m', sub: 'Active Flume Attenuation' },
      { label: 'Wave Velocity', value: '3.45 m/s', sub: 'Laser Doppler Vector' },
      { label: 'Validation', value: '99.4%', sub: 'NABL Certified Standard' }
    ],
    statusBadge: 'HYDRAULIC FLUME ACTIVE',
    footerCallout: 'Real-time laser topography scanning line L-04 active across basin'
  },
  {
    id: 'usv-water',
    tag: 'UNMANNED SURFACE VESSEL • WATER DYNAMICS',
    title: 'Autonomous Survey Catamaran',
    titleHighlight: '& Subsea Bathymetry',
    subtitle: 'Oceanographic Hydrographic Fleet',
    description:
      'NTCPWC\'s autonomous hydrographic survey catamaran navigating coastal water currents. Deploying multi-beam acoustic sonar arrays and LiDAR mapping down to 2mm precision across Indian ports and shipping fairways.',
    image: '/images/motion/section_usv_water.jpg',
    accentColor: '#0ea5e9',
    borderColor: 'border-sky-500/40',
    tagColor: 'bg-sky-500/20 border-sky-400/50 text-sky-300',
    icon: Ship,
    telemetry: [
      { label: 'Survey Speed', value: '14.8 kts', sub: 'Twin Azimuth Thrusters' },
      { label: 'Sonar Array', value: '512 ch', sub: 'Multi-Beam Acoustic Depth' },
      { label: 'Point Cloud', value: '2 mm', sub: 'Vertical Precision' },
      { label: 'Sea State', value: 'State 4', sub: 'Moderate Rough Sea Tested' }
    ],
    statusBadge: 'AUTONOMOUS SURVEY ACTIVE',
    footerCallout: 'Real-time subsea pipeline integrity and bathymetric mapping deployed'
  },
  {
    id: 'vtms-traffic',
    tag: 'PORT 4.0 • MARITIME LOGISTICS & SIMULATION',
    title: 'Vessel Traffic Management',
    titleHighlight: '& Navigation Safety (VTMS)',
    subtitle: 'National Port Surveillance & Guidance',
    description:
      'State-of-the-art Vessel Traffic Management System (VTMS) providing 24/7 radar surveillance, AIS tracking, fairway collision avoidance, and deepwater berth management for major Indian port authorities.',
    image: '/images/motion/section_vtms_traffic.jpg',
    accentColor: '#f59e0b',
    borderColor: 'border-amber-500/40',
    tagColor: 'bg-amber-500/20 border-amber-400/50 text-amber-300',
    icon: Compass,
    telemetry: [
      { label: 'AIS Radar Range', value: '48 NM', sub: 'Continuous Coastal Radar' },
      { label: 'Vessel Tracking', value: '120+ Vessels', sub: 'Simultaneous Trajectories' },
      { label: 'Collision Risk', value: '0.00%', sub: 'Automated CPA Alarms' },
      { label: 'Turnaround Eff.', value: '+42%', sub: 'Quay & Fairway Optimization' }
    ],
    statusBadge: 'VTMS RADAR SURVEILLANCE LIVE',
    footerCallout: 'Live vessel approach corridors and channel navigation guidance active'
  },
  {
    id: 'campus-aerial',
    tag: 'SAGARMALA CENTRE OF EXCELLENCE • THAIYUR',
    title: '20-Acre Discovery Campus',
    titleHighlight: '& Coastal Infrastructure',
    subtitle: 'Ministry of Ports, Shipping and Waterways',
    description:
      'Aerial view of NTCPWC\'s dedicated 20-acre research campus at Thaiyur, Kelambakkam, Chennai. Housing world-class hydraulic flumes, port navigation simulators, coastal defense testbeds, and advanced computing laboratories.',
    image: '/images/motion/section_campus_aerial.jpg',
    accentColor: '#b45309',
    borderColor: 'border-[#c29b68]/50',
    tagColor: 'bg-[#b45309]/20 border-[#c29b68]/50 text-amber-200',
    icon: Building2,
    telemetry: [
      { label: 'Campus Area', value: '20 Acres', sub: 'Satellite Campus Thaiyur' },
      { label: 'Port Projects', value: '250+', sub: 'Executed for Indian Ports' },
      { label: 'Advisory Reach', value: '12 Ports', sub: 'Major Ports of India' },
      { label: 'Patents & Codes', value: '40+', sub: 'Indigenous Maritime Tech' }
    ],
    statusBadge: 'DISCOVERY CAMPUS OPERATIONAL',
    footerCallout: 'IIT Madras & MoPSW indigenous technology development hub'
  }
];

export default function ScrollMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active section index (0, 1, 2, 3)
  const numSections = motionSections.length;
  const sectionStep = 1 / numSections;
  const activeSectionIdx = Math.min(
    Math.floor(scrollProgress / sectionStep),
    numSections - 1
  );

  // Normalized progress within current section (0 to 1)
  const inSectionProgress = Math.min(
    Math.max((scrollProgress - activeSectionIdx * sectionStep) / sectionStep, 0),
    1
  );

  // Kinetic motion offsets: elements flying in from distinct directions
  const titleX = (1 - Math.min(inSectionProgress * 2.2, 1)) * -220; // from far left
  const badgeY = (1 - Math.min(inSectionProgress * 2.4, 1)) * -100; // from top
  const statsX = (1 - Math.min(inSectionProgress * 2.0, 1)) * 240; // from right
  const footerY = (1 - Math.min(inSectionProgress * 1.8, 1)) * 140; // from bottom
  const compassRotate = inSectionProgress * 360;
  const compassScale = 0.4 + Math.min(inSectionProgress * 1.8, 1) * 0.6;

  const currentSection = motionSections[activeSectionIdx];

  const jumpToSection = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = scrollTop + rect.top + totalScrollable * (index * sectionStep + 0.05);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#0a111e] text-white"
      style={{ height: `${numSections * 100 + 40}vh` }}
    >
      {/* Pinned Sticky Viewport (100vh full-screen window) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* ================= BACKGROUND IMAGES: 100% CRISP, ZERO BLUR ================= */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {motionSections.map((sec, idx) => {
            const isCurrent = idx === activeSectionIdx;
            // Opacity calculation for smooth cinematic fade between sections
            const secStart = idx * sectionStep;
            const secEnd = (idx + 1) * sectionStep;
            let opacity = 0;

            if (scrollProgress >= secStart && scrollProgress < secEnd) {
              opacity = 1;
            } else if (scrollProgress >= secStart - 0.06 && scrollProgress < secStart) {
              opacity = (scrollProgress - (secStart - 0.06)) / 0.06;
            } else if (scrollProgress >= secEnd && scrollProgress < secEnd + 0.06) {
              opacity = 1 - (scrollProgress - secEnd) / 0.06;
            }

            return (
              <div 
                key={sec.id}
                className="absolute inset-0 transition-opacity duration-300 ease-out"
                style={{ 
                  opacity,
                  transform: isCurrent ? `scale(${1.0 + inSectionProgress * 0.06})` : 'scale(1)',
                  transformOrigin: 'center center'
                }}
              >
                <Image
                  src={sec.image}
                  alt={sec.title}
                  fill
                  priority={idx <= 1}
                  className="object-cover object-center"
                />
                {/* Subtle dark gradient framing so text is crisp without blurring the photo */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a111e]/85 via-transparent to-[#0a111e]/80" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a111e] to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a111e]/80 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* ================= TOP NAVIGATION CONTROLS ================= */}
        <header className="relative z-30 w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#0e1726]/85 border border-white/15 shadow-2xl">
            
            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: currentSection.accentColor }} 
              />
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  REAL-TIME MARITIME MOTION GRAPHICS
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>NTCPWC Discovery Campus</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 font-mono text-slate-300">
                    STAGE 0{activeSectionIdx + 1}: {currentSection.title.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Section Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10 overflow-x-auto max-w-full">
              {motionSections.map((sec, idx) => {
                const isSelected = idx === activeSectionIdx;
                const IconComponent = sec.icon;

                return (
                  <button
                    key={sec.id}
                    onClick={() => jumpToSection(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected 
                        ? 'bg-[#b45309] text-white shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>0{idx + 1}. {sec.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Depth Meter */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">Scroll Progress:</span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {Math.round(scrollProgress * 100)}%
              </span>
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-400 transition-all duration-100"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

          </div>
        </header>

        {/* ================= KINETIC MOTION GRAPHIC OVERLAYS ================= */}
        <div className="relative z-30 w-full px-4 sm:px-6 lg:px-8 my-auto pointer-events-none">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: KINETIC TYPOGRAPHY (FLIES IN FROM LEFT: titleX) */}
            <div 
              className="lg:col-span-7 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${titleX}px)` }}
            >
              
              {/* Badge (Flies in from Top: badgeY) */}
              <div 
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold shadow-lg mb-3 ${currentSection.tagColor}`}
                style={{ transform: `translateY(${badgeY}px)` }}
              >
                <Activity className="w-4 h-4 animate-spin" />
                <span>{currentSection.tag}</span>
              </div>

              {/* Bold Kinetic Title */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.06] drop-shadow-xl">
                {currentSection.title} <br />
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${currentSection.accentColor}, #38bdf8, #a7f3d0)`
                  }}
                >
                  {currentSection.titleHighlight}
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-100 leading-relaxed max-w-xl drop-shadow-md">
                {currentSection.description}
              </p>

              {/* Status Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 border border-white/20 text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentSection.statusBadge}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 border border-white/20 text-slate-200">
                  <Crosshair className="w-3.5 h-3.5" style={{ color: currentSection.accentColor }} />
                  <span>{currentSection.subtitle}</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: KINETIC TELEMETRY CARDS (FLIES IN FROM RIGHT: statsX) */}
            <div 
              className="lg:col-span-5 transition-transform duration-300 ease-out space-y-3.5"
              style={{ transform: `translateX(${statsX}px)` }}
            >
              {currentSection.telemetry.map((t, i) => (
                <div 
                  key={t.label}
                  className={`p-4 rounded-2xl bg-[#0a111e]/90 border-2 shadow-2xl flex items-center justify-between ${currentSection.borderColor}`}
                >
                  <div>
                    <div className="text-xs font-mono text-slate-400">{t.label}</div>
                    <div className="text-lg font-mono font-extrabold text-white mt-0.5">{t.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t.sub}</div>
                  </div>
                  <div 
                    className="text-right font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                    style={{ color: currentSection.accentColor }}
                  >
                    CH-0{i + 1}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ROTATING RADAR / COMPASS VECTOR (Center-floating shape) */}
          <div 
            className="absolute top-1/2 left-1/3 pointer-events-none hidden xl:block"
            style={{
              transform: `scale(${compassScale}) rotate(${compassRotate}deg)`,
              opacity: 0.4
            }}
          >
            <div 
              className="w-48 h-48 rounded-full border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: currentSection.accentColor }}
            >
              <div 
                className="w-32 h-32 rounded-full border flex items-center justify-center"
                style={{ borderColor: currentSection.accentColor }}
              >
                <Compass className="w-12 h-12" style={{ color: currentSection.accentColor }} />
              </div>
            </div>
          </div>

          {/* BOTTOM TELEMETRY STRIP (FLIES IN FROM BOTTOM: footerY) */}
          <div 
            className="mt-6 transition-transform duration-300 ease-out"
            style={{ transform: `translateY(${footerY}px)` }}
          >
            <div className="p-3.5 rounded-xl bg-black/80 border border-white/20 flex flex-wrap items-center justify-between gap-3 max-w-2xl text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-200">
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: currentSection.accentColor }}
                />
                <span>{currentSection.footerCallout}</span>
              </div>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span>Scroll for next stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM TIMELINE STEPPER ================= */}
        <footer className="relative z-30 w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a111e]/90 border border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            
            {/* 4-Step Indicator */}
            <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto">
              {motionSections.map((sec, idx) => {
                const isCurrent = idx === activeSectionIdx;

                return (
                  <button
                    key={sec.id}
                    onClick={() => jumpToSection(idx)}
                    className={`flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                      isCurrent ? 'font-bold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    style={{ color: isCurrent ? sec.accentColor : undefined }}
                  >
                    <span 
                      className={`w-2 h-2 rounded-full ${isCurrent ? 'animate-pulse' : 'bg-slate-600'}`}
                      style={{ backgroundColor: isCurrent ? sec.accentColor : undefined }}
                    />
                    <span>0{idx + 1}. {sec.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-slate-400 text-[11px] hidden md:block">
              Continuous kinetic scroll tracking • Authentic NTCPWC imagery from Discovery Campus
            </div>

          </div>
        </footer>

      </div>
    </section>
  );
}
