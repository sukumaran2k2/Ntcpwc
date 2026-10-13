"use client";

import { useState } from "react";
import { Settings, Save, Globe, Shield, Bell, Database, Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <AnimatedSection className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a2240] font-display">System Settings</h1>
          <p className="text-slate-500 text-sm">Configure portal domain, API integrations, and security protocols.</p>
        </div>
      </AnimatedSection>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Globe className="w-5 h-5 text-[#00b4d8]" />
            <h2 className="font-bold text-slate-800 text-base">Institutional Metadata</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Portal Title</label>
              <input
                type="text"
                defaultValue="NTCPWC – National Technology Centre for Ports, Waterways and Coasts"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Affiliation Tagline</label>
              <input
                type="text"
                defaultValue="Sagarmala Centre of Excellence · IIT Madras"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Official Email</label>
              <input
                type="email"
                defaultValue="director@ntcpwc.gov.in"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Emergency Helpline</label>
              <input
                type="text"
                defaultValue="+91-44-2230-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Shield className="w-5 h-5 text-[#0a3d6b]" />
            <h2 className="font-bold text-slate-800 text-base">Security & Authentication</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#0a3d6b] w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Require Multi-Factor Authentication (MFA) for administrative roles</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#0a3d6b] w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Log all research paper access and document download events</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#0a3d6b] w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Auto-archive publications older than 7 years</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a3d6b] hover:bg-[#062740] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Settings Saved Successfully!" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
