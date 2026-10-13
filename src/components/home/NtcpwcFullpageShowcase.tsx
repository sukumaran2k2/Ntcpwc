'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  Waves, 
  Compass, 
  Radio, 
  Anchor, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface FullpageSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  metrics: { label: string; value: string; detail: string }[];
  highlights: string[];
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
}

const slides: FullpageSlide[] = [
  {
    id: 'discovery-campus',
    category: 'MINISTRY OF PORTS, SHIPPING & WATERWAYS · SAGARMALA',
    title: 'National Technology Centre for Ports, Waterways & Coasts',
    subtitle: 'Centre of Excellence at IIT Madras Discovery Campus',
    tagline: 'Pioneering indigenous marine engineering solutions, world-class testing facilities, and technology transfer for India’s blue economy.',
    image: '/images/ntcpwc/campus.jpg',
    metrics: [
      { label: 'Major Port Projects', value: '150+', detail: 'Completed across Indian coastlines' },
      { label: 'Infrastructure Assessed', value: '₹1,450 Cr+', detail: 'Port & waterway assets' },
      { label: 'Patents & Standards', value: '40+', detail: 'Indigenous IP & design codes' }
    ],
    highlights: [
      'Established under the flagship Sagarmala Programme by MoPSW',
      'Dedicated state-of-the-art facility at Discovery Campus, Thaiyur',
      'Direct technical advisory to 12 Major Ports & State Maritime Boards'
    ],
    primaryLink: { label: 'Explore Centre Facilities', href: '/facilities' },
    secondaryLink: { label: 'About NTCPWC', href: '/about' }
  },
  {
    id: 'wave-basin',
    category: 'HYDRODYNAMIC TESTING & SIMULATION',
    title: '360° Physical Wave Basin & Numerical Flumes',
    subtitle: 'India’s Premier Shallow Water Ocean Engineering Testbed',
    tagline: 'Combining physical multi-directional wave generation with cutting-edge 3D Computational Fluid Dynamics (CFD) for deepwater and coastal infrastructure.',
    image: '/images/ntcpwc/wave_basin.jpg',
    metrics: [
      { label: 'Basin Dimensions', value: '50m × 30m', detail: '360° segmented wavemaker' },
      { label: 'Wave Flume Length', value: '90m', detail: 'Equipped with active wave absorption' },
      { label: 'Model Scale Accuracy', value: '99.4%', detail: 'Validated with field sea-trials' }
    ],
    highlights: [
      'Multi-directional random wave generation & solitary surge simulation',
      'Hydrodynamic force measurement on berthing structures & breakwaters',
      'Coupled sediment transport flume for harbour siltation modeling'
    ],
    primaryLink: { label: 'View Wave Basin Specs', href: '/facilities' },
    secondaryLink: { label: 'Research Publications', href: '/publications' }
  },
  {
    id: 'ship-simulator',
    category: 'MARITIME NAVIGATION & SAFETY',
    title: '360° Full-Mission Ship Handling Simulator',
    subtitle: 'Real-Time Navigation & Port Channel Optimization',
    tagline: 'Full-bridge cylindrical simulator replicating actual Indian port entry channels, tidal currents, and extreme meteorological conditions for vessel pilotage.',
    image: '/images/ntcpwc/simulator.jpg',
    metrics: [
      { label: 'Visual Display Arc', value: '360°', detail: 'Seamless panoramic cylinder projection' },
      { label: 'Port Geometries', value: '25+', detail: 'High-fidelity Indian port 3D models' },
      { label: 'Pilotage Training', value: '1,200+', detail: 'Marine pilots & masters trained' }
    ],
    highlights: [
      'Real-time hydrodynamic ship maneuverability in confined navigation channels',
      'Tug assistance simulation for ultra-large container vessels (ULCVs)',
      'Channel deepening & alignment feasibility studies before dredging'
    ],
    primaryLink: { label: 'Simulations & Training', href: '/training-education' },
    secondaryLink: { label: 'Consultancy Services', href: '/services' }
  },
  {
    id: 'autonomous-surveys',
    category: 'OCEAN ROBOTICS & HYDROGRAPHY',
    title: 'Autonomous Hydrographic USV Catamarans',
    subtitle: 'Millimetric 3D Sonar & Subsea Bathymetry',
    tagline: 'Deploying autonomous surface vessels equipped with dual-frequency multi-beam echo sounders, sub-bottom profilers, and underwater LiDAR for continuous waterway surveillance.',
    image: '/images/ntcpwc/survey.jpg',
    metrics: [
      { label: 'Bathymetry Accuracy', value: '±2mm', detail: 'Sub-centimeter seabed mapping' },
      { label: 'Survey Depth Range', value: '0 - 300m', detail: 'Estuarine to deepwater offshore' },
      { label: 'Endurance', value: '72 hrs', detail: 'Continuous autonomous mission time' }
    ],
    highlights: [
      'Real-time point-cloud seabed contour generation & pipeline inspection',
      'Automated dredge volume estimation for national waterways',
      'Environmental monitoring with integrated water quality telemetry'
    ],
    primaryLink: { label: 'Hydrographic Services', href: '/services' },
    secondaryLink: { label: 'Our Products & USVs', href: '/products' }
  },
  {
    id: 'coastal-defense-ports',
    category: 'INFRASTRUCTURE RESILIENCE & CLIMATE ADAPTATION',
    title: 'Deepwater Smart Ports & Coastal Protection',
    subtitle: 'Protecting 7,500 km of National Coastline',
    tagline: 'Designing interlocking armor breakwaters, automated port berths, and shore protection systems to combat storm surges, sea-level rise, and coastal erosion.',
    image: '/images/ntcpwc/coastal.jpg',
    metrics: [
      { label: 'Wave Energy Dissipation', value: '88%+', detail: 'Engineered tetrapod armor units' },
      { label: 'Coastline Protected', value: '450+ km', detail: 'Through NTCPWC design solutions' },
      { label: 'Berth Efficiency Gain', value: '42%', detail: 'Via automated logistics integration' }
    ],
    highlights: [
      'Comprehensive shoreline management plans for coastal states',
      'Tidal barrage & estuary stabilization engineering',
      'Zero-emission green port development & dredging efficiency'
    ],
    primaryLink: { label: 'Research Disciplines', href: '/research' },
    secondaryLink: { label: 'Contact Centre Experts', href: '/contact' }
  }
];

