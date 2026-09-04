"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

type MedicineCategory =
  | "Emergency"
  | "Cardiac"
  | "Antibiotic"
  | "Diabetes"
  | "Pain Relief"
  | "General";

type Medicine = {
  id: string;
  name: string;
  generic: string;
  category: MedicineCategory;
  strength: string;
  form: string;
  stock: number;
  reorderLevel: number;
  unit: string;
  location: string;
  expiry: string;
  status: StockStatus;
  supplier: string;
};

const initialMedicines: Medicine[] = [
  {
    id: "MED-001",
    name: "Aspirin",
    generic: "Acetylsalicylic Acid",
    category: "Cardiac",
    strength: "75 mg",
    form: "Tablet",
    stock: 840,
    reorderLevel: 250,
    unit: "tablets",
    location: "Pharmacy A",
    expiry: "Aug 2027",
    status: "In Stock",
    supplier: "Jaipur Medical Supply",
  },
  {
    id: "MED-002",
    name: "Atorvastatin",
    generic: "Atorvastatin",
    category: "Cardiac",
    strength: "40 mg",
    form: "Tablet",
    stock: 520,
    reorderLevel: 180,
    unit: "tablets",
    location: "Pharmacy A",
    expiry: "Jun 2027",
    status: "In Stock",
    supplier: "Jaipur Medical Supply",
  },
  {
    id: "MED-003",
    name: "Metformin",
    generic: "Metformin Hydrochloride",
    category: "Diabetes",
    strength: "500 mg",
    form: "Tablet",
    stock: 420,
    reorderLevel: 300,
    unit: "tablets",
    location: "Pharmacy B",
    expiry: "Mar 2027",
    status: "Low Stock",
    supplier: "Rajasthan Pharma",
  },
  {
    id: "MED-004",
    name: "Insulin Regular",
    generic: "Human Insulin",
    category: "Diabetes",
    strength: "40 IU/ml",
    form: "Vial",
    stock: 34,
    reorderLevel: 20,
    unit: "vials",
    location: "Cold Storage",
    expiry: "Dec 2026",
    status: "In Stock",
    supplier: "Rajasthan Pharma",
  },
  {
    id: "MED-005",
    name: "Ceftriaxone",
    generic: "Ceftriaxone",
    category: "Antibiotic",
    strength: "1 g",
    form: "Injection",
    stock: 72,
    reorderLevel: 80,
    unit: "vials",
    location: "Emergency Pharmacy",
    expiry: "Jan 2027",
    status: "Low Stock",
    supplier: "HealthCare Distributors",
  },
  {
    id: "MED-006",
    name: "Amoxicillin",
    generic: "Amoxicillin",
    category: "Antibiotic",
    strength: "500 mg",
    form: "Capsule",
    stock: 860,
    reorderLevel: 250,
    unit: "capsules",
    location: "Pharmacy B",
    expiry: "Sep 2027",
    status: "In Stock",
    supplier: "HealthCare Distributors",
  },
  {
    id: "MED-007",
    name: "Paracetamol",
    generic: "Paracetamol",
    category: "Pain Relief",
    strength: "650 mg",
    form: "Tablet",
    stock: 1220,
    reorderLevel: 400,
    unit: "tablets",
    location: "Pharmacy A",
    expiry: "Nov 2027",
    status: "In Stock",
    supplier: "Jaipur Medical Supply",
  },
  {
    id: "MED-008",
    name: "Morphine",
    generic: "Morphine Sulphate",
    category: "Emergency",
    strength: "10 mg/ml",
    form: "Injection",
    stock: 8,
    reorderLevel: 15,
    unit: "ampoules",
    location: "Controlled Drug Cabinet",
    expiry: "Feb 2027",
    status: "Low Stock",
    supplier: "Government Medical Depot",
  },
  {
    id: "MED-009",
    name: "Adrenaline",
    generic: "Epinephrine",
    category: "Emergency",
    strength: "1 mg/ml",
    form: "Injection",
    stock: 44,
    reorderLevel: 20,
    unit: "ampoules",
    location: "Emergency Pharmacy",
    expiry: "Oct 2026",
    status: "In Stock",
    supplier: "Government Medical Depot",
  },
  {
    id: "MED-010",
    name: "Salbutamol",
    generic: "Salbutamol",
    category: "General",
    strength: "100 mcg",
    form: "Inhaler",
    stock: 0,
    reorderLevel: 25,
    unit: "inhalers",
    location: "Pharmacy B",
    expiry: "N/A",
    status: "Out of Stock",
    supplier: "HealthCare Distributors",
  },
  {
    id: "MED-011",
    name: "Pantoprazole",
    generic: "Pantoprazole",
    category: "General",
    strength: "40 mg",
    form: "Injection",
    stock: 94,
    reorderLevel: 50,
    unit: "vials",
    location: "Emergency Pharmacy",
    expiry: "May 2027",
    status: "In Stock",
    supplier: "Rajasthan Pharma",
  },
  {
    id: "MED-012",
    name: "ORS Sachet",
    generic: "Oral Rehydration Salts",
    category: "General",
    strength: "WHO Formula",
    form: "Sachet",
    stock: 310,
    reorderLevel: 100,
    unit: "sachets",
    location: "Pharmacy B",
    expiry: "Jul 2027",
    status: "In Stock",
    supplier: "Government Medical Depot",
  },
];

