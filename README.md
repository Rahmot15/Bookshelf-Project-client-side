# 📚 Book Stacker

A modern, interactive web application for managing, sharing, and discovering books.

---

## 🌟 Purpose

Book Stacker is designed to help users organize their personal bookshelf, track reading progress, share reviews, and connect with a community of book lovers. The platform supports authentication, upvoting, reviews, and beautiful UI animations for a premium user experience.

---

## 🚀 Live URL

[https://bookshelf-client-auth.web.app/](https://bookshelf-client-auth.web.app/)

---

## ✨ Key Features

- **User Authentication:** Email/password and Google login (Firebase Auth & JWT)
- **Add, Update, Delete Books:** Only authenticated users can manage their books
- **Bookshelf Page:** View all books in a responsive grid
- **Popular Books:** See the most upvoted books
- **My Books:** Filter and manage books added by the logged-in user
- **Book Details:** View book info, upvote, and post reviews
- **Reading Tracker:** Track and update reading status (Want-to-Read, Reading, Read)
- **Review System:** One review per user per book, edit/delete own review
- **Featured Categories:** Highlight book genres with dynamic cards
- **Profile Page:** User info, bookshelf summary, and pie chart of categories
- **Loading & Animation:** Skeleton loaders, spinners, and smooth framer-motion animations
- **Responsive Design:** Fully mobile-friendly with Tailwind CSS & DaisyUI

---

## 🛠️ NPM Packages Used

- **@tailwindcss/vite**
- **axios**
- **firebase**
- **framer-motion**
- **lottie-react**
- **lucide-react**
- **motion**
- **react**
- **react-dom**
- **react-icons**
- **react-router**
- **react-toastify**
- **react-tooltip**
- **recharts**
- **sweetalert2**
- **tailwindcss**

---

## 📝 How to Run Locally

1. Clone the repo
2. Install dependencies: `npm install`
3. Add your Firebase config in `.env`
4. Run: `npm run dev`

---

**Enjoy your reading journey with Book Stacker!**


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
