import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Training & Education | NTCPWC",
  description: "Specialized training programmes, capacity building courses, and maritime workshops organized by NTCPWC IIT Madras.",
};

const courses = [
  {
    title: "Advanced Port Planning & Harbor Numerical Modeling",
    duration: "5 Days Intensive",
    type: "Executive Professional",
    date: "15 - 19 Nov 2025",
    desc: "Hands-on masterclass covering DELFT3D hydrodynamic simulation, sediment transport modeling, and navigational channel design for port engineers.",
    modules: ["Hydrodynamic Basin Modeling", "Sedimentation & Siltation Forecasting", "Wave Agitation & Mooring Dynamics"]
  },
  {
    title: "Coastal Erosion Mitigation & Shoreline Management",
    duration: "3 Days Workshop",
    type: "Industry & Regulators",
    date: "08 - 10 Dec 2025",
    desc: "Field-oriented workshop on soft & hard coastal defense structures, wave energy dissipation, and coastal climate change adaptation strategies.",
    modules: ["Submerged Geotube Reefs", "Living Shorelines & Mangrove Buffers", "Shoreline Evolution Modeling"]
  },
  {
    title: "Maritime Autonomous Vessels & Inland Waterway Intelligence",
    duration: "2 Days Seminar",
    type: "Technology & Research",
    date: "22 - 23 Jan 2026",
    desc: "Comprehensive insights into uncrewed surface vehicles (USVs), automated dredging surveillance, and digital navigational aids.",
    modules: ["USV Bathymetry Integration", "RTK-GPS & Obstacle Avoidance", "National Waterways Hydrography"]
  },
];

export default function TrainingEducationPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#291e13] font-sans antialiased selection:bg-[#c29b68]/30 selection:text-[#291e13]">
      <Navbar />
      
      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#f5ede1] via-[#faf5ec] to-[#fcfaf7] border-b border-[#e8ded0] overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#8c6d46 1px, transparent 1px), linear-gradient(90deg, #8c6d46 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d8cbbb] text-xs font-bold text-[#b45309] shadow-xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#b45309] animate-pulse" />
                <span>CAPACITY BUILDING &amp; WORKSHOPS • IIT MADRAS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Training &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Executive Education</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Specialized professional masterclasses, industry certifications, and hands-on flume laboratory workshops led by IIT Madras professors.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* COURSES LIST */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.08}>
                  <div className="h-full flex flex-col p-7 rounded-2xl bg-white border border-[#e8ded0] hover:border-[#c29b68] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#f4ece0] text-[#7a5933] border border-[#dfd2be] text-xs font-bold shadow-xs">
                        {course.type}
                      </span>
                      <span className="text-xs font-semibold text-[#8c6d46] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#291e13] font-display mb-2 group-hover:text-[#b45309] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5e5042] leading-relaxed mb-6">
                      {course.desc}
                    </p>

                    <div className="mt-auto border-t border-[#f0e6d8] pt-4">
                      <div className="text-[11px] font-bold uppercase text-[#8c6d46] tracking-wider mb-2">
                        Key Curriculum Modules
                      </div>
                      <ul className="space-y-1.5 mb-6 text-xs text-[#5e5042]">
                        {course.modules.map((m, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d46] shrink-0" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-2 border-t border-[#f0e6d8] text-xs">
                        <span className="text-[#736353] flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#8c6d46]" />
                          {course.date}
                        </span>
                        <button className="px-4 py-2 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
