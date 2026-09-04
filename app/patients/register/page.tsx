"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  HeartPulse,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import AadhaarAbhaModal from "../../components/AadhaarAbhaModal";

export default function RegisterPatientPage() {
  const [submitted, setSubmitted] = useState(false);
  const [verifiedAadhaar, setVerifiedAadhaar] = useState("");
  const [verifiedAbha, setVerifiedAbha] = useState("");
  const [modalType, setModalType] = useState<"aadhaar" | "abha" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!verifiedAadhaar) {
      setModalType("aadhaar");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") || "Registered Patient");
    const mobile = String(formData.get("mobile") || "98XXXXXX00");
    const gender = String(formData.get("gender") || "Other");
    const district = String(formData.get("district") || formData.get("address") || "Jaipur");
    const newId = `NS-${Math.floor(10000 + Math.random() * 90000)}`;

    const rawAge = formData.get("age");
    const rawDob = formData.get("dob");

    let age = 0;
    if (rawAge !== null && rawAge !== "") {
      const parsed = Number(rawAge);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 130) {
        age = Math.floor(parsed);
      }
    } else if (rawDob && typeof rawDob === "string") {
      const birthDate = new Date(rawDob);
      if (!Number.isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculated = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          calculated--;
        }
        if (calculated >= 0 && calculated <= 130) {
          age = calculated;
        }
      }
    }

    const newPatient = {
      id: newId,
      name: fullName,
      age,
      gender,
      mobile,
      phone: mobile,
      village: district,
      status: "Active Referral",
      lastVisit: "Today",
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("niramaya_patients") || "[]"
      );
      localStorage.setItem(
        "niramaya_patients",
        JSON.stringify([newPatient, ...existing])
      );

      const ashaExisting = JSON.parse(
        localStorage.getItem("niramaya_asha_patients") || "[]"
      );
      const initials =
        fullName
          .split(" ")
          .filter(Boolean)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "PT";
      const ashaPatient = {
        id: newId,
        name: fullName,
        initials,
        age,
        gender,
        phone: mobile,
        village: district,
        condition: "General Medicine",
        status: "Active",
        lastVisit: "Today",
      };
      localStorage.setItem(
        "niramaya_asha_patients",
        JSON.stringify([ashaPatient, ...ashaExisting])
      );
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
                <HeartPulse size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  NIRAMAYA-SETU
                </p>
                <p className="text-[10px] text-slate-500">
                  Care Continuity Platform
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Check size={32} />
            </div>

            <p className="mt-6 text-sm font-semibold text-teal-700">
              REGISTRATION COMPLETE
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Patient registered successfully
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              The patient profile has been created in NIRAMAYA-SETU. A unique
              SEVA Patient ID will be assigned by the backend service.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left">
              <p className="text-xs text-slate-400">Current status</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                Pending backend registration
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/patients"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Patients
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex flex-1 items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Register Another
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/patients"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Patients
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={17} className="text-teal-700" />
            Secure registration
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-8 lg:py-10">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            PATIENT REGISTRATION
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Register new patient
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create a patient profile with identity, contact, location and
            basic health information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Personal details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Personal Details
                </h2>
                <p className="text-xs text-slate-500">
                  Basic information about the patient
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Full name"
                name="fullName"
                placeholder="Enter full name"
                required
              />

              <Field
                label="Mobile number"
                name="mobile"
                type="tel"
                placeholder="Enter mobile number"
                required
              />

              <Field
                label="Date of birth"
                name="dob"
                type="date"
              />

              <SelectField
                label="Gender"
                name="gender"
                options={["Male", "Female", "Other"]}
              />

              <SelectField
                label="Blood group"
                name="bloodGroup"
                options={[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ]}
              />

              <Field
                label="Emergency contact"
                name="emergencyContact"
                type="tel"
                placeholder="Emergency contact number"
              />
            </div>
          </section>

          {/* Identity */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Identity Details
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Identity information is kept separate from the SEVA Patient ID.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Aadhaar Identity</span>
                  {verifiedAadhaar ? (
                    <span className="text-[10px] font-bold text-emerald-600">✓ VERIFIED (MASKED)</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalType("aadhaar")}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800"
                    >
                      + Verify Aadhaar
                    </button>
                  )}
                </label>
                <input
                  name="aadhaar"
                  readOnly={Boolean(verifiedAadhaar)}
                  value={verifiedAadhaar}
                  placeholder={verifiedAadhaar ? "" : "Click '+ Verify Aadhaar' for safe OTP verification"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>ABHA ID / Address</span>
                  {verifiedAbha ? (
                    <span className="text-[10px] font-bold text-emerald-600">✓ VERIFIED</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalType("abha")}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800"
                    >
                      + Verify ABHA
                    </button>
                  )}
                </label>
                <input
                  name="abha"
                  readOnly={Boolean(verifiedAbha)}
                  value={verifiedAbha}
                  placeholder={verifiedAbha ? "" : "Click '+ Verify ABHA' to link health ID"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-800 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="sevaId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  SEVA Patient ID
                </label>

                <input
                  id="sevaId"
                  name="sevaId"
                  disabled
                  placeholder="Auto-assigned (e.g. NS-10284)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
                />
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Prototype verification — backend UIDAI/ABDM integration required.
            </p>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Address & Location
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Helps the frontline worker and facility team identify the
                patient&apos;s care area.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Village / Locality"
                name="village"
                placeholder="Enter village or locality"
                required
              />

              <Field
                label="Block"
                name="block"
                placeholder="Enter block"
              />

              <Field
                label="District"
                name="district"
                placeholder="Enter district"
                required
              />

              <Field
                label="State"
                name="state"
                placeholder="Enter state"
                required
              />

              <Field
                label="PIN code"
                name="pincode"
                inputMode="numeric"
                placeholder="Enter PIN code"
                maxLength={6}
              />

              <SelectField
                label="Preferred care facility"
                name="facility"
                options={[
                  "Nearest PHC",
                  "Nearest CHC",
                  "District Hospital",
                  "No preference",
                ]}
              />
            </div>
          </section>

          {/* Health information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <HeartPulse size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Basic Health Information
                </h2>

                <p className="text-xs text-slate-500">
                  Initial information for continuity of care
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <TextAreaField
                label="Existing medical conditions"
                name="conditions"
                placeholder="e.g. hypertension, diabetes, asthma"
              />

              <TextAreaField
                label="Known allergies"
                name="allergies"
                placeholder="Enter known allergies or write None reported"
              />

              <TextAreaField
                label="Current medications"
                name="medications"
                placeholder="Enter current medicines, if any"
              />
            </div>
          </section>

          {/* Consent */}
          <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-teal-700"
              />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Consent & Data Sharing
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Confirm that the patient has provided appropriate consent for
                  their health information to be accessed for care and referral
                  purposes.
                </p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
              />

              <span className="text-sm leading-6 text-slate-700">
                I confirm that the patient has provided consent for their
                health information to be used for healthcare delivery,
                referrals and continuity of care.
              </span>
            </label>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/patients"
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Register Patient
            </button>
          </div>
        </form>

        {modalType && (
          <AadhaarAbhaModal
            type={modalType}
            onSuccess={(masked) => {
              if (modalType === "aadhaar") {
                setVerifiedAadhaar(masked);
              } else {
                setVerifiedAbha(masked);
              }
            }}
            onClose={() => setModalType(null)}
          />
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  inputMode,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        defaultValue=""
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}