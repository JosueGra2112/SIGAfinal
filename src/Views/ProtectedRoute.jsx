import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () =>{
    const isAuthenticated = localStorage.getItem('user') !== null;
  
    if (!isAuthenticated) {
      return <Navigate to="/Login" replace />;
    }
  
    return <Outlet />;
};
export default ProtectedRoute;