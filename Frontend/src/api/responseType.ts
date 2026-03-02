export interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Category {
  id: string;
  name: string;
  postCount: number;
}

export interface createCategory {
  name: string;
}

export interface Tag {
  id: string;
  name: string;
  postCount: number;
}

export interface CreateTag {
  names: string[];
}

export type PostStatus = "DRAFT" | "PUBLISHED";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  category: Category;
  tags: Tag[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  postStatus: PostStatus;
}

export interface CreatePost {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  postStatus: PostStatus;
}

export interface UpdatePost {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  postStatus: PostStatus;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
  userId:string
}
