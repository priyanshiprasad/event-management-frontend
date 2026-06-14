import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import CreateEventPage from "./pages/organizer/CreateEventPage";
import MyEventsPage from "./pages/organizer/MyEventsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./components/Navbar";
import EditEventPage from "./pages/organizer/EditEventPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Protected Route
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/landing" />;
}

// Role based route
function RoleRoute({ children, role }) {
  const { user } = useAuth();
  return user?.role === role ? children : <Navigate to="/home" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        {/* Public routes*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookingsPage />
            </PrivateRoute>
          }
        />

        {/* Organizer routes */}
        <Route
          path="/organizer"
          element={
            <PrivateRoute>
              <RoleRoute role="ORGANIZER">
                <MyEventsPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/create"
          element={
            <PrivateRoute>
              <RoleRoute role="ORGANIZER">
                <CreateEventPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/events"
          element={
            <PrivateRoute>
              <RoleRoute role="ORGANIZER">
                <MyEventsPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute role="ADMIN">
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/organizer/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute role="ORGANIZER">
                <EditEventPage />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Password reset routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
