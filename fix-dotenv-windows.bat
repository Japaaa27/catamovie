@echo off
echo ========================================
echo   Instalando suporte .env no Windows
echo ========================================
echo.

echo [1/4] Instalando biblioteca dotenv...
call npm install dotenv
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dotenv
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Criando arquivo .env se nao existir...
if not exist .env (
    echo DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require> .env
    echo [OK] Arquivo .env criado!
) else (
    echo [OK] Arquivo .env ja existe
)

echo.
echo [3/4] Verificando conteudo do .env...
type .env

echo.
echo [4/4] Aplicando patch nos arquivos...

REM Backup
if not exist db\index.ts.bak copy db\index.ts db\index.ts.bak >nul
if not exist server\index-dev.ts.bak copy server\index-dev.ts server\index-dev.ts.bak >nul
if not exist server\seed.ts.bak copy server\seed.ts server\seed.ts.bak >nul

REM Adicionar import dotenv no db/index.ts
findstr /C:"dotenv/config" db\index.ts >nul
if %errorlevel% neq 0 (
    echo import "dotenv/config";> db\index.ts.tmp
    type db\index.ts >> db\index.ts.tmp
    move /y db\index.ts.tmp db\index.ts >nul
    echo [OK] db/index.ts atualizado
) else (
    echo [OK] db/index.ts ja tem dotenv
)

REM Adicionar import dotenv no server/index-dev.ts
findstr /C:"dotenv/config" server\index-dev.ts >nul
if %errorlevel% neq 0 (
    echo import "dotenv/config";> server\index-dev.ts.tmp
    type server\index-dev.ts >> server\index-dev.ts.tmp
    move /y server\index-dev.ts.tmp server\index-dev.ts >nul
    echo [OK] server/index-dev.ts atualizado
) else (
    echo [OK] server/index-dev.ts ja tem dotenv
)

REM Adicionar import dotenv no server/seed.ts
findstr /C:"dotenv/config" server\seed.ts >nul
if %errorlevel% neq 0 (
    powershell -Command "(Get-Content server\seed.ts) -replace '^(import)', 'import \"dotenv/config\";`n$1' | Set-Content server\seed.ts"
    echo [OK] server/seed.ts atualizado
) else (
    echo [OK] server/seed.ts ja tem dotenv
)

echo.
echo ========================================
echo   CONCLUIDO! Testando agora...
echo ========================================
echo.

echo Populando banco com dados...
call npx tsx server/seed.ts

echo.
echo ========================================
echo   SUCESSO! Iniciando servidor...
echo ========================================
echo.
echo Abra: http://localhost:5000
echo Pressione Ctrl+C para parar
echo.

set NODE_ENV=development
npx tsx server/index-dev.ts
