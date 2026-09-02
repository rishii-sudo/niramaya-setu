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

  /*
   * Standalone routes:
   * - Public patient entry
   * - Patient portal
   * - Internal authentication
   *
   * These pages must NOT show the application sidebar.
   */
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
      <MobileNav />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}