import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { newsEvents } from "@/lib/data";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, announcements, and upcoming events from NTCPWC.",
};

export default function NewsEventsPage() {
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
                News &amp; <span className="gradient-text">Events</span>
              </h1>
              <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                Stay updated with the latest news, announcements, and upcoming events from NTCPWC.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured */}
        <section className="section-padding bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-3xl font-black text-[#0a2240] font-display">Latest Updates</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsEvents.map((item, i) => (
                <AnimatedSection key={item.id} delay={i * 0.1}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                    <div className="relative h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === "Event" ? "bg-[#f59e0b] text-white" : "bg-[#0a3d6b] text-white"}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                        <span className="ml-2 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          {item.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#0a2240] leading-snug mb-3 group-hover:text-[#0a3d6b] transition-colors flex-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/news-events/${item.id}`}
                        className="flex items-center gap-2 text-[#0a3d6b] font-semibold text-sm hover:text-[#00b4d8] transition-colors group mt-auto"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
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
