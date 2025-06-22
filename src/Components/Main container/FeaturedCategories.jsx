import { BookOpen, Star } from "lucide-react";
import React from "react";

const categories = [
  {
    name: "Fiction",
    description: "Imaginative stories that spark emotion and curiosity.",
    color: "from-pink-500 to-purple-500",
    icon: "📖",
  },
  {
    name: "Non-Fiction",
    description: "Dive into real stories, facts, and knowledge.",
    color: "from-blue-500 to-cyan-500",
    icon: "📚",
  },
  {
    name: "Fantasy",
    description: "Discover magical realms and epic adventures.",
    color: "from-green-500 to-teal-500",
    icon: "🧙‍♂️",
  },
];

const FeaturedCategories = () => {
  return (
    <div className="w-11/12 mx-auto  md:my-50 my-16">
      <h2 className="md:text-5xl text-xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-8">
        <Star size={40} className=" text-amber-400" />
        Featured Categories
        <BookOpen size={40} className="mt-3 text-purple-400" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`rounded-2xl shadow-xl p-8 bg-gradient-to-br ${cat.color} text-white flex flex-col items-center hover:scale-105 transition-transform duration-300`}
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
            <p className="text-center opacity-90">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
