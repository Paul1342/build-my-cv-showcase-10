import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Content */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Build Your
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Perfect CV
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl">
            Create professional resumes with our beautiful templates. 
            Stand out from the crowd with a CV that showcases your unique skills and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => window.open('/cv-builder', '_self')}
            >
              Start Building Now
            </Button>
            <Button variant="outline-primary" size="lg" className="text-lg px-8 py-4">
              View Templates
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100K+</div>
              <div className="text-sm">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-glow">
            <img 
              src={heroImage} 
              alt="Professional CV templates showcase"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-elegant">
            <div className="text-primary font-semibold text-sm">✨ Live Preview</div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-elegant">
            <div className="text-primary font-semibold text-sm">📄 ATS Friendly</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;