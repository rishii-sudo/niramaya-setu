"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  KeyRound,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const DEMO_REFERRAL = "NS-28491";
const DEMO_TOKEN = "NST-24017-X7Q9";

export default function FacilityVerifyPage() {
  const router = useRouter();

  const [mode, setMode] =
    useState<"qr" | "token">("qr");

  const [token, setToken] =
    useState("");

  const [scanning, setScanning] =
    useState(false);

  const [error, setError] =
    useState("");

  const [verified, setVerified] =
    useState(false);

  function handleTokenSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedToken =
      token.trim().toUpperCase();

    if (!normalizedToken) {
      setError(
        "Enter the referral verification token.",
      );
      return;
    }

    if (normalizedToken !== DEMO_TOKEN) {
      setError(
        "Invalid or expired verification token.",
      );
      return;
    }

    completeVerification();
  }

  function simulateScan() {
    setError("");
    setScanning(true);

    window.setTimeout(() => {
      setScanning(false);
      setToken(DEMO_TOKEN);
      completeVerification();
    }, 1200);
  }

  function completeVerification() {
    localStorage.setItem(
      "niramaya-facility-verification",
      "verified",
    );

    localStorage.setItem(
      "niramaya-facility-referral",
      DEMO_REFERRAL,
    );

    localStorage.setItem(
      "niramaya-facility-token",
      DEMO_TOKEN,
    );

    localStorage.setItem(
      "niramaya-facility-auth",
      "demo-authenticated",
    );

    localStorage.setItem(
      "niramaya-active-role",
      "facility",
    );

    setVerified(true);

    window.setTimeout(() => {
      router.push("/facility/dashboard");
    }, 700);
  }

  const savedFacilityId =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "niramaya-facility-id",
        )
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-teal-100 bg-teal-50/60" />

        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full border border-blue-100 bg-blue-50/40" />

        <div className="absolute left-[8%] top-[20%] h-24 w-24 rounded-full border border-teal-100" />

        <div className="absolute right-[12%] top-[16%] h-32 w-32 rounded-full border border-blue-100" />

        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-teal-50/70 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white">
                <Building2 size={21} />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  Facility Verification
                </p>

                <p className="text-xs text-slate-500">
                  NIRAMAYA-SETU Secure Referral Access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck
                size={16}
                className="text-teal-700"
              />
              Secure clinical workspace
            </div>
          </header>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left */}
            <section className="border-b border-slate-200 bg-slate-50/60 p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                Step 2 of 2
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Verify Referral
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Verify the referral before accessing the patient
                and facility care workflow.
              </p>

              <div className="mt-8 space-y-4">
                <InfoCard
                  icon={<Building2 size={18} />}
                  title="Facility"
                  value={
                    savedFacilityId ??
                    "FAC-JPR-204"
                  }
                />

                <InfoCard
                  icon={<FileIcon />}
                  title="Demo Referral"
                  value={DEMO_REFERRAL}
                />

                <InfoCard
                  icon={<ShieldCheck size={18} />}
                  title="Protection"
                  value="Referral token + role-based access"
                />
              </div>

              <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <div className="flex items-start gap-3">
                  <Smartphone
                    size={19}
                    className="mt-0.5 shrink-0 text-teal-700"
                  />

                  <div>
                    <p className="text-sm font-semibold text-teal-900">
                      QR verification
                    </p>

                    <p className="mt-1 text-xs leading-5 text-teal-800">
                      Production flow will use a real camera scanner
                      and a short-lived signed referral token.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right */}
            <section className="p-6 sm:p-9 lg:p-10">
              <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("qr");
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    mode === "qr"
                      ? "bg-white text-teal-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <QrCode size={17} />
                  QR Scan
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode("token");
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    mode === "token"
                      ? "bg-white text-teal-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <KeyRound size={17} />
                  Token
                </button>
              </div>

              {/* QR mode */}
              {mode === "qr" ? (
                <div className="mt-8">
                  <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl border-2 border-dashed border-teal-300 bg-teal-50/40">
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                        <QrCode size={62} />
                      </div>

                      <p className="mt-5 text-sm font-semibold text-slate-800">
                        Referral QR Scanner
                      </p>

                      <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                        Demo scanner simulates successful verification
                        without using the device camera.
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={simulateScan}
                    disabled={
                      scanning || verified
                    }
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verified ? (
                      <>
                        <CheckCircle2 size={17} />
                        Verification Successful
                      </>
                    ) : scanning ? (
                      "Scanning..."
                    ) : (
                      <>
                        Simulate QR Scan
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Token mode */
                <form
                  onSubmit={handleTokenSubmit}
                  className="mt-8"
                >
                  <label
                    htmlFor="referral-token"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Referral Verification Token
                  </label>

                  <div className="relative mt-2">
                    <KeyRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="referral-token"
                      type="text"
                      value={token}
                      onChange={(event) =>
                        setToken(
                          event.target.value,
                        )
                      }
                      placeholder="NST-24017-X7Q9"
                      autoComplete="off"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold uppercase tracking-wide text-slate-900 outline-none placeholder:normal-case placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  {verified && (
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                      Verification successful. Opening facility workspace...
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={verified}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Verify Referral
                    <ArrowRight size={17} />
                  </button>

                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      Demo Token
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {DEMO_TOKEN}
                    </p>
                  </div>
                </form>
              )}

              {/* Back */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link
                  href="/facility/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  <ArrowLeft size={16} />
                  Back to Facility Login
                </Link>
              </div>

              {/* Security */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-700"
                />

                <p className="text-xs leading-5 text-amber-900">
                  Prototype verification only. Production systems
                  should validate signed, short-lived tokens on the
                  backend and enforce facility-level authorization.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                */
/* -------------------------------------------------------------------------- */

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-teal-700">
        {icon}

        <p className="text-xs font-semibold">
          {title}
        </p>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function FileIcon() {
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded border border-current text-[9px] font-bold">
      R
    </span>
  );
}