export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Clinical" | "Design & Security";
  contribution: string;
  initials: string;
  image?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "TM-01",
    name: "Project Lead",
    role: "Digital Health Architect & Initiative Lead",
    category: "Leadership",
    contribution: "Care-continuity framework design, rural referral closed-loop workflows, and ABDM interoperability strategy.",
    initials: "PL",
  },
  {
    id: "TM-02",
    name: "Frontend Engineering",
    role: "Lead UI/UX & Web Application Engineer",
    category: "Engineering",
    contribution: "Next.js App Router architecture, responsive UI components, offline-first state synchronization, and multilingual accessibility.",
    initials: "FE",
  },
  {
    id: "TM-03",
    name: "Backend Engineering",
    role: "Distributed Systems & Cloud Architect",
    category: "Engineering",
    contribution: "Secure microservice APIs, FHIR payload transformation, role-based authorization gateways, and audit logging pipelines.",
    initials: "BE",
  },
  {
    id: "TM-04",
    name: "Security & Privacy",
    role: "Healthcare Data Protection Specialist",
    category: "Design & Security",
    contribution: "Zero-knowledge phone masking, temporary consultation session identifiers, and UIDAI consent architecture alignment.",
    initials: "SP",
  },
  {
    id: "TM-05",
    name: "Healthcare Workflow",
    role: "Clinical Specialist & Field Health Advisor",
    category: "Clinical",
    contribution: "Primary health center triage protocols, ASHA/ANM field care journeys, and secondary hospital transfer validation.",
    initials: "HW",
  },
];

export const projectCreators = {
  initiativeName: "NIRAMAYA-SETU Open Public Health Platform",
  repository: "https://github.com/rishii-sudo/niramaya-setu",
  missionStatement: "Empowering rural front-line health workers and secondary medical centers with privacy-first care continuity and closed-loop referral management.",
};
