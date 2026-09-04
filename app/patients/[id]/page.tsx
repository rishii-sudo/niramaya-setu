"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getPatient } from "@/app/data/patientData";

type Status = "Normal" | "Abnormal" | "Pending" | "Active";

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
  referralId: "REF-24017",
  referringFacility: "Primary Health Centre",
  receivingFacility: "SMS Hospital",
  referralReason: "Persistent headache, dizziness and uncontrolled BP",
  referralStatus: "Received",
};

const diagnoses = [
  {
    name: "Hypertension",
    type: "Primary diagnosis",
    status: "Active",
    date: "02 Sep 2026",
    doctor: "Dr. Meera Sharma",
  },
  {
    name: "Mild Anemia",
    type: "Secondary finding",
    status: "Active",
    date: "04 Sep 2026",
    doctor: "District Diagnostic Centre",
  },
];

const vitals = [
  ["Blood Pressure", "158/96", "mmHg"],
  ["Pulse", "84", "bpm"],
  ["Temperature", "98.4", "°F"],
  ["SpO₂", "97", "%"],
  ["Respiratory Rate", "18", "/min"],
  ["Weight", "72", "kg"],
];

const labReports = [
  {
    test: "Complete Blood Count",
    date: "04 Sep 2026",
    status: "Abnormal" as Status,
    finding: "Hemoglobin 10.8 g/dL",
  },
  {
    test: "Kidney Function Test",
    date: "04 Sep 2026",
    status: "Normal" as Status,
    finding: "Creatinine 1.1 mg/dL",
  },
  {
    test: "Blood Glucose",
    date: "04 Sep 2026",
    status: "Normal" as Status,
    finding: "Fasting 96 mg/dL",
  },
];

const diagnostics = [
  {
    name: "12-Lead ECG",
    date: "05 Sep 2026",
    result: "Sinus rhythm, no acute abnormality noted",
    status: "Normal" as Status,
  },
  {
    name: "Chest X-Ray",
    date: "06 Sep 2026",
    result: "Radiology review pending",
    status: "Pending" as Status,
  },
];

const medicines = [
  {
    name: "Amlodipine",
    dose: "5 mg",
    route: "Oral",
    frequency: "Once daily",
    duration: "30 days",
  },
  {
    name: "Paracetamol",
    dose: "500 mg",
    route: "Oral",
    frequency: "As needed",
    duration: "5 days",
  },
];

const surgeries = [
  {
    procedure: "No surgery recorded",
    date: "08 Sep 2026",
    hospital: "SMS Hospital",
    outcome: "Medical management continued",
  },
];

const admissions = [
  {
    id: "ADM-24017",
    date: "07 Sep 2026",
    ward: "Cardiology Observation",
    reason: "Uncontrolled blood pressure + symptoms",
    status: "Discharged",
  },
];

const timeline = [
  {
    date: "02 Sep 2026",
    title: "OPD Consultation",
    description: "Patient assessed for headache, dizziness and elevated BP.",
    tag: "Visit",
  },
  {
    date: "02 Sep 2026",
    title: "Hypertension Diagnosed",
    description: "Primary diagnosis recorded and treatment initiated.",
    tag: "Diagnosis",
  },
  {
    date: "04 Sep 2026",
    title: "Lab Investigations Completed",
    description: "CBC, KFT and blood glucose results added.",
    tag: "Lab",
  },
  {
    date: "05 Sep 2026",
    title: "ECG Completed",
    description: "No acute abnormality noted.",
    tag: "Diagnostic",
  },
  {
    date: "07 Sep 2026",
    title: "Referral Received",
    description: "Patient received at SMS Hospital under referral REF-24017.",
    tag: "Referral",
  },
  {
    date: "07 Sep 2026",
    title: "Specialist Admission",
    description: "Short-stay admission for specialist evaluation.",
    tag: "Admission",
  },
  {
    date: "09 Sep 2026",
    title: "Discharged",
    description: "Patient stable and advised outpatient follow-up.",
    tag: "Discharge",
  },
];

