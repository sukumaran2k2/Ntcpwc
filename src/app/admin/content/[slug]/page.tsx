"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Search, Plus, Eye, Edit3, MoreHorizontal, Trash2,
  Filter, Download, ArrowLeft, CheckCircle2, Clock, AlertCircle, FileText,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { publications, newsEvents } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

const sectionTitles: Record<string, { title: string; desc: string }> = {
  pages: { title: "Pages Management", desc: "Manage static and dynamic site pages, SEO metadata, and layouts." },
  announcements: { title: "Announcements & Circulars", desc: "Publish official circulars, maritime tenders, and notifications." },
  publications: { title: "Research Publications", desc: "Manage research papers, technical monographs, and conference proceedings." },
  reports: { title: "Technical Reports", desc: "Store, review, and distribute project reports and feasibility studies." },
  events: { title: "Maritime Events & Workshops", desc: "Schedule seminars, symposiums, and professional capacity building workshops." },
  media: { title: "Media & Asset Library", desc: "Upload high-resolution photography, facility blueprints, and video clips." },
  gallery: { title: "Gallery Management", desc: "Organize visual documentation across laboratories, field trials, and VIP visits." },
  menus: { title: "Navigation & Menus", desc: "Configure primary navigation bars, footer link hierarchies, and partner links." },
};

export default function ContentSubPage({ params }: Props) {
  const { slug } = use(params);
  const info = sectionTitles[slug] || { title: `${slug.toUpperCase()} Management`, desc: "Manage and configure content records." };
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const items = slug === "announcements" || slug === "events"
    ? newsEvents.map((n) => ({ id: n.id, title: n.title, type: n.type, date: n.date, status: "Published" }))
    : publications.map((p) => ({ id: p.id, title: p.title, type: p.type, date: p.date, status: p.status }));

  const filtered = items.filter((item) =>
    !search || item.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <AnimatedSection className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/content" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content Overview</span>
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2240] font-display">{info.title}</h1>
          <p className="text-slate-500 text-sm">{info.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a3d6b] hover:bg-[#062740] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create New {info.title.split(" ")[0]}</span>
          </button>
        </div>
      </AnimatedSection>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${info.title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded text-[#0a3d6b]"
                    checked={selectedRows.length === filtered.length && filtered.length > 0}
                    onChange={() => setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map((r) => r.id))}
                  />
                </th>
                <th className="py-3.5 px-4">Title / Item</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Date Updated</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      className="rounded text-[#0a3d6b]"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                    />
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-md">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0a3d6b] text-xs font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg text-slate-500 hover:text-[#0a3d6b] hover:bg-slate-100">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
