import { useEffect, useState } from "react";
import { useHomeStore } from "../store/homeStore";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const {
    posts,
    tags,
    categories,
    postsLoading,
    tagsLoading,
    categoriesLoading,
    error,
    fetchAllData,
    fetchDraftPost,
    myDraftPosts,
    draftPostsLoading,
  } = useHomeStore();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);

  useEffect(() => {
    fetchAllData();
    if (isAuthenticated) {
      fetchDraftPost();
    }
  }, [fetchAllData, fetchDraftPost, isAuthenticated]);

  // Filter posts based on search, category, and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category.id === selectedCategory;
    const matchesTag =
      !selectedTag || Array.from(post.tags).some((tag) => tag.id === selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const displayedPosts = showDrafts && isAuthenticated ? myDraftPosts : filteredPosts;
  const isLoading = showDrafts ? draftPostsLoading : postsLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing stories, insights, and ideas from our community of writers
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            {/* Category Filter */}
            {!categoriesLoading && categories.length > 0 && (
              <select
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(e.target.value || null)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.postCount})
                  </option>
                ))}
              </select>
            )}

            {/* Tag Filter */}
            {!tagsLoading && tags.length > 0 && (
              <select
                value={selectedTag || ""}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name} ({tag.postCount})
                  </option>
                ))}
              </select>
            )}

            {/* Clear Filters */}
            {(selectedCategory || selectedTag || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedTag(null);
                  setSearchQuery("");
                }}
                className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiX className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}

            {/* Drafts Toggle (for authenticated users) */}
            {isAuthenticated && (
              <button
                onClick={() => setShowDrafts(!showDrafts)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showDrafts
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {showDrafts ? "Show Published" : "Show My Drafts"}
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && !error && (
          <>
            {displayedPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {showDrafts
                    ? "You don't have any draft posts yet."
                    : "No posts found. Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
