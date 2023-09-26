import apiClient from "./api";

export const getLink = async () => {
  const response: any = await apiClient.get(`/links`);
  return response;
};

export const createLink = async (data: any) => {
  const response: any = await apiClient.post(`/links`, data);
  return response;
};

export const deleteLink = async (id: string) => {
  const response: any = await apiClient.delete(`links/${id}`);
  return response;
};
