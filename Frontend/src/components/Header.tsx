import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { FiLogOut, FiUser, FiEdit3, FiFileText, FiTag, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const Header = () => {
  const { isAuthenticated, logout, hydrate } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
             Nasser Blog
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/create-post"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Create Post</span>
                </Link>
                <Link
                  to="/my-drafts"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>My Drafts</span>
                </Link>
                <Link
                  to="/categories-tags"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"
                >
                  <FiTag className="w-4 h-4" />
                  <span>Categories & Tags</span>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile burger button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FiUser className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/create-post"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Create Post</span>
            </Link>
            <Link
              to="/my-drafts"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <FiFileText className="w-4 h-4" />
              <span>My Drafts</span>
            </Link>
            <Link
              to="/categories-tags"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <FiTag className="w-4 h-4" />
              <span>Categories & Tags</span>
            </Link>
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
