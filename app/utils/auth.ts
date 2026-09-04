import { Role } from "../context/RoleContext";

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
      return "/login";
    default:
      return "/login";
  }
}
