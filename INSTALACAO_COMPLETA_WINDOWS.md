# 🪟 Instalação Completa - CataMovie no Windows

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- ✅ **Node.js** (versão 18 ou superior) - [Download aqui](https://nodejs.org/)
- ✅ **Git** (opcional, para clonar do GitHub)
- ✅ **VSCode** (ou outro editor de código)

---

## 🚀 Passo a Passo Completo

### **PASSO 1: Baixar o Projeto**

#### Opção A - Do Replit:
1. No Replit, clique no menu lateral esquerdo (☰)
2. Clique em **"Download as zip"**
3. Extraia o arquivo ZIP na pasta que você quiser

#### Opção B - Do GitHub:
```powershell
git clone https://github.com/Japaaa27/catamovie.git
cd catamovie
```

---

### **PASSO 2: Abrir no VSCode**

1. Abra o **VSCode**
2. **File** → **Open Folder**
3. Selecione a pasta `catamovie`

---

### **PASSO 3: Criar arquivo `.env`**

1. No VSCode, crie um arquivo chamado **`.env`** na **raiz do projeto**
2. Cole este conteúdo:

```env
DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
```

3. **Salve** (Ctrl+S)

> **Nota:** É normal o arquivo ficar "transparente" no explorador do VSCode. Arquivos que começam com ponto (`.env`) aparecem assim!

---

### **PASSO 4: Instalar a biblioteca `dotenv`**

Abra o **PowerShell** (ou Terminal integrado do VSCode: **Ctrl+`**) e execute:

```powershell
npm install dotenv
```

---

### **PASSO 5: Corrigir 3 arquivos do código**

#### **Arquivo 1: `db/index.ts`**

Abra o arquivo `db/index.ts` e adicione essa linha **NO TOPO** (primeira linha):

```typescript
import "dotenv/config";
```

O início do arquivo deve ficar assim:

```typescript
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";
```

**Salve** (Ctrl+S)

---

#### **Arquivo 2: `server/index-dev.ts`**

Abra o arquivo `server/index-dev.ts` e adicione essa linha **NO TOPO** (primeira linha):

```typescript
import "dotenv/config";
```

O início do arquivo deve ficar assim:

```typescript
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";
```

**Salve** (Ctrl+S)

---

#### **Arquivo 3: `server/seed.ts`**

Abra o arquivo `server/seed.ts` e adicione essa linha **NO TOPO** (antes de todos os outros imports):

```typescript
import "dotenv/config";
```

O início do arquivo deve ficar assim:

```typescript
import "dotenv/config";
import { db } from "../db/index";
import { movies } from "@shared/schema";
```

**Salve** (Ctrl+S)

---

#### **Arquivo 4: `server/app.ts`**

Abra o arquivo `server/app.ts` e procure estas linhas **próximo do final** do arquivo:

```typescript
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
```

**SUBSTITUA** por:

```typescript
  const port = parseInt(process.env.PORT || '5000', 10);
  const host = process.env.HOST || "127.0.0.1";
  server.listen({
    port,
    host,
  }, () => {
```

**Salve** (Ctrl+S)

> **Por quê?** Windows não suporta `0.0.0.0` como host, então usamos `127.0.0.1` (IPv4 direto).

---

### **PASSO 6: Instalar todas as dependências**

No PowerShell:

```powershell
npm install
```

Aguarde a instalação completar (pode demorar alguns minutos).

---

### **PASSO 7: Popular o banco com filmes**

```powershell
npx tsx server/seed.ts
```

**Você deve ver:**

```
🌱 Iniciando seed do banco de dados...
✓ Dados antigos removidos
✓ 6 filmes inseridos com sucesso!

🎬 Filmes no banco:
  - O Poderoso Chefão (1972)
  - Pulp Fiction (1994)
  - Clube da Luta (1999)
  - Matrix (1999)
  - Interestelar (2014)
  - A Origem (2010)

✅ Seed concluído!
```

---

### **PASSO 8: Rodar o projeto**

```powershell
npm run dev
```

**Você deve ver:**

```
[vite] running...
serving on port 5000
```

---

### **PASSO 9: Abrir no navegador**

Abra seu navegador e acesse:

```
http://127.0.0.1:5000
```

Ou:

```
http://localhost:5000
```

**Você deve ver a tela com os 6 filmes!** 🎬

---

## 🛠️ Comandos Úteis

### Parar o servidor:
No PowerShell onde está rodando, pressione:
```
Ctrl + C
```

### Popular banco novamente:
```powershell
npx tsx server/seed.ts
```

### Rodar o projeto:
```powershell
npm run dev
```

---

## ❓ Problemas Comuns

### **Erro: "DATABASE_URL must be set"**

**Solução:** Você esqueceu de criar o arquivo `.env` ou ele está vazio.

1. Crie o arquivo `.env` na raiz do projeto
2. Cole: `DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require`
3. Salve

---

### **Erro: "listen ENOTSUP: operation not supported on socket"**

**Solução:** Você não corrigiu o arquivo `server/app.ts`.

1. Abra `server/app.ts`
2. Troque `host: "0.0.0.0"` por `host: "127.0.0.1"`
3. Remova a linha `reusePort: true,`
4. Salve e rode novamente

---

### **Erro: "Expected ';' but found 'nimport'"**

**Solução:** O import do dotenv foi colado errado.

1. Abra o arquivo que deu erro (geralmente `server/seed.ts`)
2. Delete TUDO
3. Cole o conteúdo correto do arquivo (disponível no repositório)
4. Salve

---

### **Porta 5000 já está em uso**

**Solução:** Outro programa está usando a porta 5000.

1. Feche outros programas que possam estar usando a porta
2. Ou mude a porta no `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://...
```

3. Acesse: `http://127.0.0.1:3000`

---

## 📦 Estrutura de Arquivos (Resumo)

```
catamovie/
├── .env                    ← Você cria esse arquivo!
├── client/
│   ├── index.html
│   └── src/
│       └── main.tsx
├── server/
│   ├── app.ts             ← Corrigir host aqui!
│   ├── index-dev.ts       ← Adicionar dotenv!
│   ├── seed.ts            ← Adicionar dotenv!
│   └── routes.ts
├── db/
│   └── index.ts           ← Adicionar dotenv!
├── shared/
│   └── schema.ts
├── package.json
└── README.md
```

---

## ✅ Checklist Final

Antes de rodar, certifique-se:

- [ ] Arquivo `.env` criado e com DATABASE_URL
- [ ] `npm install dotenv` executado
- [ ] Linha `import "dotenv/config";` adicionada em 3 arquivos:
  - [ ] `db/index.ts`
  - [ ] `server/index-dev.ts`
  - [ ] `server/seed.ts`
- [ ] Arquivo `server/app.ts` corrigido (host: `127.0.0.1`)
- [ ] `npm install` executado
- [ ] `npx tsx server/seed.ts` executado com sucesso
- [ ] `npm run dev` rodando sem erros

---

## 🎓 Para Entregar o Trabalho

### **Gerar backup do banco:**

```powershell
npm run db:backup
```

### **Subir no GitHub:**

Siga as instruções no arquivo `COMO_SUBIR_NO_GITHUB.md`

---

## 🆘 Precisa de Ajuda?

Se ainda estiver com problemas:

1. Verifique se seguiu **TODOS** os passos acima
2. Veja a seção **"Problemas Comuns"**
3. Verifique se o Node.js está instalado: `node --version`
4. Certifique-se que está na pasta correta do projeto

---

**Boa sorte com seu trabalho! 🎬🚀**
