"use client";

import { useState } from "react";
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface AadhaarAbhaModalProps {
  type: "aadhaar" | "abha";
  onSuccess: (maskedValue: string) => void;
  onClose: () => void;
}

export default function AadhaarAbhaModal({
  type,
  onSuccess,
  onClose,
}: AadhaarAbhaModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = type === "aadhaar" ? "Aadhaar Identity Verification" : "ABHA ID Verification";

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!consentGiven) {
      setError("Please accept the identity verification consent terms.");
      return;
    }

    if (type === "aadhaar" && inputValue.replace(/\D/g, "").length !== 12) {
      setError("Enter a valid 12-digit Aadhaar number.");
      return;
    }

    if (type === "abha" && inputValue.trim().length < 6) {
      setError("Enter a valid ABHA Number or ABHA Address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Enter the 6-digit verification code sent to registered mobile.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Generate ONLY masked output. NEVER return or store raw Aadhaar!
      if (type === "aadhaar") {
        const last4 = inputValue.slice(-4);
        onSuccess(`XXXX-XXXX-${last4}`);
      } else {
        onSuccess(`${inputValue.slice(0, 4)}-XXXX-XXXX@abdm`);
      }
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-slate-700">
                {type === "aadhaar" ? "Enter 12-Digit Aadhaar Number" : "Enter ABHA ID / ABHA Address"}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={type === "aadhaar" ? "e.g. 5481 9204 1234" : "e.g. 91-8492-1029-4412"}
                maxLength={type === "aadhaar" ? 14 : 30}
                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600 font-mono"
              />
            </div>

            {/* Privacy Consent Box */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-teal-900 font-bold">
                <Lock size={13} />
                <span>Patient Privacy Guardrail</span>
              </div>
              <p className="text-[11px] text-teal-800 leading-relaxed">
                Raw identity numbers are verified directly via secure gateway simulation and will <strong>never be saved</strong> in browser memory, local storage, or printed QR codes. Only masked representation will be stored.
              </p>
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-teal-700"
                />
                <span className="text-[11px] font-semibold text-slate-700">
                  I give consent to share identity information for patient verification purposes.
                </span>
              </label>
            </div>

            {error && (
              <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                <AlertCircle size={13} /> {error}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800 disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Verify with OTP →"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-4 space-y-4 text-xs">
            <div>
              <p className="text-xs text-slate-600">
                A 6-digit verification OTP was sent to the linked mobile number. (Demo OTP: <code className="font-mono font-bold">123456</code>)
              </p>
              <label className="mt-3 mb-1 block font-semibold text-slate-700">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                className="w-full rounded-xl border border-slate-200 p-3 text-center text-lg font-mono tracking-widest outline-none focus:border-teal-600"
              />
            </div>

            {error && (
              <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                <AlertCircle size={13} /> {error}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Confirm & Mask Identity"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-400">
            Prototype verification — backend ABDM/UIDAI sandbox integration required.
          </p>
        </div>
      </div>
    </div>
  );
}
