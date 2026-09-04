"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Check,
  CheckCircle2,
  FileText,
  HeartPulse,
  Pill,
  Save,
  ShieldCheck,
  Stethoscope,
  TestTube,
} from "lucide-react";

import {
  getPatient,
  type Medication,
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

type Diagnosis = {
  name: string;
  type: string;
  notes: string;
};

type Investigation = {
  name: string;
  type: "Lab" | "Imaging" | "ECG";
  priority: "Routine" | "Urgent";
};

type TreatmentMedicine = {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  instructions: string;
};

const steps = [
  "Assessment",
  "Diagnosis",
  "Investigations",
  "Medicines",
  "Procedures",
  "Notes",
  "Follow-up",
  "Discharge",
] as const;

type TreatmentStep = (typeof steps)[number];

export default function TreatmentPage({ params }: Props) {
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
            No treatment record exists for patient ID{" "}
            <span className="font-semibold text-slate-700">{id}</span>.
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

  return <TreatmentWorkspace patient={patient} />;
}

function TreatmentWorkspace({
  patient,
}: {
  patient: PatientRecord;
}) {
  const router = useRouter();
  const [activeStep, setActiveStep] =
    useState<TreatmentStep>("Assessment");

  const [referralStatus, setReferralStatusLocal] =
    useState<ReferralStatus>(patient.referralStatus);

  const [statusLoaded, setStatusLoaded] = useState(false);

  const [symptoms, setSymptoms] = useState(
    buildInitialSymptoms(patient),
  );

  const [clinicalAssessment, setClinicalAssessment] = useState(
    buildInitialAssessment(patient),
  );

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(
    buildInitialDiagnoses(patient),
  );

  const [investigations, setInvestigations] = useState<
    Investigation[]
  >(buildInitialInvestigations(patient));

  const [medicines, setMedicines] = useState<TreatmentMedicine[]>(
    buildInitialMedicines(patient),
  );

  const [procedureType, setProcedureType] =
    useState("No procedure");

  const [procedureName, setProcedureName] = useState("");

  const [procedureNotes, setProcedureNotes] = useState("");

  const [clinicalNotes, setClinicalNotes] = useState(
    patient.clinicalNote,
  );

  const [followUpDate, setFollowUpDate] =
    useState("2026-09-15");

  const [followUpInstructions, setFollowUpInstructions] =
    useState(
      "Review blood pressure log, medication tolerance and pending investigation results.",
    );

  const [dischargeCondition, setDischargeCondition] =
    useState("Stable");

  const [dischargeAdvice, setDischargeAdvice] = useState(
    "Continue prescribed medicines, monitor blood pressure and return for scheduled follow-up.",
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const currentStatus = getReferralStatus(
      patient.referralId,
    );

    setReferralStatusLocal(currentStatus);
    setStatusLoaded(true);
  }, [patient.referralId]);

  function updateReferralStatus(status: ReferralStatus) {
    const nextStatus = setReferralStatus(
      patient.referralId,
      status,
    );

    setReferralStatusLocal(nextStatus);
  }

  const currentStepIndex = steps.indexOf(activeStep);

  const canGoBack = currentStepIndex > 0;

  const canGoForward =
    currentStepIndex < steps.length - 1;

  const pendingLabs = patient.labs.filter((lab) =>
    lab.status.toLowerCase().includes("pending"),
  );

  const pendingDiagnostics = patient.diagnostics.filter((item) =>
    item.status.toLowerCase().includes("pending"),
  );

  const visibleReferralStatus = statusLoaded
    ? referralStatus
    : patient.referralStatus;

  function goNext() {
    if (!canGoForward) {
      return;
    }

    const nextStep = steps[currentStepIndex + 1];

    setActiveStep(nextStep);

    if (
      visibleReferralStatus === "Received" &&
      nextStep === "Diagnosis"
    ) {
      updateReferralStatus("Under Treatment");
    }
  }

  function goBack() {
    if (!canGoBack) {
      return;
    }

    setActiveStep(
      steps[currentStepIndex - 1],
    );
  }

  function addDiagnosis() {
    setDiagnoses((current) => [
      ...current,
      {
        name: "",
        type: "Secondary",
        notes: "",
      },
    ]);
  }

  function addInvestigation() {
    setInvestigations((current) => [
      ...current,
      {
        name: "",
        type: "Lab",
        priority: "Routine",
      },
    ]);
  }

  function addMedicine() {
    setMedicines((current) => [
      ...current,
      {
        name: "",
        dose: "",
        route: "Oral",
        frequency: "Once daily",
        duration: "7 days",
        instructions: "",
      },
    ]);
  }

  function saveTreatment() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function completeTreatment() {
    updateReferralStatus("Discharged");

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Contextual Navigation Bar */}
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <span className="text-slate-300">|</span>

            <Link
              href="/doctor/referrals"
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Referrals
            </Link>

            <span className="text-slate-400">/</span>

            <Link
              href={`/doctor/patients/${patient.patientId}`}
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Patient Review ({patient.name})
            </Link>

            <span className="text-slate-400">/</span>

            <span className="font-semibold text-slate-900">Treatment Plan</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/doctor/referrals"
              className="inline-flex items-center gap-1 rounded-lg border border-teal-100 bg-teal-50/70 px-2.5 py-1 text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
            >
              ← Back to Referrals
            </Link>
            <Link
              href={`/doctor/patients/${patient.patientId}`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to Patient
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Patient Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                  Treatment Workspace
                </span>

                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  {patient.referralId}
                </span>

                <StatusPill status={visibleReferralStatus} />
              </div>

              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                {patient.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {patient.patientId} • {patient.age} years •{" "}
                {patient.gender} • Blood Group {patient.bloodGroup}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {patient.referralFrom} → {patient.referralTo} •{" "}
                {patient.referralReason}
              </p>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-wide text-red-700">
                Allergy Alert
              </div>

              <div className="mt-1 text-sm font-bold text-red-900">
                {patient.allergies.length > 0
                  ? patient.allergies
                      .map((item) => item.name)
                      .join(", ")
                  : "No known allergy recorded"}
              </div>

              {patient.allergies.length > 0 && (
                <p className="mt-1 text-[10px] text-red-700">
                  {patient.allergies
                    .map(
                      (item) =>
                        `${item.reaction} • ${item.severity}`,
                    )
                    .join(" | ")}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Referral Status */}
        <section className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Referral Lifecycle
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {getStatusDescription(
                  visibleReferralStatus,
                )}
              </p>
            </div>

            <StatusPill
              status={visibleReferralStatus}
            />
          </div>
        </section>

        {/* Treatment Stepper */}
        <section className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex min-w-max">
            {steps.map((step, index) => {
              const active =
                activeStep === step;

              const completed =
                currentStepIndex > index;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() =>
                    setActiveStep(step)
                  }
                  className={`flex items-center gap-2 border-b-2 px-4 py-4 text-xs font-bold transition sm:px-5 ${
                    active
                      ? "border-teal-700 text-teal-700"
                      : completed
                        ? "border-transparent text-slate-700"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      active
                        ? "bg-teal-700 text-white"
                        : completed
                          ? "bg-teal-100 text-teal-700"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {completed ? (
                      <Check size={13} />
                    ) : (
                      index + 1
                    )}
                  </span>

                  {step}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Layout */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
          {/* LEFT */}
          <section className="space-y-6">
            {/* Assessment */}
            {activeStep === "Assessment" && (
              <>
                <Section
                  icon={<Stethoscope size={19} />}
                  title="Clinical Assessment"
                  subtitle="Record presenting complaints and clinical observations."
                >
                  <Field
                    label="Presenting Symptoms"
                    value={symptoms}
                    onChange={setSymptoms}
                    textarea
                    rows={5}
                    placeholder="Enter the patient's presenting complaints..."
                  />

                  <div className="mt-4">
                    <Field
                      label="Clinical Assessment"
                      value={clinicalAssessment}
                      onChange={setClinicalAssessment}
                      textarea
                      rows={6}
                      placeholder="Enter findings from clinical examination..."
                    />
                  </div>
                </Section>

                <Section
                  icon={<HeartPulse size={19} />}
                  title="Latest Vitals"
                  subtitle="Most recent measurements available before treatment."
                >
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {patient.vitals.map((vital) => (
                      <div
                        key={vital.label}
                        className="rounded-xl bg-slate-50 p-4"
                      >
                        <p className="text-xs text-slate-500">
                          {vital.label}
                        </p>

                        <div className="mt-2 flex items-end gap-1">
                          <p className="text-2xl font-bold text-slate-900">
                            {vital.value}
                          </p>

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
                </Section>

                <Section
                  icon={<ShieldCheck size={19} />}
                  title="Safety Check"
                  subtitle="Important information before treatment decisions."
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <SafetyCard
                      label="Blood Group"
                      value={patient.bloodGroup}
                    />

                    <SafetyCard
                      label="Allergies"
                      value={
                        patient.allergies.length
                          ? patient.allergies
                              .map(
                                (item) =>
                                  item.name,
                              )
                              .join(", ")
                          : "None recorded"
                      }
                      danger={
                        patient.allergies.length > 0
                      }
                    />

                    <SafetyCard
                      label="Chronic Conditions"
                      value={
                        patient.chronicConditions
                          .map(
                            (item) =>
                              item.name,
                          )
                          .join(", ") ||
                        "None recorded"
                      }
                    />
                  </div>
                </Section>
              </>
            )}

            {/* Diagnosis */}
            {activeStep === "Diagnosis" && (
              <Section
                icon={<Stethoscope size={19} />}
                title="Diagnosis"
                subtitle="Record primary, secondary or suspected diagnoses."
                action={
                  <button
                    type="button"
                    onClick={addDiagnosis}
                    className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
                  >
                    + Add Diagnosis
                  </button>
                }
              >
                <div className="space-y-4">
                  {diagnoses.map(
                    (diagnosis, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field
                            label="Diagnosis"
                            value={diagnosis.name}
                            onChange={(value) => {
                              setDiagnoses(
                                (current) =>
                                  current.map(
                                    (item, i) =>
                                      i === index
                                        ? {
                                            ...item,
                                            name: value,
                                          }
                                        : item,
                                  ),
                              );
                            }}
                            placeholder="e.g. Hypertension"
                          />

                          <SelectField
                            label="Diagnosis Type"
                            value={diagnosis.type}
                            options={[
                              "Primary",
                              "Secondary",
                              "Suspected",
                              "Chronic",
                            ]}
                            onChange={(value) => {
                              setDiagnoses(
                                (current) =>
                                  current.map(
                                    (item, i) =>
                                      i === index
                                        ? {
                                            ...item,
                                            type: value,
                                          }
                                        : item,
                                  ),
                              );
                            }}
                          />
                        </div>

                        <div className="mt-4">
                          <Field
                            label="Clinical Notes"
                            value={diagnosis.notes}
                            onChange={(value) => {
                              setDiagnoses(
                                (current) =>
                                  current.map(
                                    (item, i) =>
                                      i === index
                                        ? {
                                            ...item,
                                            notes: value,
                                          }
                                        : item,
                                  ),
                              );
                            }}
                            textarea
                            rows={4}
                            placeholder="Add diagnostic reasoning or notes..."
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </Section>
            )}

            {/* Investigations */}
            {activeStep === "Investigations" && (
              <>
                <Section
                  icon={<TestTube size={19} />}
                  title="Investigations"
                  subtitle="Order laboratory tests and diagnostic studies."
                  action={
                    <button
                      type="button"
                      onClick={addInvestigation}
                      className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
                    >
                      + Add Investigation
                    </button>
                  }
                >
                  <div className="space-y-4">
                    {investigations.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-200 p-4"
                        >
                          <div className="grid gap-4 md:grid-cols-3">
                            <Field
                              label="Investigation"
                              value={item.name}
                              onChange={(value) => {
                                setInvestigations(
                                  (current) =>
                                    current.map(
                                      (row, i) =>
                                        i === index
                                          ? {
                                              ...row,
                                              name: value,
                                            }
                                          : row,
                                    ),
                                );
                              }}
                              placeholder="e.g. CBC"
                            />

                            <SelectField
                              label="Type"
                              value={item.type}
                              options={[
                                "Lab",
                                "Imaging",
                                "ECG",
                              ]}
                              onChange={(value) => {
                                setInvestigations(
                                  (current) =>
                                    current.map(
                                      (row, i) =>
                                        i === index
                                          ? {
                                              ...row,
                                              type:
                                                value as Investigation["type"],
                                            }
                                          : row,
                                    ),
                                );
                              }}
                            />

                            <SelectField
                              label="Priority"
                              value={item.priority}
                              options={[
                                "Routine",
                                "Urgent",
                              ]}
                              onChange={(value) => {
                                setInvestigations(
                                  (current) =>
                                    current.map(
                                      (row, i) =>
                                        i === index
                                          ? {
                                              ...row,
                                              priority:
                                                value as Investigation["priority"],
                                            }
                                          : row,
                                    ),
                                );
                              }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </Section>

                <Section
                  icon={<TestTube size={19} />}
                  title="Previous Laboratory Results"
                  subtitle="Existing results available for clinical review."
                >
                  {patient.labs.length === 0 ? (
                    <EmptyState
                      title="No laboratory reports"
                      description="No laboratory information is available."
                    />
                  ) : (
                    <div className="space-y-3">
                      {patient.labs.map((lab) => (
                        <div
                          key={`${lab.test}-${lab.date}`}
                          className="rounded-xl bg-slate-50 p-4"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {lab.test}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {lab.result}
                                {lab.unit
                                  ? ` ${lab.unit}`
                                  : ""}
                                {" • "}
                                {lab.date}
                              </p>
                            </div>

                            <StatusBadge
                              status={lab.status}
                            />
                          </div>

                          <div className="mt-3">
                            <DetailBox
                              label="Reference Range"
                              value={
                                lab.reference ??
                                "Not recorded"
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {pendingLabs.length > 0 && (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                        Pending Lab Investigations
                      </p>

                      <p className="mt-1 text-sm font-semibold text-blue-900">
                        {pendingLabs
                          .map(
                            (item) =>
                              item.test,
                          )
                          .join(", ")}
                      </p>
                    </div>
                  )}

                  {pendingDiagnostics.length > 0 && (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                        Pending Diagnostics
                      </p>

                      <p className="mt-1 text-sm font-semibold text-blue-900">
                        {pendingDiagnostics
                          .map(
                            (item) =>
                              item.test,
                          )
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </Section>
              </>
            )}

            {/* Medicines */}
            {activeStep === "Medicines" && (
              <>
                <Section
                  icon={<Pill size={19} />}
                  title="Medication Plan"
                  subtitle="Create or update medicines for the current treatment."
                  action={
                    <button
                      type="button"
                      onClick={addMedicine}
                      className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
                    >
                      + Add Medicine
                    </button>
                  }
                >
                  {medicines.length === 0 ? (
                    <EmptyState
                      title="No new medicines"
                      description="Add a medicine to create the treatment plan."
                    />
                  ) : (
                    <div className="space-y-4">
                      {medicines.map(
                        (medicine, index) => (
                          <MedicineEditor
                            key={index}
                            medicine={medicine}
                            onChange={(key, value) => {
                              setMedicines(
                                (current) =>
                                  current.map(
                                    (item, i) =>
                                      i === index
                                        ? {
                                            ...item,
                                            [key]: value,
                                          }
                                        : item,
                                  ),
                              );
                            }}
                          />
                        ),
                      )}
                    </div>
                  )}
                </Section>

                <Section
                  icon={<Pill size={19} />}
                  title="Existing Medicines"
                  subtitle="Current medications from the patient record."
                >
                  <div className="space-y-3">
                    {patient.medications.map(
                      (medicine) => (
                        <ExistingMedicine
                          key={medicine.name}
                          medicine={medicine}
                        />
                      ),
                    )}
                  </div>
                </Section>
              </>
            )}

            {/* Procedures */}
            {activeStep === "Procedures" && (
              <Section
                icon={<Activity size={19} />}
                title="Procedures & Surgery"
                subtitle="Record a procedure or operative plan."
              >
                <SelectField
                  label="Procedure Status"
                  value={procedureType}
                  options={[
                    "No procedure",
                    "Minor procedure",
                    "Major procedure",
                    "Surgery planned",
                    "Surgery completed",
                  ]}
                  onChange={setProcedureType}
                />

                {procedureType !== "No procedure" && (
                  <>
                    <div className="mt-4">
                      <Field
                        label="Procedure / Surgery Name"
                        value={procedureName}
                        onChange={setProcedureName}
                        placeholder="Enter procedure name"
                      />
                    </div>

                    <div className="mt-4">
                      <Field
                        label="Procedure Notes"
                        value={procedureNotes}
                        onChange={setProcedureNotes}
                        textarea
                        rows={6}
                        placeholder="Indication, findings, operative notes, outcome..."
                      />
                    </div>
                  </>
                )}

                {procedureType === "No procedure" && (
                  <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-800">
                      No procedure currently planned.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Continue medical management and follow-up.
                    </p>
                  </div>
                )}

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Previous Surgical History
                  </p>

                  {patient.surgeries.map(
                    (surgery) => (
                      <div
                        key={surgery.procedure}
                        className="rounded-xl bg-slate-50 p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {surgery.procedure}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {surgery.outcome}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </Section>
            )}

            {/* Notes */}
            {activeStep === "Notes" && (
              <Section
                icon={<FileText size={19} />}
                title="Clinical Notes"
                subtitle="Document clinical findings, decisions and treatment response."
              >
                <Field
                  label="Doctor Notes"
                  value={clinicalNotes}
                  onChange={setClinicalNotes}
                  textarea
                  rows={12}
                  placeholder="Enter clinical findings, treatment response, precautions, referrals or other notes..."
                />

                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Referral Note
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {patient.clinicalNote}
                  </p>
                </div>
              </Section>
            )}

            {/* Follow-up */}
            {activeStep === "Follow-up" && (
              <Section
                icon={<Activity size={19} />}
                title="Follow-up Plan"
                subtitle="Define the next review and patient instructions."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Follow-up Date"
                    value={followUpDate}
                    onChange={setFollowUpDate}
                    type="date"
                  />

                  <Field
                    label="Department"
                    value={extractDepartment(
                      patient.referralReason,
                    )}
                    onChange={() => {}}
                    disabled
                  />
                </div>

                <div className="mt-4">
                  <Field
                    label="Follow-up Instructions"
                    value={followUpInstructions}
                    onChange={setFollowUpInstructions}
                    textarea
                    rows={7}
                  />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <FollowupCard
                    title="Pending Diagnostics"
                    value={
                      pendingDiagnostics.length
                        ? pendingDiagnostics
                            .map(
                              (item) =>
                                item.test,
                            )
                            .join(", ")
                        : "None"
                    }
                  />

                  <FollowupCard
                    title="Current Diagnosis"
                    value={
                      patient.diagnoses[0]?.name ??
                      "Not recorded"
                    }
                  />
                </div>
              </Section>
            )}

            {/* Discharge */}
            {activeStep === "Discharge" && (
              <Section
                icon={<FileText size={19} />}
                title="Discharge Summary"
                subtitle="Prepare the patient's discharge information."
              >
                <SelectField
                  label="Patient Condition"
                  value={dischargeCondition}
                  options={[
                    "Stable",
                    "Improving",
                    "Needs continued observation",
                    "Referred to another facility",
                  ]}
                  onChange={setDischargeCondition}
                />

                <div className="mt-4">
                  <Field
                    label="Discharge Advice"
                    value={dischargeAdvice}
                    onChange={setDischargeAdvice}
                    textarea
                    rows={8}
                  />
                </div>

                <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                    Before discharge
                  </p>

                  <div className="mt-3 grid gap-2 text-xs text-amber-900 sm:grid-cols-2">
                    <p>✓ Diagnosis reviewed</p>
                    <p>✓ Medicines reviewed</p>
                    <p>✓ Investigations reviewed</p>
                    <p>✓ Follow-up confirmed</p>
                    <p>✓ Patient condition recorded</p>
                    <p>✓ Instructions prepared</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-sm font-semibold text-teal-900">
                    Current referral state
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    {visibleReferralStatus}
                  </p>
                </div>
              </Section>
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={!canGoBack}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={saveTreatment}
                  className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  <Save size={16} />
                  Save Draft
                </button>

                {activeStep === "Discharge" ? (
                  <button
                    type="button"
                    onClick={completeTreatment}
                    className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    <CheckCircle2 size={16} />
                    Complete Treatment
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoForward}
                    className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>

            {saved && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 size={17} />
                  {activeStep === "Discharge"
                    ? "Treatment completed and referral marked as discharged."
                    : "Treatment draft saved successfully."}
                </div>

                <p className="mt-1 text-xs text-emerald-700">
                  Demo-only state. Production data should be persisted through the secured backend.
                </p>
              </div>
            )}
          </section>

          {/* RIGHT */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Current Patient Snapshot
              </h2>

              <div className="mt-5 space-y-3">
                <InfoRow
                  label="Patient ID"
                  value={patient.patientId}
                />

                <InfoRow
                  label="Age / Gender"
                  value={`${patient.age} / ${patient.gender}`}
                />

                <InfoRow
                  label="Blood Group"
                  value={patient.bloodGroup}
                />

                <InfoRow
                  label="Allergy"
                  value={
                    patient.allergies.length
                      ? patient.allergies
                          .map(
                            (item) => item.name,
                          )
                          .join(", ")
                      : "None recorded"
                  }
                  danger={
                    patient.allergies.length > 0
                  }
                />

                <InfoRow
                  label="Referral"
                  value={patient.referralId}
                />

                <InfoRow
                  label="Status"
                  value={visibleReferralStatus}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Pill size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Current Medicines
                  </h2>

                  <p className="text-xs text-slate-500">
                    From patient record
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {patient.medications.length === 0 ? (
                  <EmptyState
                    title="No medicines recorded"
                    description="No current medication is available."
                  />
                ) : (
                  patient.medications.map(
                    (medicine) => (
                      <ExistingMedicine
                        key={medicine.name}
                        medicine={medicine}
                      />
                    ),
                  )
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <TestTube size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Latest Investigations
                  </h2>

                  <p className="text-xs text-slate-500">
                    Recent available results
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {patient.labs.slice(0, 3).map((lab) => (
                  <div
                    key={`${lab.test}-${lab.date}`}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {lab.test}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {lab.result}
                          {lab.unit
                            ? ` ${lab.unit}`
                            : ""}
                        </p>
                      </div>

                      <StatusBadge
                        status={lab.status}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-semibold text-slate-900">
                Referral Status
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Created",
                  "In Transit",
                  "Received",
                  "Under Treatment",
                  "Discharged",
                  "Closed",
                ].map((status, index) => {
                  const typedStatus =
                    status as ReferralStatus;

                  const currentIndex = [
                    "Created",
                    "In Transit",
                    "Received",
                    "Under Treatment",
                    "Discharged",
                    "Closed",
                  ].indexOf(visibleReferralStatus);

                  const done =
                    index <= currentIndex;

                  return (
                    <div
                      key={status}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${
                          done
                            ? "bg-teal-700 text-white"
                            : "border border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        {done ? (
                          <Check size={14} />
                        ) : (
                          <span className="text-[10px]">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-sm ${
                          visibleReferralStatus ===
                          typedStatus
                            ? "font-bold text-teal-700"
                            : done
                              ? "text-slate-700"
                              : "text-slate-400"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="text-sm font-semibold text-teal-900">
                    Consent-based clinical access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Clinical information is displayed for the authorized treatment workflow.
                  </p>
                </div>
              </div>
            </section>

            {/* Prototype note */}
            <p className="mt-4 text-center text-[11px] text-slate-400">
              Treatment workspace demonstration data • Authenticated clinical workflows planned
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ========================================================================== */
/* Helpers                                                                    */
/* ========================================================================== */

function buildInitialSymptoms(
  patient: PatientRecord,
) {
  if (patient.patientId === "NS-10284") {
    return "Persistent headache and intermittent dizziness for approximately 6 days.";
  }

  return `Patient referred for ${patient.referralReason.toLowerCase()}.`;
}

function buildInitialAssessment(
  patient: PatientRecord,
) {
  const bp = patient.vitals.find((vital) =>
    vital.label
      .toLowerCase()
      .includes("blood pressure"),
  );

  const bpText = bp
    ? ` Blood pressure recorded at ${bp.value} ${bp.unit}.`
    : "";

  return `Patient reviewed following referral for ${patient.referralReason.toLowerCase()}.${bpText}`;
}

function buildInitialDiagnoses(
  patient: PatientRecord,
): Diagnosis[] {
  return patient.diagnoses
    .slice(0, 2)
    .map((diagnosis) => ({
      name: diagnosis.name,
      type:
        diagnosis.type ?? "Secondary",
      notes: diagnosis.status,
    }));
}

function buildInitialInvestigations(
  patient: PatientRecord,
): Investigation[] {
  const result: Investigation[] = [];

  if (patient.labs[0]) {
    result.push({
      name: `Review ${patient.labs[0].test}`,
      type: "Lab",
      priority: "Routine",
    });
  }

  if (patient.diagnostics[0]) {
    result.push({
      name: patient.diagnostics[0].test,
      type:
        patient.diagnostics[0].type === "ECG"
          ? "ECG"
          : "Imaging",
      priority: patient.diagnostics[0].status
        .toLowerCase()
        .includes("pending")
        ? "Urgent"
        : "Routine",
    });
  }

  if (result.length === 0) {
    result.push({
      name: "",
      type: "Lab",
      priority: "Routine",
    });
  }

  return result;
}

function buildInitialMedicines(
  patient: PatientRecord,
): TreatmentMedicine[] {
  return patient.medications
    .map((medicine) => ({
      name: medicine.name,
      dose: medicine.dose,
      route:
        medicine.route ?? "Oral",
      frequency: medicine.frequency,
      duration:
        medicine.duration ?? "7 days",
      instructions:
        medicine.instructions ?? "",
    }))
    .slice(0, 2);
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

function getStatusDescription(
  status: ReferralStatus,
) {
  switch (status) {
    case "Created":
      return "Referral created and awaiting transit.";

    case "In Transit":
      return "Patient is in transit to the receiving facility.";

    case "Received":
      return "Referral has been accepted by the receiving doctor.";

    case "Under Treatment":
      return "Patient is currently under treatment.";

    case "Discharged":
      return "Patient has been discharged from the current care episode.";

    case "Closed":
      return "Referral and follow-up episode has been closed.";

    default:
      return status;
  }
}

/* ========================================================================== */
/* UI Components                                                              */
/* ========================================================================== */

function StatusPill({
  status,
}: {
  status: ReferralStatus;
}) {
  const classes =
    status === "Under Treatment"
      ? "border-blue-100 bg-blue-50 text-blue-700"
      : status === "Discharged" ||
          status === "Closed"
        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
        : status === "Received"
          ? "border-teal-100 bg-teal-50 text-teal-700"
          : status === "In Transit"
            ? "border-indigo-100 bg-indigo-50 text-indigo-700"
            : "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${classes}`}
    >
      {status}
    </span>
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

function Section({
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            {icon}
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {action}
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  rows = 4,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  type?: string;
  disabled?: boolean;
}) {
  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">
        {label}
      </span>

      {textarea ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={inputClass}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function MedicineEditor({
  medicine,
  onChange,
}: {
  medicine: TreatmentMedicine;
  onChange: (
    key: keyof TreatmentMedicine,
    value: string,
  ) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Medicine"
          value={medicine.name}
          onChange={(value) =>
            onChange("name", value)
          }
          placeholder="Medicine name"
        />

        <Field
          label="Dose"
          value={medicine.dose}
          onChange={(value) =>
            onChange("dose", value)
          }
          placeholder="e.g. 5 mg"
        />

        <SelectField
          label="Route"
          value={medicine.route}
          options={[
            "Oral",
            "IV",
            "IM",
            "Topical",
            "Inhalation",
          ]}
          onChange={(value) =>
            onChange("route", value)
          }
        />

        <SelectField
          label="Frequency"
          value={medicine.frequency}
          options={[
            "Once daily",
            "Twice daily",
            "Three times daily",
            "Four times daily",
            "As needed",
          ]}
          onChange={(value) =>
            onChange("frequency", value)
          }
        />

        <Field
          label="Duration"
          value={medicine.duration}
          onChange={(value) =>
            onChange("duration", value)
          }
          placeholder="e.g. 7 days"
        />

        <Field
          label="Instructions"
          value={medicine.instructions}
          onChange={(value) =>
            onChange("instructions", value)
          }
          placeholder="Patient instructions"
        />
      </div>
    </div>
  );
}

function ExistingMedicine({
  medicine,
}: {
  medicine: Medication;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
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
          Current
        </span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
      </div>
    </div>
  );
}

function SafetyCard({
  label,
  value,
  danger = false,
}: {
  label: string;
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
        {label}
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

function FollowupCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
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
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}