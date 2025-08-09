import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Download, Eye, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import CVEditor from "@/components/CVEditor";
import CVPreview from "@/components/CVPreview";
import { CVData, CVTemplate } from "@/types/cv";
import { getSampleDataForTemplate } from "@/data/sampleData";
import { placeholderData } from "@/data/placeholderData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

const templates: CVTemplate[] = [
  {
    id: "professional",
    name: "Professional Modern",
    description: "Clean and modern design perfect for corporate roles",
    features: ["Two Column", "Photo Optional", "ATS Friendly"],
    hasPhoto: true,
    columns: 2,
    color: "blue"
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Stand out with this creative and colorful template",
    features: ["Single Column", "Photo Required", "Creative Design"],
    hasPhoto: true,
    columns: 1,
    color: "purple"
  },
  {
    id: "executive",
    name: "Executive Elite",
    description: "Sophisticated design for senior-level positions",
    features: ["Two Column", "Photo Optional", "Elegant"],
    hasPhoto: true,
    columns: 2,
    color: "green"
  },
  {
    id: "minimal",
    name: "Minimalist Clean",
    description: "Simple and clean design that focuses on content",
    features: ["Single Column", "No Photo", "Minimal"],
    hasPhoto: false,
    columns: 1,
    color: "gray"
  }
];

const initialCVData: CVData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    photoUrl: ""
  },
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  references: []
};

const colorOptions = [
  { value: "slate", label: "Slate", color: "hsl(215 25% 27%)" },
  { value: "rose", label: "Rose", color: "hsl(11 70% 84%)" },
  { value: "emerald", label: "Emerald", color: "hsl(164 44% 80%)" },
  { value: "amber", label: "Gray", color: "hsl(0 0% 49%)" },
  { value: "blue", label: "Blue", color: "hsl(217 91% 60%)" },
  { value: "orange", label: "Orange", color: "hsl(20 90% 48%)" }
];

const CVBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [previewMode, setPreviewMode] = useState(false);
  const [templateColor, setTemplateColor] = useState<string>("blue");
  const [previewScale, setPreviewScale] = useState(1);
  const [editedFields, setEditedFields] = useState<Record<string, boolean>>({});

  // On-screen preview refs
  const pdfRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Off-screen A4 export ref (used by html2pdf)
  const exportRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  // Scale on-screen preview to fit its pane
  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current || previewMode) return;
      const container = previewContainerRef.current;
      const containerWidth = container.clientWidth;
      const cvWidth = 794; // fixed on-screen preview width
      const scale = Math.min(containerWidth / cvWidth, 1);
      setPreviewScale(scale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [selectedTemplate, previewMode]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCvData(placeholderData);
    setEditedFields({});
    const template = templates.find((t) => t.id === templateId);
    if (template) setTemplateColor(template.color);
  };

  const handleDataChange = (newData: CVData) => setCvData(newData);

  // Always capture the hidden full-size A4 node via exportRef
  const handleDownloadPDF = async () => {
    if (!exportRef.current || !selectedTemplate) return;

    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your CV.",
      });

      // Make sure fonts & images are ready to avoid reflow (which looks like scaling)
      if ("fonts" in document) {
        try { await (document as any).fonts.ready; } catch {}
      }
      const imgs = Array.from(exportRef.current.querySelectorAll("img"));
      await Promise.all(
        imgs.map(img =>
          img.complete
            ? Promise.resolve()
            : new Promise(res => { img.onload = img.onerror = () => res(null); })
        )
      );

      const element = exportRef.current;
      const opt = {
        margin: 0,
        filename: "my-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 3.78, useCORS: true }, // ~300 DPI
        jsPDF: { unit: "mm", format: [210, 297], orientation: "portrait" }
      };

      await html2pdf().set(opt).from(element).save();

      toast({
        title: "PDF Downloaded!",
        description: "Your CV has been successfully downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Choose Your Template</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {templates.map((template) => {
              const sampleData = getSampleDataForTemplate(template.id);
              return (
                <Card
                  key={template.id}
                  className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Preview card */}
                  <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 p-3 relative overflow-hidden">
                    <div className="cv-a4-container h-full">
                      <div className="cv-scale-to-fit" style={{ transform: "scale(0.25)" }}>
                        <CVPreview data={sampleData} template={template} isPreview />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      Use This Template
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentTemplate = templates.find((t) => t.id === selectedTemplate)!;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {currentTemplate.name}
                </h1>
                <p className="text-sm text-muted-foreground">CV Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Color selection */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Color</span>
                </div>
                <div className="flex gap-1.5 p-1 bg-muted/50 rounded-lg">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTemplateColor(color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-110 relative ${
                        templateColor === color.value
                          ? "border-background shadow-lg scale-110 ring-2 ring-primary/20"
                          : "border-white/80 shadow-sm hover:border-white"
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.label}
                    >
                      {templateColor === color.value && (
                        <div className="absolute inset-0 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>

              <Button variant="default" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {previewMode ? (
          // On-screen full-page preview (OK to keep)
          <div className="flex justify-center">
            <div ref={pdfRef} className="cv-page">
              <CVPreview
                data={cvData}
                template={{ ...currentTemplate, color: templateColor }}
                isPDF={true}
              />
            </div>
          </div>
        ) : (
          // Editor + scaled on-screen preview
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CVEditor
                data={cvData}
                onChange={handleDataChange}
                template={currentTemplate}
                editedFields={editedFields}
                onFieldEdit={setEditedFields}
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <div
                ref={previewContainerRef}
                className="flex justify-center"
                style={{ overflow: "hidden" }}
              >
                <div
                  ref={!previewMode ? pdfRef : undefined}
                  style={{
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top center",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <CVPreview
                    data={cvData}
                    template={{ ...currentTemplate, color: templateColor }}
                    isPreview
                    isPDF={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden A4 export node (off-screen but fully rendered at A4) */}
        <div
          aria-hidden="true"
          style={{ position: "fixed", top: 0, left: "-10000px", zIndex: -1 }}
        >
          <div ref={exportRef} className="cv-page">
            <CVPreview
              data={cvData}
              template={{ ...currentTemplate, color: templateColor }}
              isPDF={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
