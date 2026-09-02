"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VerifyMethod = "qr" | "token";
type VerificationState = "idle" | "scanning" | "verifying" | "success";

const DEMO_TOKEN = "NST-24017-X7Q9";
const DEMO_REFERRAL = "REF-24017";

export default function DoctorVerifyPage() {
  const router = useRouter();

  const [doctorId, setDoctorId] = useState("DOC-2048");
  const [method, setMethod] = useState<VerifyMethod>("qr");

  const [referralId, setReferralId] = useState(DEMO_REFERRAL);
  const [token, setToken] = useState(DEMO_TOKEN);

  const [verification, setVerification] =
    useState<VerificationState>("idle");

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDoctor = localStorage.getItem("niramaya-doctor-id");

    if (storedDoctor) {
      setDoctorId(storedDoctor);
    }
  }, []);

  const verifyReferral = () => {
    setError("");
    setVerification("verifying");

    setTimeout(() => {
      if (
        referralId.trim().toUpperCase() !== DEMO_REFERRAL ||
        token.trim().toUpperCase() !== DEMO_TOKEN
      ) {
        setVerification("idle");
        setVerified(false);

        setError(
          "Verification failed. Check the referral ID and verification token."
        );

        return;
      }

      setVerification("success");
      setVerified(true);
    }, 900);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verified) {
      localStorage.setItem(
        "niramaya-doctor-verification",
        "verified"
      );

      localStorage.setItem(
        "niramaya-doctor-referral",
        referralId.trim().toUpperCase()
      );

      router.push("/doctor");
      return;
    }

    verifyReferral();
  };

  const startQrSimulation = () => {
    setError("");
    setVerified(false);
    setVerification("scanning");

    setTimeout(() => {
      setReferralId(DEMO_REFERRAL);
      setToken(DEMO_TOKEN);
      setVerification("verifying");

      setTimeout(() => {
        setVerification("success");
        setVerified(true);
      }, 850);
    }, 1400);
  };

  const resetVerification = () => {
    setVerified(false);
    setVerification("idle");
    setError("");
  };

  const changeMethod = (nextMethod: VerifyMethod) => {
    setMethod(nextMethod);
    resetVerification();
  };

  return (
    <main className="min-h-screen bg-transparent px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[30px] border border-slate-200 bg-white/95 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr]">

          {/* =====================================================
              LEFT PANEL
             ===================================================== */}
          <section className="relative hidden min-h-[720px] overflow-hidden bg-[#102c3a] p-8 text-white lg:flex xl:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-cyan-300/10" />
            <div className="pointer-events-none absolute right-8 top-32 h-44 w-44 rounded-full border border-cyan-300/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-cyan-300/10" />

            <div className="pointer-events-none absolute right-8 bottom-14 opacity-10">
              <QrPattern />
            </div>

            <div className="relative z-10 flex h-full w-full flex-col">

              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-white shadow-lg">
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
                  <p className="text-base font-bold tracking-tight">
                    NIRAMAYA-SETU
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/45">
                    Clinical Verification
                  </p>
                </div>
              </div>

              {/* Hero */}
              <div className="mt-20 max-w-md">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/15 bg-teal-400/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-100">
                    Step 2 of 2
                  </span>
                </div>

                <h1 className="mt-7 text-[42px] font-bold leading-[1.05] tracking-tight xl:text-[50px]">
                  Verify before
                  <br />
                  opening care
                  <br />
                  information.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                  Confirm the referral identity before opening
                  patient-specific information in the clinical workspace.
                </p>
              </div>

              {/* Checks */}
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                  Verification checks
                </p>

                <div className="mt-4 space-y-3">
                  <SecurityCheck
                    number="01"
                    title="Referral identity"
                    detail="Referral ID matches the verification request"
                    complete={verified}
                  />

                  <SecurityCheck
                    number="02"
                    title="Temporary token"
                    detail="Short-lived verification credential"
                    complete={verified}
                  />

                  <SecurityCheck
                    number="03"
                    title="Role authorization"
                    detail="Doctor workspace access is confirmed"
                    complete={verified}
                  />

                  <SecurityCheck
                    number="04"
                    title="Consent / access"
                    detail="Patient information remains controlled"
                    complete={verified}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-10">
                <div className="flex items-center gap-2 text-[9px] text-white/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                  Signed in as {doctorId}

                  <span className="mx-1">•</span>

                  Doctor / Clinician
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT PANEL
             ===================================================== */}
          <section className="flex min-h-[720px] items-center bg-white px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
            <div className="mx-auto w-full max-w-[560px]">

              {/* Header */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
                  Referral verification
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Verify access
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Verify the referral before opening patient-specific
                  clinical information.
                </p>
              </div>

              {/* User identity */}
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <DoctorIcon />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                      Signed in user
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Dr. Clinical User
                    </p>

                    <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                      {doctorId}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-700">
                  DOCTOR
                </span>
              </div>

              {/* Method */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => changeMethod("qr")}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                      method === "qr"
                        ? "bg-white text-teal-800 shadow-sm"
                        : "text-slate-500 hover:bg-white/70"
                    }`}
                  >
                    Scan QR
                  </button>

                  <button
                    type="button"
                    onClick={() => changeMethod("token")}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                      method === "token"
                        ? "bg-white text-teal-800 shadow-sm"
                        : "text-slate-500 hover:bg-white/70"
                    }`}
                  >
                    Enter Token
                  </button>
                </div>
              </div>

              {/* =================================================
                  QR MODE
                 ================================================= */}
              {method === "qr" && (
                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Scan referral QR
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-slate-400">
                        Position the patient referral QR inside the frame.
                      </p>
                    </div>

                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[9px] font-bold text-teal-700">
                      SECURE
                    </span>
                  </div>

                  {/* Scanner */}
                  <div className="relative mx-auto mt-6 aspect-square max-w-[300px] overflow-hidden rounded-3xl bg-[#0d2531]">

                    {/* Scanner frame */}
                    <div className="absolute inset-8 rounded-2xl border-2 border-teal-300/50">
                      <span className="absolute -left-1 -top-1 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-teal-300" />
                      <span className="absolute -right-1 -top-1 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-teal-300" />
                      <span className="absolute -bottom-1 -left-1 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-teal-300" />
                      <span className="absolute -bottom-1 -right-1 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-teal-300" />
                    </div>

                    {/* QR visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FakeQrCode />
                    </div>

                    {/* Scan animation */}
                    {verification === "scanning" && (
                      <div className="absolute left-10 right-10 top-1/2 h-0.5 animate-pulse bg-teal-300 shadow-[0_0_18px_rgba(45,212,191,0.85)]" />
                    )}

                    {verification === "scanning" && (
                      <div className="absolute bottom-5 left-0 right-0 text-center">
                        <span className="rounded-full bg-black/40 px-3 py-1.5 text-[9px] font-semibold text-teal-200 backdrop-blur">
                          Scanning referral code...
                        </span>
                      </div>
                    )}

                    {/* Verifying */}
                    {verification === "verifying" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65">
                        <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-xl">
                          <span className="mx-auto block h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" />

                          <p className="mt-3 text-xs font-bold text-slate-900">
                            Verifying referral...
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Success */}
                    {verified && (
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/70 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                            ✓
                          </div>

                          <p className="mt-3 text-sm font-bold text-white">
                            QR verified
                          </p>

                          <p className="mt-1 text-[10px] text-emerald-100">
                            {DEMO_REFERRAL}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scan button */}
                  {!verified && (
                    <button
                      type="button"
                      onClick={startQrSimulation}
                      disabled={
                        verification === "scanning" ||
                        verification === "verifying"
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {verification === "scanning" ||
                      verification === "verifying" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          {verification === "scanning"
                            ? "Scanning..."
                            : "Verifying..."}
                        </>
                      ) : (
                        <>
                          Simulate QR Scan
                          <span className="text-lg">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Continue */}
                  {verified && (
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem(
                          "niramaya-doctor-verification",
                          "verified"
                        );

                        localStorage.setItem(
                          "niramaya-doctor-referral",
                          DEMO_REFERRAL
                        );

                        router.push("/doctor");
                      }}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-teal-800"
                    >
                      Open Doctor Workspace
                      <span className="text-lg">→</span>
                    </button>
                  )}
                </section>
              )}

              {/* =================================================
                  TOKEN MODE
                 ================================================= */}
              {method === "token" && (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Enter verification details
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-400">
                      Enter the referral ID and short-lived verification
                      token associated with the referral QR.
                    </p>
                  </div>

                  {/* Referral ID */}
                  <div className="mt-6">
                    <label
                      htmlFor="referral-id"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Referral ID
                    </label>

                    <input
                      id="referral-id"
                      type="text"
                      value={referralId}
                      onChange={(event) => {
                        const value = event.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9-]/g, "")
                          .slice(0, 20);

                        setReferralId(value);
                        setVerified(false);
                        setVerification("idle");
                        setError("");
                      }}
                      placeholder="REF-24017"
                      className="input-style font-mono uppercase"
                    />
                  </div>

                  {/* Token */}
                  <div className="mt-5">
                    <label
                      htmlFor="verification-token"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Verification Token
                    </label>

                    <input
                      id="verification-token"
                      type="text"
                      value={token}
                      onChange={(event) => {
                        const value = event.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9-]/g, "")
                          .slice(0, 30);

                        setToken(value);
                        setVerified(false);
                        setVerification("idle");
                        setError("");
                      }}
                      placeholder="NST-24017-X7Q9"
                      className="input-style font-mono uppercase"
                    />
                  </div>

                  <TokenStatus verified={verified} />

                  {error && (
                    <ErrorMessage message={error} />
                  )}

                  <button
                    type="submit"
                    disabled={verification === "verifying"}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verification === "verifying" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Verifying...
                      </>
                    ) : verified ? (
                      <>
                        Open Doctor Workspace
                        <span className="text-lg">
                          →
                        </span>
                      </>
                    ) : (
                      <>
                        Verify Referral
                        <span className="text-lg">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Error for QR */}
              {method === "qr" && error && (
                <div className="mt-5">
                  <ErrorMessage message={error} />
                </div>
              )}

              {/* Verified summary */}
              {verified && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                      ✓
                    </div>

                    <div>
                      <p className="text-xs font-bold text-emerald-900">
                        Verification successful
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-emerald-800">
                        Referral {referralId} has been verified for the
                        Doctor workspace.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security note */}
              <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                    <LockIcon />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-amber-900">
                      Patient data protection
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-amber-800">
                      The QR carries referral verification information,
                      not clinical data. Production verification should use
                      signed, short-lived credentials checked server-side.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-[9px] text-slate-400">
                  NIRAMAYA-SETU • Clinical Verification
                </p>

                <p className="mt-1 text-[9px] text-slate-300">
                  Prototype verification • Backend authorization pending
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function SecurityCheck({
  number,
  title,
  detail,
  complete,
}: {
  number: string;
  title: string;
  detail: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-3 py-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
          complete
            ? "bg-teal-500 text-white"
            : "bg-white/5 text-white/30"
        }`}
      >
        {complete ? "✓" : number}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-white/75">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] leading-4 text-white/30">
          {detail}
        </p>
      </div>
    </div>
  );
}

function TokenStatus({
  verified,
}: {
  verified: boolean;
}) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <StatusBox
        title="Referral"
        status={verified ? "Matched" : "Pending"}
        success={verified}
      />

      <StatusBox
        title="Token"
        status={verified ? "Valid" : "Pending"}
        success={verified}
      />

      <StatusBox
        title="Access"
        status={verified ? "Allowed" : "Pending"}
        success={verified}
      />
    </div>
  );
}

function StatusBox({
  title,
  status,
  success,
}: {
  title: string;
  status: string;
  success: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <div className="mt-1 flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            success ? "bg-emerald-500" : "bg-amber-400"
          }`}
        />

        <p className="text-[10px] font-semibold text-slate-700">
          {status}
        </p>
      </div>
    </div>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
          !
        </span>

        <p className="text-xs font-medium text-red-700">
          {message}
        </p>
      </div>
    </div>
  );
}

function DoctorIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M18 4v6M15 7h6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function FakeQrCode() {
  const cells = [
    1, 1, 1, 0, 0, 1, 1, 1, 0,
    1, 0, 1, 0, 1, 1, 1, 0, 1,
    1, 1, 1, 0, 1, 0, 1, 1, 1,
    0, 0, 0, 1, 1, 1, 0, 0, 0,
    1, 0, 1, 1, 0, 1, 1, 0, 1,
    0, 1, 1, 0, 1, 1, 0, 1, 0,
    1, 1, 0, 1, 0, 0, 1, 1, 1,
    1, 0, 1, 1, 1, 1, 0, 0, 1,
    1, 1, 1, 0, 1, 0, 1, 1, 0,
  ];

  return (
    <div className="relative h-40 w-40 rounded-xl bg-white p-3 shadow-lg">
      <div className="grid h-full w-full grid-cols-9 grid-rows-9 gap-1">
        {cells.map((cell, index) => (
          <span
            key={index}
            className={cell ? "bg-slate-950" : "bg-white"}
          />
        ))}
      </div>
    </div>
  );
}

function QrPattern() {
  return (
    <div className="grid grid-cols-12 gap-1">
      {Array.from({ length: 144 }).map((_, index) => (
        <span
          key={index}
          className={
            (index * 17 + index * 3) % 5 < 2
              ? "h-2 w-2 bg-cyan-200"
              : "h-2 w-2"
          }
        />
      ))}
    </div>
  );
}