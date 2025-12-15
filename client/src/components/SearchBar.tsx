import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-2xl mx-auto group"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        className="w-full bg-bg-secondary border border-white/10 text-text-primary pl-12 pr-4 py-4 rounded-full focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder-text-secondary/50 text-lg shadow-lg"
        placeholder="搜索知识库..."
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <span className="text-xs text-text-secondary border border-white/10 px-2 py-1 rounded bg-bg-primary/50">⌘ K</span>
      </div>
    </motion.div>
  );
};

export default SearchBar;
