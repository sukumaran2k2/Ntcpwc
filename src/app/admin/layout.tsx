"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/admin/Sidebar";
import { Bell, Search, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 bg-white border-b border-gray-100 px-4 lg:px-6 h-14 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              id="admin-mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              id="admin-collapse-sidebar"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="admin-search"
                type="text"
                placeholder="Search (publications, pages, media…)"
                className="pl-9 pr-16 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b] w-72 bg-gray-50"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">
                Ctrl K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Date */}
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-semibold text-gray-700">
                {new Date().toLocaleDateString("en-IN", { weekday: "long" })}
              </span>
              <span className="text-[10px] text-gray-400">
                {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>

            {/* Notifications */}
            <button
              id="admin-notifications"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Avatar */}
            <button id="admin-profile" className="flex items-center gap-2 pl-2 hover:bg-gray-50 rounded-xl transition-all p-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a3d6b] to-[#00b4d8] flex items-center justify-center text-xs font-bold text-white">
                AU
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-700">Admin User</p>
                <p className="text-[10px] text-gray-400">Administrator</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 lg:p-6 min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
