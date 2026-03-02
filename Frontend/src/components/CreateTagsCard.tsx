import { useState } from "react";
import { useTaxonomyStore } from "../store/taxonomyStore";
import { motion } from "framer-motion";
import { FiPlus, FiTag } from "react-icons/fi";
import { splitStringToArray } from "../utils/splitStringToArray";

const CreateTagsCard = () => {
  const [tagsName, setTagsName] = useState<string>("");
  const { createTag, loadingTags, error } = useTaxonomyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagsName) return;
    const tagArray = Array.from(splitStringToArray(tagsName));
    await createTag({ names: tagArray });
    if (!error) {
      setTagsName("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FiTag className="w-5 h-5 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Create Tag</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tagName" className="block text-sm font-medium text-gray-700 mb-2">
            Tag Name
          </label>
          <div className="flex space-x-2">
            <input
              id="tagName"
              type="text"
              value={tagsName}
              onChange={(e) => setTagsName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter all tag name separated by ,"
            />
            <motion.button
              type="submit"
              disabled={loadingTags || !tagsName.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add</span>
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateTagsCard;
