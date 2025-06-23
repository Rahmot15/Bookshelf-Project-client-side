import React, { useEffect, useState } from "react";
import {
  Book,
  Home,
  ArrowLeft,
  BookOpen,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFound = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingBooks, setFloatingBooks] = useState([]);

  useEffect(() => {
    const books = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingBooks(books);
    setTimeout(() => setIsAnimating(true), 500);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Floating Books */}
      {floatingBooks.map((book) => (
        <motion.div
          key={book.id}
          className="absolute opacity-10"
          initial={{ y: 0 }}
          animate={{
            y: [0, -15, -5, -20, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: book.delay,
            ease: "easeInOut",
          }}
          style={{
            left: `${book.x}%`,
            top: `${book.y}%`,
          }}
        >
          <BookOpen className="w-8 h-8 text-amber-600" />
        </motion.div>
      ))}

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-1/4 right-20 w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-red-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-amber-500 rounded-full opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        {/* Book Stack Animation */}
        <motion.div
          initial={{ scale: 0.75, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="relative">
              <div className="w-24 h-32 bg-gradient-to-b from-red-500 to-red-600 rounded-r-lg shadow-lg transform -rotate-12 absolute"></div>
              <div className="w-24 h-32 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-lg shadow-lg transform -rotate-6 absolute left-2"></div>
              <div className="w-24 h-32 bg-gradient-to-b from-green-500 to-green-600 rounded-r-lg shadow-lg absolute left-4"></div>
              <div className="w-24 h-32 bg-gradient-to-b from-purple-500 to-purple-600 rounded-r-lg shadow-lg transform rotate-3 absolute left-6"></div>
            </div>

            {/* Floating Bookmark */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            >
              <Bookmark className="w-6 h-6 text-amber-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* 404 Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-amber-600 mb-4">
            4
            <span className="inline-block">
              <Book className="w-16 h-20 md:w-20 md:h-24 text-orange-500 mx-2 animate-pulse" />
            </span>
            4
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Chapter Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! It seems like the page you're looking for has been moved to
            another chapter. Let's help you find your way back to the story.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link
            to={"/"}
            className="flex items-center justify-center px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Back to Home
          </Link>
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full border-2 border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Go Back
          </button>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="text-gray-500 italic max-w-lg mx-auto mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          "A reader lives a thousand lives before he dies. The man who never
          reads lives only one."
          <cite className="block mt-2 text-sm font-semibold text-amber-600">
            - George R.R. Martin
          </cite>
        </motion.blockquote>
      </div>
    </div>
  );
};

export default NotFound;