const categories = [
  "All",
  "Emergency",
  "Cardiac",
  "Antibiotic",
  "Diabetes",
  "Pain Relief",
  "General",
];

const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

function getStatusClass(status: StockStatus) {
  if (status === "In Stock") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Low Stock") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-rose-200 bg-rose-50 text-rose-700";
}

function getStockBarClass(status: StockStatus) {
  if (status === "In Stock") {
    return "bg-emerald-500";
  }

  if (status === "Low Stock") {
    return "bg-amber-500";
  }

  return "bg-rose-500";
}

export default function MedicinesPage() {
  const [medicines, setMedicines] =
    useState<Medicine[]>(initialMedicines);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [selectedMedicine, setSelectedMedicine] =
    useState<Medicine | null>(null);

  const [showAddStock, setShowAddStock] = useState(false);
  const [stockAmount, setStockAmount] = useState("50");

  const filteredMedicines = useMemo(() => {
    const query = search.trim().toLowerCase();

    return medicines.filter((medicine) => {
      const matchesSearch =
        !query ||
        medicine.name.toLowerCase().includes(query) ||
        medicine.generic.toLowerCase().includes(query) ||
        medicine.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || medicine.category === category;

      const matchesStatus =
        status === "All" || medicine.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [medicines, search, category, status]);

  const totalItems = medicines.length;

  const inStock = medicines.filter(
    (medicine) => medicine.status === "In Stock"
  ).length;

  const lowStock = medicines.filter(
    (medicine) => medicine.status === "Low Stock"
  ).length;

  const outOfStock = medicines.filter(
    (medicine) => medicine.status === "Out of Stock"
  ).length;

  const totalUnits = medicines.reduce(
    (sum, medicine) => sum + medicine.stock,
    0
  );

  const urgentMedicines = medicines.filter(
    (medicine) =>
      medicine.status === "Low Stock" ||
      medicine.status === "Out of Stock"
  );

  function openAddStock(medicine: Medicine) {
    setSelectedMedicine(medicine);
    setStockAmount("50");
    setShowAddStock(true);
  }

  function closeModal() {
    setSelectedMedicine(null);
    setShowAddStock(false);
  }

  function receiveStock() {
    if (!selectedMedicine) {
      return;
    }

    const amount = Number(stockAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setMedicines((current) =>
      current.map((medicine) => {
        if (medicine.id !== selectedMedicine.id) {
          return medicine;
        }

        const newStock = medicine.stock + amount;

        let newStatus: StockStatus = "In Stock";

        if (newStock === 0) {
          newStatus = "Out of Stock";
        } else if (newStock <= medicine.reorderLevel) {
          newStatus = "Low Stock";
        }

        return {
          ...medicine,
          stock: newStock,
          status: newStatus,
        };
      })
    );

    closeModal();
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  Pharmacy & Inventory
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  District Hospital Jaipur
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Medicine Stock
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Track essential medicines, stock levels, reorder
                alerts, expiry information and pharmacy availability.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/facility/dashboard"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  openAddStock(medicines[0]);
                }}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Receive Stock
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Medicine Items
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalItems}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Active catalog
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-emerald-700">
              In Stock
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {inStock}
            </p>

            <p className="mt-1 text-xs text-emerald-700">
              Available
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-amber-700">
              Low Stock
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-800">
              {lowStock}
            </p>

            <p className="mt-1 text-xs text-amber-700">
              Reorder required
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-rose-700">
              Out of Stock
            </p>

            <p className="mt-1 text-2xl font-bold text-rose-800">
              {outOfStock}
            </p>

            <p className="mt-1 text-xs text-rose-700">
              Immediate action
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm md:col-span-1">
            <p className="text-xs font-medium text-blue-700">
              Total Units
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-800">
              {totalUnits.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-blue-700">
              Across inventory
            </p>
          </div>
        </section>

        {/* Main */}
        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.7fr]">

          {/* Inventory */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Medicine Inventory
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current stock by medicine and storage location.
                  </p>
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search medicine..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white lg:w-64"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      category === item
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {statuses.map((item) => (
                  <button
                    key={item}
                    onClick={() => setStatus(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      status === item
                        ? "bg-violet-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredMedicines.map((medicine) => {
                const percentage =
                  medicine.reorderLevel > 0
                    ? Math.min(
                        100,
                        Math.max(
                          5,
                          (medicine.stock /
                            (medicine.reorderLevel * 3)) *
                            100
                        )
                      )
                    : 100;

                return (
                  <div
                    key={medicine.id}
                    className="px-5 py-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {medicine.name}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                              medicine.status
                            )}`}
                          >
                            {medicine.status}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-slate-600">
                          {medicine.generic} · {medicine.strength} ·{" "}
                          {medicine.form}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>
                            {medicine.stock.toLocaleString("en-IN")}{" "}
                            {medicine.unit}
                          </span>

                          <span>
                            {medicine.location}
                          </span>

                          <span>
                            Expiry: {medicine.expiry}
                          </span>
                        </div>

                        <div className="mt-3 h-2 max-w-md rounded-full bg-slate-100">
                          <div
                            className={`h-2 rounded-full ${getStockBarClass(
                              medicine.status
                            )}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Reorder level:{" "}
                          {medicine.reorderLevel.toLocaleString(
                            "en-IN"
                          )}{" "}
                          {medicine.unit}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setSelectedMedicine(medicine)
                          }
                          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => openAddStock(medicine)}
                          className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                        >
                          Add Stock
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredMedicines.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <p className="font-semibold text-slate-800">
                    No medicine found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try another medicine or filter.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <aside className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Stock Alerts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Medicines requiring attention.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {urgentMedicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {medicine.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {medicine.category} ·{" "}
                          {medicine.strength}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${getStatusClass(
                          medicine.status
                        )}`}
                      >
                        {medicine.status}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Current stock
                      </span>

                      <span className="font-semibold text-slate-800">
                        {medicine.stock} {medicine.unit}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Reorder level
                      </span>

                      <span className="font-semibold text-slate-800">
                        {medicine.reorderLevel}{" "}
                        {medicine.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => openAddStock(medicine)}
                      className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Controlled Medicine */}
            <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5">
              <p className="text-sm font-semibold text-violet-900">
                Controlled Medicine
              </p>

              <p className="mt-2 text-sm leading-6 text-violet-800">
                Morphine is stored in a controlled drug cabinet.
                Production implementation should enforce
                role-based dispensing, approval and audit logging.
              </p>

              <div className="mt-4 rounded-2xl border border-violet-200 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-violet-700">
                    Current stock
                  </span>

                  <span className="font-bold text-violet-900">
                    8 ampoules
                  </span>
                </div>
              </div>
            </div>

            {/* Expiry */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">
                Expiry Monitoring
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                Medicines nearing expiry should be flagged for FEFO
                based dispensing and inventory review.
              </p>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-200 bg-white/70 p-4">
                <span className="text-xs text-amber-700">
                  Earliest demo expiry
                </span>

                <span className="font-bold text-amber-900">
                  Oct 2026
                </span>
              </div>
            </div>
          </aside>
        </section>

        {/* Workflow */}
        <section className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Reorder Workflow
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-lg bg-slate-900 px-3 py-2 text-white">
                Low Stock
              </span>

              <span className="text-slate-400">
                →
              </span>

              <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
                Purchase Request
              </span>

              <span className="text-slate-400">
                →
              </span>

              <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
                Receive
              </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Prototype workflow for facility stock replenishment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              FEFO
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              First Expiry, First Out helps reduce medicine wastage
              by prioritising batches with the earliest expiry.
            </p>

            <span className="mt-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              Inventory Safety
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Facility Security
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Production dispensing actions should be associated
              with authenticated staff, consent rules where
              applicable and immutable audit records.
            </p>

            <Link
              href="/consent"
              className="mt-4 inline-flex rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Open Consent
            </Link>
          </div>
        </section>

        {/* Subtle note */}
        <p className="mt-4 text-[11px] text-slate-400">
          Demo inventory data • Production connects to the pharmacy inventory system with batch-level tracking and audit history.
        </p>
      </div>

      {/* Details Modal */}
      {selectedMedicine && !showAddStock && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                  Medicine Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedMedicine.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedMedicine.generic}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Category
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.category}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Strength
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.strength}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Form
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.form}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Current Stock
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.stock}{" "}
                  {selectedMedicine.unit}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Expiry
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.expiry}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {selectedMedicine.location}
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Supplier
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {selectedMedicine.supplier}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddStock(true)}
              className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add Stock
            </button>
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      {selectedMedicine && showAddStock && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
              Inventory Update
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Receive Stock
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add incoming stock for{" "}
              <span className="font-semibold text-slate-700">
                {selectedMedicine.name}
              </span>
              .
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Current stock
                </span>

                <span className="font-bold text-slate-900">
                  {selectedMedicine.stock}{" "}
                  {selectedMedicine.unit}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Reorder level
                </span>

                <span className="font-semibold text-slate-800">
                  {selectedMedicine.reorderLevel}{" "}
                  {selectedMedicine.unit}
                </span>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-800">
                Quantity received
              </span>

              <div className="mt-2 flex items-center gap-2">
                <input
                  value={stockAmount}
                  onChange={(e) =>
                    setStockAmount(e.target.value)
                  }
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:bg-white"
                />

                <span className="rounded-xl bg-slate-100 px-3 py-3 text-xs font-semibold text-slate-600">
                  {selectedMedicine.unit}
                </span>
              </div>
            </label>

            <div className="mt-5 flex gap-2">
              <button
                onClick={closeModal}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={receiveStock}
                className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}