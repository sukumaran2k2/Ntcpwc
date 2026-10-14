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
  Eye, 
  Layers, 
  Sliders, 
  ArrowDown, 
  Maximize2,
  Play,
  Pause,
  ChevronRight
} from 'lucide-react';

export default function ScrollMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<'lab' | 'ship'>('lab');
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  // Measure scroll progress through the pinned container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      // Progress from 0 to 1
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);
      setActiveStage(progress < 0.5 ? 'lab' : 'ship');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient wave & laser particle simulation on canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle nodes for fluid & telemetry effect
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3
    }));

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeStage === 'lab') {
        // --- STAGE 1: RESEARCH LAB LASER & FLUID TELEMETRY ---
        // 1. Horizontal Laser Scanning Beam
        const scanY = ((Math.sin(time * 1.5) + 1) / 2) * canvas.height * 0.7 + canvas.height * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.75)'; // vibrant green laser
        ctx.lineWidth = 2;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 12;
        ctx.moveTo(0, scanY);
        ctx.lineTo(canvas.width, scanY);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // 2. Wave surface topographic contour lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)'; // cyan contour
        ctx.lineWidth = 1.5;
        for (let x = 0; x < canvas.width; x += 10) {
          const y = scanY + Math.sin(x * 0.02 + time * 3) * 16 + Math.cos(x * 0.01 - time) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // 3. Laser intersection dots
        for (let i = 0; i < 8; i++) {
          const px = (canvas.width / 9) * (i + 1);
          const py = scanY + Math.sin(px * 0.02 + time * 3) * 16;
          ctx.beginPath();
          ctx.fillStyle = '#4ade80';
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

      } else {
        // --- STAGE 2: WATER & SHIP FLUID PARTICLES & SONAR CONE ---
        // 1. Expanding subsea sonar pulse
        const sonarX = canvas.width * 0.48;
        const sonarY = canvas.height * 0.62;
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;
        const radius = ((time * 30) % maxRadius);
        const alpha = Math.max(0, 1 - radius / maxRadius) * 0.5;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.arc(sonarX, sonarY, radius, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        // 2. Bow water spray particles
        particles.forEach(p => {
          p.x += p.vx + Math.sin(time) * 0.8;
          p.y += p.vy - 0.5; // rising spray

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // 3. Dynamic water wake lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 2;
        for (let x = 0; x < canvas.width; x += 15) {
          const y = canvas.height * 0.78 + Math.sin(x * 0.015 + time * 4) * 18;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeStage]);

  // Jump to stage
  const jumpToStage = (stage: 'lab' | 'ship') => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = stage === 'lab' 
      ? scrollTop + rect.top + 50 
      : scrollTop + rect.top + (rect.height * 0.6);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Motion calculations
  // Lab motion: scale 1.05 -> 1.15, slight pan
  const labScale = 1.05 + scrollProgress * 0.15;
  const labOpacity = scrollProgress < 0.45 ? 1 : Math.max(0, 1 - (scrollProgress - 0.45) * 8);

  // Ship motion: scale 1.02 -> 1.18, subtle tilt and surge
  const shipProgress = Math.max(0, (scrollProgress - 0.45) / 0.55);
  const shipScale = 1.02 + shipProgress * 0.18;
  const shipTilt = (shipProgress - 0.5) * 3; // slight dynamic pitch
  const shipOpacity = scrollProgress < 0.4 ? 0 : Math.min(1, (scrollProgress - 0.4) * 8);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#121926] text-white"
      style={{ height: '260vh' }}
    >
      {/* Pinned Sticky Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* --- BACKGROUND MOTION GRAPHIC LAYERS --- */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: RESEARCH LAB VISUAL (STAGE 1) */}
          <div 
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ 
              opacity: labOpacity,
              transform: `scale(${labScale})`,
              transformOrigin: 'center center'
            }}
          >
            <Image
              src="/images/motion/lab_motion.jpg"
              alt="NTCPWC Maritime Hydrodynamic Wave Basin Research Laboratory"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Cinematic Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1726]/90 via-[#0e1726]/30 to-[#0e1726]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0e1726]/20 to-[#0e1726]/90" />
          </div>

          {/* LAYER 2: WATER & SHIP VISUAL (STAGE 2) */}
          <div 
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ 
              opacity: shipOpacity,
              transform: `scale(${shipScale}) rotate(${shipTilt}deg)`,
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
            {/* Cinematic Sea Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091522]/90 via-[#091522]/20 to-[#091522]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#091522]/20 to-[#091522]/85" />
          </div>

          {/* LAYER 3: REAL-TIME INTERACTIVE CANVAS (Lasers, Water Particles, Sonar) */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-10 pointer-events-none" 
          />

          {/* Digital Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        </div>

        {/* --- TOP HUD BAR: FULL WIDTH WITH SMALL GAPS --- */}
        <header className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#1c2738]/85 backdrop-blur-xl border border-white/10 shadow-2xl">
            
            {/* Brand Status */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  REAL-TIME HYDRODYNAMIC MOTION GRAPHICS
                </span>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>NTCPWC Discovery Campus</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                    {activeStage === 'lab' ? 'STAGE 01: RESEARCH LAB' : 'STAGE 02: WATER & SHIP'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stage Toggle Tabs */}
            <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => jumpToStage('lab')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStage === 'lab'
                    ? 'bg-[#b45309] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>01. Research Lab</span>
              </button>
              <button
                onClick={() => jumpToStage('ship')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStage === 'ship'
                    ? 'bg-[#0284c7] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Ship className="w-4 h-4" />
                <span>02. Water &amp; Ship</span>
              </button>
            </div>

            {/* Scroll Progress Meter */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-slate-400">Scroll Depth</div>
                <div className="text-xs font-mono font-bold text-amber-400">
                  {Math.round(scrollProgress * 100)}%
                </div>
              </div>
              <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-400 transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

          </div>
        </header>

                {/* --- CENTER / LOWER DYNAMIC CONTENT OVERLAY --- */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 my-auto">
          <div className="relative w-full min-h-[380px] flex items-center">
            
            {/* CONTENT CARD FOR STAGE 1: RESEARCH LAB */}
            <div className={`transition-all duration-700 ease-out max-w-2xl bg-[#0f172a]/92 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl ${
              activeStage === 'lab' 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-6 pointer-events-none absolute inset-x-0 mx-auto sm:mx-0'
            }`}>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-3">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span>SECTION 01: ADVANCED RESEARCH &amp; HYDRAULIC MODELING LAB</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Physical Wave Basin &amp; 3D Laser Modeling
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                India&apos;s flagship 90-meter shallow water wave flume and multi-directional basin. 
                Coupling physical automated wave generators with laser topography scanning and coupled 
                Navier-Stokes particle physics.
              </p>

              {/* Live Telemetry Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-emerald-400">Flume Length</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">90.0 m</div>
                  <div className="text-[9px] text-slate-400">Glass Observation</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-emerald-400">Wave Height (H)</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">
                    {(1.2 + Math.sin(scrollProgress * 20) * 0.35).toFixed(2)} m
                  </div>
                  <div className="text-[9px] text-slate-400">Active Attenuation</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-emerald-400">Wave Velocity</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">3.45 m/s</div>
                  <div className="text-[9px] text-slate-400">Laser Doppler Vector</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-emerald-400">Precision</div>
                  <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">99.4%</div>
                  <div className="text-[9px] text-slate-400">Validated NABL</div>
                </div>
              </div>

              {/* Scroll Callout */}
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                  <span>Scroll down to deploy into open water &amp; vessel research</span>
                </span>
                <span className="font-mono text-slate-500">NTCPWC • IIT MADRAS</span>
              </div>

            </div>

            {/* CONTENT CARD FOR STAGE 2: WATER & SHIP */}
            <div className={`transition-all duration-700 ease-out max-w-2xl ml-auto bg-[#091522]/92 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl ${
              activeStage === 'ship' 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-6 pointer-events-none absolute right-0'
            }`}>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold mb-3">
                <Ship className="w-3.5 h-3.5" />
                <span>SECTION 02: OCEANOGRAPHIC RESEARCH VESSEL &amp; WATER DYNAMICS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Hydrographic Survey Catamaran in Open Water
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Cutting through deep sea monsoon waves with hydrodynamic bow wake dispersal. 
                Deploying subsea acoustic multi-beam sonar arrays and LiDAR mapping down to 
                centimeter precision across Indian coastal fairways.
              </p>

              {/* Vessel Telemetry Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-sky-400">Vessel Speed</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">
                    {(14.2 + (scrollProgress - 0.5) * 3.4).toFixed(1)} kts
                  </div>
                  <div className="text-[9px] text-slate-400">Twin Azimuth Prop.</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-sky-400">Sonar Depth</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">184.2 m</div>
                  <div className="text-[9px] text-slate-400">512-Beam Acoustic</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-sky-400">Bow Pressure</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">310 kPa</div>
                  <div className="text-[9px] text-slate-400">Wave Impact Force</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-sky-400">Sea State</div>
                  <div className="text-base font-mono font-bold text-sky-400 mt-0.5">State 4</div>
                  <div className="text-[9px] text-slate-400">Moderate Rough</div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <Compass className="w-4 h-4 animate-spin" />
                  <span>Real-time Indian Oceanographic Telemetry Active</span>
                </span>
                <span className="font-mono text-slate-500">R/V DISCOVERY • MoPSW</span>
              </div>

            </div>

          </div>
        </div>

        {/* --- BOTTOM CONTROLS & TIMELINE BAR --- */}
        <footer className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pb-6">
          <div className="p-4 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            
            {/* Timeline Stepper */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${activeStage === 'lab' ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                <span className={`font-semibold ${activeStage === 'lab' ? 'text-white' : 'text-slate-400'}`}>
                  01. Physical Lab Flume
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${activeStage === 'ship' ? 'bg-sky-400 animate-ping' : 'bg-slate-600'}`} />
                <span className={`font-semibold ${activeStage === 'ship' ? 'text-white' : 'text-slate-400'}`}>
                  02. Open Ocean Water &amp; Ship
                </span>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="text-slate-400 font-medium hidden sm:flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Scroll to control hydrodynamics, laser telemetry &amp; vessel kinematics</span>
            </div>

          </div>
        </footer>

      </div>
    </section>
  );
}
