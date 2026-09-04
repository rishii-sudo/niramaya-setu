"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pill,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building,
  Upload,
  Clock,
  ArrowRight,
} from "lucide-react";
import LanguageSelector from "../../components/LanguageSelector";

interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  category: "Antihypertensive" | "Antidiabetic" | "Antibiotic" | "Antipyretic" | "Maternal Care" | "Gastrointestinal" | "First Aid";
  dosage: string;
  form: "Tablet" | "Syrup" | "Capsule" | "Ointment" | "Sachet";
  price: number;
  requiresPrescription: boolean;
  inStock: boolean;
  description: string;
}

const medicineCatalog: MedicineItem[] = [
  {
    id: "MED-101",
    name: "Amlodipine 5mg",
    genericName: "Amlodipine Besylate",
    category: "Antihypertensive",
    dosage: "5mg",
    form: "Tablet",
    price: 32,
    requiresPrescription: true,
    inStock: true,
    description: "Calcium channel blocker used to treat high blood pressure and prevent chest pain (angina).",
  },
  {
    id: "MED-102",
    name: "Paracetamol 650mg",
    genericName: "Acetaminophen",
    category: "Antipyretic",
    dosage: "650mg",
    form: "Tablet",
    price: 18,
    requiresPrescription: false,
    inStock: true,
    description: "Fast-acting relief for mild-to-moderate fever, headache, and generalized body aches.",
  },
  {
    id: "MED-103",
    name: "Iron & Folic Acid",
    genericName: "Ferrous Ascorbate + Folic Acid",
    category: "Maternal Care",
    dosage: "100mg + 1.5mg",
    form: "Tablet",
    price: 45,
    requiresPrescription: false,
    inStock: true,
    description: "Essential antenatal dietary supplement to prevent maternal anemia and support fetal development.",
  },
  {
    id: "MED-104",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin Trihydrate",
    category: "Antibiotic",
    dosage: "500mg",
    form: "Capsule",
    price: 68,
    requiresPrescription: true,
    inStock: true,
    description: "Broad-spectrum penicillin antibiotic for bacterial ear, chest, and urinary infections.",
  },
  {
    id: "MED-105",
    name: "Oral Rehydration Salts (ORS)",
    genericName: "WHO Standard Electrolyte Formula",
    category: "Gastrointestinal",
    dosage: "21.8g Sachet",
    form: "Sachet",
    price: 12,
    requiresPrescription: false,
    inStock: true,
    description: "Standard WHO formulation powder sachet for replenishing vital fluids and salts lost during acute diarrhea.",
  },
  {
    id: "MED-106",
    name: "Metformin 500mg",
    genericName: "Metformin Hydrochloride",
    category: "Antidiabetic",
    dosage: "500mg",
    form: "Tablet",
    price: 28,
    requiresPrescription: true,
    inStock: true,
    description: "First-line oral antidiabetic medication for controlling blood glucose levels in type 2 diabetes mellitus.",
  },
  {
    id: "MED-107",
    name: "Povidone Iodine 5% Ointment",
    genericName: "Povidone-Iodine",
    category: "First Aid",
    dosage: "20g Tube",
    form: "Ointment",
    price: 35,
    requiresPrescription: false,
    inStock: true,
    description: "Topical antiseptic microbicide for preventing infection in minor cuts, scrapes, and burns.",
  },
  {
    id: "MED-108",
    name: "Calcium + Vitamin D3",
    genericName: "Calcium Carbonate + Cholecalciferol",
    category: "Maternal Care",
    dosage: "500mg + 250 IU",
    form: "Tablet",
    price: 52,
    requiresPrescription: false,
    inStock: true,
    description: "Bone health and maternal calcium supplementation supporting musculoskeletal strength.",
  },
];

