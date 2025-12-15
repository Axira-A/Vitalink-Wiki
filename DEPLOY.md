# Vitalink Wiki - 部署指南

## 前置要求
- **Node.js**: v16 或更高版本
- **npm** 或 **yarn** 包管理器
- **PostgreSQL** (可选，开发环境默认使用 SQLite)

## 安装步骤

### 1. 克隆仓库
```bash
git clone <repository-url>
cd Vitalink官网
```

### 2. 后端配置 (Backend)
进入 server 目录：
```bash
cd server
```

安装依赖：
```bash
npm install
```

初始化数据库 (Prisma)：
```bash
npx prisma generate
npx prisma db push
```
*注意：这将在本地创建一个 SQLite 数据库文件 `dev.db`。如需在生产环境使用 PostgreSQL，请修改 `.env` 文件中的 `DATABASE_URL`。*

启动服务器：
```bash
npm start
```
服务器将在 `http://localhost:3000` 运行。

### 3. 前端配置 (Frontend)
打开一个新的终端窗口，进入 client 目录：
```bash
cd client
```

安装依赖：
```bash
npm install
```

启动开发服务器：
```bash
npm run dev
```
应用将在 `http://localhost:5173` 访问。

## 生产环境构建

1. 构建前端资源：
   ```bash
   cd client
   npm run build
   ```
   构建后的静态文件将生成在 `client/dist` 目录下。

2. 通过后端提供静态文件服务：
   - 修改 `server/src/index.ts` 以托管 `../client/dist` 目录下的文件。
   - 或者将前端部署到 Vercel/Netlify，将后端部署到 Railway/Heroku。

## 配置项
- **JWT_SECRET**: 为了安全起见，请在生产环境的 `server/.env` 文件中修改此密钥。
- **CORS**: 如果前后端域名不同，请在 `server/src/index.ts` 中更新跨域设置。
