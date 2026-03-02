import { useEffect } from "react";
import { useTaxonomyStore } from "../store/taxonomyStore";
import CreateCategoryCard from "../components/CreateCategoryCard";
import CreateTagsCard from "../components/CreateTagsCard";
import { motion } from "framer-motion";
import { FiFolder, FiTag, FiTrash2, FiAlertCircle } from "react-icons/fi";

const CategoriesAndTagsPage = () => {
  const {
    categories,
    tags,
    loadingCategories,
    loadingTags,
    error,
    fetchCategories,
    fetchTags,
    deleteCategory,
    deleteTag,
  } = useTaxonomyStore();

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, [fetchCategories, fetchTags]);

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(categoryId);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      await deleteTag(tagId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Categories & Tags
          </h1>
          <p className="text-gray-600">
            Manage your blog categories and tags to organize your content.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2"
          >
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Section */}
          <div className="space-y-6">
            <CreateCategoryCard />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FiFolder className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Categories</h3>
                {loadingCategories && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>

              {categories.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No categories yet. Create your first category!
                </p>
              ) : (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({category.postCount} posts)
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Delete category"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Tags Section */}
          <div className="space-y-6">
            <CreateTagsCard />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FiTag className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Tags</h3>
                {loadingTags && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                )}
              </div>

              {tags.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No tags yet. Create your first tag!
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.div
                      key={tag.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-purple-50 rounded-lg group"
                    >
                      <span className="font-medium text-purple-700">{tag.name}</span>
                      <span className="text-xs text-purple-500">({tag.postCount})</span>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Delete tag"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndTagsPage;
