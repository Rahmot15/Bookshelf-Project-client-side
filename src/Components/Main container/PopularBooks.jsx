import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard";
import { BookOpen } from "lucide-react";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  // Top 9 books by upvote
  const popularBooks = books.sort((a, b) => b.upvote - a.upvote).slice(0, 9);

  return (
    <div className="w-10/12 mx-auto my-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center md:gap-3 gap-1 mb-6">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="md:text-5xl text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Popular Books
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
