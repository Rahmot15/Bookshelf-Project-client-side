import React from "react";
import { Star, User, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <div
      className="group relative bg-base-200 text-base-content rounded-2xl shadow-lg hover:shadow-2xl border border-base-200 transition-all duration-500 overflow-hidden backdrop-blur-sm"
    >
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0
        bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      {/* Book Cover */}
      <div className="relative p-6 pb-4">
        <div className="relative overflow-hidden rounded-xl bg-base-200">
          <img
            src={book.cover_photo}
            alt={book.book_title}
            className="w-full h-50 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0
            bg-gradient-to-t from-black/20 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="badge text-xs font-semibold
              bg-base-100 text-base-content
              border border-base-300"
            >
              {book.book_category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        {/* Title */}
        <h3
          className="text-lg font-bold
          text-base-content
          mb-2 line-clamp-1
          group-hover:text-amber-600 transition-colors duration-300"
        >
          {book.book_title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4 text-base-content/70">
          <User size={16} />
          <span className="text-sm font-medium line-clamp-1">
            {book.book_author}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-amber-500 fill-current" />
              <span className="text-lg font-bold text-amber-600">
                {book.upvote}
              </span>
            </div>
            <span className="text-xs text-base-content/60">rating</span>
          </div>

          {/* Book icon */}
          <div className="p-2 bg-base-200 rounded-lg group-hover:bg-amber-100/40 transition-colors duration-300">
            <BookOpen
              size={16}
              className="text-base-content/70 group-hover:text-amber-600"
            />
          </div>
        </div>

        {/* Details Button */}
        <Link to={`/bookDetails/${book._id}`}>
          <button
            className="w-full bg-primary
            hover:from-amber-600 hover:to-amber-700
            text-white font-semibold py-3 px-4 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-2">
              <span>View Details</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </div>
          </button>
        </Link>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl
        bg-gradient-to-r from-amber-500/20 via-transparent to-purple-500/20
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
      ></div>
    </div>
  );
};

export default BookCard;
