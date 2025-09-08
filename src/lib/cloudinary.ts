import { v2 as cloudinary } from 'cloudinary';

// Configurazione Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

export async function uploadToCloudinary(file: File): Promise<string> {
  // Verifica che Cloudinary sia configurato
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary non configurato. Aggiungi le credenziali in .env.local');
  }

  try {
    // Converti il file in base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload su Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'rinaldo-products', // Cartella su Cloudinary
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // Limita dimensione max
        { quality: 'auto:best' }, // Ottimizza qualità
        { fetch_format: 'auto' } // Formato automatico (webp dove supportato)
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Errore upload Cloudinary:', error);
    throw new Error('Impossibile caricare l\'immagine');
  }
}

export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}