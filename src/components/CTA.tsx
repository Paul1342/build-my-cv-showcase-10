import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="border-0 bg-white/10 backdrop-blur-lg shadow-glow text-white max-w-4xl mx-auto">
          <div className="p-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of successful job seekers who have created their perfect CV with our platform. 
              Start building yours today - it's free!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90"
              >
                Create Your CV Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              >
                Try For Free
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 justify-center mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Free Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Download Instantly</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;