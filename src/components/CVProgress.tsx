import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { CVData } from "@/types/cv";

interface CVProgressProps {
  data: CVData;
}

const CVProgress = ({ data }: CVProgressProps) => {
  const calculateCompleteness = () => {
    let completedSections = 0;
    let totalSections = 5;

    // Personal Info (required fields: fullName, email, phone)
    const personalComplete = data.personalInfo.fullName && 
                           data.personalInfo.email && 
                           data.personalInfo.phone;
    
    // Summary
    const summaryComplete = data.summary && data.summary.length > 20;
    
    // Work Experience
    const workComplete = data.workExperience.length > 0 && 
                         data.workExperience.some(exp => 
                           exp.jobTitle && exp.company && exp.startDate
                         );
    
    // Education
    const educationComplete = data.education.length > 0 && 
                             data.education.some(edu => 
                               edu.degree && edu.institution
                             );
    
    // Skills
    const skillsComplete = data.skills.length > 0 && 
                          data.skills.some(skill => skill.name);

    const sections = [
      { name: "Personal Information", complete: personalComplete },
      { name: "Summary", complete: summaryComplete },
      { name: "Work Experience", complete: workComplete },
      { name: "Education", complete: educationComplete },
      { name: "Skills", complete: skillsComplete }
    ];

    completedSections = sections.filter(section => section.complete).length;
    const percentage = Math.round((completedSections / totalSections) * 100);

    return { percentage, sections };
  };

  const { percentage, sections } = calculateCompleteness();

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Resume Completeness</h3>
          <div className="flex items-center gap-3">
            <Progress 
              value={percentage} 
              className="flex-1 h-2"
            />
            <span className="text-sm font-medium min-w-[3ch]">
              {percentage}%
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {sections.map((section, index) => (
            <div key={section.name} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border text-xs font-medium">
                {section.complete ? (
                  <CheckCircle className="w-3 h-3 text-primary" />
                ) : (
                  <span className="text-muted-foreground">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs ${section.complete ? 'text-foreground' : 'text-muted-foreground'}`}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CVProgress;