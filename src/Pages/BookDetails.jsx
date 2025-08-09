import React, { useContext, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  BookOpen,
  Tag,
  Eye,
  ThumbsUp,
  Star,
  Send,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const [upvotes, setUpvotes] = useState(Number(book.upvote || 0));
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(book.reading_status);

  const [newReview, setNewReview] = useState({ rating: 5, review: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const isOwnBook = user?.email === book?.email;

  const handleBack = () => {
    window.history.back();
  };

  console.log("book", typeof book._id);

  const handleSubmitReview = async () => {
    if (!user) return;

    const reviewData = {
      createdAt: new Date().toISOString(),
      review: newReview.review,
      rating: newReview.rating,
      user: {
        name: user.displayName,
        email: user.email,
      },
      bookId: book._id,
    };

    try {
      setIsSubmitting(true);
      await axios.post(
        `https://bookshelf-server-side.vercel.app/books/${book._id}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // Refresh reviews
      const res = await axios.get(
        `https://bookshelf-server-side.vercel.app/books/${book._id}/reviews`
      );
      setReviews(res.data);
      setHasReviewed(true);
      setNewReview({ rating: 5, review: "" });
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire("You have already reviewed this book.");
        setHasReviewed(true);
      } else {
        console.error("Failed to submit review", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async () => {
    if (user && !isOwnBook) {
      try {
        setUpvotes((prev) => prev + 1);
        await axios.patch(
          `https://bookshelf-server-side.vercel.app/books/${book._id}/upvote`
        );
      } catch (error) {
        console.error("Upvote failed", error);
      }
    }
  };

  // Reading status update handler
  const handleStatusUpdate = async (nextStatus) => {
    try {
      setStatus(nextStatus);
      await axios.patch(
        `https://bookshelf-server-side.vercel.app/books/${book._id}/status`,
        {
          reading_status: nextStatus,
        }
      );
    } catch (error) {
      setStatus(book.reading_status);
      console.log(error);
    }
  };

  const statusColors = {
    Read: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Reading: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Want-to-Read": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  return (
    <div>
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
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border backdrop-blur-sm ${statusColors[status]}`}
                  >
                    {status}
                  </div>
                </div>

                {/* Reading status update button (only for owner) */}
                {isOwnBook && status === "Want-to-Read" && (
                  <button
                    onClick={() => handleStatusUpdate("Reading")}
                    className="btn btn-info mb-4"
                  >
                    Start Reading
                  </button>
                )}
                {isOwnBook && status === "Reading" && (
                  <button
                    onClick={() => handleStatusUpdate("Read")}
                    className="btn btn-success mb-4"
                  >
                    Mark as Read
                  </button>
                )}

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

          {/* Reviews Section */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Reviews</h2>

            {user && !hasReviewed && (
              <div className="mb-8 bg-black/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Write a Review
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-300 font-medium">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview((prev) => ({ ...prev, rating: star }))
                        }
                        className={`p-1 transition-colors duration-200 ${
                          star <= newReview.rating
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      >
                        <Star
                          size={24}
                          className={
                            star <= newReview.rating ? "fill-current" : ""
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      review: e.target.value,
                    }))
                  }
                  placeholder="Share your thoughts about this book..."
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300 resize-none"
                  rows="4"
                />

                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || !newReview.review.trim()}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                  {isSubmitting ? "Posting..." : "Post Review"}
                </button>
              </div>
            )}

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-black/20 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {review.user.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
