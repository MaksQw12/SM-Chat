import { axiosInstance } from "./instanse";

export const loginUser = async (username: string, password: string) => {
  return await axiosInstance.post("/login", { username, password });
};
export const regUser = async (username: string, password: string) => {
  return await axiosInstance.post("/register", { username, password });
};
