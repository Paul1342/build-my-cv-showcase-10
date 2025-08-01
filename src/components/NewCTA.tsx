import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const NewCTA = () => {
  const navigate = useNavigate();
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to build your perfect resume?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of job seekers who have successfully landed their dream jobs using our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg" onClick={() => navigate('/cv-builder')}>
              Start Building Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300" onClick={() => navigate('/cv-builder')}>
              View Templates
            </Button>
          </div>
          
          
        </div>
      </div>
    </section>;
};
export default NewCTA;