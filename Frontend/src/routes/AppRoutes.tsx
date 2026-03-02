import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PostDetails from "../pages/PostDetails";
import PublicRoute from "./PublicRoute";
import LoginRegisterPage from "../pages/LoginRegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import MyDraft from "../pages/MyDraft";
import CategoriesAndTagsPage from "../pages/CategoriesAndTagsPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetails />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginRegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/my-drafts" element={<MyDraft />} />
        <Route path="/categories-tags" element={<CategoriesAndTagsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;