import { CVData } from "@/types/cv";

export const placeholderData: CVData = {
  personalInfo: {
    fullName: "Your Name",
    jobTitle: "Your Job Title",
    email: "your.email@example.com",
    phone: "+1 (555) 000-0000",
    address: "Your City, State",
    website: "www.yourwebsite.com",
    photoUrl: ""
  },
  summary: "Your professional summary goes here. Describe your key achievements, skills, and career objectives in 2-3 sentences.",
  workExperience: [
    {
      id: "placeholder-1",
      jobTitle: "Job Title 1",
      company: "Company Name",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [
        "Key responsibility 1",
        "Key responsibility 2",
        "Key responsibility 3"
      ]
    },
    {
      id: "placeholder-2",
      jobTitle: "Job Title 2",
      company: "Previous Company",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [
        "Previous role responsibility 1",
        "Previous role responsibility 2"
      ]
    }
  ],
  education: [
    {
      id: "placeholder-1",
      degree: "Your Degree",
      fieldOfStudy: "Field of Study",
      institution: "Institution Name",
      startDate: "",
      endDate: "",
      grade: "Your average"
    }
  ],
  skills: [
    { id: "placeholder-1", name: "Skill 1", level: "Advanced" },
    { id: "placeholder-2", name: "Skill 2", level: "Expert" },
    { id: "placeholder-3", name: "Skill 3", level: "Intermediate" },
    { id: "placeholder-4", name: "Skill 4", level: "Advanced" }
  ],
  languages: [
    { id: "placeholder-1", name: "Language 1", proficiency: "Native" },
    { id: "placeholder-2", name: "Language 2", proficiency: "Fluent" }
  ],
  certifications: [
    {
      id: "placeholder-1",
      name: "Certification Name",
      issuer: "Issuing Organization",
      date: "",
      expiryDate: ""
    }
  ],
  references: [
    {
      id: "placeholder-1",
      name: "Reference Name",
      email: "reference@company.com",
      phone: "+1 (555) 000-0000",
      organization: "Company Name"
    }
  ]
};