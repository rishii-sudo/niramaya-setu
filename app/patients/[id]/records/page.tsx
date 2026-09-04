"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { getPatient } from "@/app/data/patientData";

type RecordStatus = "Normal" | "Abnormal" | "Pending" | "Completed";

type PatientRecord = {
  id: string;
  category:
    | "Visit"
    | "Lab"
    | "Diagnostic"
    | "Diagnosis"
    | "Medicine"
    | "Surgery"
    | "Admission"
    | "Discharge"
    | "Document";
  title: string;
  date: string;
  doctor?: string;
  facility?: string;
  status?: RecordStatus;
  summary: string;
  details: { label: string; value: string }[];
};

const defaultPatient = {
  id: "NS-10284",
  name: "Ramesh Kumar",
  age: 54,
  gender: "Male",
  bloodGroup: "B+",
  mobile: "+91 98••••••42",
  aadhaar: "•••• •••• 4821",
  abha: "91-24XX-XXXX-7812",
  allergies: ["Penicillin"],
  chronicConditions: ["Hypertension"],
  emergencyContact: "Sunita Kumar • +91 97••••••18",
};

const records: PatientRecord[] = [
  {
    id: "VIS-001",
    category: "Visit",
    title: "OPD Consultation",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "Initial consultation for persistent headache and dizziness.",
    details: [
      { label: "Complaint", value: "Headache, dizziness" },
      { label: "Duration", value: "6 days" },
      { label: "BP", value: "158/96 mmHg" },
      { label: "Pulse", value: "84 bpm" },
      { label: "Temperature", value: "98.4°F" },
      { label: "SpO₂", value: "97%" },
    ],
  },
  {
    id: "LAB-001",
    category: "Lab",
    title: "Complete Blood Count (CBC)",
    date: "04 Sep 2026",
    facility: "District Diagnostic Centre",
    status: "Abnormal",
    summary: "CBC completed. Mild reduction in hemoglobin noted.",
    details: [
      { label: "Hemoglobin", value: "10.8 g/dL" },
      { label: "WBC", value: "8,200 /µL" },
      { label: "Platelets", value: "2.10 lakh /µL" },
      { label: "RBC", value: "4.1 million /µL" },
      { label: "Report ID", value: "CBC-260904-118" },
    ],
  },
  {
    id: "LAB-002",
    category: "Lab",
    title: "Kidney Function Test (KFT)",
    date: "04 Sep 2026",
    facility: "District Diagnostic Centre",
    status: "Normal",
    summary: "Renal parameters within the expected reference range.",
    details: [
      { label: "Creatinine", value: "1.1 mg/dL" },
      { label: "Urea", value: "31 mg/dL" },
      { label: "Sodium", value: "139 mmol/L" },
      { label: "Potassium", value: "4.2 mmol/L" },
      { label: "Report ID", value: "KFT-260904-121" },
    ],
  },
  {
    id: "DX-001",
    category: "Diagnostic",
    title: "12-Lead ECG",
    date: "05 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "ECG performed before specialist referral.",
    details: [
      { label: "Heart Rate", value: "82 bpm" },
      { label: "Rhythm", value: "Sinus rhythm" },
      { label: "Finding", value: "No acute abnormality noted" },
      { label: "Report ID", value: "ECG-260905-41" },
    ],
  },
  {
    id: "DX-002",
    category: "Diagnostic",
    title: "Chest X-Ray",
    date: "06 Sep 2026",
    facility: "SMS Hospital",
    status: "Pending",
    summary: "Imaging performed after referral. Final radiology report pending.",
    details: [
      { label: "Study", value: "Chest PA view" },
      { label: "Status", value: "Radiology review pending" },
      { label: "Study ID", value: "XR-260906-209" },
    ],
  },
  {
    id: "DIA-001",
    category: "Diagnosis",
    title: "Hypertension",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "Primary diagnosis recorded during OPD consultation.",
    details: [
      { label: "Type", value: "Primary diagnosis" },
      { label: "Severity", value: "Stage 1 / under evaluation" },
      { label: "First Recorded", value: "02 Sep 2026" },
      { label: "Follow-up", value: "08 Sep 2026" },
    ],
  },
  {
    id: "MED-001",
    category: "Medicine",
    title: "Amlodipine 5 mg",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "Antihypertensive medication started.",
    details: [
      { label: "Dose", value: "5 mg" },
      { label: "Route", value: "Oral" },
      { label: "Frequency", value: "Once daily" },
      { label: "Duration", value: "30 days" },
      { label: "Timing", value: "After breakfast" },
    ],
  },
  {
    id: "MED-002",
    category: "Medicine",
    title: "Paracetamol 500 mg",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "Prescribed for symptomatic relief from headache.",
    details: [
      { label: "Dose", value: "500 mg" },
      { label: "Route", value: "Oral" },
      { label: "Frequency", value: "As needed, up to 3 times/day" },
      { label: "Duration", value: "5 days" },
    ],
  },
  {
    id: "ADM-001",
    category: "Admission",
    title: "Specialist Admission",
    date: "07 Sep 2026",
    doctor: "Cardiology Team",
    facility: "SMS Hospital",
    status: "Completed",
    summary: "Short-stay admission for specialist evaluation.",
    details: [
      { label: "Admission Type", value: "Elective / referral" },
      { label: "Ward", value: "Cardiology Observation" },
      { label: "Reason", value: "Uncontrolled blood pressure + symptoms" },
      { label: "Admission ID", value: "ADM-24017" },
    ],
  },
  {
    id: "SUR-001",
    category: "Surgery",
    title: "No Surgery Recorded",
    date: "08 Sep 2026",
    facility: "SMS Hospital",
    status: "Completed",
    summary:
      "No surgical procedure has been performed for the current care episode.",
    details: [
      { label: "Procedure Status", value: "Not applicable" },
      { label: "Current Plan", value: "Medical management + follow-up" },
    ],
  },
  {
    id: "DIS-001",
    category: "Discharge",
    title: "Discharge Summary",
    date: "09 Sep 2026",
    doctor: "Cardiology Team",
    facility: "SMS Hospital",
    status: "Completed",
    summary:
      "Patient discharged with medication continuation and outpatient follow-up.",
    details: [
      { label: "Final Diagnosis", value: "Hypertension under treatment" },
      { label: "Condition", value: "Stable" },
      { label: "Discharge Medicine", value: "Amlodipine 5 mg" },
      { label: "Next Follow-up", value: "15 Sep 2026" },
    ],
  },
  {
    id: "DOC-001",
    category: "Document",
    title: "Prescription",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
    facility: "Primary Health Centre",
    status: "Completed",
    summary: "Digitized prescription from the primary consultation.",
    details: [
      { label: "Document Type", value: "Prescription" },
      { label: "Document ID", value: "DOC-24017-P1" },
      { label: "Format", value: "PDF" },
    ],
  },
  {
    id: "DOC-002",
    category: "Document",
    title: "CBC Report",
    date: "04 Sep 2026",
    facility: "District Diagnostic Centre",
    status: "Completed",
    summary: "CBC laboratory report attached to patient records.",
    details: [
      { label: "Document Type", value: "Lab Report" },
      { label: "Document ID", value: "DOC-24017-L1" },
      { label: "Format", value: "PDF" },
    ],
  },
];

