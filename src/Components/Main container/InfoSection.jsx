import { Clock, Headphones, MapPin } from "lucide-react";
import React from "react";

const InfoSection = () => {
  return (
    <div className="bg-gray-50 py-16 ">
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Shipping Hours */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Hours
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium">Mon-Fri: 9 AM – 6 PM</p>
              <p className="font-medium">Saturday: 9 AM – 4 PM</p>
            </div>
          </div>

          {/* Locations */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Locations
            </h3>
            <div className="text-gray-600">
              <p>176 West street name, New York,</p>
              <p>NY 10014 USA</p>
            </div>
          </div>

          {/* Support */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                <Headphones className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Support
            </h3>
            <div className="text-gray-600">
              <p>We offer a 24/7 customer hotline</p>
              <p>so we can help you online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
