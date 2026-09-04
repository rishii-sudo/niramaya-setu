"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageSelector from "../../components/LanguageSelector";
import { logoutUser } from "../../utils/auth";

const patient = {
  name: "Ramesh Kumar",
  id: "NS-10284",
  age: 54,
  gender: "Male",
  village: "Rampura",
};

const visits = [
  {
    date: "03 Sep 2026",
    type: "Field Follow-up",
    facility: "Rampura Field Visit",
    provider: "ASHA / ANM",
    status: "Completed",
    complaint: "Referral follow-up and general condition review",
  },
  {
    date: "01 Sep 2026",
    type: "Home Visit",
    facility: "Rampura",
    provider: "ASHA / ANM",
    status: "Completed",
    complaint: "Follow-up after referral creation",
  },
  {
    date: "02 Sep 2026",
    type: "Referral",
    facility: "SMS Hospital",
    provider: "Referral Desk",
    status: "In-Transit",
    complaint: "Cardiology evaluation required",
  },
];

const diagnoses = [
  {
    name: "Hypertension",
    date: "01 Sep 2026",
    status: "Ongoing",
  },
  {
    name: "Cardiac risk assessment",
    date: "02 Sep 2026",
    status: "Under Review",
  },
];

const medicines = [
  {
    name: "Amlodipine",
    dose: "5 mg",
    frequency: "Once daily",
    duration: "30 days",
  },
  {
    name: "Aspirin",
    dose: "75 mg",
    frequency: "Once daily",
    duration: "30 days",
  },
];

const labResults = [
  {
    test: "Blood Pressure",
    result: "128/82 mmHg",
    date: "03 Sep 2026",
    status: "Normal range",
  },
  {
    test: "SpO₂",
    result: "98%",
    date: "03 Sep 2026",
    status: "Stable",
  },
  {
    test: "Pulse",
    result: "78 bpm",
    date: "03 Sep 2026",
    status: "Stable",
  },
  {
    test: "Temperature",
    result: "98.4 °F",
    date: "03 Sep 2026",
    status: "Normal",
  },
];

export default function PatientRecordsPage() {
  const router = useRouter();

  const handleLogout = () => {
    const target = logoutUser("patient");
    router.push(target);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
           ================================================= */}
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">
              <Link
                href="/patient"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                aria-label="Back to patient portal"
              >
                ←
              </Link>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  NIRAMAYA-SETU
                </p>

                <p className="text-[10px] text-slate-500">
                  Patient Health Portal
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <PatientNav
                href="/patient"
                label="My Health"
              />

              <PatientNav
                href="/patient/records"
                label="Records"
                active
              />

              <PatientNav
                href="/patient/progress"
                label="Progress"
              />

              <PatientNav
                href="/patient/documents"
                label="Documents"
              />

              <PatientNav
                href="/appointments"
                label="Appointments"
              />

              <PatientNav
                href="/patient/medicines"
                label="Medicines"
              />

              <LanguageSelector className="ml-1" />

              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
              >
                Sign out
              </button>
            </nav>
          </div>
        </header>

        {/* =================================================
            PAGE TITLE
           ================================================= */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                My Health
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                My Health Records
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                View your recorded visits, diagnoses, medicines and recent
                health measurements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/patient/documents"
                className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
              >
                Download Documents
              </Link>

              <Link
                href="/patient/progress"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Progress
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================
            PATIENT SUMMARY
           ================================================= */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                RK
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                  Patient Record
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {patient.id} • {patient.age} yrs • {patient.gender} •{" "}
                  {patient.village}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <SummaryMetric
                label="Visits"
                value="03"
              />

              <SummaryMetric
                label="Diagnoses"
                value="02"
              />

              <SummaryMetric
                label="Medicines"
                value="02"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            VITALS
           ================================================= */}
        <section className="mb-6">
          <SectionHeading
            title="Latest Health Measurements"
            subtitle="Most recently recorded measurements in your patient record."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {labResults.map((item) => (
              <MeasurementCard
                key={item.test}
                item={item}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            MAIN GRID
           ================================================= */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

          {/* VISITS */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Visit History
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your recent recorded healthcare interactions.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {visits.map((visit) => (
                <div
                  key={`${visit.date}-${visit.type}`}
                  className="p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                      {visit.date.slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {visit.type}
                        </p>

                        <span
                          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                            visit.status === "In-Transit"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {visit.status}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {visit.date} • {visit.facility}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {visit.complaint}
                      </p>

                      <p className="mt-2 text-[10px] text-slate-400">
                        Recorded by:{" "}
                        <span className="font-semibold text-slate-500">
                          {visit.provider}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DIAGNOSES */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Diagnoses
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Diagnoses currently associated with your record.
              </p>
            </div>

            <div className="space-y-3 p-5">
              {diagnoses.map((diagnosis) => (
                <div
                  key={diagnosis.name}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {diagnosis.name}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Recorded {diagnosis.date}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-700">
                      {diagnosis.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =================================================
            MEDICINES
           ================================================= */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Medicines
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Current medicines recorded in your care plan.
            </p>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-2">
            {medicines.map((medicine) => (
              <div
                key={medicine.name}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    +
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {medicine.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {medicine.dose} • {medicine.frequency}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[10px] text-slate-400">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {medicine.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            LAB / MEASUREMENTS TABLE
           ================================================= */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Recorded Measurements
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Recent measurements available in your record.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-slate-50/70">
                <tr>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Measurement
                  </th>

                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Result
                  </th>

                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </th>

                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {labResults.map((item) => (
                  <tr
                    key={`${item.test}-${item.date}`}
                    className="hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-4 text-xs font-semibold text-slate-800">
                      {item.test}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-700">
                      {item.result}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {item.date}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            PRIVACY
           ================================================= */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <PrivacyCard
            title="Patient-owned view"
            text="This workspace is designed to show your own authorized health information."
          />

          <PrivacyCard
            title="Consent-aware"
            text="Sharing of sensitive information should follow your recorded consent."
            amber
          />

          <PrivacyCard
            title="Downloadable"
            text="Authorized health records and summaries can be downloaded from My Documents."
            blue
          />
        </section>

        {/* =================================================
            PROTOTYPE
           ================================================= */}
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
              Prototype patient records: the information shown here is
              demonstration data. Production records should be loaded only
              after authenticated patient access and authorization checks.
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

function PatientNav({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
        active
          ? "bg-teal-50 text-teal-800"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}

function SummaryMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-center">
      <p className="text-lg font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

function MeasurementCard({
  item,
}: {
  item: {
    test: string;
    result: string;
    date: string;
    status: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {item.test}
      </p>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {item.result}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[10px] text-slate-400">
          {item.date}
        </p>

        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
          {item.status}
        </span>
      </div>
    </div>
  );
}

function PrivacyCard({
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
    ? "border-amber-200 bg-amber-50/70"
    : blue
    ? "border-blue-200 bg-blue-50/70"
    : "border-slate-200 bg-white/90";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-wide ${label}`}
      >
        Patient Access
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