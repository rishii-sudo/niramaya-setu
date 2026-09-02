"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Visit = {
  id: string;
  initials: string;
  name: string;
  patientId: string;
  village: string;
  time: string;
  reason: string;
  priority: "Urgent" | "Routine";
  status: "Scheduled" | "Completed";
};

type FollowUp = {
  id: string;
  initials: string;
  name: string;
  patientId: string;
  village: string;
  due: string;
  reason: string;
};

type Referral = {
  id: string;
  patient: string;
  patientId: string;
  village: string;
  referralId: string;
  facility: string;
  department: string;
  priority: "Urgent" | "Routine";
  status: "Created" | "In-Transit" | "Received";
};

const todayVisits: Visit[] = [
  {
    id: "VIS-1041",
    initials: "RK",
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    village: "Rampura",
    time: "09:30 AM",
    reason: "Referral follow-up",
    priority: "Urgent",
    status: "Scheduled",
  },
  {
    id: "VIS-1042",
    initials: "SD",
    name: "Sunita Devi",
    patientId: "NS-10279",
    village: "Khejroli",
    time: "11:15 AM",
    reason: "Medication check",
    priority: "Routine",
    status: "Scheduled",
  },
  {
    id: "VIS-1043",
    initials: "ML",
    name: "Mohan Lal",
    patientId: "NS-10271",
    village: "Chomu",
    time: "01:30 PM",
    reason: "Post-treatment visit",
    priority: "Routine",
    status: "Completed",
  },
];

const followUps: FollowUp[] = [
  {
    id: "FU-201",
    initials: "SD",
    name: "Sunita Devi",
    patientId: "NS-10279",
    village: "Khejroli",
    due: "Today",
    reason: "Review medication adherence",
  },
  {
    id: "FU-202",
    initials: "RK",
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    village: "Rampura",
    due: "Today",
    reason: "Check referral arrival",
  },
  {
    id: "FU-203",
    initials: "ML",
    name: "Mohan Lal",
    patientId: "NS-10271",
    village: "Chomu",
    due: "Tomorrow",
    reason: "Post-treatment monitoring",
  },
];

const referrals: Referral[] = [
  {
    id: "REF-R1",
    patient: "Ramesh Kumar",
    patientId: "NS-10284",
    village: "Rampura",
    referralId: "REF-24017",
    facility: "SMS Hospital",
    department: "Cardiology",
    priority: "Urgent",
    status: "In-Transit",
  },
  {
    id: "REF-R2",
    patient: "Sunita Devi",
    patientId: "NS-10279",
    village: "Khejroli",
    referralId: "REF-24012",
    facility: "CHC Chomu",
    department: "Medicine",
    priority: "Routine",
    status: "Created",
  },
  {
    id: "REF-R3",
    patient: "Mohan Lal",
    patientId: "NS-10271",
    village: "Chomu",
    referralId: "REF-24005",
    facility: "District Hospital",
    department: "General Medicine",
    priority: "Routine",
    status: "Received",
  },
];

const activities = [
  {
    id: "A1",
    number: "1",
    title: "Referral follow-up recorded",
    patient: "Ramesh Kumar",
    detail: "Patient contacted successfully",
    time: "08:42 AM",
    tone: "teal",
  },
  {
    id: "A2",
    number: "2",
    title: "Visit completed",
    patient: "Sunita Devi",
    detail: "Medication adherence reviewed",
    time: "Yesterday",
    tone: "blue",
  },
  {
    id: "A3",
    number: "3",
    title: "Referral created",
    patient: "Mohan Lal",
    detail: "District Hospital • General Medicine",
    time: "Yesterday",
    tone: "teal",
  },
  {
    id: "A4",
    number: "4",
    title: "Patient registered",
    patient: "Kamla Devi",
    detail: "New patient record created",
    time: "02 Sep 2026",
    tone: "blue",
  },
];

