"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Check,
  Download,
  FileText,
  HeartPulse,
  MessageCircle,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Trash2,
  UserRound,
} from "lucide-react";

type TreatmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Medicine = {
  id: number;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
};

type PatientRecord = {
  name: string;
  patientId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  village: string;
  mobile: string;

  referralId: string;
  reason: string;
  source: string;
  destination: string;
  currentStatus: string;
};

const patientData: Record<string, PatientRecord> = {
  "NS-10284": {
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    village: "Bassi, Jaipur",
    mobile: "98XXXXXX42",

    referralId: "NS-28491",
    reason: "Cardiology consultation",
    source: "PHC Bassi",
    destination: "District Hospital Jaipur",
    currentStatus: "In Transit",
  },

  "NS-10279": {
    name: "Sunita Devi",
    patientId: "NS-10279",
    age: 46,
    gender: "Female",
    bloodGroup: "A+",
    village: "Chomu, Jaipur",
    mobile: "97XXXXXX31",

    referralId: "NS-28478",
    reason: "General medicine consultation",
    source: "PHC Chomu",
    destination: "District Hospital Jaipur",
    currentStatus: "Received",
  },

  "NS-10271": {
    name: "Mohan Lal",
    patientId: "NS-10271",
    age: 61,
    gender: "Male",
    bloodGroup: "O+",
    village: "Bagru, Jaipur",
    mobile: "96XXXXXX18",

    referralId: "NS-28461",
    reason: "Routine specialist review",
    source: "PHC Bagru",
    destination: "District Hospital Jaipur",
    currentStatus: "Closed",
  },

  "NS-10263": {
    name: "Kamla Devi",
    patientId: "NS-10263",
    age: 58,
    gender: "Female",
    bloodGroup: "B-",
    village: "Sanganer, Jaipur",
    mobile: "95XXXXXX27",

    referralId: "NS-28432",
    reason: "Orthopedic consultation",
    source: "PHC Sanganer",
    destination: "District Hospital Jaipur",
    currentStatus: "Discharged",
  },
};

