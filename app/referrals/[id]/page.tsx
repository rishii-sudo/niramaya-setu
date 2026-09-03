"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  FileText,
  Hospital,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { getAllReferralStates } from "@/app/data/referralState";

type ReferralPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ReferralStatus =
  | "Created"
  | "In Transit"
  | "Received"
  | "Under Treatment"
  | "Discharged"
  | "Closed";

type TimelineStatus = "completed" | "current" | "pending";

type TimelineItem = {
  title: string;
  date: string;
  description: string;
  status: TimelineStatus;
};

type ReferralRecord = {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  from: string;
  to: string;
  department: string;
  priority: "Routine" | "Urgent" | "Emergency";
  status: ReferralStatus;
  created: string;
  reason: string;
  notes: string;
  noShow: boolean;
};

const referrals: Record<string, ReferralRecord> = {
  "NS-28491": {
    id: "NS-28491",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    from: "PHC Bassi",
    to: "District Hospital Jaipur",
    department: "Cardiology",
    priority: "Routine",
    status: "In Transit",
    created: "28 Aug 2026",
    reason: "Cardiology consultation",
    notes:
      "Patient assessed at PHC Bassi and referred for specialist cardiology consultation.",
    noShow: false,
  },

  "NS-28478": {
    id: "NS-28478",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    age: 46,
    gender: "Female",
    from: "PHC Chomu",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Urgent",
    status: "Received",
    created: "27 Aug 2026",
    reason: "General medicine consultation",
    notes:
      "Follow-up required for diabetes and hypertension management.",
    noShow: false,
  },

  "NS-28461": {
    id: "NS-28461",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    age: 61,
    gender: "Male",
    from: "PHC Bagru",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Routine",
    status: "Closed",
    created: "25 Aug 2026",
    reason: "Routine specialist review",
    notes:
      "Routine review completed and care plan communicated back to the referring facility.",
    noShow: false,
  },

  "NS-28432": {
    id: "NS-28432",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
    age: 58,
    gender: "Female",
    from: "PHC Sanganer",
    to: "District Hospital Jaipur",
    department: "Orthopedics",
    priority: "Urgent",
    status: "Discharged",
    created: "22 Aug 2026",
    reason: "Orthopedic consultation",
    notes:
      "Orthopedic consultation completed and treatment plan issued.",
    noShow: false,
  },
};

const statusOrder: ReferralStatus[] = [
  "Created",
  "In Transit",
  "Received",
  "Under Treatment",
  "Discharged",
  "Closed",
];

function getSharedStatus(
  referral: ReferralRecord,
  referralStates: Record<string, string>
): ReferralStatus {
  const state =
    referralStates[referral.patientId] ??
    referralStates[referral.id];

  if (
    state === "Created" ||
    state === "In Transit" ||
    state === "Received" ||
    state === "Under Treatment" ||
    state === "Discharged" ||
    state === "Closed"
  ) {
    return state;
  }

  return referral.status;
}

function getTimeline(
  referral: ReferralRecord,
  status: ReferralStatus
): TimelineItem[] {
  const currentIndex = statusOrder.indexOf(status);

  const descriptions: Record<
    ReferralStatus,
    string
  > = {
    Created:
      "Referral created by ASHA / ANM at the source facility.",
    "In Transit":
      "Patient is travelling from the source facility to the receiving facility.",
    Received:
      "Receiving facility has confirmed patient arrival.",
    "Under Treatment":
      "Clinical treatment is active at the receiving facility.",
    Discharged:
      "Patient has been discharged with treatment and follow-up instructions.",
    Closed:
      "Referral closed after completion of the care journey.",
  };

  const dates: Record<
    ReferralStatus,
    string
  > = {
    Created: `${referral.created} • 09:30 AM`,
    "In Transit": `${referral.created} • 10:15 AM`,
    Received: "Confirmed",
    "Under Treatment": "Confirmed",
    Discharged: "Confirmed",
    Closed: "Confirmed",
  };

  return statusOrder.map((step, index) => {
    if (index < currentIndex) {
      return {
        title: step,
        date: dates[step],
        description: descriptions[step],
        status: "completed",
      };
    }

    if (index === currentIndex) {
      return {
        title: step,
        date: dates[step],
        description: descriptions[step],
        status: "current",
      };
    }

    return {
      title: step,
      date: "Pending",
      description:
        step === "Closed"
          ? "Referral closes after completion of treatment and follow-up."
          : descriptions[step],
      status: "pending",
    };
  });
}

function statusDescription(
  status: ReferralStatus
) {
  switch (status) {
    case "Created":
      return "Referral has been created and is awaiting patient movement.";

    case "In Transit":
      return "The patient is currently travelling to the receiving facility.";

    case "Received":
      return "The receiving facility has confirmed patient arrival.";

    case "Under Treatment":
      return "The patient is currently under clinical treatment.";

    case "Discharged":
      return "The patient has completed the current treatment episode and has been discharged.";

    case "Closed":
      return "This referral journey has been completed and closed.";

    default:
      return "The referral is progressing through the care journey.";
  }
}

