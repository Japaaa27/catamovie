# ⚡ SETUP WINDOWS - Comandos PowerShell

## 1️⃣ Criar arquivo `.env` na raiz do projeto

Conteúdo do `.env`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
```

---

## 2️⃣ Comandos PowerShell (em sequência)

### Opção A - Automático (Recomendado):

```powershell
.\setup-windows.bat
```

### Opção B - Manual:

```powershell
npm install
```

```powershell
npx tsx server/seed.ts
```

```powershell
npm run dev
```

---

## 3️⃣ Abrir no navegador

```
http://127.0.0.1:5000
```

---

✅ **Pronto!**
