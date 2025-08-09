import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    img: "img1.png",
    book_name: "Atomic Habits",
    category: "Self-Help",
    summary:
      "Learn how small habits can lead to remarkable results and lasting personal change.",
  },
  {
    img: "img2.png",
    book_name: "Rich Dad Poor Dad",
    category: "Personal Finance",
    summary:
      "Discover the mindset and financial lessons that can help you achieve financial freedom.",
  },
  {
    img: "img3.png",
    book_name: "Mindset: The New Psychology of Success",
    category: "Psychology",
    summary:
      "Understand how having a growth mindset can transform your life and career.",
  },
  {
    img: "img4.png",
    book_name: "The 7 Habits of Highly Effective People",
    category: "Self-Development",
    summary: "Timeless principles for personal and professional effectiveness.",
  },
  {
    img: "img5.png",
    book_name: "Deep Work",
    category: "Productivity",
    summary:
      "Master the ability to focus without distraction and achieve more in less time.",
  },
  {
    img: "img6.png",
    book_name: "Think and Grow Rich",
    category: "Motivation",
    summary:
      "Classic lessons on success, wealth, and the power of positive thinking.",
  },
];

const items = images.map((imag) => ({
  img: imag.img,
  book_name: imag.book_name,
  category: imag.category,
  summary: imag.summary,
}));

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6 },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.6, type: "spring" },
  }),
};

const Banner = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const timeoutRef = useRef(null);

  const paginate = (newDirection) => {
    setPage(([p]) => [
      (p + newDirection + items.length) % items.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      paginate(1);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [page]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };

  const current = items[page];

  return (
    <div className="md:-mt-16 -mt-10 relative w-full min-h-screen flex items-center justify-center bg-base-200 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute w-[600px] h-[400px] bg-gradient-to-tr from-primary/30 via-secondary/30 to-accent/30 rounded-[30%] blur-[120px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

      {/* Slider */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 py-8 h-auto flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8"
          >
            {/* Text Left */}
            <div className="w-full md:w-1/2 text-center md:text-left md:ml-20 ml-0">
              <motion.div
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-4xl text-base-content font-semibold mb-2"
              >
                {current.book_name}
              </motion.div>
              <motion.div
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-xl sm:text-2xl text-primary font-bold mb-4"
              >
                {current.category}
              </motion.div>
              <motion.div
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-base-content/80 text-base sm:text-lg max-w-md mx-auto md:mx-0"
              >
                {current.summary}
              </motion.div>
              <motion.button
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="btn btn-primary mt-4"
              >
                Read More
              </motion.button>
            </div>

            {/* Image Right */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <motion.img
                src={current.img}
                alt=""
                className="w-52 sm:w-64 md:w-80 lg:w-[350px] h-auto object-contain drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, x: 60 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  transition: { delay: 0.3, duration: 0.7 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  x: -60,
                  transition: { duration: 0.3 },
                }}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-base-content/40 flex items-center justify-center text-xl sm:text-2xl bg-base-100 hover:bg-base-200 transition text-base-content"
          onClick={() => paginate(-1)}
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-base-content/40 flex items-center justify-center text-xl sm:text-2xl bg-base-100 hover:bg-base-200 transition text-base-content"
          onClick={() => paginate(1)}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Banner;
