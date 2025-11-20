import "./App.css";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostDetailPage from "./pages/PostDetailPage";
import MyPostsPage from "./pages/MyPostsPage";
import EditPostPage from "./pages/EditPostPage";

// Auth
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import SettingPage from "./pages/SettingPage";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    const themeClasses = [
      "theme-light",
      "theme-dark",
      "theme-blue",
      "theme-green",
      "theme-pink",
      "theme-purple",
    ];
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Authrization Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/my-posts/edit/:id" element={<EditPostPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
