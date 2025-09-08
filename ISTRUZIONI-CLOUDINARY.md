# 🖼️ CONFIGURAZIONE CLOUDINARY PER UPLOAD IMMAGINI

## ✅ IL SISTEMA È GIÀ PRONTO!
Ho già implementato tutto il codice necessario. Devi solo aggiungere le credenziali.

## 📝 PASSAGGI (5 minuti):

### 1. **Registrati su Cloudinary** (GRATIS)
   - Vai su: https://cloudinary.com/users/register/free
   - Registrati con email
   - Conferma l'account

### 2. **Copia le Credenziali**
   - Accedi al Dashboard: https://console.cloudinary.com/console
   - Troverai subito:
     - **Cloud Name**: es. `dxy1234abc`
     - **API Key**: es. `123456789012345`
     - **API Secret**: es. `AbC-123_xYz456`

### 3. **Aggiungi a `.env.local`**
   Togli i # e sostituisci con i tuoi valori:
   ```env
   CLOUDINARY_CLOUD_NAME=il_tuo_cloud_name
   CLOUDINARY_API_KEY=la_tua_api_key
   CLOUDINARY_API_SECRET=il_tuo_api_secret
   ```

### 4. **Aggiungi a Vercel**
   - Vai su: https://vercel.com/[tuo-username]/[tuo-progetto]/settings/environment-variables
   - Aggiungi le stesse 3 variabili:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
   - Click "Save"

### 5. **Rideploya su Vercel**
   ```bash
   git add .
   git commit -m "Aggiunto supporto Cloudinary"
   git push
   ```

## 🎉 FATTO!
Ora puoi caricare immagini direttamente dal pannello admin, sia in locale che su Vercel!

## 🔍 COME FUNZIONA:
- **In locale senza Cloudinary**: salva in `public/images/foto_prodotti/`
- **In locale con Cloudinary**: carica su Cloudinary
- **Su Vercel con Cloudinary**: carica su Cloudinary ✅
- **Su Vercel senza Cloudinary**: mostra avviso di usare URL esterni

## 💡 VANTAGGI CLOUDINARY:
- **25 GB gratis** al mese
- **Ottimizzazione automatica** (WebP, compressione)
- **CDN globale** (immagini velocissime)
- **Ridimensionamento automatico** a 800x800px max
- **Nessun problema** con filesystem read-only

## ❓ PROBLEMI?
Se non funziona:
1. Verifica di aver copiato bene le credenziali
2. Controlla che non ci siano spazi extra
3. Riavvia il server locale: `npm run dev`
4. Su Vercel, aspetta che il deploy finisca (2-3 minuti)