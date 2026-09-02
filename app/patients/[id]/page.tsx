import {
  ArrowLeft,
  CalendarDays,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

type PatientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const patients = {
  "NS-10284": {
    name: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    aadhaar: "XXXX XXXX 4821",
    abha: "91-XXXX-XXXX-1234",
    mobile: "98XXXXXX42",
    village: "Bassi, Jaipur",
    bloodGroup: "B+",
    status: "Active Patient",
    referralId: "NS-28491",
    referralFrom: "PHC Bassi",
    referralTo: "District Hospital Jaipur",
    referralReason: "Cardiology consultation",
    referralStatus: "In Progress",
    referralDate: "28 Aug 2026",
    visits: [
      {
        date: "28 Aug 2026",
        facility: "PHC Bassi",
        note: "Initial assessment and referral created",
      },
      {
        date: "15 Aug 2026",
        facility: "Sub-Centre Bassi",
        note: "Routine follow-up",
      },
      {
        date: "02 Aug 2026",
        facility: "PHC Bassi",
        note: "Blood pressure and vitals recorded",
      },
    ],
    history: {
      hypertension: "Under monitoring",
      diabetes: "No known history",
      allergies: "None reported",
      medication: "As prescribed",
    },
  },

  "NS-10279": {
    name: "Sunita Devi",
    age: 46,
    gender: "Female",
    aadhaar: "XXXX XXXX 9176",
    abha: "91-XXXX-XXXX-5612",
    mobile: "97XXXXXX18",
    village: "Chomu, Jaipur",
    bloodGroup: "A+",
    status: "Follow-up Due",
    referralId: "NS-28478",
    referralFrom: "PHC Chomu",
    referralTo: "District Hospital Jaipur",
    referralReason: "General medicine consultation",
    referralStatus: "Follow-up Due",
    referralDate: "27 Aug 2026",
    visits: [
      {
        date: "27 Aug 2026",
        facility: "PHC Chomu",
        note: "Follow-up assessment completed",
      },
      {
        date: "12 Aug 2026",
        facility: "PHC Chomu",
        note: "Initial consultation",
      },
      {
        date: "04 Aug 2026",
        facility: "Sub-Centre Chomu",
        note: "Community health visit",
      },
    ],
    history: {
      hypertension: "Under monitoring",
      diabetes: "Type 2 diabetes",
      allergies: "None reported",
      medication: "Metformin as prescribed",
    },
  },

  "NS-10271": {
    name: "Mohan Lal",
    age: 61,
    gender: "Male",
    aadhaar: "XXXX XXXX 3045",
    abha: "91-XXXX-XXXX-7821",
    mobile: "96XXXXXX73",
    village: "Bagru, Jaipur",
    bloodGroup: "O+",
    status: "Stable",
    referralId: "NS-28461",
    referralFrom: "PHC Bagru",
    referralTo: "District Hospital Jaipur",
    referralReason: "Routine specialist review",
    referralStatus: "Completed",
    referralDate: "25 Aug 2026",
    visits: [
      {
        date: "25 Aug 2026",
        facility: "PHC Bagru",
        note: "Routine specialist review",
      },
      {
        date: "10 Aug 2026",
        facility: "PHC Bagru",
        note: "Medication review",
      },
      {
        date: "28 Jul 2026",
        facility: "PHC Bagru",
        note: "Vitals and health assessment",
      },
    ],
    history: {
      hypertension: "Controlled",
      diabetes: "No known history",
      allergies: "Penicillin reported",
      medication: "Amlodipine 5mg",
    },
  },

  "NS-10263": {
    name: "Kamla Devi",
    age: 58,
    gender: "Female",
    aadhaar: "XXXX XXXX 6159",
    abha: "91-XXXX-XXXX-3490",
    mobile: "95XXXXXX26",
    village: "Sanganer, Jaipur",
    bloodGroup: "B-",
    status: "Referral Closed",
    referralId: "NS-28432",
    referralFrom: "PHC Sanganer",
    referralTo: "District Hospital Jaipur",
    referralReason: "Orthopedic consultation",
    referralStatus: "Closed",
    referralDate: "22 Aug 2026",
    visits: [
      {
        date: "22 Aug 2026",
        facility: "District Hospital Jaipur",
        note: "Specialist consultation completed",
      },
      {
        date: "08 Aug 2026",
        facility: "PHC Sanganer",
        note: "Referral created",
      },
      {
        date: "20 Jul 2026",
        facility: "PHC Sanganer",
        note: "Initial assessment",
      },
    ],
    history: {
      hypertension: "Under monitoring",
      diabetes: "No known history",
      allergies: "None reported",
      medication: "Pain management as prescribed",
    },
  },
};

export default async function PatientPage({
  params,
}: PatientPageProps) {
  const { id } = await params;

  const patient = patients[id as keyof typeof patients];

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Patient not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No patient record exists for ID: {id}
          </p>

          <Link
            href="/patients"
            className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Back to Patients
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/patients"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Patients
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={17} className="text-teal-700" />
            Consent-based access
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Page heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            PATIENT PROFILE
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {patient.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Patient ID: {id}
              </p>
            </div>

            <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              {patient.status}
            </span>
          </div>
        </div>

        {/* Identity */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <UserRound size={28} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {patient.age} years • {patient.gender} • Blood Group{" "}
                  {patient.bloodGroup}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={15} />
                  {patient.village}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-400">Aadhaar</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {patient.aadhaar}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">ABHA</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {patient.abha}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Mobile</p>
                <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-800">
                  <Phone size={14} />
                  {patient.mobile}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Care Journey */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <HeartPulse size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Current Care Journey
              </h2>

              <p className="text-xs text-slate-500">
                Latest referral and treatment progression
              </p>
            </div>
          </div>

          <div className="mt-7 overflow-x-auto">
            <div className="flex min-w-[700px] items-center">
              <JourneyStep
                title="PHC Visit"
                date={patient.visits[0]?.date ?? "-"}
                completed
              />

              <JourneyLine completed />

              <JourneyStep
                title="Referral Created"
                date={patient.referralDate}
                completed
              />

              <JourneyLine completed />

              <JourneyStep
                title={patient.referralTo}
                date={patient.referralStatus}
                active
              />

              <JourneyLine />

              <JourneyStep
                title="Specialist"
                date={
                  patient.referralStatus === "Closed"
                    ? "Completed"
                    : "Pending"
                }
              />
            </div>
          </div>
        </div>

        {/* Referral + Recent Visits */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Active Referral */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Active Referral
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest referral record
                </p>
              </div>

              <FileText className="text-teal-700" size={21} />
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    Referral #{patient.referralId}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {patient.referralFrom} → {patient.referralTo}
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  {patient.referralStatus}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Reason</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {patient.referralReason}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Created</p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-800">
                    <CalendarDays size={14} />
                    {patient.referralDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Visits */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold text-slate-900">
              Recent Visits
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest care interactions
            </p>

            <div className="mt-5 space-y-4">
              {patient.visits.map((visit) => (
                <Visit
                  key={`${visit.date}-${visit.facility}`}
                  date={visit.date}
                  facility={visit.facility}
                  note={visit.note}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Medical History
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current health information
              </p>
            </div>

            {/* Medical Records button */}
            <Link
              href={`/patients/${id}/records`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <FileText size={17} />
              View Medical Records
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Info
              label="Hypertension"
              value={patient.history.hypertension}
            />

            <Info
              label="Diabetes"
              value={patient.history.diabetes}
            />

            <Info
              label="Allergies"
              value={patient.history.allergies}
            />

            <Info
              label="Current Medication"
              value={patient.history.medication}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function JourneyStep({
  title,
  date,
  completed,
  active,
}: {
  title: string;
  date: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex min-w-[140px] flex-col items-center text-center">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
          completed
            ? "border-teal-700 bg-teal-700 text-white"
            : active
              ? "border-teal-600 bg-teal-50 text-teal-700"
              : "border-slate-300 bg-white text-slate-400"
        }`}
      >
        {completed ? "✓" : "•"}
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {date}
      </p>
    </div>
  );
}

function JourneyLine({ completed }: { completed?: boolean }) {
  return (
    <div
      className={`h-0.5 min-w-[70px] flex-1 ${
        completed ? "bg-teal-600" : "bg-slate-200"
      }`}
    />
  );
}

function Visit({
  date,
  facility,
  note,
}: {
  date: string;
  facility: string;
  note: string;
}) {
  return (
    <div className="border-l-2 border-slate-200 pl-4">
      <p className="text-xs font-medium text-teal-700">{date}</p>

      <p className="mt-1 text-sm font-semibold text-slate-900">
        {facility}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {note}
      </p>
    </div>
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
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}