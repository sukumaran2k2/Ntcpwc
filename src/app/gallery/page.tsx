"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { galleryImages } from "@/lib/data";
import { X, ZoomIn, Filter } from "lucide-react";

const categories = ["All", "Ports", "Coastal", "Field Work", "Equipment", "Laboratory", "Events", "Research", "Training"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
                <span>VISUAL ARCHIVE • FIELD DEPLOYMENTS &amp; TESTBEDS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Photo &amp; Fieldwork <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Gallery</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                A visual journey across NTCPWC&apos;s 20-Acre hydraulic basins, coastal wave telemetry installations, and real-world port validation campaigns.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* GALLERY GRID & FILTER */}
        <section className="py-12 md:py-20 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8c6d46] mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>FILTER:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#8c6d46] text-white shadow-xs"
                      : "bg-white text-[#6b5847] border border-[#d8cbbb] hover:border-[#8c6d46] hover:text-[#291e13]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filtered.map((img, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.05}>
                  <div
                    onClick={() => setLightboxImage(img)}
                    className="group relative rounded-2xl overflow-hidden bg-[#241a12] border border-[#e8ded0] hover:border-[#c29b68] shadow-xs hover:shadow-xl transition-all duration-300 aspect-[4/3] cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f150d]/85 via-[#1f150d]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#6e4e2a] text-[11px] font-bold border border-[#e8ded0]">
                        {img.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold leading-snug line-clamp-2">
                        {img.caption}
                      </p>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#8c6d46] flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-[#e8ded0] shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-[16/10] w-full bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#faf6f0] border-t border-[#e8ded0] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#8c6d46] tracking-wider">
                    {lightboxImage.category}
                  </span>
                  <p className="text-sm font-semibold text-[#291e13] mt-0.5">
                    {lightboxImage.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
