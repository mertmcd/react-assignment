import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (): void => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
            <div
              className="text-white text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/products")}
            >
              React Assignment
            </div>
          </div>
          <div className="ml-3 relative">
            <button
              onClick={handleLogout}
              className="text-white font-semibold hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
