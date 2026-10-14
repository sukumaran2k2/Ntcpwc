'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Layers, 
  Activity, 
  Compass, 
  Radio, 
  ShieldCheck, 
  Sliders, 
  RotateCcw,
  Waves
} from 'lucide-react';

const TOTAL_FRAMES = 75;

interface PhaseContent {
  range: [number, number]; // [start, end] progress
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetry: { label: string; value: string; unit?: string }[];
}

const phases: PhaseContent[] = [
  {
    range: [0, 0.28],
    badge: 'PHASE 01 · HYDRODYNAMIC TESTBEDS',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    title: 'Dynamic Ocean Wave Kinematics',
    subtitle: 'Physical Wave Basin & Numerical Particle Flume',
    description: 'Scrub through continuous fluid wave particle trajectories modeled at IIT Madras Discovery Campus. Our coupled Navier-Stokes solver captures turbulent wave crests and deepwater wave break energy.',
    icon: Waves,
    telemetry: [
      { label: 'Wave Energy', value: '1.45', unit: 'm' },
      { label: 'Particle Speed', value: '3.2', unit: 'm/s' },
      { label: 'Reynolds No.', value: '1.24e6', unit: '' }
    ]
  },
  {
    range: [0.28, 0.54],
    badge: 'PHASE 02 · HYDROGRAPHIC SURVEYS',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    title: 'Autonomous Subsea LiDAR & Sonar',
    subtitle: 'High-Resolution 3D Bathymetric Mapping',
    description: 'Unmanned Surface Vessels (USVs) deploy multi-beam acoustic telemetry, mapping shipping fairways and subsea pipelines down to 2mm accuracy across rough monsoon seas.',
    icon: Radio,
    telemetry: [
      { label: 'Sonar Array', value: '512', unit: 'ch' },
      { label: 'Survey Depth', value: '0 - 300', unit: 'm' },
      { label: 'Point Cloud', value: '99.8', unit: '%' }
    ]
  },
  {
    range: [0.54, 0.78],
    badge: 'PHASE 03 · DEEPWATER PORTS',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    title: 'AI-Orchestrated Berth Dynamics',
    subtitle: 'Harbour Wave Agitation & Mooring Telemetry',
    description: 'Simulating complex vessel berthing dynamics, hydrodynamic ship-to-ship interaction, and automated container terminal operations to cut vessel turnaround times by 42%.',
    icon: Compass,
    telemetry: [
      { label: 'Berth Agitation', value: '0.12', unit: 'm' },
      { label: 'Port Efficiency', value: '94', unit: '%' },
      { label: 'Mooring Safety', value: '100', unit: '%' }
    ]
  },
  {
    range: [0.78, 1.0],
    badge: 'PHASE 04 · CLIMATE RESILIENCE',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    title: 'Resilient Coastal Armor Defenses',
    subtitle: 'Wave Dissipation & Estuarine Sediment Control',
    description: 'Engineered interlocking concrete tetrapod seawalls and sand bypass systems dissipating storm surge energy to protect over 7,500 km of India’s vital coastline.',
    icon: ShieldCheck,
    telemetry: [
      { label: 'Wave Dissipation', value: '88.4', unit: '%' },
      { label: 'Sensor Matrix', value: '64', unit: 'nodes' },
      { label: 'Erosion Arrest', value: '96.2', unit: '%' }
    ]
  }
];

export default function CanvasScrollMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Preload all 75 frames into memory
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/ocean/frame_${numStr}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      mounted = false;
    };
  }, []);

  // Draw frame to canvas with aspect-ratio cover
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect ratio cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Resize canvas according to display resolution & DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Redraw current frame
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, currentFrame - 1));
      renderFrame(frameIdx);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, currentFrame]);

  // Handle scroll-driven animation
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      if (!containerRef.current || isPlaying) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);

      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      setCurrentFrame(frameIdx + 1);
      renderFrame(frameIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, isPlaying]);

  // Auto-play / playback simulation loop
  useEffect(() => {
    if (!isPlaying || !isLoaded) return;

    let animId: number;
    let lastTime = performance.now();
    const fps = 24;
    const interval = 1000 / fps;

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        setCurrentFrame((prev) => {
          const next = prev >= TOTAL_FRAMES ? 1 : prev + 1;
          renderFrame(next - 1);
          setScrollProgress((next - 1) / (TOTAL_FRAMES - 1));
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isLoaded]);

  // Determine current active phase content
  const activePhase = phases.find(
    (p) => scrollProgress >= p.range[0] && scrollProgress <= p.range[1]
  ) || phases[0];

  const Icon = activePhase.icon;

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#020b18] text-white h-[350vh]"
    >
      {/* Sticky Fullscreen Frame-by-Frame Motion Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Ambient background glow and grid */}
        <div className="absolute inset-0 bg-radial from-cyan-950/30 via-slate-950/70 to-[#020b18] pointer-events-none" />

        {/* HTML5 Motion Canvas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover pointer-events-none transition-opacity duration-500"
            style={{ opacity: isLoaded ? 1 : 0.2 }}
          />
          {/* Subtle cinematic gradient vignette over canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-transparent to-[#020b18]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020b18]/90 via-transparent to-[#020b18]/40 pointer-events-none" />
        </div>

        {/* Loading overlay HUD while preloading frames */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 bg-[#020b18]/95 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
            <div className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-2">
              Buffering Motion Graphic Frames...
            </div>
            <div className="text-slate-400 text-xs font-mono mb-4">
              {loadedCount} / {TOTAL_FRAMES} Frames Loaded ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
            </div>
            <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-150"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Top Header HUD Bar */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pt-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                Interactive Frame-by-Frame Motion Animation
              </div>
              <div className="text-sm font-bold text-white tracking-tight hidden sm:block">
                Scroll to Control 3D Ocean Fluid Dynamics
              </div>
            </div>
          </div>

          {/* Controls: Play/Pause Auto Scrub */}
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto' : 'Auto Play'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              FR: <strong className="text-cyan-400">{String(currentFrame).padStart(2, '0')}</strong>/{TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* Center Floating Motion Graphic Narrative Card */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-auto w-full my-auto">
          <div className="max-w-xl">
            {/* Animated phase badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border mb-4 backdrop-blur-md bg-slate-950/80 border-cyan-500/40 text-cyan-300">
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activePhase.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              {activePhase.title}
            </h2>

            <div className="text-sm sm:text-base font-semibold text-cyan-300/90 mb-4">
              {activePhase.subtitle}
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 bg-slate-950/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              {activePhase.description}
            </p>

            {/* Live Telemetry Matrix */}
            <div className="grid grid-cols-3 gap-3">
              {activePhase.telemetry.map((t, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {t.label}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg font-bold font-mono text-cyan-300">
                      {t.value}
                    </span>
                    {t.unit && (
                      <span className="text-xs text-slate-400 font-mono">{t.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Scrubbing Progress Rail & Timeline */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pb-6 w-full">
          <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Timeline phase indicators */}
            <div className="flex items-center gap-2 text-xs font-mono w-full sm:w-auto">
              {phases.map((p, pIdx) => {
                const isCurrent = scrollProgress >= p.range[0] && scrollProgress <= p.range[1];
                return (
                  <div 
                    key={pIdx}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                      isCurrent 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>0{pIdx + 1}</span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Scrub Slider Progress Bar */}
            <div className="flex-1 w-full flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">0%</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-75 relative"
                  style={{ width: `${scrollProgress * 100}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 font-bold">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Scroll Hint */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scroll wheel scrub</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
