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
  const pdfRef = useRef<HTMLDivElement>(null);            // on-screen preview ref (scaled)
  const exportRef = useRef<HTMLDivElement>(null);         // off-screen full-size A4 export ref
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Calculate responsive scale for on-screen preview
  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current || previewMode) return;
      const container = previewContainerRef.current;
      const containerWidth = container.clientWidth;
      const cvWidth = 794; // Fixed CV width for on-screen preview
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

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  const handleDownloadPDF = async () => {
    if (!exportRef.current || !selectedTemplate) return;

    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your CV.",
      });

      const element = exportRef.current;
      const opt = {
        margin: 0,
        filename: "my-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3.78, // ~300 DPI
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: [210, 297], orientation: "portrait" },
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
                  className="group overflow-hidden shadow-card hover:shadow-elegant transition-a
