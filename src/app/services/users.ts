import apiClient from "./api";

export const getUsers = async () => {
  const response: any = await apiClient.get(`/users`);
  return response;
};

export const createUser = async (data: any) => {
  const response: any = await apiClient.post(`/user`, data);
  return response;
};

export const deleteUser = async (id: string) => {
  const response: any = await apiClient.delete(`user/${id}`);
  return response;
};
