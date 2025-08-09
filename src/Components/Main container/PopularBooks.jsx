import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://bookshelf-server-side.vercel.app/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  const popularBooks = books
    .sort((a, b) => b.upvote - a.upvote)
    .slice(0, 10);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    }),
  };

  return (
    <div className="w-11/12 mx-auto my-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center md:gap-3 gap-1 mb-6">
          <div className="p-3 bg-secondary rounded-2xl shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="md:text-5xl text-3xl font-bold text-secondary">
            Popular Books
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {popularBooks.map((book, i) => (
          <motion.div
            key={book._id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
