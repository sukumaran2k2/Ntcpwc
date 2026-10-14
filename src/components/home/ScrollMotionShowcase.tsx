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
  ArrowUpRight, 
  Layers, 
  Navigation,
  Wind,
  Gauge,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function ScrollMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure scroll progress through the 250vh pinned container
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

  // Split scroll into two primary stages:
  // Stage 1 (Research Lab): progress 0.0 -> 0.48
  // Stage 2 (Water & Ship): progress 0.52 -> 1.0
  const isLabStage = scrollProgress < 0.5;

  // Normalized progress within Stage 1 (0 to 1)
  const labStageProgress = Math.min(Math.max(scrollProgress / 0.48, 0), 1);

  // Normalized progress within Stage 2 (0 to 1)
  const shipStageProgress = Math.min(Math.max((scrollProgress - 0.52) / 0.48, 0), 1);

  // Stage 1 motion transforms (elements flying in from distinct directions)
  const labTitleX = (1 - Math.min(labStageProgress * 2, 1)) * -180; // from far left
  const labBadgeY = (1 - Math.min(labStageProgress * 2.2, 1)) * -120; // from top
  const labStatsX = (1 - Math.min(labStageProgress * 1.8, 1)) * 220; // from right
  const labWaveY = (1 - Math.min(labStageProgress * 1.6, 1)) * 160; // from bottom
  const labCrosshairScale = 0.5 + Math.min(labStageProgress * 1.5, 1) * 0.5;
  const labCrosshairRotate = labStageProgress * 180;

  // Stage 2 motion transforms (elements flying in from distinct directions)
  const shipTitleX = (1 - Math.min(shipStageProgress * 2, 1)) * -220; // from left
  const shipRadarScale = 0.3 + Math.min(shipStageProgress * 1.8, 1) * 0.7; // expanding from center
  const shipRadarRotate = shipStageProgress * 360;
  const shipStatsX = (1 - Math.min(shipStageProgress * 1.7, 1)) * 240; // from right
  const shipSpeedY = (1 - Math.min(shipStageProgress * 1.9, 1)) * 180; // from bottom
  const shipWavesOffset = shipStageProgress * -200; // flowing wave vector

  // Background image opacities (crisp images without blur)
  const labImageOpacity = scrollProgress < 0.46 ? 1 : Math.max(0, 1 - (scrollProgress - 0.46) * 12);
  const shipImageOpacity = scrollProgress < 0.48 ? 0 : Math.min(1, (scrollProgress - 0.48) * 12);

  // Background subtle zoom based on scroll progress
  const labZoom = 1.0 + labStageProgress * 0.08;
  const shipZoom = 1.0 + shipStageProgress * 0.1;

  const jumpTo = (progress: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    window.scrollTo({ top: scrollTop + rect.top + totalScrollable * progress, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#0b1320] text-white"
      style={{ height: '260vh' }}
    >
      {/* Sticky Viewport (100vh pinned screen) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* ================= BACKGROUND IMAGES (100% CRISP, ZERO BLUR) ================= */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          
          {/* RESEARCH LAB IMAGE: CRISP & SHARP */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{ 
              opacity: labImageOpacity,
              transform: `scale(${labZoom})`,
              transformOrigin: 'center center'
            }}
          >
            <Image
              src="/images/motion/lab_motion.jpg"
              alt="NTCPWC Wave Basin Research Laboratory"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Subtle gradient so crisp text is legible without blurring the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1320]/80 via-transparent to-[#0b1320]/70" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1320] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b1320]/80 to-transparent" />
          </div>

          {/* WATER & SHIP IMAGE: CRISP & SHARP */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{ 
              opacity: shipImageOpacity,
              transform: `scale(${shipZoom})`,
              transformOrigin: 'center 60%'
            }}
          >
            <Image
              src="/images/motion/ship_motion.jpg"
              alt="Oceanographic Research Survey Vessel in Dynamic Waves"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Subtle gradient so crisp text is legible without blurring the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06121f]/80 via-transparent to-[#06121f]/75" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06121f] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06121f]/80 to-transparent" />
          </div>

        </div>

        {/* ================= TOP HUD CONTROLS BAR ================= */}
        <header className="relative z-30 w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#0f172a]/85 border border-white/15 shadow-2xl">
            
            {/* Stage Indicator with Pulse */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isLabStage ? 'bg-emerald-400' : 'bg-cyan-400'} animate-ping`} />
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  SCROLL-DRIVEN MOTION GRAPHICS
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>NTCPWC Discovery Campus</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 font-mono text-slate-300">
                    {isLabStage ? 'STAGE 01: RESEARCH LAB' : 'STAGE 02: WATER & SHIP'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stage Jump Buttons */}
            <div className="flex items-center gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => jumpTo(0.1)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isLabStage ? 'bg-[#b45309] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>01. Research Lab</span>
              </button>
              <button
                onClick={() => jumpTo(0.7)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isLabStage ? 'bg-[#0284c7] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span>02. Water &amp; Ship</span>
              </button>
            </div>

            {/* Scroll Meter */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">Scroll:</span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {Math.round(scrollProgress * 100)}%
              </span>
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 transition-all duration-100"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

          </div>
        </header>

        {/* ================= KINETIC MOTION GRAPHIC OVERLAY ELEMENTS ================= */}
        <div className="relative z-30 w-full px-4 sm:px-6 lg:px-8 my-auto pointer-events-none">
          
          {/* ==================== STAGE 1: RESEARCH LAB MOTION GRAPHICS ==================== */}
          <div 
            className="transition-opacity duration-500 ease-out"
            style={{ 
              opacity: isLabStage ? 1 : 0, 
              display: scrollProgress > 0.55 ? 'none' : 'block' 
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* SHAPE 1: Left Typography Block (Flies in from Left: labTitleX) */}
              <div 
                className="lg:col-span-7 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${labTitleX}px)` }}
              >
                {/* Floating Tag flying in from top: labBadgeY */}
                <div 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold shadow-lg mb-3"
                  style={{ transform: `translateY(${labBadgeY}px)` }}
                >
                  <Activity className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>IIT MADRAS • PHYSICAL WAVE BASIN &amp; 90M FLUME</span>
                </div>

                {/* Kinetic Bold Headline */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
                  Hydrodynamic Flume <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    &amp; 3D Laser Modeling
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl drop-shadow-md">
                  India&apos;s flagship testing facility at Discovery Campus, Thaiyur. Automated multi-directional wave paddles generate deepwater monsoon sea states coupled with high-resolution laser surface mapping.
                </p>

                {/* Animated Caliper & Gauge Metric line */}
                <div className="mt-5 flex items-center gap-4 text-xs font-mono text-emerald-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-emerald-500/30">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>JONSWAP Spectral Sea Generator</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-emerald-500/30">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Laser Doppler Velocity Array</span>
                  </div>
                </div>
              </div>

              {/* SHAPE 2: Right Telemetry Cards (Flies in from Right: labStatsX) */}
              <div 
                className="lg:col-span-5 transition-transform duration-300 ease-out space-y-3"
                style={{ transform: `translateX(${labStatsX}px)` }}
              >
                
                {/* Metric Card 1 */}
                <div className="p-4 rounded-2xl bg-[#0f172a]/90 border-2 border-emerald-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                      90m
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Glass Observation Flume</div>
                      <div className="text-sm font-bold text-white">Wave Length Capacity</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 font-bold">
                    ACTIVE
                  </div>
                </div>

                {/* Metric Card 2 */}
                <div className="p-4 rounded-2xl bg-[#0f172a]/90 border-2 border-emerald-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
                      <Waves className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Live Wave Height (H)</div>
                      <div className="text-base font-mono font-bold text-white">
                        {(1.25 + Math.sin(scrollProgress * 25) * 0.4).toFixed(2)} m
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-amber-400 font-bold">
                    3.45 m/s
                  </div>
                </div>

                {/* Metric Card 3 */}
                <div className="p-4 rounded-2xl bg-[#0f172a]/90 border-2 border-emerald-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                      99.4%
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Simulation Accuracy</div>
                      <div className="text-sm font-bold text-white">NABL Testing Standards</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-cyan-400 font-bold">
                    VALIDATED
                  </div>
                </div>

              </div>

            </div>

            {/* SHAPE 3: Rotating Caliper Crosshair (Center-Right Floating) */}
            <div 
              className="absolute top-1/2 right-1/4 pointer-events-none hidden xl:block"
              style={{
                transform: `scale(${labCrosshairScale}) rotate(${labCrosshairRotate}deg)`,
                opacity: 0.6
              }}
            >
              <div className="w-32 h-32 rounded-full border border-dashed border-emerald-400 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-emerald-500/50 flex items-center justify-center">
                  <Crosshair className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Bottom Floating Laser Scan Line (Flies in from bottom: labWaveY) */}
            <div 
              className="mt-8 transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${labWaveY}px)` }}
            >
              <div className="p-3 rounded-xl bg-black/70 border border-emerald-500/30 flex items-center justify-between max-w-xl text-xs font-mono text-emerald-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-time Laser Topography Scan: Line L-04 Active</span>
                </div>
                <span className="text-amber-400">Scroll to deploy to ocean vessel &gt;&gt;</span>
              </div>
            </div>

          </div>

          {/* ==================== STAGE 2: WATER & SHIP MOTION GRAPHICS ==================== */}
          <div 
            className="transition-opacity duration-500 ease-out"
            style={{ 
              opacity: !isLabStage ? 1 : 0, 
              display: scrollProgress < 0.45 ? 'none' : 'block' 
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* SHAPE 1: Left Bold Ship Typography (Flies in from Left: shipTitleX) */}
              <div 
                className="lg:col-span-7 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${shipTitleX}px)` }}
              >
                {/* Floating Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold shadow-lg mb-3">
                  <Ship className="w-4 h-4 text-cyan-400" />
                  <span>R/V DISCOVERY • OCEANOGRAPHIC HYDROGRAPHIC SURVEY</span>
                </div>

                {/* Kinetic Bold Headline */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
                  Autonomous Vessel <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300">
                    &amp; Dynamic Ocean Waves
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl drop-shadow-md">
                  Deploying autonomous subsea acoustic bathymetry across Indian maritime corridors. Cutting through heavy swell waves with real-time wake dispersion and multi-beam hydrographic LiDAR.
                </p>

                {/* Live Ship Telemetry Chips */}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono text-cyan-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-sky-500/30">
                    <Wind className="w-3.5 h-3.5 text-sky-400" />
                    <span>Heading: 042° NNE</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-sky-500/30">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span>Speed: {(14.5 + shipStageProgress * 3.5).toFixed(1)} Knots</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-sky-500/30">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Depth: 184.2m Sonar</span>
                  </div>
                </div>
              </div>

              {/* SHAPE 2: Right Vessel Telemetry Stack (Flies in from Right: shipStatsX) */}
              <div 
                className="lg:col-span-5 transition-transform duration-300 ease-out space-y-3"
                style={{ transform: `translateX(${shipStatsX}px)` }}
              >
                
                {/* Ship Card 1 */}
                <div className="p-4 rounded-2xl bg-[#091522]/90 border-2 border-sky-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Multi-Beam Acoustic Sonar</div>
                      <div className="text-sm font-bold text-white">512 Subsea Channels</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-sky-400 font-bold">
                    SCANNING
                  </div>
                </div>

                {/* Ship Card 2 */}
                <div className="p-4 rounded-2xl bg-[#091522]/90 border-2 border-sky-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
                      <Waves className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Dynamic Bow Impact Force</div>
                      <div className="text-base font-mono font-bold text-white">
                        {(310 + Math.sin(scrollProgress * 30) * 45).toFixed(0)} kPa
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-amber-400 font-bold">
                    SEA STATE 4
                  </div>
                </div>

                {/* Ship Card 3 */}
                <div className="p-4 rounded-2xl bg-[#091522]/90 border-2 border-sky-500/40 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Twin Azimuth Propulsion</div>
                      <div className="text-sm font-bold text-white">Autonomous Dynamic Positioning</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 font-bold">
                    LOCKED
                  </div>
                </div>

              </div>

            </div>

            {/* SHAPE 3: Rotating Nautical Compass / Radar Ring (Center Floating) */}
            <div 
              className="absolute top-1/2 left-1/3 pointer-events-none hidden xl:block"
              style={{
                transform: `scale(${shipRadarScale}) rotate(${shipRadarRotate}deg)`,
                opacity: 0.5
              }}
            >
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-sky-400 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-sky-500/60 flex items-center justify-center">
                  <Compass className="w-12 h-12 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Bottom Water Wave Waveform Vector (Flies in from bottom: shipSpeedY) */}
            <div 
              className="mt-8 transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${shipSpeedY}px)` }}
            >
              <div className="p-3 rounded-xl bg-black/70 border border-sky-500/30 flex items-center justify-between max-w-xl text-xs font-mono text-sky-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Subsea Bathymetry Point Cloud: 2mm Vertical Accuracy</span>
                </div>
                <span className="text-emerald-400 font-bold">MoPSW • SAGARMALA</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM STEPPER BAR ================= */}
        <footer className="relative z-30 w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0b1320]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            
            {/* Timeline Stage Indicators */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => jumpTo(0.1)}
                className={`flex items-center gap-2 transition-colors cursor-pointer ${isLabStage ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>01. Physical Lab Flume Dynamics</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button 
                onClick={() => jumpTo(0.7)}
                className={`flex items-center gap-2 transition-colors cursor-pointer ${!isLabStage ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>02. Ocean Water &amp; Vessel Kinematics</span>
              </button>
            </div>

            <div className="text-slate-400 text-[11px] hidden md:block">
              Scroll down or up to drive kinetic vectors, telemetry cards &amp; navigation angles
            </div>

          </div>
        </footer>

      </div>
    </section>
  );
}
