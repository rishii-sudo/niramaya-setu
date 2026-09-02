"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Priority = "Routine" | "Urgent" | "Emergency";
type ContactStatus = "Pending" | "Reached" | "Not Reached";
type Outcome = "Pending" | "Reached Facility" | "No-show" | "Rescheduled";

type FollowUpCase = {
  id: string;
  patientId: string;
  patientName: string;
  village: string;
  referralId: string;
  destination: string;
  createdAt: string;
  deadline: string;
  hoursOverdue: number;
  priority: Priority;
  contactStatus: ContactStatus;
  outcome: Outcome;
  reason: string;
};

const initialCases: FollowUpCase[] = [
  {
    id: "FUP-24017",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    village: "Rampura",
    referralId: "REF-24017",
    destination: "SMS Hospital • Cardiology",
    createdAt: "02 Sep, 09:20 AM",
    deadline: "04 Sep, 09:20 AM",
    hoursOverdue: 7,
    priority: "Urgent",
    contactStatus: "Pending",
    outcome: "Pending",
    reason: "",
  },
  {
    id: "FUP-24012",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    village: "Khejroli",
    referralId: "REF-24012",
    destination: "CHC Chomu • Medicine",
    createdAt: "02 Sep, 01:10 PM",
    deadline: "04 Sep, 01:10 PM",
    hoursOverdue: 2,
    priority: "Routine",
    contactStatus: "Reached",
    outcome: "Rescheduled",
    reason: "Transport issue",
  },
  {
    id: "FUP-24005",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    village: "Chomu",
    referralId: "REF-24005",
    destination: "District Hospital • General Medicine",
    createdAt: "01 Sep, 10:30 AM",
    deadline: "03 Sep, 10:30 AM",
    hoursOverdue: 14,
    priority: "Routine",
    contactStatus: "Pending",
    outcome: "Pending",
    reason: "",
  },
];

const reasonOptions = [
  "Transport issue",
  "Cost concern",
  "Family not available",
  "Patient refused",
  "Could not contact",
  "Facility issue",
  "Other",
];

