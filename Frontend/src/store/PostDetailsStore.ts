import { create } from "zustand";
import { getSpecificPost, deleteSpecificPost, getAllDraftPosts } from "../api/postApi";
import { PostDetailsState } from "./types/storesType";


export const usePostDetailsStore = create<PostDetailsState>((set) => ({
  post: null,
  draftPosts: [],
  loading: false,
  error: "",

  fetchPost: async (postId: string) => {
    set({ loading: true, error: "" });

    try {
      const post = await getSpecificPost(postId);
      set({ post, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch post",
        loading: false,
      });
    }
  },

    fetchDraftPost: async () => {
    set({ loading: true, error: "" });

    try {
      const draftPosts = await getAllDraftPosts();
      set({ draftPosts, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch draft posts",
        loading: false,
      });
    }
  },

  deletePost: async (postId: string) => {
    set({ loading: true, error: "" });

    try {
      await deleteSpecificPost(postId);
      set({ post: null, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to delete post",
        loading: false,
      });
    }
  },

  clearPost: () => set({ post: null, error: "" }),
}));