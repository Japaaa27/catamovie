@echo off
chcp 65001 >nul
echo 🎬 Iniciando CataMovie...
echo.
npx cross-env NODE_ENV=development tsx server/index-dev.ts
