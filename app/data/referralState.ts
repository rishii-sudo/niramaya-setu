import type { ReferralStatus } from "./patientData";

const STORAGE_KEY = "niramaya-referral-state";

type ReferralStateMap = Record<string, ReferralStatus>;

const initialReferralStates: ReferralStateMap = {
  "NS-28491": "In Transit",
  "NS-28478": "Received",
  "NS-28461": "Closed",
  "NS-28432": "Discharged",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readStates(): ReferralStateMap {
  if (!isBrowser()) {
    return initialReferralStates;
  }

  try {
    const stored = window.localStorage.getItem(
      STORAGE_KEY,
    );

    if (!stored) {
      return initialReferralStates;
    }

    const parsed = JSON.parse(
      stored,
    ) as ReferralStateMap;

    return {
      ...initialReferralStates,
      ...parsed,
    };
  } catch {
    return initialReferralStates;
  }
}

function writeStates(
  states: ReferralStateMap,
) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(states),
  );
}

export function getReferralStatus(
  referralId: string,
): ReferralStatus {
  const states = readStates();

  return (
    states[referralId] ??
    "Created"
  );
}

export function setReferralStatus(
  referralId: string,
  status: ReferralStatus,
) {
  const states = readStates();

  const updatedStates = {
    ...states,
    [referralId]: status,
  };

  writeStates(updatedStates);

  return status;
}

export function resetReferralStatus(
  referralId: string,
) {
  const states = readStates();

  const updatedStates = {
    ...states,
    [referralId]:
      initialReferralStates[referralId] ??
      "Created",
  };

  writeStates(updatedStates);
}

export function getAllReferralStates() {
  return readStates();
}

export function clearReferralStates() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(
    STORAGE_KEY,
  );
}

export function getNextReferralStatus(
  currentStatus: ReferralStatus,
): ReferralStatus {
  switch (currentStatus) {
    case "Created":
      return "In Transit";

    case "In Transit":
      return "Received";

    case "Received":
      return "Under Treatment";

    case "Under Treatment":
      return "Discharged";

    case "Discharged":
      return "Closed";

    case "Closed":
      return "Closed";

    default:
      return "Created";
  }
}

export function getPreviousReferralStatus(
  currentStatus: ReferralStatus,
): ReferralStatus {
  switch (currentStatus) {
    case "In Transit":
      return "Created";

    case "Received":
      return "In Transit";

    case "Under Treatment":
      return "Received";

    case "Discharged":
      return "Under Treatment";

    case "Closed":
      return "Discharged";

    case "Created":
    default:
      return "Created";
  }
}

export function isReferralCompleted(
  status: ReferralStatus,
) {
  return status === "Closed";
}

export function isReferralInTreatment(
  status: ReferralStatus,
) {
  return status === "Under Treatment";
}
