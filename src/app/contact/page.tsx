"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    { icon: MapPin, label: "Address", value: siteData.address, color: "#0a3d6b" },
    { icon: Phone, label: "Phone", value: siteData.phone, color: "#00b4d8" },
    { icon: Mail, label: "Email", value: siteData.email, color: "#2dd4bf" },
    { icon: Clock, label: "Office Hours", value: "Mon–Fri: 9:00 AM – 5:30 PM IST", color: "#f59e0b" },
  ];

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
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                Have a question or want to collaborate? We&apos;d love to hear from you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-[#f8fafc]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Info */}
              <AnimatedSection direction="left">
                <h2 className="text-3xl font-black text-[#0a2240] font-display mb-8">Contact Information</h2>
                <div className="space-y-6 mb-10">
                  {contactInfo.map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${info.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: info.color }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{info.label}</p>
                          <p className="text-gray-700 text-sm mt-0.5">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden h-56 bg-blue-100 flex items-center justify-center border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0617047887497!2d80.23228531482287!3d13.009806290821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677000000001%3A0x8b4b3b3b3b3b3b3b!2sIIT%20Madras!5e0!3m2!1sen!2sin!4v1628000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="NTCPWC Location"
                  />
                </div>
              </AnimatedSection>

              {/* Right: Form */}
              <AnimatedSection direction="right">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#0a2240] font-display mb-2">Message Sent!</h3>
                      <p className="text-gray-500 text-sm">Thank you for contacting us. We&apos;ll get back to you within 2 business days.</p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="mt-6 px-6 py-2.5 bg-[#0a3d6b] text-white text-sm font-semibold rounded-xl hover:bg-[#1a5fa8] transition-all"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-black text-[#0a2240] font-display mb-6">Send a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                            <input
                              id="contact-name"
                              required
                              type="text"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="Dr. John Smith"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b] transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                            <input
                              id="contact-email"
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b] transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subject *</label>
                          <input
                            id="contact-subject"
                            required
                            type="text"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            placeholder="Research collaboration inquiry"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b] transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
                          <textarea
                            id="contact-message"
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Write your message here..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b] transition-all resize-none"
                          />
                        </div>
                        <button
                          id="contact-submit-btn"
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0a3d6b] text-white font-semibold rounded-xl hover:bg-[#1a5fa8] transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <Send className="w-4 h-4" />
                          Send Message
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
