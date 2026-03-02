import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePostDetailsStore } from "../store/PostDetailsStore";
import { motion } from "framer-motion";
import { FiClock, FiUser, FiTag, FiEdit3, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error, fetchPost, deletePost, clearPost } = usePostDetailsStore();
  const { isAuthenticated ,userId} = useAuthStore();

  console.log(post);
  

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
    return () => {
      clearPost();
    };
  }, [id, fetchPost, clearPost]);

  const handleDelete = async () => {
    if (id && window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      navigate("/");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const tagsArray = Array.from(post.tags);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Posts</span>
          </Link>
        </motion.div>

        {/* Post Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <FiUser className="w-5 h-5" />
                <span className="font-medium">{post.author.firstName} {post.author.lastName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiClock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="text-gray-500 text-sm">
                {formatDate(post.createdAt)}
              </div>
            </div>

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center space-x-1 px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg"
                    >
                      <FiTag className="w-4 h-4" />
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Action Buttons (for authenticated users) */}
            {isAuthenticated && post.author.id === userId && (
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                <Link
                  to={`/update-post/${post.id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Edit Post</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete Post</span>
                </button>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default PostDetails;
