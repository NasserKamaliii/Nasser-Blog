import { Category, createCategory, CreateTag, LoginForm, Post, RegisterForm, Tag } from "../../api/responseType";

export interface HomePageState {
  posts: Post[];
  tags: Tag[];
  categories: Category[];
  myDraftPosts: Post[];
  error: string;
  draftError: string;
  draftPostsLoading: boolean;
  postsLoading: boolean;
  tagsLoading: boolean;
  categoriesLoading: boolean;

  fetchAllData: () => void;
  fetchDraftPost: () => void;
}

interface FiledError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  errors: FiledError[];
}

export interface PostDetailsState {
  post: Post | null;
  loading: boolean;
  error: string;
  draftPosts: Post[];

  fetchPost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  clearPost: () => void;
}

export interface PostFormState {
  mode: "CREATE" | "UPDATE";
  postId: string | null;
  form: {
    title: string;
    content: string;
    categoryId: string;
    tagIds: string[];
    postStatus: "DRAFT" | "PUBLISHED";
  };
  loading: boolean;
  saving: boolean;
  error: string;
  success: boolean;
  setMode: (mode: "CREATE" | "UPDATE") => void;
  setForm: (data: Partial<PostFormState["form"]>) => void;
  loadPostForEdit: (postId: string) => Promise<void>;
  submit: () => Promise<Post | undefined>;
  reset: () => void;
}

export interface AuthState {
  token: string;
  expiresIn: number ;
  isAuthenticated: boolean;
  userId:string;

  loading: boolean;
  error: string;
  success: boolean;

  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export interface TaxonomyState {
  categories: Category[];
  tags: Tag[];

  loadingCategories: boolean;
  loadingTags: boolean;
  error: string;

  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;

  createCategory: (data: createCategory) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;

  createTag: (data: CreateTag) => Promise<void>;
  deleteTag: (tagId: string) => Promise<void>;

  resetError: () => void;
}
