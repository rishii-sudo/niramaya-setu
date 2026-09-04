"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAllReferralStates,
  setReferralStatus,
} from "@/app/data/referralState";

type Priority = "Routine" | "Urgent" | "Emergency";

type ContactStatus =
  | "Pending"
  | "Reached"
  | "Not Reached";

type Outcome =
  | "Pending"
  | "Reached Facility"
  | "No-show"
  | "Rescheduled";

type FollowUpCase = {
  id: string;
  patientId: string;
  patientName: string;
  village: string;
  referralId: string;
  destination: string;
  deadline: string;
  hoursOverdue: number;
  priority: Priority;
  contactStatus: ContactStatus;
  outcome: Outcome;
  reason: string;
  notes: string;
  nextFollowUp: string;
};

const FOLLOWUP_STORAGE_KEY = "niramaya-asha-follow-ups";

const DEMO_CASES: FollowUpCase[] = [
  {
    id: "FUP-24017",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    village: "Rampura",
    referralId: "NS-28491",
    destination: "District Hospital Jaipur • Cardiology",
    deadline: "04 Sep, 09:20 AM",
    hoursOverdue: 7,
    priority: "Urgent",
    contactStatus: "Pending",
    outcome: "Pending",
    reason: "",
    notes: "",
    nextFollowUp: "",
  },
  {
    id: "FUP-24012",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    village: "Khejroli",
    referralId: "NS-28478",
    destination: "CHC Chomu • Medicine",
    deadline: "04 Sep, 01:10 PM",
    hoursOverdue: 2,
    priority: "Routine",
    contactStatus: "Reached",
    outcome: "Rescheduled",
    reason: "Transport issue",
    notes: "Patient requested another visit window.",
    nextFollowUp: "",
  },
  {
    id: "FUP-24005",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    village: "Chomu",
    referralId: "NS-28461",
    destination: "District Hospital Jaipur • General Medicine",
    deadline: "03 Sep, 10:30 AM",
    hoursOverdue: 14,
    priority: "Routine",
    contactStatus: "Pending",
    outcome: "Pending",
    reason: "",
    notes: "",
    nextFollowUp: "",
  },
];

const REASONS = [
  "Transport issue",
  "Cost concern",
  "Family not available",
  "Patient refused",
  "Could not contact",
  "Facility issue",
  "Other",
];

const FILTERS = [
  "All",
  "Pending",
  "Reached",
  "Not Reached",
] as const;

type Filter = (typeof FILTERS)[number];

function loadFollowUps(): FollowUpCase[] {
  if (typeof window === "undefined") {
    return DEMO_CASES;
  }

  try {
    const raw = localStorage.getItem(FOLLOWUP_STORAGE_KEY);

    if (!raw) {
      localStorage.setItem(
        FOLLOWUP_STORAGE_KEY,
        JSON.stringify(DEMO_CASES),
      );

      return DEMO_CASES;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return DEMO_CASES;
    }

    return parsed.map((item) => ({
      ...item,
      notes: item.notes ?? "",
      nextFollowUp: item.nextFollowUp ?? "",
    })) as FollowUpCase[];
  } catch {
    return DEMO_CASES;
  }
}

function saveFollowUps(cases: FollowUpCase[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    FOLLOWUP_STORAGE_KEY,
    JSON.stringify(cases),
  );
}

