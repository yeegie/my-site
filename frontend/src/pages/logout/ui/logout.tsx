// import styles from "./logout.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/hooks/useAuth";

export const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(true);
    navigate("/");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Wait...</div>;
};
