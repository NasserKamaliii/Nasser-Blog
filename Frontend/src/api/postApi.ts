import { api } from "./axiosInstance";
import { CreatePost, Post, UpdatePost } from "./responseType";

export const getAllPublishedPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/api/v1/posts");
  return res.data;
};

export const getAllDraftPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/api/v1/posts/drafts");
  return res.data;
};


export const createPost = async (data: CreatePost): Promise<Post> => {
  const res = await api.post<Post>("/api/v1/posts", data);
  return res.data;
};

export const getSpecificPost = async (postId: string): Promise<Post> => {
  const res = await api.get<Post>(`/api/v1/posts/${postId}`);
  return res.data;
};

export const updateSpecificPost = async (
  postId: string,
  data: UpdatePost
): Promise<Post> => {
  const res = await api.put<Post>(`/api/v1/posts/${postId}`, data);
  return res.data;
};

export const deleteSpecificPost = async (
  postId: string,
): Promise<void>=> {
    await api.delete(`/api/v1/posts/${postId}`);
};