import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Clock, Star, BookOpen } from "lucide-react";
import BookCard from "../Components/BookCard";

const RecentlyViewedPage = () => {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentlyViewedBooks");
      if (stored) {
        const books = JSON.parse(stored);
        setRecentBooks(books);
      }
    } catch (error) {
      console.error("Failed to load recently viewed books:", error);
    }
  }, []);

  return (
    <div>
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-secondary rounded-2xl shadow-lg">
                <Clock size={32} className="text-white" />
              </div>
              <h1 className="text-5xl font-bold text-secondary">
                Recently Viewed
              </h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              Continue exploring books you've recently browsed
            </p>
          </div>

          {/* Books Grid */}
          {recentBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recentBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Recently Viewed Books
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start exploring books to see them here
              </p>
              <Link
                to="/Bookshelf"
                className="inline-block px-6 py-3 text-white bg-primary border border-primary rounded-xl hover:bg-transparent hover:text-primary transition-colors"
              >
                Browse Books
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedPage;
