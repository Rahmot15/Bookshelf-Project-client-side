import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  User,
  BookOpen,
  TrendingUp,
  Award,
  Mail,
  Camera,
  Edit3,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stats, setStats] = useState({});
  const [chartType, setChartType] = useState("pie");


  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setAllBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);


  useEffect(() => {
    if (!user || !user.email || allBooks.length === 0) return;

    const userBooks = allBooks.filter((book) => book.email === user.email);
    setMyBooks(userBooks);

    const categoryCount = {};
    userBooks.forEach((book) => {
      categoryCount[book.book_category] =
        (categoryCount[book.book_category] || 0) + 1;
    });

    const chartData = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / userBooks.length) * 100),
    }));

    setCategoryData(chartData);

    const totalRating = userBooks.reduce(
      (sum, book) => sum + (book.rating || 0),
      0
    );
    const avgRating =
      userBooks.length > 0 ? (totalRating / userBooks.length).toFixed(1) : 0;
    const highRatedBooks = userBooks.filter(
      (book) => (book.rating || 0) >= 4
    ).length;

    setStats({
      totalBooks: userBooks.length,
      avgRating,
      highRatedBooks,
      favoriteGenre:
        chartData.length > 0
          ? chartData.reduce((a, b) => (a.value > b.value ? a : b)).name
          : "N/A",
    });
  }, [allBooks, user]);

  const COLORS = [
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#84cc16",
  ];

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "bg-blue-500",
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500">Loading profile...</div>
    );
  }

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
      {/* ... (background and animated elements same as your code) ... */}

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg">
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-gray-400">
            Manage your reading journey and track your progress
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={
                  user.photoURL || "https://i.ibb.co/s9F7VY3/default-avatar.jpg"
                }
                alt={user.displayName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {user.displayName}
                </h2>
                <Edit3 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-indigo-600 transition-colors" />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              
              <p className="text-gray-700 max-w-2xl">
                {user.bio || "Book enthusiast and avid reader."}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Total Books"
            value={stats.totalBooks}
            subtitle="books in library"
            color="bg-indigo-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Average Rating"
            value={`${stats.avgRating}/5`}
            subtitle="your book ratings"
            color="bg-emerald-500"
          />
          <StatCard
            icon={Award}
            title="High Rated Books"
            value={stats.highRatedBooks}
            subtitle="4+ star ratings"
            color="bg-amber-500"
          />
          <StatCard
            icon={User}
            title="Favorite Genre"
            value={stats.favoriteGenre}
            subtitle="most read category"
            color="bg-purple-500"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Reading Analytics
              </h3>
              <p className="text-gray-600">Your books organized by category</p>
            </div>
            <div className="relative z-20">
              <div className="flex bg-gray-100 rounded-lg p-1 mt-4 sm:mt-0">
                <button
                  onClick={() => setChartType("pie")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    chartType === "pie"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Pie Chart
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    chartType === "bar"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Bar Chart
                </button>
              </div>
            </div>
          </div>

          {categoryData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={400}>
                  {chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} books`, name]}
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} books`, "Count"]}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900 mb-4">
                  Category Breakdown
                </h4>
                {categoryData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No books added yet</p>
              <p className="text-gray-400">
                Start building your library to see analytics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
