"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPatient } from "@/app/data/patientData";

type Patient = {
  id: string;
  name: string;
  age: number | string;
  gender: string;
  phone: string;
  location: string;
  condition: string;
  status: string;
  lastVisit: string;
  address?: string;
};

const defaultPatients: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    phone: "+91 98765 43210",
    location: "Jaipur",
    condition: "Cardiology",
    status: "Discharged",
    lastVisit: "03 Sep 2026",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 47,
    gender: "Female",
    phone: "+91 98765 12345",
    location: "Chomu",
    condition: "General Medicine",
    status: "Follow-up Due",
    lastVisit: "02 Sep 2026",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 61,
    gender: "Female",
    phone: "+91 99887 66554",
    location: "Bassi",
    condition: "General Medicine",
    status: "Active",
    lastVisit: "01 Sep 2026",
  },
  {
    id: "NS-10271",
    name: "Mohan Lal",
    age: 61,
    gender: "Male",
    phone: "+91 98765 98765",
    location: "Bagru",
    condition: "General Medicine",
    status: "Closed",
    lastVisit: "25 Aug 2026",
  },
];

export default function PatientDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientId = Array.isArray(params.id)
      ? params.id[0]
      : params.id;

    if (!patientId) {
      setLoading(false);
      return;
    }

    let foundPatient: Patient | null = null;

    // First check default/demo patients
    const defaultPatient = defaultPatients.find(
      (item) => item.id === patientId
    );

    if (defaultPatient) {
      foundPatient = defaultPatient;
    }

    // Search browser localStorage for newly registered patients
    if (!foundPatient) {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);

          if (!key) continue;

          const raw = localStorage.getItem(key);

          if (!raw) continue;

          try {
            const parsed = JSON.parse(raw);

            // Case 1: localStorage contains an array
            if (Array.isArray(parsed)) {
              const match = parsed.find((item: unknown) => {
                if (!item || typeof item !== "object") return false;

                const data = item as Record<string, unknown>;

                return (
                  String(data.id ?? "") === patientId ||
                  String(data.patientId ?? "") === patientId
                );
              });

              if (match) {
                foundPatient = normalizePatient(match as Record<string, unknown>);
                break;
              }
            }

            // Case 2: localStorage contains an object
            if (
              parsed &&
              typeof parsed === "object" &&
              !Array.isArray(parsed)
            ) {
              const data = parsed as Record<string, unknown>;

              if (
                String(data.id ?? "") === patientId ||
                String(data.patientId ?? "") === patientId
              ) {
                foundPatient = normalizePatient(data);
                break;
              }

              // Case 3: object contains patients array
              if (Array.isArray(data.patients)) {
                const match = data.patients.find((item: unknown) => {
                  if (!item || typeof item !== "object") return false;

                  const patient = item as Record<string, unknown>;

                  return (
                    String(patient.id ?? "") === patientId ||
                    String(patient.patientId ?? "") === patientId
                  );
                });

                if (match) {
                  foundPatient = normalizePatient(
                    match as Record<string, unknown>
                  );
                  break;
                }
              }
            }
          } catch {
            // Ignore non-JSON localStorage values
          }
        }
      } catch {
        // localStorage unavailable
      }
    }

    if (!foundPatient) {
      const canonical = getPatient(patientId);
      if (canonical) {
        foundPatient = {
          id: canonical.patientId,
          name: canonical.name,
          age: canonical.age,
          gender: canonical.gender,
          phone: canonical.mobile,
          location: canonical.village || "Jaipur",
          condition: canonical.referralReason || "General Medicine",
          status: canonical.referralStatus,
          lastVisit: "01 Sep 2026",
          address: canonical.village,
        };
      }
    }

    setPatient(foundPatient);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4fbfb] px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading patient record...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!patient) {
    return (
      <main className="min-h-screen bg-[#f4fbfb] px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
              !
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-950">
              Patient not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              No patient record exists for this ID.
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Patient ID: {String(params.id)}
            </p>

            <button
              onClick={() => router.push("/asha/patients")}
              className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Patients
            </button>
          </div>
        </div>
      </main>
    );
  }

  const initials = patient.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#f4fbfb] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <button
            onClick={() => router.push("/asha/patients")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            ←
          </button>

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-teal-700">
              ASHA / ANM
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              Patient Profile
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Patient record and care journey details.
            </p>
          </div>
        </div>

        {/* Patient Profile Card */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-lg font-bold text-teal-700">
                {initials}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {patient.id} • {patient.age} years • {patient.gender}
                </p>
              </div>
            </div>

            <StatusBadge status={patient.status} />
          </div>
        </section>

        {/* Information */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Patient Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-slate-900">
              Patient Information
            </h2>

            <Info label="Patient ID" value={patient.id} />
            <Info label="Age" value={`${patient.age} years`} />
            <Info label="Gender" value={patient.gender} />
            <Info label="Phone" value={patient.phone} />

            {patient.address && (
              <Info label="Address" value={patient.address} />
            )}
          </section>

          {/* Care Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-slate-900">
              Care Information
            </h2>

            <Info label="Location" value={patient.location} />
            <Info label="Condition" value={patient.condition} />
            <Info label="Last Visit" value={patient.lastVisit} />
            <Info label="Status" value={patient.status} />
          </section>

        </div>

        {/* Quick Actions */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage activities for this patient.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={() => router.push("/asha/visits")}
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Record Visit
            </button>

            <button
              onClick={() => router.push("/asha/follow-ups")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Follow-ups
            </button>

            <button
              onClick={() => router.push("/asha/create-referral")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Create Referral
            </button>

          </div>
        </section>

        {/* Local Storage Info */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ℹ
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-800">
                Patient data is stored locally
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                This patient record is currently loaded from browser
                localStorage. Backend API integration can replace this
                storage later.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function normalizePatient(
  data: Record<string, unknown>
): Patient {
  return {
    id: String(data.id ?? data.patientId ?? "Unknown"),
    name: String(data.name ?? "Unknown Patient"),
    age: String(data.age ?? "-"),
    gender: String(data.gender ?? "-"),
    phone: String(data.phone ?? "-"),
    location: String(
      data.location ??
        data.village ??
        data.city ??
        "-"
    ),
    condition: String(
      data.condition ??
        data.primaryCondition ??
        "-"
    ),
    status: String(data.status ?? "Active"),
    lastVisit: String(
      data.lastVisit ??
        data.registeredDate ??
        "03 Sep 2026"
    ),
    address: data.address
      ? String(data.address)
      : undefined,
  };
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized = status.toLowerCase();

  let className =
    "bg-teal-50 text-teal-700";

  if (normalized.includes("discharged")) {
    className =
      "bg-emerald-50 text-emerald-700";
  } else if (normalized.includes("follow")) {
    className =
      "bg-amber-50 text-amber-700";
  } else if (normalized.includes("active")) {
    className =
      "bg-teal-50 text-teal-700";
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${className}`}
    >
      {status}
    </span>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-5 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}