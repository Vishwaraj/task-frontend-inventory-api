import { useEffect } from "react";
import { AuthService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const check = AuthService.authCheck();

    if (!check) {
      navigate("/");
    }
  }, []);

  return children;
}

export default ProtectedRoute;
