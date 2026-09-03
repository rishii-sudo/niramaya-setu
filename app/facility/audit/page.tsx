"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAllReferralStates } from "@/app/data/referralState";

type AuditAction =
  | "Referral Received"
  | "Patient Viewed"
  | "Bed Assigned"
  | "Treatment Started"
  | "Medicine Dispensed"
  | "Diagnostic Ordered"
  | "Report Viewed"
  | "Discharge Updated"
  | "Referral Closed"
  | "Consent Checked"
  | "Login"
  | "Verification";

type AuditResult = "Success" | "Warning" | "Blocked";

type AuditSeverity = "Info" | "Medium" | "High";

type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  ip: string;
  device: string;
  result: AuditResult;
  severity: AuditSeverity;
  details: string;
};

const demoEvents: AuditEvent[] = [
  {
    id: "AUD-9001",
    timestamp: "03 Sep 2026, 16:48",
    actor: "Facility Admin",
    role: "Facility Admin",
    action: "Referral Received",
    resource: "Referral",
    resourceId: "NS-28491",
    ip: "10.24.8.21",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Info",
    details:
      "Referral token validated and incoming referral marked as received.",
  },
  {
    id: "AUD-9002",
    timestamp: "03 Sep 2026, 16:44",
    actor: "Dr. Meera Sharma",
    role: "Doctor",
    action: "Patient Viewed",
    resource: "Patient",
    resourceId: "NS-10284",
    ip: "10.24.8.34",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Info",
    details:
      "Patient clinical summary opened under active referral context.",
  },
  {
    id: "AUD-9003",
    timestamp: "03 Sep 2026, 16:40",
    actor: "Nurse Station 2",
    role: "Nurse",
    action: "Bed Assigned",
    resource: "Bed",
    resourceId: "CARD-08",
    ip: "10.24.8.42",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Medium",
    details:
      "Cardiology bed allocated to referral NS-28491.",
  },
  {
    id: "AUD-9004",
    timestamp: "03 Sep 2026, 16:31",
    actor: "Dr. Meera Sharma",
    role: "Doctor",
    action: "Treatment Started",
    resource: "Referral",
    resourceId: "NS-28491",
    ip: "10.24.8.34",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Info",
    details:
      "Referral moved into active treatment workflow.",
  },
  {
    id: "AUD-9005",
    timestamp: "03 Sep 2026, 16:23",
    actor: "Pharmacy Desk",
    role: "Pharmacist",
    action: "Medicine Dispensed",
    resource: "Medicine Order",
    resourceId: "MED-ORD-1882",
    ip: "10.24.8.56",
    device: "Edge / Windows",
    result: "Success",
    severity: "Medium",
    details:
      "Prescribed medicines dispensed against authenticated patient record.",
  },
  {
    id: "AUD-9006",
    timestamp: "03 Sep 2026, 16:17",
    actor: "Lab Desk",
    role: "Lab Technician",
    action: "Diagnostic Ordered",
    resource: "Diagnostic",
    resourceId: "REP-28491",
    ip: "10.24.8.63",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Info",
    details:
      "ECG investigation order created for referral NS-28491.",
  },
  {
    id: "AUD-9007",
    timestamp: "03 Sep 2026, 16:02",
    actor: "Lab Desk",
    role: "Lab Technician",
    action: "Report Viewed",
    resource: "Diagnostic Report",
    resourceId: "REP-28491",
    ip: "10.24.8.63",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Medium",
    details:
      "Ready diagnostic report opened by authorized laboratory user.",
  },
  {
    id: "AUD-9008",
    timestamp: "03 Sep 2026, 15:48",
    actor: "Facility Admin",
    role: "Facility Admin",
    action: "Consent Checked",
    resource: "Consent",
    resourceId: "CON-4481",
    ip: "10.24.8.21",
    device: "Chrome / Windows",
    result: "Success",
    severity: "High",
    details:
      "Consent validation completed before clinical information access.",
  },
  {
    id: "AUD-9009",
    timestamp: "03 Sep 2026, 15:39",
    actor: "Unknown Device",
    role: "Unknown",
    action: "Patient Viewed",
    resource: "Patient",
    resourceId: "NS-10279",
    ip: "103.84.22.19",
    device: "Unknown Browser",
    result: "Blocked",
    severity: "High",
    details:
      "Patient record access blocked because authenticated role was not present.",
  },
  {
    id: "AUD-9010",
    timestamp: "03 Sep 2026, 15:27",
    actor: "ASHA-204",
    role: "ASHA",
    action: "Patient Viewed",
    resource: "Patient",
    resourceId: "NS-10263",
    ip: "10.24.9.18",
    device: "Android / Chrome",
    result: "Warning",
    severity: "Medium",
    details:
      "Offline cached patient summary opened. Server sync confirmation pending.",
  },
  {
    id: "AUD-9011",
    timestamp: "03 Sep 2026, 15:14",
    actor: "Facility Admin",
    role: "Facility Admin",
    action: "Verification",
    resource: "Facility Access",
    resourceId: "FAC-JPR-204",
    ip: "10.24.8.21",
    device: "Chrome / Windows",
    result: "Success",
    severity: "High",
    details:
      "Facility verification token validated successfully.",
  },
  {
    id: "AUD-9012",
    timestamp: "03 Sep 2026, 14:58",
    actor: "Dr. Kavita Joshi",
    role: "Doctor",
    action: "Discharge Updated",
    resource: "Discharge",
    resourceId: "NS-28461",
    ip: "10.24.8.39",
    device: "Chrome / Windows",
    result: "Success",
    severity: "Medium",
    details:
      "Discharge checklist updated for orthopedics referral.",
  },
  {
    id: "AUD-9013",
    timestamp: "03 Sep 2026, 14:46",
    actor: "Facility Admin",
    role: "Facility Admin",
    action: "Referral Closed",
    resource: "Referral",
    resourceId: "NS-28461",
    ip: "10.24.8.21",
    device: "Chrome / Windows",
    result: "Success",
    severity: "High",
    details:
      "Referral closed after discharge workflow completion.",
  },
  {
    id: "AUD-9014",
    timestamp: "03 Sep 2026, 14:33",
    actor: "Unknown Device",
    role: "Unknown",
    action: "Login",
    resource: "Facility Account",
    resourceId: "FAC-JPR-204",
    ip: "185.71.44.2",
    device: "Unknown Browser",
    result: "Blocked",
    severity: "High",
    details:
      "Authentication attempt blocked after invalid facility credentials.",
  },
];

