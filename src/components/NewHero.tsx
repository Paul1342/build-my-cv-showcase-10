import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const NewHero = () => {
  const navigate = useNavigate();
  return <section className="pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          

          {/* Main heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build your resume in{" "}
            <span className="text-blue-600">minutes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes with our intuitive builder. 
            Choose from beautiful templates and land your dream job faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg" onClick={() => navigate('/cv-builder')}>
              Create your resume now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300" onClick={() => navigate('/cv-builder')}>
              Browse Templates
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop&auto=format" alt="Person using MacBook Pro to build resume" className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default NewHero;