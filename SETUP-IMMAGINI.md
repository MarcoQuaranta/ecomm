# 📸 Setup Immagini per Produzione (Vercel)

## Il Problema
Vercel ha un filesystem **read-only** in produzione, quindi non puoi salvare immagini sul server.

## Soluzioni Disponibili

### 🌟 Opzione 1: **Cloudinary** (CONSIGLIATA)
1. **Registrati su** [cloudinary.com](https://cloudinary.com)
2. **Copia le credenziali** dal dashboard
3. **Aggiungi a `.env.local`:**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Vantaggi:**
   - 25GB gratis/mese
   - Ottimizzazione automatica
   - CDN globale
   - Resize automatico

### 📦 Opzione 2: **Uploadthing**
1. **Registrati su** [uploadthing.com](https://uploadthing.com)
2. **Crea un'app** e copia la API key
3. **Vantaggi:**
   - 2GB gratis
   - Integrazione Next.js nativa
   - Upload semplice

### 🗃️ Opzione 3: **Supabase Storage**
1. **Usa il tuo account Supabase**
2. **Crea un bucket** per le immagini
3. **Vantaggi:**
   - 1GB gratis
   - Integrato se già usi Supabase

### 🔗 Opzione 4: **URL Esterni** (IMMEDIATA)
**Servizi gratuiti per caricare immagini:**

#### **ImgBB**
1. Vai su [imgbb.com](https://imgbb.com)
2. Carica immagine (senza registrazione)
3. Copia URL diretto
4. Incolla nel pannello admin

#### **Imgur**
1. Vai su [imgur.com](https://imgur.com)
2. Upload → New Post
3. Click destro sull'immagine → "Copia indirizzo immagine"
4. Usa l'URL nel pannello admin

#### **Postimages**
1. Vai su [postimages.org](https://postimages.org)
2. Carica immagine
3. Scegli "Direct link"
4. Copia e usa l'URL

## 🎯 Soluzione Immediata (Senza Codice)

**Per iniziare subito:**

1. **Carica le immagini** su uno dei servizi sopra (ImgBB, Imgur, etc.)
2. **Nel pannello admin**, invece di caricare file:
   - Lascia vuoto il campo upload
   - Incolla l'URL nel campo "Inserisci URL immagine"
3. **Salva il prodotto**

### Esempio URL validi:
```
https://i.imgur.com/abc123.jpg
https://i.ibb.co/xyz789/product.png
https://i.postimg.cc/qwerty/image.jpg
```

## 📝 Setup Cloudinary (Dettagliato)

Se vuoi implementare Cloudinary per upload automatico:

### 1. Registrazione
- Vai su [cloudinary.com](https://cloudinary.com/users/register/free)
- Registrati (gratis)
- Conferma email

### 2. Dashboard
- Accedi al dashboard
- Copia:
  - Cloud Name
  - API Key
  - API Secret

### 3. Configurazione Vercel
- Vai su Vercel → Settings → Environment Variables
- Aggiungi:
  ```
  CLOUDINARY_CLOUD_NAME=tuo_cloud_name
  CLOUDINARY_API_KEY=tua_api_key
  CLOUDINARY_API_SECRET=tuo_api_secret
  ```

### 4. Codice (Opzionale)
Se vuoi implementare l'upload automatico, posso modificare il codice per te.

## ✅ Vantaggi URL Esterni

- **Funziona subito** senza modifiche al codice
- **Gratis** con tutti i servizi citati
- **CDN incluso** (immagini veloci)
- **Nessuna configurazione** richiesta

## 🚀 Raccomandazione

**Per iniziare subito:** Usa URL esterni (ImgBB o Imgur)
**Per soluzione professionale:** Configura Cloudinary

Le immagini attuali che hai già nel database con URL tipo `/images/foto_prodotti/...` non funzioneranno su Vercel. Dovrai:
1. Caricarle su un servizio esterno
2. Aggiornare gli URL nel pannello admin