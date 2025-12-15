import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ak-dark text-ak-text font-sans">
      <nav className="h-16 border-b border-ak-gray flex items-center justify-between px-8 bg-ak-dark/90 backdrop-blur fixed w-full z-10">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-ak-accent uppercase">
          Vitalink<span className="text-white">.Wiki</span>
        </Link>
        <div className="space-x-6 text-sm font-medium tracking-wide">
          <Link to="/" className="hover:text-ak-accent transition-colors">首页</Link>
          <Link to="/wiki/intro" className="hover:text-ak-accent transition-colors">百科</Link>
          <Link to="/login" className="hover:text-ak-accent transition-colors">登录</Link>
        </div>
      </nav>
      
      <main className="flex-grow pt-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="h-12 border-t border-ak-gray flex items-center justify-center text-xs text-ak-text-muted">
        © 2025 VITALINK. 版权所有.
      </footer>
    </div>
  );
};

export default Layout;
