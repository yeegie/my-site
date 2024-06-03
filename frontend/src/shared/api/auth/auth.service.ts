import { TokenWithData } from "@/shared/types";
import { saveToStorage } from "../api.helper";
import { instance } from "@shared/api/api.interceptor";

/**
 * ### Auth service
 * provides methods for login and validation.
 */
export const AuthService = {
  /**
   * ### Method for user login.
   *
   * @param {string} username - username or email.
   * @param {string} password - user password.
   * 
   * @returns {Promise<TokenWithData>} Promise with tokens and user data.
   * 
   * @throws {Error} throw error if the auth fails.
   * 
   * @example
   * await AuthService.login(email, password);
   */
  async login(username: string, password: string): Promise<TokenWithData> {
    try {
      const response = await instance.post("/auth/login", null, {
        params: {
          username,
          password,
        },
      });
      console.info("AuthService. response:", response); // !!! OFF
      saveToStorage(response.data);
      return response.data;
    } catch (error) {
      console.error("AuthService. Ошибка при попытке входа:", error);
      throw new Error("Ошибка при попытке входа");
    }
  },

  /**
   * ### Method for validating the current user.
   * implies the use of the __useAuth hook__.
   *
   * @returns {Promise<void>} Promise that is resolved if the validation succeeds.
   * @throws {Error} Throws an error if the validation fails.
   */
  async validate(): Promise<void> {
    try {
      await instance.post("/auth/validate");
      console.info("Validation successful.");
    } catch (error) {
      console.error("Validation error:", error);
      throw new Error("Validation error, signin again.");
    }
  },
};
