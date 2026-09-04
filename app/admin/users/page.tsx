"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Activity,
  Building2,
  Stethoscope,
  Filter,
} from "lucide-react";

type UserRole = "ASHA / ANM" | "Doctor" | "Facility Staff" | "Administrator" | "Care Coordinator";
type UserStatus = "Active" | "Inactive" | "Pending Verification";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  facility: string;
  status: UserStatus;
  lastActive: string;
  phoneMasked: string;
}

const mockUsers: AdminUser[] = [
  {
    id: "USR-101",
    name: "Sunita Sharma",
    email: "sunita.asha@niramayasetu.in",
    role: "ASHA / ANM",
    facility: "PHC Bassi Sub-center",
    status: "Active",
    lastActive: "10 mins ago",
    phoneMasked: "+91 98XXXXXX12",
  },
  {
    id: "USR-102",
    name: "Dr. Rajesh Sharma",
    email: "dr.rajesh@smshospital.in",
    role: "Doctor",
    facility: "SMS Hospital (Cardiology)",
    status: "Active",
    lastActive: "25 mins ago",
    phoneMasked: "+91 94XXXXXX44",
  },
  {
    id: "USR-103",
    name: "Manoj Meena",
    email: "manoj.ops@dhjaipur.in",
    role: "Facility Staff",
    facility: "District Hospital Jaipur",
    status: "Active",
    lastActive: "1 hour ago",
    phoneMasked: "+91 91XXXXXX89",
  },
  {
    id: "USR-104",
    name: "Anjali Gupta",
    email: "anjali.admin@niramayasetu.gov.in",
    role: "Administrator",
    facility: "State Health Mission HQ",
    status: "Active",
    lastActive: "Just now",
    phoneMasked: "+91 99XXXXXX01",
  },
  {
    id: "USR-105",
    name: "Dr. Priya Verma",
    email: "dr.priya@dhjaipur.in",
    role: "Doctor",
    facility: "District Hospital Jaipur",
    status: "Active",
    lastActive: "3 hours ago",
    phoneMasked: "+91 97XXXXXX55",
  },
  {
    id: "USR-106",
    name: "Kamlesh Choudhary",
    email: "kamlesh.anm@phcbagru.in",
    role: "ASHA / ANM",
    facility: "PHC Bagru",
    status: "Pending Verification",
    lastActive: "Yesterday",
    phoneMasked: "+91 96XXXXXX77",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("ASHA / ANM");
  const [newFacility, setNewFacility] = useState("PHC Bassi");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.facility.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser: AdminUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      facility: newFacility,
      status: "Active",
      lastActive: "Just now",
      phoneMasked: "+91 98XXXXXX99",
    };

    setUsers([newUser, ...users]);
    setNewName("");
    setNewEmail("");
    setShowAddModal(false);
  };

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/dashboard" className="hover:text-teal-700">
                Administration
              </Link>
              <span>/</span>
              <span className="text-slate-800">Users & Roles</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              User & Role Management
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Provision, monitor, and configure role-based access for field workers, clinicians, and facility staff.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
          >
            <UserPlus size={16} />
            Add New User
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Users</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{users.length}</p>
            <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-600">All registered roles</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ASHA / ANMs</p>
            <p className="mt-1 text-2xl font-bold text-violet-700">
              {users.filter((u) => u.role === "ASHA / ANM").length}
            </p>
            <span className="mt-1 inline-block text-[10px] font-semibold text-slate-500">Field workforce</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Doctors</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {users.filter((u) => u.role === "Doctor").length}
            </p>
            <span className="mt-1 inline-block text-[10px] font-semibold text-slate-500">Clinical specialists</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Facility Staff</p>
            <p className="mt-1 text-2xl font-bold text-blue-700">
              {users.filter((u) => u.role === "Facility Staff").length}
            </p>
            <span className="mt-1 inline-block text-[10px] font-semibold text-slate-500">Hospital operations</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name, email, facility..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="text-slate-400 shrink-0" />
            {["All", "ASHA / ANM", "Doctor", "Facility Staff", "Administrator"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  roleFilter === role
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Assigned Role</th>
                  <th className="px-5 py-3.5">Facility / Location</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Last Active</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-800">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-[11px] text-slate-500">{user.email}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{user.phoneMasked}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          user.role === "ASHA / ANM"
                            ? "bg-violet-50 text-violet-700 border border-violet-200"
                            : user.role === "Doctor"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : user.role === "Facility Staff"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-700 font-medium">{user.facility}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : user.status === "Pending Verification"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Active"
                              ? "bg-emerald-500"
                              : user.status === "Pending Verification"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{user.lastActive}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        {user.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subtle note */}
        <p className="text-[11px] text-slate-400">
          Demo directory • Production integration uses ABDM-compliant OAuth 2.0 / OpenID Connect identity provider.
        </p>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Add New System User</h2>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Dr. Anupama Sen"
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. anupama@hospital.in"
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600 bg-white"
                  >
                    <option value="ASHA / ANM">ASHA / ANM (Field Work)</option>
                    <option value="Doctor">Doctor (Clinical Workspace)</option>
                    <option value="Facility Staff">Facility Staff (Operations)</option>
                    <option value="Administrator">Administrator (System HQ)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Assigned Facility</label>
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    placeholder="e.g. SMS Hospital Jaipur"
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-xl border border-slate-200 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-teal-700 py-2.5 font-bold text-white hover:bg-teal-800"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
