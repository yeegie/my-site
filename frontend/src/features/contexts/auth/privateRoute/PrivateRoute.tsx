import React, { useEffect, useState } from "react";
import { PrivateRouteProps } from "./PrivateRoute.props";
import { Navigate } from "react-router-dom";
import { useAuth } from "@features/hooks/useAuth";
import Cookies from "js-cookie";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authIsActive: boolean = import.meta.env.ADMIN_AUTH;
  const { isLoggedIn, setIsLoggedIn, validate } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkValidate = async () => {
      const access_token = Cookies.get("access_token"); // Check access_token
      if (!access_token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      // If access_token exists make validate
      try {
        await validate();
      } catch (error) {
        console.error("Validation error:", error);
        setIsLoggedIn(false);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (authIsActive) {
      checkValidate();
    } else {  // If auth for admin panel is False
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, [authIsActive, setIsLoggedIn, validate]);

  // If loading is True draw this
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is auth redir to children (route for admin) or redir to sign-in page
  return isLoggedIn ? children : <Navigate to="/signin" />;
};
