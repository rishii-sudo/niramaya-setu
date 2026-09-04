"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Filter,
  Download,
  Share2,
  Building2,
  Users,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const metrics = [
    {
      label: "Total District Referrals",
      value: "1,482",
      change: "+14.2%",
      trend: "up",
      detail: "vs. previous 30 days",
      icon: Share2,
      color: "text-teal-700 bg-teal-50",
    },
    {
      label: "Closed-Loop Success Rate",
      value: "91.8%",
      change: "+3.6%",
      trend: "up",
      detail: "Referrals reaching recovery without dropout",
      icon: CheckCircle2,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      label: "Average Transit-to-Arrival",
      value: "2.8 hrs",
      change: "-42 min",
      trend: "up",
      detail: "From primary referral to hospital triage",
      icon: Clock,
      color: "text-blue-700 bg-blue-50",
    },
    {
      label: "Frontline Follow-up Compliance",
      value: "89.6%",
      change: "+5.1%",
      trend: "up",
      detail: "48-hour post-discharge visits completed",
      icon: Users,
      color: "text-purple-700 bg-purple-50",
    },
  ];

  const departmentData = [
    { name: "Cardiology", count: 504, percentage: 34, color: "bg-teal-600" },
    { name: "General Medicine", count: 415, percentage: 28, color: "bg-blue-600" },
    { name: "Orthopedics", count: 266, percentage: 18, color: "bg-indigo-600" },
    { name: "Maternal & Child Health", count: 207, percentage: 14, color: "bg-purple-600" },
    { name: "Pediatrics", count: 90, percentage: 6, color: "bg-amber-600" },
  ];

  const facilityTransferVolume = [
    {
      origin: "PHC Bassi",
      destination: "District Hospital Jaipur",
      volume: 342,
      avgWait: "18 min",
      closedRate: "95%",
    },
    {
      origin: "PHC Chomu",
      destination: "CHC Chomu",
      volume: 284,
      avgWait: "22 min",
      closedRate: "93%",
    },
    {
      origin: "PHC Bagru",
      destination: "District Hospital Jaipur",
      volume: 215,
      avgWait: "25 min",
      closedRate: "89%",
    },
    {
      origin: "PHC Sanganer",
      destination: "District Hospital Jaipur",
      volume: 310,
      avgWait: "15 min",
      closedRate: "96%",
    },
    {
      origin: "Sub-center Rampura",
      destination: "PHC Bassi",
      volume: 188,
      avgWait: "12 min",
      closedRate: "98%",
    },
  ];

  const funnelSteps = [
    { label: "1. Created (PHC / Field)", count: "1,482", rate: "100%" },
    { label: "2. In Transit", count: "1,440", rate: "97.2%" },
    { label: "3. Received (Hospital)", count: "1,402", rate: "94.6%" },
    { label: "4. Under Treatment", count: "1,385", rate: "93.4%" },
    { label: "5. Discharged", count: "1,360", rate: "91.8%" },
    { label: "6. Closed (Field Follow-up)", count: "1,348", rate: "91.0%" },
  ];

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Origin,Destination,Referral Volume,Average Wait,Closed Rate\n" +
      facilityTransferVolume
        .map((f) => `"${f.origin}","${f.destination}",${f.volume},"${f.avgWait}","${f.closedRate}"`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `niramaya-referral-analytics-${timeframe.replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/dashboard" className="hover:text-teal-700">
                Administration
              </Link>
              <span>/</span>
              <span className="text-slate-800">Analytics</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              District Referral & Health Analytics
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Population-level referral throughput, closed-loop completion metrics, and facility capacity utilization trends.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Timeframe selector */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold shadow-sm">
              <Calendar size={14} className="text-teal-700" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-slate-700 outline-none cursor-pointer text-xs"
              >
                <option value="Today">Today (05 Sep 2026)</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Quarter">This Quarter (Q3 2026)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Primary KPI Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{m.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">{m.value}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                        <ArrowUpRight size={14} />
                        {m.change}
                      </span>
                      <span className="text-[10px] text-slate-400">{m.detail}</span>
                    </div>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${m.color}`}>
                    <Icon size={19} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Row: Specialty Distribution & Lifecycle Funnel */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Specialty Distribution */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Referrals by Medical Specialty</h2>
                <p className="text-[11px] text-slate-500">Distribution of patient transfers across clinical departments</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                1,482 cases
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-800 font-semibold">{dept.name}</span>
                    <span className="text-slate-600">
                      <strong>{dept.count}</strong> ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${dept.color} transition-all duration-500`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50/50 p-3 text-xs text-teal-800 flex items-start gap-2">
              <TrendingUp size={16} className="shrink-0 text-teal-700 mt-0.5" />
              <span>Cardiology transfers increased by 18% following mobile ECG diagnostic rollout at PHC Bassi.</span>
            </div>
          </div>

          {/* Closed-Loop Care Continuum Funnel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Care Continuity Funnel</h2>
                  <p className="text-[11px] text-slate-500">Milestone retention across the 6 referral lifecycle stages</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  91.0% Retention
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {funnelSteps.map((step, idx) => (
                  <div
                    key={step.label}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-2.5 text-xs"
                  >
                    <span className="font-semibold text-slate-800">{step.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-900 font-bold">{step.count}</span>
                      <span className="rounded bg-white px-2 py-0.5 font-bold text-teal-800 border border-slate-200 text-[10px]">
                        {step.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 text-center">
              Zero lost-to-follow-up guarantee enforced by automated 48-hour ASHA reminders.
            </p>
          </div>
        </div>

        {/* Bottom Table: Facility Transfer Matrix */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Facility Transfer Throughput Matrix</h2>
              <p className="text-[11px] text-slate-500">Live referral volume, triage response time and resolution rates</p>
            </div>

            <span className="text-xs font-semibold text-slate-600">
              5 Primary Transfer Corridors Monitored
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3">Origin Facility</th>
                  <th className="px-5 py-3">Destination Facility</th>
                  <th className="px-5 py-3 text-center">Total Referrals</th>
                  <th className="px-5 py-3 text-center">Avg Triage Wait</th>
                  <th className="px-5 py-3 text-center">Closed-Loop Rate</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {facilityTransferVolume.map((row) => (
                  <tr key={`${row.origin}-${row.destination}`} className="hover:bg-slate-50/60 transition">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{row.origin}</td>
                    <td className="px-5 py-3.5 font-semibold text-teal-900">{row.destination}</td>
                    <td className="px-5 py-3.5 text-center font-mono font-bold text-slate-900">{row.volume}</td>
                    <td className="px-5 py-3.5 text-center">{row.avgWait}</td>
                    <td className="px-5 py-3.5 text-center font-bold text-emerald-700">{row.closedRate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        Operational
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subtle Footer Note */}
        <p className="pt-2 text-center text-[11px] text-slate-400">
          District Health Analytics Engine • NIRAMAYA-SETU Platform
        </p>

      </div>
    </main>
  );
}
