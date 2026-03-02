import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Post } from "../api/responseType";
import { FiClock, FiUser, FiTag } from "react-icons/fi";

interface PostCardProps {
  post: Post;
  index?: number;
}

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const tagsArray = Array.from(post.tags);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link to={`/posts/${post.id}`} className="block">
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              {post.category.name}
            </span>
            <span className="text-xs text-gray-500 flex items-center space-x-1">
              <FiClock className="w-3 h-3" />
              <span>{post.readingTime} min read</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
          </p>

          {/* Tags */}
          {tagsArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsArray.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md"
                >
                  <FiTag className="w-3 h-3" />
                  <span>{tag.name}</span>
                </span>
              ))}
              {tagsArray.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{tagsArray.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <FiUser className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{post.author.firstName} {post.author.lastName}</span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
