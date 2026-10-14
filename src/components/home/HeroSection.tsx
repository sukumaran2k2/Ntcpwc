"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Anchor,
  Cpu,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";

const heroSlides = [
  {
    id: 1,
    tag: "CENTRE OF EXCELLENCE • SAGARMALA PROGRAMME",
    title: "Advancing India's",
    highlight: "Maritime Future",
    description:
      "World-class ocean engineering, numerical modeling, and physical hydraulic laboratory testing at IIT Madras Discovery Campus.",
    cta: "Explore Research Labs",
    ctaHref: "/research",
    accent: "Deepwater Port Infrastructure & Numerical Modeling",
  },
  {
    id: 2,
    tag: "COASTAL DEFENSE • RESILIENCE",
    title: "Safer Coasts,",
    highlight: "Resilient Waterways",
    description:
      "Leading national research in coastal erosion mitigation, 3D wave basin simulation, port hydraulics, and smart dredging technology.",
    cta: "View Coastal Studies",
    ctaHref: "/research#coastal",
    accent: "Wave-Structure Interaction & Shoreline Protection",
  },
  {
    id: 3,
    tag: "AUTONOMOUS NAVIGATION • INNOVATION",
    title: "Indigenous Tech for",
    highlight: "Smart Waterways",
    description:
      "Developing uncrewed surface survey vessels (USVs), real-time bathymetry systems, and navigational intelligence for maritime authorities.",
    cta: "Our World-Class Facilities",
    ctaHref: "/facilities",
    accent: "360-Degree Ship Simulator & High-Performance HPC Cluster",
  },
];

const floatingStats = [
  { value: "150+", label: "Major Port Projects", icon: Anchor },
  { value: "6", label: "World-Class Hydraulic Labs", icon: Compass },
  { value: "₹1,450 Cr+", label: "Infrastructure Assessed", icon: ShieldCheck },
  { value: "40+", label: "Patents & Standards", icon: Cpu },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  };

  // Autoplay video reliably on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.defaultMuted = true;
      vid.muted = true;
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      vid.setAttribute("webkit-playsinline", "");
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Video autoplay waiting for interaction:", err);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  // Slide interval
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between text-white overflow-hidden pt-36 pb-10">
      {/* 1. Cinematic Background Video Layer (Fixed: z-0 instead of -z-10, translucent overlay so waves are clearly visible) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/maritime_ocean_waves.mp4" type="video/mp4" />
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>

        {/* Translucent cinematic gradient - gives high contrast to text while keeping ocean waves vibrant and clearly visible */}
        <div className="absolute inset-0 bg-slate-950/35 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40" />
      </div>

      {/* 2. Top Controls Bar: Video Status & Play/Pause */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 w-full pt-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-[11.5px] font-semibold text-blue-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <Waves className="w-4 h-4 text-blue-300" />
          <span>Live Wave Basin & Maritime Ocean Stream</span>
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs text-white transition-colors cursor-pointer shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-[11px] font-semibold">Pause Video</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-blue-300 fill-blue-300" />
                <span className="text-[11px] font-semibold">Play Video</span>
              </>
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="w-8 h-8 rounded-lg bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-blue-300" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Main Hero Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="max-w-3xl">
          {/* Government / Sagarmala Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-wide uppercase mb-6 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>{slide.tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            {slide.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-100 to-white">
              {slide.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal drop-shadow-md">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href={slide.ctaHref}
              id="hero-primary-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-blue-950/50 hover:-translate-y-0.5"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              id="hero-about-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md text-white font-medium text-sm border border-white/30 transition-all duration-150 hover:-translate-y-0.5"
            >
              <span>About NTCPWC</span>
            </Link>
          </div>

          {/* Current Focus Highlight pill */}
          <div className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200">
            <span className="text-blue-400 font-semibold">Active Pillar:</span>
            <span>{slide.accent}</span>
          </div>
        </div>
      </div>

      {/* 4. Floating Bottom Bar: Stats + Controls */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="bg-[#0b1e36]/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full lg:w-auto">
            {floatingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white font-display leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Pagination & Controls */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === idx ? "w-7 bg-blue-500" : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 border-l border-slate-700 pl-4">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
