"use client";

import { useState } from "react";
import { UserCheck, Shield, Key, Plus, Search, MoreHorizontal, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const sampleUsers = [
  { id: 1, name: "Dr. A. Ramaswamy", email: "director@ntcpwc.gov.in", role: "Super Admin", dept: "Directorate", status: "Active" },
  { id: 2, name: "Dr. Priya Menon", email: "priya.menon@ntcpwc.res.in", role: "Department Head", dept: "Coastal Eng.", status: "Active" },
  { id: 3, name: "Dr. Suresh Kumar", email: "suresh.k@ntcpwc.res.in", role: "Lead Scientist", dept: "Marine Geosciences", status: "Active" },
  { id: 4, name: "R. Natarajan", email: "natarajan@ntcpwc.res.in", role: "Systems Admin", dept: "IT & Computing", status: "Active" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = sampleUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AnimatedSection className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a2240] font-display">User & Access Management</h1>
          <p className="text-slate-500 text-sm">Configure administrator roles, researcher permissions, and institutional credentials.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a3d6b] hover:bg-[#062740] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors">
          <Plus className="w-4 h-4" />
          <span>Invite New User</span>
        </button>
      </AnimatedSection>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Name & Email</th>
              <th className="py-3.5 px-6">Role</th>
              <th className="py-3.5 px-6">Department</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/70">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#0a3d6b] text-xs font-bold">
                    <Shield className="w-3 h-3 text-[#00b4d8]" />
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 text-sm">{user.dept}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <MoreHorizontal className="w-4.5 h-4.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
