# ⚡ Guia Rápido - Windows

## 🚀 Setup Automático (30 segundos)

1. **Baixe o projeto** do Replit ou GitHub
2. **Clique duas vezes** em `setup-windows.bat`
3. **Aguarde** a instalação
4. **Abra** http://127.0.0.1:5000

✅ **PRONTO!**

---

## 🔧 Comandos Essenciais

### Rodar o projeto:
```powershell
npm run dev
```

### Parar o servidor:
```
Ctrl + C
```

### Popular banco novamente:
```powershell
npx tsx server/seed.ts
```

---

## 📝 Arquivos que você precisa

| Arquivo | O que fazer |
|---------|------------|
| `.env` | Criar com DATABASE_URL |
| `setup-windows.bat` | Rodar clicando duas vezes |

---

## ❌ Erros Comuns

### "DATABASE_URL must be set"
→ Faltou criar o arquivo `.env`

### "listen ENOTSUP"
→ Rode o `setup-windows.bat` que ele corrige

### "Cannot find module"
→ Rode `npm install`

---

## 🆘 Precisa de Ajuda?

Veja o guia completo: **[INSTALACAO_COMPLETA_WINDOWS.md](./INSTALACAO_COMPLETA_WINDOWS.md)**

---

**Acesse:** http://127.0.0.1:5000 🎬
