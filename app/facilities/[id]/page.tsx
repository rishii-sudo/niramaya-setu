import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Clock3,
  Hospital,
  MapPin,
  Pill,
  ShieldCheck,
  Stethoscope,
  TestTube,
} from "lucide-react";

type FacilityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type FacilityRecord = {
  id: string;
  name: string;
  type: "PHC" | "CHC" | "District Hospital";
  location: string;
  distance: string;
  status: "Open" | "Limited";
  waitTime: string;
  beds: number;
  departments: string[];
  diagnostics: string;
  medicines: string;
  phone: string;
  hours: string;
  address: string;
  services: string[];
  specialists: {
    name: string;
    department: string;
    availability: string;
  }[];
};

const facilities: Record<string, FacilityRecord> = {
  "FAC-001": {
    id: "FAC-001",
    name: "PHC Bassi",
    type: "PHC",
    location: "Bassi, Jaipur",
    distance: "4.2 km",
    status: "Open",
    waitTime: "15 min",
    beds: 8,
    departments: ["General Medicine", "Maternal Care"],
    diagnostics: "Available",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address: "Primary Health Centre, Bassi, Jaipur, Rajasthan",
    services: [
      "Outpatient consultation",
      "Basic diagnostics",
      "Maternal care",
      "Essential medicines",
      "Routine health monitoring",
    ],
    specialists: [
      {
        name: "Dr. Anil Sharma",
        department: "General Medicine",
        availability: "Available today",
      },
      {
        name: "Maternal Care Team",
        department: "Maternal Care",
        availability: "Available",
      },
    ],
  },

  "FAC-002": {
    id: "FAC-002",
    name: "CHC Chomu",
    type: "CHC",
    location: "Chomu, Jaipur",
    distance: "12.5 km",
    status: "Open",
    waitTime: "25 min",
    beds: 18,
    departments: [
      "General Medicine",
      "Emergency",
      "Pediatrics",
    ],
    diagnostics: "Available",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address: "Community Health Centre, Chomu, Jaipur, Rajasthan",
    services: [
      "Emergency care",
      "General medicine",
      "Pediatrics",
      "Basic diagnostics",
      "Essential medicines",
    ],
    specialists: [
      {
        name: "Dr. Kavita Mehta",
        department: "General Medicine",
        availability: "Available today",
      },
      {
        name: "Emergency Medical Team",
        department: "Emergency",
        availability: "Available 24×7",
      },
    ],
  },

  "FAC-003": {
    id: "FAC-003",
    name: "District Hospital Jaipur",
    type: "District Hospital",
    location: "Jaipur",
    distance: "18.4 km",
    status: "Open",
    waitTime: "35 min",
    beds: 126,
    departments: [
      "Cardiology",
      "General Medicine",
      "Orthopedics",
      "Gynecology",
    ],
    diagnostics: "Available",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address: "District Hospital Campus, Jaipur, Rajasthan",
    services: [
      "Specialist consultation",
      "Emergency services",
      "Laboratory diagnostics",
      "Pharmacy",
      "Inpatient care",
      "Referral management",
    ],
    specialists: [
      {
        name: "Dr. Priya Singh",
        department: "Cardiology",
        availability: "Available today",
      },
      {
        name: "Dr. Rajesh Gupta",
        department: "General Medicine",
        availability: "Available today",
      },
      {
        name: "Dr. Neha Verma",
        department: "Orthopedics",
        availability: "Available tomorrow",
      },
      {
        name: "Dr. Meera Joshi",
        department: "Gynecology",
        availability: "Available today",
      },
    ],
  },

  "FAC-004": {
    id: "FAC-004",
    name: "PHC Bagru",
    type: "PHC",
    location: "Bagru, Jaipur",
    distance: "20.1 km",
    status: "Open",
    waitTime: "20 min",
    beds: 10,
    departments: ["General Medicine"],
    diagnostics: "Available",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address: "Primary Health Centre, Bagru, Jaipur, Rajasthan",
    services: [
      "Outpatient consultation",
      "Basic diagnostics",
      "Essential medicines",
      "Routine monitoring",
    ],
    specialists: [
      {
        name: "Dr. Rajesh Gupta",
        department: "General Medicine",
        availability: "Available today",
      },
    ],
  },

  "FAC-005": {
    id: "FAC-005",
    name: "PHC Sanganer",
    type: "PHC",
    location: "Sanganer, Jaipur",
    distance: "22.7 km",
    status: "Limited",
    waitTime: "30 min",
    beds: 12,
    departments: ["General Medicine", "Maternal Care"],
    diagnostics: "Limited",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address:
      "Primary Health Centre, Sanganer, Jaipur, Rajasthan",
    services: [
      "Outpatient consultation",
      "Maternal care",
      "Essential medicines",
      "Routine monitoring",
    ],
    specialists: [
      {
        name: "General Medicine Team",
        department: "General Medicine",
        availability: "Limited availability",
      },
      {
        name: "Maternal Care Team",
        department: "Maternal Care",
        availability: "Available",
      },
    ],
  },

  "FAC-006": {
    id: "FAC-006",
    name: "SMS Hospital Jaipur",
    type: "District Hospital",
    location: "Jaipur",
    distance: "29.3 km",
    status: "Open",
    waitTime: "50 min",
    beds: 250,
    departments: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "General Medicine",
    ],
    diagnostics: "Available",
    medicines: "Available",
    phone: "0141-XXXXXXX",
    hours: "24×7",
    address: "SMS Hospital Campus, Jaipur, Rajasthan",
    services: [
      "Advanced specialist consultation",
      "Emergency services",
      "Advanced diagnostics",
      "Pharmacy",
      "Inpatient care",
      "Specialist referrals",
    ],
    specialists: [
      {
        name: "Dr. Priya Singh",
        department: "Cardiology",
        availability: "Available today",
      },
      {
        name: "Dr. Amit Sharma",
        department: "Neurology",
        availability: "Available today",
      },
      {
        name: "Dr. Neha Verma",
        department: "Orthopedics",
        availability: "Available tomorrow",
      },
      {
        name: "General Medicine Team",
        department: "General Medicine",
        availability: "Available today",
      },
    ],
  },
};

