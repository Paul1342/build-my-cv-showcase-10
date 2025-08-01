const NewFeatures = () => {
  const features = [
    {
      title: "Lightning Fast",
      description: "Build your resume in under 10 minutes with our streamlined process and smart suggestions."
    },
    {
      title: "Export Anywhere", 
      description: "Download as PDF, share via link, or integrate with job boards. Your resume, your way."
    },
    {
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates that pass ATS scans and impress recruiters."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why choose our resume builder?
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Everything you need to create a standout resume that gets you noticed by employers.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFeatures;