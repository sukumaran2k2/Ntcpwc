import Link from "next/link";
import { Anchor, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { navLinks, siteData } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About NTCPWC", href: "/about" },
    { label: "Research Areas", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Facilities", href: "/facilities" },
    { label: "News & Events", href: "/news-events" },
    { label: "Gallery", href: "/gallery" },
  ];

  const usefulLinks = [
    { label: "Ministry of Ports, Shipping & Waterways", href: "#" },
    { label: "Central Water Commission", href: "#" },
    { label: "National Institute of Oceanography", href: "#" },
    { label: "PIANC India", href: "#" },
    { label: "Indian Ports Association", href: "#" },
  ];

  return (
    <footer className="bg-[#0a2240] text-white">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#0a3d6b] to-[#00b4d8]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display">Stay Updated with Our Research</h3>
            <p className="text-blue-100 text-sm mt-1">Subscribe to receive the latest publications and news.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              id="footer-newsletter-input"
              type="email"
              placeholder="Enter your email address"
              className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:bg-white/30 text-sm"
            />
            <button
              id="footer-newsletter-btn"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0a3d6b] font-semibold rounded-lg hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4d8] to-[#2dd4bf] flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-base font-bold font-display">NTCPWC</div>
                <div className="text-[10px] text-blue-300">
                  National Technology Centre
                </div>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              India&apos;s premier research institution for safe, efficient and sustainable development of ports, waterways and coastal regions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteData.socials.twitter}
                id="footer-twitter"
                aria-label="Twitter X"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00b4d8] flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={siteData.socials.linkedin}
                id="footer-linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0077b5] flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={siteData.socials.youtube}
                id="footer-youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Partner Links</h4>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-white text-sm flex items-center gap-2 group transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00b4d8] mt-0.5 flex-shrink-0" />
                <p className="text-blue-200 text-sm leading-relaxed">{siteData.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00b4d8] flex-shrink-0" />
                <a href={`tel:${siteData.phone}`} className="text-blue-200 hover:text-white text-sm transition-colors">
                  {siteData.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00b4d8] flex-shrink-0" />
                <a href={`mailto:${siteData.email}`} className="text-blue-200 hover:text-white text-sm transition-colors">
                  {siteData.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
          <p>© {currentYear} NTCPWC – National Technology Centre for Ports, Waterways and Coasts. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>·</span>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
