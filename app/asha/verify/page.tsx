"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VerifyMethod = "qr" | "token";
type VerifyState = "idle" | "scanning" | "verifying" | "success";

const DEMO_REFERRAL = "REF-24017";
const DEMO_TOKEN = "NST-24017-X7Q9";

export default function AshaVerifyPage() {
  const router = useRouter();

  const [ashaId, setAshaId] = useState("ASHA-1024");
  const [method, setMethod] = useState<VerifyMethod>("qr");

  const [referralId, setReferralId] = useState(DEMO_REFERRAL);
  const [token, setToken] = useState(DEMO_TOKEN);

  const [state, setState] = useState<VerifyState>("idle");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("niramaya-asha-id");

    if (storedId) {
      setAshaId(storedId);
    }
  }, []);

  const verifyReferral = () => {
    setError("");
    setState("verifying");

    setTimeout(() => {
      const validReferral =
        referralId.trim().toUpperCase() === DEMO_REFERRAL;

      const validToken =
        token.trim().toUpperCase() === DEMO_TOKEN;

      if (!validReferral || !validToken) {
        setState("idle");
        setVerified(false);
        setError(
          "Verification failed. Check the referral ID and verification token."
        );
        return;
      }

      setState("success");
      setVerified(true);
    }, 900);
  };

  const startQrSimulation = () => {
    setError("");
    setVerified(false);
    setState("scanning");

    setTimeout(() => {
      setReferralId(DEMO_REFERRAL);
      setToken(DEMO_TOKEN);
      setState("verifying");

      setTimeout(() => {
        setState("success");
        setVerified(true);
      }, 800);
    }, 1400);
  };

  const handleTokenSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verified) {
      completeVerification();
      return;
    }

    verifyReferral();
  };

  const completeVerification = () => {
    localStorage.setItem(
      "niramaya-asha-verification",
      "verified"
    );

    localStorage.setItem(
      "niramaya-asha-referral",
      referralId.trim().toUpperCase()
    );

    localStorage.setItem(
      "niramaya-asha-role",
      "ASHA / ANM"
    );

    router.push("/asha");
  };

  const changeMethod = (nextMethod: VerifyMethod) => {
    setMethod(nextMethod);
    setState("idle");
    setVerified(false);
    setError("");
  };

  const resetVerification = () => {
    setState("idle");
    setVerified(false);
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f9f8] px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          ASHA VERIFICATION BACKGROUND
         ===================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft glows */}
        <div className="absolute left-[6%] top-[13%] h-72 w-72 rounded-full bg-emerald-300/5 blur-3xl" />

        <div className="absolute right-[4%] bottom-[8%] h-80 w-80 rounded-full bg-teal-300/5 blur-3xl" />

        {/* Community network */}
        <div className="absolute right-[-25px] top-[-20px] opacity-[0.05]">
          <svg
            width="470"
            height="330"
            viewBox="0 0 470 330"
            fill="none"
          >
            <path
              d="M28 130L110 62L195 120L292 48L438 125"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M110 62L145 188L240 148L292 48"
              stroke="#087f78"
              strokeWidth="2"
            />

            <path
              d="M240 148L350 226L438 125"
              stroke="#087f78"
              strokeWidth="2"
            />

            <circle cx="28" cy="130" r="8" fill="#087f78" />
            <circle cx="110" cy="62" r="8" fill="#087f78" />
            <circle cx="195" cy="120" r="8" fill="#087f78" />
            <circle cx="292" cy="48" r="8" fill="#087f78" />
            <circle cx="438" cy="125" r="8" fill="#087f78" />
            <circle cx="145" cy="188" r="8" fill="#087f78" />
            <circle cx="240" cy="148" r="8" fill="#087f78" />
            <circle cx="350" cy="226" r="8" fill="#087f78" />
          </svg>
        </div>

        {/* Location route */}
        <div className="absolute left-[-25px] bottom-[8%] opacity-[0.04]">
          <svg
            width="360"
            height="320"
            viewBox="0 0 360 320"
            fill="none"
          >
            <path
              d="M55 275C55 205 108 200 108 145C108 92 145 63 205 63"
              stroke="#087f78"
              strokeWidth="7"
              strokeDasharray="13 11"
              strokeLinecap="round"
            />

            <circle
              cx="205"
              cy="63"
              r="28"
              stroke="#087f78"
              strokeWidth="7"
            />

            <circle
              cx="205"
              cy="63"
              r="7"
              fill="#087f78"
            />

            <circle
              cx="55"
              cy="275"
              r="20"
              stroke="#087f78"
              strokeWidth="6"
            />
          </svg>
        </div>

        {/* Village homes */}
        <div className="absolute right-[-5px] bottom-[6%] opacity-[0.035]">
          <svg
            width="380"
            height="250"
            viewBox="0 0 380 250"
            fill="none"
          >
            <path
              d="M20 220V135L88 82L156 135V220"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M88 82V48"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M198 220V118L273 57L348 118V220"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M273 57V27"
              stroke="#087f78"
              strokeWidth="8"
            />

            <path
              d="M70 220V168H108V220"
              stroke="#087f78"
              strokeWidth="7"
            />

            <path
              d="M252 220V165H294V220"
              stroke="#087f78"
              strokeWidth="7"
            />
          </svg>
        </div>

        {/* Offline device */}
        <div className="absolute left-[5%] top-[34%] opacity-[0.03]">
          <svg
            width="160"
            height="190"
            viewBox="0 0 160 190"
            fill="none"
          >
            <rect
              x="42"
              y="20"
              width="76"
              height="130"
              rx="14"
              stroke="#087f78"
              strokeWidth="7"
            />

            <path
              d="M64 50H96"
              stroke="#087f78"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <circle
              cx="80"
              cy="123"
              r="7"
              fill="#087f78"
            />

            <path
              d="M22 79C29 70 36 66 42 64"
              stroke="#087f78"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <path
              d="M138 79C131 70 124 66 118 64"
              stroke="#087f78"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Small cross */}
        <div className="absolute right-[15%] top-[35%] opacity-[0.025]">
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
          >
            <path
              d="M65 24V106"
              stroke="#087f78"
              strokeWidth="11"
              strokeLinecap="round"
            />

            <path
              d="M24 65H106"
              stroke="#087f78"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* =====================================================
          CONTENT
         ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-5xl items-center justify-center">

        <div className="w-full">

          {/* Header */}
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
              Field verification
            </div>
          </div>

          {/* Main card */}
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white/95 shadow-[0_22px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl">

            {/* Top heading */}
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f78]">
                    ASHA / ANM Workspace
                  </p>

                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Verify referral
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Confirm the referral before opening patient-specific
                    information in the field workspace.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2">
                  <p className="text-[8px] font-bold uppercase tracking-wide text-emerald-700">
                    Signed in
                  </p>

                  <p className="mt-1 font-mono text-xs font-semibold text-emerald-900">
                    {ashaId}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">

              {/* =================================================
                  LEFT
                 ================================================= */}
              <section className="border-b border-slate-100 bg-[#f7fbfa] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">

                <div className="max-w-sm">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <AshaIcon />
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900">
                    Field verification
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Verify the referral first, then continue with field
                    visits, follow-ups and care continuity actions.
                  </p>

                  {/* Steps */}
                  <div className="mt-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Verification flow
                    </p>

                    <div className="mt-4 space-y-0">
                      <VerifyStep
                        number="01"
                        title="Sign in"
                        detail="ASHA / ANM credentials"
                        complete
                      />

                      <Connector />

                      <VerifyStep
                        number="02"
                        title="Verify referral"
                        detail="QR or verification token"
                        current={!verified}
                        complete={verified}
                      />

                      <Connector />

                      <VerifyStep
                        number="03"
                        title="Open field workspace"
                        detail="Authorized patient access"
                        current={verified}
                        complete={verified}
                      />
                    </div>
                  </div>

                  {/* Offline card */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                          <OfflineIcon />
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-emerald-900">
                            Offline-ready field workflow
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-emerald-800">
                            Verification is the gate before patient-specific
                            field information is opened.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* =================================================
                  RIGHT
                 ================================================= */}
              <section className="p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="mx-auto max-w-md">

                  {/* Methods */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-1.5">
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
                        Scan Referral QR
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
                      QR
                     ================================================= */}
                  {method === "qr" && (
                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-sm font-bold text-slate-900">
                            Scan patient referral
                          </h2>

                          <p className="mt-1 text-[10px] leading-4 text-slate-400">
                            Scan the referral QR provided by the care
                            workflow.
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                          FIELD
                        </span>
                      </div>

                      {/* Scanner */}
                      <div className="relative mx-auto mt-6 aspect-square max-w-[300px] overflow-hidden rounded-3xl bg-[#12313a]">

                        {/* Frame */}
                        <div className="absolute inset-8 rounded-2xl border-2 border-emerald-300/45">
                          <span className="absolute -left-1 -top-1 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-emerald-300" />

                          <span className="absolute -right-1 -top-1 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-emerald-300" />

                          <span className="absolute -bottom-1 -left-1 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-emerald-300" />

                          <span className="absolute -bottom-1 -right-1 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-emerald-300" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <FakeQrCode />
                        </div>

                        {state === "scanning" && (
                          <>
                            <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />

                            <div className="absolute bottom-5 left-0 right-0 text-center">
                              <span className="rounded-full bg-black/45 px-3 py-1.5 text-[9px] font-semibold text-emerald-100 backdrop-blur">
                                Scanning referral...
                              </span>
                            </div>
                          </>
                        )}

                        {state === "verifying" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65">
                            <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-xl">
                              <span className="mx-auto block h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" />

                              <p className="mt-3 text-xs font-bold text-slate-900">
                                Verifying...
                              </p>
                            </div>
                          </div>
                        )}

                        {verified && (
                          <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/70 backdrop-blur-sm">
                            <div className="text-center">
                              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                                ✓
                              </div>

                              <p className="mt-3 text-sm font-bold text-white">
                                Referral verified
                              </p>

                              <p className="mt-1 font-mono text-[10px] text-emerald-100">
                                {DEMO_REFERRAL}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* QR button */}
                      {!verified ? (
                        <button
                          type="button"
                          onClick={startQrSimulation}
                          disabled={
                            state === "scanning" ||
                            state === "verifying"
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087f78] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#066b65] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {state === "scanning" ||
                          state === "verifying" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                              {state === "scanning"
                                ? "Scanning..."
                                : "Verifying..."}
                            </>
                          ) : (
                            <>
                              Simulate QR Scan
                              <span className="text-base">
                                →
                              </span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={completeVerification}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087f78] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#066b65]"
                        >
                          Open Field Workspace
                          <span className="text-base">
                            →
                          </span>
                        </button>
                      )}
                    </section>
                  )}

                  {/* =================================================
                      TOKEN
                     ================================================= */}
                  {method === "token" && (
                    <form
                      onSubmit={handleTokenSubmit}
                      className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Enter referral verification
                        </h2>

                        <p className="mt-1 text-[10px] leading-5 text-slate-400">
                          Use the referral ID and temporary verification
                          token linked to the field-care referral.
                        </p>
                      </div>

                      {/* Referral ID */}
                      <div className="mt-6">
                        <label
                          htmlFor="asha-referral-id"
                          className="mb-2 block text-xs font-semibold text-slate-700"
                        >
                          Referral ID
                        </label>

                        <input
                          id="asha-referral-id"
                          type="text"
                          value={referralId}
                          onChange={(event) => {
                            const value = event.target.value
                              .toUpperCase()
                              .replace(/[^A-Z0-9-]/g, "")
                              .slice(0, 20);

                            setReferralId(value);
                            setVerified(false);
                            setState("idle");
                            setError("");
                          }}
                          placeholder="REF-24017"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-mono text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>

                      {/* Token */}
                      <div className="mt-5">
                        <label
                          htmlFor="asha-token"
                          className="mb-2 block text-xs font-semibold text-slate-700"
                        >
                          Verification Token
                        </label>

                        <input
                          id="asha-token"
                          type="text"
                          value={token}
                          onChange={(event) => {
                            const value = event.target.value
                              .toUpperCase()
                              .replace(/[^A-Z0-9-]/g, "")
                              .slice(0, 30);

                            setToken(value);
                            setVerified(false);
                            setState("idle");
                            setError("");
                          }}
                          placeholder="NST-24017-X7Q9"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-mono text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>

                      {/* Status */}
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <TokenStatus
                          title="Referral"
                          value={verified ? "Matched" : "Pending"}
                          good={verified}
                        />

                        <TokenStatus
                          title="Token"
                          value={verified ? "Valid" : "Pending"}
                          good={verified}
                        />

                        <TokenStatus
                          title="Field Access"
                          value={verified ? "Allowed" : "Locked"}
                          good={verified}
                        />
                      </div>

                      {error && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                          <p className="text-xs font-medium text-red-700">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={state === "verifying"}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087f78] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#066b65] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {state === "verifying" ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Verifying...
                          </>
                        ) : verified ? (
                          <>
                            Open Field Workspace
                            <span className="text-base">
                              →
                            </span>
                          </>
                        ) : (
                          <>
                            Verify Referral
                            <span className="text-base">
                              →
                            </span>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* QR error */}
                  {method === "qr" && error && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-xs font-medium text-red-700">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Success */}
                  {verified && (
                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-emerald-700 shadow-sm">
                          ✓
                        </div>

                        <div>
                          <p className="text-xs font-bold text-emerald-900">
                            Field access verified
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-emerald-800">
                            Referral {referralId} is verified for the ASHA /
                            ANM workspace.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security */}
                  <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                        <LockIcon />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-amber-900">
                          Patient information stays protected
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-amber-800">
                          The referral QR is for verification, not for
                          carrying clinical information. Production access
                          should be authorized by the backend.
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
                      Prototype verification
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-5 text-center text-[9px] text-slate-400">
            Authorized ASHA / ANM users only
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function VerifyStep({
  number,
  title,
  detail,
  current = false,
  complete = false,
}: {
  number: string;
  title: string;
  detail: string;
  current?: boolean;
  complete?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
          complete
            ? "bg-[#087f78] text-white"
            : current
            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
            : "border border-slate-200 bg-white text-slate-400"
        }`}
      >
        {complete ? "✓" : number}
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

function Connector() {
  return (
    <div className="ml-4 h-5 border-l border-dashed border-slate-200" />
  );
}

function TokenStatus({
  title,
  value,
  good,
}: {
  title: string;
  value: string;
  good: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <div className="mt-1 flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            good ? "bg-emerald-500" : "bg-amber-400"
          }`}
        />

        <p className="text-[10px] font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
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
    <div className="h-40 w-40 rounded-xl bg-white p-3 shadow-lg">
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