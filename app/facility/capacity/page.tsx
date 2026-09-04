"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  Clock3,
  Hospital,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPatient,
  type PatientRecord,
  type ReferralStatus,
} from "@/app/data/patientData";

import {
  getAllReferralStates,
  setReferralStatus,
} from "@/app/data/referralState";

type BedStatus =
  | "Available"
  | "Occupied"
  | "Reserved";

type Bed = {
  id: string;
  ward: string;
  room: string;
  type: string;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
};

type AssignmentState = Record<
  string,
  {
    patientId: string;
    patientName: string;
    assignedAt: string;
  }
>;

const patientIds = [
  "NS-10284",
  "NS-10279",
  "NS-10271",
  "NS-10263",
];

const initialBeds: Bed[] = [
  {
    id: "GW-101",
    ward: "General Ward",
    room: "Room 101",
    type: "General",
    status: "Available",
  },
  {
    id: "GW-102",
    ward: "General Ward",
    room: "Room 101",
    type: "General",
    status: "Available",
  },
  {
    id: "GW-103",
    ward: "General Ward",
    room: "Room 101",
    type: "General",
    status: "Occupied",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
  },
  {
    id: "GW-104",
    ward: "General Ward",
    room: "Room 101",
    type: "General",
    status: "Available",
  },
  {
    id: "GW-105",
    ward: "General Ward",
    room: "Room 102",
    type: "General",
    status: "Available",
  },
  {
    id: "GW-106",
    ward: "General Ward",
    room: "Room 102",
    type: "General",
    status: "Available",
  },
  {
    id: "CAR-201",
    ward: "Cardiology",
    room: "Room 201",
    type: "Cardiology",
    status: "Available",
  },
  {
    id: "CAR-202",
    ward: "Cardiology",
    room: "Room 201",
    type: "Cardiology",
    status: "Occupied",
  },
  {
    id: "CAR-203",
    ward: "Cardiology",
    room: "Room 202",
    type: "Cardiology",
    status: "Available",
  },
  {
    id: "CAR-204",
    ward: "Cardiology",
    room: "Room 202",
    type: "Cardiology",
    status: "Available",
  },
  {
    id: "ORT-301",
    ward: "Orthopedics",
    room: "Room 301",
    type: "Orthopedics",
    status: "Available",
  },
  {
    id: "ORT-302",
    ward: "Orthopedics",
    room: "Room 301",
    type: "Orthopedics",
    status: "Occupied",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
  },
  {
    id: "ORT-303",
    ward: "Orthopedics",
    room: "Room 302",
    type: "Orthopedics",
    status: "Available",
  },
  {
    id: "ICU-401",
    ward: "ICU",
    room: "ICU 01",
    type: "ICU",
    status: "Available",
  },
  {
    id: "ICU-402",
    ward: "ICU",
    room: "ICU 02",
    type: "ICU",
    status: "Occupied",
  },
  {
    id: "ICU-403",
    ward: "ICU",
    room: "ICU 03",
    type: "ICU",
    status: "Available",
  },
];

const storageKey =
  "niramaya-facility-bed-assignments";

