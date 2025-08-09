import React from "react";

import { Star, User, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 dark:border-gray-700/60 overflow-hidden backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 dark:from-amber-400/10 dark:via-transparent dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300"></div>

      {/* Book Cover Section */}
      <div className="relative p-6 pb-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <img
            src={book.cover_photo}
            alt={book.book_title}
            className="w-full h-50 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="badge text-xs font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full border border-gray-200/50 dark:border-gray-600/50">
              {book.book_category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative px-6 pb-6">
        {/* Title */}
        <h3 className={`text-lg lin font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 hover:${book.book_title}`}>
          {book.book_title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
          <User size={16} className="text-gray-500 dark:text-gray-500" />
          <span className="text-sm font-medium line-clamp-1">{book.book_author}</span>
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-amber-500 fill-current" />
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {book.upvote}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              rating
            </span>
          </div>

          {/* Book icon */}
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors duration-300">
            <BookOpen
              size={16}
              className="text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Details Button */}
        <Link to={`/bookDetails/${book._id}`}>
          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group/btn">
            <div className="flex items-center justify-center gap-2">
              <span>View Details</span>
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform duration-200"
              />
            </div>
          </button>
        </Link>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"></div>

    </div>
  );
};

export default BookCard;
