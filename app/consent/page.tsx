"use client";

import { useState } from "react";
import Link from "next/link";
import { useRole } from "../context/RoleContext";
import { ArrowLeft } from "lucide-react";

type ConsentStatus = "Active" | "Pending" | "Declined" | "Expired";

type ConsentItem = {
  key: "demographics" | "referral" | "medical" | "treatment";
  title: string;
  description: string;
  checked: boolean;
};

type ConsentHistoryItem = {
  id: string;
  date: string;
  action: string;
  shared: string;
  status: ConsentStatus;
  actor: string;
};

const consentHistory: ConsentHistoryItem[] = [
  {
    id: "CON-10982",
    date: "03 Sep 2026, 10:40 AM",
    action: "Consent granted",
    shared: "Demographics + Referral",
    status: "Active",
    actor: "Ramesh Kumar",
  },
  {
    id: "CON-10961",
    date: "02 Sep 2026, 09:18 AM",
    action: "Consent updated",
    shared: "Demographics + Referral",
    status: "Active",
    actor: "ASHA / ANM",
  },
  {
    id: "CON-10894",
    date: "28 Aug 2026, 03:25 PM",
    action: "Consent request",
    shared: "Medical Records",
    status: "Declined",
    actor: "District Hospital",
  },
];

export default function ConsentPage() {
  const { roleDashboardPath, roleDisplayName } = useRole();
  const [patientSearch, setPatientSearch] = useState("Ramesh Kumar");
  const [selectedPatient, setSelectedPatient] = useState("Ramesh Kumar");

  const [consentItems, setConsentItems] = useState<ConsentItem[]>([
    {
      key: "demographics",
      title: "Demographics",
      description: "Basic patient identity and contact information.",
      checked: true,
    },
    {
      key: "referral",
      title: "Referral Details",
      description: "Referral ID, destination facility, department and status.",
      checked: true,
    },
    {
      key: "medical",
      title: "Medical Records",
      description: "Diagnoses, vitals, laboratory results and clinical history.",
      checked: false,
    },
    {
      key: "treatment",
      title: "Treatment Information",
      description: "Treatment plan, prescribed medicines and follow-up details.",
      checked: false,
    },
  ]);

  const [duration, setDuration] = useState("7 days");
  const [consentMethod, setConsentMethod] = useState("Patient / Guardian");
  const [status, setStatus] = useState<ConsentStatus>("Pending");
  const [notes, setNotes] = useState("");

  const [showAadhaar, setShowAadhaar] = useState(false);
  const [showABHA, setShowABHA] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const patients = [
    {
      name: "Ramesh Kumar",
      id: "NS-10284",
      village: "Rampura",
      aadhaar: "XXXX XXXX 4821",
      abha: "91XX-XXXX-XXXX",
    },
    {
      name: "Sunita Devi",
      id: "NS-10279",
      village: "Khejroli",
      aadhaar: "XXXX XXXX 7314",
      abha: "82XX-XXXX-XXXX",
    },
    {
      name: "Mohan Lal",
      id: "NS-10271",
      village: "Chomu",
      aadhaar: "XXXX XXXX 2058",
      abha: "74XX-XXXX-XXXX",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const query = patientSearch.trim().toLowerCase();

    if (!query) return true;

    return (
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query) ||
      patient.village.toLowerCase().includes(query)
    );
  });

  const currentPatient =
    patients.find((patient) => patient.name === selectedPatient) ??
    patients[0];

  const selectedCount = consentItems.filter(
    (item) => item.checked
  ).length;

  const toggleConsentItem = (key: ConsentItem["key"]) => {
    setConsentItems((items) =>
      items.map((item) =>
        item.key === key
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );

    setSaved(false);
  };

  const handleSave = () => {
    if (selectedCount === 0) {
      return;
    }

    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setStatus("Active");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href={roleDashboardPath}
                className="flex items-center gap-1 font-semibold text-teal-800 transition hover:text-teal-900"
              >
                <ArrowLeft size={14} />
                {roleDisplayName} Dashboard
              </Link>

              <span>/</span>

              <span className="text-slate-700">Consent</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Consent Management
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Manage patient consent for sharing referral and clinical
              information across authorized care facilities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm font-semibold text-emerald-900">
                  Consent Protected
                </span>
              </div>

              <p className="mt-1 text-[11px] text-emerald-700">
                Role-based access enabled
              </p>
            </div>
          </div>
        </div>

        {/* Privacy banner */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Consent-first information sharing
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Select only the information necessary for the current care
                  workflow. Patient consent should control access to
                  authorized information.
                </p>
              </div>
            </div>

            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {selectedCount} of 4 categories selected
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.45fr]">
          {/* Patient panel */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                1. Select Patient
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search for the patient whose consent will be recorded.
              </p>
            </div>

            <div className="p-5">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>

                <input
                  value={patientSearch}
                  onChange={(event) =>
                    setPatientSearch(event.target.value)
                  }
                  placeholder="Patient name, ID or village..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="mt-4 space-y-2">
                {filteredPatients.map((patient) => {
                  const active = selectedPatient === patient.name;

                  return (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => {
                        setSelectedPatient(patient.name);
                        setPatientSearch(patient.name);
                        setSaved(false);
                      }}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-teal-300 bg-teal-50"
                          : "border-slate-100 bg-white hover:border-teal-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                          {patient.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {patient.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {patient.id} • {patient.village}
                          </p>
                        </div>

                        {active && (
                          <span className="ml-auto text-xs font-bold text-teal-700">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Patient identity */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Selected Patient
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {currentPatient.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {currentPatient.id} • {currentPatient.village}
                </p>

                <div className="mt-4 grid gap-3">
                  {/* Aadhaar */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Aadhaar
                        </p>

                        <p className="mt-1 font-mono text-xs font-semibold text-slate-800">
                          {showAadhaar
                            ? `XXXX XXXX ${currentPatient.aadhaar.slice(
                                -4
                              )}`
                            : "XXXX XXXX XXXX"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAadhaar((value) => !value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        {showAadhaar ? "Hide" : "View"}
                      </button>
                    </div>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Identity reference
                    </p>
                  </div>

                  {/* ABHA */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          ABHA
                        </p>

                        <p className="mt-1 font-mono text-xs font-semibold text-slate-800">
                          {showABHA
                            ? currentPatient.abha
                            : "XX•• •••• ••••"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowABHA((value) => !value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        {showABHA ? "Hide" : "View"}
                      </button>
                    </div>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Digital health identity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Consent form */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                2. Consent Request
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose what information can be shared for the current care
                journey.
              </p>
            </div>

            <div className="p-5">
              {/* Sharing categories */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Information Sharing
                </p>

                <div className="space-y-3">
                  {consentItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleConsentItem(item.key)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        item.checked
                          ? "border-teal-200 bg-teal-50/70"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            item.checked
                              ? "border-teal-600 bg-teal-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {item.checked && (
                            <span className="text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent duration */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Consent Settings
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Consent Validity">
                    <select
                      value={duration}
                      onChange={(event) =>
                        setDuration(event.target.value)
                      }
                      className="input-style"
                    >
                      <option>24 hours</option>
                      <option>7 days</option>
                      <option>30 days</option>
                      <option>Until referral closes</option>
                    </select>
                  </Field>

                  <Field label="Consent Recorded By">
                    <select
                      value={consentMethod}
                      onChange={(event) =>
                        setConsentMethod(event.target.value)
                      }
                      className="input-style"
                    >
                      <option>Patient / Guardian</option>
                      <option>ASHA / ANM</option>
                      <option>Doctor</option>
                      <option>Authorized Facility Staff</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Consent status */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Current Consent Status
                </p>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {(
                    [
                      "Active",
                      "Pending",
                      "Declined",
                      "Expired",
                    ] as ConsentStatus[]
                  ).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setStatus(item);
                        setSaved(false);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                        status === item
                          ? getStatusActiveStyle(item)
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <Field label="Consent Notes">
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(event) => {
                      setNotes(event.target.value);
                      setSaved(false);
                    }}
                    placeholder="Add consent context, limitations or additional notes..."
                    className="input-style resize-none"
                  />
                </Field>
              </div>

              {/* Summary */}
              <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                  Consent Summary
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <SummaryBox
                    label="Patient"
                    value={currentPatient.name}
                  />

                  <SummaryBox
                    label="Categories"
                    value={`${selectedCount} selected`}
                  />

                  <SummaryBox
                    label="Validity"
                    value={duration}
                  />

                  <SummaryBox
                    label="Status"
                    value={status}
                  />
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                {saved && (
                  <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                        ✓
                      </span>

                      <p className="text-xs font-semibold text-emerald-800">
                        Consent record saved successfully
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/referrals"
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Back to Referrals
                  </Link>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || selectedCount === 0}
                    className="flex-1 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving Consent..." : "Save Consent"}
                  </button>
                </div>

                {selectedCount === 0 && (
                  <p className="mt-2 text-center text-[11px] font-medium text-red-600">
                    Select at least one information category.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Consent history */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Consent History
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Previous consent events associated with the patient record.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                AUDIT TRAIL
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {consentHistory.map((item) => (
              <div key={item.id} className="px-5 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xs font-bold text-slate-600">
                      {item.id.slice(-2)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.action}
                        </p>

                        <ConsentStatusBadge status={item.status} />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.id} • {item.date}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Shared:{" "}
                        <span className="font-medium">
                          {item.shared}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left lg:text-right">
                    <p className="text-xs font-semibold text-slate-700">
                      {item.actor}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Recorded actor
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SecurityCard
            title="Minimum Necessary Access"
            text="Share only the information required for the current treatment or referral workflow."
          />

          <SecurityCard
            title="Patient-controlled Sharing"
            text="Consent should determine whether authorized users can access sensitive health information."
            amber
          />

          <SecurityCard
            title="Audit History"
            text="Consent actions should be traceable so changes can be reviewed later."
            blue
          />
        </div>

        {/* Prototype note */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7h.01" />
            </svg>

            <p className="text-xs leading-5 text-blue-800">
              Prototype consent management: status changes, consent history
              and patient sharing controls currently use frontend demo data.
              Production consent capture, authorization and audit storage
              should be implemented on the backend.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      {children}
    </div>
  );
}

function SummaryBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-teal-100 bg-white/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function ConsentStatusBadge({
  status,
}: {
  status: ConsentStatus;
}) {
  const styles: Record<ConsentStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Declined: "bg-red-50 text-red-700",
    Expired: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function getStatusActiveStyle(status: ConsentStatus) {
  const styles: Record<ConsentStatus, string> = {
    Active: "border-emerald-300 bg-emerald-50 text-emerald-800",
    Pending: "border-amber-300 bg-amber-50 text-amber-800",
    Declined: "border-red-300 bg-red-50 text-red-800",
    Expired: "border-slate-300 bg-slate-100 text-slate-700",
  };

  return styles[status];
}

function SecurityCard({
  title,
  text,
  amber = false,
  blue = false,
}: {
  title: string;
  text: string;
  amber?: boolean;
  blue?: boolean;
}) {
  const wrapper = amber
    ? "border-amber-200 bg-amber-50/80"
    : blue
    ? "border-blue-200 bg-blue-50/80"
    : "border-slate-200 bg-white/85";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <p
        className={`text-[11px] font-bold uppercase tracking-wide ${label}`}
      >
        Security
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}