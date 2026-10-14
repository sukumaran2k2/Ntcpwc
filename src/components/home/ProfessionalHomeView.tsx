'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollMotionShowcase from './ScrollMotionShowcase';
import HeroMotionSection from './HeroMotionSection';
import Link from 'next/link';
import { 
  Building2, 
  Waves, 
  Compass, 
  Radio, 
  Anchor, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Users, 
  Award, 
  ChevronRight, 
  Star,
  Navigation,
  Ship,
  Sparkles,
  Phone,
  Mail,
  Clock,
  Send,
  Check
} from 'lucide-react';

interface FacilityTab {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
  link: string;
}

const facilityTabs: FacilityTab[] = [
  {
    id: 'wave-basin',
    name: '360° Shallow Water Wave Basin & Hydrodynamic Flumes',
    shortName: 'Wave Basin & Flumes',
    category: 'PHYSICAL TESTING FACILITY',
    description: 'India’s premier physical wave modeling basin couples multi-directional random wave generation with active wave absorption. Designed for testing breakwaters, deepwater berthing structures, and offshore platforms under realistic monsoon sea states.',
    image: '/images/ntcpwc/wave_basin.jpg',
    specs: [
      { label: 'Basin Dimensions', value: '50m × 30m × 1.5m' },
      { label: 'Flume Length', value: '90m Wave Flume' },
      { label: 'Simulation Accuracy', value: '99.4% Validated' }
    ],
    features: [
      'Multi-directional random wave generation & solitary surge simulation',
      'High-precision hydrodynamic wave velocity vector sensors',
      'Coupled sediment transport flume for harbour siltation modeling'
    ],
    link: '/facilities'
  },
  {
    id: 'simulator',
    name: '360° Full-Mission Ship Handling & Bridge Simulator',
    shortName: 'Bridge Simulator',
    category: 'NAVIGATION & SAFETY SIMULATION',
    description: 'A full-scale marine ship handling bridge with real steering helm, radar, and ECDIS displays surrounded by a panoramic 360° cylindrical visual system. Replicates Indian port entrance fairways, tidal currents, and tug maneuvers.',
    image: '/images/ntcpwc/simulator.jpg',
    specs: [
      { label: 'Projection Arc', value: '360° Cylindrical' },
      { label: 'Indian Port Models', value: '25+ High-Res Harbours' },
      { label: 'Pilots Certified', value: '1,200+ Marine Officers' }
    ],
    features: [
      'Hydrodynamic vessel maneuverability in confined navigation channels',
      'Tug assistance simulation for ultra-large container ships',
      'Pre-dredging channel deepening feasibility studies'
    ],
    link: '/training-education'
  },
  {
    id: 'survey-usv',
    name: 'Autonomous Hydrographic Survey USV Catamarans',
    shortName: 'Autonomous USVs',
    category: 'OCEAN ROBOTICS & HYDROGRAPHY',
    description: 'Unmanned catamaran survey vessels developed by NTCPWC equipped with dual-frequency multi-beam echo sounders, sub-bottom profilers, and underwater LiDAR for continuous fairway and estuarine surveillance.',
    image: '/images/ntcpwc/survey.jpg',
    specs: [
      { label: 'Bathymetry Accuracy', value: '±2mm Point Cloud' },
      { label: 'Depth Range', value: '0 - 300m Operational' },
      { label: 'Endurance', value: '72 hrs Mission Time' }
    ],
    features: [
      'Real-time 3D bathymetric contour generation & pipeline inspection',
      'Automated dredge volume computation for national waterways',
      'Autonomous obstacle avoidance in congested port waterways'
    ],
    link: '/products'
  },
  {
    id: 'coastal-defense',
    name: 'Engineered Coastal Defenses & Breakwater Armor Units',
    shortName: 'Coastal Defenses',
    category: 'INFRASTRUCTURE RESILIENCE',
    description: 'State-of-the-art testing for interlocking concrete tetrapod armor units, submerged reefs, and seawalls designed to dissipate severe cyclone storm surges and mitigate coastal erosion across India’s 7,500 km coastline.',
    image: '/images/ntcpwc/coastal.jpg',
    specs: [
      { label: 'Wave Dissipation', value: '88.4% Energy Reduced' },
      { label: 'Coast Safeguarded', value: '450+ km Shoreline' },
      { label: 'Sensor Network', value: '64 Active Stress Nodes' }
    ],
    features: [
      'Physical force-vector stress testing on concrete armor units',
      'Sediment transport & littoral drift bypass engineering',
      'Climate adaptation guidelines for State Maritime Boards'
    ],
    link: '/research'
  },
  {
    id: 'discovery-campus',
    name: 'NTCPWC Flagship Research Complex · IIT Madras',
    shortName: 'Discovery Campus',
    category: 'RESEARCH INFRASTRUCTURE',
    description: 'A 20-acre specialized research facility at IIT Madras Discovery Campus in Thaiyur, Chennai, serving as the technology arm for the Ministry of Ports, Shipping and Waterways under the Sagarmala Programme.',
    image: '/images/ntcpwc/campus_hq.jpg',
    specs: [
      { label: 'Facility Campus', value: '20 Acres Dedicated' },
      { label: 'Research Faculty', value: '45+ Scientists & Eng.' },
      { label: 'National Projects', value: '150+ Port Studies' }
    ],
    features: [
      'Dedicated computational fluid dynamics (CFD) supercomputing cluster',
      'Advanced geotechnical & soil mechanics testing laboratories',
      'Collaborative design rooms with live port operational telemetry'
    ],
    link: '/about'
  }
];