export default function PatientMedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [prescriptionFilter, setPrescriptionFilter] = useState<"All" | "OTC" | "Rx">("All");
  const [cart, setCart] = useState<{ item: MedicineItem; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderStep, setOrderStep] = useState<"cart" | "checkout" | "confirmed">("cart");
  const [patientAddress, setPatientAddress] = useState("Ward 4, Gram Panchayat Bassi, Jaipur");
  const [uploadedRxName, setUploadedRxName] = useState("");

  const categories = ["All", "Antidiabetic", "Antihypertensive", "Antibiotic", "Antipyretic", "Maternal Care", "Gastrointestinal", "First Aid"];

  const filteredMedicines = medicineCatalog.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;

    const matchesRx =
      prescriptionFilter === "All" ||
      (prescriptionFilter === "OTC" && !med.requiresPrescription) ||
      (prescriptionFilter === "Rx" && med.requiresPrescription);

    return matchesSearch && matchesCategory && matchesRx;
  });

  const addToCart = (med: MedicineItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.item.id === med.id);
      if (exists) {
        return prev.map((c) => (c.item.id === med.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { item: med, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as { item: MedicineItem; quantity: number }[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const totalAmount = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const hasPrescriptionItems = cart.some((c) => c.item.requiresPrescription);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStep("confirmed");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header & Cart Toggle */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/patient" className="hover:text-teal-700">
                Patient Portal
              </Link>
              <span>/</span>
              <span className="text-slate-800">Medicines</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Essential Medicine Dispensary
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Order essential healthcare medications, maternal vitamins, and prescribed treatments for village delivery or sub-center pickup.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => {
                setShowCart(true);
                setOrderStep("cart");
              }}
              className="relative flex items-center gap-2 rounded-2xl bg-teal-700 px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
            >
              <ShoppingCart size={16} />
              <span>View Cart ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
              {cart.length > 0 && (
                <span className="ml-1 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-extrabold text-teal-950">
                  ₹{totalAmount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search generic names, brands (e.g. Paracetamol, Amlodipine, Iron)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs outline-none focus:border-teal-600 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter:</span>
            <div className="flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold shadow-sm">
              {(["All", "OTC", "Rx"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPrescriptionFilter(mode)}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    prescriptionFilter === mode ? "bg-teal-700 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {mode === "All" ? "All" : mode === "OTC" ? "Over-the-Counter" : "Prescription (Rx)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold shrink-0 transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMedicines.map((med) => {
            const inCart = cart.find((c) => c.item.id === med.id);
            return (
              <div
                key={med.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {med.category}
                    </span>
                    {med.requiresPrescription ? (
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800">
                        Rx Required
                      </span>
                    ) : (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                        OTC General
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <Pill size={22} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{med.name}</h3>
                      <p className="text-[11px] font-medium text-slate-500">{med.genericName}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {med.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Price:</span>
                    <p className="text-base font-bold text-slate-900">₹{med.price}</p>
                  </div>

                  {inCart ? (
                    <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-2 py-1 text-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(med.id, -1)}
                        className="rounded p-1 text-teal-800 hover:bg-teal-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-bold text-teal-900">{inCart.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(med.id, 1)}
                        className="rounded p-1 text-teal-800 hover:bg-teal-100"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(med)}
                      className="flex items-center gap-1 rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-teal-800 transition"
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Disclaimer */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Medicine Ordering Prototype Note</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            Pharmaceutical ordering is a simulated prototype workflow. Prescription medicines require validation against authorized doctor e-prescriptions before fulfillment. Production deployment partners with licensed Jan Aushadhi and registered district pharmacy providers.
          </p>
        </div>

        {/* Cart / Checkout Modal */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <ShoppingCart size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {orderStep === "cart"
                      ? "Medicine Order Cart"
                      : orderStep === "checkout"
                      ? "Confirm Delivery Address"
                      : "Order Dispatched"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {orderStep === "cart" && (
                <div className="mt-4 space-y-4 text-xs">
                  {cart.length > 0 ? (
                    <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                      {cart.map(({ item, quantity }) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                          <div>
                            <p className="font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400">
                              ₹{item.price} each • {item.requiresPrescription ? "Rx Required" : "OTC"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                                <Minus size={11} />
                              </button>
                              <span className="font-bold">{quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="font-bold text-slate-900 w-12 text-right">
                              ₹{item.price * quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-8 text-center text-slate-400">Your medicine cart is empty.</p>
                  )}

                  {hasPrescriptionItems && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800">
                      <p className="font-bold">Prescription Required Notice</p>
                      <p className="mt-0.5">
                        Your cart contains prescription items. An authorized clinician prescription or doctor referral summary will be verified prior to dispatch.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-bold text-slate-900">
                    <span>Estimated Total:</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCart(false)}
                      className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Continue Browsing
                    </button>
                    <button
                      type="button"
                      disabled={cart.length === 0}
                      onClick={() => setOrderStep("checkout")}
                      className="flex-1 rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800 disabled:opacity-50"
                    >
                      Proceed to Checkout →
                    </button>
                  </div>
                </div>
              )}

              {orderStep === "checkout" && (
                <form onSubmit={handlePlaceOrder} className="mt-4 space-y-4 text-xs">
                  <div>
                    <label className="mb-1 block font-semibold text-slate-700">Delivery Address / Primary Sub-center</label>
                    <textarea
                      rows={2}
                      required
                      value={patientAddress}
                      onChange={(e) => setPatientAddress(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600"
                    />
                  </div>

                  {hasPrescriptionItems && (
                    <div>
                      <label className="mb-1 block font-semibold text-slate-700">Attach Prescription Summary (Optional in Prototype)</label>
                      <input
                        type="file"
                        onChange={(e) => setUploadedRxName(e.target.files?.[0]?.name || "")}
                        className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                      />
                      {uploadedRxName && (
                        <p className="mt-1 text-[11px] text-emerald-700">✓ Attached: {uploadedRxName}</p>
                      )}
                    </div>
                  )}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Total:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Sub-center Delivery:</span>
                      <span className="text-emerald-700 font-bold">Free (Public Health)</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                      <span>Total Payable:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setOrderStep("cart")}
                      className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800"
                    >
                      Confirm Medicine Order
                    </button>
                  </div>
                </form>
              )}

              {orderStep === "confirmed" && (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Order Request Placed Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your essential medicine order will be coordinated with the local ASHA field worker and primary health sub-center.
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 text-left text-xs font-mono">
                    <p className="text-slate-400 text-[10px]">Reference Number</p>
                    <p className="font-bold text-slate-800">MED-ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCart([]);
                      setShowCart(false);
                      setOrderStep("cart");
                    }}
                    className="w-full rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800 text-xs"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
