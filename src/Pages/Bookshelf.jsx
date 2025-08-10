import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Components/BookCard";
import { BookOpen, Search } from "lucide-react";
import BackgroundWrapper from "../Components/Share/BackgroundWrapper";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("https://bookshelf-server-side.vercel.app/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.book_title.toLowerCase().includes(search.toLowerCase()) ||
      book.book_author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status ? book.reading_status === status : true;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Content */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-secondary rounded-2xl shadow-lg">
                <BookOpen size={32} className="text-white" />
              </div>
              <h1 className="text-5xl font-bold text-secondary">Bookshelf</h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              আবিষ্কার করুন আমাদের বিশাল বইয়ের সংগ্রহ। প্রতিটি বই একটি নতুন
              অভিজ্ঞতার দরজা খুলে দেয়।
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">
                  {books.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-500 text-sm">
                  Books Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">50+</div>
                <div className="text-gray-600 dark:text-gray-500 text-sm">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-500">1000+</div>
                <div className="text-gray-600 dark:text-gray-500 text-sm">
                  Happy Readers
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2 group">
              {/* Gradient blur background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Search input container */}
              <div className="relative  rounded-2xl border border-white/30 dark:border-gray-700/70 focus-within:border-purple-500/70 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none rounded-2xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors duration-300"
                  size={20}
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-64">
              <select
                className="w-full py-4 px-4 border border-white/30 dark:border-gray-700/70 rounded-2xl  focus:outline-none focus:border-purple-500/70 transition-all duration-300"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option
                  value=""
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  All Status
                </option>
                <option
                  value="Read"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  Read
                </option>
                <option
                  value="Reading"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  Reading
                </option>
                <option
                  value="Want-to-Read"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  Want-to-Read
                </option>
              </select>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No books found.
              </div>
            )}
          </div>

          {/* Empty state */}
          {books.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Books Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                এখনো কোনো বই যোগ করা হয়নি।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
