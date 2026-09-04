"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReferralPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    patient: "",
    facility: "",
    department: "",
    priority: "",
    reason: "",
    notes: "",
    followUp: "7 days",
  });

  const [saved, setSaved] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      router.push("/referrals");
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#f4fbfb] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            ←
          </button>

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-teal-700">
              ASHA / ANM
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              Create Referral
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Refer a patient to the appropriate healthcare facility.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Patient */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-bold text-slate-900">
                Patient
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the patient who needs referral.
              </p>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Patient <span className="text-red-500">*</span>
              </label>

              <select
                required
                value={form.patient}
                onChange={(e) =>
                  updateField("patient", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
              >
                <option value="">Select patient</option>
                <option value="NS-10284">Ramesh Kumar — NS-10284</option>
                <option value="NS-10279">Sunita Devi — NS-10279</option>
                <option value="NS-10263">Kamla Devi — NS-10263</option>
                <option value="NS-10251">Mohan Lal — NS-10251</option>
                <option value="NS-10242">Rekha Sharma — NS-10242</option>
                <option value="NS-10231">Rajesh Meena — NS-10231</option>
                <option value="NS-10218">Pooja Devi — NS-10218</option>
                <option value="NS-10207">Gopal Singh — NS-10207</option>
              </select>
            </div>
          </section>

          {/* Referral Details */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-bold text-slate-900">
                Referral Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide the destination and reason for referral.
              </p>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Healthcare Facility{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  value={form.facility}
                  onChange={(e) =>
                    updateField("facility", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option value="">Select facility</option>
                  <option value="District Hospital Jaipur">
                    District Hospital Jaipur
                  </option>
                  <option value="CHC Chomu">
                    CHC Chomu
                  </option>
                  <option value="PHC Bassi">
                    PHC Bassi
                  </option>
                  <option value="SMS Hospital Jaipur">
                    SMS Hospital Jaipur
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Department{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  value={form.department}
                  onChange={(e) =>
                    updateField("department", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option value="">Select department</option>
                  <option value="General Medicine">
                    General Medicine
                  </option>
                  <option value="Cardiology">
                    Cardiology
                  </option>
                  <option value="Orthopedics">
                    Orthopedics
                  </option>
                  <option value="Gynecology">
                    Gynecology
                  </option>
                  <option value="Pediatrics">
                    Pediatrics
                  </option>
                  <option value="Emergency">
                    Emergency
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Priority{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  value={form.priority}
                  onChange={(e) =>
                    updateField("priority", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option value="">Select priority</option>
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Follow-up
                </label>

                <select
                  value={form.followUp}
                  onChange={(e) =>
                    updateField("followUp", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option value="3 days">3 days</option>
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="No follow-up">
                    No follow-up
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Reason for Referral{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  value={form.reason}
                  onChange={(e) =>
                    updateField("reason", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe why this patient needs referral..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Additional Notes
                </label>

                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    updateField("notes", e.target.value)
                  }
                  rows={3}
                  placeholder="Add any additional observations or instructions..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </div>

            </div>
          </section>

          {/* Info */}
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-800">
              Referral workflow
            </p>

            <p className="mt-1 text-sm text-blue-700">
              After submission, this referral will appear in the
              referrals workspace for tracking and follow-up.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saved}
              className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {saved ? "Referral Created ✓" : "Create Referral"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}