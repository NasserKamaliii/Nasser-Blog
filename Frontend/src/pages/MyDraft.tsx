import { useEffect } from "react";
import { useHomeStore } from "../store/homeStore";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const MyDraft = () => {
  const {
    myDraftPosts,
    draftPostsLoading,
    draftError,
    fetchDraftPost,
  } = useHomeStore();

  useEffect(() => {
    fetchDraftPost();
  }, [fetchDraftPost]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FiFileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Drafts
            </h1>
          </div>
          <p className="text-gray-600">
            Manage and edit your draft posts before publishing them.
          </p>
        </motion.div>

        {/* Loading State */}
        {draftPostsLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {draftError && !draftPostsLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {draftError}
          </div>
        )}

        {/* Drafts Grid */}
        {!draftPostsLoading && !draftError && (
          <>
            {myDraftPosts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-md">
                <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No Drafts Yet
                </h2>
                <p className="text-gray-600 mb-6">
                  You don't have any draft posts. Start creating your first post!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myDraftPosts.map((post, index) => (
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

export default MyDraft;
