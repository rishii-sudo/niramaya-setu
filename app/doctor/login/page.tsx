"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../services/apiClient";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const cleanDoctorId = doctorId.trim();

    if (!cleanDoctorId) {
      setError("Enter your Doctor ID or registered email.");
      return;
    }

    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("niramaya-doctor-id", cleanDoctorId);
      localStorage.setItem("niramaya-doctor-role", "Doctor");

      if (remember) {
        localStorage.setItem(
          "niramaya-doctor-remember",
          "true"
        );
      } else {
        localStorage.removeItem(
          "niramaya-doctor-remember"
        );
      }

      setLoading(false);
      router.push("/doctor/verify");
    }, 700);
  };

  const fillDemo = () => {
    setDoctorId("DOC-2048");
    setPassword("doctor123");
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f8f8] px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          DOCTOR / CLINICAL BACKGROUND
         ===================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft clinical glows */}
        <div className="absolute left-[4%] top-[15%] h-72 w-72 rounded-full bg-teal-300/5 blur-3xl" />

        <div className="absolute right-[5%] bottom-[10%] h-80 w-80 rounded-full bg-blue-300/5 blur-3xl" />

        {/* ---------------------------------------------------
            TOP RIGHT MEDICAL NETWORK
           --------------------------------------------------- */}
        <div className="absolute right-[-25px] top-[-25px] opacity-[0.06]">
          <svg
            width="480"
            height="330"
            viewBox="0 0 480 330"
            fill="none"
          >
            <path
              d="M30 135L120 55L205 115L305 42L450 112"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M120 55L155 190L245 145L305 42"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M245 145L355 220L450 112"
              stroke="#087f78"
              strokeWidth="2"
            />

            <circle
              cx="30"
              cy="135"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="120"
              cy="55"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="205"
              cy="115"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="305"
              cy="42"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="450"
              cy="112"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="155"
              cy="190"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="245"
              cy="145"
              r="8"
              fill="#087f78"
            />

            <circle
              cx="355"
              cy="220"
              r="8"
              fill="#087f78"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------
            STETHOSCOPE - LEFT
           --------------------------------------------------- */}
        <div className="absolute left-[-50px] top-[13%] opacity-[0.045]">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
          >
            <path
              d="M80 40V108C80 149 111 180 152 180C193 180 224 149 224 108V40"
              stroke="#087f78"
              strokeWidth="10"
              strokeLinecap="round"
            />

            <path
              d="M110 40H80"
              stroke="#087f78"
              strokeWidth="10"
              strokeLinecap="round"
            />

            <path
              d="M224 40H194"
              stroke="#087f78"
              strokeWidth="10"
              strokeLinecap="round"
            />

            <path
              d="M152 180V215C152 245 177 268 208 268C239 268 264 244 264 213V190"
              stroke="#087f78"
              strokeWidth="10"
              strokeLinecap="round"
            />

            <circle
              cx="264"
              cy="178"
              r="22"
              stroke="#087f78"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------
            MEDICAL CROSS - RIGHT
           --------------------------------------------------- */}
        <div className="absolute right-[8%] top-[31%] opacity-[0.035]">
          <svg
            width="170"
            height="170"
            viewBox="0 0 170 170"
            fill="none"
          >
            <path
              d="M85 28V142"
              stroke="#087f78"
              strokeWidth="14"
              strokeLinecap="round"
            />

            <path
              d="M28 85H142"
              stroke="#087f78"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------
            CLINICAL CLIPBOARD - RIGHT BOTTOM
           --------------------------------------------------- */}
        <div className="absolute bottom-[11%] right-[-15px] opacity-[0.04]">
          <svg
            width="260"
            height="310"
            viewBox="0 0 260 310"
            fill="none"
          >
            <rect
              x="40"
              y="50"
              width="180"
              height="230"
              rx="16"
              stroke="#087f78"
              strokeWidth="9"
            />

            <rect
              x="90"
              y="25"
              width="80"
              height="48"
              rx="12"
              fill="#087f78"
            />

            <path
              d="M75 105H185"
              stroke="#087f78"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <path
              d="M75 145H185"
              stroke="#087f78"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <path
              d="M75 185H150"
              stroke="#087f78"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <path
              d="M75 225H170"
              stroke="#087f78"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------
            ECG LINE - BOTTOM
           --------------------------------------------------- */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.065]">
          <svg
            viewBox="0 0 1600 230"
            className="h-auto w-full"
            fill="none"
          >
            <path
              d="M0 135
                 H190
                 C215 135 225 135 245 135
                 L270 135
                 L300 74
                 L328 194
                 L358 135
                 H490
                 L520 135
                 L550 106
                 L580 135
                 H730
                 L760 135
                 L793 62
                 L824 200
                 L854 135
                 H1000
                 L1030 135
                 L1060 98
                 L1090 135
                 H1240
                 L1270 135
                 L1300 76
                 L1330 192
                 L1360 135
                 H1600"
              stroke="#087f78"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------
            SMALL CLINICAL DOTS
           --------------------------------------------------- */}
        <span className="absolute left-[15%] top-[28%] h-2 w-2 rounded-full bg-teal-700/10" />
        <span className="absolute left-[19%] top-[31%] h-3 w-3 rounded-full bg-teal-700/10" />

        <span className="absolute right-[22%] top-[17%] h-2 w-2 rounded-full bg-blue-700/10" />
        <span className="absolute right-[18%] top-[21%] h-3 w-3 rounded-full bg-teal-700/10" />

        <span className="absolute left-[25%] bottom-[17%] h-2 w-2 rounded-full bg-teal-700/10" />
        <span className="absolute right-[31%] bottom-[22%] h-3 w-3 rounded-full bg-blue-700/10" />
      </div>

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-5xl items-center justify-center">

        <div className="w-full">

          {/* =================================================
              BRAND HEADER
             ================================================= */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087f78] text-white shadow-sm">
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
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  NIRAMAYA-SETU
                </p>

                <p className="text-[10px] text-slate-500">
                  Clinical Care Platform
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Clinical access
            </div>
          </div>

          {/* =================================================
              MAIN CARD
             ================================================= */}
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white/95 shadow-[0_22px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl">

            {/* Top heading */}
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f78]">
                    Doctor Workspace
                  </p>

                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Clinical sign in
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Access assigned patients, referrals and treatment
                    workflows.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                    Workspace
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    Doctor / Clinician
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

              {/* =================================================
                  LEFT INFO PANEL
                 ================================================= */}
              <section className="border-b border-slate-100 bg-[#f8fbfb] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="max-w-sm">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <DoctorIcon />
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900">
                    Clinical workspace
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Review referral information and continue patient care
                    through the authorized clinical workflow.
                  </p>

                  {/* Workflow */}
                  <div className="mt-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Access flow
                    </p>

                    <div className="mt-4 space-y-0">

                      <AccessStep
                        number="01"
                        title="Sign in"
                        detail="Verify doctor credentials"
                        current
                      />

                      <AccessConnector />

                      <AccessStep
                        number="02"
                        title="Verify referral"
                        detail="Confirm QR or token"
                      />

                      <AccessConnector />

                      <AccessStep
                        number="03"
                        title="Open workspace"
                        detail="Access authorized care data"
                      />

                    </div>
                  </div>

                  {/* Security */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                        <LockIcon />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Protected clinical access
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          Patient-specific information requires referral
                          verification after sign in.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* =================================================
                  RIGHT LOGIN FORM
                 ================================================= */}
              <section className="p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="mx-auto max-w-md">

                  {/* Steps */}
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#087f78] text-white">
                      1
                    </span>

                    Credentials

                    <span className="mx-1 text-slate-300">
                      â†’
                    </span>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      2
                    </span>

                    Verification
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      Sign in to continue
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use your assigned Doctor ID or registered email.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6"
                  >
                    {/* Doctor ID */}
                    <div>
                      <label
                        htmlFor="doctor-id"
                        className="mb-2 block text-xs font-semibold text-slate-700"
                      >
                        Doctor ID / Email
                      </label>

                      <input
                        id="doctor-id"
                        type="text"
                        autoComplete="username"
                        value={doctorId}
                        onChange={(event) => {
                          setDoctorId(event.target.value);
                          setError("");
                        }}
                        placeholder="e.g. DOC-2048"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>

                    {/* Password */}
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor="doctor-password"
                          className="text-xs font-semibold text-slate-700"
                        >
                          Password
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (current) => !current
                            )
                          }
                          className="text-xs font-semibold text-[#087f78] hover:text-[#066b65]"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>

                      <input
                        id="doctor-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setError("");
                        }}
                        placeholder="Enter password"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>

                    {/* Options */}
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(event) =>
                            setRemember(event.target.checked)
                          }
                          className="h-4 w-4 rounded accent-teal-700"
                        />

                        Remember this device
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-[#087f78] hover:text-[#066b65]"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                            !
                          </span>

                          <p className="text-xs font-medium text-red-700">
                            {error}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087f78] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#066b65] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Continue
                          <span className="text-base">
                            â†’
                          </span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Demo */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Prototype access
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Use sample credentials for presentation.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={fillDemo}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Fill Demo
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <DemoField
                        label="Doctor ID"
                        value="DOC-2048"
                      />

                      <DemoField
                        label="Password"
                        value="doctor123"
                      />
                    </div>
                  </div>

                  {/* QR next step */}
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                        <QrIcon />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-amber-900">
                          Referral verification
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-amber-800">
                          After sign in, verify an authorized referral using
                          its QR code or short-lived verification token.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <p className="text-[9px] text-slate-400">
                      NIRAMAYA-SETU â€¢ Clinical Care Platform
                    </p>

                    <p className="mt-1 text-[9px] text-slate-300">
                      Prototype authentication
                    </p>
                  </div>

                </div>
              </section>
            </div>
          </div>

          {/* Bottom security */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Authorized clinical users only
          </div>

        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function AccessStep({
  number,
  title,
  detail,
  current = false,
}: {
  number: string;
  title: string;
  detail: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
          current
            ? "bg-[#087f78] text-white"
            : "border border-slate-200 bg-white text-slate-400"
        }`}
      >
        {number}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] text-slate-400">
          {detail}
        </p>
      </div>
    </div>
  );
}

function AccessConnector() {
  return (
    <div className="ml-4 h-5 border-l border-dashed border-slate-200" />
  );
}

function DemoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-mono text-[10px] font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

function DoctorIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="7" r="3.5" />

      <path d="M5 21a7 7 0 0 1 14 0" />

      <path d="M18 4v6" />
      <path d="M15 7h6" />
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

function QrIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />

      <rect x="14" y="4" width="6" height="6" rx="1" />

      <rect x="4" y="14" width="6" height="6" rx="1" />

      <path d="M14 14h3v3h-3z" />
      <path d="M18 18h2" />
      <path d="M14 20h2" />
    </svg>
  );
}
