import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PrivateRouteProps } from "../types/privateRoute";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
