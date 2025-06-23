import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { AuthContext } from "../Provider/AuthContext";

import { Tooltip } from "react-tooltip";

import { FaBookOpen } from "react-icons/fa";
import { auth } from "../Firebase/firebase.init";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("black");
  const { user, signOutUser } = use(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "black" : "light";
    setTheme(newTheme);
  };

  const handleLogout = () => {
    signOutUser(auth)
      .then((result) => {
        console.log(result);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const link = (
    <>
      <li className="text-xl">
        <NavLink to="/" end>
          {({ isActive }) => (
            <div className="relative">
              <span
                className={`text-xl font-semibold transition duration-300 ${
                  isActive ? "text-blue-500" : "text-white"
                }`}
              >
                Home
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-1 w-full bg-blue-700 transition-transform duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              ></span>
            </div>
          )}
        </NavLink>
      </li>

      <li className="text-xl">
        <NavLink to="/Bookshelf" end>
          {({ isActive }) => (
            <div className="relative">
              <span
                className={`text-xl font-semibold transition duration-300 ${
                  isActive ? "text-blue-500" : "text-white"
                }`}
              >
                Bookshelf
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-1 w-full bg-blue-700 transition-transform duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              ></span>
            </div>
          )}
        </NavLink>
      </li>

      <li className="text-xl">
        <NavLink to="/myBooks" end>
          {({ isActive }) => (
            <div className="relative">
              <span
                className={`text-xl font-semibold transition duration-300 ${
                  isActive ? "text-blue-500" : "text-white"
                }`}
              >
                My Books
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-1 w-full bg-blue-700 transition-transform duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              ></span>
            </div>
          )}
        </NavLink>
      </li>

      <li className="text-xl">
        <NavLink to="/addBook" end>
          {({ isActive }) => (
            <div className="relative">
              <span
                className={`text-xl font-semibold transition duration-300 ${
                  isActive ? "text-blue-500" : "text-white"
                }`}
              >
                Add Book
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-1 w-full bg-blue-700 transition-transform duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              ></span>
            </div>
          )}
        </NavLink>
      </li>

      <li className="text-xl">
        <NavLink to="/profile" end>
          {({ isActive }) => (
            <div className="relative">
              <span
                className={`text-xl font-semibold transition duration-300 ${
                  isActive ? "text-blue-500" : "text-white"
                }`}
              >
                Profile
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-1 w-full bg-blue-700 transition-transform duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              ></span>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full sticky top-0 left-0 z-20  backdrop-blur-md bg-black/30">
      <div className="navbar md:p-0 md:w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {link}
            </ul>
          </div>

          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <FaBookOpen
                size={35}
                className="text-amber-600 md:block hidden"
              />
              <h1 className="md:text-3xl text-2xl bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text  text-transparent font-bold md:block hidden">
                BookStacker
              </h1>
            </div>
            <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg md:hidden block">
              <BookOpen size={25} className="text-white" />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end space-x-3">
          {user ? (
            <div>
              <div id="avatarTooltip" className="avatar cursor-pointer">
                <div className="ring-primary ring-offset-base-100 w-11 rounded-full ring-2 ring-offset-2">
                  <img src={user.photoURL} alt="User" />
                </div>
              </div>

              {/*  */}
              <Tooltip
                anchorId="avatarTooltip"
                place="bottom"
                clickable
                className="!max-w-xs !rounded-lg !p-4 !bg-white !text-gray-800 !shadow-lg"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{user.displayName}</h3>
                  <p className="text-lg text-gray-600">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 md:py-2 py-2 md:px-5 px-3 font-dm text-base font-medium text-white shadow-xl shadow-green-400/30 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                  >
                    logOut
                  </button>
                </div>
              </Tooltip>
              {/*  */}
            </div>
          ) : (
            <Link
              to={"/auth/login"}
              className="inline-flex items-center justify-center rounded-lg bg-green-600 md:py-3 py-2 md:px-5 px-3 font-dm text-base font-medium text-white shadow-xl shadow-green-400/30 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
            >
              Login
            </Link>
          )}

          {/* Theme change */}
          <div>
            <button onClick={handleToggle}>
              {theme === "black" ? (
                <MdOutlineDarkMode size={45} className="text-black" />
              ) : (
                <MdDarkMode size={45} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
