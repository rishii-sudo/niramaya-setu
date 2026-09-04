"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  Filter,
  FileText,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPatient,
  type PatientRecord,
  type ReferralStatus,
} from "@/app/data/patientData";

import {
  getAllReferralStates,
} from "@/app/data/referralState";

const patientIds = [
  "NS-10284",
  "NS-10279",
  "NS-10271",
  "NS-10263",
];

type FilterStatus =
  | "All"
  | ReferralStatus;

type FacilityReferral = {
  patient: PatientRecord;
  status: ReferralStatus;
};

export default function IncomingReferralsPage() {
  /* ---------------------------------------------------------------------- */
  /* Shared referral state                                                  */
  /* ---------------------------------------------------------------------- */

  const [referralStates, setReferralStates] =
    useState<Record<
      string,
      ReferralStatus
    >>({});

  const [isHydrated, setIsHydrated] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("All");

  const [priorityFilter, setPriorityFilter] =
    useState<
      "All" |
        "Routine" |
        "Urgent" |
        "Emergency"
    >("All");

  useEffect(() => {
    loadReferralStates();

    function handleStorageChange() {
      loadReferralStates();
    }

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  function loadReferralStates() {
    const states =
      getAllReferralStates();

    setReferralStates(states);
    setIsHydrated(true);
  }

  /* ---------------------------------------------------------------------- */
  /* Patients                                                               */
  /* ---------------------------------------------------------------------- */

  const patients = useMemo(() => {
    return patientIds
      .map((id) => getPatient(id))
      .filter(
        (
          patient,
        ): patient is PatientRecord =>
          Boolean(patient),
      );
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Referrals                                                              */
  /* ---------------------------------------------------------------------- */

  const referrals = useMemo<
    FacilityReferral[]
  >(() => {
    return patients.map((patient) => {
      const storedStatus =
        isHydrated
          ? referralStates[
              patient.referralId
            ]
          : undefined;

      return {
        patient,
        status:
          storedStatus ??
          patient.referralStatus,
      };
    });
  }, [
    patients,
    referralStates,
    isHydrated,
  ]);

  /* ---------------------------------------------------------------------- */
  /* Search / filters                                                       */
  /* ---------------------------------------------------------------------- */

  const filteredReferrals =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return referrals.filter(
        ({
          patient,
          status,
        }) => {
          const matchesSearch =
            query === "" ||
            patient.name
              .toLowerCase()
              .includes(query) ||
            patient.patientId
              .toLowerCase()
              .includes(query) ||
            patient.referralId
              .toLowerCase()
              .includes(query) ||
            patient.referralFrom
              .toLowerCase()
              .includes(query) ||
            patient.referralTo
              .toLowerCase()
              .includes(query) ||
            patient.referralReason
              .toLowerCase()
              .includes(query) ||
            extractDepartment(
              patient.referralReason,
            )
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "All" ||
            status === statusFilter;

          const matchesPriority =
            priorityFilter === "All" ||
            patient.referralPriority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
          );
        },
      );
    }, [
      referrals,
      search,
      statusFilter,
      priorityFilter,
    ]);

  /* ---------------------------------------------------------------------- */
  /* Counts                                                                 */
  /* ---------------------------------------------------------------------- */

  const receivedCount =
    referrals.filter(
      (item) =>
        item.status === "Received",
    ).length;

  const inTransitCount =
    referrals.filter(
      (item) =>
        item.status === "In Transit",
    ).length;

  const treatmentCount =
    referrals.filter(
      (item) =>
        item.status ===
        "Under Treatment",
    ).length;

  const urgentCount =
    referrals.filter(
      (item) =>
        item.patient.referralPriority ===
          "Urgent" ||
        item.patient.referralPriority ===
          "Emergency",
    ).length;

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Building2 size={19} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Incoming Referrals
              </h1>

              <p className="text-xs text-slate-500">
                District Hospital Jaipur • Receiving Facility
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadReferralStates}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw size={16} />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>
        </div>
      </header>

      <section className="p-6 lg:p-8">
        {/* ================================================================= */}
        {/* Heading                                                           */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              FACILITY OPERATIONS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Referral Intake Queue
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review patients referred to the receiving hospital,
              check priority and continue the closed-loop care
              journey.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span
              className={`h-2 w-2 rounded-full ${
                isHydrated
                  ? "bg-emerald-500"
                  : "bg-amber-400"
              }`}
            />

            {isHydrated
              ? "Shared status loaded"
              : "Loading referral state..."}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Summary Cards                                                     */}
        {/* ================================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Received"
            value={receivedCount}
            description="Awaiting facility intake"
          />

          <SummaryCard
            label="In Transit"
            value={inTransitCount}
            description="Patients on the way"
          />

          <SummaryCard
            label="Under Treatment"
            value={treatmentCount}
            description="Active clinical episodes"
          />

          <SummaryCard
            label="Priority Cases"
            value={urgentCount}
            description="Urgent + emergency"
          />
        </div>

        {/* ================================================================= */}
        {/* Filters                                                           */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search patient, referral ID, facility, department..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <Filter
                size={16}
                className="text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as FilterStatus,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="In Transit">
                  In Transit
                </option>

                <option value="Received">
                  Received
                </option>

                <option value="Under Treatment">
                  Under Treatment
                </option>

                <option value="Discharged">
                  Discharged
                </option>

                <option value="Closed">
                  Closed
                </option>
              </select>
            </div>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value as
                    | "All"
                    | "Routine"
                    | "Urgent"
                    | "Emergency",
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              <option value="All">
                All Priorities
              </option>

              <option value="Routine">
                Routine
              </option>

              <option value="Urgent">
                Urgent
              </option>

              <option value="Emergency">
                Emergency
              </option>
            </select>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Referral Queue                                                    */}
        {/* ================================================================= */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredReferrals.length}
              </span>{" "}
              of {referrals.length} referrals
            </p>

            <p className="text-xs text-slate-400">
              Facility intake queue
            </p>
          </div>

          {filteredReferrals.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {filteredReferrals.map(
                ({
                  patient,
                  status,
                }) => (
                  <ReferralCard
                    key={
                      patient.referralId
                    }
                    patient={patient}
                    status={status}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* Workflow Note                                                     */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-teal-700"
            />

            <div>
              <p className="text-sm font-semibold text-teal-900">
                Facility intake workflow
              </p>

              <p className="mt-1 text-xs leading-5 text-teal-800">
                Review the referral, confirm patient arrival,
                continue clinical care and maintain the referral
                lifecycle from receiving through discharge.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Prototype                                                         */}
        {/* ================================================================= */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs leading-5 text-amber-900">
          <strong>Prototype Notice:</strong>{" "}
          Referral records shown here use mock frontend data.
          Production deployment requires authenticated facility
          access, role-based authorization, backend persistence,
          consent enforcement and audit logging.
        </div>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Referral Card                                                              */
/* ========================================================================== */

function ReferralCard({
  patient,
  status,
}: {
  patient: PatientRecord;
  status: ReferralStatus;
}) {
  const canReceive =
    status === "In Transit";

  const canStartTreatment =
    status === "Received";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-100 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Patient */}
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <UserRound size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {patient.name}
              </h3>

              <StatusBadge status={status} />

              <PriorityBadge
                priority={patient.referralPriority}
              />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {patient.patientId} • Referral #
              {patient.referralId}
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-700">
              {patient.referralReason}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {extractDepartment(
                patient.referralReason,
              )}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/referrals/${patient.referralId}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Referral
            <ArrowRight size={15} />
          </Link>

          <Link
            href={`/doctor/patients/${patient.patientId}`}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
            Open Patient
          </Link>

          {canReceive && (
            <Link
              href={`/facility/incoming-referrals/${patient.referralId}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
            >
              Intake / Receive
              <ArrowRight size={14} />
            </Link>
          )}

          {canStartTreatment && (
            <Link
              href={`/facility/incoming-referrals/${patient.referralId}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Start Treatment
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Route */}
      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-3">
        <DataBox
          icon={<MapPin size={15} />}
          label="From"
          value={patient.referralFrom}
        />

        <DataBox
          icon={<Building2 size={15} />}
          label="To"
          value={patient.referralTo}
        />

        <DataBox
          icon={<Clock3 size={15} />}
          label="Priority"
          value={patient.referralPriority}
        />
      </div>

      {/* Clinical note */}
      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <FileText
            size={16}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="text-xs font-semibold text-slate-700">
              Referral Clinical Note
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {patient.clinicalNote}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ========================================================================== */
/* Components                                                                 */
/* ========================================================================== */

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReferralStatus;
}) {
  const styles: Record<
    ReferralStatus,
    string
  > = {
    Created:
      "bg-slate-100 text-slate-700",

    "In Transit":
      "bg-indigo-50 text-indigo-700",

    Received:
      "bg-teal-50 text-teal-700",

    "Under Treatment":
      "bg-blue-50 text-blue-700",

    Discharged:
      "bg-amber-50 text-amber-700",

    Closed:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority:
    | "Routine"
    | "Urgent"
    | "Emergency";
}) {
  const styles = {
    Routine:
      "bg-slate-100 text-slate-600",

    Urgent:
      "bg-amber-50 text-amber-700",

    Emergency:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function DataBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-teal-700">
          {icon}
        </span>

        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Search size={22} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        No referrals found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        No referral matches the selected search,
        status or priority filters.
      </p>
    </div>
  );
}

function extractDepartment(
  referralReason: string,
) {
  const reason =
    referralReason.toLowerCase();

  if (reason.includes("cardio")) {
    return "Cardiology";
  }

  if (
    reason.includes("orthopedic") ||
    reason.includes("bone")
  ) {
    return "Orthopedics";
  }

  if (reason.includes("general")) {
    return "General Medicine";
  }

  return "Specialist Review";
}