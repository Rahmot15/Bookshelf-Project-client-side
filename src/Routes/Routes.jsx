import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddBook from "../Pages/AddBook";
import BookDetails from "../Pages/BookDetails";
import PrivateRoute from "../Private/PrivateRoute";
import MyBooks from "../Pages/MyBooks";
import NotFound from "../Pages/NotFound";

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
        element: (
          <PrivateRoute>
            {" "}
            <MyBooks />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoute>
            {" "}
            <AddBook />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/bookDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/books/${params.id}`),
        Component: BookDetails,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
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
    ],
  },
]);
