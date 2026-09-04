"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Header from "./Header";
import AccessGate from "./AccessGate";
import { useRole, Role } from "../context/RoleContext";
import { isRoleAuthenticated } from "../utils/auth";

function getProtectedRoleForPath(pathname: string): Role | null {
  if (
    pathname === "/dashboard" ||
    (pathname.startsWith("/admin") &&
      !pathname.startsWith("/admin/login") &&
      !pathname.startsWith("/admin/verify"))
  ) {
    return "admin";
  }
  if (
    pathname === "/doctor" ||
    (pathname.startsWith("/doctor") &&
      !pathname.startsWith("/doctor/login") &&
      !pathname.startsWith("/doctor/verify"))
  ) {
    return "doctor";
  }
  if (
    pathname === "/asha" ||
    (pathname.startsWith("/asha") &&
      !pathname.startsWith("/asha/login") &&
      !pathname.startsWith("/asha/verify"))
  ) {
    return "asha";
  }
  if (
    pathname === "/facility" ||
    (pathname.startsWith("/facility") &&
      !pathname.startsWith("/facility/login") &&
      !pathname.startsWith("/facility/verify"))
  ) {
    return "facility";
  }
  if (pathname === "/patient" || pathname.startsWith("/patient/")) {
    return "patient";
  }
  return null;
}

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { activeRole } = useRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Render basic placeholder while mounting to avoid SSR hydration mismatch
  if (!mounted) {
    return <div className="relative z-10 min-h-screen">{children}</div>;
  }

  // PROTECTED ROUTE AUTHENTICATION GATE & CROSS-ROLE BOUNDARY
  const protectedRole = getProtectedRoleForPath(pathname);
  if (protectedRole) {
    // 1. Fresh browser or unauthenticated for this role
    if (!isRoleAuthenticated(protectedRole)) {
      return (
        <AccessGate
          requiredRole={protectedRole}
          currentRole={activeRole}
          pathname={pathname}
        />
      );
    }
    // 2. Cross-role boundary check (e.g. Doctor navigating to Facility, or Facility to Doctor)
    if (activeRole !== "public" && activeRole !== protectedRole) {
      return (
        <AccessGate
          requiredRole={protectedRole}
          currentRole={activeRole}
          pathname={pathname}
        />
      );
    }
  }

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
        <div className="min-w-0 flex-1 flex flex-col pb-16 md:pb-0">
          <Header />
          <div className="min-w-0 flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}