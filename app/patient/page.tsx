"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutUser } from "../utils/auth";
import LanguageSelector from "../components/LanguageSelector";
import { getDynamicGreeting } from "../utils/timeUtils";
import { useLanguage } from "../context/LanguageContext";

const patient = {
  name: "Ramesh Kumar",
  id: "NS-10284",
  age: 54,
  gender: "Male",
  village: "Rampura",
  mobile: "98XXXXXX21",

  referral: {
    id: "REF-24017",
    facility: "SMS Hospital",
    department: "Cardiology",
    status: "In-Transit",
  },

  nextFollowUp: "08 Sep 2026",
};

const vitals = [
  {
    label: "Blood Pressure",
    value: "128/82",
    unit: "mmHg",
    note: "Previous 138/88",
    state: "Improved",
  },
  {
    label: "SpO₂",
    value: "98",
    unit: "%",
    note: "Previous 96%",
    state: "Stable",
  },
  {
    label: "Pulse",
    value: "78",
    unit: "bpm",
    note: "Previous 82 bpm",
    state: "Stable",
  },
  {
    label: "Temperature",
    value: "98.4",
    unit: "°F",
    note: "Previous 99.1 °F",
    state: "Improved",
  },
];

const journey = [
  {
    title: "Patient Registered",
    detail: "NIRAMAYA-SETU patient profile created",
    date: "28 Aug 2026",
    status: "completed",
  },
  {
    title: "Field Visit",
    detail: "Vitals and patient condition recorded",
    date: "01 Sep 2026",
    status: "completed",
  },
  {
    title: "Referral Created",
    detail: "Cardiology referral created for SMS Hospital",
    date: "02 Sep 2026",
    status: "completed",
  },
  {
    title: "Referral In-Transit",
    detail: "Destination facility arrival awaiting confirmation",
    date: "02 Sep 2026",
    status: "current",
  },
  {
    title: "Treatment",
    detail: "Will appear after receiving facility updates",
    date: "Pending",
    status: "pending",
  },
  {
    title: "Follow-up",
    detail: "Next scheduled care follow-up",
    date: "08 Sep 2026",
    status: "pending",
  },
];

const recentActivity = [
  {
    title: "Field visit recorded",
    detail: "Vitals and referral follow-up information added.",
    date: "03 Sep 2026 • 11:42 PM",
  },
  {
    title: "Referral created",
    detail: "Referral sent to SMS Hospital Cardiology.",
    date: "02 Sep 2026 • 09:20 AM",
  },
  {
    title: "Health record updated",
    detail: "Latest vital measurements were recorded.",
    date: "01 Sep 2026 • 04:15 PM",
  },
  {
    title: "Patient profile created",
    detail: "Your patient record was registered.",
    date: "28 Aug 2026 • 10:20 AM",
  },
];

