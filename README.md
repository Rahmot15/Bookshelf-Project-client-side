# 📚 Book Stacker

A modern, interactive web application for managing, sharing, and discovering books.

---

## 🌟 Purpose

Book Stacker is designed to help users organize their personal bookshelf, track reading progress, share reviews, and connect with a community of book lovers. The platform supports authentication, upvoting, reviews, and beautiful UI animations for a premium user experience.

---

## 🚀 Live URL

[https://bookshelf-client-auth.web.app/](https://bookshelf-client-auth.web.app/)

---
## 📸 Project Overview

![Book Stacker Screenshot]( https://i.ibb.co.com/Q74ycYNv/image.png )
*A clear screenshot of the Book Stacker application's homepage or dashboard, showcasing its design and key features.*
*(**NOTE:** Replace `images/book-stacker-screenshot.png` with the actual path to your screenshot. It's highly recommended to upload the image directly to your GitHub repository (e.g., in an `images/` folder) and use a relative path, instead of external hosting like i.ibb.co, for better reliability.)*

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
## ⚙️ How to Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
*   [npm](https://www.npmjs.com/get-npm) (Node Package Manager, usually comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)

### Frontend Setup (Client-Side)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Rahmat15/Bookshelf-Project-client-side.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd Bookshelf-Project-client-side
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Create a `.env` file:**
    In the root of your project directory, create a file named `.env` and add your Firebase configuration details and your backend API URL. Replace the placeholder values with your actual credentials.

    ```
    # Firebase Configuration
    VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    VITE_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

    # Backend API URL
    VITE_API_BASE_URL=http://localhost:5000 # Or your deployed backend URL
    ```
    *Note: The `VITE_API_BASE_URL` should point to your backend server. If running locally, it's typically `http://localhost:5000` (or whatever port your backend runs on).*

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running locally, usually accessible at `http://localhost:5173`.

### Backend Setup

This project relies on a separate backend server for data management and JWT authentication. Please refer to the backend repository for setup instructions:

*   **Backend Repository:** [https://github.com/Rahmot15/Bookshelf-Project-server-side.git](YOUR_BACKEND_REPO_URL)
    *   *Replace `YOUR_BACKEND_REPO_URL` with the actual link to your Express.js/Node.js backend repository.*

---

