# 🎬 CataMovie

Catálogo de filmes simples feito com React, Express e PostgreSQL.

---

## 🪟 Windows - Instalação Rápida

### Opção 1 - Automático (Recomendado) ⭐

1. Clique duas vezes em **`setup-windows.bat`**
2. Aguarde a instalação
3. Abra: http://127.0.0.1:5000

### Opção 2 - Manual

Veja: **[INSTALACAO_COMPLETA_WINDOWS.md](./INSTALACAO_COMPLETA_WINDOWS.md)**

---

## 💻 Linux / Mac / Replit

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar arquivo `.env`

```env
DATABASE_URL=sua_url_do_postgres
```

### 3. Configurar banco

```bash
npm run db:push
```

### 4. Popular com filmes

```bash
npx tsx server/seed.ts
```

### 5. Rodar

```bash
npm run dev
```

Abra: http://localhost:5000

---

## 📁 Estrutura do Projeto

Apenas **8 arquivos TypeScript** principais!

Veja detalhes completos em: **[ESTRUTURA_DO_PROJETO.md](./ESTRUTURA_DO_PROJETO.md)**

---

## 🛠️ Tecnologias

- React 18 + Vite
- Express + TypeScript
- PostgreSQL + Drizzle ORM
- Tailwind CSS

---

## 📝 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Rodar projeto |
| `npm run db:push` | Atualizar schema do banco |
| `npx tsx server/seed.ts` | Popular banco com filmes |
| `npm run build` | Gerar build de produção |

---

## 🐛 Problemas Comuns

### "DATABASE_URL must be set"
→ Faltou criar o arquivo `.env` com a URL do banco

### Windows: "listen ENOTSUP"
→ Use o script `setup-windows.bat` que corrige automaticamente

### "Cannot find module"
→ Execute `npm install`

---

## 📤 Subir no GitHub

Veja: **[COMO_SUBIR_NO_GITHUB.md](./COMO_SUBIR_NO_GITHUB.md)**

---

## ✨ Funcionalidades

- ✅ Listar filmes
- ✅ Adicionar filme
- ✅ Editar filme
- ✅ Deletar filme
- ✅ Sistema de avaliação (0-5 estrelas)
- ✅ Posters de filmes
- ✅ Banco de dados persistente

---

**Desenvolvido para trabalho acadêmico** 🎓
