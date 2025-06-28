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
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";

const UpdateBook = () => {
  const {user} = use(AuthContext)
  const data = useLoaderData();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState("");

  const [book_category, setBook_category] = useState(data.book_category);
  const [reading_status, setReading_status] = useState(data.reading_status);

  const handleFormUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.upvote = Number(data.upvote) || 0;
    console.log(data);

    data.book_category = book_category;
    data.reading_status = reading_status;

    axios
      .put(`http://localhost:5000/books/${data._id}`, data, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          navigate("/myBooks");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book Update successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error!", "Failed to delete book.", "error");
      });
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField("");

  return (
    <div className="{`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50'}`}">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-purple-500/25">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">
              Update Your Book
            </h1>
            <div className="flex justify-center gap-2 mt-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <Heart className="w-5 h-5 text-pink-400 animate-bounce" />
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse delay-1000" />
            </div>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleFormUpdate}
            className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-purple-500/10 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="hidden" name="_id" value={data._id} />
              {/* Book Title */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    defaultValue={data.book_title}
                    name="book_title"
                    onFocus={() => handleFocus("book_title")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter the book title..."
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_title"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    defaultValue={data.cover_photo}
                    onFocus={() => handleFocus("cover_photo")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-indigo-800/50 to-purple-800/50 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="https://example.com/book-cover.jpg"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "cover_photo"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Total Pages */}
              <div>
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    defaultValue={data.total_page}
                    onFocus={() => handleFocus("total_page")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-blue-800/50 to-purple-800/50 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="0"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "total_page"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Book Author */}
              <div>
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    defaultValue={data.book_author}
                    onFocus={() => handleFocus("book_author")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-pink-800/50 to-purple-800/50 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Author name..."
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_author"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* User Email (Read Only) */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 font-medium mb-2">
                  <Mail className="w-4 h-4" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data?.email || ""}
                  readOnly
                  className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 backdrop-blur-sm"
                />
              </div>

              {/* User Name (Read Only) */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 font-medium mb-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data?.name || ""}
                  readOnly
                  className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300  backdrop-blur-sm"
                />
              </div>

              {/* Book Category */}
              <div>
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    value={book_category}
                    onChange={(e) => setBook_category(e.target.value)}
                    onFocus={() => handleFocus("book_category")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-green-800/50 to-purple-800/50 border border-purple-300/30 rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800">
                      Select Category
                    </option>
                    <option value="Fiction" className="bg-gray-800">
                      Fiction
                    </option>
                    <option value="Non-Fiction" className="bg-gray-800">
                      Non-Fiction
                    </option>
                    <option value="Fantasy" className="bg-gray-800">
                      Fantasy
                    </option>
                  </select>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 to-purple-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "book_category"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Reading Status */}
              <div>
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    value={reading_status}
                    onChange={(e) => setReading_status(e.target.value)}
                    onFocus={() => handleFocus("reading_status")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-gradient-to-r from-teal-800/50 to-purple-800/50 border border-purple-300/30 rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800">
                      Select Status
                    </option>
                    <option value="Read" className="bg-gray-800">
                      Read ✓
                    </option>
                    <option value="Reading" className="bg-gray-800">
                      Reading 📖
                    </option>
                    <option value="Want-to-Read" className="bg-gray-800">
                      Want to Read 📚
                    </option>
                  </select>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/20 to-purple-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "reading_status"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Book Overview */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-purple-200 font-medium mb-2">
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
                    defaultValue={data.book_overview}
                    onFocus={() => handleFocus("book_overview")}
                    onBlur={handleBlur}
                    rows="4"
                    className="w-full px-4 py-4 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Write a brief overview of the book..."
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-indigo-400/20 -z-10 transition-opacity duration-300 ${
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
                  <label className="flex items-center justify-center gap-2 text-gray-400 font-medium mb-2">
                    <Star className="w-4 h-4" />
                    Initial Upvotes
                  </label>
                  <input
                    type="number"
                    name="upvote"
                    value={data.upvote}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 text-center backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button className="flex justify-center items-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 px-8 py-4 rounded-2xl">
                <BookOpen className="w-5 h-5 mr-2" />
                Update Book to Library
                <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
