import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <BookingProvider>
      <Router>
        {/* Navbar */}
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Brand */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-600">
              CourtBook
            </h1>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-3">
              <NavLink to="/" className={navLinkClass}>
                Book Court
              </NavLink>
              <NavLink to="/history" className={navLinkClass}>
                History
              </NavLink>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-600"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Book Court
              </NavLink>
              <NavLink
                to="/history"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                History
              </NavLink>
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Admin
              </NavLink>
            </div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route
            path="/history"
            element={<BookingHistory userId="demoUser" />}
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
