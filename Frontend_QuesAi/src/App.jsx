import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext } from "./contexts/AuthContext";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/SignUp";
import UnknownRoutes from "./Pages/UnknownRoutes";
import Home from "./Pages/home/Home";
import AddPodcast from "./Pages/PodCast/AddPodcast.jsx";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("login");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/userlogin"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/usersignup"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
      />

      {/* Protected Home Route */}
      <Route path="/" element={<Home />} />
      <Route path="/projects/:projectId/upload" element={<AddPodcast />} />

      {/* Fallback Route */}
      <Route path="*" element={<UnknownRoutes />} />
    </Routes>
  );
}

export default App;
