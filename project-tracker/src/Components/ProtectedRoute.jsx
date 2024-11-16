import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({children, isAdminRequired}) {

    const {isAuthenticated, isAdmin} = useSelector((state) => state.auth);

    if (!isAuthenticated){
        return <Navigate to="/login" />
    }

    if (isAdminRequired && !isAdmin){
        return <Navigate to="student-dashboard" />
    }

    return children
}

export default ProtectedRoute