export default function NtcpwcFullpageShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Keyboard navigation (Arrow keys, PageUp/PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSlide(Math.min(slides.length - 1, activeSlide + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(Math.max(0, activeSlide - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slides.length) return;
    setActiveSlide(index);
    const target = document.getElementById(slides[index].id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const index = Math.round(scrollY / viewportHeight);
      if (index >= 0 && index < slides.length && index !== activeSlide) {
        setActiveSlide(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSlide]);

  return (
    <div ref={containerRef} className="relative bg-[#020b18] text-white">
      {/* Floating Vertical Chapter Indicator Rail (Right side) */}
      <nav 
        aria-label="Section navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3.5"
      >
        {slides.map((s, idx) => {
          const isActive = idx === activeSlide;
          return (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
              aria-label={`Go to ${s.title}`}
            >
              {/* Tooltip on hover */}
              <span className={`text-xs font-mono tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 px-2 py-1 rounded bg-slate-900/90 text-cyan-300 border border-cyan-500/30 whitespace-nowrap ${
                isActive ? 'opacity-100' : ''
              }`}>
                0{idx + 1} · {s.id.toUpperCase().replace(/-/g, ' ')}
              </span>
              
              {/* Dot */}
              <div className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-8 bg-cyan-400 shadow-[0_0_12px_#00b4d8]' 
                  : 'w-2.5 bg-white/30 group-hover:bg-white/70'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Top Floating Mini Status Pill */}
      <div className="fixed top-24 left-8 z-30 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="tracking-wider">NTCPWC MOTION ARCHIVE</span>
        <span className="text-slate-500">|</span>
        <span className="text-white font-bold">0{activeSlide + 1} / 0{slides.length}</span>
      </div>

      {/* Full-Height Slides */}
      {slides.map((slide, idx) => (
        <section
          key={slide.id}
          id={slide.id}
          className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden snap-start border-b border-cyan-950/50"
        >
          {/* Fullscreen Motion Graphic Backdrop */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center scale-[1.02] transition-transform duration-1000 ease-out"
            />
            
            {/* Professional Vignette and Dark Tint Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-[#020b18]/60 to-[#020b18]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020b18]/95 via-[#020b18]/70 to-transparent" />
            
            {/* Subtle Grid Accent */}
            <div 
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#00b4d8 1px, transparent 1px), linear-gradient(90deg, #00b4d8 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }}
            />
          </div>

          {/* Slide Top Spacing */}
          <div className="relative z-10 pt-28 sm:pt-32" />

          {/* Slide Main Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-8">
            <div className="max-w-3xl">
              
              {/* Category Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{slide.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <div className="text-lg sm:text-2xl font-medium text-cyan-300/90 mb-4 tracking-wide">
                {slide.subtitle}
              </div>

              {/* Tagline Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-8">
                {slide.tagline}
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {slide.highlights.map((item, hIdx) => (
                  <div 
                    key={hIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/50 backdrop-blur-md p-2.5 rounded-xl border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={slide.primaryLink.href}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,180,216,0.35)] transition-all flex items-center gap-2"
                >
                  <span>{slide.primaryLink.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {slide.secondaryLink && (
                  <Link
                    href={slide.secondaryLink.href}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
                  >
                    <span>{slide.secondaryLink.label}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Link>
                )}
              </div>

            </div>
          </div>

          {/* Slide Bottom Metrics Matrix Strip */}
          <div className="relative z-10 w-full border-t border-white/10 bg-slate-950/70 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 w-full sm:w-auto">
                {slide.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                      {m.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white font-semibold mt-0.5">
                      {m.label}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {m.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Next Slide Arrow Button */}
              {idx < slides.length - 1 ? (
                <button
                  onClick={() => goToSlide(idx + 1)}
                  className="hidden md:flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>NEXT: 0{idx + 2} {slides[idx + 1].id.toUpperCase().replace(/-/g, ' ')}</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              ) : (
                <button
                  onClick={() => goToSlide(0)}
                  className="hidden md:flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>BACK TO TOP</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}

            </div>
          </div>

        </section>
      ))}

      {/* Clean Institutional Bottom Overview Strip */}
      <footer className="relative z-10 bg-[#010813] text-slate-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-white font-bold text-base">
              National Technology Centre for Ports, Waterways and Coasts (NTCPWC)
            </div>
            <div className="text-xs text-slate-400">
              IIT Madras Discovery Campus, Thaiyur, Chennai – 600 127 · Ministry of Ports, Shipping and Waterways
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/about" className="hover:text-cyan-300 transition-colors">About Us</Link>
            <Link href="/facilities" className="hover:text-cyan-300 transition-colors">Facilities</Link>
            <Link href="/services" className="hover:text-cyan-300 transition-colors">Services</Link>
            <Link href="/research" className="hover:text-cyan-300 transition-colors">Research</Link>
            <Link href="/publications" className="hover:text-cyan-300 transition-colors">Publications</Link>
            <Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
