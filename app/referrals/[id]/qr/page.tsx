"use client";

import { use, useState } from "react";
import Link from "next/link";

type ReferralData = {
  id: string;
  patientId: string;
  patientName: string;
  destination: string;
  department: string;
  priority: "Routine" | "Urgent" | "Emergency";
  status: string;
  createdAt: string;
  validUntil: string;
};

const referrals: Record<string, ReferralData> = {
  "REF-24017": {
    id: "REF-24017",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    destination: "SMS Hospital",
    department: "Cardiology",
    priority: "Urgent",
    status: "In-Transit",
    createdAt: "02 Sep 2026, 09:20 AM",
    validUntil: "04 Sep 2026, 09:20 AM",
  },
  "REF-24012": {
    id: "REF-24012",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    destination: "CHC Chomu",
    department: "Medicine",
    priority: "Routine",
    status: "Created",
    createdAt: "02 Sep 2026, 01:10 PM",
    validUntil: "04 Sep 2026, 01:10 PM",
  },
  "REF-24005": {
    id: "REF-24005",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    destination: "District Hospital",
    department: "General Medicine",
    priority: "Routine",
    status: "Received",
    createdAt: "01 Sep 2026, 10:30 AM",
    validUntil: "03 Sep 2026, 10:30 AM",
  },
};

export default function ReferralQRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const referral = referrals[id] ?? {
    id,
    patientId: "NS-00000",
    patientName: "Demo Patient",
    destination: "Assigned Facility",
    department: "General",
    priority: "Routine" as const,
    status: "Created",
    createdAt: "03 Sep 2026, 10:00 AM",
    validUntil: "05 Sep 2026, 10:00 AM",
  };

  const [generatedAt, setGeneratedAt] = useState(
    "03 Sep 2026, 12:00 AM"
  );

  const [copied, setCopied] = useState(false);

  const [verified, setVerified] = useState(false);

  const [showToken, setShowToken] = useState(false);

  const token = `NST-${referral.id.replace("REF-", "")}-X7Q9`;

  const qrPayload = `NIRAMAYA-SETU|REF=${referral.id}|TOKEN=${token}`;

  const qrPattern = [
    "111111101010111111111",
    "100000101110100000001",
    "101110100010101110101",
    "101110101110101110101",
    "101110100100101110101",
    "100000101010100000001",
    "111111101010111111111",
    "000000001110000000000",
    "101011111010111011101",
    "110100001101001000101",
    "001110111010111110100",
    "111001001101001011011",
    "010111110010111100110",
    "000000001110101010001",
    "111111101011111010111",
    "100000101110001011001",
    "101110101011101110101",
    "101110100101001000111",
    "101110101111111010101",
    "100000100100001111001",
    "111111101110111010111",
  ];

  const handleRegenerate = () => {
    const now = new Date();

    const formatted = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setGeneratedAt(formatted);
    setCopied(false);
    setVerified(false);
  };

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/referrals"
                className="transition hover:text-teal-700"
              >
                Referrals
              </Link>

              <span>/</span>

              <Link
                href={`/referrals/${referral.id}`}
                className="transition hover:text-teal-700"
              >
                {referral.id}
              </Link>

              <span>/</span>

              <span className="text-slate-700">QR</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Referral QR Verification
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Generate a secure referral QR for facility-side verification.
            </p>
          </div>

          <Link
            href={`/referrals/${referral.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back to Referral
          </Link>
        </div>

        {/* Security banner */}
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
                  Secure QR Referral
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The QR represents the referral ID and a temporary
                  verification token. Clinical data is not embedded in the
                  QR payload.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Token Active
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          {/* Referral summary */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Referral Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Details attached to this verification request.
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                  Patient
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {referral.patientName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {referral.patientId}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoBox
                  label="Referral ID"
                  value={referral.id}
                />

                <InfoBox
                  label="Priority"
                  value={referral.priority}
                  priority={referral.priority}
                />

                <InfoBox
                  label="Destination"
                  value={referral.destination}
                />

                <InfoBox
                  label="Department"
                  value={referral.department}
                />

                <InfoBox
                  label="Referral Status"
                  value={referral.status}
                />

                <InfoBox
                  label="Created"
                  value={referral.createdAt}
                />
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">
                  Token Expiry
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-950">
                  {referral.validUntil}
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-800">
                  A temporary verification token should not be reused after
                  its validity window.
                </p>
              </div>

              <Link
                href={`/patients/${referral.patientId}`}
                className="inline-flex w-full items-center justify-center rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                View Patient Profile
              </Link>
            </div>
          </section>

          {/* QR */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Verification QR
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Present this QR at the receiving facility.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                  REFERRAL QR
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-col items-center">
                {/* QR card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-2xl border border-slate-100 bg-white p-3">
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: `repeat(${qrPattern[0].length}, 10px)`,
                        gridTemplateRows: `repeat(${qrPattern.length}, 10px)`,
                      }}
                      aria-label="Referral verification QR"
                      role="img"
                    >
                      {qrPattern.flatMap((row, rowIndex) =>
                        row.split("").map((cell, columnIndex) => {
                          const filled = cell === "1";

                          return (
                            <span
                              key={`${rowIndex}-${columnIndex}`}
                              className={
                                filled
                                  ? "bg-slate-950"
                                  : "bg-white"
                              }
                            />
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs font-bold tracking-[0.18em] text-slate-800">
                      NIRAMAYA-SETU
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      {referral.id}
                    </p>
                  </div>
                </div>

                <div className="mt-5 w-full max-w-md rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Verification Token
                      </p>

                      <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                        {showToken
                          ? token
                          : "NST-••••••••••••"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowToken((value) => !value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {showToken ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="flex-1 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
                    >
                      {copied ? "Copied ✓" : "Copy Token"}
                    </button>

                    <button
                      type="button"
                      onClick={handleRegenerate}
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                  Generated: {generatedAt}
                </p>
              </div>

              {/* Verification box */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M9 12l2 2 4-5" />
                      <path d="M5 4h14v16H5z" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Facility Verification
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Verify the referral before opening patient-specific
                      information at the receiving facility.
                    </p>
                  </div>
                </div>

                {verified ? (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        ✓
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-emerald-900">
                          Referral verified
                        </p>

                        <p className="mt-0.5 text-xs text-emerald-700">
                          {referral.id} is ready for receiving-facility
                          verification.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="mt-4 w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    Verify Referral
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Security notes */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <SecurityCard
            title="No Clinical Data in QR"
            text="The visual code represents referral verification information rather than the patient's clinical record."
          />

          <SecurityCard
            title="Short-lived Token"
            text="The prototype models a temporary token so the verification credential is not intended for indefinite reuse."
            amber
          />

          <SecurityCard
            title="Consent Controlled"
            text="Access to patient information should be granted only according to the patient's recorded consent and authorized role."
            blue
          />
        </section>

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
              Prototype QR: the current visual QR and token are generated on
              the frontend for demonstration. Production implementation
              should generate cryptographically signed, short-lived
              verification tokens on the backend.
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

function InfoBox({
  label,
  value,
  priority,
}: {
  label: string;
  value: string;
  priority?: "Routine" | "Urgent" | "Emergency";
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1">
        {priority ? (
          <PriorityBadge priority={priority} />
        ) : (
          <p className="text-xs font-semibold text-slate-800">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: "Routine" | "Urgent" | "Emergency";
}) {
  const styles: Record<string, string> = {
    Routine: "bg-slate-100 text-slate-600",
    Urgent: "bg-amber-50 text-amber-700",
    Emergency: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
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