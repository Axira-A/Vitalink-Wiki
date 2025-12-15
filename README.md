# Vitalink Wiki 项目

一由Rutsunine主创的个人 OC 知识库网站。

## 项目结构
- `client/`: 基于 React + Vite 的前端应用。
- `server/`: 基于 Node.js + Express + Prisma 的后端应用。

## 文档列表
- [部署指南](DEPLOY.md) - 如何安装和运行项目。
- [用户手册](MANUAL.md) - 如何使用网站功能。
- [测试策略](TESTING.md) - 测试计划与验证方案。

## 快速开始

### 方案一：一键启动 (Windows)
1. 确保已安装 **Node.js**。
2. 双击根目录下的 `start_dev.bat` 文件。
   - 该脚本将自动安装依赖、初始化数据库，并同时启动客户端和服务器。

### 方案二：手动启动
1. **服务端 (Server)**:
   ```bash
   cd server
   npm install
   npx prisma db push
   npm start
   ```
2. **客户端 (Client)**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 常见问题 (Troubleshooting)
- **"npm is not recognized"**: 请前往 [nodejs.org](https://nodejs.org/) 下载并安装 Node.js。如果已经安装，请尝试重启电脑或终端。
