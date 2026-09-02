"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Clock3,
  Filter,
  Hospital,
  MapPin,
  Pill,
  Search,
  Stethoscope,
  TestTube,
} from "lucide-react";

type Facility = {
  id: string;
  name: string;
  type: "PHC" | "CHC" | "District Hospital";
  location: string;
  distance: number;
  waitTime: string;
  beds: number;
  departments: string[];
  diagnostics: boolean;
  medicines: boolean;
  status: "Open" | "Limited";
};

const facilities: Facility[] = [
  {
    id: "FAC-001",
    name: "PHC Bassi",
    type: "PHC",
    location: "Bassi, Jaipur",
    distance: 4.2,
    waitTime: "15 min",
    beds: 8,
    departments: ["General Medicine", "Maternal Care"],
    diagnostics: true,
    medicines: true,
    status: "Open",
  },
  {
    id: "FAC-002",
    name: "CHC Chomu",
    type: "CHC",
    location: "Chomu, Jaipur",
    distance: 12.5,
    waitTime: "25 min",
    beds: 18,
    departments: ["General Medicine", "Emergency", "Pediatrics"],
    diagnostics: true,
    medicines: true,
    status: "Open",
  },
  {
    id: "FAC-003",
    name: "District Hospital Jaipur",
    type: "District Hospital",
    location: "Jaipur",
    distance: 18.4,
    waitTime: "35 min",
    beds: 126,
    departments: [
      "Cardiology",
      "General Medicine",
      "Orthopedics",
      "Gynecology",
    ],
    diagnostics: true,
    medicines: true,
    status: "Open",
  },
  {
    id: "FAC-004",
    name: "PHC Bagru",
    type: "PHC",
    location: "Bagru, Jaipur",
    distance: 20.1,
    waitTime: "20 min",
    beds: 10,
    departments: ["General Medicine"],
    diagnostics: true,
    medicines: true,
    status: "Open",
  },
  {
    id: "FAC-005",
    name: "PHC Sanganer",
    type: "PHC",
    location: "Sanganer, Jaipur",
    distance: 22.7,
    waitTime: "30 min",
    beds: 12,
    departments: ["General Medicine", "Maternal Care"],
    diagnostics: false,
    medicines: true,
    status: "Limited",
  },
  {
    id: "FAC-006",
    name: "SMS Hospital Jaipur",
    type: "District Hospital",
    location: "Jaipur",
    distance: 29.3,
    waitTime: "50 min",
    beds: 250,
    departments: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "General Medicine",
    ],
    diagnostics: true,
    medicines: true,
    status: "Open",
  },
];

const typeOptions = [
  "All",
  "PHC",
  "CHC",
  "District Hospital",
];

const specialtyOptions = [
  "All",
  "Cardiology",
  "General Medicine",
  "Orthopedics",
  "Gynecology",
  "Neurology",
];

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] =
    useState("All");
  const [openNowOnly, setOpenNowOnly] = useState(false);

  const filteredFacilities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facilities.filter((facility) => {
      const matchesSearch =
        query === "" ||
        facility.name.toLowerCase().includes(query) ||
        facility.location.toLowerCase().includes(query) ||
        facility.type.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" ||
        facility.type === typeFilter;

      const matchesSpecialty =
        specialtyFilter === "All" ||
        facility.departments.includes(specialtyFilter);

      const matchesOpen =
        !openNowOnly || facility.status === "Open";

      return (
        matchesSearch &&
        matchesType &&
        matchesSpecialty &&
        matchesOpen
      );
    });
  }, [
    search,
    typeFilter,
    specialtyFilter,
    openNowOnly,
  ]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setSpecialtyFilter("All");
    setOpenNowOnly(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Facilities
            </h1>

            <p className="text-xs text-slate-500">
              NIRAMAYA-SETU / ASHA & ANM
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin
              size={17}
              className="text-teal-700"
            />
            Jaipur Care Area
          </div>
        </div>
      </header>

      <section className="p-6 lg:p-8">
        {/* Page heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            FACILITY FINDER
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Find a care facility
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Find nearby healthcare facilities based on distance,
            specialty, availability and basic service capacity.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search facility, location or facility type..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All"
                  ? "All facility types"
                  : option}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Filter
                size={17}
                className="text-slate-400"
              />

              <p className="text-sm font-semibold text-slate-800">
                Refine results
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="w-fit text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="specialty"
                className="mb-2 block text-xs font-medium text-slate-600"
              >
                Department / Specialist
              </label>

              <select
                id="specialty"
                value={specialtyFilter}
                onChange={(event) =>
                  setSpecialtyFilter(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              >
                {specialtyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All"
                      ? "All departments"
                      : option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <input
                  type="checkbox"
                  checked={openNowOnly}
                  onChange={(event) =>
                    setOpenNowOnly(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                />

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Show open facilities only
                  </p>

                  <p className="text-xs text-slate-500">
                    Hide facilities marked as limited
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Quick summary */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Summary
            icon={Hospital}
            label="Facilities Found"
            value={filteredFacilities.length.toString()}
          />

          <Summary
            icon={Stethoscope}
            label="Specialist Facilities"
            value={facilities
              .filter(
                (facility) =>
                  facility.departments.length > 1,
              )
              .length.toString()}
          />

          <Summary
            icon={BedDouble}
            label="Total Listed Beds"
            value={facilities
              .reduce(
                (total, facility) =>
                  total + facility.beds,
                0,
              )
              .toString()}
          />

          <Summary
            icon={Clock3}
            label="Avg. Wait Time"
            value="29 min"
          />
        </div>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Nearby facilities
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredFacilities.length} matching facilities
            </p>
          </div>
        </div>

        {/* Facility Cards */}
        {filteredFacilities.length > 0 ? (
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {filteredFacilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Search
                size={22}
                className="text-slate-500"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No facilities found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Note */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs leading-5 text-slate-500">
            Facility availability shown here is prototype data.
            In the production system, capacity, specialist
            availability, diagnostics, medicines and wait time should
            be provided by the backend/facility systems.
          </p>
        </div>
      </section>
    </main>
  );
}

function Summary({
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {label}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function FacilityCard({
  facility,
}: {
  facility: Facility;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Hospital size={21} />
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">
              {facility.name}
            </h4>

            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={13} />
              {facility.location}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            facility.status === "Open"
              ? "bg-teal-50 text-teal-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {facility.status}
        </span>
      </div>

      {/* Distance + type */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {facility.type}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {facility.distance} km away
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {facility.waitTime} wait
        </span>
      </div>

      {/* Capacity */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Metric
          icon={BedDouble}
          label="Beds"
          value={facility.beds.toString()}
        />

        <Metric
          icon={TestTube}
          label="Diagnostics"
          value={facility.diagnostics ? "Available" : "Limited"}
        />

        <Metric
          icon={Pill}
          label="Medicines"
          value={facility.medicines ? "Available" : "Limited"}
        />
      </div>

      {/* Departments */}
      <div className="mt-5">
        <p className="text-xs font-medium text-slate-400">
          Departments
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {facility.departments.map((department) => (
            <span
              key={department}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
            >
              {department}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <p className="text-xs text-slate-400">
          Updated from facility data
        </p>

        <Link
          href={`/facilities/${facility.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          View facility
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function Metric({
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
    <div className="rounded-xl bg-slate-50 p-3">
      <Icon
        size={16}
        className="text-teal-700"
      />

      <p className="mt-2 text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}