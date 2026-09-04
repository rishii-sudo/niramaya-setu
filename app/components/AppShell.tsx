"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isStandaloneRoute =
    pathname === "/login" ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/doctor/login") ||
    pathname.startsWith("/doctor/verify") ||
    pathname.startsWith("/asha/login") ||
    pathname.startsWith("/asha/verify") ||
    pathname.startsWith("/facility/login") ||
    pathname.startsWith("/facility/verify") ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/verify");

  if (isStandaloneRoute) {
    return (
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen">
      {/* Mobile navigation ONLY on mobile */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Page content */}
        <div className="min-w-0 flex-1 pb-16 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}