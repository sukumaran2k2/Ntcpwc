'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function HeroMotionSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entrance animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

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
        
        {/* ================= UPPER HERO GRID: KINETIC TYPOGRAPHY + DISCOVERY CAMPUS VISUAL ================= */}
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

          {/* RIGHT COLUMN: DISCOVERY CAMPUS VISUAL SHOWCASE (5 cols) */}
          <div 
            className={`lg:col-span-5 transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#e2d5c3] shadow-xl group">
              
              {/* Image Window */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#241a12]">
                <Image
                  src="/images/ntcpwc/campus_hq.jpg"
                  alt="NTCPWC IIT Madras Discovery Campus"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/85 via-transparent to-transparent" />
                
                {/* Floating Badge in Warm Sand */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#6e4e2a] text-xs font-bold shadow-md border border-[#e8ded0]">
                  IIT MADRAS DISCOVERY CAMPUS
                </div>

                {/* Bottom Caption inside media */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#deb887] mb-1">
                    20-Acre Research Infrastructure
                  </div>
                  <div className="text-sm font-semibold leading-snug">
                    National Technology Centre for Ports, Waterways and Coasts (NTCPWC)
                  </div>
                </div>
              </div>

              {/* Quick Info bar below hero visual */}
              <div className="p-4 bg-[#faf6f0] border-t border-[#e8ded0] flex items-center justify-between text-xs text-[#6e5d4e]">
                <span className="font-semibold text-[#543f2a]">Discovery Campus • Thaiyur, Chennai</span>
                <Link href="/about" className="font-semibold text-[#8c6d46] hover:text-[#6e4e2a] flex items-center gap-1">
                  <span>Virtual Tour</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
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