function statusClasses(status: Status) {
  switch (status) {
    case "Normal":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "Abnormal":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "Pending":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "Active":
      return "border-teal-200 bg-teal-50 text-teal-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export default function DoctorPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const found = getPatient(id);
  const patient = found
    ? {
        id: found.patientId,
        name: found.name,
        age: found.age,
        gender: found.gender,
        bloodGroup: found.bloodGroup,
        mobile: found.mobile,
        aadhaar: found.aadhaar,
        abha: found.abhaId,
        allergies: found.allergies.map((a) => a.name),
        chronicConditions: found.chronicConditions.map((c) => c.name),
        emergencyContact: `${found.emergencyContact.name} • ${found.emergencyContact.mobile}`,
        referralId: found.referralId,
        referringFacility: found.referralFrom,
        receivingFacility: found.referralTo,
        referralReason: found.referralReason,
        referralStatus: found.referralStatus,
      }
    : defaultPatient;

  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Medical History",
    "Labs & Diagnostics",
    "Medicines",
    "Admissions & Surgery",
    "Timeline",
  ];

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link
            href="/doctor"
            className="transition hover:text-teal-700"
          >
            Doctor Dashboard
          </Link>

          <span>/</span>

          <Link
            href="/doctor/referrals"
            className="transition hover:text-teal-700"
          >
            Referrals
          </Link>

          <span>/</span>
          <span>Patient {id}</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {patient.name}
              </h1>

              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                {patient.id}
              </span>

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Referral Received
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Complete clinical view for referral and treatment decision-making.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/patients/${id}/records`}
              className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
            >
              Full Medical Records
            </Link>

            <Link
              href={`/doctor/patients/${id}/treatment`}
              className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Start Treatment →
            </Link>
          </div>
        </div>

        {/* Critical alerts */}
        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <ClinicalAlert
            title="Allergy Alert"
            value="Penicillin"
            description="Verify drug allergies before medication orders."
            tone="danger"
          />

          <ClinicalAlert
            title="Current Diagnosis"
            value="Hypertension"
            description="Condition currently under active management."
            tone="warning"
          />

          <ClinicalAlert
            title="Pending Investigation"
            value="Chest X-Ray"
            description="Final radiology review is still pending."
            tone="info"
          />
        </div>

        {/* Patient profile */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-xl font-bold text-teal-700">
                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {patient.age} years • {patient.gender} • Blood Group{" "}
                  {patient.bloodGroup}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  ABHA: {patient.abha}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat label="Diagnoses" value="2" />
              <MiniStat label="Lab Reports" value="3" />
              <MiniStat label="Medicines" value="2" />
              <MiniStat label="Admissions" value="1" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard label="Mobile" value={patient.mobile} />
            <InfoCard label="Aadhaar" value={patient.aadhaar} />
            <InfoCard
              label="Allergy"
              value={patient.allergies.join(", ")}
              danger
            />
            <InfoCard
              label="Chronic Condition"
              value={patient.chronicConditions.join(", ")}
            />
          </div>
        </section>

        {/* Referral card */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-700">
                  Active Referral
                </span>

                <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-xs font-bold text-blue-700">
                  {patient.referralId}
                </span>

                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {patient.referralStatus}
                </span>
              </div>

              <h2 className="mt-2 font-bold text-slate-900">
                {patient.referralReason}
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {patient.referringFacility} → {patient.receivingFacility}
              </p>
            </div>

            <Link
              href={`/referrals/${patient.referralId}`}
              className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              View Referral
            </Link>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
          <div className="overflow-x-auto">
            <div className="flex min-w-max border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3.5 text-xs font-bold transition ${
                    activeTab === tab
                      ? "border-b-2 border-teal-600 text-teal-700"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Vitals */}
            <SectionCard
              title="Latest Vitals"
              subtitle="Most recent recorded observations"
              action="View History"
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {vitals.map(([name, value, unit]) => (
                  <div
                    key={name}
                    className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {name}
                    </div>

                    <div className="mt-2 text-xl font-bold text-slate-900">
                      {value}
                    </div>

                    <div className="text-xs text-slate-500">{unit}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div className="grid gap-6 xl:grid-cols-2">
              {/* Diagnoses */}
              <SectionCard
                title="Current Diagnoses"
                subtitle="Conditions relevant to current treatment"
              >
                <div className="space-y-3">
                  {diagnoses.map((diagnosis) => (
                    <div
                      key={diagnosis.name}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {diagnosis.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {diagnosis.type} • {diagnosis.date}
                          </p>

                          <p className="mt-2 text-xs text-slate-500">
                            Recorded by {diagnosis.doctor}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses(
                            "Active",
                          )}`}
                        >
                          {diagnosis.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Medicines */}
              <SectionCard
                title="Current Medicines"
                subtitle="Active / recently prescribed medication"
              >
                <div className="space-y-3">
                  {medicines.map((medicine) => (
                    <div
                      key={medicine.name}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-lg">
                          💊
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900">
                            {medicine.name} {medicine.dose}
                          </h3>

                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-500">
                            <span>Route: {medicine.route}</span>
                            <span>Frequency: {medicine.frequency}</span>
                            <span>Duration: {medicine.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Latest labs */}
            <SectionCard
              title="Latest Investigations"
              subtitle="Recent laboratory and diagnostic information"
            >
              <InvestigationTable />
            </SectionCard>

            {/* Timeline preview */}
            <SectionCard
              title="Recent Care Timeline"
              subtitle="Most recent patient events"
              action="View Full Timeline"
              onAction={() => setActiveTab("Timeline")}
            >
              <Timeline compact />
            </SectionCard>
          </div>
        )}

        {/* MEDICAL HISTORY */}
        {activeTab === "Medical History" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              title="Known Conditions"
              subtitle="Recorded medical history"
            >
              <div className="space-y-3">
                {patient.chronicConditions.map((condition) => (
                  <HistoryItem
                    key={condition}
                    title={condition}
                    description="Chronic condition requiring ongoing monitoring."
                    date="Recorded 02 Sep 2026"
                  />
                ))}

                <HistoryItem
                  title="No documented cardiac surgery"
                  description="No previous cardiac surgery recorded in available records."
                  date="History review"
                />
              </div>
            </SectionCard>

            <SectionCard title="Allergies" subtitle="Safety-critical information">
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-red-700">
                  Known Drug Allergy
                </div>

                <div className="mt-2 text-lg font-bold text-red-900">
                  Penicillin
                </div>

                <p className="mt-1 text-xs leading-5 text-red-800">
                  Verify reaction details in the full allergy record before
                  medication orders.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Family History">
              <div className="grid gap-3 sm:grid-cols-2">
                <HistoryItem
                  title="Hypertension"
                  description="Reported in first-degree relative."
                />
                <HistoryItem
                  title="Diabetes"
                  description="No documented family history available."
                />
              </div>
            </SectionCard>

            <SectionCard title="Lifestyle & Risk Factors">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Smoking" value="Not recorded" />
                <InfoCard label="Alcohol" value="Not recorded" />
                <InfoCard label="Diet" value="Mixed diet" />
                <InfoCard label="Activity" value="Low activity reported" />
              </div>
            </SectionCard>
          </div>
        )}

        {/* LABS */}
        {activeTab === "Labs & Diagnostics" && (
          <div className="space-y-6">
            <SectionCard
              title="Laboratory Reports"
              subtitle="Recent investigation results"
            >
              <InvestigationTable />
            </SectionCard>

            <SectionCard
              title="Imaging & Diagnostics"
              subtitle="ECG, radiology and other diagnostic studies"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {diagnostics.map((item) => (
                  <DiagnosticCard key={item.name} item={item} patientId={patient.id} />
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* MEDICINES */}
        {activeTab === "Medicines" && (
          <SectionCard
            title="Medication History"
            subtitle="Current and recent prescriptions"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {medicines.map((medicine) => (
                <div
                  key={medicine.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-lg">
                        💊
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {medicine.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {medicine.dose} • {medicine.route}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700">
                      Active
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <DetailBox
                      label="Frequency"
                      value={medicine.frequency}
                    />
                    <DetailBox
                      label="Duration"
                      value={medicine.duration}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* ADMISSIONS & SURGERY */}
        {activeTab === "Admissions & Surgery" && (
          <div className="space-y-6">
            <SectionCard
              title="Hospital Admissions"
              subtitle="Previous and current admission history"
            >
              <div className="space-y-3">
                {admissions.map((admission) => (
                  <div
                    key={admission.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          Specialist Admission
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {admission.id} • {admission.date}
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        {admission.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <DetailBox
                        label="Ward"
                        value={admission.ward}
                      />
                      <DetailBox
                        label="Reason"
                        value={admission.reason}
                      />
                      <DetailBox
                        label="Facility"
                        value="SMS Hospital"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Surgeries & Procedures"
              subtitle="Operative history and procedures"
            >
              {surgeries.map((surgery) => (
                <div
                  key={surgery.procedure}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-lg">
                      🏥
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {surgery.procedure}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {surgery.date} • {surgery.hospital}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        {surgery.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === "Timeline" && (
          <SectionCard
            title="Complete Care Timeline"
            subtitle="Chronological history of patient care"
          >
            <Timeline />
          </SectionCard>
        )}

        {/* Bottom actions */}
        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-teal-900">
                Ready for clinical action?
              </h2>

              <p className="mt-1 text-xs leading-5 text-teal-800">
                Review the available patient information before starting the
                treatment workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/doctor/patients/${id}/treatment`}
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                Open Treatment Workspace →
              </Link>

              <button
                onClick={() => window.print()}
                className="rounded-xl border border-teal-200 bg-white px-5 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-100"
              >
                Print Clinical Summary
              </button>
            </div>
          </div>
        </section>

        <div className="no-print mt-6 text-[11px] text-slate-400">
          Demo clinical summary • Production deployment requires authenticated access and clinical audit logging.
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

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
  const styles = {
    danger: {
      box: "border-red-100 bg-red-50/70",
      title: "text-red-700",
    },
    warning: {
      box: "border-amber-100 bg-amber-50/70",
      title: "text-amber-700",
    },
    info: {
      box: "border-blue-100 bg-blue-50/70",
      title: "text-blue-700",
    },
  };

  const style = styles[tone];

  return (
    <div className={`rounded-2xl border p-4 ${style.box}`}>
      <div className={`text-[10px] font-bold uppercase tracking-wide ${style.title}`}>
        {title}
      </div>

      <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>

      <p className="mt-1 text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-center">
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold text-slate-500">
        {label}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div
        className={`mt-1 text-sm font-semibold ${
          danger ? "text-red-700" : "text-slate-700"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  action,
  onAction,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        {action && (
          <button
            onClick={onAction}
            className="text-xs font-bold text-teal-700 transition hover:text-teal-900"
          >
            {action}
          </button>
        )}
      </div>

      {children}
    </section>
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
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </div>
    </div>
  );
}

function HistoryItem({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      {date && (
        <p className="mt-2 text-[10px] font-semibold text-slate-400">
          {date}
        </p>
      )}
    </div>
  );
}

function InvestigationTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Investigation
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Date
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Result / Finding
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {labReports.map((report) => (
            <tr
              key={report.test}
              className="border-b border-slate-50 last:border-0"
            >
              <td className="px-3 py-4 text-sm font-semibold text-slate-800">
                {report.test}
              </td>

              <td className="px-3 py-4 text-xs text-slate-500">
                {report.date}
              </td>

              <td className="px-3 py-4 text-xs text-slate-600">
                {report.finding}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses(
                    report.status,
                  )}`}
                >
                  {report.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DiagnosticCard({
  item,
  patientId = "NS-10284",
}: {
  item: (typeof diagnostics)[number];
  patientId?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-100 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-xs text-slate-400">{item.date}</p>
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClasses(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {item.result}
      </p>

      <Link
        href={`/patients/${patientId}/records`}
        className="mt-4 inline-flex rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
      >
        View Report
      </Link>
    </div>
  );
}

function Timeline({ compact = false }: { compact?: boolean }) {
  const items = compact ? timeline.slice(-5) : timeline;

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={`${item.date}-${item.title}`} className="relative flex gap-4">
          {index !== items.length - 1 && (
            <div className="absolute left-[7px] top-5 h-full w-px bg-slate-200" />
          )}

          <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-teal-100 bg-teal-600" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-teal-700">
                {item.date}
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                {item.tag}
              </span>
            </div>

            <h3 className="mt-1 text-sm font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}