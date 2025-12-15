import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, History, Edit3, MessageSquare, AlertCircle, Check } from 'lucide-react';

const Article = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState<any[]>([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  // Auto-save logic
  useEffect(() => {
    if (!isEditing) return;

    const timer = setTimeout(async () => {
      if (content) {
        setIsSaving(true);
        try {
          const token = localStorage.getItem('token');
          if (token) {
            await axios.post(`http://localhost:3000/api/wiki/${slug}/draft`, 
              { content },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setLastSaved(new Date());
          }
        } catch (e) {
          console.error("Auto-save failed", e);
        } finally {
          setIsSaving(false);
        }
      }
    }, 3000); // Auto-save after 3s of inactivity

    return () => clearTimeout(timer);
  }, [content, isEditing, slug]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/wiki/${slug}`);
      setContent(res.data.content);
      setTitle(res.data.title || slug);
      // If draft exists and is newer, we could prompt user. For now, just load published.
    } catch (error) {
      console.error(error);
      setContent('# 新文章\n开始写作...');
      setTitle(slug || 'Untitled');
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/wiki/${slug}/history`);
      setHistoryList(res.data);
      setShowHistory(true);
    } catch (error) {
      alert('无法获取历史记录');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('请先登录后再保存');
      
      setLoading(true);
      try {
        await axios.get(`http://localhost:3000/api/wiki/${slug}`);
        await axios.put(`http://localhost:3000/api/wiki/${slug}`, 
          { content, title }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        await axios.post('http://localhost:3000/api/wiki', 
          { title, content, slug }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsEditing(false);
      setLastSaved(new Date());
    } catch (error) {
      alert('保存出错');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) return <div className="p-12 text-center">加载中...</div>;

  return (
    <div className="flex gap-8 max-w-7xl mx-auto min-h-[80vh]">
      {/* Sidebar - Wikipedia Style */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          <div className="p-4 bg-bg-secondary border border-white/5 rounded-xl">
            <h3 className="font-bold text-accent mb-4 uppercase text-xs tracking-wider">目录</h3>
            <div className="text-sm text-text-secondary space-y-2">
              {/* Simple TOC based on headers */}
              {content.split('\n').filter(line => line.startsWith('#')).map((line, i) => {
                const level = line.match(/^#+/)?.[0].length || 1;
                const text = line.replace(/^#+\s/, '');
                return (
                  <a key={i} href={`#${text}`} className={`block hover:text-white transition-colors pl-${(level-1)*4} truncate`}>
                    {text}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-bg-secondary border border-white/5 rounded-xl">
            <h3 className="font-bold text-accent mb-4 uppercase text-xs tracking-wider">工具箱</h3>
            <div className="flex flex-col space-y-2">
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors">
                <History size={16} /> 版本历史
              </button>
              <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors">
                <MessageSquare size={16} /> 讨论区
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div>
            {isEditing ? (
               <input 
                 type="text" 
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)}
                 className="text-4xl font-bold bg-transparent outline-none text-text-primary w-full"
                 placeholder="文章标题"
               />
            ) : (
              <h1 className="text-4xl font-bold tracking-tighter text-text-primary">{title}</h1>
            )}
            <div className="text-sm text-text-secondary mt-2 flex items-center gap-4">
              <span>最后更新: {new Date().toLocaleDateString()}</span>
              {isEditing && (
                <span className={`flex items-center gap-1 ${isSaving ? 'text-yellow-500' : 'text-green-500'}`}>
                  {isSaving ? <AlertCircle size={12}/> : <Check size={12}/>}
                  {isSaving ? '自动保存中...' : lastSaved ? `已保存 ${lastSaved.toLocaleTimeString()}` : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
             {!isEditing ? (
               <button 
                 onClick={() => setIsEditing(true)}
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/5"
               >
                 <Edit3 size={16} /> 编辑
               </button>
             ) : (
               <button 
                 onClick={handleSave}
                 className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-lg hover:bg-accent/90 transition-colors"
               >
                 <Save size={16} /> 发布更改
               </button>
             )}
          </div>
        </div>

        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-bg-secondary p-4 rounded-xl border border-white/5"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">版本历史</h3>
              <button onClick={() => fetchHistory()} className="text-xs text-accent">刷新</button>
            </div>
            <div className="space-y-2">
              {historyList.length === 0 && <p className="text-text-secondary text-sm">暂无历史记录 (点击刷新查看)</p>}
              {historyList.map((h: any) => (
                <div key={h.id} className="flex justify-between text-sm p-2 hover:bg-white/5 rounded">
                  <span>{h.editor.name}</span>
                  <span className="text-text-secondary">{new Date(h.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div 
          layout
          className="bg-bg-secondary border border-white/5 min-h-[600px] rounded-xl overflow-hidden shadow-2xl"
        >
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
              <textarea 
                className="w-full h-full bg-bg-primary/50 p-6 outline-none resize-none font-mono text-sm leading-relaxed text-text-primary border-r border-white/5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此处使用 Markdown 写作..."
              />
              <div className="h-full overflow-y-auto p-6 prose prose-invert max-w-none bg-bg-secondary">
                <div className="opacity-50 mb-4 text-xs uppercase tracking-wider border-b border-white/10 pb-2">预览</div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 prose prose-invert max-w-none prose-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Article;
