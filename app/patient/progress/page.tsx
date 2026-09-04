"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageSelector from "../../components/LanguageSelector";
import { logoutUser } from "../../utils/auth";

const patient = {
  name: "Ramesh Kumar",
  id: "NS-10284",
  age: 54,
  village: "Rampura",
  referralId: "REF-24017",
  nextFollowUp: "08 Sep 2026",
};

const progressStats = [
  {
    label: "Overall Care",
    value: "68%",
    detail: "Care journey completed",
    type: "teal",
  },
  {
    label: "Follow-ups",
    value: "2 / 3",
    detail: "Follow-ups completed",
    type: "blue",
  },
  {
    label: "Referral",
    value: "Active",
    detail: "Currently in-transit",
    type: "amber",
  },
  {
    label: "Treatment",
    value: "Pending",
    detail: "Awaiting facility update",
    type: "slate",
  },
];

const bpData = [
  { date: "28 Aug", value: 146, label: "146/94" },
  { date: "01 Sep", value: 138, label: "138/88" },
  { date: "03 Sep", value: 128, label: "128/82" },
];

const spo2Data = [
  { date: "28 Aug", value: 95, label: "95%" },
  { date: "01 Sep", value: 96, label: "96%" },
  { date: "03 Sep", value: 98, label: "98%" },
];

const milestones = [
  {
    title: "Patient Registration",
    detail: "Patient profile created in NIRAMAYA-SETU",
    date: "28 Aug 2026",
    status: "completed",
  },
  {
    title: "Initial Field Assessment",
    detail: "Vitals and condition recorded",
    date: "01 Sep 2026",
    status: "completed",
  },
  {
    title: "Specialist Referral",
    detail: "Cardiology referral created",
    date: "02 Sep 2026",
    status: "completed",
  },
  {
    title: "Facility Confirmation",
    detail: "Destination facility arrival confirmation",
    date: "In progress",
    status: "current",
  },
  {
    title: "Specialist Treatment",
    detail: "Treatment details will appear after consultation",
    date: "Pending",
    status: "pending",
  },
  {
    title: "Follow-up Completion",
    detail: "Next field follow-up scheduled",
    date: "08 Sep 2026",
    status: "pending",
  },
];

