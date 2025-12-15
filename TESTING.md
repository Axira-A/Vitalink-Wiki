# 测试策略

## 1. 功能测试
验证核心功能是否符合预期。

### 身份验证 (Authentication)
- [ ] 注册新用户 -> 成功
- [ ] 使用正确凭据登录 -> 成功
- [ ] 使用错误密码登录 -> 失败 (400)
- [ ] 无 Token 访问受保护路由 -> 失败 (401)

### Wiki 操作
- [ ] 创建文章 -> 成功
- [ ] 阅读文章 -> 成功
- [ ] 更新文章 -> 成功 (生成新版本)
- [ ] 查看历史 -> 返回版本列表

## 2. 负载/压力测试
确保系统能承受并发用户，特别是针对“多人协作”需求。

**工具**: `k6` 或 `Artillery`

**场景**:
- 100 个并发用户阅读文章。
- 10 个并发用户编辑同一篇文章 (WebSocket 压力测试)。

**脚本示例 (k6)**:
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/api/wiki/intro');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

## 3. 跨浏览器兼容性
在以下浏览器上进行测试：
- **Chrome** (最新版) - 主要目标
- **Firefox** (最新版)
- **Safari** (macOS/iOS)
- **Edge** (Windows)

**关注点**:
- 动画效果 (Framer Motion 兼容性)
- Flexbox/Grid 布局 (Tailwind)
- 滚动条和背景模糊效果

## 4. 安全测试
- **XSS**: 确保用户渲染的内容经过消毒 (React 默认处理，但需注意 `dangerouslySetInnerHTML`)。
- **CSRF**: 验证 API 端点受保护。
- **SQL 注入**: Prisma ORM 设计上已防止此类攻击。
