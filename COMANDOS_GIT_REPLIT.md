# 🚀 Enviar CataMovie para GitHub pelo Replit Shell

## ⚠️ ANTES DE TUDO

1. Crie um Personal Access Token:
   - Acesse: https://github.com/settings/tokens/new
   - Note: `catamovie-replit`
   - Marque: ✅ **repo** (todas opções)
   - Clique em "Generate token"
   - **COPIE O TOKEN** (começa com `ghp_`)

## 📋 COMANDOS PARA O SHELL DO REPLIT

Cole os comandos abaixo **UM DE CADA VEZ** no Shell do Replit:

### 1. Remover origin antigo (se houver erro)
```bash
git remote remove origin
```

### 2. Adicionar seu repositório
```bash
git remote add origin https://github.com/Japaaa27/catamovie.git
```

### 3. Verificar branch atual
```bash
git branch
```

### 4. Se não estiver em 'main', criar e trocar
```bash
git checkout -b main
```

### 5. Adicionar todos arquivos
```bash
git add .
```

### 6. Fazer commit
```bash
git commit -m "Initial commit - CataMovie projeto de faculdade"
```

### 7. Enviar para GitHub (VAI PEDIR AUTENTICAÇÃO)
```bash
git push -u origin main
```

**Quando pedir:**
- **Username:** Japaaa27
- **Password:** COLE O TOKEN (não sua senha!) → `ghp_xxxxxxxxxxxx`

---

## 🎯 FORMA MAIS FÁCIL (sem pedir senha toda vez)

### Opção A: Usar URL com Token
```bash
# 1. Remover origin
git remote remove origin

# 2. Adicionar novos arquivos e fazer commit
git add .
git commit -m "Initial commit - CataMovie"

# 3. Criar branch main
git branch -M main

# 4. Adicionar com token na URL (SUBSTITUA SEU_TOKEN)
git remote add origin https://Japaaa27:SEU_TOKEN_AQUI@github.com/Japaaa27/catamovie.git

# 5. Push direto (não pede senha!)
git push -u origin main
```

### Opção B: Usar Secret do Replit (RECOMENDADO)
```bash
# 1. No Replit, vá em Tools → Secrets
# 2. Crie um Secret:
#    Nome: GIT_URL
#    Valor: https://Japaaa27:SEU_TOKEN@github.com/Japaaa27/catamovie.git

# 3. Use no Shell:
git push $GIT_URL main
```

---

## ✅ Verificar se deu certo

Acesse no navegador:
```
https://github.com/Japaaa27/catamovie
```

Deve aparecer todos os arquivos! 🎉

---

## 🔒 ARQUIVOS QUE **NÃO** VÃO PRO GIT

Estes estão protegidos pelo `.gitignore`:
- ❌ `.env` (senhas)
- ❌ `database_backup.sql` (dados reais)
- ❌ `node_modules/` (dependências)
- ❌ Arquivos `*.sql`

---

## 🆘 PROBLEMAS COMUNS

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Japaaa27/catamovie.git
```

### "Authentication failed"
- Use o TOKEN, não sua senha do GitHub
- Token deve ter permissão `repo`

### "Permission denied"
- Verifique se você é dono do repositório
- Confirme que copiou o token corretamente

### Atualizar depois de mudanças
```bash
git add .
git commit -m "Descrição das alterações"
git push
```
