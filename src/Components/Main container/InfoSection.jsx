import { Clock, Headphones, MapPin } from "lucide-react";
import React from "react";

const InfoSection = () => {
  return (
    <section className="bg-base-100 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Card */}
          {[
            {
              icon: <Clock className="w-10 h-10 text-primary" />,
              title: "Shipping Hours",
              description: ["Mon-Fri: 9 AM – 6 PM", "Saturday: 9 AM – 4 PM"],
            },
            {
              icon: <MapPin className="w-10 h-10 text-secondary" />,
              title: "Locations",
              description: ["176 West street name, New York,", "NY 10014 USA"],
            },
            {
              icon: <Headphones className="w-10 h-10 text-accent" />,
              title: "Support",
              description: [
                "We offer a 24/7 customer hotline",
                "so we can help you online",
              ],
            },
          ].map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-base-200 rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                {icon}
              </div>

              <h3 className="text-xl font-semibold text-base-content mb-3">
                {title}
              </h3>

              <div className="space-y-1 text-base-content/80">
                {description.map((line, i) => (
                  <p key={i} className="font-medium">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
