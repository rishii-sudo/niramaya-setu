"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  ShieldCheck,
  Search,
  Filter,
  ArrowDownToLine,
  Lock,
  Activity,
  AlertTriangle,
  UserCheck,
  Eye,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  facility: string;
  ipAddress: string;
  status: "Success" | "Flagged" | "Blocked";
  details: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "LOG-9821",
    timestamp: "04 Sep 2026, 11:32:15 AM",
    actor: "Dr. Rajesh Sharma (DOC-2048)",
    role: "Doctor",
    action: "Referral Verified & Opened",
    resource: "Referral NS-28491 (Ramesh Kumar)",
    facility: "SMS Hospital",
    ipAddress: "192.168.1.45 (Facility LAN)",
    status: "Success",
    details: "Referral QR scanned and authorized session token verified.",
  },
  {
    id: "LOG-9820",
    timestamp: "04 Sep 2026, 11:15:02 AM",
    actor: "Sunita Sharma (ASHA-302)",
    role: "ASHA / ANM",
    action: "Patient Consent Updated",
    resource: "Patient NS-10284",
    facility: "PHC Bassi",
    ipAddress: "10.42.0.18 (Mobile App)",
    status: "Success",
    details: "Consent granted for Cardiology diagnostic record sharing.",
  },
  {
    id: "LOG-9819",
    timestamp: "04 Sep 2026, 10:48:40 AM",
    actor: "System Auto-Sync",
    role: "Background Worker",
    action: "Offline Queue Batch Synchronized",
    resource: "12 Vitals & Follow-up Records",
    facility: "CHC Chomu Sub-center",
    ipAddress: "127.0.0.1",
    status: "Success",
    details: "Client batch sync simulation completed (production backend integration planned).",
  },
  {
    id: "LOG-9818",
    timestamp: "04 Sep 2026, 09:20:11 AM",
    actor: "Unknown Session",
    role: "External Client",
    action: "Unauthenticated Clinical Record Access Attempt",
    resource: "Patient NS-10263",
    facility: "District Hospital Jaipur",
    ipAddress: "103.21.144.92",
    status: "Blocked",
    details: "Blocked: Missing referral token and OTP authorization header.",
  },
  {
    id: "LOG-9817",
    timestamp: "03 Sep 2026, 04:55:22 PM",
    actor: "Manoj Meena (STAFF-401)",
    role: "Facility Staff",
    action: "Inpatient Bed Allocation",
    resource: "Bed CC-04 (Cardiology Ward)",
    facility: "SMS Hospital",
    ipAddress: "192.168.1.12",
    status: "Success",
    details: "Emergency referral bed assigned for Ramesh Kumar.",
  },
  {
    id: "LOG-9816",
    timestamp: "03 Sep 2026, 02:14:09 PM",
    actor: "Admin Anjali Gupta",
    role: "Administrator",
    action: "Role Permission Modification (PHC Bassi Care Coordinator)",
    resource: "System Access Policy #402",
    facility: "State Health Mission HQ",
    ipAddress: "10.0.0.5",
    status: "Success",
    details: "Granted tele-consultation scheduling permission.",
  },
];

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.facility.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <span className="text-slate-800">Audit Logs</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Security & Access Audit Trail
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Immutable audit log of all clinical record accesses, referral transitions, consent updates, and security events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck size={16} />
              Tamper-evident Prototype
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by actor, action, patient ID, IP..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 shrink-0" />
            {["All", "Success", "Blocked", "Flagged"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === status
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5">Actor / Role</th>
                  <th className="px-5 py-3.5">Action Performed</th>
                  <th className="px-5 py-3.5">Target Resource</th>
                  <th className="px-5 py-3.5">Facility / IP</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{log.actor}</p>
                      <span className="text-[10px] text-slate-400">{log.role}</span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">{log.action}</td>
                    <td className="px-5 py-4 font-mono text-[11px] text-teal-800">{log.resource}</td>
                    <td className="px-5 py-4">
                      <p className="text-slate-700">{log.facility}</p>
                      <p className="font-mono text-[10px] text-slate-400">{log.ipAddress}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          log.status === "Success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : log.status === "Blocked"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {log.status === "Success" ? "✓" : log.status === "Blocked" ? "✕" : "!"} {log.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={12} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prototype Notice */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Prototype Audit Logging Layer</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            All administrative events, clinical queries, and sync packets are captured for security auditing. In production, this data feeds into an immutable append-only WORM storage compliant with Digital Personal Data Protection (DPDP) Act requirements.
          </p>
        </div>

        {/* Log Inspector Modal */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-700">{selectedLog.id}</span>
                  <span className="text-sm font-bold text-slate-900">Audit Event Details</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Timestamp</span>
                    <p className="font-mono font-medium text-slate-700">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                    <p className="font-semibold text-slate-900">{selectedLog.status}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Actor & Role</span>
                  <p className="font-medium text-slate-800">{selectedLog.actor} ({selectedLog.role})</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Action</span>
                  <p className="font-medium text-slate-800">{selectedLog.action}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Target Resource</span>
                  <p className="font-mono text-teal-800">{selectedLog.resource}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Facility & Network</span>
                  <p className="text-slate-700">{selectedLog.facility} • {selectedLog.ipAddress}</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Event Context & Payload</span>
                  <p className="mt-1 text-slate-700">{selectedLog.details}</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
