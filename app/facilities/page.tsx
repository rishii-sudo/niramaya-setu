"use client";

import { useMemo, useState, useEffect } from "react";
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
  Navigation,
  CheckCircle2,
  AlertCircle,
  Phone,
} from "lucide-react";

type Facility = {
  id: string;
  name: string;
  type: "PHC" | "CHC" | "District Hospital";
  location: string;
  distance: number; // in km
  waitTime: string;
  beds: number;
  departments: string[];
  diagnostics: boolean;
  medicines: boolean;
  status: "Open" | "Limited";
  lat: number;
  lng: number;
  contactNumberMasked: string;
};

const initialFacilities: Facility[] = [
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
    lat: 26.8335,
    lng: 76.0427,
    contactNumberMasked: "+91 141-XXXX201",
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
    lat: 27.1711,
    lng: 75.7222,
    contactNumberMasked: "+91 141-XXXX202",
  },
  {
    id: "FAC-003",
    name: "District Hospital Jaipur",
    type: "District Hospital",
    location: "Jaipur City Center",
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
    lat: 26.9124,
    lng: 75.7873,
    contactNumberMasked: "+91 141-XXXX203",
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
    lat: 26.8152,
    lng: 75.5452,
    contactNumberMasked: "+91 141-XXXX204",
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
    lat: 26.8042,
    lng: 75.7725,
    contactNumberMasked: "+91 141-XXXX205",
  },
  {
    id: "FAC-006",
    name: "SMS Hospital Jaipur",
    type: "District Hospital",
    location: "JLN Marg, Jaipur",
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
    lat: 26.8967,
    lng: 75.8155,
    contactNumberMasked: "+91 141-XXXX206",
  },
];

const typeOptions = ["All", "PHC", "CHC", "District Hospital"];
const specialtyOptions = [
  "All",
  "Cardiology",
  "General Medicine",
  "Orthopedics",
  "Gynecology",
  "Neurology",
  "Pediatrics",
  "Emergency",
];

