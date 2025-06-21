import React from "react";
import { FaBookOpen, FaFacebook, FaYoutube } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { Link } from "react-router";

const Footer = () => {
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
      <footer className="footer sm:footer-horizontal  text-white p-10">
        <aside>
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <FaBookOpen size={35} className="text-amber-600" />
              <h1 className="md:text-3xl text-2xl bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text  text-transparent font-bold md:block hidden">
                BookStacker
              </h1>
            </div>
          </Link>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Home Grown</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Gifts we love</a>
        </nav>
        <nav>
          <h6 className="footer-title">About</h6>
          <a className="link link-hover">Contact info</a>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/ar.rhmatulla"
              target="_blank"
              className="hover:text-blue-600"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.youtube.com/@RahmotCoder"
              target="_blank"
              className="hover:text-red-700"
            >
              <FaYoutube size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-rahmatullah-87a52b334/"
              target="_blank"
              className="hover:text-blue-700"
            >
              <IoLogoLinkedin size={24} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
