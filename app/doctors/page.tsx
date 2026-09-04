"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Video,
  UserCheck,
  Building2,
  Languages,
  ArrowRight,
} from "lucide-react";
import { doctorsList, Doctor } from "../data/doctorData";

const specialties = ["All", "Cardiology", "Maternal & Child Health", "General Medicine", "Pediatrics"];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsList);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.facility.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-xs">
              NS
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Doctor Directory</h1>
              <p className="text-[10px] text-slate-500">Find Specialists & Book Consultations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/appointments"
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              My Appointments
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-md">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-[10px] font-bold text-teal-300">
              <Stethoscope size={13} />
              Tele-Health & In-Person Specialist Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Consult Verified Medical Specialists
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover verified clinicians affiliated with rural primary health centers and district referral hospitals. Choose between secure video consultations or in-person clinic visits.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor by name, specialty, hospital..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-xs text-slate-800 outline-none focus:border-teal-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="text-slate-400 shrink-0" />
            {specialties.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedSpecialty === spec
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div>
                {/* Doctor Card Top */}
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-base font-bold text-teal-800 shadow-inner">
                    {doc.avatarInitial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        VERIFIED CLINICIAN
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star size={13} fill="currentColor" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>

                    <h3 className="mt-1 text-base font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-xs font-semibold text-teal-700">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                  </div>
                </div>

                {/* About & Hospital */}
                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {doc.about}
                </p>

                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 size={13} className="text-slate-400 shrink-0" />
                    <span>{doc.facility} • {doc.facilityLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages size={13} className="text-slate-400 shrink-0" />
                    <span>{doc.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={13} className="text-slate-400 shrink-0" />
                    <span>Consultation: <strong>{doc.consultationModes.join(" • ")}</strong></span>
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px]">
                  <p className="font-semibold text-slate-700">Available Days: {doc.availableDays.join(", ")}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {doc.timeSlots.slice(0, 3).map((slot) => (
                      <span key={slot} className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600 font-mono">
                        {slot}
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-400 self-center">+{doc.timeSlots.length - 3} more</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
                <Link
                  href={`/appointments?doctorId=${doc.id}`}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
                >
                  Book Consultation
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype Disclaimer */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Prototype Doctor Scheduling System</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            Clinician rosters and consultation appointment slots are simulated using frontend prototype state. Online video consultations are routed to the prototype consultation room.
          </p>
        </div>
      </section>
    </main>
  );
}
