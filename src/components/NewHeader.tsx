import { Button } from "@/components/ui/button";

const NewHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-semibold text-blue-600 flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              CVBuilder
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">
              Templates
            </a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="/cv-builder" className="text-gray-600 hover:text-gray-900 transition-colors">
              Builder
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-gray-600 hover:text-gray-900">
              Login
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;