const categories = [
  "All",
  "Visits",
  "Lab Reports",
  "Diagnostics",
  "Diagnoses",
  "Medicines",
  "Surgeries",
  "Admissions",
  "Discharge",
  "Documents",
];

const categoryMap: Record<string, PatientRecord["category"] | "All"> = {
  Visits: "Visit",
  "Lab Reports": "Lab",
  Diagnostics: "Diagnostic",
  Diagnoses: "Diagnosis",
  Medicines: "Medicine",
  Surgeries: "Surgery",
  Admissions: "Admission",
  Discharge: "Discharge",
  Documents: "Document",
};

const categoryMeta: Record<
  PatientRecord["category"],
  { icon: string; label: string }
> = {
  Visit: { icon: "🩺", label: "Visit" },
  Lab: { icon: "🧪", label: "Lab Report" },
  Diagnostic: { icon: "📊", label: "Diagnostic" },
  Diagnosis: { icon: "🧠", label: "Diagnosis" },
  Medicine: { icon: "💊", label: "Medicine" },
  Surgery: { icon: "🏥", label: "Surgery" },
  Admission: { icon: "🛏️", label: "Admission" },
  Discharge: { icon: "📄", label: "Discharge" },
  Document: { icon: "📁", label: "Document" },
};

function statusClass(status?: RecordStatus) {
  switch (status) {
    case "Normal":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Abnormal":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Pending":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function PatientRecordsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const foundPatient = getPatient(id);
  const patient = useMemo(() => {
    if (!foundPatient) return { ...defaultPatient, id };
    const ec = foundPatient.emergencyContact;
    const ecStr = ec
      ? `${ec.name} (${ec.relation}) • ${ec.mobile}`
      : defaultPatient.emergencyContact;
    return {
      id: foundPatient.patientId || id,
      name: foundPatient.name,
      age: foundPatient.age,
      gender: foundPatient.gender,
      bloodGroup: foundPatient.bloodGroup,
      mobile: foundPatient.mobile,
      aadhaar: foundPatient.aadhaar,
      abha:
        (foundPatient as any).abha ||
        foundPatient.abhaId ||
        defaultPatient.abha,
      allergies:
        foundPatient.allergies?.map((a: any) =>
          typeof a === "string" ? a : a.name,
        ) || [],
      chronicConditions:
        foundPatient.chronicConditions?.map((c: any) =>
          typeof c === "string" ? c : c.name,
        ) || [],
      emergencyContact: ecStr,
    };
  }, [foundPatient, id]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] =
    useState<PatientRecord | null>(null);

  const filteredRecords = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return records.filter((record) => {
      const categoryMatch =
        activeCategory === "All" ||
        record.category === categoryMap[activeCategory];

      const text = [
        record.title,
        record.summary,
        record.doctor,
        record.facility,
        ...record.details.map((item) => `${item.label} ${item.value}`),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return categoryMatch && (!searchTerm || text.includes(searchTerm));
    });
  }, [activeCategory, search]);

  const labCount = records.filter((r) => r.category === "Lab").length;
  const diagnosticCount = records.filter(
    (r) => r.category === "Diagnostic",
  ).length;
  const medicineCount = records.filter(
    (r) => r.category === "Medicine",
  ).length;
  const surgeryCount = records.filter(
    (r) => r.category === "Surgery",
  ).length;

  return (
    <>
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Link
                  href="/patients"
                  className="transition hover:text-teal-700"
                >
                  Patients
                </Link>
                <span>/</span>
                <Link
                  href={`/patients/${id}`}
                  className="transition hover:text-teal-700"
                >
                  {patient.name}
                </Link>
                <span>/</span>
                <span className="text-slate-700">Medical Records</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Medical Records Center
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Complete clinical history, investigations, treatment and care
                timeline.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/patients/${id}`}
                className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
              >
                ← Patient Overview
              </Link>

              <button
                onClick={() => window.print()}
                className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
              >
                Print Records
              </button>
            </div>
          </div>

          {/* Patient Banner */}
          <section className="mb-6 rounded-2xl border border-teal-100 bg-white/85 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-2xl font-bold text-teal-700">
                  RK
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {patient.name}
                    </h2>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {patient.id}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span>
                      {patient.age} years • {patient.gender}
                    </span>
                    <span>Blood Group: {patient.bloodGroup}</span>
                    <span>ABHA: {patient.abha}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <SummaryStat label="Lab Reports" value={labCount} />
                <SummaryStat label="Diagnostics" value={diagnosticCount} />
                <SummaryStat label="Medicines" value={medicineCount} />
                <SummaryStat label="Surgeries" value={surgeryCount} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBox label="Mobile" value={patient.mobile} />
              <InfoBox label="Aadhaar" value={patient.aadhaar} />
              <InfoBox
                label="Allergies"
                value={patient.allergies.join(", ")}
                warning
              />
              <InfoBox
                label="Chronic Condition"
                value={patient.chronicConditions.join(", ")}
              />
            </div>
          </section>

          {/* Important Clinical Alerts */}
          <section className="mb-6 grid gap-4 lg:grid-cols-3">
            <ClinicalAlert
              title="Allergy Alert"
              value={patient.allergies.join(", ")}
              description="Check medication orders before prescribing."
              tone="danger"
            />

            <ClinicalAlert
              title="Current Diagnosis"
              value="Hypertension"
              description="Under active medical management."
              tone="warning"
            />

            <ClinicalAlert
              title="Next Follow-up"
              value="15 Sep 2026"
              description="Outpatient review after current treatment."
              tone="info"
            />
          </section>

          {/* Search + Categories */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Patient Health Records
                </h2>
                <p className="text-xs text-slate-500">
                  {filteredRecords.length} records visible
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports, medicines, diagnosis..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Main layout */}
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            {/* Records */}
            <section className="space-y-4">
              {filteredRecords.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
                  <div className="text-3xl">🔎</div>
                  <h3 className="mt-3 font-semibold text-slate-900">
                    No records found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another search term or category.
                  </p>
                </div>
              ) : (
                filteredRecords.map((record) => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    onOpen={() => setSelectedRecord(record)}
                  />
                ))
              )}
            </section>

            {/* Sidebar */}
            <aside className="space-y-4">
              {/* Timeline */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                <div className="mb-5">
                  <h2 className="font-bold text-slate-900">
                    Care Timeline
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Chronological patient journey
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    ["02 Sep", "OPD consultation", "Hypertension diagnosed"],
                    ["04 Sep", "Lab investigations", "CBC + KFT completed"],
                    ["05 Sep", "ECG", "No acute abnormality noted"],
                    ["06 Sep", "Chest X-Ray", "Radiology report pending"],
                    ["07 Sep", "Specialist admission", "SMS Hospital"],
                    ["09 Sep", "Discharge", "Stable condition"],
                    ["15 Sep", "Follow-up due", "Outpatient review"],
                  ].map(([date, title, subtitle], index) => (
                    <div key={title} className="relative flex gap-3">
                      {index !== 6 && (
                        <div className="absolute left-[7px] top-5 h-full w-px bg-slate-200" />
                      )}

                      <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-teal-100 bg-teal-600" />

                      <div className="min-w-0">
                        <div className="text-xs font-bold text-teal-700">
                          {date}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-slate-800">
                          {title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Emergency / profile */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                <h2 className="font-bold text-slate-900">
                  Emergency Information
                </h2>

                <div className="mt-4 space-y-3">
                  <InfoRow label="Blood Group" value={patient.bloodGroup} />
                  <InfoRow
                    label="Allergy"
                    value={patient.allergies.join(", ")}
                    danger
                  />
                  <InfoRow
                    label="Emergency Contact"
                    value={patient.emergencyContact}
                  />
                </div>
              </section>

              {/* Data notice */}
              <section className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5">🔐</div>
                  <div>
                    <h3 className="text-sm font-bold text-teal-900">
                      Patient Data Protection
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-teal-800">
                      Demo records are shown for prototype purposes. Production
                      access should be protected by authentication, consent,
                      role-based access and audit logging.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {/* Demo note */}
          <div className="no-print mt-6 text-[11px] text-slate-400">
            Demo clinical records • Production deployment requires ABDM / FHIR R4 clinical compliance.
          </div>
        </div>
      </div>

      {/* Record modal */}
      {selectedRecord && (
        <RecordModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </>
  );
}

/* ---------------- Components ---------------- */

function SummaryStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <div className="mt-0.5 text-[11px] font-medium text-slate-500">
        {label}
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div
        className={`mt-1 text-sm font-semibold ${
          warning ? "text-amber-700" : "text-slate-700"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ClinicalAlert({
  title,
  value,
  description,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  tone: "danger" | "warning" | "info";
}) {
  const classes = {
    danger: "border-red-100 bg-red-50/70",
    warning: "border-amber-100 bg-amber-50/70",
    info: "border-blue-100 bg-blue-50/70",
  };

  const titleClasses = {
    danger: "text-red-800",
    warning: "text-amber-800",
    info: "text-blue-800",
  };

  return (
    <div className={`rounded-2xl border p-4 ${classes[tone]}`}>
      <div className={`text-xs font-bold uppercase tracking-wide ${titleClasses[tone]}`}>
        {title}
      </div>

      <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>

      <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
    </div>
  );
}

function RecordCard({
  record,
  onOpen,
}: {
  record: PatientRecord;
  onOpen: () => void;
}) {
  const meta = categoryMeta[record.category];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl">
            {meta.icon}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                {record.title}
              </h3>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {meta.label}
              </span>

              {record.status && (
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClass(
                    record.status,
                  )}`}
                >
                  {record.status}
                </span>
              )}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {record.date}
              {record.doctor ? ` • ${record.doctor}` : ""}
              {record.facility ? ` • ${record.facility}` : ""}
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {record.summary}
            </p>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="shrink-0 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
        >
          View Details
        </button>
      </div>

      <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {record.details.slice(0, 3).map((detail) => (
          <div key={detail.label} className="rounded-lg bg-slate-50 px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {detail.label}
            </div>
            <div className="mt-0.5 text-xs font-semibold text-slate-700">
              {detail.value}
            </div>
          </div>
        ))}
      </div>
    </article>
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
      <span className="text-xs text-slate-500">{label}</span>
      <span
        className={`text-right text-xs font-semibold ${
          danger ? "text-red-700" : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function RecordModal({
  record,
  onClose,
}: {
  record: PatientRecord;
  onClose: () => void;
}) {
  const meta = categoryMeta[record.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-lg">
              {meta.icon}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {record.title}
                </h2>

                {record.status && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClass(
                      record.status,
                    )}`}
                  >
                    {record.status}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {record.date}
                {record.facility ? ` • ${record.facility}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5">
          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Summary
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {record.summary}
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold text-slate-900">
              Clinical Details
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {record.details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {detail.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(record.doctor || record.facility) && (
            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">
                Care Information
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {record.doctor && (
                  <InfoRow label="Doctor / Team" value={record.doctor} />
                )}
                {record.facility && (
                  <InfoRow label="Facility" value={record.facility} />
                )}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}