"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Eye, Edit3, MoreHorizontal, Trash2,
  ChevronDown, Filter, Download, FileText, BookOpen, Bell, BarChart3,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { publications } from "@/lib/data";

const tabs = [
  { label: "Pages", icon: FileText, count: 42 },
  { label: "Publications", icon: BookOpen, count: 156 },
  { label: "Reports", icon: BarChart3, count: 89 },
  { label: "Announcements", icon: Bell, count: 27 },
];

const statusColors: Record<string, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  "Under Review": "bg-blue-100 text-blue-700",
  Archived: "bg-gray-100 text-gray-600",
};

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("Publications");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filtered = publications.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedRows(
      selectedRows.length === filtered.length ? [] : filtered.map((p) => p.id)
    );
  };

  return (
    <div>
      <AnimatedSection className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0a2240] font-display">Content Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your website content in one place.</p>
        </div>
        <button
          id="content-add-new-btn"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0a3d6b] text-white text-sm font-semibold rounded-xl hover:bg-[#1a5fa8] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.05}>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                id={`content-tab-${tab.label.toLowerCase()}`}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.label
                    ? "bg-[#0a3d6b] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.label ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Table Card */}
      <AnimatedSection delay={0.1}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="content-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d6b]/20 focus:border-[#0a3d6b]"
              />
            </div>
            <div className="flex items-center gap-2">
              {selectedRows.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-gray-500">{selectedRows.length} selected</span>
                  <button
                    id="content-bulk-delete"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </motion.div>
              )}
              <button id="content-filter-btn" className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button id="content-export-btn" className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filtered.length && filtered.length > 0}
                      onChange={selectAll}
                      id="content-select-all"
                      className="rounded border-gray-300 text-[#0a3d6b] focus:ring-[#0a3d6b]"
                    />
                  </th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((pub, i) => (
                    <motion.tr
                      key={pub.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(pub.id) ? "bg-blue-50/50" : ""}`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(pub.id)}
                          onChange={() => toggleRow(pub.id)}
                          id={`content-select-${pub.id}`}
                          className="rounded border-gray-300 text-[#0a3d6b] focus:ring-[#0a3d6b]"
                        />
                      </td>
                      <td>
                        <p className="font-semibold text-[#0a2240] text-xs">{pub.title}</p>
                      </td>
                      <td>
                        <span className="text-xs text-gray-500">{pub.type}</span>
                      </td>
                      <td>
                        <span className="text-xs text-gray-500">{pub.date}</span>
                      </td>
                      <td>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusColors[pub.status] || "bg-gray-100 text-gray-600"}`}>
                          {pub.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button id={`cm-view-${pub.id}`} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0a3d6b] transition-all">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button id={`cm-edit-${pub.id}`} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0a3d6b] transition-all">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button id={`cm-more-${pub.id}`} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0a3d6b] transition-all">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {publications.length} entries</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", 12].map((page, i) => (
                <button
                  key={i}
                  id={`content-page-${page}`}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    page === 1 ? "bg-[#0a3d6b] text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
