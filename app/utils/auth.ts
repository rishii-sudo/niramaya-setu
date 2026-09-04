import { Role } from "../context/RoleContext";

export function isRoleAuthenticated(role: Role): boolean {
  if (typeof window === "undefined") return false;
  switch (role) {
    case "doctor":
      return !!(
        localStorage.getItem("niramaya-doctor-auth") ||
        localStorage.getItem("niramaya-doctor-verification") === "verified" ||
        localStorage.getItem("niramaya-doctor-id")
      );
    case "asha":
      return !!(
        localStorage.getItem("niramaya-asha-auth") ||
        localStorage.getItem("niramaya-asha-verification") === "verified" ||
        localStorage.getItem("niramaya-asha-id")
      );
    case "facility":
      return !!(
        localStorage.getItem("niramaya-facility-auth") ||
        localStorage.getItem("niramaya-facility-verification") === "verified" ||
        localStorage.getItem("niramaya-facility-id")
      );
    case "admin":
      return !!(
        localStorage.getItem("niramaya-admin-auth") ||
        localStorage.getItem("niramaya-admin-id")
      );
    case "patient":
      return !!(
        localStorage.getItem("niramaya-patient-auth") ||
        localStorage.getItem("niramaya-patient-mobile")
      );
    case "public":
      return true;
    default:
      return false;
  }
}

export function setDemoAuthForRole(role: Role) {
  if (typeof window === "undefined") return;
  switch (role) {
    case "doctor":
      localStorage.setItem("niramaya-doctor-id", "DOC-2048");
      localStorage.setItem("niramaya-doctor-role", "Doctor");
      localStorage.setItem("niramaya-doctor-verification", "verified");
      localStorage.setItem("niramaya-doctor-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "doctor");
      break;
    case "asha":
      localStorage.setItem("niramaya-asha-id", "ASHA-1024");
      localStorage.setItem("niramaya-asha-role", "ASHA / ANM");
      localStorage.setItem("niramaya-asha-verification", "verified");
      localStorage.setItem("niramaya-asha-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "asha");
      break;
    case "facility":
      localStorage.setItem("niramaya-facility-id", "FAC-DH-JAIPUR");
      localStorage.setItem("niramaya-facility-role", "Facility Staff");
      localStorage.setItem("niramaya-facility-verification", "verified");
      localStorage.setItem("niramaya-facility-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "facility");
      break;
    case "admin":
      localStorage.setItem("niramaya-admin-id", "ADMIN-101");
      localStorage.setItem("niramaya-admin-role", "Administrator");
      localStorage.setItem("niramaya-admin-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "admin");
      break;
    case "patient":
      localStorage.setItem("niramaya-patient-mobile", "98XXXXXX42");
      localStorage.setItem("niramaya-patient-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "patient");
      break;
  }
}

export function clearStaffSessionKeys() {
  if (typeof window === "undefined") return;
  const staffKeys = [
    // Doctor keys
    "niramaya-doctor-id",
    "niramaya-doctor-role",
    "niramaya-doctor-verification",
    "niramaya-doctor-referral",
    "niramaya-doctor-remember",
    "niramaya-doctor-auth",
    // ASHA keys
    "niramaya-asha-id",
    "niramaya-asha-role",
    "niramaya-asha-verification",
    "niramaya-asha-referral",
    "niramaya-asha-remember",
    "niramaya-asha-auth",
    // Facility keys
    "niramaya-facility-id",
    "niramaya-facility-role",
    "niramaya-facility-verification",
    "niramaya-facility-referral",
    "niramaya-facility-remember",
    "niramaya-facility-token",
    "niramaya-facility-auth",
    // Admin keys
    "niramaya-admin-id",
    "niramaya-admin-role",
    "niramaya-admin-auth",
    "niramaya-admin-remember",
  ];
  staffKeys.forEach((key) => window.localStorage.removeItem(key));
}

export function logoutUser(activeRole?: Role): string {
  if (typeof window !== "undefined") {
    // Clear all role-specific demo auth/session keys
    const keysToRemove = [
      "niramaya-active-role",
      // Patient keys
      "niramaya-patient-mobile",
      "niramaya-patient-auth",
      // Doctor keys
      "niramaya-doctor-id",
      "niramaya-doctor-role",
      "niramaya-doctor-verification",
      "niramaya-doctor-referral",
      "niramaya-doctor-remember",
      "niramaya-doctor-auth",
      // ASHA keys
      "niramaya-asha-id",
      "niramaya-asha-role",
      "niramaya-asha-verification",
      "niramaya-asha-referral",
      "niramaya-asha-remember",
      "niramaya-asha-auth",
      // Facility keys
      "niramaya-facility-id",
      "niramaya-facility-role",
      "niramaya-facility-verification",
      "niramaya-facility-referral",
      "niramaya-facility-remember",
      "niramaya-facility-token",
      "niramaya-facility-auth",
      // Admin keys
      "niramaya-admin-id",
      "niramaya-admin-role",
      "niramaya-admin-auth",
      "niramaya-admin-remember",
    ];

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  }

  // Redirection target based on originating portal
  switch (activeRole) {
    case "asha":
      return "/asha/login";
    case "doctor":
      return "/doctor/login";
    case "facility":
      return "/facility/login";
    case "patient":
      return "/login";
    case "admin":
      return "/admin/login";
    default:
      return "/login";
  }
}
