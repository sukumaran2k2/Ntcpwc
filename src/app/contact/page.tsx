"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteData } from "@/lib/data";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: siteData.address },
    { icon: Phone, label: "Phone", value: siteData.phone },
    { icon: Mail, label: "Email", value: siteData.email },
    { icon: Clock, label: "Office Hours", value: "Mon–Fri: 9:00 AM – 5:30 PM IST" },
  ];

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
                <span>DISCOVERY CAMPUS • THAIYUR, CHENNAI</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#291e13] tracking-tight leading-[1.12]">
                Contact &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#755530] via-[#8c6d46] to-[#b45309]">Connect</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5e5042] max-w-2xl mx-auto leading-relaxed">
                Connect with our academic directors, technical consultants, and testing facilities for research partnerships or project advisories.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-16 md:py-24 bg-[#fcfaf7]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* CONTACT DETAILS (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#291e13] font-display mb-2">
                    Institutional Headquarters
                  </h2>
                  <p className="text-sm text-[#5e5042] leading-relaxed">
                    National Technology Centre for Ports, Waterways &amp; Coasts (NTCPWC) at the 20-Acre IIT Madras Discovery Campus.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#e8ded0] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#f4ece0] text-[#8c6d46] border border-[#dfd2be] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-[#755530]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase text-[#8c6d46] tracking-wider">
                            {item.label}
                          </div>
                          <div className="text-sm text-[#291e13] font-medium mt-0.5 whitespace-pre-line">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CONTACT FORM (7 cols) */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#e8ded0] shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#291e13]">Inquiry Submitted Successfully</h3>
                      <p className="text-xs sm:text-sm text-[#5e5042] max-w-md mx-auto">
                        Thank you for reaching out to NTCPWC. Our technical liaison team will review your message and respond shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-xl font-bold text-[#291e13] font-display mb-4">
                        Send an Advisory or Technical Query
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#5e5042] uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#d8cbbb] bg-[#faf6f0]/40 text-[#291e13] text-sm focus:border-[#8c6d46] focus:ring-1 focus:ring-[#8c6d46] outline-hidden"
                            placeholder="e.g. Dr. Ramesh Kumar"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#5e5042] uppercase tracking-wider mb-1.5">
                            Official Email
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#d8cbbb] bg-[#faf6f0]/40 text-[#291e13] text-sm focus:border-[#8c6d46] focus:ring-1 focus:ring-[#8c6d46] outline-hidden"
                            placeholder="name@organization.gov.in"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5e5042] uppercase tracking-wider mb-1.5">
                          Subject / Domain Area
                        </label>
                        <input
                          type="text"
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#d8cbbb] bg-[#faf6f0]/40 text-[#291e13] text-sm focus:border-[#8c6d46] focus:ring-1 focus:ring-[#8c6d46] outline-hidden"
                          placeholder="e.g. Wave Flume Testing for Port Breakwater"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5e5042] uppercase tracking-wider mb-1.5">
                          Message / Technical Scope
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#d8cbbb] bg-[#faf6f0]/40 text-[#291e13] text-sm focus:border-[#8c6d46] focus:ring-1 focus:ring-[#8c6d46] outline-hidden"
                          placeholder="Describe your project, required parameters, and desired timeline..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
