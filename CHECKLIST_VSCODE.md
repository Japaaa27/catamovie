# ✅ Checklist VSCode - Windows

Use este guia rápido ao abrir o projeto no VSCode pela primeira vez.

---

## 🔲 ANTES DE COMEÇAR

- [ ] Node.js instalado (verificar: `node --version`)
- [ ] VSCode instalado
- [ ] Projeto baixado e extraído

---

## 🔲 PASSO 1: Abrir Projeto

- [ ] Abrir VSCode
- [ ] File → Open Folder
- [ ] Selecionar pasta `catamovie`

---

## 🔲 PASSO 2: Criar `.env`

- [ ] Clique direito na raiz do projeto (explorador esquerdo)
- [ ] New File
- [ ] Nome: `.env`
- [ ] Colar dentro:

```
DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
```

- [ ] Salvar (Ctrl+S)
- [ ] ✅ Arquivo `.env` criado (pode ficar transparente, é normal!)

---

## 🔲 PASSO 3: Abrir Terminal

- [ ] Pressionar **Ctrl + `** (ou View → Terminal)
- [ ] Terminal PowerShell aberto na parte inferior

---

## 🔲 PASSO 4: Rodar Setup

**Escolha uma opção:**

### Opção A - Automático ⭐
- [ ] Digitar: `.\setup-windows.bat`
- [ ] Aguardar instalação completa
- [ ] ✅ Ver mensagem "Setup Concluído!"

### Opção B - Manual
- [ ] Digitar: `npm install`
- [ ] Aguardar instalação
- [ ] Digitar: `npx tsx server/seed.ts`
- [ ] Ver 6 filmes inseridos
- [ ] Digitar: `npm run dev`

---

## 🔲 PASSO 5: Verificar

- [ ] Terminal mostra: `serving on port 5000`
- [ ] Abrir navegador: http://127.0.0.1:5000
- [ ] ✅ Ver título "CataMovie"
- [ ] ✅ Ver 6 filmes com posters

---

## ✅ PRONTO!

Se marcou todos ✅ acima, está funcionando perfeitamente!

---

## 🆘 Se der problema:

Veja: `INSTALACAO_COMPLETA_WINDOWS.md`

---

**Projeto pronto no VSCode!** 🎉
