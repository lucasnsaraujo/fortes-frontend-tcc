import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Search from "./screens/Search";
import Admin from "./screens/Admin";
import Profile from "./screens/Profile";

export const App = () => {
  // Check if the user is stored in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/search" /> : <Login />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
