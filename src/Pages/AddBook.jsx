import React, { use, useState } from "react";
import {
  BookOpen,
  User,
  Mail,
  FileText,
  Tag,
  Star,
  Upload,
  Sparkles,
  Heart,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBook = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [focusedField, setFocusedField] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.upvote = Number(data.upvote) || 0;
    console.log(data);
    e.target.reset();

    axios
      .post(
        `https://bookshelf-server-side.vercel.app/books?email=${user.email}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book add successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/Bookshelf");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField("");

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 shadow-lg shadow-purple-500/25">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-secondary mb-4">
              Add Your Book
            </h1>
            <div className="flex justify-center gap-2 mt-2">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              <Heart className="w-5 h-5 text-pink-500 animate-bounce" />
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse delay-1000" />
            </div>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleFormSubmit}
            className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 p-8 hover:shadow-purple-500/10 dark:hover:shadow-purple-600/20 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Book Title */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <BookOpen className="w-4 h-4" />
                  Book Title *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "book_title" ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="text"
                    name="book_title"
                    onFocus={() => handleFocus("book_title")}
                    onBlur={handleBlur}
                    placeholder="Enter the book title..."
                    className="w-full px-4 py-4 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 dark:from-purple-900/50 dark:to-indigo-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 placeholder-purple-600 dark:placeholder-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/30 to-pink-400/30 dark:from-purple-600/40 dark:to-pink-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_title"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <Upload className="w-4 h-4" />
                  Cover Photo URL
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "cover_photo" ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="text"
                    name="cover_photo"
                    onFocus={() => handleFocus("cover_photo")}
                    onBlur={handleBlur}
                    placeholder="https://example.com/book-cover.jpg"
                    className="w-full px-4 py-4 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-900/50 dark:to-purple-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 placeholder-purple-600 dark:placeholder-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/30 to-purple-400/30 dark:from-indigo-600/40 dark:to-purple-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "cover_photo"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Total Pages */}
              <div>
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <FileText className="w-4 h-4" />
                  Total Pages *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "total_page" ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="number"
                    name="total_page"
                    onFocus={() => handleFocus("total_page")}
                    onBlur={handleBlur}
                    placeholder="0"
                    className="w-full px-4 py-4 bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-900/50 dark:to-purple-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 placeholder-purple-600 dark:placeholder-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-600/40 dark:to-purple-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "total_page"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Book Author */}
              <div>
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <User className="w-4 h-4" />
                  Author *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "book_author" ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="text"
                    name="book_author"
                    onFocus={() => handleFocus("book_author")}
                    onBlur={handleBlur}
                    placeholder="Author name..."
                    className="w-full px-4 py-4 bg-gradient-to-r from-pink-300/20 to-purple-300/20 dark:from-pink-900/50 dark:to-purple-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 placeholder-purple-600 dark:placeholder-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/30 to-purple-400/30 dark:from-pink-600/40 dark:to-purple-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_author"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* User Email (Read Only) */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium mb-2">
                  <Mail className="w-4 h-4" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-4 bg-gray-300/50 dark:bg-gray-700/60 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-300 backdrop-blur-sm"
                />
              </div>

              {/* User Name (Read Only) */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium mb-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-4 bg-gray-300/50 dark:bg-gray-700/60 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-300 backdrop-blur-sm"
                />
              </div>

              {/* Book Category */}
              <div>
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <Tag className="w-4 h-4" />
                  Category *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "book_category" ? "scale-105" : ""
                  }`}
                >
                  <select
                    name="book_category"
                    onFocus={() => handleFocus("book_category")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-green-300/20 to-purple-300/20 dark:from-green-900/50 dark:to-purple-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  >
                    <option
                      value=""
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Select Category
                    </option>
                    <option
                      value="Fiction"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Fiction
                    </option>
                    <option
                      value="Non-Fiction"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Non-Fiction
                    </option>
                    <option
                      value="Fantasy"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Fantasy
                    </option>
                  </select>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/30 to-purple-400/30 dark:from-green-600/40 dark:to-purple-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_category"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Reading Status */}
              <div>
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <BookOpen className="w-4 h-4" />
                  Reading Status *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "reading_status" ? "scale-105" : ""
                  }`}
                >
                  <select
                    name="reading_status"
                    onFocus={() => handleFocus("reading_status")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-teal-300/20 to-purple-300/20 dark:from-teal-900/50 dark:to-purple-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm"
                  >
                    <option
                      value=""
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Select Status
                    </option>
                    <option
                      value="Read"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Read ✓
                    </option>
                    <option
                      value="Reading"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Reading 📖
                    </option>
                    <option
                      value="Want-to-Read"
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Want to Read 📚
                    </option>
                  </select>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/30 to-purple-400/30 dark:from-teal-600/40 dark:to-purple-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "reading_status"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Book Overview */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                  <FileText className="w-4 h-4" />
                  Book Overview *
                </label>
                <div
                  className={`group relative transition-all duration-300 ${
                    focusedField === "book_overview" ? "scale-105" : ""
                  }`}
                >
                  <textarea
                    name="book_overview"
                    onFocus={() => handleFocus("book_overview")}
                    onBlur={handleBlur}
                    rows="4"
                    placeholder="Write a brief overview of the book..."
                    className="w-full px-4 py-4 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 dark:from-purple-900/50 dark:to-indigo-900/50 border border-purple-400/40 dark:border-purple-700 rounded-xl text-gray-900 dark:text-purple-200 placeholder-purple-600 dark:placeholder-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/60 outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:from-purple-600/40 dark:to-indigo-600/40 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_overview"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Upvote (Read Only) */}
              <div className="md:col-span-2 flex justify-center">
                <div className="w-48">
                  <label className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 font-medium mb-2">
                    <Star className="w-4 h-4" />
                    Initial Upvotes
                  </label>
                  <input
                    type="number"
                    name="upvote"
                    value={0}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-300/50 dark:bg-gray-700/60 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-300 text-center backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button className="flex justify-center items-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 px-8 py-4 rounded-2xl text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Add Book to Library
                <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
