import apiClient from "./api";

export const login = async (data: any) => {
  const response: any = await apiClient.post(`/auth/login`, data);
  return response;
};
