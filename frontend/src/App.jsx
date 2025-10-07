import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./components/Events";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/events" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/events" replace /> : <Register />}
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
