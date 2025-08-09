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
          .delete(`https://bookshelf-server-side.vercel.app/books/${id}?email=${user.email}`, {
            headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          })
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
    if (user?.email) {
      axios
        .get(`https://bookshelf-server-side.vercel.app/myBooks?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => setBooks(res.data))
        .catch(() => setBooks([]));
    }
  }, [user]);

  return (
    <div >

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
          {books.length > 0 ? (
            books.map((book) => (
              <MyBookCard
                key={book._id}
                user={user}
                book={book}
                onDelete={handleDelete}
              />
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
