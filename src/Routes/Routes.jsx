import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddBook from "../Pages/AddBook";
import MyBook from "../Pages/MyBooks";
import BookDetails from "../Pages/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/Bookshelf",
        Component: Bookshelf,
      },
      {
        path: "/myBooks",
        Component: MyBook,
      },
      {
        path: "/addBook",
        Component: AddBook,
      },
      {
        path: "/bookDetails/:id",
        loader: ({params}) => fetch(`http://localhost:5000/books/${params.id}`),
        Component: BookDetails,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
        {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ]
  },
]);
