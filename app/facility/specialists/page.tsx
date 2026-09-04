"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Filter,
  Hospital,
  Search,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

type DoctorStatus =
  | "Available"
  | "Busy"
  | "On Leave";

type Specialist = {
  id: string;
  name: string;
  qualification: string;
  department: string;
  specialization: string;
  experience: string;
  status: DoctorStatus;
  patients: number;
  nextAvailable: string;
  room: string;
  shift: string;
  emergency: boolean;
};

const specialists: Specialist[] = [
  {
    id: "DOC-2048",
    name: "Dr. Meera Sharma",
    qualification: "MD Cardiology",
    department: "Cardiology",
    specialization:
      "Interventional Cardiology",
    experience: "12 years",
    status: "Available",
    patients: 4,
    nextAvailable: "Now",
    room: "Cardiology OPD 2",
    shift: "08:00 AM – 04:00 PM",
    emergency: true,
  },
  {
    id: "DOC-2052",
    name: "Dr. Arjun Verma",
    qualification: "MD Medicine",
    department: "General Medicine",
    specialization:
      "Internal Medicine",
    experience: "9 years",
    status: "Available",
    patients: 3,
    nextAvailable: "10 min",
    room: "Medicine OPD 1",
    shift: "08:00 AM – 04:00 PM",
    emergency: true,
  },
  {
    id: "DOC-2061",
    name: "Dr. Kavita Joshi",
    qualification: "MS Orthopedics",
    department: "Orthopedics",
    specialization:
      "Trauma & Joint Care",
    experience: "14 years",
    status: "Busy",
    patients: 7,
    nextAvailable: "35 min",
    room: "Ortho Unit 1",
    shift: "09:00 AM – 05:00 PM",
    emergency: true,
  },
  {
    id: "DOC-2070",
    name: "Dr. Rohit Meena",
    qualification: "MD Emergency Medicine",
    department: "Emergency",
    specialization:
      "Emergency & Trauma Care",
    experience: "8 years",
    status: "Available",
    patients: 5,
    nextAvailable: "Now",
    room: "Emergency Bay 2",
    shift: "08:00 AM – 08:00 PM",
    emergency: true,
  },
  {
    id: "DOC-2084",
    name: "Dr. Nisha Kapoor",
    qualification: "MD Medicine",
    department: "General Medicine",
    specialization:
      "Diabetes & Hypertension",
    experience: "11 years",
    status: "Busy",
    patients: 6,
    nextAvailable: "25 min",
    room: "Medicine OPD 3",
    shift: "10:00 AM – 06:00 PM",
    emergency: false,
  },
  {
    id: "DOC-2091",
    name: "Dr. Sameer Khan",
    qualification: "DM Cardiology",
    department: "Cardiology",
    specialization:
      "Heart Failure & Imaging",
    experience: "16 years",
    status: "On Leave",
    patients: 0,
    nextAvailable: "Tomorrow",
    room: "Cardiology OPD 1",
    shift: "09:00 AM – 05:00 PM",
    emergency: false,
  },
  {
    id: "DOC-2103",
    name: "Dr. Pooja Saini",
    qualification: "MS Orthopedics",
    department: "Orthopedics",
    specialization:
      "Sports Injury & Trauma",
    experience: "7 years",
    status: "Available",
    patients: 2,
    nextAvailable: "15 min",
    room: "Ortho Unit 2",
    shift: "08:00 AM – 04:00 PM",
    emergency: true,
  },
  {
    id: "DOC-2112",
    name: "Dr. Vivek Bansal",
    qualification: "MD Emergency Medicine",
    department: "Emergency",
    specialization:
      "Critical Care",
    experience: "10 years",
    status: "Available",
    patients: 4,
    nextAvailable: "Now",
    room: "Emergency Bay 1",
    shift: "08:00 PM – 08:00 AM",
    emergency: true,
  },
];

const departments = [
  "All",
  "Cardiology",
  "General Medicine",
  "Orthopedics",
  "Emergency",
];

const statuses = [
  "All",
  "Available",
  "Busy",
  "On Leave",
];

