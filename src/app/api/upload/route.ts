import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    // In produzione o se Cloudinary è configurato, usa Cloudinary
    if (process.env.NODE_ENV === 'production' || isCloudinaryConfigured()) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        return NextResponse.json({ 
          url: cloudinaryUrl,
          message: 'Immagine caricata su Cloudinary con successo' 
        });
      } catch (error) {
        // Se Cloudinary fallisce in produzione, ritorna placeholder
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ 
            url: 'https://via.placeholder.com/400x400?text=Immagine+Prodotto',
            message: 'Cloudinary non configurato. Usa URL esterni o configura Cloudinary in .env.local' 
          });
        }
        // In sviluppo, continua con upload locale
      }
    }

    // Upload locale (solo in sviluppo se Cloudinary non è configurato)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'foto_prodotti');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate random filename
    const randomName = `product_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const fileExtension = file.name.split('.').pop();
    const filename = `${randomName}.${fileExtension}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/images/foto_prodotti/${filename}`;
    
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}