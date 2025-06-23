import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";
import { BookOpen } from "lucide-react";
import MyBookCard from "../Components/MyBookCard";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const MyBooks = () => {
  const initialData = useLoaderData();
  const { user } = use(AuthContext);
  const [books, setBooks] = useState(initialData);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/books/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = books.filter((b) => b._id !== id);
              setBooks(remaining); // UI refresh
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete book.", "error");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  const myBooks = books.filter((book) => book.email === user?.email);

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
      {/* ... (background and animated elements same as your code) ... */}

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg">
              <BookOpen size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              My Book
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myBooks.length > 0 ? (
            myBooks.map((book) => (
              <MyBookCard key={book._id} book={book} onDelete={handleDelete} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <div className="text-center md:py-50 py-16">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No Books Found
                </h3>
                <p className="text-gray-500">এখনো কোনো বই যোগ করা হয়নি।</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
