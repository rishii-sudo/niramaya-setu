import {
  Bell,
  HeartPulse,
  LayoutDashboard,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
              <HeartPulse size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                NIRAMAYA-SETU
              </p>
              <p className="text-[10px] text-slate-500">
                ASHA / ANM Workspace
              </p>
            </div>
          </div>

          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={20} />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white p-4 md:block">
          <nav className="space-y-1">
            <div className="flex items-center gap-3 rounded-lg bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-800">
              <LayoutDashboard size={18} />
              Dashboard
            </div>

            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
              <Users size={18} />
              Patients
            </div>

            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
              <FileText size={18} />
              Referrals
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <section className="w-full p-6 lg:p-8">
          <div>
            <p className="text-sm font-medium text-teal-700">
              ASHA / ANM DASHBOARD
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Good morning
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage patients, referrals and follow-up activities from one
              place.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">My Patients</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">128</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Active Referrals</p>
              <p className="mt-2 text-3xl font-bold text-teal-700">12</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Follow-ups Due</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">7</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Completed Today</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
            </div>
          </div>

          {/* Care Journey */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Current Care Journey
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Patients currently requiring attention
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-teal-700">
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold text-slate-900">
                    Ramesh Kumar
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Referral #NS-28491 • District Hospital
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Awaiting consultation
                </span>
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold text-slate-900">
                    Sunita Devi
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Referral #NS-28478 • Specialist
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  In transit
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}