import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      alert('登录失败，请检查邮箱和密码');
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border border-ak-gray bg-ak-gray/20 backdrop-blur">
        <h2 className="text-2xl font-bold mb-6 text-ak-accent uppercase">登录</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 uppercase tracking-wide text-ak-text-muted">电子邮箱</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ak-dark border border-ak-gray p-3 focus:border-ak-accent outline-none transition-colors"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 uppercase tracking-wide text-ak-text-muted">密码</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-ak-dark border border-ak-gray p-3 focus:border-ak-accent outline-none transition-colors"
          />
        </div>
        <button type="submit" className="w-full bg-ak-accent text-black font-bold py-3 uppercase hover:bg-white transition-colors">
          进入系统
        </button>
      </form>
    </div>
  );
};

export default Login;
