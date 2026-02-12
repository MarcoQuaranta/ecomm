import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Estrae info prodotto dal file page.tsx
function extractProductInfo(folderPath: string, folderName: string) {
  const pageFile = path.join(folderPath, 'page.tsx');

  if (!fs.existsSync(pageFile)) {
    return null;
  }

  const content = fs.readFileSync(pageFile, 'utf-8');

  // Estrai nome prodotto
  let name = '';
  const nameMatch1 = content.match(/productName\s*[=:]\s*['"`]([^'"`]+)['"`]/);
  if (nameMatch1) name = nameMatch1[1];

  if (!name) {
    const nameMatch2 = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
    if (nameMatch2) name = nameMatch2[1];
  }

  if (!name) {
    const nameMatch3 = content.match(/<h1[^>]*>([^<]+)</);
    if (nameMatch3) name = nameMatch3[1].trim();
  }

  if (!name) {
    const parts = folderName.replace(/^(fb|gg)-/, '').replace(/-unc$/, '').split('-');
    name = parts.slice(0, -1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  // Estrai prezzo
  let price = 0;
  let originalPrice = 0;

  const priceMatch = content.match(/price\s*[=:]\s*(\d+(?:\.\d+)?)/i);
  if (priceMatch) price = parseFloat(priceMatch[1]);

  if (!price) {
    const euroMatch = content.match(/€\s*(\d+(?:[.,]\d+)?)/);
    if (euroMatch) price = parseFloat(euroMatch[1].replace(',', '.'));
  }

  const origPriceMatch = content.match(/originalPrice\s*[=:]\s*(\d+(?:\.\d+)?)/i);
  if (origPriceMatch) originalPrice = parseFloat(origPriceMatch[1]);

  if (!originalPrice) {
    const lineThroughMatch = content.match(/line-through[^€]*€\s*(\d+(?:[.,]\d+)?)/);
    if (lineThroughMatch) originalPrice = parseFloat(lineThroughMatch[1].replace(',', '.'));
  }

  if (!originalPrice && price) {
    originalPrice = Math.round(price * 1.5);
  }

  // Estrai immagini
  let images: string[] = [];

  const carouselMatch = content.match(/carouselImages\s*[=:]\s*\[([\s\S]*?)\]/);
  if (carouselMatch) {
    const imgMatches = carouselMatch[1].match(/['"`]([^'"`]+)['"`]/g);
    if (imgMatches) {
      images = imgMatches.map(m => m.replace(/['"`]/g, ''));
    }
  }

  if (images.length === 0) {
    const imagesMatch = content.match(/images\s*[=:]\s*\[([\s\S]*?)\]/);
    if (imagesMatch) {
      const imgMatches = imagesMatch[1].match(/['"`]([^'"`]+\.(?:png|jpg|jpeg|webp|gif))['"`]/gi);
      if (imgMatches) {
        images = imgMatches.map(m => m.replace(/['"`]/g, ''));
      }
    }
  }

  if (images.length === 0) {
    const srcMatches = content.match(/src=["']?(\/images\/[^"'\s>]+)/g);
    if (srcMatches) {
      const uniqueImages = [...new Set(srcMatches.map(m => m.replace(/src=["']?/, '')))];
      images = uniqueImages.slice(0, 5);
    }
  }

  // Estrai descrizione
  let description = '';
  const descMatch = content.match(/description\s*[=:]\s*['"`]([^'"`]+)['"`]/);
  if (descMatch) description = descMatch[1];

  // Determina categoria
  let category = 'altro';
  const lowerName = name.toLowerCase();
  const lowerFolder = folderName.toLowerCase();

  if (lowerName.includes('clima') || lowerName.includes('air') || lowerName.includes('condiz')) {
    category = 'per-la-casa';
  } else if (lowerName.includes('robot') || lowerName.includes('aspira')) {
    category = 'per-la-casa';
  } else if (lowerName.includes('dongle') || lowerName.includes('tv') || lowerName.includes('cuffi') || lowerName.includes('auric')) {
    category = 'elettronica';
  } else if (lowerName.includes('soffia') || lowerName.includes('cesoia') || lowerName.includes('giard')) {
    category = 'giardinaggio';
  } else if (lowerFolder.includes('airwave') || lowerFolder.includes('robot')) {
    category = 'per-la-casa';
  } else if (lowerFolder.includes('dongle') || lowerFolder.includes('cuffie')) {
    category = 'elettronica';
  } else if (lowerFolder.includes('soffia') || lowerFolder.includes('cesoia')) {
    category = 'giardinaggio';
  }

  return {
    name: name || folderName,
    description: description || `Prodotto ${name}`,
    price: price || 99,
    originalPrice: originalPrice || 149,
    category,
    image: images[0] || '/images/placeholder.png',
    images: images.length > 0 ? images : ['/images/placeholder.png']
  };
}

export async function POST() {
  try {
    const appDir = path.join(process.cwd(), 'src', 'app');
    const foldersOutputFile = path.join(process.cwd(), 'src', 'lib', 'landing-folders.json');
    const productsOutputFile = path.join(process.cwd(), 'src', 'lib', 'products-data.json');

    const landingPattern = /^(fb|gg)-/;
    const entries = fs.readdirSync(appDir, { withFileTypes: true });

    const folders: string[] = [];
    const productsData: Record<string, ReturnType<typeof extractProductInfo>> = {};

    for (const entry of entries) {
      if (entry.isDirectory() && landingPattern.test(entry.name)) {
        folders.push(entry.name);

        const match = entry.name.match(/^(fb|gg)-(.+?)-([a-z]{2})(-unc)?$/);
        if (match) {
          const productKey = match[2];

          if (!productsData[productKey]) {
            const folderPath = path.join(appDir, entry.name);
            const info = extractProductInfo(folderPath, entry.name);
            if (info) {
              productsData[productKey] = info;
            }
          }
        }
      }
    }

    folders.sort();

    // Salva entrambi i file
    fs.writeFileSync(foldersOutputFile, JSON.stringify(folders, null, 2));
    fs.writeFileSync(productsOutputFile, JSON.stringify(productsData, null, 2));

    return NextResponse.json({
      success: true,
      landingsCount: folders.length,
      productsCount: Object.keys(productsData).length,
      products: Object.keys(productsData)
    });
  } catch (error) {
    console.error('Errore scansione landing:', error);
    return NextResponse.json({
      success: false,
      error: 'Errore durante la scansione'
    }, { status: 500 });
  }
}
