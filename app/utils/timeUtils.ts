import { Language } from "../data/translations";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "morning";
  } else if (hour < 17) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export function getDynamicGreeting(language: Language = "en"): string {
  const time = getTimeOfDay();

  if (language === "hi") {
    switch (time) {
      case "morning":
        return "शुभ प्रभात";
      case "afternoon":
        return "शुभ दोपहर";
      case "evening":
        return "शुभ संध्या";
    }
  }

  if (language === "mr") {
    switch (time) {
      case "morning":
        return "शुभ सकाळ";
      case "afternoon":
        return "शुभ दुपार";
      case "evening":
        return "शुभ संध्याकाळ";
    }
  }

  switch (time) {
    case "morning":
      return "Good morning";
    case "afternoon":
      return "Good afternoon";
    case "evening":
      return "Good evening";
  }
}
