import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TemplateShowcase = () => {
  const templates = [
    {
      id: 1,
      name: "Professional Modern",
      description: "Clean and modern design perfect for corporate roles",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop",
      features: ["Two Column", "Photo Optional", "ATS Friendly"],
      color: "blue",
      popular: true
    },
    {
      id: 2,
      name: "Creative Portfolio",
      description: "Stand out with this creative and colorful template",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=500&fit=crop",
      features: ["Single Column", "Photo Required", "Creative Design"],
      color: "purple",
      popular: false
    },
    {
      id: 3,
      name: "Executive Elite",
      description: "Sophisticated design for senior-level positions",
      image: "https://images.unsplash.com/photo-1586953218792-dffce5ad6143?w=400&h=500&fit=crop",
      features: ["Two Column", "Photo Optional", "Elegant"],
      color: "green",
      popular: false
    },
    {
      id: 4,
      name: "Minimalist Clean",
      description: "Simple and clean design that focuses on content",
      image: "https://images.unsplash.com/photo-1586953806175-ed7e5a6ee6a2?w=400&h=500&fit=crop",
      features: ["Single Column", "No Photo", "Minimal"],
      color: "gray",
      popular: true
    },
    {
      id: 5,
      name: "Academic Scholar",
      description: "Perfect for academic and research positions",
      image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=500&fit=crop",
      features: ["Two Column", "Photo Optional", "Academic"],
      color: "indigo",
      popular: false
    },
    {
      id: 6,
      name: "Tech Innovator",
      description: "Modern tech-focused design for IT professionals",
      image: "https://images.unsplash.com/photo-1586281391491-5b25d5fec787?w=400&h=500&fit=crop",
      features: ["Single Column", "Photo Required", "Tech Style"],
      color: "orange",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our professionally designed templates cater to every industry and career level. 
            Each template is fully customizable with live preview updates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              {/* Template Preview Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button 
                  variant="hero" 
                  size="sm"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/cv-builder?template=${template.id}`, '_blank');
                  }}
                >
                  Preview
                </Button>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {template.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="professional" 
                  className="w-full"
                  onClick={() => window.open(`/cv-builder?template=${template.id}`, '_self')}
                >
                  Use This Template
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline-primary" size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;