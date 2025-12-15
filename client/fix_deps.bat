@echo off
echo Installing missing dependencies...
call npm install react-markdown remark-gfm lucide-react --save --legacy-peer-deps
echo Done. Please restart your dev server.
pause
