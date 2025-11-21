# 🚀 Como Subir o CataMovie no GitHub

## 📦 Método Recomendado: Exportar do Replit

### Passo 1: Baixar o Projeto
1. No Replit, clique nos **3 pontinhos** ⋮ ao lado do nome
2. Clique em **"Download as ZIP"**
3. Extraia o ZIP em alguma pasta

### Passo 2: Criar Repositório no GitHub
1. Acesse https://github.com
2. Clique em **"New repository"** (botão verde)
3. Nome: `catamovie`
4. **NÃO** marque nenhuma opção (README, .gitignore, etc)
5. Clique em **"Create repository"**
6. **Copie a URL** que aparece (ex: `https://github.com/seu-usuario/catamovie.git`)

### Passo 3: Abrir Terminal na Pasta
**Windows:**
- Abra a pasta extraída
- Clique na barra de endereço
- Digite `cmd` e Enter

**Mac/Linux:**
- Botão direito na pasta → "Open in Terminal"

### Passo 4: Comandos Git
Cole esses comandos **um de cada vez**:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar arquivos
git add .

# 3. Fazer commit
git commit -m "Initial commit - CataMovie"

# 4. Renomear branch
git branch -M main

# 5. Conectar ao GitHub (COLE SUA URL!)
git remote add origin https://github.com/SEU-USUARIO/catamovie.git

# 6. Enviar para o GitHub
git push -u origin main
```

### Passo 5: Autenticação
Se pedir senha, use um **Personal Access Token**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → Marque `repo`
3. Copie o token e use como senha

## ✅ Verificar
Atualize a página do repositório no GitHub!
Todos os arquivos devem estar lá! 🎉

## 🔒 Segurança
Os seguintes arquivos **NÃO vão** para o GitHub (protegidos pelo .gitignore):
- ✅ `.env` (senhas)
- ✅ `database_backup.sql` (dados reais)
- ✅ `node_modules/` (dependências)

## 📝 Arquivos que VÃO para o GitHub:
- ✅ Todo o código fonte
- ✅ `README.md` (instruções)
- ✅ `.env.example` (template sem senhas)
- ✅ `server/seed.ts` (dados de exemplo)
- ✅ `.gitignore` (proteção)

## 🆘 Problemas Comuns

### "git: command not found"
Instale o Git: https://git-scm.com/downloads

### "Permission denied"
Use Personal Access Token em vez de senha

### "Already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/catamovie.git
```

### Atualizar depois de mudanças
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```
