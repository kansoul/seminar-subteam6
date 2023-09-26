import apiClient from "./api";

export const getUsers = async () => {
  const response: any = await apiClient.get(`/users`);
  return response;
};

export const createUser = async (data: any) => {
  const response: any = await apiClient.post(`/users`, data);
  return response;
};

export const deleteUser = async (id: string) => {
  const response: any = await apiClient.delete(`users/${id}`);
  return response;
};