const actionFilters = [
  "All",
  "Referral Received",
  "Patient Viewed",
  "Bed Assigned",
  "Treatment Started",
  "Medicine Dispensed",
  "Diagnostic Ordered",
  "Report Viewed",
  "Discharge Updated",
  "Referral Closed",
  "Consent Checked",
  "Login",
  "Verification",
];

const resultFilters = [
  "All",
  "Success",
  "Warning",
  "Blocked",
];

const severityFilters = [
  "All",
  "Info",
  "Medium",
  "High",
];

function resultClass(result: AuditResult) {
  if (result === "Success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (result === "Warning") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-rose-200 bg-rose-50 text-rose-700";
}

function severityClass(severity: AuditSeverity) {
  if (severity === "High") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (severity === "Medium") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

function roleClass(role: string) {
  if (role === "Facility Admin") {
    return "bg-violet-50 text-violet-700";
  }

  if (role === "Doctor") {
    return "bg-blue-50 text-blue-700";
  }

  if (role === "Nurse") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (role === "Pharmacist") {
    return "bg-amber-50 text-amber-700";
  }

  if (role === "Lab Technician") {
    return "bg-cyan-50 text-cyan-700";
  }

  if (role === "ASHA") {
    return "bg-pink-50 text-pink-700";
  }

  return "bg-slate-100 text-slate-600";
}

export default function FacilityAuditPage() {
  const [referralStates, setReferralStates] = useState<
    Record<string, string>
  >({});

  const [search, setSearch] = useState("");
  const [action, setAction] = useState("All");
  const [result, setResult] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [selectedEvent, setSelectedEvent] =
    useState<AuditEvent | null>(null);

  useEffect(() => {
    setReferralStates(getAllReferralStates());
  }, []);

  const events = useMemo(() => {
    const stateEvents: AuditEvent[] = [];

    Object.entries(referralStates).forEach(
      ([patientId, currentStatus], index) => {
        stateEvents.push({
          id: `STATE-${index + 1}`,
          timestamp: "Current session",
          actor: "NIRAMAYA-SETU",
          role: "System",
          action:
            currentStatus === "Closed"
              ? "Referral Closed"
              : "Referral Received",
          resource: "Referral State",
          resourceId: patientId,
          ip: "System",
          device: "Browser Storage",
          result: "Success",
          severity: "Info",
          details: `Prototype referral state currently stored as "${currentStatus}".`,
        });
      }
    );

    return [...stateEvents, ...demoEvents];
  }, [referralStates]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.id.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.role.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query) ||
        event.resource.toLowerCase().includes(query) ||
        event.resourceId.toLowerCase().includes(query) ||
        event.ip.toLowerCase().includes(query) ||
        event.details.toLowerCase().includes(query);

      const matchesAction =
        action === "All" || event.action === action;

      const matchesResult =
        result === "All" || event.result === result;

      const matchesSeverity =
        severity === "All" || event.severity === severity;

      return (
        matchesSearch &&
        matchesAction &&
        matchesResult &&
        matchesSeverity
      );
    });
  }, [events, search, action, result, severity]);

  const totalEvents = events.length;

  const successEvents = events.filter(
    (event) => event.result === "Success"
  ).length;

  const warningEvents = events.filter(
    (event) => event.result === "Warning"
  ).length;

  const blockedEvents = events.filter(
    (event) => event.result === "Blocked"
  ).length;

  const highSeverity = events.filter(
    (event) => event.severity === "High"
  ).length;

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                  Security & Compliance
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  District Hospital Jaipur
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Audit Trail
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Track access, referral transitions, clinical actions,
                consent checks and blocked security events across the
                facility workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/facility/dashboard"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </Link>

              <Link
                href="/consent"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Consent Center
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Audit Events
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalEvents}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Current view
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-emerald-700">
              Successful
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {successEvents}
            </p>

            <p className="mt-1 text-xs text-emerald-700">
              Authorized actions
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-amber-700">
              Warnings
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-800">
              {warningEvents}
            </p>

            <p className="mt-1 text-xs text-amber-700">
              Review required
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-rose-700">
              Blocked
            </p>

            <p className="mt-1 text-2xl font-bold text-rose-800">
              {blockedEvents}
            </p>

            <p className="mt-1 text-xs text-rose-700">
              Access prevented
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-red-200 bg-red-50/50 p-4 shadow-sm md:col-span-1">
            <p className="text-xs font-medium text-red-700">
              High Severity
            </p>

            <p className="mt-1 text-2xl font-bold text-red-800">
              {highSeverity}
            </p>

            <p className="mt-1 text-xs text-red-700">
              Needs attention
            </p>
          </div>
        </section>

        {/* Security summary */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                Access Logging
              </p>

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                Active
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Patient, referral and clinical resource access should
              generate an auditable event.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                Consent Enforcement
              </p>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                Tracked
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Consent checks should be recorded before protected
              clinical information is shared.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                Security Alerts
              </p>

              <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
                {highSeverity} High
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Blocked or suspicious access events should be escalated
              for review by authorized administrators.
            </p>
          </div>
        </section>

        {/* Audit table */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Security Events
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Filter and inspect facility activity.
                </p>
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search actor, patient, IP..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-rose-400 focus:bg-white lg:w-72"
              />
            </div>

            {/* Action filters */}
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Action
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {actionFilters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setAction(item)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      action === item
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Result + Severity */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Result
                </p>

                <div className="flex flex-wrap gap-2">
                  {resultFilters.map((item) => (
                    <button
                      key={item}
                      onClick={() => setResult(item)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        result === item
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Severity
                </p>

                <div className="flex flex-wrap gap-2">
                  {severityFilters.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSeverity(item)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        severity === item
                          ? "bg-rose-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Time
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Actor
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Action
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Resource
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Result
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Severity
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 align-top">
                      <p className="whitespace-nowrap text-xs font-medium text-slate-700">
                        {event.timestamp}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {event.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <p className="text-sm font-semibold text-slate-900">
                        {event.actor}
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${roleClass(
                          event.role
                        )}`}
                      >
                        {event.role}
                      </span>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <p className="text-sm font-semibold text-slate-800">
                        {event.action}
                      </p>

                      <p className="mt-1 max-w-[210px] text-xs text-slate-500">
                        {event.ip}
                      </p>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <p className="text-sm font-medium text-slate-800">
                        {event.resource}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {event.resourceId}
                      </p>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${resultClass(
                          event.result
                        )}`}
                      >
                        {event.result}
                      </span>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityClass(
                          event.severity
                        )}`}
                      >
                        {event.severity}
                      </span>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="max-w-[280px] text-left text-xs leading-5 text-slate-600 hover:text-slate-900"
                      >
                        {event.details}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="block w-full p-5 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {event.action}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {event.actor} · {event.role}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${resultClass(
                      event.result
                    )}`}
                  >
                    {event.result}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-400">
                      Resource
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-800">
                      {event.resource}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      {event.resourceId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-400">
                      Severity
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${severityClass(
                        event.severity
                      )}`}
                    >
                      {event.severity}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-600">
                  {event.details}
                </p>

                <p className="mt-2 text-[10px] text-slate-400">
                  {event.timestamp} · {event.id}
                </p>
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="px-5 py-14 text-center">
              <p className="font-semibold text-slate-800">
                No audit events found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing the search or filters.
              </p>
            </div>
          )}
        </section>

        {/* Security architecture */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              What should be audited
            </h2>

            <div className="mt-4 space-y-3">
              {[
                "Authentication and verification events",
                "Patient and referral record access",
                "Consent checks and sharing actions",
                "Bed, treatment, medicine and diagnostic updates",
                "Discharge and referral closure",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-500" />

                  <p className="text-sm text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-bold text-blue-900">
              Production Security Requirements
            </h2>

            <div className="mt-4 space-y-3">
              {[
                "Server-side immutable audit records",
                "Authenticated actor identity and role",
                "Timestamp, resource and action metadata",
                "Tamper detection and restricted audit access",
                "Alerting for repeated or high-risk blocked actions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blue-200 bg-white/70 p-3"
                >
                  <span className="mt-0.5 rounded-lg bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                    SEC
                  </span>

                  <p className="text-sm leading-5 text-blue-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prototype notice */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-100 px-2.5 py-2 text-amber-700">
              !
            </div>

            <div>
              <p className="font-semibold text-amber-900">
                Audit trail is currently prototype data
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                The events shown here demonstrate the intended security
                monitoring experience. The current prototype also reads
                referral state from browser storage. Production must move
                audit logging to authenticated server-side storage with
                immutable records and proper access controls.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                  Audit Event
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedEvent.action}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedEvent.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Timestamp
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedEvent.timestamp}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Actor
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedEvent.actor}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedEvent.role}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Resource
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedEvent.resource}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedEvent.resourceId}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Network / Device
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedEvent.ip}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedEvent.device}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Result
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${resultClass(
                    selectedEvent.result
                  )}`}
                >
                  {selectedEvent.result}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Severity
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${severityClass(
                    selectedEvent.severity
                  )}`}
                >
                  {selectedEvent.severity}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Event Details
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedEvent.details}
              </p>
            </div>

            {selectedEvent.result === "Blocked" && (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="font-semibold text-rose-900">
                  Security Action Required
                </p>

                <p className="mt-1 text-sm leading-6 text-rose-800">
                  This event was blocked by the access-control workflow.
                  Production systems should retain the complete event,
                  correlate repeated attempts and alert authorized
                  security administrators when appropriate.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}