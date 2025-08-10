import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { Tooltip } from "react-tooltip";
import { FaBookOpen } from "react-icons/fa";
import { auth } from "../Firebase/firebase.init";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

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
    <div className="w-full sticky top-0 left-0 z-20  bg-black/30 backdrop-blur-lg border-b border-white/10">
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
                  <Link to={"/profile"}>
                    <img src={user.photoURL} alt="User" />
                  </Link>
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
                    className="px-6 py-2 min-w-[120px] text-center text-white bg-primary border border-primary rounded active:text-primary hover:bg-transparent hover:text-primary focus:outline-none focus:ring w-full"
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
              className="btn btn-outline btn-secondary"
            >
              Login
            </Link>
          )}

          {/* Theme change */}
          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="garden"
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