export default async function FacilityDetailPage({
  params,
}: FacilityPageProps) {
  const { id } = await params;

  const facility = facilities[id];

  if (!facility) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Facility not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No facility record exists for ID {id}.
          </p>

          <Link
            href="/facilities"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <ArrowLeft size={16} />
            Back to Facilities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Back Link & Facility Badge */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/facilities"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft size={18} />
            Back to Facilities
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck
              size={17}
              className="text-teal-700"
            />
            Facility information
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              FACILITY DETAILS
            </p>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Hospital size={24} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {facility.name}
                </h1>

                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} />
                  {facility.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                facility.status === "Open"
                  ? "bg-teal-50 text-teal-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {facility.status}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {facility.type}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {facility.distance} away
            </span>
          </div>
        </div>

        {/* Main */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="space-y-6">
            {/* Capacity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Current Capacity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current facility service indicators
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Capacity
                  icon={BedDouble}
                  label="Beds"
                  value={facility.beds.toString()}
                />

                <Capacity
                  icon={Clock3}
                  label="Wait Time"
                  value={facility.waitTime}
                />

                <Capacity
                  icon={TestTube}
                  label="Diagnostics"
                  value={facility.diagnostics}
                />

                <Capacity
                  icon={Pill}
                  label="Medicines"
                  value={facility.medicines}
                />
              </div>
            </section>

            {/* Departments */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Stethoscope size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Departments & Specialists
                  </h2>

                  <p className="text-xs text-slate-500">
                    Available care areas at this facility
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {facility.departments.map((department) => (
                  <span
                    key={department}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                  >
                    {department}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {facility.specialists.map((specialist) => (
                  <div
                    key={`${specialist.name}-${specialist.department}`}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {specialist.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {specialist.department}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                        specialist.availability.includes(
                          "Limited",
                        )
                          ? "bg-amber-50 text-amber-700"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      {specialist.availability}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">
                Available Services
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {facility.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-teal-700"
                    />

                    <p className="text-sm text-slate-700">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Start Referral */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Referral Destination
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Refer a patient here
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start a referral to this facility and continue the
                patient&apos;s care journey through NIRAMAYA-SETU.
              </p>

              <Link
                href="/referrals/create"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Start Referral
                <ArrowRight size={17} />
              </Link>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Location
                  </h2>

                  <p className="text-xs text-slate-500">
                    Facility location and access details
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {facility.location}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {facility.address}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Distance
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {facility.distance}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Hours
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {facility.hours}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">
                Facility Contact
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {facility.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Facility type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {facility.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Current status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {facility.status}
                  </p>
                </div>
              </div>
            </section>

            {/* Data note */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs leading-5 text-slate-500">
                Facility capacity, specialist availability, diagnostics,
                medicines and waiting time shown here are prototype
                values. Production values should come from the
                backend and connected facility systems.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function Capacity({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <Icon size={18} className="text-teal-700" />

      <p className="mt-3 text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}