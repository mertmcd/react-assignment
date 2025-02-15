import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createMockJwtToken } from "../helpers/authHelper";
import Notification from "../components/Notification";
import { NotificationProps } from "../types/notificationMessage";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Default user and password
    if (username === "user" && password === "user123") {
      const payload = {
        username: "user",
        // create 15 min expiration for testing purposes
        exp: Date.now() + 15 * 60 * 1000,
      };

      const mockToken: string = createMockJwtToken(payload);

      localStorage.setItem("token", mockToken);

      login(mockToken);

      navigate("/products");
    } else {
      setNotification({
        message: "Invalid username or password",
        type: "error",
        duration: 3000,
        onClose: () => {
          setNotification(null);
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="lg:bg-white bg-transparent p-8 rounded-lg lg:shadow-lg shadow-none w-full max-w-md">
        <h1 className="text-3xl font-bold text-center lg:text-gray-800 text-white mb-6">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              duration={notification.duration ?? 3000}
              onClose={() => setNotification(null)}
            />
          )}
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium lg:text-gray-700 text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium lg:text-gray-700 text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-lg text-sm font-semibold lg:text-white text-blue-600 lg:bg-blue-600 bg-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
