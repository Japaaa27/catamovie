# 🪟 Como Rodar CataMovie no Windows

## ✅ ATUALIZAÇÃO: Agora funciona no Windows!

O projeto foi atualizado com suporte a `.env` no Windows usando a biblioteca `dotenv`.

---

## 🚀 SOLUÇÃO RÁPIDA

### 1. Criar arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com:

```env
DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
```

### 2. Instalar dependências

```powershell
npm install
```

### 3. Criar tabelas no banco

```powershell
npx drizzle-kit push
```

Se der erro, force:

```powershell
npx drizzle-kit push --force
```

### 4. Popular com dados (6 filmes)

```powershell
npx tsx server/seed.ts
```

### 5. Rodar o projeto

```powershell
npx tsx server/index-dev.ts
```

Ou simplesmente:

```powershell
npm run dev
```

(Agora funciona no Windows também!)

### 6. Abrir no navegador

```
http://localhost:5000
```

---

## 🚀 ATALHO - Comandos em sequência

Cole tudo de uma vez no PowerShell:

```powershell
npm install
npx drizzle-kit push --force
npx tsx server/seed.ts
$env:NODE_ENV="development"; npx tsx server/index-dev.ts
```

Depois abra: http://localhost:5000

---

## 🔄 Para rodar novamente depois

```powershell
$env:NODE_ENV="development"; npx tsx server/index-dev.ts
```

Ou simplesmente:

```powershell
npx tsx server/index-dev.ts
```

---

## 🆘 Problemas Comuns

### "DATABASE_URL must be set"
- Verifique se criou o arquivo `.env` na raiz
- Verifique se tem a linha `DATABASE_URL=...`

### "psql: command not found" 
- Não precisa do psql! Use `npx tsx server/seed.ts`

### "Port 5000 already in use"
- Feche outros programas usando porta 5000
- Ou mude a porta no código

### Vulnerabilities no npm
- Pode ignorar (são avisos, não erros)
- Ou rode: `npm audit fix`
