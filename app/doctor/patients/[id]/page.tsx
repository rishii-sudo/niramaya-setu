"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  TestTube,
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

type PatientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const referralStatusOrder: ReferralStatus[] = [
  "Created",
  "In Transit",
  "Received",
  "Under Treatment",
  "Discharged",
  "Closed",
];

const sectionTabs = [
  "Overview",
  "Medical History",
  "Labs & Diagnostics",
  "Treatment History",
  "Admissions & Surgery",
] as const;

type SectionTab = (typeof sectionTabs)[number];

export default function DoctorPatientPage({
  params,
}: PatientPageProps) {
  const { id } = use(params);

  const patient = getPatient(id);

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-lg font-bold text-red-600">
            !
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Patient not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No doctor workspace record exists for patient ID{" "}
            <span className="font-semibold text-slate-700">
              {id}
            </span>
            .
          </p>

          <Link
            href="/doctor"
            className="mt-6 inline-flex rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Back to Doctor Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return <DoctorPatientWorkspace patient={patient} />;
}

function DoctorPatientWorkspace({
  patient,
}: {
  patient: PatientRecord;
}) {
  const [referralStatus, setReferralStatusLocal] =
    useState<ReferralStatus>(patient.referralStatus);

  const [activeSection, setActiveSection] =
    useState<SectionTab>("Overview");

  const [showDischarge, setShowDischarge] =
    useState(false);

  const [dischargeNote, setDischargeNote] =
    useState("");

  const [hydrated, setHydrated] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Load persisted referral status                                        */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const storedStatus = getReferralStatus(
      patient.referralId,
    );

    setReferralStatusLocal(storedStatus);
    setHydrated(true);
  }, [patient.referralId]);

  function updateReferralStatus(
    status: ReferralStatus,
  ) {
    const nextStatus = setReferralStatus(
      patient.referralId,
      status,
    );

    setReferralStatusLocal(nextStatus);
  }

  const currentStatus = hydrated
    ? referralStatus
    : patient.referralStatus;

  const currentStatusIndex =
    referralStatusOrder.indexOf(currentStatus);

  const currentAction =
    currentStatus === "Created"
      ? "Referral created"
      : currentStatus === "In Transit"
        ? "Awaiting doctor action"
        : currentStatus === "Received"
          ? "Referral accepted"
          : currentStatus === "Under Treatment"
            ? "Treatment in progress"
            : currentStatus === "Discharged"
              ? "Patient discharged"
              : "Referral closed";

  const latestDiagnosis =
    patient.diagnoses[0]?.name ??
    "No diagnosis recorded";

  const pendingDiagnostics =
    patient.diagnostics.filter((item) =>
      item.status.toLowerCase().includes("pending"),
    );

  const canAccept =
    currentStatus === "In Transit" ||
    currentStatus === "Created";

  const canStartTreatment =
    currentStatus === "Received";

  const canContinueTreatment =
    currentStatus === "Under Treatment";

  const canDischarge =
    currentStatus === "Under Treatment";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/doctor/referrals"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Referrals
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck
              size={17}
              className="text-teal-700"
            />
            Clinical workspace
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* ================================================================= */}
        {/* Patient heading                                                    */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              Patient Review
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {patient.name}
              </h1>

              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                {patient.patientId}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {patient.age} years • {patient.gender} • Blood
              Group {patient.bloodGroup}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusPill status={currentStatus} />

            <PriorityPill
              priority={patient.referralPriority}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* Referral Banner                                                    */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
                  Referral
                </span>

                <span className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  #{patient.referralId}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {patient.referralReason}
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                {patient.referralFrom} →{" "}
                {patient.referralTo}
              </p>
            </div>

            <div className="rounded-xl border border-white/80 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400">
                Current doctor action
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {currentAction}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Alerts                                                             */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <AlertCard
            label="Allergy Alert"
            value={
              patient.allergies.length > 0
                ? patient.allergies
                    .map((item) => item.name)
                    .join(", ")
                : "No known allergy recorded"
            }
            description={
              patient.allergies.length > 0
                ? patient.allergies
                    .map(
                      (item) =>
                        `${item.reaction} • ${item.severity}`,
                    )
                    .join(" | ")
                : "No allergy information available."
            }
            className="border-red-100 bg-red-50/70"
            labelClass="text-red-700"
          />

          <AlertCard
            label="Current Diagnosis"
            value={latestDiagnosis}
            description={
              patient.diagnoses[0]?.status ??
              "No active diagnosis information."
            }
            className="border-amber-100 bg-amber-50/70"
            labelClass="text-amber-700"
          />

          <AlertCard
            label={
              pendingDiagnostics.length > 0
                ? "Pending Investigation"
                : "Emergency Contact"
            }
            value={
              pendingDiagnostics.length > 0
                ? pendingDiagnostics[0].test
                : patient.emergencyContact.name
            }
            description={
              pendingDiagnostics.length > 0
                ? pendingDiagnostics[0].result
                : `${patient.emergencyContact.relation} • ${patient.emergencyContact.mobile}`
            }
            className="border-blue-100 bg-blue-50/70"
            labelClass="text-blue-700"
          />
        </div>

        {/* ================================================================= */}
        {/* Section Navigation                                                 */}
        {/* ================================================================= */}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex min-w-max">
            {sectionTabs.map((tab) => {
              const active =
                activeSection === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() =>
                    setActiveSection(tab)
                  }
                  className={`border-b-2 px-4 py-3.5 text-xs font-semibold transition sm:px-5 ${
                    active
                      ? "border-teal-700 text-teal-700"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Main Grid                                                          */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          {/* ================================================================= */}
          {/* LEFT COLUMN                                                       */}
          {/* ================================================================= */}

          <div className="space-y-6">
            {/* ---------------------------------------------------------------- */}
            {/* Overview                                                         */}
            {/* ---------------------------------------------------------------- */}

            {activeSection === "Overview" && (
              <>
                <PatientSummary
                  patient={patient}
                />

                <LatestVitals
                  vitals={patient.vitals}
                />

                <MedicalConditions
                  patient={patient}
                />

                <div className="grid gap-6 xl:grid-cols-2">
                  <CurrentMedications
                    medications={patient.medications}
                  />

                  <LabResults
                    labs={patient.labs}
                  />
                </div>

                <Diagnostics
                  diagnostics={patient.diagnostics}
                />

                <ReferralClinicalNote
                  note={patient.clinicalNote}
                />
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Medical History                                                  */}
            {/* ---------------------------------------------------------------- */}

            {activeSection ===
              "Medical History" && (
              <MedicalHistorySection
                patient={patient}
              />
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Labs & Diagnostics                                               */}
            {/* ---------------------------------------------------------------- */}

            {activeSection ===
              "Labs & Diagnostics" && (
              <>
                <LabResults
                  labs={patient.labs}
                  expanded
                />

                <Diagnostics
                  diagnostics={
                    patient.diagnostics
                  }
                  expanded
                />
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Treatment History                                                */}
            {/* ---------------------------------------------------------------- */}

            {activeSection ===
              "Treatment History" && (
              <TreatmentHistory
                patient={patient}
              />
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Admissions & Surgery                                             */}
            {/* ---------------------------------------------------------------- */}

            {activeSection ===
              "Admissions & Surgery" && (
              <AdmissionsAndSurgery
                patient={patient}
              />
            )}
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN                                                      */}
          {/* ================================================================= */}

          <aside className="space-y-6">
            {/* ---------------------------------------------------------------- */}
            {/* Clinical Actions                                                 */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Clinical Actions
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Update the patient's referral and care journey.
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    updateReferralStatus(
                      "Received",
                    )
                  }
                  disabled={!canAccept}
                  className="flex w-full items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={17} />
                    Accept Referral
                  </span>

                  {currentStatus ===
                    "Received" ||
                  currentStatus ===
                    "Under Treatment" ||
                  currentStatus ===
                    "Discharged" ||
                  currentStatus ===
                    "Closed" ? (
                    <Check size={17} />
                  ) : null}
                </button>

                <Link
                  href={`/doctor/patients/${patient.patientId}/treatment`}
                  onClick={() => {
                    if (
                      canStartTreatment ||
                      canContinueTreatment
                    ) {
                      updateReferralStatus(
                        "Under Treatment",
                      );
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    canStartTreatment ||
                    canContinueTreatment
                      ? "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Activity size={17} />
                    Start / Update Treatment
                  </span>

                  {currentStatus ===
                    "Under Treatment" && (
                    <Check size={17} />
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setShowDischarge(true)
                  }
                  disabled={!canDischarge}
                  className="flex w-full items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={17} />
                    Discharge Patient
                  </span>

                  {currentStatus ===
                    "Discharged" && (
                    <Check size={17} />
                  )}
                </button>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Current referral state
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {currentAction}
                </p>
              </div>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Patient Information                                              */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Patient Information
              </h2>

              <div className="mt-5 space-y-3">
                <InfoRow
                  label="Patient ID"
                  value={patient.patientId}
                />

                <InfoRow
                  label="Mobile"
                  value={patient.mobile}
                />

                <InfoRow
                  label="Aadhaar"
                  value={patient.aadhaar}
                />

                <InfoRow
                  label="ABHA ID"
                  value={patient.abhaId}
                />

                <InfoRow
                  label="Location"
                  value={patient.village}
                />

                <InfoRow
                  label="Blood Group"
                  value={patient.bloodGroup}
                />
              </div>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Medical Records                                                  */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <FileText size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Patient Records
                  </h2>

                  <p className="text-xs text-slate-500">
                    Complete longitudinal medical information.
                  </p>
                </div>
              </div>

              <Link
                href={`/patients/${patient.patientId}/records`}
                className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-slate-50"
              >
                <span>Open Medical Records</span>
                <ArrowRight size={16} />
              </Link>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Referral Journey                                                 */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Referral Journey
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current referral lifecycle status.
              </p>

              <div className="mt-5 space-y-3">
                {referralStatusOrder.map(
                  (status, index) => (
                    <JourneyRow
                      key={status}
                      label={status}
                      done={
                        index <= currentStatusIndex
                      }
                      current={
                        status === currentStatus
                      }
                    />
                  ),
                )}
              </div>

              <Link
                href={`/referrals/${patient.referralId}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-slate-50"
              >
                View Full Referral
                <ArrowRight size={15} />
              </Link>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Emergency                                                        */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-red-100 bg-red-50/60 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 font-bold text-red-700">
                  !
                </div>

                <div>
                  <p className="text-sm font-semibold text-red-900">
                    Emergency Information
                  </p>

                  <p className="mt-1 text-xs text-red-800">
                    {patient.emergencyContact.name} •{" "}
                    {patient.emergencyContact.relation}
                  </p>

                  <p className="mt-1 text-xs text-red-800">
                    {patient.emergencyContact.mobile}
                  </p>
                </div>
              </div>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Consent                                                          */}
            {/* ---------------------------------------------------------------- */}

            <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Consent-based access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Patient information is displayed for the
                    authorized doctor and referral workflow.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ================================================================= */}
        {/* Prototype Notice                                                  */}
        {/* ================================================================= */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs leading-5 text-amber-900">
          <strong>Prototype Notice:</strong>{" "}
          Clinical information shown here is mock data for
          NIRAMAYA-SETU. Production deployment requires
          authenticated access, role-based authorization,
          consent enforcement, secure storage and audit logging.
        </div>
      </section>

      {/* ================================================================== */}
      {/* Discharge Modal                                                     */}
      {/* ================================================================== */}

      {showDischarge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowDischarge(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Clinical Action
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Discharge Patient
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDischarge(false)
                }
                className="rounded-lg px-2 py-1 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Add a discharge note before moving the referral
              to the discharged state.
            </p>

            <label className="mt-5 block">
              <span className="text-xs font-semibold text-slate-600">
                Discharge Note
              </span>

              <textarea
                value={dischargeNote}
                onChange={(event) =>
                  setDischargeNote(
                    event.target.value,
                  )
                }
                rows={6}
                placeholder="Enter discharge summary, medicines, follow-up plan or patient instructions..."
                className="mt-1 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                Discharge checklist
              </p>

              <div className="mt-3 grid gap-2 text-xs text-amber-900 sm:grid-cols-2">
                <p>✓ Diagnosis reviewed</p>
                <p>✓ Medicines reviewed</p>
                <p>✓ Investigations reviewed</p>
                <p>✓ Follow-up confirmed</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowDischarge(false)
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  updateReferralStatus(
                    "Discharged",
                  );
                  setShowDischarge(false);
                }}
                disabled={!dischargeNote.trim()}
                className="rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Discharge
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ========================================================================== */
/* UI Components                                                              */
/* ========================================================================== */

function AlertCard({
  label,
  value,
  description,
  className,
  labelClass,
}: {
  label: string;
  value: string;
  description: string;
  className: string;
  labelClass: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <p
        className={`text-[10px] font-bold uppercase tracking-wide ${labelClass}`}
      >
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function StatusPill({
  status,
}: {
  status: ReferralStatus;
}) {
  const style =
    status === "Under Treatment"
      ? "border-blue-100 bg-blue-50 text-blue-700"
      : status === "Discharged" ||
          status === "Closed"
        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
        : status === "Received"
          ? "border-teal-100 bg-teal-50 text-teal-700"
          : "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

function PriorityPill({
  priority,
}: {
  priority: PatientRecord["referralPriority"];
}) {
  const style =
    priority === "Emergency"
      ? "bg-red-50 text-red-700"
      : priority === "Urgent"
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style}`}
    >
      {priority}
    </span>
  );
}

function PatientSummary({
  patient,
}: {
  patient: PatientRecord;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<UserRound size={19} />}
        title="Patient Summary"
        subtitle="Basic clinical context before consultation"
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Info
          label="Patient ID"
          value={patient.patientId}
        />

        <Info
          label="Age / Gender"
          value={`${patient.age} / ${patient.gender}`}
        />

        <Info
          label="Blood Group"
          value={patient.bloodGroup}
        />

        <Info
          label="Location"
          value={patient.village}
        />
      </div>
    </section>
  );
}

function LatestVitals({
  vitals,
}: {
  vitals: PatientRecord["vitals"];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<HeartPulse size={19} />}
        title="Latest Vitals"
        subtitle="Most recent patient measurements"
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {vitals.map((vital) => (
          <div
            key={vital.label}
            className="rounded-xl bg-slate-50 p-4"
          >
            <p className="text-xs text-slate-500">
              {vital.label}
            </p>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-900">
                {vital.value}
              </span>

              <span className="pb-1 text-xs text-slate-500">
                {vital.unit}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              {vital.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MedicalConditions({
  patient,
}: {
  patient: PatientRecord;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<Stethoscope size={19} />}
        title="Medical Conditions"
        subtitle="Diagnoses, chronic conditions and allergy information"
      />

      <div className="mt-5 space-y-3">
        {patient.diagnoses.map((diagnosis) => (
          <div
            key={`${diagnosis.name}-${diagnosis.date}`}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">
                    {diagnosis.name}
                  </p>

                  {diagnosis.type && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                      {diagnosis.type}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {diagnosis.status}
                </p>
              </div>

              <span className="text-xs text-teal-700">
                {diagnosis.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Chronic Conditions
        </p>

        <div className="space-y-3">
          {patient.chronicConditions.map(
            (condition) => (
              <div
                key={condition.name}
                className="rounded-xl bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {condition.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {condition.status}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400">
                    Since {condition.since}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 font-bold text-red-700">
            !
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-700">
              Allergy Alert
            </p>

            {patient.allergies.length === 0 ? (
              <p className="mt-1 text-sm font-semibold text-red-900">
                No known allergy recorded
              </p>
            ) : (
              patient.allergies.map(
                (allergy) => (
                  <div
                    key={allergy.name}
                    className="mt-1"
                  >
                    <p className="font-semibold text-red-900">
                      {allergy.name}
                    </p>

                    <p className="mt-1 text-xs text-red-700">
                      Reaction:{" "}
                      {allergy.reaction} • Severity:{" "}
                      {allergy.severity}
                    </p>
                  </div>
                ),
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentMedications({
  medications,
}: {
  medications: PatientRecord["medications"];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<Pill size={19} />}
        title="Current Medications"
        subtitle="Latest medication records"
      />

      {medications.length === 0 ? (
        <EmptyState
          title="No current medicines"
          description="No medication has been recorded."
        />
      ) : (
        <div className="mt-5 space-y-3">
          {medications.map((medicine) => (
            <div
              key={medicine.name}
              className="rounded-xl bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {medicine.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {medicine.dose} •{" "}
                    {medicine.route ??
                      "Route not recorded"}
                  </p>
                </div>

                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700">
                  Active
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <DetailBox
                  label="Frequency"
                  value={medicine.frequency}
                />

                <DetailBox
                  label="Duration"
                  value={
                    medicine.duration ??
                    "Not recorded"
                  }
                />

                <DetailBox
                  label="Instructions"
                  value={
                    medicine.instructions ??
                    "Not recorded"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function LabResults({
  labs,
  expanded = false,
}: {
  labs: PatientRecord["labs"];
  expanded?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<TestTube size={19} />}
        title="Laboratory Results"
        subtitle={
          expanded
            ? "Detailed laboratory investigation records"
            : "Latest available investigations"
        }
      />

      {labs.length === 0 ? (
        <EmptyState
          title="No laboratory reports"
          description="No laboratory information is available."
        />
      ) : (
        <div className="mt-5 space-y-3">
          {labs.map((lab) => (
            <div
              key={`${lab.test}-${lab.date}`}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {lab.test}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {lab.date}
                  </p>
                </div>

                <StatusBadge
                  status={lab.status}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <DetailBox
                  label="Result"
                  value={`${lab.result}${
                    lab.unit
                      ? ` ${lab.unit}`
                      : ""
                  }`}
                />

                <DetailBox
                  label="Reference"
                  value={
                    lab.reference ??
                    "Not recorded"
                  }
                />

                <DetailBox
                  label="Status"
                  value={lab.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Diagnostics({
  diagnostics,
  expanded = false,
}: {
  diagnostics: PatientRecord["diagnostics"];
  expanded?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<Activity size={19} />}
        title="Imaging & Diagnostics"
        subtitle={
          expanded
            ? "ECG, X-Ray and other diagnostic information"
            : "Recent diagnostic studies"
        }
      />

      {diagnostics.length === 0 ? (
        <EmptyState
          title="No diagnostics available"
          description="No imaging or diagnostic report is available."
        />
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {diagnostics.map((item) => (
            <div
              key={`${item.test}-${item.date}`}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.test}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.type} • {item.date}
                  </p>
                </div>

                <StatusBadge
                  status={item.status}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {item.result}
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function MedicalHistorySection({
  patient,
}: {
  patient: PatientRecord;
}) {
  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={<Stethoscope size={19} />}
          title="Medical History"
          subtitle="Previous conditions and historical clinical information"
        />

        <div className="mt-5 space-y-3">
          {patient.medicalHistory.length === 0 ? (
            <EmptyState
              title="No history recorded"
              description="No previous medical history is available."
            />
          ) : (
            patient.medicalHistory.map(
              (item) => (
                <div
                  key={`${item.condition}-${item.date}`}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.condition}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.details}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold text-red-900">
          Allergy & Safety Information
        </h2>

        <div className="mt-4 space-y-3">
          {patient.allergies.length === 0 ? (
            <div className="rounded-xl bg-white/70 p-4">
              <p className="text-sm font-semibold text-red-900">
                No known allergy recorded
              </p>
            </div>
          ) : (
            patient.allergies.map(
              (allergy) => (
                <div
                  key={allergy.name}
                  className="rounded-xl border border-red-200 bg-white/70 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-red-900">
                      {allergy.name}
                    </p>

                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold text-red-700">
                      {allergy.severity}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-red-700">
                    Reaction: {allergy.reaction}
                  </p>
                </div>
              ),
            )
          )}
        </div>
      </section>
    </>
  );
}

function TreatmentHistory({
  patient,
}: {
  patient: PatientRecord;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<Activity size={19} />}
        title="Treatment History"
        subtitle="Clinical events related to the current care episode"
      />

      <div className="mt-5 space-y-5">
        <TimelineItem
          date="15 Aug 2026"
          title="Previous Follow-up"
          description="Hypertension monitoring recorded."
          tag="Follow-up"
        />

        <TimelineItem
          date="20 Aug 2026"
          title="Recurrent Headache"
          description="Headache symptoms reported during previous assessment."
          tag="History"
        />

        <TimelineItem
          date="28 Aug 2026"
          title="Latest Laboratory Review"
          description={`${patient.labs.length} laboratory results available.`}
          tag="Lab"
        />

        <TimelineItem
          date="Current"
          title={patient.referralReason}
          description="Current referral is available for specialist clinical review."
          tag="Referral"
          last
        />
      </div>
    </section>
  );
}

function AdmissionsAndSurgery({
  patient,
}: {
  patient: PatientRecord;
}) {
  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={<FileText size={19} />}
          title="Hospital Admissions"
          subtitle="Admission, ward and discharge history"
        />

        <div className="mt-5 space-y-4">
          {patient.admissions.length === 0 ? (
            <EmptyState
              title="No admission recorded"
              description="No hospital admission is available in the current record."
            />
          ) : (
            patient.admissions.map(
              (admission) => (
                <div
                  key={admission.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {admission.facility}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {admission.id} •{" "}
                        {admission.ward}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      Recorded
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <DetailBox
                      label="Admission Date"
                      value={
                        admission.admissionDate
                      }
                    />

                    <DetailBox
                      label="Discharge Date"
                      value={
                        admission.dischargeDate
                      }
                    />

                    <DetailBox
                      label="Reason"
                      value={admission.reason}
                    />

                    <DetailBox
                      label="Outcome"
                      value={admission.outcome}
                    />
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={<HeartPulse size={19} />}
          title="Surgeries & Procedures"
          subtitle="Operative and procedural history"
        />

        <div className="mt-5 space-y-4">
          {patient.surgeries.length === 0 ? (
            <EmptyState
              title="No surgery recorded"
              description="No operative history is available."
            />
          ) : (
            patient.surgeries.map(
              (surgery) => (
                <div
                  key={surgery.procedure}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {surgery.procedure}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <DetailBox
                      label="Date"
                      value={surgery.date}
                    />

                    <DetailBox
                      label="Hospital"
                      value={surgery.hospital}
                    />

                    <DetailBox
                      label="Surgeon"
                      value={surgery.surgeon}
                    />

                    <DetailBox
                      label="Anesthesia"
                      value={surgery.anesthesia}
                    />

                    <DetailBox
                      label="Indication"
                      value={surgery.indication}
                    />

                    <DetailBox
                      label="Outcome"
                      value={surgery.outcome}
                    />
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </section>
    </>
  );
}

function ReferralClinicalNote({
  note,
}: {
  note: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={<FileText size={19} />}
        title="Referral Clinical Note"
        subtitle="Information provided by the referring facility"
      />

      <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        {note}
      </p>
    </section>
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

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`max-w-[65%] text-right text-xs font-semibold ${
          danger
            ? "text-red-700"
            : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  const classes =
    normalized.includes("normal") ||
    normalized.includes("reviewed")
      ? "bg-emerald-50 text-emerald-700"
      : normalized.includes("pending")
        ? "bg-blue-50 text-blue-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function JourneyRow({
  label,
  done,
  current,
}: {
  label: ReferralStatus;
  done: boolean;
  current: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          done
            ? "bg-teal-700 text-white"
            : "border border-slate-300 bg-white text-slate-400"
        }`}
      >
        {done ? (
          <Check size={14} />
        ) : (
          <Clock3 size={13} />
        )}
      </div>

      <p
        className={`text-sm ${
          current
            ? "font-bold text-teal-700"
            : done
              ? "font-medium text-slate-800"
              : "font-medium text-slate-400"
        }`}
      >
        {label}
      </p>

      {current && (
        <span className="ml-auto rounded-full bg-teal-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-teal-700">
          Current
        </span>
      )}
    </div>
  );
}

function TimelineItem({
  date,
  title,
  description,
  tag,
  last = false,
}: {
  date: string;
  title: string;
  description: string;
  tag: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div className="absolute left-[7px] top-5 h-full w-px bg-slate-200" />
      )}

      <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-teal-100 bg-teal-600" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-teal-700">
            {date}
          </span>

          <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
            {tag}
          </span>
        </div>

        <p className="mt-1 text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
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
    <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}