export default function FacilityCapacityPage() {
  const [beds, setBeds] =
    useState<Bed[]>(initialBeds);

  const [referralStates, setReferralStates] =
    useState<
      Record<string, ReferralStatus>
    >({});

  const [assignments, setAssignments] =
    useState<AssignmentState>({});

  const [isHydrated, setIsHydrated] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState("");

  const [selectedBed, setSelectedBed] =
    useState("");

  const [wardFilter, setWardFilter] =
    useState("All");

  const [message, setMessage] =
    useState("");

  const patients = useMemo(() => {
    return patientIds
      .map((id) => getPatient(id))
      .filter(
        (
          patient,
        ): patient is PatientRecord =>
          Boolean(patient),
      );
  }, []);

  useEffect(() => {
    const states =
      getAllReferralStates();

    setReferralStates(states);

    try {
      const stored =
        window.localStorage.getItem(
          storageKey,
        );

      if (stored) {
        const parsed =
          JSON.parse(
            stored,
          ) as AssignmentState;

        setAssignments(parsed);

        setBeds((currentBeds) =>
          currentBeds.map((bed) => {
            const assignment =
              parsed[bed.id];

            if (!assignment) {
              return bed;
            }

            return {
              ...bed,
              status: "Occupied",
              patientId:
                assignment.patientId,
              patientName:
                assignment.patientName,
            };
          }),
        );
      }
    } catch {
      // Ignore invalid demo storage.
    }

    setIsHydrated(true);
  }, []);

  const facilityPatients =
    useMemo(() => {
      return patients.map((patient) => ({
        patient,
        status:
          (isHydrated
            ? referralStates[
                patient.referralId
              ]
            : undefined) ??
          patient.referralStatus,
      }));
    }, [
      patients,
      referralStates,
      isHydrated,
    ]);

  const assignablePatients =
    facilityPatients.filter(
      (item) =>
        item.status === "Received",
    );

  const filteredBeds =
    wardFilter === "All"
      ? beds
      : beds.filter(
          (bed) =>
            bed.ward === wardFilter,
        );

  const totalBeds = beds.length;

  const availableBeds =
    beds.filter(
      (bed) =>
        bed.status === "Available",
    ).length;

  const occupiedBeds =
    beds.filter(
      (bed) =>
        bed.status === "Occupied",
    ).length;

  const reservedBeds =
    beds.filter(
      (bed) =>
        bed.status === "Reserved",
    ).length;

  const occupancyPercent =
    totalBeds > 0
      ? Math.round(
          (occupiedBeds /
            totalBeds) *
            100,
        )
      : 0;

  function saveAssignments(
    next: AssignmentState,
  ) {
    setAssignments(next);

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(next),
    );
  }

  function assignBed() {
    if (
      !selectedPatient ||
      !selectedBed
    ) {
      setMessage(
        "Select a patient and an available bed.",
      );
      return;
    }

    const patient =
      patients.find(
        (item) =>
          item.patientId ===
          selectedPatient,
      );

    const bedIndex =
      beds.findIndex(
        (bed) =>
          bed.id === selectedBed &&
          bed.status ===
            "Available",
      );

    if (!patient) {
      setMessage(
        "Patient record could not be found.",
      );
      return;
    }

    if (bedIndex === -1) {
      setMessage(
        "Selected bed is no longer available.",
      );
      return;
    }

    const nextBeds = [
      ...beds,
    ];

    nextBeds[bedIndex] = {
      ...nextBeds[bedIndex],
      status: "Occupied",
      patientId:
        patient.patientId,
      patientName:
        patient.name,
    };

    setBeds(nextBeds);

    saveAssignments({
      ...assignments,
      [selectedBed]: {
        patientId:
          patient.patientId,
        patientName:
          patient.name,
        assignedAt:
          new Date().toISOString(),
      },
    });

    setSelectedPatient("");
    setSelectedBed("");

    setMessage(
      `${patient.name} assigned to bed ${nextBeds[bedIndex].id}.`,
    );
  }

  function admitPatient(
    patientId: string,
  ) {
    const patient =
      patients.find(
        (item) =>
          item.patientId ===
          patientId,
      );

    if (!patient) {
      return;
    }

    const nextStatus =
      setReferralStatus(
        patient.referralId,
        "Under Treatment",
      );

    setReferralStates(
      (current) => ({
        ...current,
        [patient.referralId]:
          nextStatus,
      }),
    );

    setMessage(
      `${patient.name} admitted and referral moved to ${nextStatus}.`,
    );
  }

  function releaseBed(
    bedId: string,
  ) {
    const bedIndex =
      beds.findIndex(
        (bed) =>
          bed.id === bedId,
      );

    if (bedIndex === -1) {
      return;
    }

    const releasedBed = beds[bedIndex];

    const nextBeds = [
      ...beds,
    ];

    nextBeds[bedIndex] = {
      ...releasedBed,
      status: "Available",
      patientId: undefined,
      patientName: undefined,
    };

    setBeds(nextBeds);

    const nextAssignments = {
      ...assignments,
    };

    delete nextAssignments[
      bedId
    ];

    saveAssignments(
      nextAssignments,
    );

    setMessage(
      `Bed ${bedId} is now available.`,
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/facility/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Facility Dashboard
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Building2
              size={16}
              className="text-teal-700"
            />
            District Hospital Jaipur
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* ================================================================= */}
        {/* Heading                                                           */}
        {/* ================================================================= */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              FACILITY CAPACITY
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Beds & Capacity
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor bed availability, assign patients and maintain
              the receiving-facility admission workflow.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isHydrated
                  ? "bg-emerald-500"
                  : "bg-amber-400"
              }`}
            />

            <span className="text-xs font-semibold text-slate-500">
              {isHydrated
                ? "Facility state loaded"
                : "Loading facility state..."}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Statistics                                                        */}
        {/* ================================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<BedDouble size={19} />}
            label="Total Beds"
            value={totalBeds}
            note="Demo configured capacity"
          />

          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Available"
            value={availableBeds}
            note="Ready for admission"
          />

          <StatCard
            icon={<Users size={19} />}
            label="Occupied"
            value={occupiedBeds}
            note="Currently assigned"
          />

          <StatCard
            icon={<Clock3 size={19} />}
            label="Reserved"
            value={reservedBeds}
            note="Held for patients"
          />
        </div>

        {/* ================================================================= */}
        {/* Occupancy                                                         */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                BED OCCUPANCY
              </p>

              <p className="mt-2 text-xl font-bold text-slate-900">
                {occupancyPercent}% occupied
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {occupiedBeds} occupied of{" "}
                {totalBeds} configured beds
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-teal-700 transition-all duration-500"
                  style={{
                    width: `${occupancyPercent}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Assignment                                                        */}
        {/* ================================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Assignment form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              icon={<Hospital size={19} />}
              title="Assign Bed"
              subtitle="Assign a received patient to available capacity"
            />

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-xs font-semibold text-slate-700">
                  Patient
                </span>

                <select
                  value={selectedPatient}
                  onChange={(event) =>
                    setSelectedPatient(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">
                    Select patient
                  </option>

                  {assignablePatients.length ===
                  0 ? (
                    <option disabled>
                      No patients awaiting admission
                    </option>
                  ) : (
                    assignablePatients.map(
                      ({
                        patient,
                      }) => (
                        <option
                          key={
                            patient.patientId
                          }
                          value={
                            patient.patientId
                          }
                        >
                          {patient.name} —{" "}
                          {
                            patient.patientId
                          }
                        </option>
                      ),
                    )
                  )}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-slate-700">
                  Available Bed
                </span>

                <select
                  value={selectedBed}
                  onChange={(event) =>
                    setSelectedBed(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">
                    Select available bed
                  </option>

                  {beds
                    .filter(
                      (bed) =>
                        bed.status ===
                        "Available",
                    )
                    .map((bed) => (
                      <option
                        key={bed.id}
                        value={bed.id}
                      >
                        {bed.id} —{" "}
                        {bed.ward}
                      </option>
                    ))}
                </select>
              </label>

              <button
                type="button"
                onClick={assignBed}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                <BedDouble size={17} />
                Assign Bed
              </button>

              {message && (
                <div className="rounded-xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-sm font-semibold text-teal-900">
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Workflow */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Admission workflow
              </p>

              <div className="mt-3 space-y-3 text-xs">
                <WorkflowStep
                  number="1"
                  title="Referral Received"
                  text="Patient arrives at receiving facility."
                  active
                />

                <WorkflowStep
                  number="2"
                  title="Bed Assigned"
                  text="Select appropriate ward and available bed."
                />

                <WorkflowStep
                  number="3"
                  title="Patient Admitted"
                  text="Move referral to Under Treatment."
                />
              </div>
            </div>
          </section>

          {/* Capacity by ward */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <SectionHeader
                icon={<BedDouble size={19} />}
                title="Capacity by Ward"
                subtitle="Live demo bed availability"
              />

              <select
                value={wardFilter}
                onChange={(event) =>
                  setWardFilter(
                    event.target.value,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-teal-600"
              >
                <option value="All">
                  All Wards
                </option>

                <option value="General Ward">
                  General Ward
                </option>

                <option value="Cardiology">
                  Cardiology
                </option>

                <option value="Orthopedics">
                  Orthopedics
                </option>

                <option value="ICU">
                  ICU
                </option>
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {filteredBeds.map(
                (bed) => (
                  <BedRow
                    key={bed.id}
                    bed={bed}
                    onRelease={
                      releaseBed
                    }
                  />
                ),
              )}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* Current admissions                                                */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={<Users size={19} />}
            title="Current Admissions"
            subtitle="Patients currently linked to facility care"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {facilityPatients
              .filter(
                (item) =>
                  item.status ===
                    "Received" ||
                  item.status ===
                    "Under Treatment",
              )
              .map(
                ({
                  patient,
                  status,
                }) => (
                  <AdmissionCard
                    key={
                      patient.patientId
                    }
                    patient={patient}
                    status={status}
                    onAdmit={() =>
                      admitPatient(
                        patient.patientId,
                      )
                    }
                  />
                ),
              )}

            {facilityPatients.filter(
              (item) =>
                item.status ===
                  "Received" ||
                item.status ===
                  "Under Treatment",
            ).length === 0 && (
              <EmptyAdmission />
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* Security                                                          */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-teal-700"
            />

            <div>
              <p className="text-sm font-semibold text-teal-900">
                Facility capacity protection
              </p>

              <p className="mt-1 text-xs leading-5 text-teal-800">
                Bed assignment and admission actions should be
                restricted to authorized facility staff and persisted
                with an audit trail in production.
              </p>
            </div>
          </div>
        </section>

        {/* Prototype note */}
        <p className="mt-6 text-center text-[11px] text-slate-400">
          Bed capacity management • Demo values • Real-time bed registry integration planned
        </p>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Components                                                                 */
/* ========================================================================== */

function StatCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {note}
      </p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-slate-900">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function BedRow({
  bed,
  onRelease,
}: {
  bed: Bed;
  onRelease: (
    bedId: string,
  ) => void;
}) {
  const occupied =
    bed.status === "Occupied";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            occupied
              ? "bg-blue-50 text-blue-700"
              : bed.status ===
                  "Reserved"
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
          }`}
        >
          <BedDouble size={18} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-slate-900">
              {bed.id}
            </p>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                occupied
                  ? "bg-blue-50 text-blue-700"
                  : bed.status ===
                      "Reserved"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {bed.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            {bed.ward} • {bed.room}
          </p>

          {occupied &&
            bed.patientName && (
              <p className="mt-1 text-xs font-semibold text-slate-700">
                Patient:{" "}
                {bed.patientName}
              </p>
            )}
        </div>
      </div>

      {occupied ? (
        <button
          type="button"
          onClick={() =>
            onRelease(bed.id)
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Release Bed
        </button>
      ) : (
        <span className="text-xs font-semibold text-emerald-600">
          Ready
        </span>
      )}
    </div>
  );
}

function AdmissionCard({
  patient,
  status,
  onAdmit,
}: {
  patient: PatientRecord;
  status: ReferralStatus;
  onAdmit: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <UserRound size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              {patient.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {patient.patientId}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {extractDepartment(
                patient.referralReason,
              )}
            </p>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <InfoMini
          label="Referral"
          value={patient.referralId}
        />

        <InfoMini
          label="Priority"
          value={
            patient.referralPriority
          }
        />
      </div>

      {status === "Received" && (
        <button
          type="button"
          onClick={onAdmit}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-xs font-semibold text-white transition hover:bg-teal-800"
        >
          Admit & Start Treatment
          <ArrowRight size={15} />
        </button>
      )}

      {status === "Under Treatment" && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-700">
          Patient is currently under treatment.
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReferralStatus;
}) {
  const styles: Record<
    ReferralStatus,
    string
  > = {
    Created:
      "bg-slate-100 text-slate-700",

    "In Transit":
      "bg-indigo-50 text-indigo-700",

    Received:
      "bg-teal-50 text-teal-700",

    "Under Treatment":
      "bg-blue-50 text-blue-700",

    Discharged:
      "bg-amber-50 text-amber-700",

    Closed:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function InfoMini({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  text,
  active = false,
}: {
  number: string;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          active
            ? "bg-teal-700 text-white"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {number}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function EmptyAdmission() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center md:col-span-2">
      <p className="text-sm font-semibold text-slate-700">
        No active admissions
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Patients with Received or Under Treatment status will appear here.
      </p>
    </div>
  );
}

function extractDepartment(
  referralReason: string,
) {
  const reason =
    referralReason.toLowerCase();

  if (reason.includes("cardio")) {
    return "Cardiology";
  }

  if (
    reason.includes("orthopedic") ||
    reason.includes("bone")
  ) {
    return "Orthopedics";
  }

  if (reason.includes("general")) {
    return "General Medicine";
  }

  return "General Medicine";
}