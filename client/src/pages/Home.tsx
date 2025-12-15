import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.h1 
        className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        VITALINK
      </motion.h1>
      <motion.p 
        className="text-xl text-ak-text-muted max-w-2xl mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        下一代个人知识库。极简、强大、互联。
      </motion.p>
      
      <motion.div
        className="flex space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <button className="px-8 py-3 bg-ak-accent text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
          开始写作
        </button>
        <button className="px-8 py-3 border border-ak-gray hover:border-ak-accent hover:text-ak-accent transition-colors uppercase tracking-wider">
          探索发现
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
