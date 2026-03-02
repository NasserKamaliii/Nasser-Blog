import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostFormStore } from "../store/postFormStore";
import { useTaxonomyStore } from "../store/taxonomyStore";
import { motion } from "framer-motion";
import { FiSave, FiX, FiTag, FiFolder } from "react-icons/fi";
import { useHomeStore } from "../store/homeStore";

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    form,
    setForm,
    submit,
    loadPostForEdit,
    loading,
    saving,
    error,
    success,
    setMode,
  } = usePostFormStore();
  const { categories, tags, fetchCategories, fetchTags } = useTaxonomyStore();
  const { fetchAllData } = useHomeStore();
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    setMode("UPDATE");
    if (id) {
      loadPostForEdit(id);
    }
    fetchCategories();
    fetchTags();
  }, [id, loadPostForEdit, setMode, fetchCategories, fetchTags]);

  useEffect(() => {
    if (success) {
      fetchAllData();
      navigate("/");
    }
  }, [success, navigate, fetchAllData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!form.title.trim()) {
      setLocalError("Title is required");
      return;
    }

    if (!form.content.trim()) {
      setLocalError("Content is required");
      return;
    }

    if (!form.categoryId) {
      setLocalError("Please select a category");
      return;
    }

    console.log(form);
    
    await submit();
  };

  const toggleTag = (tagId: string) => {
    const newTags = form.tagIds.slice();
    if (newTags.includes(tagId)) {
      newTags.splice(newTags.indexOf(tagId), 1);
    } else {
      newTags.push(tagId);
    }
    setForm({ tagIds: newTags });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Update Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter post title"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm({ content: e.target.value })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Write your post content here... (HTML supported)"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <FiFolder className="w-4 h-4" />
                <span>Category *</span>
              </label>
              <select
                id="category"
                value={form.categoryId}
                onChange={(e) => setForm({ categoryId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <FiTag className="w-4 h-4" />
                <span>Tags</span>
              </label>
              <div className="flex flex-wrap gap-2 p-4 border border-gray-300 rounded-lg min-h-[100px]">
                {tags.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tags available. Create tags first.</p>
                ) : (
                  tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        form.tagIds.includes(tag.id)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={form.postStatus}
                onChange={(e) =>
                  setForm({ postStatus: e.target.value as "DRAFT" | "PUBLISHED" })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            {/* Error Messages */}
            {(error || localError) && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error || localError}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              <motion.button
                type="submit"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave className="w-4 h-4" />
                <span>{saving ? "Updating..." : "Update Post"}</span>
              </motion.button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                <FiX className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatePost;
