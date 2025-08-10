import React from "react";
import { FaBookOpen, FaFacebook, FaYoutube } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="bg-gray-50 dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-700 py-12 px-6 transition-colors duration-500"
    >
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and copyright */}
        <aside>
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <FaBookOpen size={35} className="text-amber-600" />
              <h1 className="md:text-3xl text-2xl bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text  text-transparent font-bold md:block hidden">
                BookStacker
              </h1>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm select-none">
            © {new Date().getFullYear()} BookStacker. All rights reserved.
          </p>
        </aside>

        {/* Services */}
        <nav>
          <h6 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Services
          </h6>
          <ul className="space-y-3 text-gray-700 dark:text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Home Grown
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Design
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Gifts we love
              </a>
            </li>
          </ul>
        </nav>

        {/* About */}
        <nav>
          <h6 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
            About
          </h6>
          <ul className="space-y-3 text-gray-700 dark:text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Contact info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Terms of use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Privacy policy
              </a>
            </li>
          </ul>
        </nav>

        {/* Social */}
        <nav>
          <h6 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Social
          </h6>
          <div className="flex space-x-6 text-gray-700 dark:text-gray-400">
            <a
              href="https://www.facebook.com/ar.rhmatulla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://www.youtube.com/@RahmotCoder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-700 transition-colors duration-300"
            >
              <FaYoutube size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-rahmatullah-87a52b334/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              <IoLogoLinkedin size={28} />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
