"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, FileText, BookOpen, BarChart3, Bell,
  Image, Menu as MenuIcon, Users, Shield, Settings, Activity,
  Anchor, ChevronDown, X, LogOut,
} from "lucide-react";

const mainNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Content Management", icon: FileText, children: [
      { label: "Pages", href: "/admin/content/pages", icon: FileText },
      { label: "Announcements", href: "/admin/content/announcements", icon: Bell },
      { label: "Publications", href: "/admin/content/publications", icon: BookOpen },
      { label: "Reports", href: "/admin/content/reports", icon: BarChart3 },
      { label: "Events", href: "/admin/content/events", icon: Activity },
      { label: "Media Library", href: "/admin/content/media", icon: Image },
      { label: "Gallery", href: "/admin/content/gallery", icon: Image },
      { label: "Menu Management", href: "/admin/content/menus", icon: MenuIcon },
    ],
  },
  {
    label: "Users & Access", icon: Users, children: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Roles & Permissions", href: "/admin/users/roles", icon: Shield },
    ],
  },
  {
    label: "Settings", icon: Settings, children: [
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
      { label: "Audit Logs", href: "/admin/settings/logs", icon: Activity },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Content Management"]);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (children?: { href: string }[]) =>
    children?.some((c) => pathname.startsWith(c.href));

  return (
    <aside className={`h-full flex flex-col bg-[#0a2240] text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00b4d8] to-[#2dd4bf] flex items-center justify-center flex-shrink-0">
          <Anchor className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold font-display">NTCPWC</div>
            <div className="text-[10px] text-blue-300">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="px-4 text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-2">
            Main
          </p>
        )}

        {mainNav.map((item) => {
          const Icon = item.icon;

          if (!item.children) {
            return (
              <Link
                key={item.label}
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                  isActive(item.href!)
                    ? "bg-[#00b4d8] text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          }

          const groupOpen = expandedGroups.includes(item.label);
          const groupActive = isGroupActive(item.children);

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleGroup(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                  groupActive ? "text-white bg-white/10" : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
                style={{ width: "calc(100% - 1rem)" }}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${groupOpen ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </button>

              <AnimatePresence>
                {!collapsed && groupOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 pl-3 border-l border-white/10 mb-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all mb-0.5 ${
                              isActive(child.href)
                                ? "bg-[#00b4d8]/20 text-[#00b4d8]"
                                : "text-blue-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <ChildIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#2dd4bf] flex items-center justify-center text-xs font-bold">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Admin User</p>
              <p className="text-[10px] text-blue-400 truncate">Administrator</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-blue-300 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Back to Site
          </Link>
        </div>
      )}
    </aside>
  );
}
