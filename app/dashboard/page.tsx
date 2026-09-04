"use client";

import Link from "next/link";
import {
  Activity,
  Building2,
  Users,
  FileText,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  BedDouble,
  UserCog,
  FileCheck2,
  Clock,
  CheckCircle2,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { getDynamicGreeting } from "../utils/timeUtils";
import { useLanguage } from "../context/LanguageContext";

const adminStats = [
  {
    label: "Monitored Facilities",
    value: "14",
    description: "1 DH • 4 CHCs • 9 PHCs in district",
    icon: Building2,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Active District Referrals",
    value: "48",
    description: "Currently in care continuum",
    icon: FileText,
    iconClass: "bg-teal-50 text-teal-700",
  },
  {
    label: "Closed-Loop Completion",
    value: "91.4%",
    description: "+3.2% from previous month",
    icon: TrendingUp,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "District Bed Occupancy",
    value: "74%",
    description: "182 of 246 emergency beds",
    icon: BedDouble,
    iconClass: "bg-purple-50 text-purple-600",
  },
];

const facilityContinuum = [
  {
    from: "PHC Bassi",
    to: "District Hospital Jaipur",
    department: "Cardiology",
    activeReferrals: 14,
    closedRate: "94%",
    status: "Normal Flow",
    statusClass: "bg-emerald-50 text-emerald-700",
  },
  {
    from: "PHC Chomu",
    to: "CHC Chomu",
    department: "General Medicine",
    activeReferrals: 11,
    closedRate: "91%",
    status: "Normal Flow",
    statusClass: "bg-emerald-50 text-emerald-700",
  },
  {
    from: "PHC Bagru",
    to: "District Hospital Jaipur",
    department: "Orthopedics",
    activeReferrals: 9,
    closedRate: "88%",
    status: "Review Due",
    statusClass: "bg-amber-50 text-amber-700",
  },
  {
    from: "PHC Sanganer",
    to: "District Hospital Jaipur",
    department: "Maternal Care",
    activeReferrals: 14,
    closedRate: "96%",
    status: "Optimal",
    statusClass: "bg-teal-50 text-teal-700",
  },
];

const governanceActivities = [
  {
    title: "ABHA Identity Policy Verified",
    detail: "Zero-knowledge phone masking enabled across all portals",
    time: "12 min ago",
    icon: ShieldCheck,
  },
  {
    title: "District Hospital Capacity Synced",
    detail: "ICU bed status updated: 8 available / 12 occupied",
    time: "35 min ago",
    icon: Building2,
  },
  {
    title: "User Role Provisioned",
    detail: "Dr. Rajesh Sharma granted Cardiology clinical access",
    time: "1 hr ago",
    icon: UserCog,
  },
  {
    title: "Closed-Loop Referral Cycle Completed",
    detail: "Referral #NS-28461 marked Closed with digital discharge summary",
    time: "2 hrs ago",
    icon: CheckCircle2,
  },
];

export default function AdminDashboardPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Activity size={15} />
              District Health Administration
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {getDynamicGreeting(language)}, Administrator
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl leading-relaxed">
              District-wide referral governance, healthcare facility capacity monitoring, and system compliance overview.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
            >
              <BarChart3 size={15} />
              Open Analytics
            </Link>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <UserCog size={15} />
              Manage Users
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">{stat.description}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operations & Governance Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
          
          {/* Care Continuity Continuum Matrix */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">
                  Facility Care-Continuum Pipeline
                </h2>
                <p className="text-[11px] text-slate-500">
                  Active transfer routes between primary sub-centers and district hospitals
                </p>
              </div>

              <Link
                href="/referrals"
                className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                View all referrals
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {facilityContinuum.map((item) => (
                <div
                  key={`${item.from}-${item.to}-${item.department}`}
                  className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{item.from}</span>
                      <span className="text-slate-400 text-xs">→</span>
                      <span className="font-bold text-xs text-teal-900">{item.to}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Department: <span className="font-semibold text-slate-700">{item.department}</span> • Active: <span className="font-semibold text-slate-700">{item.activeReferrals} transfers</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400">Resolution Rate</p>
                      <p className="text-xs font-bold text-slate-900">{item.closedRate}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-4 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>District Compliance: <strong className="text-emerald-700">100% Closed-Loop Adherence</strong></span>
                <Link href="/facilities" className="font-semibold text-teal-700 hover:underline">
                  Inspect Facilities →
                </Link>
              </div>
            </div>
          </div>

          {/* Governance & Audit Stream */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">
                    System & Audit Stream
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Recent administrative and security events
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {governanceActivities.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900">{act.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">{act.detail}</p>
                        <p className="mt-1 text-[10px] font-medium text-slate-400">{act.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 p-4">
              <Link
                href="/admin/audit"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <FileCheck2 size={14} />
                View Full Audit Trail
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div>
          <div className="mb-3">
            <h2 className="font-bold text-slate-900 text-sm">Administration Modules</h2>
            <p className="text-[11px] text-slate-500">Frequently accessed operations and system consoles</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/analytics"
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <BarChart3 size={20} className="text-teal-700 transition group-hover:scale-110" />
              <p className="mt-3 font-bold text-xs text-slate-900">District Analytics</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Referral trends, transfer matrix and wait times</p>
            </Link>

            <Link
              href="/facilities"
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <Building2 size={20} className="text-teal-700 transition group-hover:scale-110" />
              <p className="mt-3 font-bold text-xs text-slate-900">Facility Directory</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Live bed capacity, specialists, and GPS routes</p>
            </Link>

            <Link
              href="/admin/users"
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <UserCog size={20} className="text-teal-700 transition group-hover:scale-110" />
              <p className="mt-3 font-bold text-xs text-slate-900">Users & Roles</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Provision ASHA, Doctor and Facility credentials</p>
            </Link>

            <Link
              href="/admin/audit"
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <ShieldCheck size={20} className="text-teal-700 transition group-hover:scale-110" />
              <p className="mt-3 font-bold text-xs text-slate-900">Security Audit Logs</p>
              <p className="mt-0.5 text-[11px] text-slate-500">ABDM compliance, access logs and consent trail</p>
            </Link>
          </div>
        </div>

        {/* Subtle Footer Note */}
        <p className="pt-2 text-center text-[11px] text-slate-400">
          District Health Administration Console • NIRAMAYA-SETU Public Health Platform
        </p>

      </div>
    </main>
  );
}