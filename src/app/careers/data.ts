export const CAREER_PATHS = [
  "GenAI / Agentic AI",
  "Data Scientist",
  "Data Analytics",
  "Web developer",
  "Business Development Executive",
  "HR",
  "Email Marketing / Digital Marketing",
  "Editor",
  "Content developer",
  "Consultant",
] as const;

/** Applying for one of these roles reveals the extra “data analytics professionals” fields. */
export const CAREERS_DATA_ANALYTICS_ROLE_TITLES = [
  "GenAI / Agentic AI",
  "Data Scientist",
  "Data Analytics",
] as const;

export function isCareersDataAnalyticsRole(role: string): boolean {
  return (CAREERS_DATA_ANALYTICS_ROLE_TITLES as readonly string[]).includes(role);
}

export const CAREERS_TEAM = [
  { name: "Subramani", role: "Chief Data Scientist", image: "/assets/images/Subramani.jpg" },
  { name: "Aswath", role: "Talent Acquisition Head", image: "/assets/images/team/aswath_professional.png" },
  { name: "Nishanth", role: "Senior Data Engineer", image: "/assets/images/team/Nishanth Professional pic.png" },
  { name: "Prasanna", role: "Senior BI Developer", image: "/assets/images/team/Prasana.jpg" },
  { name: "Bala", role: "Senior Data Scientist", image: "/assets/images/team/Bala.png" },
  { name: "Kishore", role: "Senior AI Engineer", image: "/assets/images/team/Kishore.jpg" },
  { name: "Mahesh", role: "Senior AI Engineer", image: "/assets/images/team/mahesh_professional.png" },
  { name: "Deepak Raj", role: "Agentic AI Engineer", image: "/assets/images/team/Deepak.png" },
  { name: "Rizwan Ahmed", role: "Bio Research Analytics Engineer", image: "/assets/images/team/Rizwan.png" },
] as const;

export const CAREERS_JOURNEY = [
  {
    id: "cj-students",
    title: "Students and new grads",
    body: "Launch your career with internships, apprenticeships and graduate programs designed to help you grow from day one.",
  },
  {
    id: "cj-professionals",
    title: "Professionals",
    body: "Bring your expertise and take the next step in your career with roles that challenge and reward your skills.",
  },
  {
    id: "cj-alumni",
    title: "Alumni",
    body: "Former Analytics Avenue associates are always welcome back. See how the company has evolved and find your next chapter.",
  },
  {
    id: "cj-returnship",
    title: "Returnship",
    body: "Returning to work after a career break? Our returnship program offers a supported, structured re-entry path.",
  },
] as const;

export const CAREERS_YOUTUBE_URL =
  "https://www.youtube.com/watch?v=TouJOS07xNU&t=2s";

export const CAREERS_LINKEDIN_URL =
  "https://in.linkedin.com/company/analytics-avenue-for-research-and-development";

/** Anchor IDs shared by the application TOC and form sections. */
export const CAREERS_APPLICATION_SECTION_IDS = {
  basic: "application-basic",
  roles: "application-roles",
  documents: "application-documents",
  dataAnalytics: "application-data-analytics",
  submit: "application-submit",
} as const;

export const CAREERS_APPLICATION_TOC = [
  { id: CAREERS_APPLICATION_SECTION_IDS.basic, label: "Basic details" },
  { id: CAREERS_APPLICATION_SECTION_IDS.roles, label: "Roles" },
  { id: CAREERS_APPLICATION_SECTION_IDS.documents, label: "Resume & portfolio" },
  { id: CAREERS_APPLICATION_SECTION_IDS.dataAnalytics, label: "Data analytics add-on" },
  { id: CAREERS_APPLICATION_SECTION_IDS.submit, label: "Submit" },
] as const;
