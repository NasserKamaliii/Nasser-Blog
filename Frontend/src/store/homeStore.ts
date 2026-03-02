import { create } from "zustand";
import { getAllDraftPosts, getAllPublishedPosts } from "../api/postApi";
import { getAllTags } from "../api/tagApi";
import { getAllCategories } from "../api/categoryApi";
import { HomePageState } from "./types/storesType";

export const useHomeStore = create<HomePageState>((set) => ({
  posts: [],
  tags: [],
  categories: [],
  myDraftPosts: [],
  error: "",
  draftError: "",
  draftPostsLoading: false,
  postsLoading: false,
  tagsLoading: false,
  categoriesLoading: false,

  fetchAllData: async () => {
    set((state) => ({
      ...state,
      postsLoading: true,
      tagsLoading: true,
      categoriesLoading: true,
    }));
    try {
      const [posts, tags, categories] = await Promise.all([
        getAllPublishedPosts(),
        getAllTags(),
        getAllCategories(),
      ]);
      set((state) => ({
        ...state,
        posts,
        tags,
        categories,
        postsLoading: false,
        tagsLoading: false,
        categoriesLoading: false,
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        error: error.response?.data.message || "An unexpected error occurred",
        postsLoading: false,
        tagsLoading: false,
        categoriesLoading: false,
      }));
    }
  },

  fetchDraftPost: async () => {
    set((state) => ({
      ...state,
      draftPostsLoading: true,
    }));
    try {
      const myDraftPosts = await getAllDraftPosts();
      set((state) => ({
        ...state,
        myDraftPosts,
        draftPostsLoading: false,
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        draftError: error.response?.data?.message || error.message || "Failed to fetch draft posts",
        draftPostsLoading: false,
      }));
    }
  },
}));
