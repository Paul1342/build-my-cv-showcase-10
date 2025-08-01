import { CVData } from "@/types/cv";

export const professionalSampleData: CVData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    jobTitle: "Senior Software Engineer",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    website: "www.sarahjohnson.dev",
    photoUrl: ""
  },
  summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers in fast-paced startup environments.",
  workExperience: [
    {
      id: "1",
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Inc.",
      startDate: "2022-01-01",
      endDate: "",
      current: true,
      responsibilities: [
        "Lead development of microservices architecture serving 10M+ users",
        "Mentor team of 5 junior developers and conduct code reviews",
        "Reduced system latency by 40% through optimization initiatives",
        "Collaborate with product team to define technical requirements"
      ]
    },
    {
      id: "2",
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      startDate: "2019-06-01",
      endDate: "2021-12-01",
      current: false,
      responsibilities: [
        "Developed and maintained React-based web applications",
        "Implemented RESTful APIs using Node.js and Express",
        "Managed PostgreSQL databases and optimized query performance",
        "Participated in agile development process and sprint planning"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      institution: "Stanford University",
      startDate: "2015-09-01",
      endDate: "2019-05-01",
      grade: "3.8 GPA"
    }
  ],
  skills: [
    { id: "1", name: "JavaScript", level: "Expert" },
    { id: "2", name: "React", level: "Expert" },
    { id: "3", name: "Node.js", level: "Advanced" },
    { id: "4", name: "Python", level: "Advanced" },
    { id: "5", name: "AWS", level: "Intermediate" },
    { id: "6", name: "Docker", level: "Intermediate" }
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Spanish", proficiency: "Conversational" }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-03-01",
      expiryDate: "2026-03-01"
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "Sarah Johnson",
      email: "s.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
      organization: "TechCorp Solutions"
    },
    {
      id: "ref-2",
      name: "Michael Chen",
      email: "m.chen@innovatetech.com",
      phone: "+1 (555) 987-6543",
      organization: "InnovateTech Inc."
    }
  ]
};

export const creativeSampleData: CVData = {
  personalInfo: {
    fullName: "Alex Rivera",
    jobTitle: "Creative Director & UX Designer",
    email: "alex@creativestudio.com",
    phone: "+1 (555) 987-6543",
    address: "Brooklyn, NY",
    website: "www.alexrivera.design",
    photoUrl: ""
  },
  summary: "Innovative creative director with 10+ years of experience in digital design, brand strategy, and user experience. Passionate about creating meaningful connections between brands and users through compelling visual storytelling and intuitive design solutions.",
  workExperience: [
    {
      id: "1",
      jobTitle: "Creative Director",
      company: "Design Studio Co.",
      startDate: "2021-03-01",
      endDate: "",
      current: true,
      responsibilities: [
        "Lead creative vision for 20+ high-profile client campaigns",
        "Manage team of 8 designers and oversee project workflows",
        "Developed award-winning brand identities for Fortune 500 companies",
        "Increased client retention by 35% through innovative design solutions"
      ]
    },
    {
      id: "2",
      jobTitle: "Senior UX Designer",
      company: "Digital Agency",
      startDate: "2018-01-01",
      endDate: "2021-02-01",
      current: false,
      responsibilities: [
        "Designed user interfaces for mobile and web applications",
        "Conducted user research and usability testing sessions",
        "Created wireframes, prototypes, and design systems",
        "Collaborated with development teams on implementation"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Fine Arts",
      fieldOfStudy: "Graphic Design",
      institution: "Parsons School of Design",
      startDate: "2012-09-01",
      endDate: "2014-05-01"
    }
  ],
  skills: [
    { id: "1", name: "Adobe Creative Suite", level: "Expert" },
    { id: "2", name: "Figma", level: "Expert" },
    { id: "3", name: "Sketch", level: "Advanced" },
    { id: "4", name: "Prototyping", level: "Advanced" },
    { id: "5", name: "Brand Strategy", level: "Expert" },
    { id: "6", name: "Typography", level: "Expert" }
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "French", proficiency: "Fluent" }
  ],
  certifications: [
    {
      id: "1",
      name: "Google UX Design Certificate",
      issuer: "Google",
      date: "2020-08-01"
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "Jennifer Davis",
      email: "j.davis@designstudio.com",
      phone: "+1 (555) 111-2222",
      organization: "Design Studio Co."
    },
    {
      id: "ref-2",
      name: "Robert Kim",
      email: "r.kim@digitalagency.com",
      phone: "+1 (555) 333-4444",
      organization: "Digital Agency"
    }
  ]
};

