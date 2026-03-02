import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900 text-white mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Blog</h3>
            <p className="text-gray-400 text-sm">
              A modern digital blog platform where writers share their thoughts,
              ideas, and stories with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/NasserKamaliii"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://t.me/Nasser_Corner"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/%D9%86%D8%A7%D8%B5%D8%B1-%D9%83%D9%85%D8%A7%D9%84%D9%8A-13a322373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Blog. All rights reserved for
            Nasser Kamali.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
