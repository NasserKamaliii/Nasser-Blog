import { useState } from "react";
import { useTaxonomyStore } from "../store/taxonomyStore";
import { motion } from "framer-motion";
import { FiPlus, FiFolder } from "react-icons/fi";

const CreateCategoryCard = () => {
  const [name, setName] = useState("");
  const { createCategory, loadingCategories, error } = useTaxonomyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createCategory({ name: name.trim() });
    if (!error) {
      setName("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FiFolder className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Create Category</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <div className="flex space-x-2">
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter category name"
            />
            <motion.button
              type="submit"
              disabled={loadingCategories || !name.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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

export default CreateCategoryCard;
