import { motion } from 'framer-motion';
import { BookOpen, PenTool, Layout as LayoutIcon, Cpu, Zap, Globe } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center pt-16 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="text-center w-full max-w-3xl mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-accent border border-accent/20 rounded-full bg-accent/5 uppercase"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          System V.2.0 Online
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
            构建你的
          </span>
          <br />
          <span className="text-accent">第二大脑</span>
        </h1>
        
        <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
          极简、强大、互联。Vitalink 是一个专为创造者设计的现代化知识管理系统，让思维自由流动。
        </p>

        <SearchBar />
      </motion.div>

      {/* Feature/Navigation Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card 
            title="知识百科" 
            description="探索已构建的完整知识体系，支持深度链接与关联阅读。"
            icon={BookOpen}
            className="h-full"
          />
        </motion.div>
        <motion.div variants={item}>
          <Card 
            title="开始创作" 
            description="使用支持 Markdown 的富文本编辑器记录灵感。"
            icon={PenTool}
            className="h-full"
          />
        </motion.div>
        <motion.div variants={item}>
          <Card 
            title="组件库" 
            description="查看可复用的 UI 组件与设计规范。"
            icon={LayoutIcon}
            className="h-full"
          />
        </motion.div>
        <motion.div variants={item}>
          <Card 
            title="神经连接" 
            description="基于 AI 的知识关联分析与智能推荐（开发中）。"
            icon={Cpu}
            className="h-full"
          />
        </motion.div>
        <motion.div variants={item}>
          <Card 
            title="即时同步" 
            description="WebSocket 驱动的毫秒级多端数据同步。"
            icon={Zap}
            className="h-full"
          />
        </motion.div>
        <motion.div variants={item}>
          <Card 
            title="全网发布" 
            description="一键将私有笔记发布为精美的静态网站。"
            icon={Globe}
            className="h-full"
          />
        </motion.div>
      </motion.div>

      {/* Footer Stat (Decorative) */}
      <motion.div 
        className="flex space-x-12 text-text-secondary/30 text-xs font-mono tracking-widest uppercase mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>Memory: 64TB</span>
        <span>Uptime: 99.9%</span>
        <span>Latency: 12ms</span>
      </motion.div>
    </div>
  );
};

export default Home;
