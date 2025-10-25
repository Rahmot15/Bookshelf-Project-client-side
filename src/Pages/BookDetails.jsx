import React, { useContext, useState, useEffect } from "react";
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
  Edit2,
  Trash2,
  X,
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
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReview, setEditReview] = useState({ rating: 5, review: "" });

  const isOwnBook = user?.email === book?.email;

  const handleBack = () => {
    window.history.back();
  };

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://bookshelf-server-side.vercel.app/books/${book._id}/reviews`
        );
        setReviews(res.data);

        // Check if current user has already reviewed
        if (user) {
          const userReview = res.data.find(
            (review) => review.user.email === user.email
          );
          if (userReview) {
            setHasReviewed(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    if (book._id) {
      fetchReviews();
    }
  }, [book._id, user]);

  // Save to recently viewed books in localStorage
  useEffect(() => {
    if (book && book._id) {
      try {
        const recentBooksKey = 'recentlyViewedBooks';
        const existingBooks = JSON.parse(localStorage.getItem(recentBooksKey) || '[]');

        // Create a simplified book object
        const bookData = {
          _id: book._id,
          book_title: book.book_title,
          cover_photo: book.cover_photo,
          book_author: book.book_author,
          book_category: book.book_category,
          upvote: book.upvote || 0,
        };

        // Remove duplicate if exists
        const filteredBooks = existingBooks.filter(b => b._id !== book._id);

        // Add current book to the front and limit to 10 items
        const updatedBooks = [bookData, ...filteredBooks].slice(0, 10);

        localStorage.setItem(recentBooksKey, JSON.stringify(updatedBooks));
      } catch (error) {
        console.error('Failed to save to recently viewed:', error);
      }
    }
  }, [book]);

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

      Swal.fire({
        icon: "success",
        title: "Review Posted",
        text: "Your review has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Already Reviewed",
          text: "You have already reviewed this book.",
        });
        setHasReviewed(true);
      } else {
        console.error("Failed to submit review", error);
        Swal.fire({
          icon: "error",
          title: "Review Failed",
          text: error.response?.data?.message || "Failed to submit review. Please try again.",
        });
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
          `https://bookshelf-server-side.vercel.app/books/${book._id}/upvote?email=${user.email}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Upvote failed", error);
        setUpvotes((prev) => prev - 1);
        Swal.fire({
          icon: "error",
          title: "Upvote Failed",
          text: "Failed to upvote. Please try again.",
        });
      }
    }
  };

  // Reading status update handler
  const handleStatusUpdate = async (nextStatus) => {
    if (!user) return;

    try {
      setStatus(nextStatus);
      await axios.patch(
        `https://bookshelf-server-side.vercel.app/books/${book._id}/status?email=${user.email}`,
        {
          reading_status: nextStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Book marked as ${nextStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setStatus(book.reading_status);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update reading status.",
      });
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditReview({ rating: review.rating, review: review.review });
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditReview({ rating: 5, review: "" });
  };

  const handleUpdateReview = async (reviewId) => {
    if (!user || !editReview.review.trim()) return;

    try {
      setIsSubmitting(true);
      await axios.put(
        `https://bookshelf-project-server-side.vercel.app/books/${book._id}/reviews/${reviewId}`,
        {
          review: editReview.review,
          rating: editReview.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      // Refresh reviews
      const res = await axios.get(
        `https://bookshelf-project-server-side.vercel.app/books/${book._id}/reviews`
      );
      setReviews(res.data);
      setEditingReviewId(null);
      setEditReview({ rating: 5, review: "" });

      Swal.fire({
        icon: "success",
        title: "Review Updated",
        text: "Your review has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update review", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete this review? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://bookshelf-project-server-side.vercel.app/books/${book._id}/reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        // Refresh reviews
        const res = await axios.get(
          `https://bookshelf-project-server-side.vercel.app/books/${book._id}/reviews`
        );
        setReviews(res.data);
        setHasReviewed(false);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Your review has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete review", error);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: error.response?.data?.message || "Failed to delete review. Please try again.",
        });
      }
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
        <div className="bg-base-300 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button className="text-base-content dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300">
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
                <div className="relative bg-white/20 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-300/20 dark:border-gray-700/30">
                  <img
                    src={book.cover_photo}
                    alt={book.book_title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <button
                    onClick={handleUpvote}
                    disabled={!user || isOwnBook}
                    className="w-full mt-6 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-white/20 dark:bg-gray-800/40 border border-gray-400/30 dark:border-gray-600/40 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/60 hover:border-gray-600 dark:hover:border-gray-400 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ThumbsUp size={20} />
                    <span>{upvotes} Upvotes</span>
                  </button>
                  {isOwnBook && (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-2">
                      You cannot upvote your own book
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2">
              <div className="bg-white/20 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-300/20 dark:border-gray-700/30 h-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
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

                <p className="text-2xl text-gray-900 dark:text-gray-300 mb-6 font-medium">
                  {book.book_author}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-gray-100/40 dark:bg-black/40 rounded-2xl p-4">
                    <BookOpen className="text-purple-700 dark:text-purple-400" size={24} />
                    <div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">Pages</p>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {book.total_page}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100/40 dark:bg-black/40 rounded-2xl p-4">
                    <Tag className="text-pink-700 dark:text-pink-400" size={24} />
                    <div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">Category</p>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {book.book_category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100/40 dark:bg-black/40 rounded-2xl p-4">
                    <Eye className="text-cyan-700 dark:text-cyan-400" size={24} />
                    <div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">Reviews</p>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {reviews.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Overview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {book.book_overview}
                  </p>
                </div>

                <div className="bg-gray-100/40 dark:bg-black/40 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Added by
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {book?.name || "Anonymous"}
                      </p>
                      <p className="text-gray-700 dark:text-gray-400 flex items-center gap-1">
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
          <div className="bg-white/20 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-300/20 dark:border-gray-700/30">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Reviews
            </h2>

            {user && !hasReviewed && (
              <div className="mb-8 bg-gray-100/40 dark:bg-black/40 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-800 dark:text-gray-300 font-medium">
                    Rating:
                  </span>
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
                            : "text-gray-600 dark:text-gray-500"
                        }`}
                      >
                        <Star
                          size={24}
                          className={star <= newReview.rating ? "fill-current" : ""}
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
                  className="w-full p-4 bg-white/30 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300 resize-none"
                  rows="4"
                />

                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || !newReview.review.trim()}
                  className="mt-4 px-6 py-3 text-center text-white bg-primary border border-primary active:text-primary hover:bg-transparent hover:text-primary focus:outline-none focus:ring rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                  {isSubmitting ? "Posting..." : "Post Review"}
                </button>
              </div>
            )}

            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const isOwnReview = user && review.user.email === user.email;
                  const isEditing = editingReviewId === review._id;

                  return (
                    <div
                      key={review._id}
                      className="bg-gray-100/40 dark:bg-black/40 rounded-2xl p-6 border border-gray-300/20 dark:border-gray-700/30"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                          <div>
                            <p className="text-gray-900 dark:text-white font-semibold">
                              {review.user.name}
                            </p>
                            <p className="text-gray-700 dark:text-gray-400 text-sm">
                              {new Date(review.createdAt).toLocaleDateString()}
                              {review.updatedAt && " (edited)"}
                            </p>
                          </div>
                        </div>

                        {/* Edit/Delete buttons for own review */}
                        {isOwnReview && !isEditing && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditReview(review)}
                              className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                              title="Edit review"
                            >
                              <Edit2 size={18} className="text-blue-600 dark:text-blue-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review._id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete review"
                            >
                              <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        // Edit mode
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-800 dark:text-gray-300 font-medium">
                              Rating:
                            </span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setEditReview((prev) => ({ ...prev, rating: star }))
                                  }
                                  className={`p-1 transition-colors duration-200 ${
                                    star <= editReview.rating
                                      ? "text-yellow-400"
                                      : "text-gray-600 dark:text-gray-500"
                                  }`}
                                >
                                  <Star
                                    size={20}
                                    className={star <= editReview.rating ? "fill-current" : ""}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <textarea
                            value={editReview.review}
                            onChange={(e) =>
                              setEditReview((prev) => ({
                                ...prev,
                                review: e.target.value,
                              }))
                            }
                            className="w-full p-4 bg-white/30 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300 resize-none"
                            rows="3"
                          />

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateReview(review._id)}
                              disabled={isSubmitting || !editReview.review.trim()}
                              className="px-4 py-2 text-white bg-primary border border-primary hover:bg-transparent hover:text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              <Send size={16} />
                              {isSubmitting ? "Updating..." : "Update"}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-500/10 flex items-center gap-2"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View mode
                        <>
                          <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={18}
                                className={
                                  star <= review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600 dark:text-gray-500"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {review.review}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No reviews yet. Be the first to review this book!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
