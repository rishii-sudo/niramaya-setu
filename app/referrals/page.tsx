"use client";

import Link from "next/link";
import {
  ArrowRight,
  Filter,
  FileText,
  Plus,
  RefreshCw,
  Search,
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

type Referral = {
  id: string;
  patientId: string;
  patientName: string;
  from: string;
  to: string;
  department: string;
  priority:
    | "Routine"
    | "Urgent"
    | "Emergency";
  status: ReferralStatus;
  created: string;
};

type ReferralStateMap = Record<
  string,
  ReferralStatus
>;

const patientIds = [
  "NS-10284",
  "NS-10279",
  "NS-10271",
  "NS-10263",
];

const statusOptions: Array<
  "All" | ReferralStatus
> = [
  "All",
  "Created",
  "In Transit",
  "Received",
  "Under Treatment",
  "Discharged",
  "Closed",
];

export default function ReferralsPage() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<"All" | ReferralStatus>(
      "All",
    );

  /*
   * IMPORTANT:
   * Do NOT read localStorage during the first render.
   * That can cause SSR/client hydration mismatch.
   */
  const [referralStates, setReferralStates] =
    useState<ReferralStateMap>({});

  const [isHydrated, setIsHydrated] =
    useState(false);

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

  /*
   * First render uses patientData.ts defaults.
   * After hydration, localStorage status overrides them.
   */
  const referrals = useMemo<Referral[]>(() => {
    return patientIds
      .map((patientId) =>
        getPatient(patientId),
      )
      .filter(
        (
          patient,
        ): patient is PatientRecord =>
          Boolean(patient),
      )
      .map((patient) => ({
        id: patient.referralId,
        patientId: patient.patientId,
        patientName: patient.name,
        from: patient.referralFrom,
        to: patient.referralTo,
        department:
          extractDepartment(
            patient.referralReason,
          ),
        priority:
          patient.referralPriority,
        status:
          isHydrated &&
          referralStates[patient.referralId]
            ? referralStates[
                patient.referralId
              ]
            : patient.referralStatus,
        created:
          getCreatedDate(patient),
      }));
  }, [
    referralStates,
    isHydrated,
  ]);

  const filteredReferrals =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return referrals.filter(
        (referral) => {
          const matchesSearch =
            query === "" ||
            referral.id
              .toLowerCase()
              .includes(query) ||
            referral.patientId
              .toLowerCase()
              .includes(query) ||
            referral.patientName
              .toLowerCase()
              .includes(query) ||
            referral.from
              .toLowerCase()
              .includes(query) ||
            referral.to
              .toLowerCase()
              .includes(query) ||
            referral.department
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            status === "All" ||
            referral.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [referrals, search, status]);

  const totalReferrals =
    referrals.length;

  const inTransitCount =
    referrals.filter(
      (item) =>
        item.status === "In Transit",
    ).length;

  const receivedCount =
    referrals.filter(
      (item) =>
        item.status === "Received",
    ).length;

  const underTreatmentCount =
    referrals.filter(
      (item) =>
        item.status ===
        "Under Treatment",
    ).length;

  const dischargedCount =
    referrals.filter(
      (item) =>
        item.status === "Discharged",
    ).length;

  const closedCount =
    referrals.filter(
      (item) =>
        item.status === "Closed",
    ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="p-6 lg:p-8">
        {/* ================================================================= */}
        {/* Heading & Actions                                                 */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              REFERRAL MANAGEMENT
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Care Referrals
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track referred patients across facilities and care stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadReferralStates}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 shadow-sm"
              title="Refresh referral statuses"
            >
              <RefreshCw size={16} />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

            <Link
              href="/referrals/create"
              className="flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 shadow-sm"
            >
              <Plus size={17} />
              Create Referral
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Search + Filter                                                   */}
        {/* ================================================================= */}

        <div className="mt-8 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search by referral ID, patient, facility or department..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter
              size={17}
              className="text-slate-400"
            />

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "All"
                    | ReferralStatus,
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              {statusOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option === "All"
                      ? "All statuses"
                      : option}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Stats                                                             */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Referrals"
            value={totalReferrals.toString()}
          />

          <StatCard
            label="In Transit"
            value={inTransitCount.toString()}
          />

          <StatCard
            label="Received"
            value={receivedCount.toString()}
          />

          <StatCard
            label="Under Treatment"
            value={underTreatmentCount.toString()}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Discharged"
            value={dischargedCount.toString()}
          />

          <StatCard
            label="Closed"
            value={closedCount.toString()}
          />
        </div>

        {/* ================================================================= */}
        {/* Results                                                           */}
        {/* ================================================================= */}

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredReferrals.length}
            </span>{" "}
            of {referrals.length} referrals
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className={`h-2 w-2 rounded-full ${
                isHydrated
                  ? "bg-emerald-500"
                  : "bg-amber-400"
              }`}
            />

            {isHydrated
              ? "Shared status loaded"
              : "Loading shared status..."}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Referral Table                                                    */}
        {/* ================================================================= */}

        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {filteredReferrals.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">
                      Referral
                    </th>

                    <th className="px-5 py-4">
                      Patient
                    </th>

                    <th className="px-5 py-4">
                      Destination
                    </th>

                    <th className="px-5 py-4">
                      Department
                    </th>

                    <th className="px-5 py-4">
                      Priority
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Created
                    </th>

                    <th className="px-5 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredReferrals.map(
                    (referral) => (
                      <tr
                        key={referral.id}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                              <FileText
                                size={17}
                              />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                #{referral.id}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {referral.from}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {referral.patientName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {referral.patientId}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.to}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.department}
                        </td>

                        <td className="px-5 py-4">
                          <PriorityBadge
                            priority={
                              referral.priority
                            }
                          />
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              referral.status
                            }
                          />
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.created}
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href={`/referrals/${referral.id}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
                          >
                            View
                            <ArrowRight
                              size={15}
                            />
                          </Link>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Search size={20} />
              </div>

              <p className="mt-4 font-semibold text-slate-900">
                No referrals found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try another search or status
                filter.
              </p>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* Workflow Information                                              */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                Closed-loop Referral Workflow
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Created → In Transit → Received →
                Under Treatment → Discharged → Closed
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Referral status is shared across the
                clinical workflow for this prototype.
              </p>
            </div>

            <Link
              href="/doctor/referrals"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              Doctor Referrals
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Prototype note */}
        <p className="mt-6 text-center text-[11px] text-slate-400">
          Care Continuity Referrals • Demo dataset • Production integration planned
        </p>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Helpers                                                                    */
/* ========================================================================== */

function getCreatedDate(
  patient: PatientRecord,
) {
  switch (patient.referralId) {
    case "NS-28491":
      return "28 Aug 2026";

    case "NS-28478":
      return "27 Aug 2026";

    case "NS-28461":
      return "25 Aug 2026";

    case "NS-28432":
      return "22 Aug 2026";

    default:
      return "Not recorded";
  }
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

/* ========================================================================== */
/* Stats                                                                      */
/* ========================================================================== */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* Priority Badge                                                             */
/* ========================================================================== */

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
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

/* ========================================================================== */
/* Status Badge                                                               */
/* ========================================================================== */

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
      "bg-blue-50 text-blue-700",

    Received:
      "bg-teal-50 text-teal-700",

    "Under Treatment":
      "bg-purple-50 text-purple-700",

    Discharged:
      "bg-amber-50 text-amber-700",

    Closed:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}