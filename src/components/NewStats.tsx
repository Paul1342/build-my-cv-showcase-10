const NewStats = () => {
  const stats = [
    { value: "50K+", label: "Resumes Created" },
    { value: "95%", label: "Success Rate" },
    { value: "< 10min", label: "Average Build Time" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-12 text-lg">
            Trusted by job seekers worldwide
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <p className="text-gray-500 mb-8">As featured on:</p>
            <div className="flex justify-center items-center space-x-12 text-gray-400">
              <span className="text-xl font-semibold">TechCrunch</span>
              <span className="text-xl font-semibold">ProductHunt</span>
              <span className="text-xl font-semibold">Forbes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewStats;