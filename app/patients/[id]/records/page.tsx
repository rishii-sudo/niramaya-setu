import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Droplets,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  TestTube,
} from "lucide-react";

type RecordsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const patientRecords = {
  "NS-10284": {
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    lastUpdated: "28 Aug 2026",

    vitals: [
      {
        label: "Blood Pressure",
        value: "148/92",
        unit: "mmHg",
        status: "Above target",
        icon: HeartPulse,
      },
      {
        label: "Heart Rate",
        value: "82",
        unit: "bpm",
        status: "Normal",
        icon: HeartPulse,
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        status: "Normal",
        icon: Droplets,
      },
      {
        label: "Weight",
        value: "71",
        unit: "kg",
        status: "Recorded",
        icon: ClipboardList,
      },
    ],

    diagnoses: [
      {
        date: "28 Aug 2026",
        diagnosis: "Hypertension",
        note: "Under monitoring",
        facility: "PHC Bassi",
      },
      {
        date: "15 Aug 2026",
        diagnosis: "Hypertension",
        note: "Follow-up assessment",
        facility: "Sub-Centre Bassi",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "126",
        unit: "mg/dL",
        date: "28 Aug 2026",
        status: "Reviewed",
      },
      {
        test: "Hemoglobin",
        result: "13.8",
        unit: "g/dL",
        date: "28 Aug 2026",
        status: "Normal",
      },
      {
        test: "Serum Creatinine",
        result: "1.0",
        unit: "mg/dL",
        date: "28 Aug 2026",
        status: "Normal",
      },
    ],

    medications: [
      {
        medicine: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        medicine: "Atorvastatin",
        dosage: "10 mg",
        frequency: "Once at night",
        duration: "30 days",
      },
    ],

    visits: [
      {
        date: "28 Aug 2026",
        facility: "PHC Bassi",
        doctor: "Dr. Anil Sharma",
        type: "Initial assessment",
        note: "Patient assessed and referred for cardiology consultation.",
      },
      {
        date: "15 Aug 2026",
        facility: "Sub-Centre Bassi",
        doctor: "ANM Meena",
        type: "Follow-up",
        note: "Routine follow-up and blood pressure monitoring.",
      },
      {
        date: "02 Aug 2026",
        facility: "PHC Bassi",
        doctor: "Dr. Anil Sharma",
        type: "Vital check",
        note: "Vitals recorded during community follow-up.",
      },
    ],
  },

  "NS-10279": {
    name: "Sunita Devi",
    patientId: "NS-10279",
    age: 46,
    gender: "Female",
    bloodGroup: "A+",
    lastUpdated: "27 Aug 2026",

    vitals: [
      {
        label: "Blood Pressure",
        value: "136/86",
        unit: "mmHg",
        status: "Monitoring",
        icon: HeartPulse,
      },
      {
        label: "Heart Rate",
        value: "78",
        unit: "bpm",
        status: "Normal",
        icon: HeartPulse,
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        status: "Normal",
        icon: Droplets,
      },
      {
        label: "Weight",
        value: "64",
        unit: "kg",
        status: "Recorded",
        icon: ClipboardList,
      },
    ],

    diagnoses: [
      {
        date: "27 Aug 2026",
        diagnosis: "Type 2 Diabetes",
        note: "Under treatment",
        facility: "PHC Chomu",
      },
      {
        date: "12 Aug 2026",
        diagnosis: "Hypertension",
        note: "Under monitoring",
        facility: "PHC Chomu",
      },
    ],

    labs: [
      {
        test: "HbA1c",
        result: "7.2",
        unit: "%",
        date: "27 Aug 2026",
        status: "Reviewed",
      },
      {
        test: "Blood Glucose",
        result: "142",
        unit: "mg/dL",
        date: "27 Aug 2026",
        status: "Monitoring",
      },
      {
        test: "Hemoglobin",
        result: "12.9",
        unit: "g/dL",
        date: "12 Aug 2026",
        status: "Normal",
      },
    ],

    medications: [
      {
        medicine: "Metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        duration: "30 days",
      },
      {
        medicine: "Losartan",
        dosage: "50 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],

    visits: [
      {
        date: "27 Aug 2026",
        facility: "PHC Chomu",
        doctor: "Dr. Kavita Mehta",
        type: "Follow-up",
        note: "Diabetes review and referral for further consultation.",
      },
      {
        date: "12 Aug 2026",
        facility: "PHC Chomu",
        doctor: "Dr. Kavita Mehta",
        type: "Consultation",
        note: "Initial diabetes assessment.",
      },
    ],
  },

  "NS-10271": {
    name: "Mohan Lal",
    patientId: "NS-10271",
    age: 61,
    gender: "Male",
    bloodGroup: "O+",
    lastUpdated: "25 Aug 2026",

    vitals: [
      {
        label: "Blood Pressure",
        value: "128/82",
        unit: "mmHg",
        status: "Controlled",
        icon: HeartPulse,
      },
      {
        label: "Heart Rate",
        value: "74",
        unit: "bpm",
        status: "Normal",
        icon: HeartPulse,
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        status: "Normal",
        icon: Droplets,
      },
      {
        label: "Weight",
        value: "69",
        unit: "kg",
        status: "Recorded",
        icon: ClipboardList,
      },
    ],

    diagnoses: [
      {
        date: "25 Aug 2026",
        diagnosis: "Hypertension",
        note: "Controlled",
        facility: "PHC Bagru",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "104",
        unit: "mg/dL",
        date: "25 Aug 2026",
        status: "Normal",
      },
      {
        test: "Serum Creatinine",
        result: "0.9",
        unit: "mg/dL",
        date: "25 Aug 2026",
        status: "Normal",
      },
    ],

    medications: [
      {
        medicine: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],

    visits: [
      {
        date: "25 Aug 2026",
        facility: "PHC Bagru",
        doctor: "Dr. Rajesh Gupta",
        type: "Specialist review",
        note: "Routine specialist review completed.",
      },
      {
        date: "10 Aug 2026",
        facility: "PHC Bagru",
        doctor: "Dr. Rajesh Gupta",
        type: "Medication review",
        note: "Current medication reviewed.",
      },
    ],
  },

  "NS-10263": {
    name: "Kamla Devi",
    patientId: "NS-10263",
    age: 58,
    gender: "Female",
    bloodGroup: "B-",
    lastUpdated: "22 Aug 2026",

    vitals: [
      {
        label: "Blood Pressure",
        value: "130/84",
        unit: "mmHg",
        status: "Controlled",
        icon: HeartPulse,
      },
      {
        label: "Heart Rate",
        value: "76",
        unit: "bpm",
        status: "Normal",
        icon: HeartPulse,
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        status: "Normal",
        icon: Droplets,
      },
      {
        label: "Weight",
        value: "66",
        unit: "kg",
        status: "Recorded",
        icon: ClipboardList,
      },
    ],

    diagnoses: [
      {
        date: "22 Aug 2026",
        diagnosis: "Knee Osteoarthritis",
        note: "Specialist consultation completed",
        facility: "District Hospital Jaipur",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "110",
        unit: "mg/dL",
        date: "22 Aug 2026",
        status: "Normal",
      },
    ],

    medications: [
      {
        medicine: "Pain management",
        dosage: "As prescribed",
        frequency: "As directed",
        duration: "14 days",
      },
    ],

    visits: [
      {
        date: "22 Aug 2026",
        facility: "District Hospital Jaipur",
        doctor: "Dr. Priya Singh",
        type: "Specialist consultation",
        note: "Orthopedic consultation completed.",
      },
      {
        date: "08 Aug 2026",
        facility: "PHC Sanganer",
        doctor: "Dr. Priya Singh",
        type: "Referral",
        note: "Referral created for orthopedic consultation.",
      },
    ],
  },
};

export default async function MedicalRecordsPage({
  params,
}: RecordsPageProps) {
  const { id } = await params;

  const record =
    patientRecords[id as keyof typeof patientRecords];

  if (!record) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Patient records not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No medical records exist for patient ID {id}.
          </p>

          <Link
            href="/patients"
            className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
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
            href={`/patients/${record.patientId}`}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Patient Profile
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={17} className="text-teal-700" />
            Consent-based access
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              MEDICAL RECORDS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {record.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {record.patientId} • {record.age} years •{" "}
              {record.gender} • Blood Group {record.bloodGroup}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-slate-400">
              Last updated
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {record.lastUpdated}
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Active conditions"
            value={record.diagnoses.length.toString()}
            subtitle="Recorded diagnoses"
            icon={Stethoscope}
          />

          <SummaryCard
            title="Recent lab tests"
            value={record.labs.length.toString()}
            subtitle="Latest available results"
            icon={TestTube}
          />

          <SummaryCard
            title="Current medicines"
            value={record.medications.length.toString()}
            subtitle="Medication records"
            icon={Pill}
          />
        </div>

        {/* Vitals */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              Latest Vitals
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Most recent recorded measurements
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {record.vitals.map((vital) => {
              const Icon = vital.icon;

              return (
                <div
                  key={vital.label}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">
                      {vital.label}
                    </p>

                    <Icon
                      size={18}
                      className="text-teal-700"
                    />
                  </div>

                  <div className="mt-3 flex items-end gap-1">
                    <p className="text-2xl font-bold text-slate-900">
                      {vital.value}
                    </p>

                    <p className="pb-1 text-xs text-slate-500">
                      {vital.unit}
                    </p>
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {vital.status}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Diagnoses + Medications */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Diagnoses */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Stethoscope size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Diagnoses
                </h2>

                <p className="text-xs text-slate-500">
                  Recorded clinical conditions
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {record.diagnoses.map((diagnosis) => (
                <div
                  key={`${diagnosis.date}-${diagnosis.diagnosis}`}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {diagnosis.diagnosis}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {diagnosis.facility}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-teal-700">
                      {diagnosis.date}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">
                    {diagnosis.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Medications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Pill size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Current Medications
                </h2>

                <p className="text-xs text-slate-500">
                  Latest medication records
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {record.medications.map((medicine) => (
                <div
                  key={medicine.medicine}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-900">
                      {medicine.medicine}
                    </p>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {medicine.duration}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
                    <p>
                      Dose:{" "}
                      <span className="font-medium text-slate-700">
                        {medicine.dosage}
                      </span>
                    </p>

                    <p>
                      Frequency:{" "}
                      <span className="font-medium text-slate-700">
                        {medicine.frequency}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Lab Reports */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <TestTube size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Lab Reports
              </h2>

              <p className="text-xs text-slate-500">
                Latest laboratory results
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Test</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {record.labs.map((lab) => (
                  <tr key={`${lab.test}-${lab.date}`}>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      {lab.test}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {lab.result} {lab.unit}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {lab.date}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                        {lab.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        <FileText size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visit Timeline */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <CalendarDays size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Care Timeline
              </h2>

              <p className="text-xs text-slate-500">
                Previous healthcare interactions
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {record.visits.map((visit, index) => (
              <div
                key={`${visit.date}-${visit.facility}`}
                className="relative flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <CalendarDays size={17} />
                  </div>

                  {index !== record.visits.length - 1 && (
                    <div className="mt-2 h-full min-h-10 w-px bg-slate-200" />
                  )}
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {visit.type}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {visit.facility}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-teal-700">
                      {visit.date}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {visit.doctor}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {visit.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}