function statusBadgeClass(status: ReferralStatus) {
  switch (status) {
    case "Closed":
      return "bg-slate-100 text-slate-700";

    case "Received":
      return "bg-teal-50 text-teal-700";

    case "Under Treatment":
      return "bg-purple-50 text-purple-700";

    case "Discharged":
      return "bg-emerald-50 text-emerald-700";

    case "Created":
      return "bg-slate-100 text-slate-700";

    case "In Transit":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function priorityBadgeClass(
  priority: ReferralRecord["priority"]
) {
  if (priority === "Emergency") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "Urgent") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

export default function ReferralDetailPage({
  params,
}: ReferralPageProps) {
  const { id } = use(params);

  const [referralStates, setReferralStates] = useState<
    Record<string, string>
  >({});

  const baseReferral = referrals[id];

  useEffect(() => {
    const syncReferralState = () => {
      setReferralStates(getAllReferralStates());
    };

    syncReferralState();

    window.addEventListener(
      "focus",
      syncReferralState
    );

    document.addEventListener(
      "visibilitychange",
      syncReferralState
    );

    return () => {
      window.removeEventListener(
        "focus",
        syncReferralState
      );

      document.removeEventListener(
        "visibilitychange",
        syncReferralState
      );
    };
  }, []);

  const referral = useMemo(() => {
    if (!baseReferral) {
      return null;
    }

    const currentStatus = getSharedStatus(
      baseReferral,
      referralStates
    );

    return {
      ...baseReferral,
      status: currentStatus,
      timeline: getTimeline(
        baseReferral,
        currentStatus
      ),
    };
  }, [baseReferral, referralStates]);

  if (!referral) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Referral not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No referral record exists for ID #{id}.
          </p>

          <Link
            href="/referrals"
            className="mt-6 inline-flex rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Back to Referrals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/referrals"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Referrals
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck
              size={17}
              className="text-teal-700"
            />
            Consent-based referral access
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              REFERRAL DETAIL
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Referral #{referral.id}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Referral created on {referral.created}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusBadgeClass(
                referral.status
              )}`}
            >
              {referral.status}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${priorityBadgeClass(
                referral.priority
              )}`}
            >
              {referral.priority}
            </span>
          </div>
        </div>

        {/* Current status */}
        <section className="mt-6 rounded-3xl border border-teal-100 bg-teal-50/60 p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Current Status
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {referral.status}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {statusDescription(referral.status)}
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-white px-5 py-4 shadow-sm">
              <p className="text-xs text-slate-400">
                Patient
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {referral.patientName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {referral.patientId}
              </p>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left */}
          <div className="space-y-6">

            {/* Patient Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <UserRound size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Patient Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    Patient linked to this referral
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Patient"
                  value={referral.patientName}
                />

                <Detail
                  label="NIRAMAYA Patient ID"
                  value={referral.patientId}
                />

                <Detail
                  label="Age / Gender"
                  value={`${referral.age} / ${referral.gender}`}
                />

                <Detail
                  label="Referral Reason"
                  value={referral.reason}
                />

                <Detail
                  label="Department"
                  value={referral.department}
                />

                <Detail
                  label="Priority"
                  value={referral.priority}
                />
              </div>

              <div className="mt-5">
                <Link
                  href={`/patients/${referral.patientId}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-slate-50"
                >
                  View Patient Profile
                  <ArrowLeft
                    size={15}
                    className="rotate-180"
                  />
                </Link>
              </div>
            </section>

            {/* Referral Route */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Hospital size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Referral Route
                  </h2>

                  <p className="text-xs text-slate-500">
                    Sending and receiving facilities
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <Facility
                  label="Referring Facility"
                  name={referral.from}
                />

                <div className="flex justify-center text-slate-400">
                  <ArrowLeft
                    size={22}
                    className="rotate-180"
                  />
                </div>

                <Facility
                  label="Receiving Facility"
                  name={referral.to}
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <Detail
                  label="Department"
                  value={referral.department}
                />

                <Detail
                  label="Priority"
                  value={referral.priority}
                />

                <Detail
                  label="Referral ID"
                  value={referral.id}
                />
              </div>
            </section>

            {/* Clinical Notes */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Clinical Notes
                  </h2>

                  <p className="text-xs text-slate-500">
                    Information shared with the receiving facility
                  </p>
                </div>
              </div>

              <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {referral.notes}
              </p>
            </section>

            {/* Referral Lifecycle */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Clock3 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Referral Lifecycle
                  </h2>

                  <p className="text-xs text-slate-500">
                    Live closed-loop care journey
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {referral.timeline.map(
                  (step, index) => (
                    <div
                      key={step.title}
                      className={`rounded-2xl border p-4 ${
                        step.status === "current"
                          ? "border-teal-200 bg-teal-50/50"
                          : step.status === "completed"
                            ? "border-slate-200 bg-white"
                            : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                            step.status === "completed"
                              ? "border-teal-700 bg-teal-700 text-white"
                              : step.status === "current"
                                ? "border-teal-600 bg-white text-teal-700"
                                : "border-slate-300 bg-white text-slate-400"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <Check size={15} />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p
                              className={`text-sm font-semibold ${
                                step.status === "pending"
                                  ? "text-slate-400"
                                  : "text-slate-900"
                              }`}
                            >
                              {step.title}
                            </p>

                            {step.status === "current" && (
                              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
                                CURRENT
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {step.date}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Current Referral State */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Current Referral State
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {referral.status}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {statusDescription(referral.status)}
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-teal-700 transition-all duration-500"
                  style={{
                    width: `${
                      (statusOrder.indexOf(
                        referral.status
                      ) /
                        (statusOrder.length - 1)) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>Created</span>
                <span>Closed</span>
              </div>
            </section>

            {/* Referral Journey */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Clock3 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Referral Journey
                  </h2>

                  <p className="text-xs text-slate-500">
                    Live lifecycle status
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-0">
                {referral.timeline.map(
                  (step, index) => (
                    <TimelineStep
                      key={step.title}
                      title={step.title}
                      date={step.date}
                      description={step.description}
                      status={step.status}
                      isLast={
                        index ===
                        referral.timeline.length - 1
                      }
                    />
                  )
                )}
              </div>
            </section>

            {/* 48 Hour Follow-up */}
            <section
              className={`rounded-2xl border p-6 shadow-sm ${
                referral.noShow
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    referral.noShow
                      ? "bg-amber-100 text-amber-700"
                      : "bg-teal-50 text-teal-700"
                  }`}
                >
                  {referral.noShow ? (
                    <Clock3 size={20} />
                  ) : (
                    <Check size={20} />
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    48-hour Follow-up
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {referral.noShow
                      ? "Patient arrival has crossed the expected window. ASHA follow-up is required."
                      : referral.status === "Closed"
                        ? "Referral is closed. Community follow-up can continue through the assigned care worker."
                        : "No 48-hour no-show alert is currently active for this referral."}
                  </p>
                </div>
              </div>
            </section>

            {/* Access & Audit */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Access & Audit
              </h2>

              <div className="mt-5 space-y-4">
                <AuditRow
                  label="Access mode"
                  value="Consent-based"
                />

                <AuditRow
                  label="Referral token"
                  value="Secure / short-lived"
                />

                <AuditRow
                  label="Clinical data in QR"
                  value="Not exposed"
                />

                <AuditRow
                  label="Current status"
                  value={referral.status}
                />
              </div>
            </section>

            {/* Secure access */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Secure referral access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Patient information is intended for the
                    authorized care workflow. QR payloads should
                    contain only a referral identifier and a
                    short-lived signed token.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Prototype notice */}
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-900">
            Prototype Notice
          </p>

          <p className="mt-1 text-sm leading-6 text-amber-800">
            Referral information shown here uses mock frontend
            data. The lifecycle status is synchronized with the
            current prototype referral state stored in the browser.
            Production implementation requires authenticated
            backend persistence, RBAC, consent enforcement,
            signed referral tokens and server-side audit logging.
          </p>
        </section>
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Facility({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-900">
        <MapPin
          size={16}
          className="mt-0.5 shrink-0 text-teal-700"
        />

        {name}
      </p>
    </div>
  );
}

function TimelineStep({
  title,
  date,
  description,
  status,
  isLast,
}: {
  title: string;
  date: string;
  description: string;
  status: TimelineStatus;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
            status === "completed"
              ? "border-teal-700 bg-teal-700 text-white"
              : status === "current"
                ? "border-teal-600 bg-teal-50 text-teal-700"
                : "border-slate-300 bg-white text-slate-400"
          }`}
        >
          {status === "completed" ? (
            <Check size={17} />
          ) : status === "current" ? (
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
          ) : (
            <Clock3 size={15} />
          )}
        </div>

        {!isLast && (
          <div
            className={`mt-1 min-h-10 w-px ${
              status === "completed"
                ? "bg-teal-600"
                : "bg-slate-200"
            }`}
          />
        )}
      </div>

      <div className="pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-sm font-semibold ${
              status === "pending"
                ? "text-slate-400"
                : status === "current"
                  ? "text-teal-700"
                  : "text-slate-900"
            }`}
          >
            {title}
          </p>

          {status === "current" && (
            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
              CURRENT
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-400">
          {date}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function AuditRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-right text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}