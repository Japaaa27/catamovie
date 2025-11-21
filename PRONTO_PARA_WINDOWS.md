# ⚡ SETUP WINDOWS - Comandos PowerShell

## 1️⃣ Criar arquivo `.env` na raiz

```env
DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require
```

---

## 2️⃣ Rodar comandos (PowerShell)

### ⚡ Automático:

```powershell
.\setup-windows.bat
```

### 🔧 Manual:

```powershell
npm install
npx tsx server/seed.ts
npm run dev
```

---

## 3️⃣ Abrir navegador

```
http://127.0.0.1:5000
```

---

✅ **Pronto!**
