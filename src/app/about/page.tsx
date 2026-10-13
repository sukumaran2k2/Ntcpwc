'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { teamMembers } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#291e13] font-sans antialiased selection:bg-[#c29b68]/30 selection:text-[#291e13]">
      <Navbar />

      <main className="pt-24 sm:pt-28">
        
        {/* HERO SECTION IN WARM SANDSTONE */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#f5ede1] via-[#faf5ec] to-[#fcfaf7] border-b border-[#e8ded0]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d8cbbb] text-xs font-bold text-[#b45309] shadow-xs mb-4">
                <span>ESTABLISHED 2018 • IIT MADRAS &amp; MoPSW</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.1]">
                About <span className="text-[#b45309]">NTCPWC</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] leading-relaxed">
                National Technology Centre for Ports, Waterways &amp; Coasts — The premier technological arm of the Ministry of Ports, Shipping and Waterways, Government of India.
              </p>
            </div>
          </div>
        </section>

        {/* 1. AUTHENTIC OVERVIEW & CAMPUS BUILDING PHOTO (FROM USER SCREENSHOT) */}
        <section className="py-16 md:py-24 bg-white border-b border-[#e8ded0]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
              
              {/* Left Column: Authentic Text */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e05038] tracking-tight">
                    NTCPWC
                  </h2>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#24335c] mt-1.5 leading-snug">
                    National Technology Centre for Ports, Waterways &amp; Coasts
                  </h3>
                </div>

                {/* Exact Text from Old Website Screenshot */}
                <p className="text-sm sm:text-base text-[#4a3b2c] leading-relaxed text-justify">
                  The National Technology Centre for Ports, Waterways &amp; Coasts (NTCPWC) has been envisioned as the 
                  centre for technological innovations and evolution of new ideas and breakthroughs for the port and maritime sector. 
                  It works as the technology arm of Ministry of Shipping and providing the needful technological support to ports, 
                  IWAI and other institutions. This Centre gives effective solutions to an extensive range of problems being faced 
                  in the industry through scientific support and also providing valuable education, applied research and technology 
                  transfer in maritime transportation at the local, regional, national and International levels. This Centre was set up 
                  as an Centre for Excellence at the Indian Institute of Technology Madras (IITM), Chennai during 2018 and expanded its 
                  activities both in research and development of a new campus at Thaiyur, Kelambakkam, Chennai.
                </p>

                {/* Key Pillars */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#e8ded0]">
                    <div className="text-xs font-mono font-bold text-[#b45309]">01. RESEARCH</div>
                    <div className="text-xs font-semibold text-[#291e13] mt-1">Applied Hydrodynamics</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#e8ded0]">
                    <div className="text-xs font-mono font-bold text-[#b45309]">02. INDIGENOUS</div>
                    <div className="text-xs font-semibold text-[#291e13] mt-1">Make in India Solutions</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#e8ded0]">
                    <div className="text-xs font-mono font-bold text-[#b45309]">03. CONSULTANCY</div>
                    <div className="text-xs font-semibold text-[#291e13] mt-1">12 Major Ports Advisory</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Campus Building Photo */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-[#d8cbbb] shadow-xl">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/ntcpwc/campus_hq.jpg"
                      alt="NTCPWC Discovery Campus Building, Thaiyur, Chennai"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3.5 bg-[#faf6f0] border-t border-[#e8ded0] flex items-center justify-between text-xs text-[#543f2a]">
                    <div>
                      <div className="font-bold text-[#291e13]">Discovery Campus Building</div>
                      <div className="text-[11px] text-[#736353]">Thaiyur, Kelambakkam, Chennai</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white border border-[#d8cbbb] text-[10px] font-mono font-bold text-[#8c6d46]">
                      IIT MADRAS
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* 2. AUTHENTIC MISSION STATEMENT (FROM USER SCREENSHOT) */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#fdfbf7] border border-[#e8ded0] shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#24335c] mb-6">
                Mission Statement
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#3d3125] leading-relaxed">
                
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <span className="text-[#e05038] font-black text-lg select-none leading-none mt-0.5">&gt;&gt;</span>
                  <p>
                    To empower &lsquo;Make in India&rsquo; for Port, Coastal and Inland water transport and engineering by developing state-of-the-art technologies and application products.
                  </p>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <span className="text-[#e05038] font-black text-lg select-none leading-none mt-0.5">&gt;&gt;</span>
                  <p>
                    To enable fast-track innovations in order to provide most appropriate solutions to various challenges.
                  </p>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <span className="text-[#e05038] font-black text-lg select-none leading-none mt-0.5">&gt;&gt;</span>
                  <p>
                    To create a pool of competent manpower equipped with state-of-the-art theoretical and practical knowhow.
                  </p>
                </div>

                {/* Bullet 4 with sub-bullets */}
                <div className="flex items-start gap-3">
                  <span className="text-[#e05038] font-black text-lg select-none leading-none mt-0.5">&gt;&gt;</span>
                  <div className="space-y-2">
                    <p className="font-semibold text-[#24335c]">
                      Self-sufficiency in providing:
                    </p>
                    <div className="pl-4 space-y-2 text-sm text-[#4a3b2c]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#e05038] font-bold">&gt;</span>
                        <span>Short term solutions through scientific studies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#e05038] font-bold">&gt;</span>
                        <span>Technology development</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#e05038] font-bold">&gt;</span>
                        <span>Technical arm in identifying complex problems and solving issues</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. LEADERSHIP TEAM */}
        <section className="py-16 md:py-24 bg-[#fcfaf7] border-b border-[#e8ded0]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold tracking-wider text-[#b45309] uppercase">
                SCIENTIFIC LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#291e13] mt-1">
                Our Distinguished Team
              </h2>
              <p className="text-sm text-[#5e5042] mt-2">
                Eminent faculty, lead researchers, and domain experts from IIT Madras steering India&apos;s maritime technological independence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="p-6 rounded-2xl bg-white border border-[#e8ded0] text-center shadow-xs hover:shadow-md transition-all">
                  <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-[#d8cbbb]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-[#291e13]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#b45309] mt-1">{member.title}</p>
                  <p className="text-[11px] text-[#7a6b5c] mt-1">{member.qualification}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* COMPLETE INSTITUTIONAL FOOTER (AUTHENTIC FROM SCREENSHOT 2 & 3) */}
      <footer className="bg-[#f4f7fa] text-[#4b5563] pt-16 border-t border-[#dce3ec] text-xs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-8">
            
            {/* Col 1: 4 Institutional Logos, Description & Digital Reach */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="flex items-center gap-3.5 flex-wrap">
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <span className="text-lg">🏛</span>
                  <div className="text-[10px] font-bold text-[#1f2937] leading-tight">
                    IIT MADRAS<br /><span className="text-[8px] text-[#6b7280] font-normal">Chennai</span>
                  </div>
                </div>
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <img src="/ntcpwc_logo.png" alt="NTCPWC" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="text-[10px] font-bold text-[#24335c] leading-tight">
                    NTCPWC<br /><span className="text-[8px] text-[#6b7280] font-normal">MoPSW Center</span>
                  </div>
                </div>
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <span className="text-lg">🌊</span>
                  <div className="text-[10px] font-bold text-[#e05038] leading-tight">
                    SAGARMALA<br /><span className="text-[8px] text-[#6b7280] font-normal">Ports of India</span>
                  </div>
                </div>
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <img src="/emblem.svg" alt="MoPSW" className="h-7 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="text-[10px] font-bold text-[#1f2937] leading-tight">
                    MoPSW<br /><span className="text-[8px] text-[#6b7280] font-normal">Govt. of India</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed max-w-md pt-1">
                The National Technology Centre for Ports, Waterways &amp; Coasts (NTCPWC) has been envisioned as the 
                centre for technological innovations and evolution of new ideas and breakthroughs for the port and maritime sector.
              </p>

              <div className="pt-2">
                <div className="text-sm font-bold text-[#24335c] mb-2.5">
                  Digital Reach
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter / X"
                    className="w-8 h-8 rounded-lg bg-white border border-[#dce3ec] flex items-center justify-center font-bold text-[#e05038] hover:bg-[#e05038] hover:text-white transition-all shadow-xs"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-lg bg-white border border-[#dce3ec] flex items-center justify-center font-bold text-[#e05038] hover:bg-[#e05038] hover:text-white transition-all shadow-xs"
                  >
                    in
                  </a>
                </div>
              </div>

            </div>

            {/* Col 2: Quick Navigation */}
            <div className="lg:col-span-3">
              <div className="text-base font-bold text-[#24335c] mb-4">
                Quick Navigation
              </div>
              <ul className="space-y-2 text-xs font-medium text-[#4b5563]">
                <li><Link href="/" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Home</Link></li>
                <li><Link href="/about" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> About Us</Link></li>
                <li><Link href="/facilities" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Facilities</Link></li>
                <li><Link href="/services" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Services</Link></li>
                <li><Link href="/research" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Research &amp; Developement</Link></li>
                <li><Link href="/products" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Products</Link></li>
                <li><Link href="/training-education" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Training &amp; Education</Link></li>
                <li><Link href="/people" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> People</Link></li>
                <li><Link href="/gallery" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Gallery</Link></li>
                <li><Link href="/news-events" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Media</Link></li>
                <li><Link href="/training-education" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Programs</Link></li>
                <li><Link href="/about" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Careers</Link></li>
              </ul>
            </div>

            {/* Col 3: Get In Touch */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-base font-bold text-[#24335c] mb-4">
                Get In Touch
              </div>

              {/* Main Campus */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-[#fee2e2] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e05038]" />
                </div>
                <div className="text-xs text-[#4b5563] leading-snug">
                  <div className="font-bold text-[#1f2937]">National Technology Centre for Ports, Waterways and Coasts (NTCPWC)</div>
                  <div>New Academic Complex 6th Floor #604-#607</div>
                  <div>Indian Institute Technology Madras</div>
                  <div>Chennai-600036</div>
                </div>
              </div>

              {/* Discovery Campus */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-6 h-6 rounded bg-[#fee2e2] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e05038]" />
                </div>
                <div className="text-xs text-[#4b5563] leading-snug">
                  <div className="font-bold text-[#1f2937]">IIT Madras Discovery Campus,</div>
                  <div>Thaiyur Road, Senganmal, Thaiyur, Pudupakkam,</div>
                  <div>Tamil Nadu, 603103</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-6 h-6 rounded bg-[#fee2e2] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#e05038]" />
                </div>
                <a href="tel:+914422578915" className="hover:text-[#e05038] text-xs font-bold text-[#1f2937] transition-colors">
                  +91 44 22578915
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-[#fee2e2] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#e05038]" />
                </div>
                <a href="mailto:ntcpwc@iitm.ac.in" className="hover:text-[#e05038] text-xs font-bold text-[#1f2937] transition-colors">
                  ntcpwc@iitm.ac.in
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-[#fee2e2] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#e05038]" />
                </div>
                <div className="text-xs text-[#4b5563]">
                  <div className="font-bold text-[#1f2937]">Mon - Fri</div>
                  <div>9:30 AM - 5:30 PM</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Navy Bottom Bar */}
        <div className="bg-[#1c2c54] py-3.5 px-6 lg:px-12 text-white border-t border-[#2d3e6d]">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-3 font-semibold">
              <Link href="/privacy" className="hover:text-[#93c5fd] transition-colors">Privacy Policy</Link>
              <span className="text-gray-400">|</span>
              <Link href="/terms" className="hover:text-[#93c5fd] transition-colors">Terms &amp; Condition</Link>
              <span className="text-gray-400">|</span>
              <Link href="/faq" className="hover:text-[#93c5fd] transition-colors">FAQS</Link>
            </div>
            <div className="text-slate-300 text-right">
              ntcpwc.iitm.ac.in © 2025 All Rights Reserved
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
