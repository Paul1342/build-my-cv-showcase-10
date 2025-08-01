import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Globe, Calendar, Award, Languages, Users } from "lucide-react";
import { CVData, CVTemplate } from "@/types/cv";
import { useEffect } from "react";

const DEFAULT_AVATAR_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqDBA8jnL_ezUoa8s_GgnboMkEeE4M7-LyA&s";

interface CVPreviewProps {
  data: CVData;
  template: CVTemplate;
  isPreview?: boolean;
  isPDF?: boolean;
}

const CVPreview = ({ data, template, isPreview = false, isPDF = false }: CVPreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getSkillLevel = (level: string) => {
    const levels = {
      'Beginner': 25,
      'Intermediate': 50,
      'Advanced': 75,
      'Expert': 100
    };
    return levels[level as keyof typeof levels] || 50;
  };

  // Dynamic color generation based on template color
  const getColorValues = (colorName: string) => {
    const colorMap = {
      slate: { primary: "215, 25%, 27%", secondary: "215, 25%, 95%", accent: "215, 25%, 20%" },
      rose: { primary: "11, 70%, 84%", secondary: "11, 70%, 95%", accent: "11, 70%, 74%" },
      emerald: { primary: "164, 44%, 80%", secondary: "164, 44%, 95%", accent: "164, 44%, 70%" },
      amber: { primary: "0, 0%, 49%", secondary: "0, 0%, 95%", accent: "0, 0%, 39%" },
      blue: { primary: "217, 91%, 60%", secondary: "217, 91%, 95%", accent: "217, 91%, 50%" },
      orange: { primary: "20, 90%, 48%", secondary: "20, 90%, 95%", accent: "20, 90%, 40%" }
    };
    return colorMap[colorName as keyof typeof colorMap] || colorMap.slate;
  };

  // Inject dynamic CSS variables
  useEffect(() => {
    const colors = getColorValues(template.color);
    const root = document.documentElement;
    
    // Set CSS custom properties for template colors
    root.style.setProperty('--template-primary', colors.primary);
    root.style.setProperty('--template-secondary', colors.secondary);
    root.style.setProperty('--template-accent', colors.accent);
    
    return () => {
      // Cleanup when component unmounts
      root.style.removeProperty('--template-primary');
      root.style.removeProperty('--template-secondary');
      root.style.removeProperty('--template-accent');
    };
  }, [template.color]);

  // Get template-specific styles with CSS variables
  const getTemplateStyles = () => {
    const baseStyle = "transition-all duration-300";
    
    const dynamicStyles = {
      sidebarBg: "cv-sidebar-bg",
      primaryColor: "cv-primary-text",
      accentColor: "cv-accent-bg",
      borderColor: "cv-primary-border",
      skillBar: "cv-skill-bar"
    };
    
    switch (template.id) {
      case 'professional':
        return {
          ...dynamicStyles,
          headerStyle: `${baseStyle} cv-header-professional`
        };
      case 'creative':
        return {
          ...dynamicStyles,
          sidebarBg: "cv-sidebar-creative",
          headerStyle: `${baseStyle} cv-header-creative`,
          skillBar: "cv-skill-bar-creative"
        };
      case 'executive':
        return {
          ...dynamicStyles,
          headerStyle: `${baseStyle} cv-header-executive`
        };
      case 'minimal':
        return {
          ...dynamicStyles,
          headerStyle: `${baseStyle} cv-header-minimal`
        };
      default:
        return {
          ...dynamicStyles,
          headerStyle: baseStyle
        };
    }
  };

  const styles = getTemplateStyles();

  if (template.columns === 2) {
    // Two Column Layout
    return (
      <div className={`cv-a4 ${isPDF ? 'bg-white' : 'bg-background'} ${isPDF ? '' : 'border border-border rounded-lg shadow-card'} overflow-hidden ${isPreview ? 'text-xs' : 'text-sm'} cv-template`}>
        <style>
          {`
            .cv-template {
              --template-primary: ${getColorValues(template.color).primary};
              --template-secondary: ${getColorValues(template.color).secondary};
              --template-accent: ${getColorValues(template.color).accent};
            }
            .cv-sidebar-bg { background-color: hsl(var(--template-secondary)); }
            .cv-sidebar-creative { background-color: hsl(var(--template-secondary)); }
            .cv-primary-text { color: hsl(var(--template-primary)); }
            .cv-accent-bg { background-color: hsl(var(--template-primary)); }
            .cv-primary-border { border-color: hsl(var(--template-primary)); }
            .cv-skill-bar { background-color: hsl(var(--template-primary)); }
            .cv-skill-bar-creative { background-color: hsl(var(--template-primary)); }
            .cv-header-professional { background: linear-gradient(to right, hsl(var(--template-primary)), hsl(var(--template-accent))); }
            .cv-header-creative { background-color: hsl(var(--template-primary)); }
            .cv-header-executive { background-color: hsl(var(--template-primary)); }
            .cv-header-minimal { border-bottom: 2px solid hsl(var(--template-primary)); }
          `}
        </style>
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className={`w-1/3 ${styles.sidebarBg} p-6 space-y-6`}>
            {/* Photo */}
            {template.hasPhoto && (
              <div className="text-center">
                <img 
                  src={data.personalInfo.photoUrl || DEFAULT_AVATAR_URL} 
                  alt="Profile"
                  className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${styles.borderColor}/20 shadow-md`}
                  onError={(e) => {
                    console.log('Image failed to load:', e.currentTarget.src);
                    console.log('Data photoUrl:', data.personalInfo.photoUrl);
                    console.log('DEFAULT_AVATAR_URL:', DEFAULT_AVATAR_URL);
                  }}
                  onLoad={() => console.log('Image loaded successfully:', data.personalInfo.photoUrl || DEFAULT_AVATAR_URL)}
                />
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-sm`}>
                Contact
              </h3>
              <div className="space-y-2">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className={`w-3 h-3 flex-shrink-0 ${styles.primaryColor}`} />
                    <span className="text-xs break-all">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className={`w-3 h-3 flex-shrink-0 ${styles.primaryColor}`} />
                    <span className="text-xs">{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.address && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className={`w-3 h-3 flex-shrink-0 ${styles.primaryColor}`} />
                    <span className="text-xs">{data.personalInfo.address}</span>
                  </div>
                )}
                {data.personalInfo.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className={`w-3 h-3 flex-shrink-0 ${styles.primaryColor}`} />
                    <span className="text-xs break-all">{data.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-sm`}>
                  Skills
                </h3>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2">
                        <div 
                          className={`${styles.skillBar} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${getSkillLevel(skill.level)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-sm`}>
                  Languages
                </h3>
                <div className="space-y-2">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-xs font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-sm`}>
                  Certifications
                </h3>
                <div className="space-y-3">
                  {data.certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="flex items-start gap-2">
                        <Award className={`w-3 h-3 flex-shrink-0 mt-0.5 ${styles.primaryColor}`} />
                        <div>
                          <div className="text-xs font-medium text-foreground">{cert.name}</div>
                          <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(cert.date)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {data.references.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-sm`}>
                  References
                </h3>
                <div className="space-y-3">
                  {data.references.map((ref) => (
                    <div key={ref.id}>
                      <div className="flex items-start gap-2">
                        <Users className={`w-3 h-3 flex-shrink-0 mt-0.5 ${styles.primaryColor}`} />
                        <div>
                          <div className="text-xs font-medium text-foreground">{ref.name}</div>
                          <div className="text-xs text-muted-foreground">{ref.organization}</div>
                          <div className="text-xs text-muted-foreground">{ref.email}</div>
                          <div className="text-xs text-muted-foreground">{ref.phone}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Header */}
            <div className={`${template.id === 'minimal' ? styles.headerStyle + ' pb-4' : 'border-b border-border pb-4'}`}>
              {template.id !== 'minimal' && (
                <div className={`${styles.headerStyle} text-white p-4 rounded-lg mb-4 shadow-md`}>
                  <h1 className="text-2xl font-bold mb-1">
                    {data.personalInfo.fullName || "Your Name"}
                  </h1>
                  <p className="text-lg opacity-90">
                    {data.personalInfo.jobTitle || "Your Job Title"}
                  </p>
                </div>
              )}
              {template.id === 'minimal' && (
                <>
                  <h1 className={`text-2xl font-bold ${styles.primaryColor} mb-1`}>
                    {data.personalInfo.fullName || "Your Name"}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {data.personalInfo.jobTitle || "Your Job Title"}
                  </p>
                </>
              )}
            </div>

            {/* Summary */}
            {data.summary && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-3 text-lg`}>Professional Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {data.workExperience.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-4 text-lg`}>Work Experience</h3>
                <div className="space-y-6">
                  {data.workExperience.map((exp) => (
                    <div key={exp.id} className="relative">
                      {template.id === 'creative' && (
                        <div className={`absolute left-0 top-0 w-1 h-full ${styles.accentColor} rounded-full`}></div>
                      )}
                      <div className={`${template.id === 'creative' ? 'pl-4' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground text-base">{exp.jobTitle}</h4>
                            <p className={`font-medium ${styles.primaryColor}`}>{exp.company}</p>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </div>
                          </div>
                        </div>
                        {exp.responsibilities.length > 0 && (
                          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                            {exp.responsibilities.filter(r => r.trim()).map((resp, index) => (
                              <li key={index} className="text-sm leading-relaxed">{resp}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h3 className={`font-semibold ${styles.primaryColor} mb-4 text-lg`}>Education</h3>
                <div className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative">
                      {template.id === 'creative' && (
                        <div className={`absolute left-0 top-0 w-1 h-full ${styles.accentColor} rounded-full`}></div>
                      )}
                      <div className={`${template.id === 'creative' ? 'pl-4' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground text-base">{edu.degree}</h4>
                            <p className={`font-medium ${styles.primaryColor}`}>{edu.fieldOfStudy}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </div>
                          </div>
                        </div>
                        {edu.grade && (
                          <div className="text-sm text-muted-foreground">
                            Grade: {edu.grade}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // Single Column Layout
    return (
      <div className={`cv-a4 ${isPDF ? 'bg-white' : 'bg-background'} ${isPDF ? '' : 'border border-border rounded-lg shadow-card'} p-6 ${isPreview ? 'text-xs' : 'text-sm'} space-y-6 cv-template`}>
        <style>
          {`
            .cv-template {
              --template-primary: ${getColorValues(template.color).primary};
              --template-secondary: ${getColorValues(template.color).secondary};
              --template-accent: ${getColorValues(template.color).accent};
            }
            .cv-sidebar-bg { background-color: hsl(var(--template-secondary)); }
            .cv-sidebar-creative { background-color: hsl(var(--template-secondary)); }
            .cv-primary-text { color: hsl(var(--template-primary)); }
            .cv-accent-bg { background-color: hsl(var(--template-primary)); }
            .cv-primary-border { border-color: hsl(var(--template-primary)); }
            .cv-skill-bar { background-color: hsl(var(--template-primary)); }
            .cv-skill-bar-creative { background-color: hsl(var(--template-primary)); }
            .cv-header-professional { background: linear-gradient(to right, hsl(var(--template-primary)), hsl(var(--template-accent))); }
            .cv-header-creative { background-color: hsl(var(--template-primary)); }
            .cv-header-executive { background-color: hsl(var(--template-primary)); }
            .cv-header-minimal { border-bottom: 2px solid hsl(var(--template-primary)); }
          `}
        </style>
        {/* Header */}
        <div className={`text-center ${template.id === 'minimal' ? styles.headerStyle + ' pb-6' : 'border-b border-border pb-6'}`}>
          {template.id !== 'minimal' && (
            <div className={`${styles.headerStyle} text-white p-6 rounded-lg mb-6 shadow-md`}>
              {template.hasPhoto && (
                <img 
                  src={data.personalInfo.photoUrl || DEFAULT_AVATAR_URL} 
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/20 mb-4 shadow-lg"
                  onError={(e) => {
                    console.log('Image failed to load (single-column):', e.currentTarget.src);
                    console.log('Data photoUrl:', data.personalInfo.photoUrl);
                    console.log('DEFAULT_AVATAR_URL:', DEFAULT_AVATAR_URL);
                  }}
                  onLoad={() => console.log('Image loaded successfully (single-column):', data.personalInfo.photoUrl || DEFAULT_AVATAR_URL)}
                />
              )}
              <h1 className="text-3xl font-bold mb-2">
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-xl opacity-90 mb-4">
                {data.personalInfo.jobTitle || "Your Job Title"}
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {data.personalInfo.email}
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {data.personalInfo.phone}
                  </div>
                )}
                {data.personalInfo.address && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {data.personalInfo.address}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {template.id === 'minimal' && (
            <>
              {template.hasPhoto && (
                <img 
                  src={data.personalInfo.photoUrl || DEFAULT_AVATAR_URL} 
                  alt="Profile"
                  className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${styles.borderColor}/20 mb-4 shadow-md`}
                  onError={(e) => {
                    console.log('Image failed to load (minimal):', e.currentTarget.src);
                    console.log('Data photoUrl:', data.personalInfo.photoUrl);
                    console.log('DEFAULT_AVATAR_URL:', DEFAULT_AVATAR_URL);
                  }}
                  onLoad={() => console.log('Image loaded successfully (minimal):', data.personalInfo.photoUrl || DEFAULT_AVATAR_URL)}
                />
              )}
              <h1 className={`text-3xl font-bold ${styles.primaryColor} mb-2`}>
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {data.personalInfo.jobTitle || "Your Job Title"}
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {data.personalInfo.email}
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {data.personalInfo.phone}
                  </div>
                )}
                {data.personalInfo.address && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {data.personalInfo.address}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <h3 className={`font-semibold ${styles.primaryColor} mb-3 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div>
            <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="relative">
                  {template.id === 'creative' && (
                    <div className={`absolute left-0 top-0 w-1 h-full ${styles.accentColor} rounded-full`}></div>
                  )}
                  <div className={`${template.id === 'creative' ? 'pl-4' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground text-base">{exp.jobTitle}</h4>
                        <p className={`font-medium ${styles.primaryColor}`}>{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                      </div>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {exp.responsibilities.filter(r => r.trim()).map((resp, index) => (
                          <li key={index} className="text-sm leading-relaxed">{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column grid for remaining sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-medium text-foreground">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
                    <p className={`font-medium ${styles.primaryColor}`}>{edu.institution}</p>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    {edu.grade && (
                      <div className="text-sm text-muted-foreground">Grade: {edu.grade}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
                Skills
              </h3>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2">
                      <div 
                        className={`${styles.skillBar} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${getSkillLevel(skill.level)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
                Certifications
              </h3>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex items-start gap-2">
                      <Award className={`w-4 h-4 flex-shrink-0 mt-0.5 ${styles.primaryColor}`} />
                      <div>
                        <div className="text-sm font-medium text-foreground">{cert.name}</div>
                        <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(cert.date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {data.references.length > 0 && (
            <div>
              <h3 className={`font-semibold ${styles.primaryColor} mb-4 border-b ${styles.borderColor}/30 pb-1 text-lg`}>
                References
              </h3>
              <div className="space-y-4">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <div className="flex items-start gap-2">
                      <Users className={`w-4 h-4 flex-shrink-0 mt-0.5 ${styles.primaryColor}`} />
                      <div>
                        <div className="text-sm font-medium text-foreground">{ref.name}</div>
                        <div className="text-sm text-muted-foreground">{ref.organization}</div>
                        <div className="text-sm text-muted-foreground">{ref.email}</div>
                        <div className="text-sm text-muted-foreground">{ref.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CVPreview;