export default function ProfessionalHomeView() {
  const [activeFacilityId, setActiveFacilityId] = useState('wave-basin');
  const activeFacility = facilityTabs.find(f => f.id === activeFacilityId) || facilityTabs[0];

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="bg-white text-[#45382b] font-sans selection:bg-[#8c6d46] selection:text-white">
      
      {/* 1. HERO MOTION GRAPHICS SECTION: KINETIC TEXT + REALISTIC SHIP BERTHING */}
      <HeroMotionSection />

      {/* 2. AUTHENTIC "ABOUT US" SECTION FROM OLD WEBSITE */}
      <section className="py-20 bg-white border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-sm font-bold tracking-wider text-[#b45309] uppercase block mb-1">
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#291e13] tracking-tight leading-tight">
                  Technology Arm of the Ministry of Shipping & Ports
                </h2>
              </div>

              {/* Exact Text from Old Website Screenshot */}
              <p className="text-base sm:text-lg text-[#5e5042] leading-relaxed">
                The National Technology Centre for Ports, Waterways & Coasts (NTCPWC) is envisioned as a hub 
                of technological innovation for the maritime sector. As the technology arm of the Ministry of 
                Shipping, it provides research, design, and expert solutions to ports, IWAI, and other stakeholders.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-[#473b2f]">
                  <CheckCircle2 className="w-5 h-5 text-[#8c6d46] shrink-0 mt-0.5" />
                  <span>Empowered under the Sagarmala Programme to drive indigenisation of ocean technologies.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#473b2f]">
                  <CheckCircle2 className="w-5 h-5 text-[#8c6d46] shrink-0 mt-0.5" />
                  <span>State-of-the-art testing, simulation, and numerical modeling facilities at IIT Madras Discovery Campus.</span>
                </div>
              </div>

              {/* Know More Button */}
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#291e13] hover:bg-[#1a130b] text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Image (Photo of NTCPWC Building) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-[#e8ded0] shadow-xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/ntcpwc/campus_hq.jpg"
                    alt="NTCPWC IIT Madras Building Facility"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#291e13]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="text-xs uppercase tracking-wider font-mono text-[#deb887]">
                      Discovery Campus, Thaiyur, Chennai
                    </span>
                    <h3 className="text-lg font-bold">NTCPWC Main Research Facility</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE MOTION GRAPHIC SCROLL ENGINE: RESEARCH LAB -> WATER & SHIP */}
      <ScrollMotionShowcase />

      {/* 3. AUTHENTIC "OUR FEATURES · WHY CHOOSE US" FROM OLD WEBSITE WITH CENTER VESSEL */}
      <section className="py-20 md:py-28 bg-[#faf6f0] border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold text-[#b45309] uppercase tracking-wider block mb-1">
              Our Features
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#291e13] tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-[#5e5042] mt-3 leading-relaxed">
              NTCPWC is envisioned as a technology hub providing innovative solutions to the maritime sector 
              with cutting-edge research, simulation, and support facilities.
            </p>
          </div>

          {/* 4-Quadrant Layout with Central Oceanographic Survey Vessel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 2 Pillars (Technology Development & Bridge Simulator) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Pillar 1: Technology Development */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4ece0] text-[#7a5933] flex items-center justify-center font-bold text-lg shrink-0">
                    →
                  </div>
                  <h3 className="text-lg font-bold text-[#291e13]">
                    Technology Development
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5e5042]">
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Mobile platforms</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Data & mining</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Navigation</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Dredging</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Engineering investigations</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Traffic management</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Coastal environment</li>
                </ul>
              </div>

              {/* Pillar 2: Bridge Simulator */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4ece0] text-[#7a5933] flex items-center justify-center font-bold text-lg shrink-0">
                    →
                  </div>
                  <h3 className="text-lg font-bold text-[#291e13]">
                    Bridge Simulator
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5e5042]">
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Port navigation</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Optimization</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Project development</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Nautical depth</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Interactive simulation & Optimization</li>
                </ul>
              </div>

            </div>

            {/* Center: Maritime Research Vessel Ship Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm border border-[#e8ded0] p-4 flex items-center justify-center shadow-lg group">
                <Image
                  src="/images/ntcpwc/vessel.jpg"
                  alt="NTCPWC Research and Survey Vessel"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7a5933] font-bold">
                  Indigenous Maritime Technology & Support
                </span>
                <p className="text-xs text-[#736353] mt-0.5">
                  Full lifecycle research, modeling & sea-trial validation
                </p>
              </div>
            </div>

            {/* Right 2 Pillars (Modelling & Software Products & Testing Facilities) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Pillar 3: Modelling & Software Products */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4ece0] text-[#7a5933] flex items-center justify-center font-bold text-lg shrink-0">
                    →
                  </div>
                  <h3 className="text-lg font-bold text-[#291e13]">
                    Modelling & Software Products
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5e5042]">
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Hydrodynamics</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Morphodynamics</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Navigability</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Nautical depth</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Visualization</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Traffic & Management</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Mobile computing for Ports & IWAI</li>
                </ul>
              </div>

              {/* Pillar 4: Testing Facilities */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8ded0] shadow-sm hover:shadow-md hover:border-[#c29b68] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4ece0] text-[#7a5933] flex items-center justify-center font-bold text-lg shrink-0">
                    →
                  </div>
                  <h3 className="text-lg font-bold text-[#291e13]">
                    Testing Facilities
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5e5042]">
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Next generation ports and vessels</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Large investments in Naval vessels</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> More accurate results</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Compete with the best</li>
                  <li className="flex items-center gap-2"><span className="text-[#b45309] font-bold">&gt;</span> Indigenous technology</li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. WORLD-CLASS TESTING & SIMULATION FACILITIES (INTERACTIVE TABS) */}
      <section className="py-20 md:py-28 bg-white border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#8c6d46] mb-2">
                IIT MADRAS DISCOVERY CAMPUS LABS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#291e13] tracking-tight">
                World-Class Marine Testing Facilities
              </h2>
              <p className="text-[#5e5042] text-base max-w-2xl mt-2">
                Equipped with physical wave basins, real-time ship bridge navigation simulators, and autonomous robotics to validate critical maritime infrastructure.
              </p>
            </div>

            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6e4e2a] hover:text-[#453119] pb-1 border-b-2 border-[#8c6d46]"
            >
              <span>Explore All 6 Laboratories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Facility Selector Tabs Strip in Light Brown Sandstone */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#eee7dc] scrollbar-none">
            {facilityTabs.map((tab) => {
              const isActive = tab.id === activeFacilityId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFacilityId(tab.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8c6d46] text-white shadow-sm'
                      : 'bg-[#f4ece0] text-[#5e4b37] hover:bg-[#eae0cf] hover:text-[#291e13]'
                  }`}
                >
                  {tab.shortName}
                </button>
              );
            })}
          </div>

          {/* Active Facility Card View in Warm White Sandstone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#faf6f0] p-6 sm:p-10 rounded-3xl border border-[#e5d9c7] shadow-sm">
            
            {/* Visual Box (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#241a12] shadow-md">
                <Image
                  src={activeFacility.image}
                  alt={activeFacility.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono">
                  {activeFacility.category}
                </div>
              </div>
            </div>

            {/* Content & Specs Box (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-xs font-bold font-mono text-[#8c6d46] uppercase tracking-wider">
                  DISCOVERY CAMPUS LAB SPECIFICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#291e13] mt-1 leading-snug">
                  {activeFacility.name}
                </h3>
              </div>

              <p className="text-[#5e5042] text-sm leading-relaxed">
                {activeFacility.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#e2d5c3]">
                {activeFacility.specs.map((s, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs font-bold text-[#755530] font-mono">
                      {s.value}
                    </span>
                    <span className="text-[11px] text-[#7a6b5c] mt-0.5">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2.5">
                {activeFacility.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#524436]">
                    <CheckCircle2 className="w-4 h-4 text-[#8c6d46] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-2">
                <Link
                  href={activeFacility.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <span>Detailed Specifications & Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. SOME OF OUR PARTNERS (AUTHENTIC PARTNERS SECTION FROM OLD WEBSITE) */}
      <section className="py-20 bg-white border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            
            {/* Title Block */}
            <div className="lg:w-1/4 shrink-0 border-l-4 border-[#b45309] pl-4">
              <span className="text-sm font-bold text-[#b45309] uppercase tracking-wider block">
                Some Of Our
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#291e13]">
                Partners
              </h2>
              <p className="text-xs text-[#736353] mt-1">
                Major Indian Ports & Maritime Authorities
              </p>
            </div>

            {/* Featured Port Authorities (Matching Screenshot Logos) */}
            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Partner 1: Chennai Port Authority */}
              <div className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e8ded0] flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-white border border-[#dfd2be] flex items-center justify-center text-[#7a5933] mb-3 shadow-xs">
                  <Anchor className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-[#5c4733] uppercase">
                  சென்னை துறைமுக ஆணையம்
                </div>
                <div className="text-sm font-extrabold text-[#291e13] mt-0.5">
                  CHENNAI PORT AUTHORITY
                </div>
                <div className="text-[11px] text-[#7a6b5c] mt-0.5">
                  चेन्नई पत्तन प्राधिकरण
                </div>
              </div>

              {/* Partner 2: Cochin Port */}
              <div className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e8ded0] flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-white border border-[#dfd2be] flex items-center justify-center text-[#7a5933] mb-3 shadow-xs">
                  <Ship className="w-7 h-7" />
                </div>
                <div className="text-sm font-extrabold text-[#291e13]">
                  COCHIN PORT
                </div>
                <div className="text-xs font-bold text-[#5c4733] mt-0.5">
                  Cochin Port Authority
                </div>
                <div className="text-[11px] text-[#7a6b5c] mt-0.5">
                  कोचिन पत्तन प्राधिकरण
                </div>
              </div>

              {/* Partner 3: Deendayal Port Authority */}
              <div className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e8ded0] flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-white border border-[#dfd2be] flex items-center justify-center text-[#7a5933] mb-3 shadow-xs">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="text-sm font-extrabold text-[#291e13]">
                  DEENDAYAL PORT AUTHORITY
                </div>
                <div className="text-[10px] font-mono text-[#7a6b5c] mt-1 bg-white px-2 py-0.5 rounded border border-[#e8ded0]">
                  ISO 9001:2008 | ISO 14001 | ISPS
                </div>
                <div className="text-[11px] text-[#5c4733] mt-1 font-semibold">
                  दीनदयाल पत्तन प्राधिकरण (Kandla)
                </div>
              </div>

            </div>

          </div>

          {/* Secondary Ports Tag Cloud */}
          <div className="mt-8 pt-6 border-t border-[#f0e7db] flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#5c4733]">
            <span className="font-bold text-[#291e13]">Additional Port Partners:</span>
            {['Jawaharlal Nehru Port (JNPA)', 'Paradip Port Authority', 'Visakhapatnam Port', 'Syama Prasad Mookerjee Port (Kolkata)', 'New Mangalore Port', 'V.O. Chidambaranar Port (Tuticorin)', 'Kamarajar Port (Ennore)', 'Mormugao Port', 'Inland Waterways Authority of India (IWAI)'].map((p, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-[#f7f1e7] border border-[#e8ded0]">
                {p}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* 6. AUTHENTIC 2 CAMPUS LOCATIONS WITH INTERACTIVE MAPS FROM OLD WEBSITE */}
      <section className="py-20 bg-[#faf6f0] border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-bold text-[#b45309] uppercase tracking-wider block mb-1">
              Visit Our Facilities
            </span>
            <h2 className="text-3xl font-extrabold text-[#291e13] tracking-tight">
              Our Locations & Research Campuses
            </h2>
            <p className="text-xs sm:text-sm text-[#736353] mt-2">
              National Technology Centre for Ports, Waterways and Coasts operates across two dedicated campuses at IIT Madras.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Campus 1: NAC 6th Floor, IIT Madras Main Campus */}
            <div className="rounded-3xl bg-white border border-[#e8ded0] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              
              {/* Map Info Header */}
              <div className="p-6 border-b border-[#f0e7db]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#7a5933]">
                      CAMPUS 01 · MAIN ACADEMIC CENTRE
                    </span>
                    <h3 className="text-lg font-extrabold text-[#291e13] mt-1">
                      National Technology Centre for Ports Waterways and Coasts
                    </h3>
                  </div>
                  {/* Rating Badge (from screenshot) */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ece0] text-xs font-bold text-[#7a5933] shrink-0 border border-[#dfd2be]">
                    <Star className="w-3.5 h-3.5 fill-[#b45309] text-[#b45309]" />
                    <span>4.8 (13)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5e5042] leading-relaxed">
                  Room No: 606, NAC 6th Floor NTCPWC, Indian Institute Of Technology, Chennai, Tamil Nadu 600036, India
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=National+Technology+Centre+for+Ports+Waterways+and+Coasts+IIT+Madras"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                  <span className="text-xs text-[#736353]">Opp. Gajendra Circle, IIT Madras</span>
                </div>
              </div>

              {/* Map Embed Frame */}
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <iframe
                  title="NTCPWC IIT Madras Main Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4877717462066!2d80.23126747599026!3d12.997637887320092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267863f828a2f%3A0xd3b34208a5ca1a55!2sNational%20Technology%20Centre%20for%20Ports%20Waterways%20and%20Coasts!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

            {/* Campus 2: Port Centre NTCPWC Thaiyur (Discovery Campus) */}
            <div className="rounded-3xl bg-white border border-[#e8ded0] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              
              {/* Map Info Header */}
              <div className="p-6 border-b border-[#f0e7db]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#7a5933]">
                      CAMPUS 02 · HYDRAULIC & WAVE BASIN CENTRE
                    </span>
                    <h3 className="text-lg font-extrabold text-[#291e13] mt-1">
                      Port Centre NTCPWC (Discovery Campus)
                    </h3>
                  </div>
                  {/* Rating Badge (from screenshot) */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ece0] text-xs font-bold text-[#7a5933] shrink-0 border border-[#dfd2be]">
                    <Star className="w-3.5 h-3.5 fill-[#b45309] text-[#b45309]" />
                    <span>4.3 (3)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5e5042] leading-relaxed">
                  Q5RQ+QXJ, IIT Madras Discovery Campus, Thaiyur, Tamil Nadu 603103, India
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=Port+Centre+NTCPWC+Discovery+Campus+Thaiyur"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                  <span className="text-xs text-[#736353]">OMR Corridor, Discovery Campus</span>
                </div>
              </div>

              {/* Map Embed Frame */}
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <iframe
                  title="Port Centre NTCPWC Thaiyur Discovery Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.354117866347!2d80.19890287598717!3d12.820256887480742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525a755aa827b5%3A0xcf9c2d15d654aa01!2sPort%20Centre%20NTCPWC!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. AUTHENTIC "FIND US AT THE OFFICE" + "CONTACT US" FORM (FROM SCREENSHOT 2) */}
      <section className="py-20 md:py-28 bg-[#fdfbf7] border-b border-[#e8ded0]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Find Us At The Office + Newsletter */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e05038] tracking-tight">
                  Find us at the office
                </h2>
                <div className="mt-4 space-y-1 text-sm sm:text-base text-[#4a3b2c] leading-relaxed">
                  <div className="font-bold text-[#291e13]">
                    National Technology Centre for Ports, Waterways and Coasts (NTCPWC)
                  </div>
                  <div>New Academic Complex 6th Floor #604-#607</div>
                  <div>Indian Institute of Technology Madras</div>
                  <div>Chennai-600036</div>
                </div>
              </div>

              {/* Contact Icons (Matching Screenshot 2) */}
              <div className="space-y-3.5 text-sm font-medium text-[#3b2e21]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#fee2e2] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#e05038]" />
                  </div>
                  <span>Chennai</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#fee2e2] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#e05038]" />
                  </div>
                  <a href="tel:+914422578915" className="hover:text-[#e05038] transition-colors">
                    +91 44 22578915
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#fee2e2] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#e05038]" />
                  </div>
                  <a href="mailto:ntcpwc@iitm.ac.in" className="hover:text-[#e05038] transition-colors">
                    ntcpwc@iitm.ac.in
                  </a>
                </div>
              </div>

              {/* SUBSCRIBE FOR NEWSLETTER */}
              <div className="pt-6 border-t border-[#e8ded0]">
                <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#1e2a4a] mb-3">
                  SUBSCRIBE FOR NEWSLETTER
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8cbbb] text-sm text-[#291e13] placeholder-[#9e8f80] focus:outline-none focus:ring-2 focus:ring-[#e05038] transition-all shadow-xs"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#e05038] hover:bg-[#c93f28] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {newsletterSubscribed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <span>✉</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Contact Us Form Card (Matching Screenshot 2) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#e8ded0] shadow-xl">
                
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#e05038]">
                    Contact Us
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736353] mt-1">
                    Please fill out the form below with your details.
                  </p>
                </div>

                {formSubmitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Thank you! Your message has been sent to NTCPWC. Our team will contact you shortly.</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Your Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#544332] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#d8cbbb] text-sm text-[#291e13] placeholder-[#9e8f80] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e05038] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#544332] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#d8cbbb] text-sm text-[#291e13] placeholder-[#9e8f80] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e05038] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#544332] mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#d8cbbb] text-sm text-[#291e13] placeholder-[#9e8f80] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e05038] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#544332] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#d8cbbb] text-sm text-[#291e13] placeholder-[#9e8f80] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e05038] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button (Navy Blue matching Screenshot 2) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#24335c] hover:bg-[#182544] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Now</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. COMPLETE INSTITUTIONAL FOOTER (AUTHENTIC FROM SCREENSHOT 2) */}
      <footer className="bg-[#f4f7fa] text-[#4b5563] pt-16 border-t border-[#dce3ec] text-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-8">
            
            {/* Col 1: 4 Institutional Logos, Description & Digital Reach (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* 4 Logos Strip (IIT Madras, NTCPWC, Sagarmala, MoPSW) matching Screenshot 2 */}
              <div className="flex items-center gap-3.5 flex-wrap">
                {/* IIT Madras */}
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <span className="text-lg">🏛</span>
                  <div className="text-[10px] font-bold text-[#1f2937] leading-tight">
                    IIT MADRAS<br /><span className="text-[8px] text-[#6b7280] font-normal">Chennai</span>
                  </div>
                </div>
                {/* NTCPWC */}
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <img src="/ntcpwc_logo.png" alt="NTCPWC" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="text-[10px] font-bold text-[#24335c] leading-tight">
                    NTCPWC<br /><span className="text-[8px] text-[#6b7280] font-normal">MoPSW Center</span>
                  </div>
                </div>
                {/* Sagarmala */}
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <span className="text-lg">🌊</span>
                  <div className="text-[10px] font-bold text-[#e05038] leading-tight">
                    SAGARMALA<br /><span className="text-[8px] text-[#6b7280] font-normal">Ports of India</span>
                  </div>
                </div>
                {/* MoPSW / Emblem */}
                <div className="h-12 px-3 rounded-lg bg-white border border-[#dce3ec] flex items-center gap-2 shadow-xs">
                  <img src="/emblem.svg" alt="MoPSW" className="h-7 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="text-[10px] font-bold text-[#1f2937] leading-tight">
                    MoPSW<br /><span className="text-[8px] text-[#6b7280] font-normal">Govt. of India</span>
                  </div>
                </div>
              </div>

              {/* Exact Description text from Screenshot 2 */}
              <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed max-w-md pt-1">
                The National Technology Centre for Ports, Waterways & Coasts (NTCPWC) has been envisioned as the 
                centre for technological innovations and evolution of new ideas and breakthroughs for the port and maritime sector.
              </p>

              {/* Digital Reach (Social links from Screenshot 2) */}
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

            {/* Col 2: Quick Navigation (3 cols) matching Screenshot 2 */}
            <div className="lg:col-span-3">
              <div className="text-base font-bold text-[#24335c] mb-4">
                Quick Navigation
              </div>
              <ul className="space-y-2 text-xs font-medium text-[#4b5563]">
                <li><Link href="/" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Home</Link></li>
                <li><Link href="/about" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> About Us</Link></li>
                <li><Link href="/facilities" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Facilities</Link></li>
                <li><Link href="/services" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Services</Link></li>
                <li><Link href="/research" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Research & Developement</Link></li>
                <li><Link href="/products" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Products</Link></li>
                <li><Link href="/training-education" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Training & Education</Link></li>
                <li><Link href="/people" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> People</Link></li>
                <li><Link href="/gallery" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Gallery</Link></li>
                <li><Link href="/news-events" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Media</Link></li>
                <li><Link href="/training-education" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Programs</Link></li>
                <li><Link href="/about" className="hover:text-[#e05038] flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#fee2e2] text-[#e05038] flex items-center justify-center text-[10px] font-bold">&gt;</span> Careers</Link></li>
              </ul>
            </div>

            {/* Col 3: Get In Touch (4 cols) matching Screenshot 2 */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-base font-bold text-[#24335c] mb-4">
                Get In Touch
              </div>

              {/* Pin 1: Main Campus IIT Madras */}
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

              {/* Pin 2: Discovery Campus Thaiyur */}
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

              {/* Hours / Timings */}
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

        {/* Navy Bottom Bar (Exact from Screenshot 2) */}
        <div className="bg-[#1c2c54] py-3.5 px-6 lg:px-12 text-white border-t border-[#2d3e6d]">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-3 font-semibold">
              <Link href="/privacy" className="hover:text-[#93c5fd] transition-colors">Privacy Policy</Link>
              <span className="text-gray-400">|</span>
              <Link href="/terms" className="hover:text-[#93c5fd] transition-colors">Terms & Condition</Link>
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
