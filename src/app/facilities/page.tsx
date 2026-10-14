import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { facilities } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "World-class hydraulic laboratories, numerical modeling centre, and field survey capabilities at NTCPWC.",
};

const categoryColors: Record<string, string> = {
  Hydraulic: "bg-blue-100 text-blue-700",
  Numerical: "bg-purple-100 text-purple-700",
  "Field Survey": "bg-teal-100 text-teal-700",
  Laboratory: "bg-amber-100 text-amber-700",
};

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-6xl font-black text-white font-display mb-4">
                World-Class <span className="gradient-text">Facilities</span>
              </h1>
              <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                State-of-the-art laboratories and infrastructure built to tackle India&apos;s most complex maritime challenges.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Facilities */}
        <section className="section-padding bg-[#f8fafc]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, i) => (
                <AnimatedSection key={facility.id} delay={i * 0.08} id={facility.id}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[facility.category] || "bg-gray-100 text-gray-700"}`}>
                          {facility.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-[#0a2240] text-lg font-display mb-2 group-hover:text-[#0a3d6b] transition-colors">
                        {facility.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                        {facility.description}
                      </p>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Specifications</p>
                        <ul className="space-y-1.5">
                          {facility.specs.map((spec, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00b4d8] flex-shrink-0" />
                              {spec}
                            </li>
                          ))}
                        </ul>
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
    </>
  );
}
