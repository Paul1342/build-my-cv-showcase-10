import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: "🎨",
      title: "Professional Templates",
      description: "Choose from 50+ professionally designed templates that work across all industries"
    },
    {
      icon: "⚡",
      title: "Live Preview",
      description: "See your changes instantly with our real-time preview feature"
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Create and edit your CV on any device - desktop, tablet, or mobile"
    },
    {
      icon: "🤖",
      title: "ATS Friendly",
      description: "All templates are optimized to pass through Applicant Tracking Systems"
    },
    {
      icon: "🔄",
      title: "Easy Customization",
      description: "Customize colors, fonts, layouts, and sections with just a few clicks"
    },
    {
      icon: "💾",
      title: "Multiple Formats",
      description: "Download your CV in PDF, Word, or share a live link"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for Your Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create a standout CV that gets you noticed by employers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;