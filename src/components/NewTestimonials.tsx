const NewTestimonials = () => {
  const testimonials = [
    {
      quote: "I landed my dream job at Google within 2 weeks of using this resume builder. The templates are incredibly professional!",
      author: "Sarah Johnson",
      position: "Software Engineer at Google",
      initial: "S"
    },
    {
      quote: "The ATS-friendly templates helped me get past the initial screening. Simple, effective, and beautifully designed.",
      author: "Michael Chen", 
      position: "Marketing Manager at Spotify",
      initial: "M"
    },
    {
      quote: "Building my resume took just 8 minutes. The smart suggestions feature saved me so much time and improved my content.",
      author: "Emily Rodriguez",
      position: "Data Scientist at Netflix", 
      initial: "E"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What our users say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful job seekers who found their dream jobs
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTestimonials;