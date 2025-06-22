import { Quote } from "lucide-react";
import React from "react";

const TestimonialSection = () => {
  return (
    <div className=" relative  bg-gradient-to-br from-cyan-400 via-blue-400 to-blue-500 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-pink-400 rounded-full opacity-80"></div>
      <div className="absolute top-1/4 left-8 w-3 h-3 bg-yellow-300 rounded-full opacity-70"></div>
      <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-50"></div>

      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white transform rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white transform -rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white transform rotate-12"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center ">
        {/* Quote Icon */}
        <div className="mb-8">
          <Quote className="w-16 h-16 text-white opacity-80" />
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto text-center mb-6">
          <blockquote className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
            "Since we started using this book platform, discovering, organizing,
            and sharing our favorite reads has never been easier. The intuitive
            design and powerful features have truly transformed the way our
            community connects over books. Highly recommended for every book
            lover!"
          </blockquote>

          <div className="text-white opacity-90">
            <p className="text-lg font-medium mb-2">Rahmatullah</p>
            <p className="text-sm opacity-80">Chief Executive Officer</p>
          </div>
        </div>

        {/* Profile Images */}
        <div className="avatar-group -space-x-6 mb-8">
          <div className="avatar">
            <div className="w-12">
              <img src="https://i.ibb.co/cck6cNfg/image.png" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12">
              <img src="https://i.ibb.co/hFzy8bdN/image.png" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12">
              <img src="https://i.ibb.co/PKT1ByB/image.png" />
            </div>
          </div>
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-12">
              <span>+99</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-3 gap-8 text-center text-white">
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-80">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-80">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-80">Awards Won</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
