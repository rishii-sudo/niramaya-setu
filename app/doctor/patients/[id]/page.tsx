"use client";

import { use, useState } from "react";
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

type PatientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ActionStatus =
  | "pending"
  | "accepted"
  | "treatment"
  | "discharged";

type PatientRecord = {
  name: string;
  patientId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  village: string;

  referralId: string;
  referralReason: string;
  referralFrom: string;
  referralTo: string;
  referralPriority: "Routine" | "Urgent" | "Emergency";
  referralStatus:
    | "Created"
    | "In Transit"
    | "Received"
    | "Under Treatment"
    | "Discharged"
    | "Closed";

  vitals: {
    label: string;
    value: string;
    unit: string;
    note: string;
  }[];

  diagnoses: {
    name: string;
    status: string;
    date: string;
  }[];

  medications: {
    name: string;
    dose: string;
    frequency: string;
  }[];

  labs: {
    test: string;
    result: string;
    status: string;
    date: string;
  }[];

  clinicalNote: string;
};

const patients: Record<string, PatientRecord> = {
  "NS-10284": {
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    village: "Bassi, Jaipur",

    referralId: "NS-28491",
    referralReason: "Cardiology consultation",
    referralFrom: "PHC Bassi",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Routine",
    referralStatus: "In Transit",

    vitals: [
      {
        label: "Blood Pressure",
        value: "148/92",
        unit: "mmHg",
        note: "Above target",
      },
      {
        label: "Heart Rate",
        value: "82",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "71",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Hypertension",
        status: "Under monitoring",
        date: "28 Aug 2026",
      },
      {
        name: "Hypertension",
        status: "Follow-up assessment",
        date: "15 Aug 2026",
      },
    ],

    medications: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily",
      },
      {
        name: "Atorvastatin",
        dose: "10 mg",
        frequency: "Once at night",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "126 mg/dL",
        status: "Reviewed",
        date: "28 Aug 2026",
      },
      {
        test: "Hemoglobin",
        result: "13.8 g/dL",
        status: "Normal",
        date: "28 Aug 2026",
      },
      {
        test: "Serum Creatinine",
        result: "1.0 mg/dL",
        status: "Normal",
        date: "28 Aug 2026",
      },
    ],

    clinicalNote:
      "Patient assessed at PHC Bassi and referred for specialist cardiology consultation.",
  },

  "NS-10279": {
    name: "Sunita Devi",
    patientId: "NS-10279",
    age: 46,
    gender: "Female",
    bloodGroup: "A+",
    village: "Chomu, Jaipur",

    referralId: "NS-28478",
    referralReason: "General medicine consultation",
    referralFrom: "PHC Chomu",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Urgent",
    referralStatus: "Received",

    vitals: [
      {
        label: "Blood Pressure",
        value: "136/86",
        unit: "mmHg",
        note: "Monitoring",
      },
      {
        label: "Heart Rate",
        value: "78",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "64",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Type 2 Diabetes",
        status: "Under treatment",
        date: "27 Aug 2026",
      },
      {
        name: "Hypertension",
        status: "Under monitoring",
        date: "12 Aug 2026",
      },
    ],

    medications: [
      {
        name: "Metformin",
        dose: "500 mg",
        frequency: "Twice daily",
      },
      {
        name: "Losartan",
        dose: "50 mg",
        frequency: "Once daily",
      },
    ],

    labs: [
      {
        test: "HbA1c",
        result: "7.2 %",
        status: "Reviewed",
        date: "27 Aug 2026",
      },
      {
        test: "Blood Glucose",
        result: "142 mg/dL",
        status: "Monitoring",
        date: "27 Aug 2026",
      },
      {
        test: "Hemoglobin",
        result: "12.9 g/dL",
        status: "Normal",
        date: "12 Aug 2026",
      },
    ],

    clinicalNote:
      "Follow-up required for diabetes and hypertension management.",
  },

  "NS-10271": {
    name: "Mohan Lal",
    patientId: "NS-10271",
    age: 61,
    gender: "Male",
    bloodGroup: "O+",
    village: "Bagru, Jaipur",

    referralId: "NS-28461",
    referralReason: "Routine specialist review",
    referralFrom: "PHC Bagru",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Routine",
    referralStatus: "Closed",

    vitals: [
      {
        label: "Blood Pressure",
        value: "128/82",
        unit: "mmHg",
        note: "Controlled",
      },
      {
        label: "Heart Rate",
        value: "74",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "69",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Hypertension",
        status: "Controlled",
        date: "25 Aug 2026",
      },
    ],

    medications: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "104 mg/dL",
        status: "Normal",
        date: "25 Aug 2026",
      },
      {
        test: "Serum Creatinine",
        result: "0.9 mg/dL",
        status: "Normal",
        date: "25 Aug 2026",
      },
    ],

    clinicalNote:
      "Routine review completed and care plan communicated back to the referring facility.",
  },

  "NS-10263": {
    name: "Kamla Devi",
    patientId: "NS-10263",
    age: 58,
    gender: "Female",
    bloodGroup: "B-",
    village: "Sanganer, Jaipur",

    referralId: "NS-28432",
    referralReason: "Orthopedic consultation",
    referralFrom: "PHC Sanganer",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Urgent",
    referralStatus: "Discharged",

    vitals: [
      {
        label: "Blood Pressure",
        value: "130/84",
        unit: "mmHg",
        note: "Controlled",
      },
      {
        label: "Heart Rate",
        value: "76",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "66",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Knee Osteoarthritis",
        status: "Specialist consultation completed",
        date: "22 Aug 2026",
      },
    ],

    medications: [
      {
        name: "Pain management",
        dose: "As prescribed",
        frequency: "As directed",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "110 mg/dL",
        status: "Normal",
        date: "22 Aug 2026",
      },
    ],

    clinicalNote:
      "Orthopedic consultation completed and treatment plan issued.",
  },
};

export default function DoctorPatientPage({
  params,
}: PatientPageProps) {
  const { id } = use(params);

  const patient = patients[id];

  const [action, setAction] =
    useState<ActionStatus>("pending");

  const [showDischarge, setShowDischarge] =
    useState(false);

  const [dischargeNote, setDischargeNote] =
    useState("");

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Patient not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No doctor workspace record exists for ID {id}.
          </p>

          <Link
            href="/doctor"
            className="mt-6 inline-flex rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Back to Doctor Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const currentAction =
    action === "pending"
      ? "Awaiting doctor action"
      : action === "accepted"
        ? "Referral accepted"
        : action === "treatment"
          ? "Treatment in progress"
          : "Patient discharged";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/doctor/referrals"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
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

      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              PATIENT REVIEW
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              {patient.name}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {patient.patientId} • {patient.age} years •{" "}
              {patient.gender} • Blood Group{" "}
              {patient.bloodGroup}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              {patient.referralStatus}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                patient.referralPriority === "Emergency"
                  ? "bg-red-50 text-red-700"
                  : patient.referralPriority === "Urgent"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {patient.referralPriority}
            </span>
          </div>
        </div>

        {/* Referral banner */}
        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Referral #{patient.referralId}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {patient.referralReason}
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                {patient.referralFrom} →{" "}
                {patient.referralTo}
              </p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3">
              <p className="text-xs text-slate-400">
                Current doctor action
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {currentAction}
              </p>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Patient Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <UserRound size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Patient Summary
                  </h2>

                  <p className="text-xs text-slate-500">
                    Basic context before consultation
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            {/* Latest Vitals */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Activity size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Latest Vitals
                  </h2>

                  <p className="text-xs text-slate-500">
                    Most recent measurements
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            </section>

            {/* Medical Conditions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Stethoscope size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Medical Conditions
                  </h2>

                  <p className="text-xs text-slate-500">
                    Recorded diagnoses
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {patient.diagnoses.map((diagnosis) => (
                  <div
                    key={`${diagnosis.name}-${diagnosis.date}`}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold text-slate-900">
                        {diagnosis.name}
                      </p>

                      <span className="text-xs text-teal-700">
                        {diagnosis.date}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {diagnosis.status}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Medications + Labs */}
            <div className="grid gap-6 xl:grid-cols-2">
              {/* Medications */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Pill size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Current Medications
                    </h2>

                    <p className="text-xs text-slate-500">
                      Latest medication records
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {patient.medications.map((medicine) => (
                    <div
                      key={medicine.name}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {medicine.name}
                      </p>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-500">
                        <span>
                          Dose: {medicine.dose}
                        </span>

                        <span>
                          {medicine.frequency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Labs */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <TestTube size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Lab Results
                    </h2>

                    <p className="text-xs text-slate-500">
                      Latest available investigations
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {patient.labs.map((lab) => (
                    <div
                      key={`${lab.test}-${lab.date}`}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {lab.test}
                        </p>

                        <span className="text-xs text-teal-700">
                          {lab.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-700">
                        {lab.result}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {lab.date}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Clinical Note */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Referral Clinical Note
                  </h2>

                  <p className="text-xs text-slate-500">
                    Information provided by the referring facility
                  </p>
                </div>
              </div>

              <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {patient.clinicalNote}
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="space-y-6">
            {/* Clinical Actions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">
                Clinical Actions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Update the patient&apos;s referral journey.
              </p>

              <div className="mt-5 space-y-3">
                {/* Accept */}
                <button
                  type="button"
                  onClick={() => setAction("accepted")}
                  disabled={
                    action === "accepted" ||
                    action === "treatment" ||
                    action === "discharged"
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={17} />
                    Accept Referral
                  </span>

                  {action === "accepted" && (
                    <Check size={17} />
                  )}
                </button>

                {/* Treatment */}
                <button
                  type="button"
                  onClick={() => setAction("treatment")}
                  disabled={action === "discharged"}
                  className="flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    <Activity size={17} />
                    Start / Update Treatment
                  </span>

                  {action === "treatment" && (
                    <Check size={17} />
                  )}
                </button>

                {/* Discharge */}
                <button
                  type="button"
                  onClick={() => setShowDischarge(true)}
                  disabled={action === "discharged"}
                  className="flex w-full items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={17} />
                    Discharge Patient
                  </span>
                </button>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Current action state
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {currentAction}
                </p>
              </div>
            </section>

            {/* Records */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">
                Patient Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View complete longitudinal information.
              </p>

              <Link
                href={`/patients/${patient.patientId}/records`}
                className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <FileText size={17} />
                  Medical Records
                </span>

                <ArrowRight size={16} />
              </Link>
            </section>

            {/* Referral Journey */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">
                Referral Journey
              </h2>

              <div className="mt-5 space-y-3">
                <JourneyRow
                  label="Created"
                  done
                />

                <JourneyRow
                  label="In Transit"
                  done={
                    patient.referralStatus !==
                    "In Transit"
                  }
                />

                <JourneyRow
                  label="Received"
                  done={
                    patient.referralStatus === "Received" ||
                    patient.referralStatus ===
                      "Under Treatment" ||
                    patient.referralStatus ===
                      "Discharged" ||
                    patient.referralStatus === "Closed"
                  }
                />

                <JourneyRow
                  label="Under Treatment"
                  done={
                    patient.referralStatus ===
                      "Under Treatment" ||
                    patient.referralStatus ===
                      "Discharged" ||
                    patient.referralStatus === "Closed"
                  }
                />

                <JourneyRow
                  label="Discharged"
                  done={
                    patient.referralStatus ===
                      "Discharged" ||
                    patient.referralStatus === "Closed"
                  }
                />

                <JourneyRow
                  label="Closed"
                  done={
                    patient.referralStatus === "Closed"
                  }
                />
              </div>

              <Link
                href={`/referrals/${patient.referralId}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-slate-50"
              >
                View Full Referral
                <ArrowRight size={15} />
              </Link>
            </section>

            {/* Access */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 text-teal-700"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Consent-based access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Patient information is available to the authorized
                    doctor for care and referral purposes.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>

      {/* Discharge Modal */}
      {showDischarge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-6">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Discharge Patient
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add a brief discharge note before marking the referral
              as discharged.
            </p>

            <textarea
              value={dischargeNote}
              onChange={(event) =>
                setDischargeNote(event.target.value)
              }
              rows={5}
              placeholder="Enter discharge instructions, follow-up plan or treatment summary..."
              className="mt-5 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDischarge(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setAction("discharged");
                  setShowDischarge(false);
                }}
                disabled={!dischargeNote.trim()}
                className="rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
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

function JourneyRow({
  label,
  done = false,
}: {
  label: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
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
          <Clock3 size={13} />
        )}
      </div>

      <p
        className={`text-sm font-medium ${
          done
            ? "text-slate-800"
            : "text-slate-400"
        }`}
      >
        {label}
      </p>
    </div>
  );
}