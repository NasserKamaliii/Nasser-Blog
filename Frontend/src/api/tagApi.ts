import { api } from "./axiosInstance";
import { CreateTag, Tag } from "./responseType";


export const getAllTags = async (): Promise<Tag[]> => {
  const res = await api.get<Tag[]>("api/v1/tags");
  return res.data;
};

export const createNewTag = async (
    data:CreateTag
): Promise<Set<Tag>> => {
  const res = await api.post<Set<Tag>>("api/v1/tags",data);
  return res.data;
};

export const deleteTag = async (
  id:string
): Promise<void> => {
  await api.delete(`api/v1/tags/${id}`);
};