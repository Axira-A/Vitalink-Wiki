import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors: any = {};
    if (!formData.name) tempErrors.name = '昵称不能为空';
    if (!formData.email) tempErrors.email = '邮箱不能为空';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = '邮箱格式不正确';
    
    if (!formData.password) tempErrors.password = '密码不能为空';
    else if (formData.password.length < 6) tempErrors.password = '密码长度至少6位';
    
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = '两次密码输入不一致';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Real-time validation could be added here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaChecked) return alert('请勾选验证码');

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      alert('注册成功！请检查您的邮箱进行激活。');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border border-white/5 bg-bg-secondary rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-text-primary text-center">创建账户</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">昵称</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-bg-primary border ${errors.name ? 'border-red-500' : 'border-white/10'} p-3 rounded-lg focus:border-accent outline-none transition-colors text-text-primary`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">电子邮箱</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-bg-primary border ${errors.email ? 'border-red-500' : 'border-white/10'} p-3 rounded-lg focus:border-accent outline-none transition-colors text-text-primary`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">密码</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-bg-primary border ${errors.password ? 'border-red-500' : 'border-white/10'} p-3 rounded-lg focus:border-accent outline-none transition-colors text-text-primary`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">确认密码</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full bg-bg-primary border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} p-3 rounded-lg focus:border-accent outline-none transition-colors text-text-primary`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Fake CAPTCHA */}
          <div className="flex items-center space-x-3 p-3 border border-white/10 rounded-lg bg-bg-primary/50 cursor-pointer" onClick={() => setCaptchaChecked(!captchaChecked)}>
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${captchaChecked ? 'bg-accent border-accent' : 'border-white/20'}`}>
              {captchaChecked && <CheckCircle size={16} className="text-black" />}
            </div>
            <span className="text-sm text-text-secondary select-none">我不是机器人 (I'm not a robot)</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? '注册中...' : '立即注册'}
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-text-secondary">
          已有账号? <span className="text-accent cursor-pointer hover:underline" onClick={() => navigate('/login')}>立即登录</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
