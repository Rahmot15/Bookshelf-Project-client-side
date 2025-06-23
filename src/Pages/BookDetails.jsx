import React, { useContext,  useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  BookOpen,
  Tag,
  Eye,
  Star,
  Send,
  ThumbsUp,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLoaderData } from "react-router";
import axios from "axios";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const [upvotes, setUpvotes] = useState(Number(book.upvote || 0));
  const [reviews, setReviews] = useState([]);

  const isOwnBook = user?.email === book?.email;

  const handleBack = () => {
    window.history.back()
  }

  const handleUpvote = async () => {
    if (user && !isOwnBook) {
      try {
        setUpvotes((prev) => prev + 1); // UI updates instantly
        await axios.patch(`http://localhost:5000/books/${book._id}/upvote`);
      } catch (error) {
        console.error("Upvote failed", error);
      }
    }
  };

  

  const statusColors = {
    Read: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Reading: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Want-to-Read": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button className=" text-gray-300 hover:text-white transition-colors duration-300">
              <div onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Bookshelf</span>
              </div>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                  <img
                    src={book.cover_photo}
                    alt={book.book_title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <button
                    onClick={handleUpvote}
                    disabled={!user || isOwnBook}
                    className="w-full mt-6 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ThumbsUp size={20} />
                    <span>{upvotes} Upvotes</span>
                  </button>
                  {isOwnBook && (
                    <p className="text-center text-gray-400 text-sm mt-2">
                      You cannot upvote your own book
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 h-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {book.book_title}
                  </h1>
                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border backdrop-blur-sm ${
                      statusColors[book.reading_status]
                    }`}
                  >
                    {book.reading_status}
                  </div>
                </div>

                <p className="text-2xl text-gray-300 mb-6 font-medium">
                  {book.book_author}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-black/20 rounded-2xl p-4">
                    <BookOpen className="text-purple-400" size={24} />
                    <div>
                      <p className="text-gray-400 text-sm">Pages</p>
                      <p className="text-white font-semibold">
                        {book.total_page}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/20 rounded-2xl p-4">
                    <Tag className="text-pink-400" size={24} />
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-white font-semibold">
                        {book.book_category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/20 rounded-2xl p-4">
                    <Eye className="text-cyan-400" size={24} />
                    <div>
                      <p className="text-gray-400 text-sm">Reviews</p>
                      <p className="text-white font-semibold">
                        {reviews.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {book.book_overview}
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Added by
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {book?.name || "Anonymous"}
                      </p>
                      <p className="text-gray-400 flex items-center gap-1">
                        <Mail size={16} />
                        {book?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
