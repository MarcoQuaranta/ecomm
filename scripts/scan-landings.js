/**
 * Script che scansiona le cartelle landing in src/app/
 * e genera automaticamente la lista prodotti con info estratte dai file
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app');
const outputFile = path.join(__dirname, '..', 'src', 'lib', 'landing-folders.json');
const productsOutputFile = path.join(__dirname, '..', 'src', 'lib', 'products-data.json');

// Pattern per le landing: fb-* o gg-*
const landingPattern = /^(fb|gg)-/;

// Estrae info prodotto dal file page.tsx
function extractProductInfo(folderPath, folderName) {
  const pageFile = path.join(folderPath, 'page.tsx');

  if (!fs.existsSync(pageFile)) {
    return null;
  }

  const content = fs.readFileSync(pageFile, 'utf-8');

  // Estrai nome prodotto (cerca pattern comuni)
  let name = '';

  // Pattern 1: productName = "..."
  const nameMatch1 = content.match(/productName\s*[=:]\s*['"`]([^'"`]+)['"`]/);
  if (nameMatch1) name = nameMatch1[1];

  // Pattern 2: name: "..." in un oggetto
  if (!name) {
    const nameMatch2 = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
    if (nameMatch2) name = nameMatch2[1];
  }

  // Pattern 3: <h1> o title con nome prodotto
  if (!name) {
    const nameMatch3 = content.match(/<h1[^>]*>([^<]+)</);
    if (nameMatch3) name = nameMatch3[1].trim();
  }

  // Pattern 4: PRODUCT_NAME o simili
  if (!name) {
    const nameMatch4 = content.match(/PRODUCT[_\s]?NAME\s*[=:]\s*['"`]([^'"`]+)['"`]/i);
    if (nameMatch4) name = nameMatch4[1];
  }

  // Fallback: usa il nome della cartella formattato
  if (!name) {
    const parts = folderName.replace(/^(fb|gg)-/, '').replace(/-unc$/, '').split('-');
    name = parts.slice(0, -1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  // Estrai prezzo
  let price = 0;
  let originalPrice = 0;

  // Pattern: price: 89 o price = 89
  const priceMatch = content.match(/price\s*[=:]\s*(\d+(?:\.\d+)?)/i);
  if (priceMatch) price = parseFloat(priceMatch[1]);

  // Pattern: €89 o € 89
  if (!price) {
    const euroMatch = content.match(/€\s*(\d+(?:[.,]\d+)?)/);
    if (euroMatch) price = parseFloat(euroMatch[1].replace(',', '.'));
  }

  // Pattern: originalPrice o prezzo originale barrato
  const origPriceMatch = content.match(/originalPrice\s*[=:]\s*(\d+(?:\.\d+)?)/i);
  if (origPriceMatch) originalPrice = parseFloat(origPriceMatch[1]);

  // Pattern: line-through con prezzo
  if (!originalPrice) {
    const lineThroughMatch = content.match(/line-through[^€]*€\s*(\d+(?:[.,]\d+)?)/);
    if (lineThroughMatch) originalPrice = parseFloat(lineThroughMatch[1].replace(',', '.'));
  }

  if (!originalPrice && price) {
    originalPrice = Math.round(price * 1.5); // Default 50% sconto
  }

  // Estrai immagini
  let images = [];

  // Pattern 1: carouselImages = [...]
  const carouselMatch = content.match(/carouselImages\s*[=:]\s*\[([\s\S]*?)\]/);
  if (carouselMatch) {
    const imgMatches = carouselMatch[1].match(/['"`]([^'"`]+)['"`]/g);
    if (imgMatches) {
      images = imgMatches.map(m => m.replace(/['"`]/g, ''));
    }
  }

  // Pattern 2: images = [...] o images: [...]
  if (images.length === 0) {
    const imagesMatch = content.match(/images\s*[=:]\s*\[([\s\S]*?)\]/);
    if (imagesMatch) {
      const imgMatches = imagesMatch[1].match(/['"`]([^'"`]+\.(?:png|jpg|jpeg|webp|gif))['"`]/gi);
      if (imgMatches) {
        images = imgMatches.map(m => m.replace(/['"`]/g, ''));
      }
    }
  }

  // Pattern 3: cerca src="/images/..." nel file
  if (images.length === 0) {
    const srcMatches = content.match(/src=["']?(\/images\/[^"'\s>]+)/g);
    if (srcMatches) {
      const uniqueImages = [...new Set(srcMatches.map(m => m.replace(/src=["']?/, '')))];
      images = uniqueImages.slice(0, 5); // Max 5 immagini
    }
  }

  // Estrai descrizione
  let description = '';
  const descMatch = content.match(/description\s*[=:]\s*['"`]([^'"`]+)['"`]/);
  if (descMatch) description = descMatch[1];

  // Determina categoria basata sul contenuto o nome
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

function scanLandingFolders() {
  const folders = [];
  const productsData = {};

  try {
    const entries = fs.readdirSync(appDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && landingPattern.test(entry.name)) {
        folders.push(entry.name);

        // Estrai il nome base del prodotto (senza prefisso e nazione)
        const match = entry.name.match(/^(fb|gg)-(.+?)-([a-z]{2})(-unc)?$/);
        if (match) {
          const productKey = match[2];

          // Se non abbiamo già info per questo prodotto, estraile
          if (!productsData[productKey]) {
            const folderPath = path.join(appDir, entry.name);
            const info = extractProductInfo(folderPath, entry.name);
            if (info) {
              productsData[productKey] = info;
              console.log(`  ✓ ${productKey}: ${info.name} - €${info.price}`);
            }
          }
        }
      }
    }

    // Ordina alfabeticamente
    folders.sort();

    console.log(`\nTrovate ${folders.length} landing pages`);
    console.log(`Estratti ${Object.keys(productsData).length} prodotti unici\n`);

    // Salva lista cartelle
    fs.writeFileSync(outputFile, JSON.stringify(folders, null, 2));
    console.log(`Lista cartelle salvata in: ${outputFile}`);

    // Salva dati prodotti
    fs.writeFileSync(productsOutputFile, JSON.stringify(productsData, null, 2));
    console.log(`Dati prodotti salvati in: ${productsOutputFile}`);

    return { folders, productsData };
  } catch (error) {
    console.error('Errore nella scansione:', error);
    return { folders: [], productsData: {} };
  }
}

scanLandingFolders();
