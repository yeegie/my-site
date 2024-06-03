import { instance } from "@shared/api/api.interceptor";
import { IWorkResponse } from "@/shared/types";

/**
 * ### Work service
 * provides methods for get works.
 */
export const WorkService = {
  /**
   * ### Method for get all works.
   * Get all works uses for getting all work on is_active=false, for admin.
   * @throws {Error} throw error if the request fails.
   * @returns {Promise<IWorkResponse[]>} Promise with work data.
   */
  async getAll(): Promise<IWorkResponse[]> {
    try {
      const response = await instance.get("/work", {
        params: { show_all: true },
      });
      return response.data;
    } catch (error) {
      console.error("Work fetching error:", error);
      throw new Error("Work fetching error");
    }
  },

  /**
   * ### Method for get all __avaiable__ works.
   * __avaiable__ meaning accessible to user.
   *
   * @returns {Promise<IWorkResponse[]>} Promise with work data.
   */
  async getAllAvailable(): Promise<IWorkResponse[]> {
    try {
      const response = await instance.get("/work");
      return response.data;
    } catch (error) {
      console.error("Work fetching error:", error);
      throw new Error("Work fetching error");
    }
  },

  /**
   * ### Method for get work by id.
   * @param {string} id work id.
   * @returns {Promise<IWorkResponse>}
   */
  async get(id: string) {
    try {
      const response = await instance.get("/work", { params: { id: id } });
      return response.data;
    } catch (error) {
      console.error("Work fetching error:", error);
      throw new Error("Work fetching error");
    }
  },
};
