import { api } from "./axiosInstance";
import { Category, createCategory } from "./responseType";


export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("api/v1/categories");
  return res.data;
};

export const createNewCategory = async (
    data:createCategory
): Promise<Category> => {
  const res = await api.post<Category>("api/v1/categories",data);
  return res.data;
};

export const deleteCategory = async (
  id:string
): Promise<void> => {
  await api.delete(`api/v1/categories/${id}`);
};
