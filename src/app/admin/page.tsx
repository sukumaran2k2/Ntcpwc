"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  FileText, BookOpen, BarChart3, Bell, ArrowUpRight,
  Eye, Edit3, MoreHorizontal, TrendingUp,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CountUp from "@/components/ui/CountUp";
import {
  adminStats, chartData, contentStatusData,
  topContent, recentActivities, publications,
} from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { FileText, BookOpen, BarChart3, Bell };

const activityIcons: Record<string, React.ElementType> = {
  BookOpen, FileText, Bell, BarChart3, Image: Eye,
};

const statusColors: Record<string, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  "Under Review": "bg-blue-100 text-blue-700",
};

export default function AdminDashboard() {
  return (
    <div>
      {/* Welcome */}
      <AnimatedSection className="mb-6">
        <h1 className="text-2xl font-black text-[#0a2240] font-display">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, Admin. Here&apos;s an overview of your website.
        </p>
      </AnimatedSection>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat, i) => {
          const Icon = iconMap[stat.icon];
          return (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    {Icon && <Icon className="w-5 h-5" style={{ color: stat.color }} />}
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-black text-[#0a2240] font-display">
                  <CountUp end={stat.value} />
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">{stat.label}</p>
                <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
                  <span className="text-green-600 font-semibold">Published: {stat.published}</span>
                  <span>Draft: {stat.draft}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Overview Chart */}
        <AnimatedSection className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[#0a2240] text-sm">Website Overview</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a3d6b]" />
                    <span className="text-xs text-gray-500">Visitors</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]" />
                    <span className="text-xs text-gray-500">Page Views</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <select id="chart-period" className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
            </div>

            {/* Big Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Visitors", value: "12,436", change: "+18%" },
                { label: "Page Views", value: "48,291", change: "+24%" },
                { label: "Avg. Session", value: "2m 18s", change: "+12%" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
                  <p className="text-lg font-black text-[#0a2240] font-display">{s.value}</p>
                  <p className="text-[10px] text-green-600 font-semibold mt-0.5">{s.change}</p>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a3d6b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0a3d6b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b4d8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00b4d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 11 }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#0a3d6b" strokeWidth={2} fill="url(#gradVisitors)" />
                <Area type="monotone" dataKey="pageViews" stroke="#00b4d8" strokeWidth={2} fill="url(#gradPageViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>

        {/* Recent Activity */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#0a2240] text-sm">Recent Activities</h3>
              <button id="activity-view-all" className="text-xs text-[#0a3d6b] font-semibold hover:text-[#00b4d8] transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => {
                const Icon = activityIcons[activity.icon] || FileText;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: activity.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{activity.title}</p>
                      <p className="text-[10px] text-gray-400 truncate">{activity.subtitle}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">{activity.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Content Status Pie */}
        <AnimatedSection>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#0a2240] text-sm mb-5">Content Status</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <PieChart width={140} height={140}>
                  <Pie data={contentStatusData} cx={65} cy={65} innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {contentStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#0a2240]">214</span>
                  <span className="text-[10px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {contentStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Top Content */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#0a2240] text-sm">Top Content</h3>
              <select id="top-content-sort" className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none text-gray-500">
                <option>Most Viewed</option>
                <option>Most Downloaded</option>
              </select>
            </div>
            <div className="space-y-3">
              {topContent.map((item) => (
                <div key={item.rank} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0">
                    {item.rank}
                  </span>
                  <span className="flex-1 text-xs text-gray-700 truncate">{item.title}</span>
                  <span className="text-xs font-semibold text-gray-500">{item.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Latest Publications Table */}
        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-[#0a2240] text-sm">Latest Publications</h3>
              <button id="pub-table-view-all" className="text-xs text-[#0a3d6b] font-semibold hover:text-[#00b4d8]">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="text-left">Title</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.slice(0, 4).map((pub) => (
                    <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                      <td>
                        <p className="text-xs font-semibold text-[#0a2240] truncate max-w-[120px]">{pub.title}</p>
                        <p className="text-[10px] text-gray-400">{pub.date}</p>
                      </td>
                      <td>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[pub.status] || "bg-gray-100 text-gray-600"}`}>
                          {pub.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button id={`pub-view-${pub.id}`} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button id={`pub-edit-${pub.id}`} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button id={`pub-more-${pub.id}`} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
