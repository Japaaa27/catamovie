@echo off
echo ========================================
echo   DIAGNOSTICO - Verificando .env
echo ========================================
echo.

echo [1] Verificando se arquivo .env existe...
if exist .env (
    echo    [OK] Arquivo .env EXISTE!
    echo.
    echo [2] Conteudo do arquivo .env:
    echo    ----------------------------
    type .env
    echo    ----------------------------
) else (
    echo    [ERRO] Arquivo .env NAO ENCONTRADO!
    echo.
    echo    SOLUCAO:
    echo    1. No VSCode, crie um arquivo chamado .env
    echo    2. Coloque na RAIZ do projeto (mesma pasta que package.json)
    echo    3. Cole isso dentro:
    echo.
    echo    DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
    echo.
)

echo.
echo [3] Verificando pasta atual...
echo    Voce esta em: %CD%
echo.

echo [4] Arquivos na raiz do projeto:
dir /b *.json *.ts .env* 2>nul

echo.
echo ========================================
pause