export default function AshaDashboardPage() {
  const [query, setQuery] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [recordedVisit, setRecordedVisit] = useState<string | null>(null);

  const filteredVisits = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return todayVisits;
    }

    return todayVisits.filter((visit) =>
      [
        visit.name,
        visit.patientId,
        visit.village,
        visit.reason,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [query]);

  const filteredFollowUps = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return followUps;
    }

    return followUps.filter((item) =>
      [
        item.name,
        item.patientId,
        item.village,
        item.reason,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [query]);

  const handleSync = () => {
    setSyncing(true);
    setSyncComplete(false);

    window.setTimeout(() => {
      setSyncing(false);
      setSyncComplete(true);
    }, 1000);
  };

  const handleRecordVisit = (visitId: string) => {
    setRecordedVisit(visitId);

    window.setTimeout(() => {
      setRecordedVisit(null);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =====================================================
            PAGE HEADER
           ===================================================== */}
        <section className="mb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/80 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-teal-800">
                  Rural Care Workspace
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                ASHA / ANM Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Track field visits, patient follow-ups and referral continuity
                from one workspace.
              </p>
            </div>

            <div className="flex items-stretch gap-2">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />

                  <p className="text-xs font-bold text-amber-900">
                    Offline Mode
                  </p>
                </div>

                <p className="mt-1 text-[9px] text-amber-700">
                  Local data capture enabled
                </p>
              </div>

              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-teal-200 hover:bg-teal-50/50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="flex items-center gap-2">
                  <span className="text-teal-700">
                    {syncing ? "↻" : "⟳"}
                  </span>

                  <p className="text-xs font-bold text-slate-800">
                    {syncing ? "Syncing..." : "Sync Now"}
                  </p>
                </div>

                <p className="mt-1 text-[9px] text-slate-400">
                  {syncComplete
                    ? "Sync completed just now"
                    : "Last sync: Today, 08:30 AM"}
                </p>
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            FIELD ACTIONS
           ===================================================== */}
        <section className="mb-5 rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Field Actions
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Start common field workflows directly from this dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/asha/visits"
                className="rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-800"
              >
                ☑ Record Visit
              </Link>

              <Link
                href="/patients/register"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ♙ Register Patient
              </Link>

              <Link
                href="/referrals/create"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ⊞ Create Referral
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            METRICS
           ===================================================== */}
        <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            label="Today's Visits"
            value="04"
            detail="2 completed • 2 remaining"
            icon="☷"
          />

          <MetricCard
            label="Follow-ups Due"
            value="03"
            detail="1 requires priority attention"
            icon="◷"
          />

          <MetricCard
            label="Pending Referrals"
            value="03"
            detail="1 urgent referral in transit"
            icon="⇄"
          />

          <MetricCard
            label="48h No-show Alerts"
            value="01"
            detail="Follow-up action required"
            icon="!"
            warning
          />

        </section>

        {/* =====================================================
            PATIENT LOOKUP
           ===================================================== */}
        <section className="mb-5 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Quick Patient Lookup
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search today&apos;s field visits using patient or village
                information.
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Patient name, ID, village..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            VISITS + FOLLOW UPS
           ===================================================== */}
        <div className="mb-5 grid gap-5 xl:grid-cols-[1.38fr_0.82fr]">

          {/* Today's visits */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Today&apos;s Visits
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Scheduled field activities for today.
                </p>
              </div>

              <Link
                href="/asha/visits"
                className="text-[10px] font-bold text-teal-700 hover:text-teal-800"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredVisits.length === 0 ? (
                <EmptyState text="No visits match your search." />
              ) : (
                filteredVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                        {visit.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">
                            {visit.name}
                          </p>

                          <PriorityBadge
                            priority={visit.priority}
                          />
                        </div>

                        <p className="mt-1 text-[10px] text-slate-400">
                          {visit.patientId} • {visit.village}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {visit.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">
                          {visit.time}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                          {visit.status}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRecordVisit(visit.id)
                        }
                        className={`rounded-xl border px-3.5 py-2.5 text-[10px] font-bold transition ${
                          recordedVisit === visit.id
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-teal-100 bg-teal-50/70 text-teal-800 hover:bg-teal-100"
                        }`}
                      >
                        {recordedVisit === visit.id
                          ? "Saved ✓"
                          : "Record"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Follow ups */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Follow-up Due
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Patients requiring field attention.
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700">
                03 Due
              </span>
            </div>

            <div className="space-y-3 p-4">
              {filteredFollowUps.length === 0 ? (
                <EmptyState text="No follow-ups match your search." />
              ) : (
                filteredFollowUps.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">
                            {item.name}
                          </p>

                          <span className="rounded-full bg-amber-50 px-2 py-1 text-[8px] font-bold text-amber-700">
                            {item.due}
                          </span>
                        </div>

                        <p className="mt-1 text-[9px] text-slate-400">
                          {item.patientId} • {item.village}
                        </p>

                        <p className="mt-3 text-[10px] leading-5 text-slate-600">
                          {item.reason}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/asha/follow-ups"
                      className="mt-3 inline-block text-[10px] font-bold text-teal-700 hover:text-teal-800"
                    >
                      Open Visit →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            REFERRALS + 48H ALERT
           ===================================================== */}
        <div className="mb-5 grid gap-5 xl:grid-cols-2">

          {/* Pending referrals */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Pending Referrals
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Referrals that still require continuity tracking.
                </p>
              </div>

              <Link
                href="/referrals"
                className="text-[10px] font-bold text-teal-700 hover:text-teal-800"
              >
                View Referrals →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:px-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {referral.patient}
                        </p>

                        <PriorityBadge
                          priority={referral.priority}
                        />
                      </div>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {referral.patientId} • {referral.village} •{" "}
                        {referral.referralId}
                      </p>
                    </div>

                    <ReferralStatus
                      status={referral.status}
                    />
                  </div>

                  <p className="text-xs text-slate-600">
                    {referral.facility} • {referral.department}
                  </p>

                  {referral.status === "In-Transit" && (
                    <Link
                      href={`/referrals/${referral.referralId}`}
                      className="text-[10px] font-bold text-teal-700 hover:text-teal-800"
                    >
                      Track referral →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 48 hour alert */}
          <section className="overflow-hidden rounded-2xl border border-amber-200 bg-white/90 shadow-sm">
            <div className="border-b border-amber-100 bg-amber-50/80 px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  !
                </div>

                <div>
                  <h2 className="text-sm font-bold text-amber-950">
                    48-hour No-show Alert
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    One referred patient has not yet been confirmed at the
                    destination facility.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">
                        Ramesh Kumar
                      </p>

                      <span className="rounded-full bg-red-50 px-2 py-1 text-[8px] font-bold text-red-700">
                        ACTION REQUIRED
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] text-slate-400">
                      NS-10284 • Rampura
                    </p>
                  </div>

                  <p className="font-mono text-[10px] font-bold text-slate-700">
                    REF-24017
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <AlertField
                    label="Destination"
                    value="SMS Hospital"
                  />

                  <AlertField
                    label="Department"
                    value="Cardiology"
                  />

                  <AlertField
                    label="Created"
                    value="02 Sep, 09:20 AM"
                  />

                  <AlertField
                    label="Last update"
                    value="No confirmation"
                  />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Link
                    href="/asha/follow-ups"
                    className="rounded-xl bg-amber-600 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-amber-700"
                  >
                    Follow Up Now
                  </Link>

                  <Link
                    href="/asha/follow-ups"
                    className="rounded-xl border border-amber-200 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-amber-50"
                  >
                    Record Outcome
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            RECENT ACTIVITY
           ===================================================== */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-bold text-slate-900">
              Recent Patient Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest actions recorded in the field workspace.
            </p>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                      activity.tone === "teal"
                        ? "bg-teal-50 text-teal-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {activity.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold text-slate-800">
                        {activity.title}
                      </p>

                      <span className="whitespace-nowrap text-[9px] text-slate-400">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] font-semibold text-teal-700">
                      {activity.patient}
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {activity.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            INFORMATION CARDS
           ===================================================== */}
        <section className="mb-5 grid gap-4 md:grid-cols-3">

          <InfoCard
            label="CARE CONTINUITY"
            title="Close the loop"
            text="Record what happened after a referral so the patient journey remains visible."
            tone="teal"
          />

          <InfoCard
            label="48H FOLLOW-UP"
            title="No-show escalation"
            text="Patients who fail to reach the referred facility can be flagged for field follow-up."
            tone="amber"
          />

          <InfoCard
            label="OFFLINE CAPTURE"
            title="Sync later"
            text="Field data can be captured locally and synchronized when connectivity is available."
            tone="blue"
          />

        </section>

        {/* =====================================================
            PROTOTYPE NOTE
           ===================================================== */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
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
              Prototype field workspace: offline status, synchronization,
              referral timing and patient activity shown here use frontend
              demonstration data. Real offline storage and synchronization
              will be connected through the backend.
            </p>
          </div>
        </div>
      </div>
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
  icon,
  warning = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white/90 p-5 shadow-sm ${
        warning
          ? "border-amber-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p
            className={`mt-3 text-2xl font-bold ${
              warning
                ? "text-amber-700"
                : "text-slate-900"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
            warning
              ? "bg-amber-50 text-amber-700"
              : "bg-teal-50 text-teal-700"
          }`}
        >
          {icon}
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
  priority: "Urgent" | "Routine";
}) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-[8px] font-bold ${
        priority === "Urgent"
          ? "bg-amber-50 text-amber-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {priority}
    </span>
  );
}

function ReferralStatus({
  status,
}: {
  status: "Created" | "In-Transit" | "Received";
}) {
  const styles = {
    Created: "bg-slate-100 text-slate-500",
    "In-Transit": "bg-blue-50 text-blue-700",
    Received: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function AlertField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-amber-100 bg-white/80 px-3 py-3">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  title,
  text,
  tone,
}: {
  label: string;
  title: string;
  text: string;
  tone: "teal" | "amber" | "blue";
}) {
  const styles = {
    teal: {
      border: "border-slate-200",
      background: "bg-white/90",
      label: "text-teal-700",
    },
    amber: {
      border: "border-amber-200",
      background: "bg-amber-50/60",
      label: "text-amber-700",
    },
    blue: {
      border: "border-blue-200",
      background: "bg-blue-50/60",
      label: "text-blue-700",
    },
  };

  const current = styles[tone];

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${current.border} ${current.background}`}
    >
      <p
        className={`text-[9px] font-bold uppercase tracking-[0.14em] ${current.label}`}
      >
        {label}
      </p>

      <h3 className="mt-2 text-sm font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="px-5 py-10 text-center">
      <p className="text-xs font-semibold text-slate-500">
        {text}
      </p>
    </div>
  );
}