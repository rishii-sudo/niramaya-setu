"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Patient = {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  village: string;
  address: string;
  condition: string;
  status: "Active";
  lastVisit: string;
};

export default function RegisterPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    village: "",
    address: "",
    condition: "",
  });

  const [saved, setSaved] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const existingPatients: Patient[] = JSON.parse(
      localStorage.getItem("niramaya_patients") || "[]"
    );

    const newPatient: Patient = {
      id: `NS-${Math.floor(10000 + Math.random() * 90000)}`,
      name: form.name,
      age: form.age,
      gender: form.gender,
      phone: form.phone,
      village: form.village,
      address: form.address,
      condition: form.condition || "General Medicine",
      status: "Active",
      lastVisit: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    localStorage.setItem(
      "niramaya_patients",
      JSON.stringify([newPatient, ...existingPatients])
    );

    setSaved(true);

    setTimeout(() => {
      router.push("/asha/patients");
    }, 500);
  }

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
              Register Patient
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add a new patient to your field-care records.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Patient Information */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-bold text-slate-900">
                Patient Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the patient's basic details.
              </p>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              <Field
                label="Patient Name"
                required
                value={form.name}
                onChange={(v) => updateField("name", v)}
                placeholder="e.g. Ramesh Kumar"
              />

              <Field
                label="Age"
                required
                type="number"
                value={form.age}
                onChange={(v) => updateField("age", v)}
                placeholder="e.g. 54"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  value={form.gender}
                  onChange={(e) =>
                    updateField("gender", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Field
                label="Phone Number"
                required
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="+91 98765 43210"
              />

              <Field
                label="Village / City"
                required
                value={form.village}
                onChange={(v) => updateField("village", v)}
                placeholder="e.g. Jaipur"
              />

              <Field
                label="Primary Condition"
                value={form.condition}
                onChange={(v) => updateField("condition", v)}
                placeholder="e.g. Diabetes"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Address
                </label>

                <textarea
                  value={form.address}
                  onChange={(e) =>
                    updateField("address", e.target.value)
                  }
                  rows={3}
                  placeholder="Enter patient's address..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Consent
            </h2>

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                required
                type="checkbox"
                className="mt-1 h-4 w-4 accent-teal-600"
              />

              <span className="text-sm text-slate-600">
                Patient has provided consent for their information
                to be recorded and used for care coordination.
              </span>
            </label>
          </section>

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
              {saved ? "Patient Registered ✓" : "Register Patient"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
      />
    </div>
  );
}