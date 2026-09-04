"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  HeartPulse,
  Hospital,
  QrCode,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
};

const patients: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    village: "Bassi",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 47,
    gender: "Female",
    village: "Chomu",
  },
  {
    id: "NS-10271",
    name: "Mohan Lal",
    age: 58,
    gender: "Male",
    village: "Bagru",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 61,
    gender: "Female",
    village: "Sanganer",
  },
];

const facilities = [
  {
    name: "District Hospital Jaipur",
    location: "Jaipur",
    distance: "12 km",
    departments: ["Cardiology", "General Medicine", "Orthopedics"],
  },
  {
    name: "CHC Chomu",
    location: "Chomu",
    distance: "18 km",
    departments: ["General Medicine", "Emergency"],
  },
  {
    name: "SMS Hospital Jaipur",
    location: "Jaipur",
    distance: "29 km",
    departments: ["Cardiology", "Neurology", "Orthopedics"],
  },
];

export default function CreateReferralPage() {
  const [submitted, setSubmitted] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(
    "NS-10284",
  );

  const [selectedFacility, setSelectedFacility] = useState(
    "District Hospital Jaipur",
  );

  const [department, setDepartment] = useState("Cardiology");

  const [priority, setPriority] = useState("Routine");

  const [reason, setReason] = useState(
    "Cardiology consultation",
  );

  const [notes, setNotes] = useState("");

  const [consent, setConsent] = useState(false);

  const patient = patients.find(
    (item) => item.id === selectedPatient,
  );

  const facility = facilities.find(
    (item) => item.name === selectedFacility,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Check size={32} />
            </div>

            <p className="mt-6 text-sm font-semibold text-teal-700">
              REFERRAL CREATED
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Referral created successfully
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              The referral has been prepared for the receiving facility.
              The backend will generate and persist the official referral
              record.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">
                    Patient
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {patient?.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPatient}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Referral ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Pending backend ID
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Destination
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedFacility}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Priority
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {priority}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/referrals"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Referrals
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex flex-1 items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Create Another
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-8 lg:py-10">
        {/* Back Link & Security Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/patients"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft size={18} />
            Back to Patients
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck size={16} className="text-teal-700" />
            Secure referral workflow
          </div>
        </div>

        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            REFERRAL MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create referral
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Refer a patient to the appropriate facility and specialist
            while keeping the care journey connected.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Patient selection */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <HeartPulse size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Patient
                </h2>

                <p className="text-xs text-slate-500">
                  Select the patient requiring referral
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="patient"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Patient
              </label>

              <select
                id="patient"
                value={selectedPatient}
                onChange={(event) =>
                  setSelectedPatient(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              >
                {patients.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {item.id}
                  </option>
                ))}
              </select>
            </div>

            {patient && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Info
                    label="Patient"
                    value={patient.name}
                  />

                  <Info
                    label="Age / Gender"
                    value={`${patient.age} / ${patient.gender}`}
                  />

                  <Info
                    label="Village"
                    value={patient.village}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Destination */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Hospital size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Destination Facility
                </h2>

                <p className="text-xs text-slate-500">
                  Choose the facility that should receive the referral
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="facility"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Receiving facility
                </label>

                <select
                  id="facility"
                  value={selectedFacility}
                  onChange={(event) => {
                    setSelectedFacility(event.target.value);

                    const selected = facilities.find(
                      (item) => item.name === event.target.value,
                    );

                    setDepartment(
                      selected?.departments[0] ?? "",
                    );
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  {facilities.map((item) => (
                    <option
                      key={item.name}
                      value={item.name}
                    >
                      {item.name} — {item.distance}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Department / Specialist
                </label>

                <select
                  id="department"
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  {facility?.departments.map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {facility && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-teal-100 bg-teal-50/50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {facility.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {facility.location} •{" "}
                    {facility.distance} away
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-700">
                  Facility selected
                </span>
              </div>
            )}
          </section>

          {/* Clinical information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Stethoscope size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Clinical Information
                </h2>

                <p className="text-xs text-slate-500">
                  Provide the reason and context for referral
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="reason"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Reason for referral
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="reason"
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  required
                  placeholder="e.g. Cardiology consultation"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
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

                <p className="mt-2 text-xs text-slate-500">
                  Use Emergency only when immediate escalation is
                  clinically appropriate.
                </p>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Clinical notes
                </label>

                <textarea
                  id="notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  rows={5}
                  placeholder="Relevant symptoms, observations, previous treatment or information for the receiving clinician..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-teal-700"
              />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Consent & Referral Sharing
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Confirm that the patient has provided appropriate
                  consent for relevant health information to be shared
                  with the receiving facility for the purpose of care.
                </p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) =>
                  setConsent(event.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
              />

              <span className="text-sm leading-6 text-slate-700">
                I confirm that the patient has provided consent to
                share the relevant health information required for this
                referral and continuity of care.
              </span>
            </label>
          </section>

          {/* Summary */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Referral Summary
                </h2>

                <p className="text-xs text-slate-500">
                  Review before creating the referral
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Info
                label="Patient"
                value={patient?.name ?? "-"}
              />

              <Info
                label="Destination"
                value={selectedFacility}
              />

              <Info
                label="Department"
                value={department}
              />

              <Info
                label="Priority"
                value={priority}
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/patients"
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={!consent}
              className="flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Referral
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
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}