import { create } from "zustand";
import { PostFormState } from "./types/storesType";
import { createPost, getSpecificPost, updateSpecificPost } from "../api/postApi";
import { CreatePost } from "../api/responseType";

export type PostFormMode = "CREATE" | "UPDATE";

export const usePostFormStore = create<PostFormState>((set, get) => ({
  mode: "CREATE" as const,
  postId: null,
  form: {
    title: "",
    content: "",
    categoryId: "",
    tagIds: [],
    postStatus: "DRAFT",
  },

  loading: false,
  saving: false,
  error: "",
  success: false,

  setMode: (mode: PostFormMode) => set({ mode }),

  setForm: (data) =>
    set((state) => ({
      form: { ...state.form, ...data },
    })),

  loadPostForEdit: async (postId: string) => {
    set({ loading: true, error: "" });

    try {
      const post = await getSpecificPost(postId);
      console.log(post);
      
      set({
        postId: post.id,
        mode: "UPDATE",
        form: {
          title: post.title,
          content: post.content,
          categoryId: post.category.id,
          tagIds: Array.from(post.tags).map((t) => t.id),
          postStatus: post.status,
        },
        loading: false,
      });
    } catch (e: any) {
      set({ error: e.message || "Failed to load post", loading: false });
    }
  },

  submit: async () => {
    const { mode, postId, form } = get();
    set({ saving: true, error: "", success: false });

    try {
      const post =
        mode === "CREATE"
          ? await createPost(form as CreatePost)
          : await updateSpecificPost(postId!, form);

      set({ saving: false, success: true });
      return post;
    } catch (e: any) {
      set({ error: e.message || "Failed to save post", saving: false });
    }
  },

  reset: () =>
    set({
      mode: "CREATE",
      postId: null,
      form: {
        title: "",
        content: "",
        categoryId: "",
        tagIds: [],
        postStatus: "DRAFT",
      },
      error: "",
      success: false,
    }),
}));