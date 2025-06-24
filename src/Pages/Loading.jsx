import React from "react";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
export const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-40">
      <div className="relative ">
        {/* Book Icon */}
         <motion.div
          animate={{ 
            rotateY: [0, -25, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BookOpen size={55} className=" text-white mt-1 ml-1" />
        </motion.div>
        
        {/* Spinning Circle */}
        <motion.div
          className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 rounded-full -m-4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
