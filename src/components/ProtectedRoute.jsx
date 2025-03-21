import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="mx-auto flex justify-center items-center mt-[200px]">
      <span className="loading loading-ring loading-2xl text-4xl"></span>
    </div>
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
  
};

export default ProtectedRoute;
