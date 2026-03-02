import { create } from "zustand";
import {
  getAllCategories,
  createNewCategory,
  deleteCategory,
} from "../api/categoryApi";
import {
  getAllTags,
  createNewTag,
  deleteTag,
} from "../api/tagApi";
import { TaxonomyState } from "./types/storesType";


export const useTaxonomyStore = create<TaxonomyState>((set) => ({
  categories: [],
  tags: [],

  loadingCategories: false,
  loadingTags: false,
  error: "",

  /* ================= CATEGORIES ================= */

  fetchCategories: async () => {
    set({ loadingCategories: true, error: "" });
    try {
      const categories = await getAllCategories();
      set({ categories, loadingCategories: false });
    } catch (e: any) {
      set({
        loadingCategories: false,
        error: e.response?.data?.message || "Failed to load categories",
      });
    }
  },

  createCategory: async (data) => {
    set({ loadingCategories: true, error: "" });
    try {
      const newCategory = await createNewCategory(data);
      set((state) => ({
        categories: [...state.categories, newCategory],
        loadingCategories: false,
      }));
    } catch (e: any) {
      set({
        loadingCategories: false,
        error: e.response?.data?.message || "Failed to create category",
      });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loadingCategories: true, error: "" });
    try {
      await deleteCategory(categoryId);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== categoryId),
        loadingCategories: false,
      }));
    } catch (e: any) {
      set({
        loadingCategories: false,
        error: e.response?.data?.message || "Failed to delete category",
      });
    }
  },

  /* ================= TAGS ================= */

  fetchTags: async () => {
    set({ loadingTags: true, error: "" });
    try {
      const tags = await getAllTags();
      set({ tags, loadingTags: false });
    } catch (e: any) {
      set({
        loadingTags: false,
        error: e.response?.data?.message || "Failed to load tags",
      });
    }
  },

  createTag: async (data) => {
    set({ loadingTags: true, error: "" });
    try {
      const newTag = await createNewTag(data);
      set((state) => ({
        tags: [...state.tags, ...newTag],
        loadingTags: false,
      }));
    } catch (e: any) {
      set({
        loadingTags: false,
        error: e.response?.data?.message || "Failed to create tag",
      });
    }
  },

  deleteTag: async (tagId) => {
    set({ loadingTags: true, error: "" });
    try {
      await deleteTag(tagId);
      set((state) => ({
        tags: state.tags.filter((t) => t.id !== tagId),
        loadingTags: false,
      }));
    } catch (e: any) {
      set({
        loadingTags: false,
        error: e.response?.data?.message || "Failed to delete tag",
      });
    }
  },

  resetError: () => set({ error: "" }),
}));