export const executiveSampleData: CVData = {
  personalInfo: {
    fullName: "Michael Thompson",
    jobTitle: "Chief Technology Officer",
    email: "m.thompson@enterprise.com",
    phone: "+1 (555) 456-7890",
    address: "Boston, MA",
    website: "linkedin.com/in/mthompson",
    photoUrl: ""
  },
  summary: "Visionary technology executive with 15+ years of experience leading digital transformation initiatives at Fortune 500 companies. Proven track record of scaling technology teams, driving innovation, and delivering measurable business value through strategic technology investments.",
  workExperience: [
    {
      id: "1",
      jobTitle: "Chief Technology Officer",
      company: "Enterprise Solutions Corp",
      startDate: "2020-01-01",
      endDate: "",
      current: true,
      responsibilities: [
        "Lead technology strategy and digital transformation for $2B+ company",
        "Manage global technology team of 200+ engineers and architects",
        "Oversee $50M annual technology budget and vendor relationships",
        "Drive adoption of cloud-first architecture, reducing costs by 30%"
      ]
    },
    {
      id: "2",
      jobTitle: "VP of Engineering",
      company: "Global Tech Inc",
      startDate: "2016-05-01",
      endDate: "2019-12-01",
      current: false,
      responsibilities: [
        "Built and scaled engineering organization from 20 to 100+ people",
        "Established agile development practices and DevOps culture",
        "Led migration to microservices architecture",
        "Championed diversity and inclusion initiatives in technical hiring"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Business Administration",
      fieldOfStudy: "Technology Management",
      institution: "MIT Sloan School of Management",
      startDate: "2010-09-01",
      endDate: "2012-05-01"
    },
    {
      id: "2",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Engineering",
      institution: "Georgia Institute of Technology",
      startDate: "2002-09-01",
      endDate: "2006-05-01"
    }
  ],
  skills: [
    { id: "1", name: "Strategic Planning", level: "Expert" },
    { id: "2", name: "Team Leadership", level: "Expert" },
    { id: "3", name: "Cloud Architecture", level: "Advanced" },
    { id: "4", name: "Digital Transformation", level: "Expert" },
    { id: "5", name: "Budget Management", level: "Advanced" },
    { id: "6", name: "Vendor Management", level: "Advanced" }
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" }
  ],
  certifications: [
    {
      id: "1",
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date: "2018-06-01"
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "David Wilson",
      email: "d.wilson@enterprise.com",
      phone: "+1 (555) 777-8888",
      organization: "Enterprise Solutions Corp"
    },
    {
      id: "ref-2",
      name: "Lisa Zhang",
      email: "l.zhang@globaltech.com",
      phone: "+1 (555) 999-0000",
      organization: "Global Tech Inc"
    }
  ]
};

export const minimalSampleData: CVData = {
  personalInfo: {
    fullName: "Emma Chen",
    jobTitle: "Data Scientist",
    email: "emma.chen@data.com",
    phone: "+1 (555) 234-5678",
    address: "Seattle, WA",
    website: "github.com/emmachen",
    photoUrl: ""
  },
  summary: "Data scientist with expertise in machine learning, statistical analysis, and data visualization. Experienced in extracting actionable insights from complex datasets to drive business decisions.",
  workExperience: [
    {
      id: "1",
      jobTitle: "Senior Data Scientist",
      company: "DataCorp",
      startDate: "2021-01-01",
      endDate: "",
      current: true,
      responsibilities: [
        "Develop predictive models using Python and R",
        "Analyze large datasets to identify business opportunities",
        "Create data visualizations and dashboards for stakeholders",
        "Collaborate with cross-functional teams on data-driven projects"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Ph.D.",
      fieldOfStudy: "Statistics",
      institution: "University of Washington",
      startDate: "2016-09-01",
      endDate: "2020-12-01"
    }
  ],
  skills: [
    { id: "1", name: "Python", level: "Expert" },
    { id: "2", name: "R", level: "Advanced" },
    { id: "3", name: "SQL", level: "Advanced" },
    { id: "4", name: "Machine Learning", level: "Expert" },
    { id: "5", name: "Statistics", level: "Expert" }
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Mandarin", proficiency: "Native" }
  ],
  certifications: [],
  references: [
    {
      id: "ref-1",
      name: "Dr. James Liu",
      email: "j.liu@datacorp.com",
      phone: "+1 (555) 555-6666",
      organization: "DataCorp"
    }
  ]
};

export const getSampleDataForTemplate = (templateId: string): CVData => {
  const sampleDataMap: Record<string, CVData> = {
    professional: professionalSampleData,
    creative: creativeSampleData,
    executive: executiveSampleData,
    minimal: minimalSampleData
  };
  
  return sampleDataMap[templateId] || professionalSampleData;
};