import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./screens/Admin";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

export const App = () => {
  // Check if the user is stored in localStorage
  const user = JSON.parse(localStorage.getItem("@user"));

  const isLoggedIn = !!user?.id;
  const isAdmin = !!user?.isAdmin;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/search" /> : <Login />}
        />
        <Route
          path="/search"
          element={isLoggedIn ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/search" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/search" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};
