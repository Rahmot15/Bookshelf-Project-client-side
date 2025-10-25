import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Clock, Star, ArrowRight } from "lucide-react";

const RecentlyViewed = () => {
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

  if (recentBooks.length === 0) {
    return null;
  }

  return (
    <div className="w-11/12 mx-auto my-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center md:gap-3 gap-1 mb-6">
          <div className="p-3 bg-secondary rounded-2xl shadow-lg">
            <Clock size={32} className="text-white" />
          </div>
          <h1 className="md:text-5xl text-3xl font-bold text-secondary">
            Recently Viewed
          </h1>
        </div>
      </div>

      {/* Horizontal Scrollable List */}
      <div className="relative">
        <div className="flex justify-center gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory">
            {recentBooks.map((book) => (
              <Link
                key={book._id}
                to={`/bookDetails/${book._id}`}
                className="flex-shrink-0 w-48 group snap-start"
              >
                <div className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Book Cover */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={book.cover_photo}
                      alt={book.book_title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="badge badge-sm bg-base-100/90 text-base-content border-0">
                        {book.book_category}
                      </span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-base-content line-clamp-1 mb-1">
                      {book.book_title}
                    </h3>
                    <p className="text-sm text-base-content/70 line-clamp-1 mb-2">
                      {book.book_author}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-500 fill-current" />
                      <span className="text-sm font-semibold text-amber-600">
                        {book.upvote}
                      </span>
                      <span className="text-xs text-base-content/60 ml-1">
                        upvotes
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Custom Scrollbar Hide CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecentlyViewed;
