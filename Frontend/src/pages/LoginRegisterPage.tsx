import { useState } from "react";
import { motion } from "framer-motion";
import LoginFormCard from "../components/LoginFormCard";
import RegisterFormCard from "../components/RegisterFormCard";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex bg-white rounded-lg p-1 mb-6 shadow-md">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              isLogin
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              !isLogin
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Card */}
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? <LoginFormCard /> : <RegisterFormCard />}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
