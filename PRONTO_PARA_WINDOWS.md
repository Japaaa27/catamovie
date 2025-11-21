# ⚡ COPIAR E COLAR - Windows PowerShell

## 1️⃣ Criar arquivo `.env` (copie e cole no PowerShell)

```powershell
"DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require" | Out-File -FilePath .env -Encoding utf8 -NoNewline
```

---

## 2️⃣ Instalar e rodar tudo (copie TUDO de uma vez e cole)

```powershell
npm install; npx tsx server/seed.ts; npm run dev
```

---

## 3️⃣ Abrir navegador

```
http://127.0.0.1:5000
```

---

✅ **Pronto! Só 2 comandos!**
