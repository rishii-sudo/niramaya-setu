"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Hospital,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import {
  getPatient,
  type PatientRecord,
  type ReferralStatus,
} from "@/app/data/patientData";

import {
  getReferralStatus,
  setReferralStatus,
} from "@/app/data/referralState";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function FacilityIntakePage({
  params,
}: Props) {
  const { id } = use(params);

  const [patient, setPatient] =
    useState<PatientRecord | null>(null);

  const [status, setStatus] =
    useState<ReferralStatus | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [department, setDepartment] =
    useState("General Medicine");

  const [bedType, setBedType] =
    useState("General Ward");

  useEffect(() => {
    const foundPatient =
      findPatientByReferralId(id);

    if (!foundPatient) {
      setPatient(null);
      setStatus(null);
      setLoading(false);
      return;
    }

    setPatient(foundPatient);

    const currentStatus =
      getReferralStatus(
        foundPatient.referralId,
      );

    setStatus(currentStatus);

    setDepartment(
      extractDepartment(
        foundPatient.referralReason,
      ),
    );

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-7 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading referral...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait
          </p>
        </div>
      </main>
    );
  }

  if (patient === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            !
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Referral not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No patient referral exists for{" "}
            <span className="font-semibold text-slate-800">
              #{id}
            </span>
            .
          </p>

          <Link
            href="/facility/incoming-referrals"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <ArrowLeft size={16} />
            Back to Incoming Referrals
          </Link>
        </div>
      </main>
    );
  }

  /*
   * From this point onward patient is guaranteed
   * to be a PatientRecord.
   */
  const currentPatient: PatientRecord =
    patient;

  const currentStatus: ReferralStatus =
    status ?? currentPatient.referralStatus;

  const canReceive =
    currentStatus === "In Transit";

  const alreadyReceived =
    currentStatus === "Received";

  const alreadyProcessed =
    currentStatus === "Under Treatment" ||
    currentStatus === "Discharged" ||
    currentStatus === "Closed";

  function handleReceivePatient() {
    if (!canReceive || processing) {
      return;
    }

    setProcessing(true);
    setSuccess(false);

    window.setTimeout(() => {
      const nextStatus =
        setReferralStatus(
          currentPatient.referralId,
          "Received",
        );

      setStatus(nextStatus);
      setSuccess(true);
      setProcessing(false);
    }, 500);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/facility/incoming-referrals"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Incoming Referrals
          </Link>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck
              size={16}
              className="text-teal-700"
            />
            Facility Clinical Access
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* ================================================================= */}
        {/* Heading                                                           */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              FACILITY INTAKE
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Receive Patient
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Confirm patient arrival and continue the receiving-facility
              care workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              status={currentStatus}
            />

            <PriorityBadge
              priority={
                currentPatient.referralPriority
              }
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* Success                                                           */}
        {/* ================================================================= */}

        {success && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-700"
              />

              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Patient received successfully
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-800">
                  Referral #
                  {currentPatient.referralId} is
                  now marked as{" "}
                  <strong>Received</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Main Grid                                                         */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Patient Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<UserRound size={19} />}
                title="Patient Summary"
                subtitle="Verify the patient linked to the referral"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                  label="Patient"
                  value={currentPatient.name}
                />

                <InfoCard
                  label="Patient ID"
                  value={currentPatient.patientId}
                />

                <InfoCard
                  label="Age / Gender"
                  value={`${currentPatient.age} / ${currentPatient.gender}`}
                />

                <InfoCard
                  label="Blood Group"
                  value={
                    currentPatient.bloodGroup
                  }
                />

                <InfoCard
                  label="Location"
                  value={currentPatient.village}
                />

                <InfoCard
                  label="Referral ID"
                  value={
                    currentPatient.referralId
                  }
                />
              </div>
            </section>

            {/* Referral Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<FileText size={19} />}
                title="Referral Details"
                subtitle="Information supplied by the referring facility"
              />

              <div className="mt-5 space-y-4">
                <DetailRow
                  label="Referral Reason"
                  value={
                    currentPatient.referralReason
                  }
                />

                <DetailRow
                  label="Referring Facility"
                  value={
                    currentPatient.referralFrom
                  }
                />

                <DetailRow
                  label="Receiving Facility"
                  value={
                    currentPatient.referralTo
                  }
                />

                <DetailRow
                  label="Priority"
                  value={
                    currentPatient.referralPriority
                  }
                />
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Clinical Note
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {currentPatient.clinicalNote}
                </p>
              </div>
            </section>

            {/* Allocation */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<BedDouble size={19} />}
                title="Initial Allocation"
                subtitle="Prepare the patient for facility intake"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-semibold text-slate-700">
                    Department
                  </span>

                  <select
                    value={department}
                    onChange={(event) =>
                      setDepartment(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="Cardiology">
                      Cardiology
                    </option>

                    <option value="General Medicine">
                      General Medicine
                    </option>

                    <option value="Orthopedics">
                      Orthopedics
                    </option>

                    <option value="Emergency">
                      Emergency
                    </option>
                  </select>
                </label>

                <label>
                  <span className="text-xs font-semibold text-slate-700">
                    Bed / Ward
                  </span>

                  <select
                    value={bedType}
                    onChange={(event) =>
                      setBedType(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="General Ward">
                      General Ward
                    </option>

                    <option value="Cardiology">
                      Cardiology
                    </option>

                    <option value="Orthopedics">
                      Orthopedics
                    </option>

                    <option value="ICU">
                      ICU
                    </option>
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <AllocationCard
                  label="Department"
                  value={department}
                  icon={
                    <Stethoscope size={16} />
                  }
                />

                <AllocationCard
                  label="Ward"
                  value={bedType}
                  icon={
                    <Hospital size={16} />
                  }
                />

                <AllocationCard
                  label="Referral"
                  value={
                    currentPatient.referralId
                  }
                  icon={
                    <FileText size={16} />
                  }
                />
              </div>
            </section>

            {/* Safety */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<ShieldCheck size={19} />}
                title="Clinical Safety Check"
                subtitle="Review important information before intake"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SafetyCard
                  title="Blood Group"
                  value={
                    currentPatient.bloodGroup
                  }
                />

                <SafetyCard
                  title="Allergy"
                  value={
                    currentPatient.allergies.length
                      ? currentPatient.allergies
                          .map(
                            (item) =>
                              `${item.name} (${item.reaction})`,
                          )
                          .join(", ")
                      : "No known allergy"
                  }
                  danger={
                    currentPatient.allergies
                      .length > 0
                  }
                />
              </div>

              {currentPatient
                .chronicConditions.length >
                0 && (
                <div className="mt-3 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Chronic Conditions
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {currentPatient.chronicConditions
                      .map(
                        (item) =>
                          item.name,
                      )
                      .join(", ")}
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* Status */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                REFERRAL STATUS
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {currentStatus}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {getStatusDescription(
                  currentStatus,
                )}
              </p>
            </section>

            {/* Facility Action */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<CheckCircle2 size={19} />}
                title="Facility Action"
                subtitle="Update the referral journey"
              />

              <div className="mt-5">
                {canReceive && (
                  <button
                    type="button"
                    onClick={
                      handleReceivePatient
                    }
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {processing ? (
                      "Confirming Arrival..."
                    ) : (
                      <>
                        <CheckCircle2
                          size={17}
                        />
                        Receive Patient
                      </>
                    )}
                  </button>
                )}

                {alreadyReceived && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <CheckCircle2
                        size={17}
                      />
                      Patient already received
                    </div>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Continue with department and
                      treatment allocation.
                    </p>
                  </div>
                )}

                {alreadyProcessed && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-900">
                      Referral already processed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-800">
                      Current status:{" "}
                      {currentStatus}
                    </p>
                  </div>
                )}
              </div>

              {(alreadyReceived ||
                currentStatus ===
                  "Under Treatment") && (
                <Link
                  href={`/patients/${currentPatient.patientId}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  View Clinical Records
                  <ArrowRight size={16} />
                </Link>
              )}
            </section>

            {/* Route */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={<MapPin size={19} />}
                title="Referral Route"
                subtitle="Patient movement"
              />

              <div className="mt-5 space-y-5">
                <RoutePoint
                  label="Referring Facility"
                  value={
                    currentPatient.referralFrom
                  }
                  completed
                />

                <RoutePoint
                  label="Receiving Facility"
                  value={
                    currentPatient.referralTo
                  }
                  completed={
                    currentStatus !==
                    "In Transit"
                  }
                  current={
                    currentStatus ===
                    "In Transit"
                  }
                />

                <RoutePoint
                  label="Current Department"
                  value={
                    currentStatus ===
                      "Received" ||
                    currentStatus ===
                      "Under Treatment"
                      ? department
                      : "Pending intake"
                  }
                  completed={
                    currentStatus ===
                      "Under Treatment" ||
                    currentStatus ===
                      "Discharged" ||
                    currentStatus ===
                      "Closed"
                  }
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
                    Consent-based access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Patient information is displayed only
                    for the authorized facility workflow.
                  </p>
                </div>
              </div>
            </section>

            {/* Prototype */}
            <section className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                Prototype Notice
              </p>

              <p className="mt-2 text-xs leading-5 text-amber-900">
                Department and bed allocation are demonstration
                values. Production systems should validate capacity
                and persist intake events through the backend.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Helpers                                                                    */
/* ========================================================================== */

function findPatientByReferralId(
  referralId: string,
): PatientRecord | undefined {
  let normalized = referralId.replace(/^#/, "");
  if (normalized === "REF-24017") normalized = "NS-28491";
  if (normalized === "REF-24012") normalized = "NS-28478";
  if (normalized === "REF-24005") normalized = "NS-28461";

  const ids = [
    "NS-10284",
    "NS-10279",
    "NS-10271",
    "NS-10263",
  ];

  for (const patientId of ids) {
    const found = getPatient(patientId);

    if (
      found &&
      (found.referralId === normalized || found.patientId === normalized)
    ) {
      return found;
    }
  }

  return getPatient(normalized) || undefined;
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

function getStatusDescription(
  status: ReferralStatus,
) {
  switch (status) {
    case "Created":
      return "Referral has been created and is awaiting movement.";

    case "In Transit":
      return "Patient is travelling to the receiving facility. Confirm arrival when the patient reaches the hospital.";

    case "Received":
      return "Patient arrival has been confirmed by the receiving facility.";

    case "Under Treatment":
      return "Patient is currently under clinical treatment.";

    case "Discharged":
      return "Patient has completed the current treatment episode.";

    case "Closed":
      return "Referral has completed the closed-loop care journey.";

    default:
      return status;
  }
}

/* ========================================================================== */
/* UI Components                                                              */
/* ========================================================================== */

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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-slate-900">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-800 sm:max-w-[65%] sm:text-right">
        {value}
      </p>
    </div>
  );
}

function AllocationCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
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

function SafetyCard({
  title,
  value,
  danger = false,
}: {
  title: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        danger
          ? "border-red-100 bg-red-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-wide ${
          danger
            ? "text-red-700"
            : "text-slate-400"
        }`}
      >
        {title}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          danger
            ? "text-red-900"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function RoutePoint({
  label,
  value,
  completed = false,
  current = false,
}: {
  label: string;
  value: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-teal-700 text-white"
            : current
              ? "border-2 border-teal-600 bg-teal-50 text-teal-700"
              : "border border-slate-300 bg-white text-slate-400"
        }`}
      >
        {completed ? (
          <CheckCircle2 size={15} />
        ) : current ? (
          <Clock3 size={15} />
        ) : (
          <span className="text-[10px]">
            •
          </span>
        )}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 text-sm font-semibold ${
            current
              ? "text-teal-700"
              : "text-slate-800"
          }`}
        >
          {value}
        </p>
      </div>
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
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
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
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}