@echo off
chcp 65001 >nul
cls
echo ========================================
echo   🎬 CataMovie - Setup Automático
echo   Windows Edition
echo ========================================
echo.
echo Este script vai:
echo [1] Instalar biblioteca dotenv
echo [2] Verificar/Criar arquivo .env
echo [3] Corrigir arquivos do código
echo [4] Instalar todas dependências
echo [5] Popular banco com 6 filmes
echo [6] Iniciar o servidor
echo.
echo ========================================
echo.
pause
cls

REM ====================================
REM PASSO 1: Instalar dotenv
REM ====================================
echo.
echo [1/6] Instalando biblioteca dotenv...
echo ----------------------------------------
call npm install dotenv
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dotenv
    pause
    exit /b %errorlevel%
)
echo [OK] Dotenv instalado!
echo.

REM ====================================
REM PASSO 2: Criar .env se não existir
REM ====================================
echo [2/6] Verificando arquivo .env...
echo ----------------------------------------
if not exist .env (
    echo DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require> .env
    echo [OK] Arquivo .env criado!
) else (
    echo [OK] Arquivo .env ja existe
)
echo.
echo Conteúdo do .env:
type .env
echo.
echo.

REM ====================================
REM PASSO 3: Fazer backup dos arquivos
REM ====================================
echo [3/6] Fazendo backup dos arquivos originais...
echo ----------------------------------------
if not exist db\index.ts.backup copy db\index.ts db\index.ts.backup >nul 2>&1
if not exist server\index-dev.ts.backup copy server\index-dev.ts server\index-dev.ts.backup >nul 2>&1
if not exist server\seed.ts.backup copy server\seed.ts server\seed.ts.backup >nul 2>&1
if not exist server\app.ts.backup copy server\app.ts server\app.ts.backup >nul 2>&1
echo [OK] Backups criados (.backup)
echo.

REM ====================================
REM PASSO 4: Corrigir db/index.ts
REM ====================================
echo [4/6] Corrigindo arquivos para Windows...
echo ----------------------------------------

REM Verificar se db/index.ts já tem dotenv
findstr /C:"dotenv/config" db\index.ts >nul 2>&1
if %errorlevel% neq 0 (
    echo Corrigindo db\index.ts...
    powershell -Command "(Get-Content db\index.ts) | ForEach-Object { if ($_ -match '^import.*drizzle') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Set-Content db\index.ts.tmp"
    move /y db\index.ts.tmp db\index.ts >nul 2>&1
    echo [OK] db\index.ts corrigido
) else (
    echo [OK] db\index.ts ja possui dotenv
)

REM Verificar se server/index-dev.ts já tem dotenv
findstr /C:"dotenv/config" server\index-dev.ts >nul 2>&1
if %errorlevel% neq 0 (
    echo Corrigindo server\index-dev.ts...
    powershell -Command "(Get-Content server\index-dev.ts) | ForEach-Object { if ($_ -match '^import.*fs') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Set-Content server\index-dev.ts.tmp"
    move /y server\index-dev.ts.tmp server\index-dev.ts >nul 2>&1
    echo [OK] server\index-dev.ts corrigido
) else (
    echo [OK] server\index-dev.ts ja possui dotenv
)

REM Verificar se server/seed.ts já tem dotenv
findstr /C:"dotenv/config" server\seed.ts >nul 2>&1
if %errorlevel% neq 0 (
    echo Corrigindo server\seed.ts...
    powershell -Command "(Get-Content server\seed.ts) | ForEach-Object { if ($_ -match '^import.*db') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Set-Content server\seed.ts.tmp"
    move /y server\seed.ts.tmp server\seed.ts >nul 2>&1
    echo [OK] server\seed.ts corrigido
) else (
    echo [OK] server\seed.ts ja possui dotenv
)

REM Corrigir host em server/app.ts
findstr /C:"127.0.0.1" server\app.ts >nul 2>&1
if %errorlevel% neq 0 (
    echo Corrigindo server\app.ts (host para Windows)...
    powershell -Command "(Get-Content server\app.ts) -replace 'host: \"0\.0\.0\.0\"', 'host: \"127.0.0.1\"' -replace 'reusePort: true,', '' | Set-Content server\app.ts"
    echo [OK] server\app.ts corrigido
) else (
    echo [OK] server\app.ts ja usa 127.0.0.1
)

echo.

REM ====================================
REM PASSO 5: Instalar dependências
REM ====================================
echo [5/6] Instalando todas as dependências...
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
REM PASSO 6: Popular banco
REM ====================================
echo [6/6] Populando banco com filmes...
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
echo Agora você pode:
echo   1. Rodar o servidor: npm run dev
echo   2. Abrir no navegador: http://127.0.0.1:5000
echo.
echo ========================================
echo   Iniciando servidor automaticamente...
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
timeout /t 3 /nobreak >nul

set NODE_ENV=development
call npm run dev
