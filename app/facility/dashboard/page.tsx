"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck,
  Clock3,
  FileText,
  FlaskConical,
  Hospital,
  Pill,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
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
} from "@/app/data/referralState";

const patientIds = [
  "NS-10284",
  "NS-10279",
  "NS-10271",
  "NS-10263",
];

type ReferralStateMap = Record<
  string,
  ReferralStatus
>;

type FacilityReferral = {
  patient: PatientRecord;
  status: ReferralStatus;
};

export default function FacilityDashboardPage() {
  /* ---------------------------------------------------------------------- */
  /* Patient data                                                           */
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
  /* Shared referral state                                                  */
  /*                                                                        */
  /* IMPORTANT:                                                             */
  /* localStorage is NOT read during the initial render.                    */
  /* This prevents server/client hydration mismatch.                       */
  /* ---------------------------------------------------------------------- */

  const [referralStates, setReferralStates] =
    useState<ReferralStateMap>({});

  const [isHydrated, setIsHydrated] =
    useState(false);

  function loadReferralStates() {
    const states =
      getAllReferralStates();

    setReferralStates(states);
    setIsHydrated(true);
  }

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

  /* ---------------------------------------------------------------------- */
  /* Referral list                                                          */
  /* ---------------------------------------------------------------------- */

  const referrals = useMemo<
    FacilityReferral[]
  >(() => {
    return patients.map((patient) => {
      const sharedStatus =
        isHydrated
          ? referralStates[
              patient.referralId
            ]
          : undefined;

      return {
        patient,
        status:
          sharedStatus ??
          patient.referralStatus,
      };
    });
  }, [
    patients,
    referralStates,
    isHydrated,
  ]);

  /* ---------------------------------------------------------------------- */
  /* Dashboard metrics                                                      */
  /* ---------------------------------------------------------------------- */

  const incomingReferrals =
    referrals.filter(
      (item) =>
        item.status === "Received" ||
        item.status === "In Transit",
    );

  const activePatients =
    referrals.filter(
      (item) =>
        item.status ===
        "Under Treatment",
    );

  const dischargedPatients =
    referrals.filter(
      (item) =>
        item.status === "Discharged",
    );

  const closedReferrals =
    referrals.filter(
      (item) =>
        item.status === "Closed",
    );

  /* ---------------------------------------------------------------------- */
  /* Refresh                                                                */
  /* ---------------------------------------------------------------------- */

  function refreshReferralState() {
    loadReferralStates();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-3">
          <div>
            <div className="flex items-center gap-2">
              <Building2
                size={18}
                className="text-teal-700"
              />

              <h1 className="text-lg font-bold text-slate-900">
                Facility Dashboard
              </h1>
            </div>

            <p className="text-xs text-slate-500">
              District Hospital Jaipur • Facility Operations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
              Facility Online
            </span>

            <button
              type="button"
              onClick={refreshReferralState}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />

              <span className="hidden sm:inline">
                Sync
              </span>
            </button>
          </div>
        </div>
      </header>

      <section className="p-6 lg:p-8">
        {/* ================================================================= */}
        {/* Page heading                                                      */}
        {/* ================================================================= */}

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            RECEIVING FACILITY
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Hospital Operations
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor incoming referrals, patient intake,
            capacity, diagnostics and the closed-loop care
            journey.
          </p>
        </div>

        {/* ================================================================= */}
        {/* Metrics                                                           */}
        {/* ================================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<FileText size={19} />}
            label="Incoming Referrals"
            value={incomingReferrals.length}
            description="Awaiting facility action"
          />

          <MetricCard
            icon={<Activity size={19} />}
            label="Under Treatment"
            value={activePatients.length}
            description="Active clinical episodes"
          />

          <MetricCard
            icon={<BedDouble size={19} />}
            label="Available Beds"
            value={18}
            description="Demo capacity"
          />

          <MetricCard
            icon={<CalendarCheck size={19} />}
            label="Discharge Queue"
            value={dischargedPatients.length}
            description="Ready for continuity"
          />
        </div>

        {/* ================================================================= */}
        {/* Facility status                                                   */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                FACILITY STATUS
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                District Hospital Jaipur
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Receiving referrals for Cardiology,
                General Medicine and Orthopedics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniCapacity
                label="Beds"
                value="18 / 40"
              />

              <MiniCapacity
                label="Doctors"
                value="12"
              />

              <MiniCapacity
                label="Labs"
                value="Available"
              />

              <MiniCapacity
                label="Imaging"
                value="Available"
              />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Main content                                                      */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          {/* ================================================================= */}
          {/* LEFT COLUMN                                                        */}
          {/* ================================================================= */}

          <div className="space-y-6">
            {/* Incoming Referrals */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Incoming Referrals
                    </h3>

                    <p className="text-xs text-slate-500">
                      Patients arriving from referring facilities
                    </p>
                  </div>
                </div>

                <Link
                  href="/referrals"
                  className="text-xs font-semibold text-teal-700"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {incomingReferrals.length ===
                0 ? (
                  <EmptyState
                    title="No incoming referrals"
                    description="There are currently no referrals awaiting facility action."
                  />
                ) : (
                  incomingReferrals.map(
                    ({
                      patient,
                      status,
                    }) => (
                      <ReferralRow
                        key={
                          patient.referralId
                        }
                        patient={patient}
                        status={status}
                      />
                    ),
                  )
                )}
              </div>
            </section>

            {/* Active Patients */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<Users size={19} />}
                title="Active Patients"
                subtitle="Patients currently under treatment"
              />

              <div className="mt-5 space-y-3">
                {activePatients.length ===
                0 ? (
                  <EmptyState
                    title="No active treatment episodes"
                    description="No patient is currently under treatment."
                  />
                ) : (
                  activePatients.map(
                    ({
                      patient,
                      status,
                    }) => (
                      <ReferralRow
                        key={
                          patient.referralId
                        }
                        patient={patient}
                        status={status}
                      />
                    ),
                  )
                )}
              </div>
            </section>

            {/* Bed capacity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<BedDouble size={19} />}
                title="Bed & Capacity"
                subtitle="Current demo facility availability"
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <CapacityCard
                  title="General Ward"
                  available="10"
                  total="24"
                />

                <CapacityCard
                  title="Cardiology"
                  available="4"
                  total="8"
                />

                <CapacityCard
                  title="Orthopedics"
                  available="2"
                  total="5"
                />

                <CapacityCard
                  title="ICU"
                  available="2"
                  total="3"
                />
              </div>
            </section>

            {/* Recent referral activity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<Clock3 size={19} />}
                title="Recent Referral Activity"
                subtitle="Latest changes in the facility workflow"
              />

              <div className="mt-6 space-y-6">
                <ActivityRow
                  title="Ramesh Kumar"
                  description="Referral moved to Under Treatment"
                  time="Today • 10:12 AM"
                />

                <ActivityRow
                  title="Sunita Devi"
                  description="Referral received by facility"
                  time="Today • 09:40 AM"
                />

                <ActivityRow
                  title="Kamla Devi"
                  description="Discharge completed"
                  time="Yesterday • 05:20 PM"
                />

                <ActivityRow
                  title="Mohan Lal"
                  description="Referral closed after follow-up"
                  time="Yesterday • 03:10 PM"
                  last
                />
              </div>
            </section>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN                                                       */}
          {/* ================================================================= */}

          <aside className="space-y-6">
            {/* Facility actions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<Hospital size={19} />}
                title="Facility Actions"
                subtitle="Common receiving-facility workflows"
              />

              <div className="mt-5 space-y-3">
                <ActionLink
                  href="/referrals"
                  icon={<FileText size={17} />}
                  title="Incoming Referrals"
                  description="Review and receive patients"
                />

                <ActionLink
                  href="/patients"
                  icon={<Users size={17} />}
                  title="Patients"
                  description="Search facility-linked patients"
                />

                <ActionLink
                  href="/facilities"
                  icon={<Building2 size={17} />}
                  title="Facility Directory"
                  description="Services and facility details"
                />

                <ActionLink
                  href="/notifications"
                  icon={<Activity size={17} />}
                  title="Alerts & Notifications"
                  description="Critical workflow alerts"
                />
              </div>
            </section>

            {/* Departments */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<Stethoscope size={19} />}
                title="Departments"
                subtitle="Specialist and service availability"
              />

              <div className="mt-5 space-y-3">
                <DepartmentRow
                  department="Cardiology"
                  doctors="4 doctors"
                  status="Available"
                />

                <DepartmentRow
                  department="General Medicine"
                  doctors="5 doctors"
                  status="Available"
                />

                <DepartmentRow
                  department="Orthopedics"
                  doctors="3 doctors"
                  status="Limited"
                />
              </div>
            </section>

            {/* Labs */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<FlaskConical size={19} />}
                title="Labs & Diagnostics"
                subtitle="Facility investigation services"
              />

              <div className="mt-5 space-y-3">
                <ServiceRow
                  icon={<FlaskConical size={16} />}
                  title="Laboratory"
                  value="Available"
                />

                <ServiceRow
                  icon={<Activity size={16} />}
                  title="ECG"
                  value="Available"
                />

                <ServiceRow
                  icon={<Activity size={16} />}
                  title="X-Ray"
                  value="Available"
                />

                <ServiceRow
                  icon={<Activity size={16} />}
                  title="Ultrasound"
                  value="Limited slots"
                />
              </div>
            </section>

            {/* Medicines */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<Pill size={19} />}
                title="Medicine Availability"
                subtitle="Selected essential medicine stock"
              />

              <div className="mt-5 space-y-3">
                <StockRow
                  medicine="Amlodipine"
                  stock="Available"
                />

                <StockRow
                  medicine="Metformin"
                  stock="Available"
                />

                <StockRow
                  medicine="Losartan"
                  stock="Low stock"
                />

                <StockRow
                  medicine="Paracetamol"
                  stock="Available"
                />
              </div>
            </section>

            {/* Security */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="text-sm font-semibold text-teal-900">
                    Consent-based facility access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Clinical information should only be available
                    to authorized facility staff under the correct
                    role and consent context.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ================================================================= */}
        {/* Bottom info                                                       */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <BottomInfo
            icon={<Clock3 size={18} />}
            title="48-hour Follow-up"
            text="Unconfirmed referrals can be surfaced for ASHA/ANM follow-up."
          />

          <BottomInfo
            icon={<RefreshCw size={18} />}
            title="Sync Center"
            text="Offline events should be reconciled with the central system."
          />

          <BottomInfo
            icon={<ShieldCheck size={18} />}
            title="Audit Trail"
            text="Facility actions should be timestamped and auditable."
          />
        </div>

        {/* Prototype note */}
        <p className="mt-6 text-center text-[11px] text-slate-400">
          Facility Operations • Prototype dataset • Production HIS/EMR integration planned
        </p>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Components                                                                 */
/* ========================================================================== */

function MetricCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          {icon}
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
          Live demo
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function MiniCapacity({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function ReferralRow({
  patient,
  status,
}: {
  patient: PatientRecord;
  status: ReferralStatus;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-teal-100 hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <Users size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {patient.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {patient.patientId} •{" "}
            {extractDepartment(
              patient.referralReason,
            )}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {patient.referralFrom} →{" "}
            {patient.referralTo}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge
          status={status}
        />

        <Link
          href={`/referrals/${patient.referralId}`}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-white"
        >
          View
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReferralStatus;
}) {
  const style =
    status === "Under Treatment"
      ? "bg-blue-50 text-blue-700"
      : status === "Received"
        ? "bg-teal-50 text-teal-700"
        : status === "Discharged"
          ? "bg-amber-50 text-amber-700"
          : status === "Closed"
            ? "bg-emerald-50 text-emerald-700"
            : status === "In Transit"
              ? "bg-indigo-50 text-indigo-700"
              : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${style}`}
    >
      {status}
    </span>
  );
}

function CapacityCard({
  title,
  available,
  total,
}: {
  title: string;
  available: string;
  total: string;
}) {
  const availableNumber =
    Number(available);

  const totalNumber =
    Number(total);

  const percent =
    totalNumber > 0
      ? Math.round(
          (availableNumber /
            totalNumber) *
            100,
        )
      : 0;

  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <span className="text-xs font-semibold text-teal-700">
          {available} available
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-teal-600"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-400">
        {available} / {total} beds available
      </p>
    </div>
  );
}

function ActivityRow({
  title,
  description,
  time,
  last = false,
}: {
  title: string;
  description: string;
  time: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="mt-1 h-3 w-3 rounded-full bg-teal-600" />

        {!last && (
          <div className="mt-1 h-full w-px bg-slate-200" />
        )}
      </div>

      <div className="pb-2">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

        <p className="mt-1 text-[10px] text-slate-400">
          {time}
        </p>
      </div>
    </div>
  );
}

function DepartmentRow({
  department,
  doctors,
  status,
}: {
  department: string;
  doctors: string;
  status: string;
}) {
  const limited =
    status === "Limited";

  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {department}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {doctors}
        </p>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
          limited
            ? "bg-amber-50 text-amber-700"
            : "bg-emerald-50 text-emerald-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function ServiceRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-3">
        <div className="text-teal-700">
          {icon}
        </div>

        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>
      </div>

      <span className="text-xs font-semibold text-emerald-600">
        {value}
      </span>
    </div>
  );
}

function StockRow({
  medicine,
  stock,
}: {
  medicine: string;
  stock: string;
}) {
  const low =
    stock.toLowerCase().includes("low");

  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
      <p className="text-sm font-medium text-slate-800">
        {medicine}
      </p>

      <span
        className={`text-xs font-semibold ${
          low
            ? "text-amber-700"
            : "text-emerald-600"
        }`}
      >
        {stock}
      </span>
    </div>
  );
}

function ActionLink({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-teal-200 hover:bg-teal-50/40"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={15}
        className="text-slate-400"
      />
    </Link>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function BottomInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-teal-700">
        {icon}

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
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