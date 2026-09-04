"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "../context/RoleContext";
import { clearStaffSessionKeys } from "../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const { setActiveRole } = useRole();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [resendSeconds, setResendSeconds] = useState(0);

  const sendOtp = () => {
    setError("");

    const cleanMobile = mobile.replace(/\D/g, "");

    if (cleanMobile.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setResendSeconds(30);
    }, 700);
  };

  const verifyOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Clear previous active staff portal session context
      clearStaffSessionKeys();

      // Establish authenticated patient credentials and role
      localStorage.setItem("niramaya-patient-mobile", mobile);
      localStorage.setItem("niramaya-patient-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "patient");

      // Update RoleContext active state
      setActiveRole("patient");

      setLoading(false);
      setVerified(true);

      setTimeout(() => {
        router.push("/patient");
      }, 500);
    }, 700);
  };

  const handleMobileChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);

    setMobile(digitsOnly);
    setError("");
  };

  const handleOtpChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);

    setOtp(digitsOnly);
    setError("");
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResendSeconds(30);
      setOtp("");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[30px] border border-slate-200 bg-white/95 shadow-[0_25px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1fr_1.05fr]">

          {/* =====================================================
              LEFT — PATIENT EXPERIENCE
             ===================================================== */}

          <section className="relative overflow-hidden bg-[#0d2834] p-7 text-white sm:p-9 lg:p-10 xl:p-12">

            {/* Decorative medical network */}
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <svg
                viewBox="0 0 700 850"
                className="h-full w-full"
                fill="none"
              >
                <path
                  d="M50 130L180 70L305 145L440 80L620 150"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <path
                  d="M90 520L210 420L360 500L505 400L650 470"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <path
                  d="M50 720L180 650L310 735L450 655L620 735"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                <circle
                  cx="180"
                  cy="70"
                  r="7"
                  fill="currentColor"
                />

                <circle
                  cx="305"
                  cy="145"
                  r="7"
                  fill="currentColor"
                />

                <circle
                  cx="440"
                  cy="80"
                  r="7"
                  fill="currentColor"
                />

                <circle
                  cx="210"
                  cy="420"
                  r="7"
                  fill="currentColor"
                />

                <circle
                  cx="360"
                  cy="500"
                  r="7"
                  fill="currentColor"
                />

                <circle
                  cx="505"
                  cy="400"
                  r="7"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="relative z-10 flex min-h-full flex-col">

              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg">
                  <svg
                    className="h-6 w-6"
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
                    Patient Health Portal
                  </p>
                </div>
              </div>

              {/* Main message */}
              <div className="mt-16 max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/15 bg-teal-400/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-200">
                    Your health. Your journey.
                  </span>
                </span>

                <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Your care,
                  <br />
                  connected.
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/50">
                  Access your health records, referrals, treatment updates,
                  care progress and downloadable documents from one secure
                  patient portal.
                </p>
              </div>

              {/* Patient benefits */}
              <div className="mt-10 space-y-3">
                <PatientBenefit
                  number="01"
                  title="My Health Records"
                  text="Vitals, diagnoses, medicines and reports"
                />

                <PatientBenefit
                  number="02"
                  title="My Care Journey"
                  text="See where your referral and treatment stand"
                />

                <PatientBenefit
                  number="03"
                  title="My Progress"
                  text="Track health changes and follow-up milestones"
                />

                <PatientBenefit
                  number="04"
                  title="My Documents"
                  text="Download authorized health summaries as PDF"
                />
              </div>

              {/* Bottom */}
              <div className="mt-auto pt-12">
                <div className="grid grid-cols-3 gap-2">
                  <MiniInfo
                    title="Private"
                    text="Your records"
                  />

                  <MiniInfo
                    title="Secure"
                    text="OTP access"
                  />

                  <MiniInfo
                    title="Anytime"
                    text="Your journey"
                  />
                </div>

                <p className="mt-6 text-[9px] text-white/25">
                  NIRAMAYA-SETU • Patient-first care continuity
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT — LOGIN
             ===================================================== */}

          <section className="flex items-center bg-white px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
            <div className="mx-auto w-full max-w-[500px]">

              {/* Top */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-600" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
                    Patient Portal
                  </p>
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in securely to view your personal healthcare
                  information and care progress.
                </p>
              </div>

              {/* Security */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <TrustItem text="Private" />
                <TrustItem text="OTP secured" />
                <TrustItem text="Patient access" />
              </div>

              {/* Login card */}
              <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                {!otpSent && !verified && (
                  <>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Sign in with your mobile
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        We&apos;ll send a one-time password to your registered
                        mobile number.
                      </p>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="mobile"
                        className="mb-2 block text-xs font-bold text-slate-700"
                      >
                        Mobile Number
                      </label>

                      <div className="flex">
                        <div className="flex h-[46px] items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                          +91
                        </div>

                        <input
                          id="mobile"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          value={mobile}
                          onChange={(event) =>
                            handleMobileChange(event.target.value)
                          }
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          className="h-[46px] min-w-0 flex-1 rounded-r-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-[10px] text-slate-400">
                          Use the mobile number registered with your patient record.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setMobile("9876543210");
                            setError("");
                          }}
                          className="text-[10px] font-semibold text-teal-700 hover:text-teal-800"
                        >
                          Demo: 9876543210
                        </button>
                      </div>
                    </div>

                    {error && <ErrorMessage message={error} />}

                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={loading}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Spinner />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP
                          <span className="text-lg">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </>
                )}

                {otpSent && !verified && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                        setError("");
                      }}
                      className="mb-5 text-xs font-semibold text-teal-700 hover:text-teal-800"
                    >
                      ← Change mobile number
                    </button>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Enter verification code
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        A 6-digit OTP was sent to{" "}
                        <span className="font-semibold text-slate-700">
                          +91 {mobile}
                        </span>
                      </p>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="otp"
                        className="mb-2 block text-xs font-bold text-slate-700"
                      >
                        One-Time Password
                      </label>

                      <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={otp}
                        onChange={(event) =>
                          handleOtpChange(event.target.value)
                        }
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="input-style text-center font-mono text-lg tracking-[0.35em]"
                      />

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          Demo OTP: 123456
                        </span>

                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={resendSeconds > 0 || loading}
                          className="text-[10px] font-semibold text-teal-700 disabled:text-slate-400"
                        >
                          {resendSeconds > 0
                            ? `Resend in ${resendSeconds}s`
                            : "Resend OTP"}
                        </button>
                      </div>
                    </div>

                    {error && <ErrorMessage message={error} />}

                    <button
                      type="submit"
                      form="otp-form"
                      disabled={loading}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Spinner />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Continue
                          <span className="text-lg">
                            →
                          </span>
                        </>
                      )}
                    </button>

                    <form
                      id="otp-form"
                      onSubmit={verifyOtp}
                      className="hidden"
                    >
                      <button type="submit" />
                    </form>
                  </>
                )}

                {verified && (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      Identity verified
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Opening your patient portal...
                    </p>
                  </div>
                )}
              </div>

              {/* Portal capabilities */}
              {!verified && (
                <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
                    Your portal
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Capability text="Health records" />
                    <Capability text="Referral tracking" />
                    <Capability text="Progress view" />
                    <Capability text="PDF documents" />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-7 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 text-[9px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Patient access
                  <span>•</span>
                  Consent-aware
                  <span>•</span>
                  Prototype
                </div>

                <p className="mt-2 text-[9px] text-slate-300">
                  NIRAMAYA-SETU • Care Continuity Platform
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

function PatientBenefit({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-[9px] font-bold text-teal-200">
        {number}
      </div>

      <div>
        <p className="text-xs font-semibold text-white/85">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-white/35">
          {text}
        </p>
      </div>
    </div>
  );
}

function MiniInfo({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
      <p className="text-[10px] font-bold text-white/70">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-white/30">
        {text}
      </p>
    </div>
  );
}

function TrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />

      <span className="text-[9px] font-semibold text-slate-500">
        {text}
      </span>
    </div>
  );
}

function Capability({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border border-teal-100 bg-white/70 px-3 py-2.5 text-[10px] font-semibold text-slate-600">
      {text}
    </div>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
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

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}