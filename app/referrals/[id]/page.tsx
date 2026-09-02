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

type ReferralPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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
  status: string;
  created: string;
  reason: string;
  notes: string;
  noShow: boolean;
  timeline: TimelineItem[];
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
    timeline: [
      {
        title: "Referral Created",
        date: "28 Aug 2026 • 09:30 AM",
        description:
          "Referral created by ASHA / ANM at PHC Bassi.",
        status: "completed",
      },
      {
        title: "In Transit",
        date: "28 Aug 2026 • 10:15 AM",
        description:
          "Patient is currently travelling to the receiving facility.",
        status: "current",
      },
      {
        title: "Received",
        date: "Pending",
        description:
          "Receiving facility has not yet confirmed arrival.",
        status: "pending",
      },
      {
        title: "Under Treatment",
        date: "Pending",
        description:
          "Treatment status will update after facility intake.",
        status: "pending",
      },
      {
        title: "Discharged",
        date: "Pending",
        description:
          "Discharge information will appear here.",
        status: "pending",
      },
      {
        title: "Closed",
        date: "Pending",
        description:
          "Referral closes after completion of the care journey.",
        status: "pending",
      },
    ],
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
    timeline: [
      {
        title: "Referral Created",
        date: "27 Aug 2026 • 09:10 AM",
        description:
          "Referral created at PHC Chomu.",
        status: "completed",
      },
      {
        title: "In Transit",
        date: "27 Aug 2026 • 10:00 AM",
        description:
          "Patient travelled to District Hospital Jaipur.",
        status: "completed",
      },
      {
        title: "Received",
        date: "27 Aug 2026 • 12:20 PM",
        description:
          "Receiving facility confirmed patient arrival.",
        status: "current",
      },
      {
        title: "Under Treatment",
        date: "Pending",
        description:
          "Awaiting treatment update.",
        status: "pending",
      },
      {
        title: "Discharged",
        date: "Pending",
        description:
          "Discharge information will appear here.",
        status: "pending",
      },
      {
        title: "Closed",
        date: "Pending",
        description:
          "Referral will close after completion.",
        status: "pending",
      },
    ],
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
    timeline: [
      {
        title: "Referral Created",
        date: "25 Aug 2026 • 09:00 AM",
        description:
          "Referral created at PHC Bagru.",
        status: "completed",
      },
      {
        title: "In Transit",
        date: "25 Aug 2026 • 10:00 AM",
        description:
          "Patient travelled to the district hospital.",
        status: "completed",
      },
      {
        title: "Received",
        date: "25 Aug 2026 • 11:15 AM",
        description:
          "Patient arrival confirmed.",
        status: "completed",
      },
      {
        title: "Under Treatment",
        date: "25 Aug 2026 • 12:00 PM",
        description:
          "Clinical review completed.",
        status: "completed",
      },
      {
        title: "Discharged",
        date: "25 Aug 2026 • 03:00 PM",
        description:
          "Patient discharged with follow-up instructions.",
        status: "completed",
      },
      {
        title: "Closed",
        date: "25 Aug 2026 • 04:00 PM",
        description:
          "Referral closed after completion of care.",
        status: "current",
      },
    ],
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
    timeline: [
      {
        title: "Referral Created",
        date: "22 Aug 2026 • 08:45 AM",
        description:
          "Referral created at PHC Sanganer.",
        status: "completed",
      },
      {
        title: "In Transit",
        date: "22 Aug 2026 • 09:30 AM",
        description:
          "Patient travelled to District Hospital Jaipur.",
        status: "completed",
      },
      {
        title: "Received",
        date: "22 Aug 2026 • 11:00 AM",
        description:
          "Patient arrival confirmed.",
        status: "completed",
      },
      {
        title: "Under Treatment",
        date: "22 Aug 2026 • 11:30 AM",
        description:
          "Orthopedic consultation conducted.",
        status: "completed",
      },
      {
        title: "Discharged",
        date: "22 Aug 2026 • 03:30 PM",
        description:
          "Patient discharged with treatment instructions.",
        status: "current",
      },
      {
        title: "Closed",
        date: "Pending",
        description:
          "Final referral closure confirmation pending.",
        status: "pending",
      },
    ],
  },
};

export default async function ReferralDetailPage({
  params,
}: ReferralPageProps) {
  const { id } = await params;

  const referral = referrals[id];

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
            className="mt-6 inline-flex rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Back to Referrals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/referrals"
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

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Referral #{referral.id}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Created on {referral.created}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                referral.status === "Closed"
                  ? "bg-slate-100 text-slate-700"
                  : referral.status === "Received"
                    ? "bg-teal-50 text-teal-700"
                    : referral.status === "Discharged"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-blue-700"
              }`}
            >
              {referral.status}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                referral.priority === "Emergency"
                  ? "bg-red-50 text-red-700"
                  : referral.priority === "Urgent"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {referral.priority}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}
          <div className="space-y-6">
            {/* Patient */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
                  label="SEVA Patient ID"
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
              </div>

              <div className="mt-5">
                <Link
                  href={`/patients/${referral.patientId}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-slate-50"
                >
                  View Patient Profile
                  <ArrowLeft
                    size={15}
                    className="rotate-180"
                  />
                </Link>
              </div>
            </section>

            {/* Route */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
                  label="Created"
                  value={referral.created}
                />
              </div>
            </section>

            {/* Notes */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Current Status */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Current Status
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {referral.status}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {referral.status === "In Transit"
                  ? "The patient is currently travelling to the receiving facility."
                  : referral.status === "Received"
                    ? "The receiving facility has confirmed patient arrival."
                    : referral.status === "Closed"
                      ? "This referral journey has been completed and closed."
                      : referral.status === "Discharged"
                        ? "The patient has been discharged after treatment."
                        : "The referral is progressing through the care journey."}
              </p>
            </section>

            {/* Timeline */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Clock3 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Referral Journey
                  </h2>

                  <p className="text-xs text-slate-500">
                    Closed-loop referral lifecycle
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
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
                  ),
                )}
              </div>
            </section>

            {/* 48 Hour Follow-up */}
            <section
              className={`rounded-2xl border p-6 ${
                referral.noShow
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
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
                      : "No 48-hour no-show alert is currently active for this referral."}
                  </p>
                </div>
              </div>
            </section>

            {/* Audit */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
                  label="Journey status"
                  value={referral.status}
                />
              </div>
            </section>
          </div>
        </div>
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
          ) : (
            <span className="text-xs">•</span>
          )}
        </div>

        {!isLast && (
          <div
            className={`mt-1 min-h-9 w-px ${
              status === "completed"
                ? "bg-teal-600"
                : "bg-slate-200"
            }`}
          />
        )}
      </div>

      <div className="pb-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <p
            className={`text-sm font-semibold ${
              status === "pending"
                ? "text-slate-400"
                : "text-slate-900"
            }`}
          >
            {title}
          </p>

          <span className="text-xs text-slate-400">
            {date}
          </span>
        </div>

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