"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isRoleAuthenticated } from "../utils/auth";

export type Role = "asha" | "doctor" | "facility" | "admin" | "patient" | "public";

interface RoleContextType {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  roleDisplayName: string;
  roleSubtitle: string;
  roleDashboardPath: string;
  getDashboardForRole: (role: Role) => string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = "niramaya-active-role";

export function getRoleFromPathname(pathname: string): Role | null {
  if (pathname === "/asha" || pathname.startsWith("/asha/")) {
    // Exclude login and verify
    if (pathname === "/asha/login" || pathname === "/asha/verify") return null;
    return "asha";
  }
  if (pathname === "/doctor" || pathname.startsWith("/doctor/")) {
    if (pathname === "/doctor/login" || pathname === "/doctor/verify") return null;
    return "doctor";
  }
  if (pathname === "/facility" || pathname.startsWith("/facility/")) {
    if (pathname === "/facility/login" || pathname === "/facility/verify") return null;
    return "facility";
  }
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard"
  ) {
    if (pathname === "/admin/login" || pathname === "/admin/verify") return null;
    return "admin";
  }
  if (pathname === "/patient" || pathname.startsWith("/patient/")) {
    return "patient";
  }
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/login" ||
    pathname === "/doctors" ||
    pathname === "/facilities" ||
    pathname.startsWith("/facilities/") ||
    pathname === "/appointments" ||
    pathname.startsWith("/consultations")
  ) {
    return null; // Public / shared routes - preserve existing role or default to public
  }
  return null;
}

export function getDashboardForRole(role: Role): string {
  switch (role) {
    case "asha":
      return "/asha";
    case "doctor":
      return "/doctor";
    case "facility":
      return "/facility/dashboard";
    case "admin":
      return "/dashboard";
    case "patient":
      return "/patient";
    default:
      return "/";
  }
}

export function getRoleDetails(role: Role) {
  switch (role) {
    case "asha":
      return {
        displayName: "ASHA / ANM",
        subtitle: "Field Care Worker",
      };
    case "doctor":
      return {
        displayName: "Doctor",
        subtitle: "Clinical Workspace",
      };
    case "facility":
      return {
        displayName: "Facility Staff",
        subtitle: "Facility Operations",
      };
    case "admin":
      return {
        displayName: "Administrator",
        subtitle: "System Administration",
      };
    case "patient":
      return {
        displayName: "Patient",
        subtitle: "Personal Health Portal",
      };
    default:
      return {
        displayName: "Guest User",
        subtitle: "Care Continuity Platform",
      };
  }
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeRole, setActiveRoleState] = useState<Role>("public");

  useEffect(() => {
    const pathRole = getRoleFromPathname(pathname);
    const stored = typeof window !== "undefined" ? (localStorage.getItem(ROLE_STORAGE_KEY) as Role | null) : null;
    const isStoredValid = stored && ["asha", "doctor", "facility", "admin", "patient"].includes(stored) && isRoleAuthenticated(stored);

    if (pathRole) {
      // If user is already authenticated in an active role that differs from pathRole,
      // DO NOT silently switch activeRole. Preserve current role so AppShell can enforce the access boundary!
      if (isStoredValid && stored !== pathRole) {
        setActiveRoleState(stored);
        return;
      }

      // If user is directly accessing their own role's route and has valid session:
      if (isRoleAuthenticated(pathRole)) {
        setActiveRoleState(pathRole);
        if (typeof window !== "undefined") {
          localStorage.setItem(ROLE_STORAGE_KEY, pathRole);
        }
      } else {
        // Fresh browser or unauthenticated navigation
        setActiveRoleState("public");
      }
    } else {
      if (isStoredValid) {
        setActiveRoleState(stored);
      } else {
        setActiveRoleState("public"); // Default to public, NEVER to admin!
      }
    }
  }, [pathname]);

  const setActiveRole = (role: Role) => {
    setActiveRoleState(role);
    if (typeof window !== "undefined") {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    }
  };

  const roleDetails = getRoleDetails(activeRole);

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        roleDisplayName: roleDetails.displayName,
        roleSubtitle: roleDetails.subtitle,
        roleDashboardPath: getDashboardForRole(activeRole),
        getDashboardForRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    return {
      activeRole: "public" as Role,
      setActiveRole: () => {},
      roleDisplayName: "Guest User",
      roleSubtitle: "Care Continuity Platform",
      roleDashboardPath: "/",
      getDashboardForRole: () => "/",
    };
  }
  return context;
}