export default function PatientPage() {
  const { language } = useLanguage();
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const storedMobile = localStorage.getItem(
      "niramaya-patient-mobile"
    );

    if (storedMobile) {
      setMobile(storedMobile);
    }
  }, []);

  const maskedMobile = mobile
    ? `+91 XXXXX${mobile.slice(-4)}`
    : `+91 ${patient.mobile}`;

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =================================================
            PATIENT TOP HEADER
           ================================================= */}
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  NIRAMAYA-SETU
                </p>

                <p className="text-[10px] text-slate-500">
                  Patient Health Portal
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center gap-2">
              <PatientNavItem
                href="/patient"
                label="My Health"
                active
              />

              <PatientNavItem
                href="/patient/records"
                label="Records"
              />

              <PatientNavItem
                href="/patient/progress"
                label="Progress"
              />

              <PatientNavItem
                href="/patient/documents"
                label="Documents"
              />

              <PatientNavItem
                href="/appointments"
                label="Appointments"
              />

              <PatientNavItem
                href="/patient/medicines"
                label="Medicines"
              />

              <LanguageSelector className="ml-1" />

              <button
                type="button"
                onClick={() => logoutUser("patient")}
                className="ml-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
              >
                Sign out
              </button>
            </nav>
          </div>
        </header>

        {/* =================================================
            WELCOME
           ================================================= */}
        <section className="mb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                My Health
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                  RK
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {getDynamicGreeting(language)}, {patient.name}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    {patient.id} • {patient.age} yrs • {patient.gender} •{" "}
                    {patient.village}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                Registered Mobile
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {maskedMobile}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            CARE STATUS
           ================================================= */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-teal-100 bg-white/90 shadow-sm">
          <div className="grid lg:grid-cols-[1fr_auto]">

            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                    Current Care Status
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      Referral In-Transit
                    </h2>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                      {patient.referral.id}
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Your referral to{" "}
                    <span className="font-semibold text-slate-800">
                      {patient.referral.facility}
                    </span>{" "}
                    for{" "}
                    <span className="font-semibold text-slate-800">
                      {patient.referral.department}
                    </span>{" "}
                    is currently being tracked.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/70 p-5 lg:min-w-[220px] lg:border-l lg:border-t-0">
              <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                Next Follow-up
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {patient.nextFollowUp}
              </p>

              <Link
                href="/patient/progress"
                className="mt-2 inline-flex text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                View progress →
              </Link>
            </div>

          </div>
        </section>

        {/* =================================================
            QUICK ACTIONS
           ================================================= */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <PatientAction
            title="My Records"
            text="Vitals, diagnoses, medicines and reports"
            href="/patient/records"
            icon="records"
          />

          <PatientAction
            title="My Referral"
            text="Track referral destination and status"
            href={`/referrals/${patient.referral.id}`}
            icon="referral"
          />

          <PatientAction
            title="My Progress"
            text="Health trends and care milestones"
            href="/patient/progress"
            icon="progress"
          />

          <PatientAction
            title="My Documents"
            text="Download authorized health PDFs"
            href="/patient/documents"
            icon="documents"
          />

        </section>

        {/* =================================================
            HEALTH OVERVIEW
           ================================================= */}
        <section className="mb-7">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Health Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recent measurements from your health record.
              </p>
            </div>

            <Link
              href="/patient/records"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              View complete records →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {vitals.map((item) => (
              <VitalCard
                key={item.label}
                label={item.label}
                value={item.value}
                unit={item.unit}
                note={item.note}
                state={item.state}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
           ================================================= */}
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

          {/* CARE JOURNEY */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    My Care Journey
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Follow your care from registration to follow-up.
                  </p>
                </div>

                <span className="rounded-full bg-teal-50 px-3 py-1 text-[9px] font-bold text-teal-700">
                  CONTINUITY
                </span>
              </div>
            </div>

            <div className="p-5">
              {journey.map((item, index) => (
                <div key={item.title}>
                  <JourneyItem item={item} />

                  {index < journey.length - 1 && (
                    <div className="ml-[18px] h-6 border-l border-dashed border-slate-200" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* REFERRAL CARD */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Current Referral
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your active referral information.
              </p>
            </div>

            <div className="p-5">

              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-blue-600">
                      Referral ID
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                      {patient.referral.id}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-bold text-blue-700">
                    {patient.referral.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <DataRow
                    label="Facility"
                    value={patient.referral.facility}
                  />

                  <DataRow
                    label="Department"
                    value={patient.referral.department}
                  />

                  <DataRow
                    label="Next Follow-up"
                    value={patient.nextFollowUp}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  href={`/referrals/${patient.referral.id}`}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Track Referral
                </Link>

                <Link
                  href={`/referrals/${patient.referral.id}/qr`}
                  className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-center text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
                >
                  Referral QR
                </Link>
              </div>

              <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">
                  Important
                </p>

                <p className="mt-1 text-[11px] leading-5 text-amber-800">
                  Carry your referral information when visiting the assigned
                  facility.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            RECENT ACTIVITY
           ================================================= */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest updates from your care journey.
            </p>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-2">
            {recentActivity.map((item) => (
              <div
                key={`${item.title}-${item.date}`}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.detail}
                    </p>
                  </div>

                  <span className="shrink-0 text-[9px] text-slate-400">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            PATIENT PRIVACY
           ================================================= */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">

          <PrivacyCard
            title="Your Records"
            text="Access your authorized health information, measurements, diagnoses and reports."
          />

          <PrivacyCard
            title="Your Consent"
            text="Information sharing should follow the consent you have provided to authorized care users."
            amber
          />

          <PrivacyCard
            title="Your Documents"
            text="Download authorized summaries and care documents from your patient document center."
            blue
          />

        </section>

        {/* Subtle note */}
        <p className="mt-6 text-[11px] text-slate-400">
          Demo data • Production access enforces backend authentication, authorization and ABDM consent checks.
        </p>

      </div>
    </main>
  );
}

/* =========================================================
   NAV ITEM
   ========================================================= */

function PatientNavItem({
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
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

/* =========================================================
   ACTION CARD
   ========================================================= */

function PatientAction({
  title,
  text,
  href,
  icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: "records" | "referral" | "progress" | "documents";
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <ActionIcon type={icon} />
        </div>

        <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-600">
          →
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </Link>
  );
}

/* =========================================================
   VITAL CARD
   ========================================================= */

function VitalCard({
  label,
  value,
  unit,
  note,
  state,
}: {
  label: string;
  value: string;
  unit: string;
  note: string;
  state: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900">
            {value}
          </span>

          <span className="text-[10px] font-medium text-slate-400">
            {unit}
          </span>
        </div>

        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
          {state}
        </span>
      </div>

      <p className="mt-2 text-[10px] text-slate-400">
        {note}
      </p>
    </div>
  );
}

/* =========================================================
   JOURNEY ITEM
   ========================================================= */

function JourneyItem({
  item,
}: {
  item: {
    title: string;
    detail: string;
    date: string;
    status: string;
  };
}) {
  const completed = item.status === "completed";
  const current = item.status === "current";

  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          completed
            ? "bg-teal-700 text-white"
            : current
            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? "✓" : current ? "●" : "○"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-sm font-semibold ${
              current
                ? "text-teal-900"
                : completed
                ? "text-slate-800"
                : "text-slate-500"
            }`}
          >
            {item.title}
          </p>

          {current && (
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">
              CURRENT
            </span>
          )}
        </div>

        <p className="mt-1 text-[10px] text-slate-400">
          {item.date}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   DATA ROW
   ========================================================= */

function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-right text-xs font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   PRIVACY CARD
   ========================================================= */

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
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
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

/* =========================================================
   ACTION ICON
   ========================================================= */

function ActionIcon({
  type,
}: {
  type: "records" | "referral" | "progress" | "documents";
}) {
  if (type === "records") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    );
  }

  if (type === "referral") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 12h13" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (type === "progress") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 18l5-5 4 3 7-8" />
        <path d="M4 20h17" />
      </svg>
    );
  }

  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}