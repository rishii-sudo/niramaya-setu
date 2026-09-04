"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileText,
  Hospital,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
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
  getReferralStatus,
  setReferralStatus,
} from "@/app/data/referralState";

const patientIds = [
  "NS-10284",
  "NS-10279",
  "NS-10271",
  "NS-10263",
];

const bedStorageKey =
  "niramaya-facility-bed-assignments";

type BedAssignment = {
  patientId: string;
  patientName: string;
  assignedAt: string;
};

type AssignmentMap = Record<
  string,
  BedAssignment
>;

type AdmissionRecord = {
  patient: PatientRecord;
  status: ReferralStatus;
  bedId: string | null;
  assignedAt: string | null;
};

export default function FacilityAdmissionsPage() {
  const [referralStates, setReferralStates] =
    useState<
      Record<string, ReferralStatus>
    >({});

  const [assignments, setAssignments] =
    useState<AssignmentMap>({});

  const [isHydrated, setIsHydrated] =
    useState(false);

  const [filter, setFilter] =
    useState<
      | "All"
      | "Received"
      | "Under Treatment"
      | "Discharged"
      | "Closed"
    >("All");

  const [search, setSearch] =
    useState("");

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

  useEffect(() => {
    loadAdmissionsState();

    function handleStorageChange() {
      loadAdmissionsState();
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

  function loadAdmissionsState() {
    setReferralStates(
      getAllReferralStates(),
    );

    try {
      const stored =
        window.localStorage.getItem(
          bedStorageKey,
        );

      if (stored) {
        const parsed =
          JSON.parse(
            stored,
          ) as AssignmentMap;

        setAssignments(parsed);
      } else {
        setAssignments({});
      }
    } catch {
      setAssignments({});
    }

    setIsHydrated(true);
  }

  const admissions = useMemo<
    AdmissionRecord[]
  >(() => {
    return patients.map((patient) => {
      const status =
        isHydrated
          ? referralStates[
              patient.referralId
            ] ??
            getSafeInitialStatus(
              patient,
            )
          : getSafeInitialStatus(
              patient,
            );

      const assignment =
        Object.entries(assignments).find(
          ([, value]) =>
            value.patientId ===
            patient.patientId,
        );

      return {
        patient,
        status,
        bedId:
          assignment?.[0] ?? null,
        assignedAt:
          assignment?.[1]
            ?.assignedAt ?? null,
      };
    });
  }, [
    patients,
    referralStates,
    assignments,
    isHydrated,
  ]);

  const filteredAdmissions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return admissions.filter(
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
            extractDepartment(
              patient.referralReason,
            )
              .toLowerCase()
              .includes(query);

          const matchesFilter =
            filter === "All" ||
            status === filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        },
      );
    }, [
      admissions,
      search,
      filter,
    ]);

  const receivedCount =
    admissions.filter(
      (item) =>
        item.status === "Received",
    ).length;

  const treatmentCount =
    admissions.filter(
      (item) =>
        item.status ===
        "Under Treatment",
    ).length;

  const dischargedCount =
    admissions.filter(
      (item) =>
        item.status === "Discharged",
    ).length;

  const closedCount =
    admissions.filter(
      (item) =>
        item.status === "Closed",
    ).length;

  const totalActive =
    receivedCount +
    treatmentCount;

  function handleAdmit(
    patient: PatientRecord,
  ) {
    const assigned =
      Object.values(assignments).find(
        (item) =>
          item.patientId ===
          patient.patientId,
      );

    if (!assigned) {
      return;
    }

    const nextStatus =
      setReferralStatus(
        patient.referralId,
        "Under Treatment",
      );

    setReferralStates(
      (current) => ({
        ...current,
        [patient.referralId]:
          nextStatus,
      }),
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/facility/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Facility Dashboard
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Hospital
              size={16}
              className="text-teal-700"
            />
            District Hospital Jaipur
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* ================================================================= */}
        {/* Page Heading                                                      */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              FACILITY OPERATIONS
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Admissions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage patient intake, assigned beds and
              active hospital admissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`h-2 w-2 rounded-full ${
                isHydrated
                  ? "bg-emerald-500"
                  : "bg-amber-400"
              }`}
            />

            <span className="text-xs font-semibold text-slate-500">
              {isHydrated
                ? "Shared state loaded"
                : "Loading admission state..."}
            </span>

            <button
              type="button"
              onClick={loadAdmissionsState}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Metrics                                                           */}
        {/* ================================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Users size={19} />}
            label="Active Admissions"
            value={totalActive}
            note="Received + treatment"
          />

          <MetricCard
            icon={<Clock3 size={19} />}
            label="Awaiting Admission"
            value={receivedCount}
            note="Patient received"
          />

          <MetricCard
            icon={<Activity size={19} />}
            label="Under Treatment"
            value={treatmentCount}
            note="Active clinical care"
          />

          <MetricCard
            icon={<CalendarCheck size={19} />}
            label="Completed"
            value={
              dischargedCount +
              closedCount
            }
            note="Discharged + closed"
          />
        </div>

        {/* ================================================================= */}
        {/* Admission Workflow                                                */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
            ADMISSION WORKFLOW
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <WorkflowCard
              number="1"
              title="Received"
              text="Patient arrival confirmed"
              active={receivedCount > 0}
            />

            <WorkflowCard
              number="2"
              title="Bed Assigned"
              text="Ward / bed selected"
              active={
                Object.keys(
                  assignments,
                ).length > 0
              }
            />

            <WorkflowCard
              number="3"
              title="Admitted"
              text="Clinical episode started"
              active={treatmentCount > 0}
            />

            <WorkflowCard
              number="4"
              title="Treatment"
              text="Patient under care"
              active={treatmentCount > 0}
            />
          </div>
        </section>

        {/* ================================================================= */}
        {/* Search + Filter                                                   */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <FileText
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
                placeholder="Search patient, patient ID, referral or department..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(
                  event.target.value as
                    | "All"
                    | "Received"
                    | "Under Treatment"
                    | "Discharged"
                    | "Closed",
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              <option value="All">
                All Admissions
              </option>

              <option value="Received">
                Awaiting Admission
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
        </section>

        {/* ================================================================= */}
        {/* Admissions                                                         */}
        {/* ================================================================= */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredAdmissions.length}
              </span>{" "}
              admission records
            </p>

            <p className="text-xs text-slate-400">
              Facility admission queue
            </p>
          </div>

          {filteredAdmissions.length ===
          0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {filteredAdmissions.map(
                (admission) => (
                  <AdmissionCard
                    key={
                      admission.patient
                        .patientId
                    }
                    admission={
                      admission
                    }
                    onAdmit={
                      handleAdmit
                    }
                  />
                ),
              )}
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* Continuity Section                                                */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-teal-700"
              />

              <div>
                <p className="text-sm font-semibold text-teal-900">
                  Closed-loop care continuity
                </p>

                <p className="mt-1 text-xs leading-5 text-teal-800">
                  Admission status is connected to the shared referral
                  workflow so patient movement remains visible across
                  facility and clinical pages.
                </p>
              </div>
            </div>

            <Link
              href="/facility/incoming-referrals"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              Incoming Referrals
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Prototype                                                          */}
        {/* ================================================================= */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs leading-5 text-amber-900">
          <strong>Prototype Notice:</strong>{" "}
          Admission and bed data are demo values stored in browser state.
          Production deployment requires transactional backend persistence,
          authenticated facility access, bed-capacity validation and audit
          logging.
        </div>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Admission Card                                                             */
/* ========================================================================== */

function AdmissionCard({
  admission,
  onAdmit,
}: {
  admission: AdmissionRecord;
  onAdmit: (
    patient: PatientRecord,
  ) => void;
}) {
  const {
    patient,
    status,
    bedId,
    assignedAt,
  } = admission;

  const canAdmit =
    status === "Received" &&
    Boolean(bedId);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {/* Patient */}
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <UserRound size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                {patient.name}
              </h2>

              <StatusBadge
                status={status}
              />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {patient.patientId} • Referral #
              {patient.referralId}
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-700">
              {extractDepartment(
                patient.referralReason,
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/referrals/${patient.referralId}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Referral
            <ArrowRight size={15} />
          </Link>

          <Link
            href={`/patients/${patient.patientId}`}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
            Patient
          </Link>

          {canAdmit && (
            <button
              type="button"
              onClick={() =>
                onAdmit(patient)
              }
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <CheckCircle2 size={15} />
              Admit Patient
            </button>
          )}

          {status ===
            "Under Treatment" && (
            <Link
              href={`/patients/${patient.patientId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Clinical Status
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-4">
        <DetailBox
          icon={<Building2 size={15} />}
          label="Department"
          value={extractDepartment(
            patient.referralReason,
          )}
        />

        <DetailBox
          icon={<BedDouble size={15} />}
          label="Bed"
          value={
            bedId ??
            "Not assigned"
          }
        />

        <DetailBox
          icon={<Clock3 size={15} />}
          label="Assigned"
          value={
            assignedAt
              ? formatAssignedAt(
                  assignedAt,
                )
              : "Pending"
          }
        />

        <DetailBox
          icon={<Stethoscope size={15} />}
          label="Priority"
          value={
            patient.referralPriority
          }
        />
      </div>

      {/* State info */}
      {status === "Received" &&
        !bedId && (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              Bed assignment required
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              Assign an available bed from Beds & Capacity before
              admitting this patient.
            </p>

            <Link
              href="/facility/capacity"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-800"
            >
              Open Beds & Capacity
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

      {status ===
        "Under Treatment" && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
            <Activity size={16} />
            Active clinical admission
          </div>

          <p className="mt-1 text-xs leading-5 text-blue-800">
            Patient is currently under treatment in the receiving
            facility.
          </p>
        </div>
      )}

      {status ===
        "Discharged" && (
        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <CalendarCheck size={16} />
            Patient discharged
          </div>
        </div>
      )}

      {status === "Closed" && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
            <CheckCircle2 size={16} />
            Admission and referral completed
          </div>
        </div>
      )}
    </article>
  );
}

/* ========================================================================== */
/* Small Components                                                           */
/* ========================================================================== */

function MetricCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {note}
      </p>
    </div>
  );
}

function WorkflowCard({
  number,
  title,
  text,
  active,
}: {
  number: string;
  title: string;
  text: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        active
          ? "border-teal-200 bg-white"
          : "border-slate-100 bg-white/70"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            active
              ? "bg-teal-700 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {number}
        </div>

        <p
          className={`text-sm font-semibold ${
            active
              ? "text-slate-900"
              : "text-slate-400"
          }`}
        >
          {title}
        </p>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function DetailBox({
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
      <div className="flex items-center gap-2 text-teal-700">
        {icon}

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

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Hospital size={22} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        No admission records found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        Try changing the filter or search. Patients received by the
        facility will appear here.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* Helpers                                                                    */
/* ========================================================================== */

function getSafeInitialStatus(
  patient: PatientRecord,
): ReferralStatus {
  return patient.referralStatus;
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

  return "General Medicine";
}

function formatAssignedAt(
  value: string,
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Recorded";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}