export type ShowcaseMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: readonly string[];
  imageSrc: string;
};

export const SHOWCASE_TEAM: readonly ShowcaseMember[] = [
  {
    id: "subramani",
    name: "Subramani",
    role: "Chief Data Scientist",
    bio: "Worked with 15+ international brands, honored as a Top AI Speaker for outstanding contributions to AI education and industry adoption, and empowered 1,000+ data aspirants through focused AI and data analytics initiatives.",
    skills: [
      "B2B Consultations",
      "Business development",
      "Data Engineering",
      "Data Science",
      "SQL",
      "GenAI",
    ],
    imageSrc: "/assets/images/Subramani.jpg",
  },
  {
    id: "aswath",
    name: "Aswath",
    role: "Talent Acquisition Head",
    bio: "Bridges the gap between industry needs and individual preparation, creating career opportunities across multiple industries.",
    skills: [
      "Portfolio building",
      "Statistics",
      "Leadership",
      "Profile optimization",
    ],
    imageSrc: "/assets/images/team/aswath_professional.png",
  },
  {
    id: "nishanth",
    name: "Nishanth",
    role: "Senior Data Engineer",
    bio: "With 8+ years of experience in designing and maintaining scalable data pipelines and architectures across multiple cloud platforms through data engineering",
    skills: [
      "Building optimised data pipelines",
      "Data Engineering",
      "DBT",
      "Snowflake",
      "Cloud computing",
    ],
    imageSrc: "/assets/images/team/Nishanth%20Professional%20pic.png",
  },
  {
    id: "prasanna",
    name: "Prasanna",
    role: "Senior BI-Developer",
    bio: "Builds predictive dashboards and data models to deliver actionable insights and accurate decisions for various global brands with 5+ years of experience",
    skills: ["AWS", "GCP", "SQL", "Power BI", "Databricks"],
    imageSrc: "/assets/images/team/Prasana.jpg",
  },
  {
    id: "bala",
    name: "Bala",
    role: "Senior Data Scientist",
    bio: "Builds predictive ML models for accurate predictions across healthcare and BFSI sectors with 8+ years of experience",
    skills: [
      "B2B Consultations",
      "AWS",
      "Machine learning",
      "SQL",
      "GenAI",
    ],
    imageSrc: "/assets/images/team/Bala.png",
  },
  {
    id: "kishore",
    name: "Kishore",
    role: "Senior AI Engineer",
    bio: "Builds Agentic AI solutions and automations for Supply chain and automobile industry with 8+ years of Industrial Experience",
    skills: [
      "B2B Consultations",
      "Azure",
      "Machine learning",
      "SQL",
      "GenAI",
    ],
    imageSrc: "/assets/images/team/Kishore.jpg",
  },
  {
    id: "mahesh",
    name: "Mahesh",
    role: "Senior AI Engineer",
    bio: "Builds scalable AI solutions for Supply chain and automobile industry with 3+ years of Industrial Experience",
    skills: ["Machine learning", "SQL", "GenAI", "AgenticAI"],
    imageSrc: "/assets/images/team/mahesh_professional.png",
  },
  {
    id: "deepak",
    name: "Deepak Raj",
    role: "Agentic AI Engineer",
    bio: "Builds Agentic AI automations for Supply chain and automobile industry to reduce manual efforts and improve the process efficiency",
    skills: ["Machine learning", "SQL", "GenAI", "AgenticAI"],
    imageSrc: "/assets/images/team/Deepak.png",
  },
  {
    id: "rizwan",
    name: "Rizwan Ahmed",
    role: "Bio Research Analytics Engineer",
    bio: "Pre-Doctoral Fellow at IIT Kharagpur who Engineers biomaterial scaffolds for regenerative medicine by integrating tissue engineering with systems pharmacology and AI-driven analytics. Architects data-informed biotechnological solutions to bridge the gap between complex biological systems and interdisciplinary innovation",
    skills: [
      "Tissue engineering",
      "Regenerative medicine",
      "AI-driven analytics",
      "Systems pharmacology",
      "Biotechnology",
    ],
    imageSrc: "/assets/images/team/Rizwan.png",
  },
] as const;
