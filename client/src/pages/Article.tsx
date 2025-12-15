import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Article = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/wiki/${slug}`);
      setContent(res.data.content);
    } catch (error) {
      console.error(error);
      setContent('# 新文章\n开始写作...');
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('请先登录后再保存');
      
      // Check if article exists to decide create or update
      try {
        await axios.get(`http://localhost:3000/api/wiki/${slug}`);
        await axios.put(`http://localhost:3000/api/wiki/${slug}`, 
          { content }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        await axios.post('http://localhost:3000/api/wiki', 
          { title: slug, content, slug }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsEditing(false);
    } catch (error) {
      alert('保存出错');
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tighter text-ak-accent">{slug}</h1>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-6 py-2 border border-ak-accent text-ak-accent hover:bg-ak-accent hover:text-black transition-colors uppercase font-bold text-sm"
        >
          {isEditing ? '保存更改' : '编辑文章'}
        </button>
      </div>

      <motion.div 
        layout
        className="bg-ak-gray/10 border border-ak-gray min-h-[500px] p-8"
      >
        {isEditing ? (
          <textarea 
            className="w-full h-full min-h-[500px] bg-transparent outline-none resize-none font-mono text-sm leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{content}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Article;
