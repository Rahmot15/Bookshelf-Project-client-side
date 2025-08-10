import React, { useEffect } from "react";
import { Link } from "react-router";
import "aos/dist/aos.css";
import Aos from "aos";

const GIRL_IMG = "https://i.ibb.co/yn1QH316/home-3-rev-3-img-1.png";
const DOG_IMG = "https://i.ibb.co/tPZTMKJd/home-3-rev-3-img-2.png";

const BookSigningSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Left content */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="max-w-xl z-20"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-base-content mb-3">
              Autobiography
            </p>
            <h1 className="text-base-content font-serif leading-tight text-4xl md:text-5xl lg:text-6xl mb-6">
              Book signing this Saturday
            </h1>
            <p className="text-base-content mb-8">
              Join us for a cozy signing and short reading with the author. Drop
              by between 3–6 PM for a signed copy and a limited-edition
              bookmark.
            </p>
            <Link
              to=""
              className="btn btn-outline btn-secondary px-10"
            >
              Read more
            </Link>
          </div>

          {/* Right: main image (girl) */}
          <div
            data-aos="fade-left"
            data-aos-delay="1000"
            className="relative min-h-[320px] lg:min-h-[560px]"
          >
            <img
              src={GIRL_IMG}
              alt="Girl reading a red book"
              loading="lazy"
              className="absolute right-[-6%] top-1/2 -translate-y-1/2 max-h-[560px] md:max-h-[620px] object-contain z-10"
            />
          </div>

          {/* Decorative dog at bottom-left */}
          <img
            data-aos="fade-right"
            data-aos-delay="1000"
            src={DOG_IMG}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none hidden md:block absolute left-[32%] bottom-[-10px] w-44 md:w-60 lg:w-72 z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default BookSigningSection;
