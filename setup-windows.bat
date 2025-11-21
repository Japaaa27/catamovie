@echo off
chcp 65001 >nul
cls
echo ========================================
echo   🎬 CataMovie - Setup Automático
echo   Windows Edition
echo ========================================
echo.
echo Este script vai:
echo [1] Instalar dependências (dotenv e cross-env)
echo [2] Verificar/Criar arquivo .env
echo [3] Popular banco com 6 filmes
echo [4] Iniciar o servidor
echo.
echo ========================================
echo.
pause
cls

REM ====================================
REM PASSO 1: Instalar dependências
REM ====================================
echo.
echo [1/4] Instalando dependências...
echo ----------------------------------------
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependências
    pause
    exit /b %errorlevel%
)
echo [OK] Dependências instaladas!
echo.

REM ====================================
REM PASSO 2: Criar .env se não existir
REM ====================================
echo [2/4] Verificando arquivo .env...
echo ----------------------------------------
if not exist .env (
    echo DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require> .env
    echo [OK] Arquivo .env criado!
) else (
    echo [OK] Arquivo .env ja existe
)
echo.

REM ====================================
REM PASSO 3: Popular banco
REM ====================================
echo [3/4] Populando banco com filmes...
echo ----------------------------------------
call npx tsx server/seed.ts
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao popular banco
    echo Verifique se o DATABASE_URL no .env está correto
    pause
    exit /b %errorlevel%
)
echo.

REM ====================================
REM SUCESSO!
REM ====================================
cls
echo ========================================
echo   ✅ SETUP CONCLUÍDO COM SUCESSO!
echo ========================================
echo.
echo O projeto está pronto para rodar!
echo.
echo ========================================
echo   Iniciando servidor automaticamente...
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
timeout /t 3 /nobreak >nul

call npm run dev