export default function TreatmentPage({
  params,
}: TreatmentPageProps) {
  const { id } = use(params);

  const patient = patientData[id];

  const [diagnosis, setDiagnosis] = useState(
    "Hypertension under specialist review",
  );

  const [clinicalNotes, setClinicalNotes] = useState(
    "",
  );

  const [treatmentPlan, setTreatmentPlan] = useState(
    "",
  );

  const [followUpDate, setFollowUpDate] = useState(
    "",
  );

  const [followUpInstructions, setFollowUpInstructions] =
    useState("");

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: "Amlodipine",
      dose: "5 mg",
      frequency: "Once daily",
      duration: "30 days",
    },
  ]);

  const [saved, setSaved] = useState(false);

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Patient not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No treatment record exists for patient ID {id}.
          </p>

          <Link
            href="/doctor"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const addMedicine = () => {
    setMedicines((current) => [
      ...current,
      {
        id: Date.now(),
        name: "",
        dose: "",
        frequency: "Once daily",
        duration: "30 days",
      },
    ]);
  };

  const removeMedicine = (medicineId: number) => {
    setMedicines((current) =>
      current.filter(
        (medicine) => medicine.id !== medicineId,
      ),
    );
  };

  const updateMedicine = (
    medicineId: number,
    field: keyof Medicine,
    value: string,
  ) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === medicineId
          ? {
              ...medicine,
              [field]: value,
            }
          : medicine,
      ),
    );
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSaved(true);
  };

  const downloadPDF = () => {
    window.print();
  };

  const sendSMS = () => {
    const message = encodeURIComponent(
      `NIRAMAYA-SETU: Treatment update is available for referral #${patient.referralId}. Please contact the care team for details.`,
    );

    window.location.href = `sms:${patient.mobile}?body=${message}`;
  };

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `NIRAMAYA-SETU\nTreatment update available\nPatient ID: ${patient.patientId}\nReferral: #${patient.referralId}\nPlease contact the care team for the complete treatment summary.`,
    );

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (saved) {
    return (
      <main className="min-h-screen bg-slate-50">
        {/* Printable document */}
        <section
          id="treatment-summary"
          className="mx-auto min-h-screen max-w-4xl px-6 py-8 print:max-w-none print:px-0 print:py-0"
        >
          {/* Document Header */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
            <div className="border-b border-slate-200 px-8 py-6 print:px-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white">
                    <HeartPulse size={23} />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      NIRAMAYA-SETU
                    </p>

                    <p className="text-xs text-slate-500">
                      Care Continuity Platform
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
                    Clinical Treatment Summary
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Referral #{patient.referralId}
                  </p>
                </div>
              </div>
            </div>

            {/* Patient */}
            <div className="px-8 py-6 print:px-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Patient Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Patient linked to this treatment update
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryField
                  label="Patient"
                  value={patient.name}
                />

                <SummaryField
                  label="Patient ID"
                  value={patient.patientId}
                />

                <SummaryField
                  label="Age / Gender"
                  value={`${patient.age} / ${patient.gender}`}
                />

                <SummaryField
                  label="Blood Group"
                  value={patient.bloodGroup}
                />

                <SummaryField
                  label="Location"
                  value={patient.village}
                />

                <SummaryField
                  label="Referral"
                  value={`#${patient.referralId}`}
                />

                <SummaryField
                  label="Referring Facility"
                  value={patient.source}
                />

                <SummaryField
                  label="Receiving Facility"
                  value={patient.destination}
                />
              </div>
            </div>

            {/* Clinical Assessment */}
            <div className="border-t border-slate-200 px-8 py-6 print:px-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Stethoscope size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Clinical Assessment
                  </h2>

                  <p className="text-xs text-slate-500">
                    Current doctor assessment
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <SummaryBlock
                  label="Assessment / Diagnosis"
                  value={diagnosis}
                />

                <SummaryBlock
                  label="Clinical Notes"
                  value={
                    clinicalNotes ||
                    "No additional clinical notes recorded."
                  }
                />

                <SummaryBlock
                  label="Treatment Plan"
                  value={
                    treatmentPlan ||
                    "Treatment plan recorded during consultation."
                  }
                />
              </div>
            </div>

            {/* Medicines */}
            <div className="border-t border-slate-200 px-8 py-6 print:px-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Pill size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Medications
                  </h2>

                  <p className="text-xs text-slate-500">
                    Medicines prescribed during this encounter
                  </p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold text-slate-500">
                      <th className="px-4 py-3">
                        Medicine
                      </th>

                      <th className="px-4 py-3">
                        Dose
                      </th>

                      <th className="px-4 py-3">
                        Frequency
                      </th>

                      <th className="px-4 py-3">
                        Duration
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                          {medicine.name || "Not specified"}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-600">
                          {medicine.dose || "—"}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-600">
                          {medicine.frequency}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-600">
                          {medicine.duration || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Follow-up */}
            <div className="border-t border-slate-200 px-8 py-6 print:px-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Activity size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Follow-up & Continuity
                  </h2>

                  <p className="text-xs text-slate-500">
                    Next care action
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SummaryField
                  label="Follow-up Date"
                  value={
                    followUpDate
                      ? formatDate(followUpDate)
                      : "Not scheduled"
                  }
                />

                <SummaryField
                  label="Follow-up Instructions"
                  value={
                    followUpInstructions ||
                    "No additional instructions recorded."
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-8 py-5 print:bg-white print:px-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">
                    Treating Doctor
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Dr. Priya Singh
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    District Hospital Jaipur • Cardiology
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs text-slate-400">
                    Access
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Consent-based
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    NIRAMAYA-SETU clinical record
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[11px] leading-5 text-slate-400">
                This treatment summary is intended for continuity of
                care. Production records should be persisted and
                shared through authorized backend services.
              </p>
            </div>
          </div>

          {/* Actions - hidden during print */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3 print:hidden">
            <button
              type="button"
              onClick={downloadPDF}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download size={17} />
              Download PDF
            </button>

            <button
              type="button"
              onClick={sendSMS}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MessageCircle size={17} />
              Send SMS
            </button>

            <button
              type="button"
              onClick={shareWhatsApp}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MessageCircle size={17} />
              WhatsApp
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 print:hidden sm:flex-row">
            <Link
              href={`/doctor/patients/${patient.patientId}`}
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Patient
            </Link>

            <button
              type="button"
              onClick={() => setSaved(false)}
              className="flex flex-1 items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Edit Treatment
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href={`/doctor/patients/${patient.patientId}`}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Patient Review
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck
              size={17}
              className="text-teal-700"
            />
            Secure clinical update
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            TREATMENT WORKSPACE
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Update treatment
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Record the current treatment plan, medicines and follow-up
            details for the patient.
          </p>
        </div>

        {/* Patient Banner */}
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <UserRound size={23} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {patient.patientId} • {patient.age} years •{" "}
                  {patient.gender} • Blood Group{" "}
                  {patient.bloodGroup}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Info
                label="Referral"
                value={`#${patient.referralId}`}
              />

              <Info
                label="Reason"
                value={patient.reason}
              />

              <Info
                label="Status"
                value={patient.currentStatus}
              />
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          {/* Clinical Assessment */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Stethoscope size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Clinical Assessment
                </h2>

                <p className="text-xs text-slate-500">
                  Record the doctor&apos;s current assessment
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="diagnosis"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Assessment / Diagnosis
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(event) =>
                    setDiagnosis(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="clinicalNotes"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Clinical notes
                </label>

                <textarea
                  id="clinicalNotes"
                  value={clinicalNotes}
                  onChange={(event) =>
                    setClinicalNotes(event.target.value)
                  }
                  rows={5}
                  placeholder="Record observations, findings or other clinically relevant notes..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="treatmentPlan"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Treatment plan
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  id="treatmentPlan"
                  value={treatmentPlan}
                  onChange={(event) =>
                    setTreatmentPlan(event.target.value)
                  }
                  rows={5}
                  required
                  placeholder="Describe the treatment plan and immediate care instructions..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
          </section>

          {/* Medicines */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Pill size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Medications
                  </h2>

                  <p className="text-xs text-slate-500">
                    Add medicines prescribed during this encounter
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={addMedicine}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-800 hover:bg-teal-100"
              >
                <Plus size={17} />
                Add Medicine
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {medicines.map((medicine, index) => (
                <div
                  key={medicine.id}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Medicine {index + 1}
                    </p>

                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeMedicine(medicine.id)
                        }
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Field
                      label="Medicine"
                      value={medicine.name}
                      placeholder="e.g. Amlodipine"
                      onChange={(value) =>
                        updateMedicine(
                          medicine.id,
                          "name",
                          value,
                        )
                      }
                    />

                    <Field
                      label="Dose"
                      value={medicine.dose}
                      placeholder="e.g. 5 mg"
                      onChange={(value) =>
                        updateMedicine(
                          medicine.id,
                          "dose",
                          value,
                        )
                      }
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Frequency
                      </label>

                      <select
                        value={medicine.frequency}
                        onChange={(event) =>
                          updateMedicine(
                            medicine.id,
                            "frequency",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      >
                        <option>
                          Once daily
                        </option>
                        <option>
                          Twice daily
                        </option>
                        <option>
                          Three times daily
                        </option>
                        <option>
                          Once at night
                        </option>
                        <option>
                          As needed
                        </option>
                      </select>
                    </div>

                    <Field
                      label="Duration"
                      value={medicine.duration}
                      placeholder="e.g. 30 days"
                      onChange={(value) =>
                        updateMedicine(
                          medicine.id,
                          "duration",
                          value,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Follow-up */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <HeartPulse size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Follow-up & Continuity
                </h2>

                <p className="text-xs text-slate-500">
                  Keep the care journey connected after treatment
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="followUpDate"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Follow-up date
                </label>

                <input
                  id="followUpDate"
                  type="date"
                  value={followUpDate}
                  onChange={(event) =>
                    setFollowUpDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="followUpInstructions"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Follow-up instructions
                </label>

                <textarea
                  id="followUpInstructions"
                  value={followUpInstructions}
                  onChange={(event) =>
                    setFollowUpInstructions(
                      event.target.value,
                    )
                  }
                  rows={4}
                  placeholder="e.g. Review BP after 7 days at PHC Bassi..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
          </section>

          {/* Continuity */}
          <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
            <div className="flex items-start gap-3">
              <FileText
                size={19}
                className="mt-0.5 text-teal-700"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Care continuity
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  This treatment update remains linked to referral #
                  {patient.referralId} and patient ID{" "}
                  {patient.patientId}.
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/doctor/patients/${patient.patientId}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              <Check size={17} />
              Save Treatment Update
            </button>
          </div>
        </form>
      </section>
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
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}

function SummaryField({
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

      <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">
        {value}
      </p>
    </div>
  );
}

function SummaryBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}