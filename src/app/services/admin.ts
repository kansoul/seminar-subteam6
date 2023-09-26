import apiClient from "./api";

export const login = async (data: any) => {
  const response: any = await apiClient.post(`/login`, data);
  return response;
};
