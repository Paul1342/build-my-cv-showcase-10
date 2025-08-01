import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload } from "lucide-react";
import { CVData, CVTemplate, WorkExperience, Education, Skill, Language, Certification, Reference } from "@/types/cv";
import CVProgress from "./CVProgress";

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  template: CVTemplate;
  editedFields: Record<string, boolean>;
  onFieldEdit: (fields: Record<string, boolean>) => void;
}

const CVEditor = ({ data, onChange, template, editedFields, onFieldEdit }: CVEditorProps) => {
  const [activeSection, setActiveSection] = useState("personal");

  const handleFieldFocus = (fieldKey: string) => {
    if (!editedFields[fieldKey]) {
      onFieldEdit({ ...editedFields, [fieldKey]: true });
      
      // Clear the field value on first focus
      if (fieldKey.startsWith("personalInfo.")) {
        const field = fieldKey.replace("personalInfo.", "");
        updatePersonalInfo(field, "");
      } else if (fieldKey === "summary") {
        updateSummary("");
      } else if (fieldKey.startsWith("workExperience.")) {
        const [, id, field] = fieldKey.split(".");
        if (field === "responsibilities") {
          updateWorkExperience(id, field, [""]);
        } else {
          updateWorkExperience(id, field, "");
        }
      } else if (fieldKey.startsWith("education.")) {
        const [, id, field] = fieldKey.split(".");
        updateEducation(id, field, "");
      } else if (fieldKey.startsWith("skills.")) {
        const [, id, field] = fieldKey.split(".");
        updateSkill(id, field, "");
      } else if (fieldKey.startsWith("languages.")) {
        const [, id, field] = fieldKey.split(".");
        updateLanguage(id, field, "");
      } else if (fieldKey.startsWith("certifications.")) {
        const [, id, field] = fieldKey.split(".");
        updateCertification(id, field, "");
      } else if (fieldKey.startsWith("references.")) {
        const [, id, field] = fieldKey.split(".");
        updateReference(id, field as keyof Reference, "");
      }
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const updateSummary = (value: string) => {
    onChange({
      ...data,
      summary: value
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""]
    };
    onChange({
      ...data,
      workExperience: [...data.workExperience, newExp]
    });
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const deleteWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      fieldOfStudy: "",
      institution: "",
      startDate: "",
      endDate: ""
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const deleteEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate"
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const deleteSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(skill => skill.id !== id)
    });
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Conversational"
    };
    onChange({
      ...data,
      languages: [...data.languages, newLanguage]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const deleteLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: ""
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCertification]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const deleteCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  // Reference functions
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      organization: ""
    };
    onChange({
      ...data,
      references: [...data.references, newReference]
    });
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    const updatedReferences = data.references.map(ref =>
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    onChange({
      ...data,
      references: updatedReferences
    });
  };

  const deleteReference = (id: string) => {
    const updatedReferences = data.references.filter(ref => ref.id !== id);
    onChange({
      ...data,
      references: updatedReferences
    });
  };

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "extra", label: "Extra" },
  ];

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <CVProgress data={data} />
      
      {/* Section Navigation */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Personal Information */}
      {activeSection === "personal" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={editedFields["personalInfo.fullName"] ? data.personalInfo.fullName : ""}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                  onFocus={() => handleFieldFocus("personalInfo.fullName")}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={editedFields["personalInfo.jobTitle"] ? data.personalInfo.jobTitle : ""}
                  onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                  onFocus={() => handleFieldFocus("personalInfo.jobTitle")}
                  placeholder="Senior Sales Manager"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedFields["personalInfo.email"] ? data.personalInfo.email : ""}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  onFocus={() => handleFieldFocus("personalInfo.email")}
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedFields["personalInfo.phone"] ? data.personalInfo.phone : ""}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  onFocus={() => handleFieldFocus("personalInfo.phone")}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editedFields["personalInfo.address"] ? data.personalInfo.address : ""}
                onChange={(e) => updatePersonalInfo("address", e.target.value)}
                onFocus={() => handleFieldFocus("personalInfo.address")}
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>

            <div>
              <Label htmlFor="website">Website/LinkedIn</Label>
              <Input
                id="website"
                value={editedFields["personalInfo.website"] ? data.personalInfo.website : ""}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                onFocus={() => handleFieldFocus("personalInfo.website")}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            {template.hasPhoto && (
              <div>
                <Label htmlFor="photo">Upload Profile Photo</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            updatePersonalInfo("photoUrl", result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      type="button"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    {data.personalInfo.photoUrl && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => updatePersonalInfo("photoUrl", "")}
                        type="button"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  {data.personalInfo.photoUrl && (
                    <div className="mt-2">
                      <img 
                        src={data.personalInfo.photoUrl} 
                        alt="Profile preview" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Summary */}
      {activeSection === "summary" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
          <Textarea
            value={editedFields["summary"] ? data.summary : ""}
            onChange={(e) => updateSummary(e.target.value)}
            onFocus={() => handleFieldFocus("summary")}
            placeholder="Write a brief summary of your professional background, skills, and career objectives..."
            rows={6}
          />
        </Card>
      )}

      {/* Work Experience */}
      {activeSection === "experience" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
            <Button onClick={addWorkExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
          
          <div className="space-y-6">
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Experience {index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteWorkExperience(exp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <Label>Job Title</Label>
                       <Input
                         value={editedFields[`workExperience.${exp.id}.jobTitle`] ? exp.jobTitle : ""}
                         onChange={(e) => updateWorkExperience(exp.id, "jobTitle", e.target.value)}
                         onFocus={() => handleFieldFocus(`workExperience.${exp.id}.jobTitle`)}
                         placeholder="Software Engineer"
                       />
                     </div>
                     <div>
                       <Label>Company</Label>
                       <Input
                         value={editedFields[`workExperience.${exp.id}.company`] ? exp.company : ""}
                         onChange={(e) => updateWorkExperience(exp.id, "company", e.target.value)}
                         onFocus={() => handleFieldFocus(`workExperience.${exp.id}.company`)}
                         placeholder="Tech Corp"
                       />
                     </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateWorkExperience(exp.id, "current", e.target.checked)}
                        />
                        <span className="text-sm">Current job</span>
                      </label>
                    </div>
                  </div>
                  
                   <div>
                     <Label>Responsibilities</Label>
                     <Textarea
                       value={editedFields[`workExperience.${exp.id}.responsibilities`] ? exp.responsibilities.join('\n') : ""}
                       onChange={(e) => updateWorkExperience(exp.id, "responsibilities", e.target.value.split('\n'))}
                       onFocus={() => handleFieldFocus(`workExperience.${exp.id}.responsibilities`)}
                       placeholder="• Managed a team of 10 developers&#10;• Increased sales by 25%&#10;• Led product development initiatives"
                       rows={4}
                     />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {activeSection === "education" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Education</h3>
            <Button onClick={addEducation} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
          
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Education {index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEducation(edu.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <Label>Degree</Label>
                       <Input
                         value={editedFields[`education.${edu.id}.degree`] ? edu.degree : ""}
                         onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                         onFocus={() => handleFieldFocus(`education.${edu.id}.degree`)}
                         placeholder="Bachelor of Science"
                       />
                     </div>
                     <div>
                       <Label>Field of Study</Label>
                       <Input
                         value={editedFields[`education.${edu.id}.fieldOfStudy`] ? edu.fieldOfStudy : ""}
                         onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                         onFocus={() => handleFieldFocus(`education.${edu.id}.fieldOfStudy`)}
                         placeholder="Computer Science"
                       />
                     </div>
                  </div>
                  
                   <div>
                     <Label>Institution</Label>
                     <Input
                       value={editedFields[`education.${edu.id}.institution`] ? edu.institution : ""}
                       onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                       onFocus={() => handleFieldFocus(`education.${edu.id}.institution`)}
                       placeholder="University of Technology"
                     />
                   </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Grade</Label>
                    <Input
                       value={editedFields[`education.${edu.id}.grade`] ? edu.grade || "" : ""}
                       onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                       onFocus={() => handleFieldFocus(`education.${edu.id}.grade`)}
                      placeholder="Your average"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Skills */}
      {activeSection === "skills" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Skills</h3>
            <Button onClick={addSkill} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          <div className="grid gap-4">
            {data.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-4">
                 <div className="flex-1">
                   <Input
                     value={editedFields[`skills.${skill.id}.name`] ? skill.name : ""}
                     onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                     onFocus={() => handleFieldFocus(`skills.${skill.id}.name`)}
                     placeholder="JavaScript"
                   />
                 </div>
                <div className="w-40">
                  <Select
                    value={skill.level}
                    onValueChange={(value) => updateSkill(skill.id, "level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Extra Section - Languages & Certifications */}
      {activeSection === "extra" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Additional Information</h3>
          
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">Languages</h4>
                <Button onClick={addLanguage} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Language
                </Button>
              </div>
              
              <div className="space-y-4">
                {data.languages.map((language, index) => (
                  <div key={language.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">Language {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLanguage(language.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                         <div>
                           <Label>Language</Label>
                           <Input
                             value={editedFields[`languages.${language.id}.name`] ? language.name : ""}
                             onChange={(e) => updateLanguage(language.id, "name", e.target.value)}
                             onFocus={() => handleFieldFocus(`languages.${language.id}.name`)}
                             placeholder="English"
                           />
                         </div>
                        <div>
                          <Label>Proficiency</Label>
                          <Select
                            value={language.proficiency}
                            onValueChange={(value) => updateLanguage(language.id, "proficiency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Conversational">Conversational</SelectItem>
                              <SelectItem value="Fluent">Fluent</SelectItem>
                              <SelectItem value="Native">Native</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="certifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">Certifications</h4>
                <Button onClick={addCertification} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div key={cert.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">Certification {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCertification(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                       <div>
                         <Label>Certification Name</Label>
                         <Input
                           value={editedFields[`certifications.${cert.id}.name`] ? cert.name : ""}
                           onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                           onFocus={() => handleFieldFocus(`certifications.${cert.id}.name`)}
                           placeholder="AWS Solutions Architect"
                         />
                       </div>
                       
                       <div>
                         <Label>Issuing Organization</Label>
                         <Input
                           value={editedFields[`certifications.${cert.id}.issuer`] ? cert.issuer : ""}
                           onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                           onFocus={() => handleFieldFocus(`certifications.${cert.id}.issuer`)}
                           placeholder="Amazon Web Services"
                         />
                       </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Issue Date</Label>
                          <Input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Expiry Date (Optional)</Label>
                          <Input
                            type="month"
                            value={cert.expiryDate}
                            onChange={(e) => updateCertification(cert.id, "expiryDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="references" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">References</h4>
                <Button onClick={addReference} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </Button>
              </div>
              
              <div className="space-y-4">
                {data.references.map((reference, index) => (
                  <div key={reference.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">Reference {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteReference(reference.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                       <div>
                         <Label>Full Name</Label>
                         <Input
                           value={editedFields[`references.${reference.id}.name`] ? reference.name : ""}
                           onChange={(e) => updateReference(reference.id, "name", e.target.value)}
                           onFocus={() => handleFieldFocus(`references.${reference.id}.name`)}
                           placeholder="John Smith"
                         />
                       </div>
                       
                       <div>
                         <Label>Organization</Label>
                         <Input
                           value={editedFields[`references.${reference.id}.organization`] ? reference.organization : ""}
                           onChange={(e) => updateReference(reference.id, "organization", e.target.value)}
                           onFocus={() => handleFieldFocus(`references.${reference.id}.organization`)}
                           placeholder="Company Name"
                         />
                       </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={editedFields[`references.${reference.id}.email`] ? reference.email : ""}
                            onChange={(e) => updateReference(reference.id, "email", e.target.value)}
                            onFocus={() => handleFieldFocus(`references.${reference.id}.email`)}
                            placeholder="john.smith@company.com"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            type="tel"
                            value={editedFields[`references.${reference.id}.phone`] ? reference.phone : ""}
                            onChange={(e) => updateReference(reference.id, "phone", e.target.value)}
                            onFocus={() => handleFieldFocus(`references.${reference.id}.phone`)}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default CVEditor;