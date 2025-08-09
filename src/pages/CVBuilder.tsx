import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Eye, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import CVEditor from "@/components/CVEditor";
import CVPreview from "@/components/CVPreview";
import { CVData, CVTemplate } from "@/types/cv";
import { getSampleDataForTemplate } from "@/data/sampleData";
import { placeholderData } from "@/data/placeholderData";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

const templates: CVTemplate[] = [
  { id: "professional", name: "Professional Modern", description: "", features: [], hasPhoto: true, columns: 2, color: "blue" },
  { id: "creative",     name: "Creative Portfolio",   description: "", features: [], hasPhoto: true, columns: 1, color: "purple" },
  { id: "executive",    name: "Executive Elite",      description: "", features: [], hasPhoto: true, columns: 2, color: "green" },
  { id: "minimal",      name: "Minimalist Clean",     description: "", features: [], hasPhoto: false, columns: 1, color: "gray" }
];

const initialCVData: CVData = {
  personalInfo: { fullName: "", jobTitle: "", email: "", phone: "", address: "", website: "", photoUrl: "" },
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  references: []
};

const colorOptions = [
  { value: "slate",   label: "Slate",   color: "hsl(215 25% 27%)" },
  { value: "rose",    label: "Rose",    color: "hsl(11 70% 84%)" },
  { value: "emerald", label: "Emerald", color: "hsl(164 44% 80%)" },
  { value: "amber",   label: "Gray",    color: "hsl(0 0% 49%)" },
  { value: "blue",    label: "Blue",    color: "hsl(217 91% 60%)" },
  { value: "orange",  label: "Orange",  color: "hsl(20 90% 48%)" }
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
      const cvWidth = 794; // on-screen preview width
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
    const template = templates.find(t => t.id === templateId);
    if (template) setTemplateColor(template.color);
  };

  const handleDataChange = (newData: CVData) => setCvData(newData);

  // Export from hidden full-size A4 node
  const handleDownloadPDF = async () => {
    if (!exportRef.current || !selectedTemplate) return;

    try {
      toast({ title: "Generating PDF...", description: "Please wait while we create your CV." });

      if ("fonts" in document) {
        try { await (document as any).fonts.ready; } catch {}
      }
      const imgs = Array.from(exportRef.current.querySelectorAll("img"));
      await Promise.all(
        imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = () => res(null); }))
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
      toast({ title: "PDF Downloaded!", description: "Your CV has been successfully downloaded." });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({ title: "Download Failed", description: "There was an error generating your PDF. Please try again.", variant: "destructive" });
    }
  };

  // ===========================
  // Template chooser (thumbnails are the buttons)
  // ===========================
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/"><Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4 mr-2" />Back to Home</Button></Link>
            <h1 className="text-3xl font-bold text-foreground">Choose Your Template</h1>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => {
              const sampleData = getSampleDataForTemplate(template.id);

              // Thumbnail sizing
              const A4_W = 794;
              const A4_H = 1123;
              const THUMB_W = 190; // tweak 160–220 if you want bigger/smaller
              const scale    = THUMB_W / A4_W;
              const THUMB_H  = Math.round(A4_H * scale);

              return (
                <div
                  key={template.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleTemplateSelect(template.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTemplateSelect(template.id)}
                  className="group cursor-pointer rounded-xl border border-border bg-card/60 hover:bg-card transition-smooth shadow-card hover:shadow-elegant outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <div className="p-5 flex items-center justify-center">
                    <div
                      className="rounded-md shadow-card bg-white"
                      style={{
                        width: THUMB_W,
                        height: THUMB_H,
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      <div
                        style={{
                          width: A4_W,
                          height: A4_H,
                          transform: `scale(${scale})`,
                          transformOrigin: "top left",
                          position: "absolute",
                          top: 0,
                          left: 0
                        }}
                      >
                        <CVPreview data={sampleData} template={template} isPreview />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ===========================
  // Builder / Preview / Export
  // ===========================
  const currentTemplate = templates.find(t => t.id === selectedTemplate)!;

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
                <h1 className="text-xl font-semibold text-foreground">{currentTemplate.name}</h1>
                <p className="text-sm text-muted-foreground">CV Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
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
          <div className="flex justify-center">
            <div ref={pdfRef} className="cv-page">
              <CVPreview data={cvData} template={{ ...currentTemplate, color: templateColor }} isPDF />
            </div>
          </div>
        ) : (
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
              <div ref={previewContainerRef} className="flex justify-center" style={{ overflow: "hidden" }}>
                <div
                  ref={!previewMode ? pdfRef : undefined}
                  style={{
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top center",
                    transition: "transform 0.2s ease-in-out"
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
        <div aria-hidden="true" style={{ position: "fixed", top: 0, left: "-10000px", zIndex: -1 }}>
          <div ref={exportRef} className="cv-page">
            <CVPreview data={cvData} template={{ ...currentTemplate, color: templateColor }} isPDF />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
