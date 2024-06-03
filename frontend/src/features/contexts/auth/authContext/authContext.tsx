import { AuthProviderProps } from './authProvider.props';
import { createContext, useState } from "react";
import { IUser } from "@shared/types";
import { AuthService } from '@shared/api/auth/auth.service';
import { removeTokenStorage } from '@shared/api/api.helper';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  authenticate: (user?: IUser) => void,
  logout: (clearData?: boolean) => void,
  user: IUser | null,
  setUser: (user: IUser | null) => void,
  validate: () => Promise<void>,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 *  ### Provider for context authentication.
 * @description Wrap the application to get information about the user's authentication status.
 * @returns {ReactNode} children.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  /**
   * Set isLoggedIn = true, and save user (if exists) to storage.
   * @param {IUser} user - user data. is optional.
   */
  const authenticate = (user?: IUser) => {
    setIsLoggedIn(true);
    user ? setUser(user) : null;
  };

  /**
   *  Set isLoggedIn = false, and clear user data if clearData is true.
   * @param {clearData} clearData clear data after logout. is optional.
   */
  const logout = (clearData: boolean = false) => {
    setIsLoggedIn(false);
    if (clearData) {
      setUser(null);
      removeTokenStorage();
    }
  };

  /**
   * Check validation access_token (if exists) and isLoggedIn = true.
   */
  const validate = async () => {
    try {
      await AuthService.validate();
      authenticate();
    } catch (error) {
      console.error("Validation error:", error);
      logout()
      throw new Error("Validation error.");
    }
  };

  return (
    <AuthContext.Provider
    value={{
        isLoggedIn,
        setIsLoggedIn,
        authenticate,
        logout,
        user,
        setUser,
        validate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