// Haversine distance calculator
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  
  // Geolocation state
  const [geoStatus, setGeoStatus] = useState<"idle" | "requesting" | "active" | "denied" | "unsupported">("idle");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("unsupported");
      return;
    }

    setGeoStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setGeoStatus("active");

        // Recalculate distances and sort
        const updated = facilities.map((f) => ({
          ...f,
          distance: calculateDistance(coords.lat, coords.lng, f.lat, f.lng),
        })).sort((a, b) => a.distance - b.distance);

        setFacilities(updated);
      },
      (error) => {
        console.warn("Geolocation permission error:", error.message);
        setGeoStatus("denied");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const filteredFacilities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facilities.filter((facility) => {
      const matchesSearch =
        query === "" ||
        facility.name.toLowerCase().includes(query) ||
        facility.location.toLowerCase().includes(query) ||
        facility.type.toLowerCase().includes(query);

      const matchesType = typeFilter === "All" || facility.type === typeFilter;
      const matchesSpecialty =
        specialtyFilter === "All" || facility.departments.includes(specialtyFilter);
      const matchesOpen = !openNowOnly || facility.status === "Open";

      return matchesSearch && matchesType && matchesSpecialty && matchesOpen;
    });
  }, [facilities, search, typeFilter, specialtyFilter, openNowOnly]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setSpecialtyFilter("All");
    setOpenNowOnly(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-base font-bold text-slate-900">
              Nearby Healthcare Discovery
            </h1>
            <p className="text-[10px] text-slate-500">
              NIRAMAYA-SETU / Rural Health Facilities
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={requestGeolocation}
              disabled={geoStatus === "requesting"}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition shadow-sm ${
                geoStatus === "active"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : geoStatus === "denied"
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Navigation size={14} className={geoStatus === "requesting" ? "animate-spin" : "text-teal-700"} />
              {geoStatus === "active"
                ? "GPS Location Active"
                : geoStatus === "requesting"
                ? "Locating..."
                : geoStatus === "denied"
                ? "GPS Denied (Using Jaipur Hub)"
                : "Use My Location"}
            </button>
          </div>
        </div>
      </header>

      <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Geolocation Status Alert if Denied/Unsupported */}
        {geoStatus === "denied" && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-700 shrink-0" />
              <p className="font-semibold">Browser Location Access Denied or Unavailable</p>
            </div>
            <p className="mt-1 text-[11px] text-amber-800">
              Showing default reference distances from the Jaipur Rural District Healthcare Center. You can enable location permission in browser settings to calculate exact live distances.
            </p>
          </div>
        )}

        {/* Page heading */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
            FACILITY FINDER
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Find Nearby Hospitals & Health Centers
          </h2>
          <p className="mt-1 max-w-2xl text-xs text-slate-500">
            Locate nearest primary health centers (PHC), community health centers (CHC), and district hospitals with live bed counts, diagnostics, and specialist availability.
          </p>
        </div>

        {/* Search & Type */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facility name, location, or specialty..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-sm"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-teal-600 shadow-sm"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All Facility Types" : option}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <p className="text-xs font-bold text-slate-800">Filter Facilities</p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2 text-xs">
            <div>
              <label htmlFor="specialty" className="mb-1.5 block font-semibold text-slate-700">
                Department / Specialist
              </label>
              <select
                id="specialty"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-teal-600"
              >
                {specialtyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All Departments & Specialties" : option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2">
                <input
                  type="checkbox"
                  checked={openNowOnly}
                  onChange={(e) => setOpenNowOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-teal-700"
                />
                <div>
                  <p className="font-semibold text-slate-800">Show open facilities only</p>
                  <p className="text-[10px] text-slate-500">Hide facilities currently marked as limited capacity</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Facilities Found</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{filteredFacilities.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Specialist Centers</p>
            <p className="mt-1 text-2xl font-bold text-teal-700">
              {facilities.filter((f) => f.departments.length > 1).length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Listed Beds</p>
            <p className="mt-1 text-2xl font-bold text-blue-700">
              {facilities.reduce((tot, f) => tot + f.beds, 0)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nearest Center</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {filteredFacilities.length > 0 ? `${filteredFacilities[0].distance} km` : "—"}
            </p>
          </div>
        </div>

        {/* Facility Cards Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Healthcare Centers ({filteredFacilities.length} available)
            </h3>
            <span className="text-[11px] text-slate-400">Sorted nearest first</span>
          </div>

          {filteredFacilities.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {filteredFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    {/* Top Row: Title & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                              facility.type === "PHC"
                                ? "bg-teal-50 text-teal-700 border border-teal-200"
                                : facility.type === "CHC"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {facility.type}
                          </span>
                          <span
                            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                              facility.status === "Open"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                facility.status === "Open" ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                            />
                            {facility.status}
                          </span>
                        </div>

                        <h4 className="mt-2 text-base font-bold text-slate-900">
                          {facility.name}
                        </h4>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={13} className="text-slate-400" />
                          {facility.location} •{" "}
                          <span className="font-semibold text-teal-800">
                            {facility.distance} km away
                          </span>
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-3 py-2 text-right">
                        <p className="text-[9px] font-bold uppercase text-slate-400">Avg Wait</p>
                        <p className="text-xs font-bold text-slate-700">{facility.waitTime}</p>
                      </div>
                    </div>

                    {/* Departments list */}
                    <div className="mt-4">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Available Specialties</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {facility.departments.map((dept) => (
                          <span
                            key={dept}
                            className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Feature badges */}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1">
                        <BedDouble size={14} className="text-slate-400" />
                        <strong>{facility.beds}</strong> Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <TestTube size={14} className={facility.diagnostics ? "text-teal-600" : "text-slate-300"} />
                        {facility.diagnostics ? "Diagnostics" : "No Labs"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Pill size={14} className={facility.medicines ? "text-teal-600" : "text-slate-300"} />
                        {facility.medicines ? "Pharmacy" : "No Meds"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={`/facilities/${facility.id}`}
                      className="flex-1 rounded-xl bg-teal-700 py-2.5 text-center text-xs font-bold text-white transition hover:bg-teal-800 shadow-sm"
                    >
                      View Facility Details
                    </Link>

                    <Link
                      href="/doctors"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Find Doctors
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Hospital size={32} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-700">No healthcare facilities match the filter</p>
              <p className="mt-1 text-xs text-slate-400">Try clearing or adjusting search filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Integration Disclaimer */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Prototype Facility Discovery Note</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            Coordinates and distance calculation utilize client-side Geolocation API and prototype Jaipur-region coordinates. Future backend integration planned for National Health Resource Repository (NHRR) and ABDM Health Facility Registry (HFR).
          </p>
        </div>
      </section>
    </main>
  );
}