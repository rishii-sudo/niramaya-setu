"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AshaLoginPage() {
  const router = useRouter();

  const [ashaId, setAshaId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const cleanAshaId = ashaId.trim();

    if (!cleanAshaId) {
      setError(
        "Enter your ASHA ID, ANM ID or registered mobile number."
      );
      return;
    }

    if (!password.trim()) {
      setError("Enter your password or PIN.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Password or PIN must contain at least 4 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("niramaya-asha-id", cleanAshaId);
      localStorage.setItem("niramaya-asha-role", "ASHA / ANM");

      if (remember) {
        localStorage.setItem(
          "niramaya-asha-remember",
          "true"
        );
      } else {
        localStorage.removeItem(
          "niramaya-asha-remember"
        );
      }

      setLoading(false);

      router.push("/asha/verify");
    }, 700);
  };

  const fillDemo = () => {
    setAshaId("ASHA-1024");
    setPassword("asha1234");
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f9f8] px-4 py-6 sm:px-6 lg:px-8">
      {/* =====================================================
          ASHA / ANM BACKGROUND
         ===================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft glows */}
        <div className="absolute left-[4%] top-[12%] h-72 w-72 rounded-full bg-emerald-300/5 blur-3xl" />

        <div className="absolute right-[7%] bottom-[8%] h-80 w-80 rounded-full bg-teal-300/5 blur-3xl" />

        {/* Field connectivity network */}
        <div className="absolute right-[-30px] top-[-20px] opacity-[0.055]">
          <svg
            width="500"
            height="350"
            viewBox="0 0 500 350"
            fill="none"
          >
            <path
              d="M30 120L120 55L215 118L305 55L455 125"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M120 55L145 200L245 155L305 55"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M245 155L355 235L455 125"
              stroke="#087f78"
              strokeWidth="2"
            />

            <circle cx="30" cy="120" r="8" fill="#087f78" />
            <circle cx="120" cy="55" r="8" fill="#087f78" />
            <circle cx="215" cy="118" r="8" fill="#087f78" />
            <circle cx="305" cy="55" r="8" fill="#087f78" />
            <circle cx="455" cy="125" r="8" fill="#087f78" />
            <circle cx="145" cy="200" r="8" fill="#087f78" />
            <circle cx="245" cy="155" r="8" fill="#087f78" />
            <circle cx="355" cy="235" r="8" fill="#087f78" />
          </svg>
        </div>

        {/* Village / community */}
        <div className="absolute bottom-[7%] left-[-20px] opacity-[0.04]">
          <svg
            width="420"
            height="280"
            viewBox="0 0 420 280"
            fill="none"
          >
            <path
              d="M30 235V145L105 90L180 145V235"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M105 90V55"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M215 235V125L295 65L375 125V235"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M295 65V35"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M82 235V180H128V235"
              stroke="#087f78"
              strokeWidth="7"
            />

            <path
              d="M270 235V175H320V235"
              stroke="#087f78"
              strokeWidth="7"
            />

            <path
              d="M48 170H78"
              stroke="#087f78"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <path
              d="M63 155V185"
              stroke="#087f78"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <path
              d="M335 160H365"
              stroke="#087f78"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <path
              d="M350 145V175"
              stroke="#087f78"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Location route */}
        <div className="absolute bottom-[18%] right-[2%] opacity-[0.045]">
          <svg
            width="250"
            height="270"
            viewBox="0 0 250 270"
            fill="none"
          >
            <path
              d="M45 230C45 160 100 160 100 105C100 65 130 45 155 45"
              stroke="#087f78"
              strokeWidth="5"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />

            <circle
              cx="155"
              cy="45"
              r="22"
              stroke="#087f78"
              strokeWidth="6"
            />

            <circle
              cx="155"
              cy="45"
              r="6"
              fill="#087f78"
            />

            <circle
              cx="45"
              cy="230"
              r="16"
              stroke="#087f78"
              strokeWidth="5"
            />

            <circle
              cx="45"
              cy="230"
              r="5"
              fill="#087f78"
            />
          </svg>
        </div>

        {/* Mobile / offline */}
        <div className="absolute left-[8%] bottom-[14%] opacity-[0.035]">
          <svg
            width="180"
            height="170"
            viewBox="0 0 180 170"
            fill="none"
          >
            <rect
              x="55"
              y="20"
              width="70"
              height="125"
              rx="14"
              stroke="#087f78"
              strokeWidth="7"
            />

            <path
              d="M75 45H105"
              stroke="#087f78"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <circle
              cx="90"
              cy="120"
              r="7"
              fill="#087f78"
            />

            <path
              d="M25 70C35 60 45 55 55 54"
              stroke="#087f78"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <path
              d="M155 70C145 60 135 55 125 54"
              stroke="#087f78"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Health cross */}
        <div className="absolute right-[13%] top-[36%] opacity-[0.03]">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
          >
            <path
              d="M75 28V122"
              stroke="#087f78"
              strokeWidth="12"
              strokeLinecap="round"
            />

            <path
              d="M28 75H122"
              stroke="#087f78"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom field route */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.05]">
          <svg
            viewBox="0 0 1600 200"
            className="h-auto w-full"
            fill="none"
          >
            <path
              d="M0 145
                 C100 115 135 180 235 142
                 C330 105 360 165 455 130
                 C550 95 575 155 670 125
                 C765 95 790 165 890 130
                 C985 98 1010 160 1110 125
                 C1210 90 1240 160 1340 125
                 C1440 90 1495 135 1600 105"
              stroke="#087f78"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Small nodes */}
        <span className="absolute left-[18%] top-[28%] h-2 w-2 rounded-full bg-emerald-700/10" />

        <span className="absolute left-[22%] top-[31%] h-3 w-3 rounded-full bg-teal-700/10" />

        <span className="absolute right-[23%] top-[19%] h-3 w-3 rounded-full bg-emerald-700/10" />

        <span className="absolute right-[18%] top-[23%] h-2 w-2 rounded-full bg-teal-700/10" />
      </div>

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-5xl items-center justify-center">
        <div className="w-full">

          {/* BRAND */}
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
                  Field Care Platform
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Field access
            </div>
          </div>

          {/* =================================================
              MAIN CARD
             ================================================= */}
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white/95 shadow-[0_22px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl">

            {/* Header */}
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f78]">
                    ASHA / ANM Workspace
                  </p>

                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Field care sign in
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Access patient visits, follow-ups, referrals and
                    offline-ready field workflows.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2">
                  <p className="text-[8px] font-bold uppercase tracking-wide text-emerald-700">
                    Field mode
                  </p>

                  <p className="mt-1 text-xs font-semibold text-emerald-900">
                    Offline-ready
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

              {/* =================================================
                  LEFT INFO
                 ================================================= */}
              <section className="border-b border-slate-100 bg-[#f7fbfa] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="max-w-sm">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <AshaIcon />
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900">
                    Field care workspace
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Continue care from the field. Record visits, track
                    referrals and follow up with patients when connectivity
                    is limited.
                  </p>

                  {/* Field workflow */}
                  <div className="mt-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Field workflow
                    </p>

                    <div className="mt-4 space-y-0">
                      <AccessStep
                        number="01"
                        title="Sign in"
                        detail="Verify field-worker credentials"
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
                        title="Work offline"
                        detail="Capture visit and follow-up data"
                      />
                    </div>
                  </div>

                  {/* Offline information */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                        <OfflineIcon />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Offline-first field care
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          Field records can be captured locally and synced
                          when connectivity becomes available.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* =================================================
                  RIGHT LOGIN
                 ================================================= */}
              <section className="p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="mx-auto max-w-md">

                  {/* Steps */}
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#087f78] text-white">
                      1
                    </span>

                    Sign in

                    <span className="mx-1 text-slate-300">
                      →
                    </span>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      2
                    </span>

                    Verification
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      Welcome back
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use your ASHA / ANM ID or registered mobile number.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6"
                  >
                    {/* ASHA ID */}
                    <div>
                      <label
                        htmlFor="asha-id"
                        className="mb-2 block text-xs font-semibold text-slate-700"
                      >
                        ASHA / ANM ID
                      </label>

                      <div className="relative">
                        <AshaInputIcon />

                        <input
                          id="asha-id"
                          type="text"
                          autoComplete="username"
                          value={ashaId}
                          onChange={(event) => {
                            setAshaId(event.target.value);
                            setError("");
                          }}
                          placeholder="e.g. ASHA-1024"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor="asha-password"
                          className="text-xs font-semibold text-slate-700"
                        >
                          Password / PIN
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

                      <div className="relative">
                        <LockIcon />

                        <input
                          id="asha-password"
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
                          placeholder="Enter password or PIN"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>
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

                        Remember device
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-[#087f78] hover:text-[#066b65]"
                      >
                        Forgot PIN?
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
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Demo access */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Field demo access
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
                        label="ASHA ID"
                        value="ASHA-1024"
                      />

                      <DemoField
                        label="Password"
                        value="asha1234"
                      />
                    </div>
                  </div>

                  {/* Next step */}
                  <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                        <OfflineIcon />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-emerald-900">
                          Ready for field work
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-emerald-800">
                          After sign in, the referral verification step
                          confirms the care journey before patient-specific
                          information is opened.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <p className="text-[9px] text-slate-400">
                      NIRAMAYA-SETU • Field Care Platform
                    </p>

                    <p className="mt-1 text-[9px] text-slate-300">
                      Prototype authentication
                    </p>
                  </div>

                </div>
              </section>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Authorized field users only
          </div>

        </div>
      </div>
    </main>
  );
}

/* =========================================================
   FIELD WORKFLOW COMPONENT
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

/* =========================================================
   DEMO
   ========================================================= */

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

/* =========================================================
   ICONS
   ========================================================= */

function AshaIcon() {
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
      <path d="M7 12h10" />
      <path d="M9 15h6" />
    </svg>
  );
}

function AshaInputIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M7 12h10" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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

function OfflineIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
    </svg>
  );
}