export default function ASHAFollowUpsPage() {
  const [cases, setCases] =
    useState<FollowUpCase[]>(DEMO_CASES);

  const [referralStates, setReferralStates] =
    useState<Record<string, string>>({});

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const [selectedCase, setSelectedCase] =
    useState<FollowUpCase | null>(null);

  const [contactStatus, setContactStatus] =
    useState<ContactStatus>("Reached");

  const [outcome, setOutcome] =
    useState<Outcome>("Reached Facility");

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [nextFollowUp, setNextFollowUp] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const syncReferralStates = useCallback(() => {
    try {
      const states = getAllReferralStates();
      setReferralStates(states);
    } catch {
      setReferralStates({});
    }
  }, []);

  useEffect(() => {
    setCases(loadFollowUps());
    syncReferralStates();

    const refresh = () => {
      setCases(loadFollowUps());
      syncReferralStates();
    };

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [syncReferralStates]);

  /*
   * Closed referrals are automatically removed from the
   * active 48-hour follow-up queue.
   */
  const activeCases = useMemo(() => {
    return cases.filter((item) => {
      const sharedStatus =
        referralStates[item.referralId] ??
        referralStates[item.patientId];

      return sharedStatus !== "Closed";
    });
  }, [cases, referralStates]);

  const filteredCases = useMemo(() => {
    const q = search.trim().toLowerCase();

    return activeCases.filter((item) => {
      const matchesSearch =
        !q ||
        item.patientName.toLowerCase().includes(q) ||
        item.patientId.toLowerCase().includes(q) ||
        item.referralId.toLowerCase().includes(q) ||
        item.village.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ||
        item.contactStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [activeCases, search, filter]);

  const pendingCount = activeCases.filter(
    (item) => item.contactStatus === "Pending",
  ).length;

  const reachedCount = activeCases.filter(
    (item) => item.contactStatus === "Reached",
  ).length;

  const notReachedCount = activeCases.filter(
    (item) => item.contactStatus === "Not Reached",
  ).length;

  const priorityCount = activeCases.filter(
    (item) =>
      item.priority === "Urgent" ||
      item.priority === "Emergency",
  ).length;

  function openCase(item: FollowUpCase) {
    setSelectedCase(item);

    setContactStatus(item.contactStatus);
    setOutcome(item.outcome);
    setReason(item.reason);
    setNotes(item.notes);
    setNextFollowUp(item.nextFollowUp);
    setSaved(false);
  }

  function closeCase() {
    if (saving) {
      return;
    }

    setSelectedCase(null);
    setSaved(false);
  }

  function handleSave() {
    if (!selectedCase || saving) {
      return;
    }

    setSaving(true);

    window.setTimeout(() => {
      let nextReferralStatus =
        referralStates[selectedCase.referralId] ??
        referralStates[selectedCase.patientId];

      /*
       * Reached Facility:
       * referral lifecycle moves to Received.
       */
      if (outcome === "Reached Facility") {
        setReferralStatus(
          selectedCase.referralId,
          "Received",
        );

        nextReferralStatus = "Received";
      }

      /*
       * No-show:
       * keep referral open and keep it in follow-up queue.
       */
      if (outcome === "No-show") {
        nextReferralStatus =
          nextReferralStatus ?? "In Transit";
      }

      /*
       * Rescheduled:
       * keep referral open.
       */
      if (outcome === "Rescheduled") {
        nextReferralStatus =
          nextReferralStatus ?? "In Transit";
      }

      const updated: FollowUpCase = {
        ...selectedCase,
        contactStatus,
        outcome,
        reason,
        notes,
        nextFollowUp,
      };

      const updatedCases = cases.map((item) =>
        item.id === selectedCase.id
          ? updated
          : item,
      );

      saveFollowUps(updatedCases);
      setCases(updatedCases);

      syncReferralStates();

      setSelectedCase(updated);
      setSaving(false);
      setSaved(true);
    }, 400);
  }

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/asha"
                className="hover:text-teal-700"
              >
                ASHA / ANM
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                Follow-ups
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              48-hour Follow-up
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Identify referral no-shows, contact patients
              and record the outcome of the follow-up.
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

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Action Required
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>

        {/* WORKFLOW */}
        <section className="mb-6 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg font-bold text-amber-700">
                !
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Closed-loop Follow-up
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Detect → Contact → Capture reason →
                  Update outcome → Schedule next action
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Follow-up workspace ready
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Open Alerts"
            value={pendingCount}
            detail="Awaiting ASHA action"
            alert
          />

          <MetricCard
            label="Patients Reached"
            value={reachedCount}
            detail="Contact successfully recorded"
          />

          <MetricCard
            label="Not Reached"
            value={notReachedCount}
            detail="Requires another attempt"
          />

          <MetricCard
            label="Priority Cases"
            value={priorityCount}
            detail="Urgent or emergency referral"
            alert
          />
        </section>

        {/* SEARCH / FILTER */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Follow-up Queue
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and filter referrals requiring field
                follow-up.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Patient, referral, village..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 sm:w-80"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as Filter)
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                {FILTERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* QUEUE */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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

                        <PriorityBadge
                          priority={item.priority}
                        />

                        <ContactBadge
                          status={item.contactStatus}
                        />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.patientId} • {item.village} •{" "}
                        {item.referralId}
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
                        className="w-full rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-teal-800"
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-xl font-bold text-teal-700">
                  ✓
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No matching follow-up cases
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Closed referrals are automatically removed
                  from this queue.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* INFO */}
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

        {/* PROTOTYPE NOTE */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <p className="text-xs leading-5 text-blue-800">
            Frontend prototype: follow-up actions are stored
            locally in browser storage. Shared referral state is
            used to remove closed referrals from the active
            queue.
          </p>
        </div>
      </div>

      {/* DRAWER */}
      {selectedCase && (
        <div className="fixed inset-0 z-50">

          <button
            type="button"
            aria-label="Close follow-up panel"
            onClick={closeCase}
            className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

            {/* HEADER */}
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
                    {selectedCase.referralId} •{" "}
                    {selectedCase.patientId}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCase}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-6 p-5">

              {/* PATIENT */}
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
                      {selectedCase.patientId} •{" "}
                      {selectedCase.village}
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

              {/* ALERT */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <p className="text-sm font-semibold text-amber-950">
                  48-hour no-show detected
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-800">
                  Referral deadline was{" "}
                  {selectedCase.hoursOverdue} hours ago
                  without a confirmed arrival.
                </p>
              </div>

              {/* CONTACT STATUS */}
              <FieldLabel title="Contact Status">
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      "Reached",
                      "Not Reached",
                      "Pending",
                    ] as const
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setContactStatus(status)
                      }
                      className={`rounded-xl border px-3 py-2.5 text-xs font-semibold ${
                        contactStatus === status
                          ? "border-teal-300 bg-teal-50 text-teal-800"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </FieldLabel>

              {/* OUTCOME */}
              <FieldLabel title="Referral Outcome">
                <select
                  value={outcome}
                  onChange={(e) =>
                    setOutcome(
                      e.target.value as Outcome,
                    )
                  }
                  className="input-style"
                >
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Reached Facility">
                    Reached Facility
                  </option>
                  <option value="No-show">
                    No-show
                  </option>
                  <option value="Rescheduled">
                    Rescheduled
                  </option>
                </select>
              </FieldLabel>

              {/* REASON */}
              <FieldLabel title="Reason / Barrier">
                <select
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  className="input-style"
                >
                  <option value="">
                    Select reason
                  </option>

                  {REASONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FieldLabel>

              {/* NOTES */}
              <FieldLabel title="Follow-up Notes">
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Record what the patient or family reported..."
                  className="input-style resize-none"
                />
              </FieldLabel>

              {/* NEXT FOLLOW-UP */}
              <FieldLabel title="Next Follow-up Date">
                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(e) =>
                    setNextFollowUp(e.target.value)
                  }
                  className="input-style"
                />

                <p className="mt-1.5 text-[11px] text-slate-500">
                  Use this when another field contact is
                  required.
                </p>
              </FieldLabel>

              {/* ACTIONS */}
              <div className="border-t border-slate-100 pt-5">

                {saved && (
                  <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold text-emerald-800">
                      ✓ Follow-up outcome saved successfully
                    </p>

                    <p className="mt-1 text-[11px] text-emerald-700">
                      The updated follow-up is stored locally.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">

                  <button
                    type="button"
                    onClick={closeCase}
                    disabled={saving}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Follow-up"}
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

/* =========================
   COMPONENTS
========================= */

function FieldLabel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {title}
      </label>

      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  alert = false,
}: {
  label: string;
  value: number;
  detail: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        alert
          ? "border-amber-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p
            className={`mt-3 text-3xl font-bold ${
              alert
                ? "text-amber-700"
                : "text-slate-900"
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

      <p className="mt-2 text-xs text-slate-500">
        {detail}
      </p>
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
          warning
            ? "text-amber-700"
            : "text-slate-800"
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
      : "border-slate-200 bg-white";

  const label = amber
    ? "text-amber-700"
    : blue
      ? "text-blue-700"
      : "text-teal-700";

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}
    >
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