export default function ASHAFollowUpsPage() {
  const [cases, setCases] = useState<FollowUpCase[]>(initialCases);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Reached" | "Not Reached"
  >("All");

  const [selectedCase, setSelectedCase] = useState<FollowUpCase | null>(
    null
  );

  const [contactStatus, setContactStatus] =
    useState<ContactStatus>("Reached");

  const [outcome, setOutcome] = useState<Outcome>("Reached Facility");

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cases.filter((item) => {
      const matchesSearch =
        !query ||
        item.patientName.toLowerCase().includes(query) ||
        item.patientId.toLowerCase().includes(query) ||
        item.referralId.toLowerCase().includes(query) ||
        item.village.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || item.contactStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [cases, search, filter]);

  const pendingCount = cases.filter(
    (item) => item.contactStatus === "Pending"
  ).length;

  const reachedCount = cases.filter(
    (item) => item.contactStatus === "Reached"
  ).length;

  const notReachedCount = cases.filter(
    (item) => item.contactStatus === "Not Reached"
  ).length;

  const urgentCount = cases.filter(
    (item) => item.priority === "Urgent" || item.priority === "Emergency"
  ).length;

  const openCase = (item: FollowUpCase) => {
    setSelectedCase(item);
    setContactStatus(
      item.contactStatus === "Pending" ? "Reached" : item.contactStatus
    );
    setOutcome(item.outcome === "Pending" ? "Reached Facility" : item.outcome);
    setReason(item.reason);
    setNotes("");
    setNextFollowUp("");
    setSaved(false);
  };

  const closeCase = () => {
    setSelectedCase(null);
    setSaved(false);
  };

  const handleSave = () => {
    if (!selectedCase) return;

    setSaving(true);

    setTimeout(() => {
      setCases((currentCases) =>
        currentCases.map((item) =>
          item.id === selectedCase.id
            ? {
                ...item,
                contactStatus,
                outcome,
                reason,
              }
            : item
        )
      );

      setSelectedCase((current) =>
        current
          ? {
              ...current,
              contactStatus,
              outcome,
              reason,
            }
          : current
      );

      setSaving(false);
      setSaved(true);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/asha"
                className="transition hover:text-teal-700"
              >
                ASHA / ANM
              </Link>

              <span>/</span>

              <span className="text-slate-700">Follow-ups</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              48-hour Follow-up
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Identify referral no-shows, contact patients and record the
              outcome of the follow-up.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-sm font-semibold text-amber-900">
                  48h Monitoring
                </span>
              </div>

              <p className="mt-1 text-[11px] text-amber-700">
                Referral continuity queue
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Action Required
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <section className="mb-6 rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3l9 17H3L12 3z" />
                  <path d="M12 9v5" />
                  <path d="M12 17h.01" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Closed-loop Follow-up
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Detect → Contact → Capture reason → Update outcome → Schedule
                  next action
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Follow-up workspace ready
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Open Alerts"
            value={String(pendingCount)}
            detail="Awaiting ASHA action"
            alert
          />

          <MetricCard
            label="Patients Reached"
            value={String(reachedCount)}
            detail="Contact successfully recorded"
          />

          <MetricCard
            label="Not Reached"
            value={String(notReachedCount)}
            detail="Requires another attempt"
          />

          <MetricCard
            label="Priority Cases"
            value={String(urgentCount)}
            detail="Urgent or emergency referral"
            alert
          />
        </section>

        {/* Search + filter */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Follow-up Queue
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and filter referrals requiring field follow-up.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Patient, referral, village..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 sm:w-80"
                />
              </div>

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(
                    event.target.value as
                      | "All"
                      | "Pending"
                      | "Reached"
                      | "Not Reached"
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Reached</option>
                <option>Not Reached</option>
              </select>
            </div>
          </div>
        </section>

        {/* Queue */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Referral Follow-up Queue
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredCases.length} cases shown
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
                48h Rule
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="px-5 py-5 transition hover:bg-slate-50/60"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        item.priority === "Emergency"
                          ? "bg-red-50 text-red-700"
                          : item.priority === "Urgent"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      {item.patientName
                        .split(" ")
                        .map((name) => name[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {item.patientName}
                        </p>

                        <PriorityBadge priority={item.priority} />

                        <ContactBadge status={item.contactStatus} />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.patientId} • {item.village} • {item.referralId}
                      </p>

                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {item.destination}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[470px]">
                    <InfoBox
                      label="48h Deadline"
                      value={item.deadline}
                    />

                    <InfoBox
                      label="Status"
                      value={
                        item.hoursOverdue > 0
                          ? `${item.hoursOverdue}h overdue`
                          : "Within window"
                      }
                      warning={item.hoursOverdue > 0}
                    />

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => openCase(item)}
                        className="w-full rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-800"
                      >
                        {item.contactStatus === "Pending"
                          ? "Start Follow-up"
                          : "Update Follow-up"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredCases.length === 0 && (
              <div className="px-5 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  ✓
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No matching follow-up cases
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why this matters */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Detect"
            subtitle="48-hour no-show"
            text="Identify referred patients without a confirmed arrival at the destination facility."
          />

          <InfoCard
            title="Contact"
            subtitle="Field follow-up"
            text="Record whether the patient was reached and capture the reason for the missed referral."
            amber
          />

          <InfoCard
            title="Close the Loop"
            subtitle="Outcome tracking"
            text="Update the referral outcome and create the next follow-up action."
            blue
          />
        </div>

        {/* Prototype note */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7h.01" />
            </svg>

            <p className="text-xs leading-5 text-blue-800">
              Prototype workflow: alert timing, contact status and referral
              outcomes currently use frontend demo data. Real 48-hour
              detection and notifications will be handled by the backend.
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up drawer */}
      {selectedCase && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close follow-up panel"
            onClick={closeCase}
            className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-bold text-slate-900">
                      Follow-up Action
                    </p>

                    <PriorityBadge
                      priority={selectedCase.priority}
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedCase.referralId} • {selectedCase.patientId}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCase}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-6 p-5">
              {/* Patient */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Patient
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedCase.patientName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedCase.patientId} • {selectedCase.village}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {selectedCase.destination}
                    </p>
                  </div>

                  <Link
                    href={`/patients/${selectedCase.patientId}`}
                    className="rounded-lg border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-50"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Deadline */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    !
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-amber-950">
                      48-hour no-show detected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-800">
                      Referral deadline was {selectedCase.hoursOverdue} hours
                      ago without a confirmed arrival.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact status */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Contact Status
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {(["Reached", "Not Reached", "Pending"] as const).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setContactStatus(status)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                          contactStatus === status
                            ? "border-teal-300 bg-teal-50 text-teal-800"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Outcome */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Referral Outcome
                </label>

                <select
                  value={outcome}
                  onChange={(event) =>
                    setOutcome(event.target.value as Outcome)
                  }
                  className="input-style"
                >
                  <option>Pending</option>
                  <option>Reached Facility</option>
                  <option>No-show</option>
                  <option>Rescheduled</option>
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Reason / Barrier
                </label>

                <select
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="input-style"
                >
                  <option value="">Select reason</option>

                  {reasonOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Follow-up Notes
                </label>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Record what the patient or family reported..."
                  className="input-style resize-none"
                />
              </div>

              {/* Next action */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Next Follow-up Date
                </label>

                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(event) =>
                    setNextFollowUp(event.target.value)
                  }
                  className="input-style"
                />

                <p className="mt-1.5 text-[11px] text-slate-500">
                  Use this when another field contact is required.
                </p>
              </div>

              {/* Action */}
              <div className="border-t border-slate-100 pt-5">
                {saved && (
                  <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                        ✓
                      </span>

                      <p className="text-xs font-semibold text-emerald-800">
                        Follow-up outcome saved successfully
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={closeCase}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Follow-up"}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function MetricCard({
  label,
  value,
  detail,
  alert = false,
}: {
  label: string;
  value: string;
  detail: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white/90 p-5 shadow-sm ${
        alert ? "border-amber-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p
            className={`mt-3 text-3xl font-bold ${
              alert ? "text-amber-700" : "text-slate-900"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            alert
              ? "bg-amber-50 text-amber-700"
              : "bg-teal-50 text-teal-700"
          }`}
        >
          {alert ? "!" : "✓"}
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: Priority;
}) {
  const styles: Record<Priority, string> = {
    Routine: "bg-slate-100 text-slate-600",
    Urgent: "bg-amber-50 text-amber-700",
    Emergency: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function ContactBadge({
  status,
}: {
  status: ContactStatus;
}) {
  const styles: Record<ContactStatus, string> = {
    Pending: "bg-amber-50 text-amber-700",
    Reached: "bg-emerald-50 text-emerald-700",
    "Not Reached": "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function InfoBox({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-semibold ${
          warning ? "text-amber-700" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  subtitle,
  text,
  amber = false,
  blue = false,
}: {
  title: string;
  subtitle: string;
  text: string;
  amber?: boolean;
  blue?: boolean;
}) {
  const wrapper = amber
    ? "border-amber-200 bg-amber-50/80"
    : blue
    ? "border-blue-200 bg-blue-50/80"
    : "border-slate-200 bg-white/85";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <p
        className={`text-[11px] font-bold uppercase tracking-wide ${label}`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">
        {subtitle}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}