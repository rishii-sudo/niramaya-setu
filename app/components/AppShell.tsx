"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useRole } from "../context/RoleContext";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { activeRole } = useRole();

  const isStaffRole =
    activeRole === "asha" ||
    activeRole === "doctor" ||
    activeRole === "facility" ||
    activeRole === "admin";

  const isAlwaysStandalone =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/login" ||
    pathname === "/doctors" ||
    pathname === "/appointments" ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/consultations") ||
    pathname.startsWith("/doctor/login") ||
    pathname.startsWith("/doctor/verify") ||
    pathname.startsWith("/asha/login") ||
    pathname.startsWith("/asha/verify") ||
    pathname.startsWith("/facility/login") ||
    pathname.startsWith("/facility/verify") ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/verify");

  // Shared routes like /facilities are standalone for public/patients, but keep sidebar for staff
  const isSharedStandalone =
    (pathname === "/facilities" || pathname.startsWith("/facilities/")) &&
    !isStaffRole;

  if (isAlwaysStandalone || isSharedStandalone) {
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