"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  LogIn,
  Anchor,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { navLinks, siteData } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Government & Sagarmala Strip - Warm Earthy Espresso */}
      <div className="bg-[#241a12] text-[#d6c9bc] text-xs border-b border-[#3d2e20] hidden sm:block">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Government Affiliation */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#e3d7cb]">
              <span className="w-2 h-2 rounded-full bg-[#c29b68]" />
              Government of India · Ministry of Ports, Shipping & Waterways
            </span>
            <span className="text-[#5c4a39]">|</span>
            <span className="text-[#deb887] font-semibold hidden md:inline">
              Sagarmala Centre of Excellence · IIT Madras
            </span>
          </div>

          {/* Quick Contact & Accessibility */}
          <div className="flex items-center gap-5 text-xs text-[#d6c9bc]">
            <a
              href={`tel:${siteData.phone}`}
              className="hover:text-[#deb887] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#c29b68]" />
              <span>{siteData.phone}</span>
            </a>
            <span className="text-[#5c4a39]">|</span>
            <a
              href={`mailto:${siteData.email}`}
              className="hover:text-[#deb887] transition-colors hidden md:flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#c29b68]" />
              <span>{siteData.email}</span>
            </a>
            <span className="text-[#5c4a39] hidden md:inline">|</span>
            <span className="text-[11px] px-2 py-0.5 rounded-sm bg-white/10 text-[#e8dcce] cursor-pointer hover:bg-white/20">
              English / हिन्दी
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Crisp White & Warm Stone */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-md border-b border-[#e5dcce]"
            : "bg-white shadow-xs border-b border-[#eee7dc]"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8c6d46] via-[#755530] to-[#543b1e] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-[#291e13] font-display tracking-tight leading-none">
                    NTCPWC
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f3ece2] font-bold text-[#7a5933] tracking-wide border border-[#e2d6c5]">
                    IIT MADRAS
                  </span>
                </div>
                <span className="text-[11.5px] font-medium text-[#7a6b5c] leading-tight mt-0.5 max-w-[280px] line-clamp-1">
                  National Technology Centre for Ports, Waterways & Coasts
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const hasChildren = Boolean(link.children && link.children.length > 0);

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-semibold transition-all duration-150 ${
                        isActive
                          ? "text-[#6e4e2a] bg-[#f5eee6] font-bold"
                          : "text-[#473b2f] hover:text-[#6e4e2a] hover:bg-[#fbf7f2]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#9e8f80] transition-transform duration-200 ${
                            activeDropdown === link.label ? "rotate-180 text-[#6e4e2a]" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {hasChildren && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-xl border border-[#e8ded0] py-2.5 min-w-[240px] z-50 overflow-hidden"
                        >
                          <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#9e8f80] uppercase tracking-wider border-b border-[#f3ede3] mb-1">
                            {link.label} Section
                          </div>
                          {link.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center justify-between px-3.5 py-2 text-sm text-[#473b2f] hover:text-[#6e4e2a] hover:bg-[#fbf7f2] font-medium transition-colors"
                            >
                              <span>{child.label}</span>
                              <ChevronDown className="w-3 h-3 text-[#bfaea0] -rotate-90" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right Quick Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-[#8c6d46] hover:bg-[#785b34] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Contact Labs</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-lg text-[#3d2e20] hover:bg-[#f5eee6] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#e5dcce] shadow-xl overflow-hidden px-6 py-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-[#6e4e2a] bg-[#f5eee6]"
                      : "text-[#473b2f] hover:bg-[#fbf7f2]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#eee7dc]">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center w-full py-2.5 rounded-xl bg-[#8c6d46] text-white text-xs font-bold"
                >
                  Contact Labs
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
