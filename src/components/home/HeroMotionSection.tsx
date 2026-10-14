'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  Ship,
  Anchor,
  Compass,
  Navigation,
  Wind,
  Waves,
  Activity,
  RotateCcw,
  Play,
  Pause,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function HeroMotionSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shipState, setShipState] = useState<'sailing' | 'decelerating' | 'parked'>('sailing');
  const [shipProgress, setShipProgress] = useState(0); // 0 to 1
  const [shipSpeed, setShipSpeed] = useState(14.8);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Trigger entrance animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Continuous ship sailing & parking loop animation
  useEffect(() => {
    let animFrame: number;
    let startTime = performance.now();
    const cycleDuration = 10000; // 10 second cycle

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration; // 0 to 1

      setShipProgress(progress);

      if (progress < 0.45) {
        // Sailing in from deep water
        setShipState('sailing');
        setShipSpeed(Number((14.8 - progress * 10).toFixed(1)));
      } else if (progress < 0.75) {
        // Decelerating and aligning with berth
        setShipState('decelerating');
        const decelProgress = (progress - 0.45) / 0.3;
        setShipSpeed(Number((10.3 * (1 - decelProgress)).toFixed(1)));
      } else {
        // Smoothly parked / berthed in water
        setShipState('parked');
        setShipSpeed(0.0);
      }

      animFrame = requestAnimationFrame(loop);
    };

    if (isAutoPlay) {
      animFrame = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isAutoPlay]);

  // Restart ship animation
  const restartShip = () => {
    setShipProgress(0);
    setShipState('sailing');
    setShipSpeed(14.8);
    setIsAutoPlay(true);
  };

  // Ship position interpolation:
  // Starts top-right offscreen/deep water -> glides diagonally -> parks neatly alongside the pier
  const shipX = -180 + shipProgress * 260; // moves from left/diagonal into berth
  const shipY = 40 + Math.sin(shipProgress * Math.PI) * 15; // gentle hydrodynamic buoyancy wave
  const shipAngle = shipState === 'parked' ? 0 : Math.sin(shipProgress * 6) * 2; // subtle rolling in waves

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#faf6f0] via-[#f7f1e7]/40 to-white border-b border-[#e8ded0] overflow-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#8c6d46 1px, transparent 1px), linear-gradient(90deg, #8c6d46 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= UPPER HERO GRID: KINETIC TEXT + ANIMATED SHIP BERTHING ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: KINETIC TYPOGRAPHY & MOTIONS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Institutional Badge (Flies in from Top) */}
            <div 
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f4ece0] border border-[#dfd2be] text-[#7a5933] text-xs font-semibold tracking-wide transition-all duration-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#a37a4c] animate-pulse" />
              <span>MINISTRY OF PORTS, SHIPPING &amp; WATERWAYS • SAGARMALA</span>
            </div>

            {/* 2. Main Headline (Kinetic Slide-Up from Mask) */}
            <h1 
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#291e13] tracking-tight leading-[1.12] transition-all duration-700 delay-150 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Advancing India&apos;s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">
                Maritime &amp; Coastal
              </span> Engineering
            </h1>

            {/* 3. Detailed Tagline (Flies in from Left) */}
            <p 
              className={`text-base sm:text-lg text-[#5e5042] font-normal leading-relaxed max-w-2xl transition-all duration-700 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              National Technology Centre for Ports, Waterways and Coasts (NTCPWC) at 
              <strong className="text-[#382a1c]"> IIT Madras Discovery Campus</strong> — providing indigenous ocean engineering solutions, 
              world-class hydraulic testbeds, and numerical modeling for national infrastructure.
            </p>

            {/* 4. Action Buttons (Slide in from Bottom) */}
            <div 
              className={`pt-2 flex flex-wrap items-center gap-4 transition-all duration-700 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href="/facilities"
                className="px-6 py-3.5 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore Research Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#6e4e2a] font-semibold text-sm border border-[#d8cbbb] shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Consultancy &amp; Testing Services</span>
              </Link>

              <Link
                href="/about"
                className="px-4 py-3.5 text-[#6b5847] hover:text-[#291e13] font-medium text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>About NTCPWC</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 5. Accreditation & Mandate Tags (Staggered Entrance) */}
            <div 
              className={`pt-4 border-t border-[#e8ded0] flex flex-wrap items-center gap-6 text-xs text-[#736353] transition-all duration-700 delay-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8c6d46]" />
                <span>NABL Accredited Testing Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8c6d46]" />
                <span>Technical Advisor to 12 Major Ports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8c6d46]" />
                <span>Discovery Campus, Thaiyur, Chennai</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE ANIMATED SHIP COMING & GETTING PARKED IN WATER (5 cols) */}
          <div 
            className={`lg:col-span-5 transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden bg-[#091522] border-2 border-[#c29b68]/40 shadow-2xl">
              
              {/* TOP SIMULATION STATUS BAR */}
              <div className="p-3.5 bg-[#0e1c2e] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    shipState === 'parked' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'
                  }`} />
                  <span className="font-bold text-slate-200">
                    {shipState === 'sailing' && 'APPROACHING HARBOUR'}
                    {shipState === 'decelerating' && 'DECELERATING & TURNING'}
                    {shipState === 'parked' && 'SECURELY PARKED IN WATER'}
                  </span>
                </div>
                <button
                  onClick={restartShip}
                  title="Replay Ship Berthing Simulation"
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              </div>

              {/* WATER BASIN & BERTHING WATERWAY VIEWPORT */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-b from-[#0e2a47] via-[#092038] to-[#051424]">
                
                {/* 1. Water Ripple Vector Grid */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* 2. Realistic Water Wave Layers (Animated SVG Currents) */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 0,160 Q 150,140 300,165 T 600,160" 
                    fill="none" 
                    stroke="#38bdf8" 
                    strokeWidth="1.5" 
                    className="animate-pulse"
                  />
                  <path 
                    d="M 0,220 Q 200,200 400,225 T 800,220" 
                    fill="none" 
                    stroke="#0284c7" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M 0,280 Q 180,265 360,285 T 720,280" 
                    fill="none" 
                    stroke="#0369a1" 
                    strokeWidth="2"
                  />
                </svg>

                {/* 3. The Discovery Pier / Quay Wall (Where the ship parks) */}
                <div className="absolute right-0 top-16 bottom-16 w-16 bg-[#1e293b] border-l-4 border-[#c29b68] shadow-2xl flex flex-col justify-between p-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-white shadow-sm" />
                  <div className="text-[9px] font-mono font-bold text-[#c29b68] -rotate-90 whitespace-nowrap tracking-wider">
                    BERTH 01 • IIT MADRAS
                  </div>
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-white shadow-sm" />
                </div>

                {/* 4. THE ANIMATED SHIP (Navigates in and parks at the berth) */}
                <div 
                  className="absolute top-1/2 left-1/4 -translate-y-1/2 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${shipX}px, ${shipY}px) rotate(${shipAngle}deg)`,
                  }}
                >
                  {/* Water Wake Waves behind Ship */}
                  {shipState !== 'parked' && (
                    <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-80">
                      <div className="w-16 h-8 border-b-2 border-white/60 rounded-full animate-ping" />
                      <div className="w-12 h-6 border-b-2 border-cyan-300/60 rounded-full" />
                    </div>
                  )}

                  {/* Ship Body & Vessel Graphic */}
                  <div className="relative group cursor-pointer">
                    <div className="w-48 sm:w-56 h-20 rounded-2xl bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#f8fafc] border-2 border-white/40 shadow-2xl flex items-center px-4 relative overflow-hidden">
                      
                      {/* Navigational Bridge Superstructure */}
                      <div className="absolute top-1 left-12 w-16 h-6 rounded-t-md bg-[#0284c7] border border-cyan-300 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Mast & Radar Scanner */}
                      <div className="absolute -top-3 left-20 w-1 h-4 bg-white">
                        <div className="w-3 h-1 -ml-1 bg-amber-400 animate-spin" />
                      </div>

                      {/* Vessel Insignia & Label */}
                      <div className="flex items-center gap-2.5 z-10">
                        <div className="w-8 h-8 rounded-lg bg-[#b45309] text-white flex items-center justify-center font-bold text-xs shadow-md">
                          <Ship className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-black text-white tracking-wide font-mono">
                            R/V DISCOVERY
                          </div>
                          <div className="text-[8.5px] font-mono text-cyan-300 font-semibold">
                            NTCPWC SURVEY FLEET
                          </div>
                        </div>
                      </div>

                      {/* Bow Wave Foam Cutter */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent" />
                    </div>

                    {/* Mooring Lines when Parked */}
                    {shipState === 'parked' && (
                      <>
                        <div className="absolute -right-8 top-2 w-8 h-0.5 bg-amber-400 shadow-sm animate-pulse" />
                        <div className="absolute -right-8 bottom-2 w-8 h-0.5 bg-amber-400 shadow-sm animate-pulse" />
                        <div className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-bold shadow-lg flex items-center gap-1">
                          <Anchor className="w-3 h-3" />
                          <span>MOORED @ QUAY</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 5. Water Surface Radiating Ripples when Parked */}
                {shipState === 'parked' && (
                  <div className="absolute top-1/2 right-24 -translate-y-1/2 pointer-events-none">
                    <div className="w-32 h-32 rounded-full border border-cyan-400/30 animate-ping" />
                  </div>
                )}

                {/* 6. Floating Overlay: Discovery Campus Photo Card Badge */}
                <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-[#091522]/90 border border-white/15 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-white/20">
                    <Image
                      src="/images/ntcpwc/campus_hq.jpg"
                      alt="Discovery Campus"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#c29b68] font-bold">20-Acre Research Testbed</div>
                    <div className="text-[11px] font-bold text-white leading-tight">IIT Madras Discovery Campus</div>
                  </div>
                </div>

              </div>

              {/* BOTTOM TELEMETRY TELEMETRY BAR */}
              <div className="p-3 bg-[#0a1524] border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4 text-[11px]">
                  <div>
                    <span className="text-slate-400">Vessel Speed: </span>
                    <span className="font-bold text-amber-400">{shipSpeed} kts</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Berth Depth: </span>
                    <span className="font-bold text-cyan-300">12.5m</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">
                  GPS: 12.8202° N, 80.1989° E
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= LOWER ROW: 4 NATIONAL STATS CARDS (FLYING IN FROM BOTTOM) ================= */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div 
            className={`p-6 rounded-2xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all duration-700 delay-300 ease-out hover:-translate-y-1 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#755530] font-mono">
              150+
            </div>
            <div className="text-sm font-bold text-[#291e13] mt-1">
              Major Port Studies
            </div>
            <div className="text-xs text-[#7a6b5c] mt-0.5">
              Completed across Indian coastal waters
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className={`p-6 rounded-2xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all duration-700 delay-500 ease-out hover:-translate-y-1 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#755530] font-mono">
              ₹1,450 Cr+
            </div>
            <div className="text-sm font-bold text-[#291e13] mt-1">
              Infrastructure Assessed
            </div>
            <div className="text-xs text-[#7a6b5c] mt-0.5">
              Port, berthing &amp; waterway asset validation
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className={`p-6 rounded-2xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all duration-700 delay-700 ease-out hover:-translate-y-1 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#755530] font-mono">
              12 Ports
            </div>
            <div className="text-sm font-bold text-[#291e13] mt-1">
              Major Port Advisory
            </div>
            <div className="text-xs text-[#7a6b5c] mt-0.5">
              Direct technology support to MoPSW
            </div>
          </div>

          {/* Card 4 */}
          <div 
            className={`p-6 rounded-2xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all duration-700 delay-900 ease-out hover:-translate-y-1 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#755530] font-mono">
              40+
            </div>
            <div className="text-sm font-bold text-[#291e13] mt-1">
              Patents &amp; Design Codes
            </div>
            <div className="text-xs text-[#7a6b5c] mt-0.5">
              Indigenous technologies &amp; standards
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
