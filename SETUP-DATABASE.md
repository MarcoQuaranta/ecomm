# 🚀 Setup Database PostgreSQL con Neon

## Configurazione Completa

### 1. Variabili d'ambiente Locale (.env.local)
```env
POSTGRES_URL="postgresql://neondb_owner:npg_UhKAJz3S1uCT@ep-ancient-wind-adjnpm05-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_UhKAJz3S1uCT@ep-ancient-wind-adjnpm05.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_DATABASE="neondb"
```

### 2. Configurazione su Vercel

1. Vai su **Vercel Dashboard** → Il tuo progetto
2. Clicca su **Settings** → **Environment Variables**
3. Aggiungi queste variabili:
   - `POSTGRES_URL` → (stessa stringa che usi in locale)
   - `POSTGRES_URL_NON_POOLING` → (stessa stringa che usi in locale)
   - `POSTGRES_DATABASE` → neondb

### 3. Migrazione Dati

Per migrare i prodotti esistenti dal JSON al database:

```bash
# Prima migrazione (inserisce tutti i prodotti)
npm run db:migrate

# Forza sovrascrittura (cancella tutto e reinserisce)
npm run db:migrate:force

# Aggiungi solo nuovi prodotti (salta quelli esistenti)
npm run db:migrate:append
```

### 4. Test Locale

```bash
# Avvia il server di sviluppo
npm run dev

# Vai su http://localhost:3000/admin/dashboard
# Prova ad aggiungere/modificare/eliminare prodotti
```

### 5. Deploy su Vercel

```bash
# Commit e push
git add .
git commit -m "Migrazione a PostgreSQL con Neon"
git push

# Vercel farà il deploy automaticamente
```

## 🎯 Cosa è cambiato

### Prima (JSON):
- ❌ Modifiche solo in locale
- ❌ File system read-only su Vercel
- ❌ Dati persi ad ogni deploy

### Ora (PostgreSQL):
- ✅ Database cloud condiviso
- ✅ Modifiche persistenti ovunque
- ✅ Stesso database per locale e produzione
- ✅ Backup automatici su Neon

## 📝 Note Importanti

1. **Stesso database ovunque**: Stai usando lo stesso database Neon sia in locale che su Vercel
2. **Attenzione ai test**: Quando testi in locale, stai modificando i dati di produzione
3. **Backup**: Neon fa backup automatici, ma puoi anche esportare i dati dal loro dashboard

## 🔧 Comandi Utili

```bash
# Vedi i log del database
npm run dev

# Controlla lo stato del database su Neon
# Vai su: https://console.neon.tech

# Se qualcosa va storto, ripristina dal JSON
npm run db:migrate:force
```

## 🐛 Troubleshooting

### Errore "relation does not exist"
La tabella verrà creata automaticamente al primo avvio o alla prima migrazione.

### Errore di connessione
Controlla che le variabili d'ambiente siano corrette in `.env.local`

### Prodotti non salvati su Vercel
Assicurati di aver configurato le variabili d'ambiente su Vercel (vedi punto 2)

## ✨ Funzionalità Database

Il sistema ora supporta:
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Ricerca per categoria
- ✅ Prodotti random per homepage
- ✅ Slug automatici
- ✅ Timestamp automatici (created_at, updated_at)
- ✅ Prezzi decimali precisi
- ✅ Transazioni sicure