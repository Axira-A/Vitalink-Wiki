import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans selection:bg-accent selection:text-white">
      <nav className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-bg-primary/80 backdrop-blur-md fixed w-full z-50 transition-all">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-black font-bold text-lg group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
            Vitalink<span className="text-text-secondary font-normal">.Wiki</span>
          </span>
        </Link>
        <div className="space-x-8 text-sm font-medium tracking-wide text-text-secondary">
          <Link to="/" className="hover:text-white transition-colors">首页</Link>
          <Link to="/wiki/intro" className="hover:text-white transition-colors">知识库</Link>
          <Link to="/login" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors border border-white/5">登录</Link>
        </div>
      </nav>
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="h-24 border-t border-white/5 flex flex-col items-center justify-center text-xs text-text-secondary/50 space-y-2">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-accent transition-colors">隐私政策</a>
          <a href="#" className="hover:text-accent transition-colors">服务条款</a>
          <a href="#" className="hover:text-accent transition-colors">关于我们</a>
        </div>
        <p>© 2025 VITALINK. DESIGNED FOR CREATORS.</p>
      </footer>
    </div>
  );
};

export default Layout;