export default function FacilitySpecialistsPage() {
  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [selectedDoctor, setSelectedDoctor] =
    useState<Specialist | null>(null);

  const [assignedDoctorId, setAssignedDoctorId] =
    useState<string | null>(null);
  const [assignNotification, setAssignNotification] =
    useState<string | null>(null);

  function handleAssignDoctor(doctor: Specialist) {
    setAssignedDoctorId(doctor.id);
    setAssignNotification(`${doctor.name} assigned to referral intake queue.`);
    setTimeout(() => {
      setAssignNotification(null);
    }, 4000);
  }

  const filteredDoctors =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return specialists.filter(
        (doctor) => {
          const matchesSearch =
            query === "" ||
            doctor.name
              .toLowerCase()
              .includes(query) ||
            doctor.id
              .toLowerCase()
              .includes(query) ||
            doctor.department
              .toLowerCase()
              .includes(query) ||
            doctor.specialization
              .toLowerCase()
              .includes(query) ||
            doctor.qualification
              .toLowerCase()
              .includes(query);

          const matchesDepartment =
            department === "All" ||
            doctor.department ===
              department;

          const matchesStatus =
            status === "All" ||
            doctor.status === status;

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
          );
        },
      );
    }, [
      search,
      department,
      status,
    ]);

  const totalDoctors =
    specialists.length;

  const availableDoctors =
    specialists.filter(
      (doctor) =>
        doctor.status ===
        "Available",
    ).length;

  const busyDoctors =
    specialists.filter(
      (doctor) =>
        doctor.status === "Busy",
    ).length;

  const onLeaveDoctors =
    specialists.filter(
      (doctor) =>
        doctor.status ===
        "On Leave",
    ).length;

  const emergencyDoctors =
    specialists.filter(
      (doctor) =>
        doctor.emergency &&
        doctor.status !==
          "On Leave",
    ).length;

  const totalPatients =
    specialists.reduce(
      (sum, doctor) =>
        sum + doctor.patients,
      0,
    );

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
              FACILITY CLINICAL STAFF
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Doctors & Specialists
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Find available specialists, review workload and
              identify the right clinical team for referred patients.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Facility clinical roster active
          </div>
        </div>

        {assignNotification && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              {assignNotification}
            </span>
            <button
              onClick={() => setAssignNotification(null)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* Stats                                                             */}
        {/* ================================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={<Users size={19} />}
            label="Total Doctors"
            value={totalDoctors}
            note="Facility roster"
          />

          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Available"
            value={availableDoctors}
            note="Available now"
          />

          <StatCard
            icon={<ActivityIcon />}
            label="Busy"
            value={busyDoctors}
            note="Currently treating"
          />

          <StatCard
            icon={<Clock3 size={19} />}
            label="On Leave"
            value={onLeaveDoctors}
            note="Unavailable today"
          />

          <StatCard
            icon={<ShieldCheck size={19} />}
            label="Emergency"
            value={emergencyDoctors}
            note="Emergency-capable"
          />
        </div>

        {/* ================================================================= */}
        {/* Workload overview                                                 */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                CLINICAL WORKLOAD
              </p>

              <p className="mt-2 text-xl font-bold text-slate-900">
                {totalPatients} active patient assignments
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Combined demo workload across listed specialists.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat
                label="Cardiology"
                value="2"
              />

              <MiniStat
                label="Medicine"
                value="2"
              />

              <MiniStat
                label="Orthopedics"
                value="2"
              />

              <MiniStat
                label="Emergency"
                value="2"
              />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Search and filters                                                */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search doctor, specialization, department..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter
                size={16}
                className="text-slate-400"
              />

              <select
                value={department}
                onChange={(event) =>
                  setDepartment(
                    event.target.value,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600"
              >
                {departments.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "All"
                        ? "All Departments"
                        : item}
                    </option>
                  ),
                )}
              </select>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value,
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600"
            >
              {statuses.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Availability"
                      : item}
                  </option>
                ),
              )}
            </select>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Doctors                                                           */}
        {/* ================================================================= */}

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredDoctors.length}
              </span>{" "}
              specialists
            </p>

            <p className="text-xs text-slate-400">
              Receiving facility clinical roster
            </p>
          </div>

          {filteredDoctors.length ===
          0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {filteredDoctors.map(
                (doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    assigned={assignedDoctorId === doctor.id}
                    onAssign={() =>
                      handleAssignDoctor(doctor)
                    }
                    onView={() =>
                      setSelectedDoctor(
                        doctor,
                      )
                    }
                  />
                ),
              )}
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* Department Availability                                           */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={<Hospital size={19} />}
            title="Department Availability"
            subtitle="Current specialist coverage"
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DepartmentCard
              department="Cardiology"
              doctors={2}
              available={1}
              emergency={1}
            />

            <DepartmentCard
              department="General Medicine"
              doctors={2}
              available={1}
              emergency={1}
            />

            <DepartmentCard
              department="Orthopedics"
              doctors={2}
              available={1}
              emergency={1}
            />

            <DepartmentCard
              department="Emergency"
              doctors={2}
              available={2}
              emergency={2}
            />
          </div>
        </section>

        {/* ================================================================= */}
        {/* Referral matching                                                 */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Stethoscope
              size={20}
              className="mt-0.5 shrink-0 text-teal-700"
            />

            <div>
              <p className="text-sm font-semibold text-teal-900">
                Referral-to-specialist matching
              </p>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-teal-800">
                Facility staff can use department, specialization,
                availability and workload to identify an appropriate
                doctor for a referred patient.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MatchCard
              label="Specialization"
              value="Clinical fit"
            />

            <MatchCard
              label="Availability"
              value="Current duty"
            />

            <MatchCard
              label="Workload"
              value="Patient count"
            />
          </div>
        </section>

        {/* ================================================================= */}
        {/* Security                                                          */}
        {/* ================================================================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-teal-700"
            />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Role-based clinical access
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Specialist information and patient assignment actions
                should be available only to authorized facility staff.
                Production deployments should use backend RBAC and audit
                logging.
              </p>
            </div>
          </div>
        </section>

        {/* Prototype note */}
        <p className="mt-6 text-center text-[11px] text-slate-400">
          Specialist roster • Facility demo dataset • Production scheduling integration planned
        </p>
      </section>

      {/* =================================================================== */}
      {/* Doctor Modal                                                        */}
      {/* =================================================================== */}

      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() =>
            setSelectedDoctor(null)
          }
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Stethoscope size={25} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedDoctor.name}
                    </h2>

                    <DoctorStatus
                      status={
                        selectedDoctor.status
                      }
                    />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedDoctor.qualification}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedDoctor.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(
                    null,
                  )
                }
                className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ModalInfo
                icon={
                  <Building2 size={16} />
                }
                label="Department"
                value={
                  selectedDoctor.department
                }
              />

              <ModalInfo
                icon={
                  <Stethoscope size={16} />
                }
                label="Specialization"
                value={
                  selectedDoctor.specialization
                }
              />

              <ModalInfo
                icon={<Clock3 size={16} />}
                label="Experience"
                value={
                  selectedDoctor.experience
                }
              />

              <ModalInfo
                icon={<Users size={16} />}
                label="Current Patients"
                value={
                  selectedDoctor.patients.toString()
                }
              />

              <ModalInfo
                icon={
                  <Hospital size={16} />
                }
                label="Room"
                value={
                  selectedDoctor.room
                }
              />

              <ModalInfo
                icon={
                  <CalendarCheck size={16} />
                }
                label="Next Available"
                value={
                  selectedDoctor.nextAvailable
                }
              />
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Duty Shift
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedDoctor.shift}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={
                  selectedDoctor.status !==
                  "Available"
                }
                onClick={() => {
                  handleAssignDoctor(selectedDoctor);
                  setTimeout(() => {
                    setSelectedDoctor(null);
                  }, 600);
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  assignedDoctorId === selectedDoctor.id
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-teal-700 hover:bg-teal-800"
                }`}
              >
                <CheckCircle2 size={16} />
                {selectedDoctor.status !==
                "Available"
                  ? "Currently Unavailable"
                  : assignedDoctorId === selectedDoctor.id
                    ? "Assigned!"
                    : "Select Specialist"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(
                    null,
                  )
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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

function ActivityIcon() {
  return <Activity size={19} />;
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function DoctorCard({
  doctor,
  onView,
  onAssign,
  assigned,
}: {
  doctor: Specialist;
  onView: () => void;
  onAssign?: () => void;
  assigned?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-100 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <UserRound size={21} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {doctor.name}
                </h2>

                <DoctorStatus
                  status={doctor.status}
                />
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {doctor.qualification}
              </p>

              <p className="mt-1 text-xs font-semibold text-teal-700">
                {doctor.department}
              </p>
            </div>
          </div>

          {doctor.emergency && (
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-700">
              Emergency
            </span>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-800">
            {doctor.specialization}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {doctor.experience} experience
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailMini
            icon={<Users size={15} />}
            label="Current Patients"
            value={doctor.patients.toString()}
          />

          <DetailMini
            icon={<Clock3 size={15} />}
            label="Next Available"
            value={doctor.nextAvailable}
          />

          <DetailMini
            icon={<Hospital size={15} />}
            label="Room"
            value={doctor.room}
          />

          <DetailMini
            icon={<CalendarCheck size={15} />}
            label="Shift"
            value={doctor.shift}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Profile
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            disabled={
              doctor.status !==
              "Available"
            }
            onClick={onAssign}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              assigned
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-teal-700 hover:bg-teal-800"
            }`}
          >
            <CheckCircle2 size={15} />

            {doctor.status !==
            "Available"
              ? "Unavailable"
              : assigned
                ? "Assigned"
                : "Assign"}
          </button>
        </div>
      </div>
    </article>
  );
}

function DoctorStatus({
  status,
}: {
  status: DoctorStatus;
}) {
  const styles = {
    Available:
      "bg-emerald-50 text-emerald-700",

    Busy:
      "bg-amber-50 text-amber-700",

    "On Leave":
      "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function DetailMini({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function DepartmentCard({
  department,
  doctors,
  available,
  emergency,
}: {
  department: string;
  doctors: number;
  available: number;
  emergency: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">
        {department}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <SmallValue
          label="Doctors"
          value={doctors}
        />

        <SmallValue
          label="Available"
          value={available}
        />

        <SmallValue
          label="Emergency"
          value={emergency}
        />
      </div>
    </div>
  );
}

function SmallValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function MatchCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-teal-100 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-teal-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
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
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
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

function ModalInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-teal-700">
        {icon}

        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Search size={22} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        No specialists found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        Try another doctor name, department or availability
        filter.
      </p>
    </div>
  );
}