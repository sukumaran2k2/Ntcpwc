"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { newsEvents } from "@/lib/data";

export default function NewsEventsSection() {
  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-[#00b4d8]" />
              <span className="text-[#00b4d8] text-xs font-semibold tracking-widest uppercase">Updates</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a2240] font-display leading-tight">
              News & Events
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <Link
              href="/news-events"
              id="news-view-all-btn"
              className="hidden md:flex items-center gap-2 text-[#0a3d6b] font-semibold hover:text-[#00b4d8] transition-colors text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsEvents.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.type === "Event"
                          ? "bg-[#f59e0b] text-white"
                          : "bg-[#0a3d6b] text-white"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                  <h3 className="font-bold text-[#0a2240] text-sm leading-snug mb-3 group-hover:text-[#0a3d6b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news-events/${item.id}`}
                    id={`news-read-${item.id}`}
                    className="flex items-center gap-1.5 text-[#0a3d6b] text-xs font-semibold hover:text-[#00b4d8] transition-colors group"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