export default function PatientProgressPage() {
  const router = useRouter();

  const handleLogout = () => {
    const target = logoutUser("patient");
    router.push(target);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
           ===================================================== */}
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
              <PatientNav href="/patient" label="My Health" />

              <PatientNav
                href="/patient/records"
                label="Records"
              />

              <PatientNav
                href="/patient/progress"
                label="Progress"
                active
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

        {/* =====================================================
            TITLE
           ===================================================== */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                My Health
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                My Progress
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Track how your health measurements and care journey are
                progressing over time.
              </p>
            </div>

            <Link
              href="/patient/documents"
              className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
            >
              Download Health Summary
            </Link>
          </div>
        </section>

        {/* =====================================================
            PATIENT SUMMARY
           ===================================================== */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                RK
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                  Patient Progress
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {patient.id} • {patient.age} yrs • {patient.village}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-wide text-blue-600">
                Current Referral
              </p>

              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {patient.referralId}
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                Follow-up: {patient.nextFollowUp}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            OVERALL PROGRESS
           ===================================================== */}
        <section className="mb-7">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Care Progress
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Current status across your NIRAMAYA-SETU care journey.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {progressStats.map((item) => (
              <ProgressMetric
                key={item.label}
                label={item.label}
                value={item.value}
                detail={item.detail}
                type={item.type}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            HEALTH TRENDS
           ===================================================== */}
        <div className="grid gap-6 xl:grid-cols-2">

          {/* Blood Pressure */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Blood Pressure Trend
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent systolic readings.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                  IMPROVING
                </span>
              </div>
            </div>

            <div className="p-5">
              <TrendChart
                data={bpData}
                min={120}
                max={155}
                unit="mmHg"
              />

              <div className="mt-4 grid grid-cols-3 gap-2">
                {bpData.map((item) => (
                  <TrendValue
                    key={item.date}
                    date={item.date}
                    value={item.label}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SpO2 */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    SpO₂ Trend
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent oxygen saturation readings.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                  STABLE
                </span>
              </div>
            </div>

            <div className="p-5">
              <TrendChart
                data={spo2Data}
                min={93}
                max={100}
                unit="%"
              />

              <div className="mt-4 grid grid-cols-3 gap-2">
                {spo2Data.map((item) => (
                  <TrendValue
                    key={item.date}
                    date={item.date}
                    value={item.label}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            CARE JOURNEY
           ===================================================== */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Care Journey Progress
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your care milestones from registration to follow-up.
                </p>
              </div>

              <span className="rounded-full bg-teal-50 px-3 py-1 text-[9px] font-bold text-teal-700">
                68% COMPLETE
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* Progress bar */}
            <div className="mb-7">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-500">
                  Journey completion
                </span>

                <span className="font-bold text-teal-700">
                  68%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-700"
                  style={{ width: "68%" }}
                />
              </div>
            </div>

            <div className="space-y-0">
              {milestones.map((item, index) => (
                <div key={item.title}>
                  <MilestoneItem item={item} />

                  {index < milestones.length - 1 && (
                    <div className="ml-[18px] h-6 border-l border-dashed border-slate-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FOLLOW-UP PROGRESS
           ===================================================== */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">

          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Follow-up Progress
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your recorded follow-up activity.
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-6">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[10px] border-teal-100">
                  <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-teal-700 border-r-teal-700 border-b-teal-700 -rotate-12" />

                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">
                      67%
                    </p>

                    <p className="text-[9px] text-slate-400">
                      complete
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    2 of 3 follow-ups
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Two follow-up interactions have been recorded in your
                    current care journey.
                  </p>

                  <p className="mt-3 text-[10px] font-semibold text-amber-700">
                    Next follow-up: {patient.nextFollowUp}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Health interpretation */}
          <section className="rounded-2xl border border-teal-100 bg-teal-50/60 shadow-sm">
            <div className="border-b border-teal-100 px-5 py-4">
              <h2 className="font-semibold text-teal-950">
                Recent Progress
              </h2>

              <p className="mt-1 text-xs text-teal-800">
                A simple view of recent changes in your recorded information.
              </p>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <ProgressObservation
                title="Blood Pressure"
                value="146/94 → 128/82"
                detail="Recent systolic and diastolic readings are lower."
                positive
              />

              <ProgressObservation
                title="SpO₂"
                value="95% → 98%"
                detail="Recent oxygen saturation readings are higher."
                positive
              />

              <ProgressObservation
                title="Pulse"
                value="82 → 78 bpm"
                detail="Recent pulse reading is lower."
                positive
              />

              <ProgressObservation
                title="Referral"
                value="In-Transit"
                detail="Facility arrival confirmation is still pending."
              />
            </div>
          </section>
        </div>

        {/* =====================================================
            ACTIONS
           ===================================================== */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <ActionCard
            title="View Records"
            detail="Open complete health records"
            href="/patient/records"
          />

          <ActionCard
            title="Track Referral"
            detail="See referral status and destination"
            href={`/referrals/${patient.referralId}`}
          />

          <ActionCard
            title="Download Summary"
            detail="Get an authorized PDF summary"
            href="/patient/documents"
          />
        </section>

        {/* =====================================================
            PROTOTYPE
           ===================================================== */}
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
              Patient progress prototype: trend values, milestone status and
              care completion percentages currently use demonstration data.
              Production interpretations should be generated from verified
              clinical records and should not be treated as medical advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   NAV
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

/* =========================================================
   METRIC
   ========================================================= */

function ProgressMetric({
  label,
  value,
  detail,
  type,
}: {
  label: string;
  value: string;
  detail: string;
  type: string;
}) {
  const styles: Record<
    string,
    {
      border: string;
      icon: string;
      value: string;
    }
  > = {
    teal: {
      border: "border-teal-200",
      icon: "bg-teal-50 text-teal-700",
      value: "text-teal-800",
    },
    blue: {
      border: "border-blue-200",
      icon: "bg-blue-50 text-blue-700",
      value: "text-blue-800",
    },
    amber: {
      border: "border-amber-200",
      icon: "bg-amber-50 text-amber-700",
      value: "text-amber-800",
    },
    slate: {
      border: "border-slate-200",
      icon: "bg-slate-100 text-slate-600",
      value: "text-slate-800",
    },
  };

  const style = styles[type] ?? styles.slate;

  return (
    <div
      className={`rounded-2xl border bg-white/90 p-5 shadow-sm ${style.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className={`mt-3 text-2xl font-bold ${style.value}`}>
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.icon}`}
        >
          ✓
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {detail}
      </p>
    </div>
  );
}

/* =========================================================
   CHART
   ========================================================= */

function TrendChart({
  data,
  min,
  max,
  unit,
}: {
  data: {
    date: string;
    value: number;
    label: string;
  }[];
  min: number;
  max: number;
  unit: string;
}) {
  const width = 560;
  const height = 220;
  const paddingX = 44;
  const paddingY = 24;

  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const points = data.map((item, index) => {
    const x =
      paddingX +
      (index / Math.max(data.length - 1, 1)) * innerWidth;

    const normalized =
      (item.value - min) / (max - min);

    const y =
      height -
      paddingY -
      normalized * innerHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const path = points
    .map((point, index) =>
      index === 0
        ? `M ${point.x} ${point.y}`
        : `L ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 p-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[230px] w-full"
        role="img"
        aria-label={`${unit} trend chart`}
      >
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((index) => {
          const y =
            paddingY +
            (index / 4) * innerHeight;

          const value =
            max -
            (index / 4) * (max - min);

          return (
            <g key={index}>
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              <text
                x="8"
                y={y + 4}
                fontSize="10"
                fill="#94a3b8"
              >
                {Math.round(value)}
              </text>
            </g>
          );
        })}

        {/* Trend line */}
        <path
          d={path}
          fill="none"
          stroke="#0b8f86"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point) => (
          <g key={`${point.date}-${point.value}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="7"
              fill="white"
              stroke="#0b8f86"
              strokeWidth="3"
            />

            <text
              x={point.x}
              y={point.y - 14}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#334155"
            >
              {point.label}
            </text>

            <text
              x={point.x}
              y={height - 5}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
            >
              {point.date}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* =========================================================
   TREND VALUE
   ========================================================= */

function TrendValue({
  date,
  value,
}: {
  date: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-center">
      <p className="text-[9px] text-slate-400">
        {date}
      </p>

      <p className="mt-1 text-xs font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MILESTONE
   ========================================================= */

function MilestoneItem({
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
              completed
                ? "text-slate-800"
                : current
                ? "text-teal-900"
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
   OBSERVATION
   ========================================================= */

function ProgressObservation({
  title,
  value,
  detail,
  positive = false,
}: {
  title: string;
  value: string;
  detail: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-teal-100 bg-white/70 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <span
          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {positive ? "Positive trend" : "In progress"}
        </span>
      </div>

      <p className="mt-3 text-sm font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}

/* =========================================================
   ACTION CARD
   ========================================================= */

function ActionCard({
  title,
  detail,
  href,
}: {
  title: string;
  detail: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-600">
          →
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </Link>
  );
}