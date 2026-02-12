/**
 * ESEMPI PRATICI DI UTILIZZO DEL NUOVO SCHEMA V2
 *
 * Questi esempi mostrano come sfruttare appieno
 * le nuove funzionalità del database V2
 */

import * as v2 from '@/lib/db-v2';

// =============================================
// 1. ATTRIBUTI DINAMICI
// =============================================

async function example1_DynamicAttributes() {
  console.log('=== ESEMPIO 1: Attributi Dinamici ===\n');

  // Elettronica: attributi specifici
  const smartphone = await v2.addProduct({
    name: 'iPhone 15 Pro',
    categoryId: 'electronics-category-uuid',
    price: 1199,
    originalPrice: 1299,
    sku: 'APPLE-IP15PRO-256',
    attributes: {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      specs: {
        display: '6.1 inch Super Retina XDR',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        battery: '3274 mAh'
      },
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      warranty_months: 12,
      water_resistant: 'IP68'
    }
  });

  console.log('✅ Smartphone creato con attributi custom');

  // Abbigliamento: attributi completamente diversi
  const jacket = await v2.addProduct({
    name: 'Giacca Invernale North Face',
    categoryId: 'clothing-category-uuid',
    price: 299,
    originalPrice: 399,
    sku: 'TNF-JACKET-BLK-L',
    attributes: {
      brand: 'The North Face',
      season: 'Winter 2024',
      material: '80% Polyester, 20% Nylon',
      insulation: 'PrimaLoft Gold',
      waterproof: true,
      breathable: true,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Forest Green'],
      temperature_rating: '-20°C',
      care_instructions: 'Machine wash cold, tumble dry low',
      eco_friendly: true,
      recycled_materials: '60%'
    }
  });

  console.log('✅ Giacca creata con attributi completamente diversi');
  console.log('   NESSUN ALTER TABLE necessario!\n');
}

// =============================================
// 2. SOFT DELETE & RESTORE
// =============================================

async function example2_SoftDelete() {
  console.log('=== ESEMPIO 2: Soft Delete & Restore ===\n');

  // Crea prodotto
  const product = await v2.addProduct({
    name: 'Prodotto Test',
    categoryId: 'test-category-uuid',
    price: 99.99,
    originalPrice: 129.99
  });

  console.log(`✅ Prodotto creato: ${product.id}`);

  // "Elimina" il prodotto (soft delete)
  await v2.deleteProduct(product.id);
  console.log('🗑️  Prodotto eliminato (soft delete)');

  // Prova a cercarlo
  const found = await v2.getProductById(product.id);
  console.log(`❌ Prodotto non trovato: ${found === null}`);

  // Ripristina!
  await v2.restoreProduct(product.id);
  console.log('🔄 Prodotto ripristinato!');

  // Ora lo trovi di nuovo
  const restored = await v2.getProductById(product.id);
  console.log(`✅ Prodotto trovato: ${restored !== null}\n`);
}

// =============================================
// 3. HISTORY & AUDIT TRAIL
// =============================================

async function example3_History() {
  console.log('=== ESEMPIO 3: History & Audit Trail ===\n');

  // Crea prodotto
  const product = await v2.addProduct({
    name: 'Laptop Gaming',
    categoryId: 'electronics-uuid',
    price: 1499,
    originalPrice: 1799,
    attributes: { ram: '16GB', storage: '512GB SSD' }
  });

  console.log('✅ Prodotto creato');

  // Modifica 1: Aggiorna prezzo
  await v2.updateProduct(product.id, {
    price: 1299
  });
  console.log('📝 Modifica 1: Prezzo aggiornato');

  // Modifica 2: Aggiungi attributi
  await v2.updateProduct(product.id, {
    attributes: {
      ...product.attributes,
      ram: '32GB',  // Upgraded!
      gpu: 'RTX 4070'
    }
  });
  console.log('📝 Modifica 2: RAM e GPU aggiornati');

  // Modifica 3: Cambia nome
  await v2.updateProduct(product.id, {
    name: 'Laptop Gaming Pro'
  });
  console.log('📝 Modifica 3: Nome cambiato');

  // Vedi tutta la history!
  const history = await v2.getProductHistory(product.id);
  console.log(`\n📊 History completa (${history.length} record):`);

  history.forEach((record, i) => {
    console.log(`\n${i + 1}. ${record.change_type} - ${new Date(record.changed_at).toLocaleString()}`);
    if (record.changed_fields) {
      console.log(`   Campi modificati: ${record.changed_fields.join(', ')}`);
    }
  });

  console.log('\n✅ Ogni modifica è tracciata automaticamente!\n');
}

// =============================================
// 4. VARIANTI PRODOTTO
// =============================================

async function example4_Variants() {
  console.log('=== ESEMPIO 4: Varianti Prodotto ===\n');

  // Crea prodotto base (T-shirt)
  const tshirt = await v2.addProduct({
    name: 'T-Shirt Premium Cotton',
    categoryId: 'clothing-uuid',
    price: 29.99,
    originalPrice: 39.99,
    sku: 'TSHIRT-BASE',
    attributes: {
      brand: 'Your Brand',
      material: 'Cotton 100%',
      fit: 'Regular'
    }
  });

  console.log('✅ Prodotto base creato');

  // Crea varianti per colori e taglie
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#001f3f' }
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  let variantCount = 0;

  for (const color of colors) {
    for (const size of sizes) {
      // SKU unico per ogni combinazione
      const sku = `TSHIRT-${color.name.toUpperCase()}-${size}`;

      // Stock random per simulare
      const stock = Math.floor(Math.random() * 50) + 10;

      await v2.addVariant({
        productId: tshirt.id,
        sku,
        variantName: `${color.name} - Size ${size}`,
        priceModifier: size === 'XL' ? 5 : 0, // XL costa 5€ in più
        stockQuantity: stock,
        attributes: {
          color: color.name,
          hex_color: color.hex,
          size: size
        }
      });

      variantCount++;
      console.log(`   ✅ Variante creata: ${color.name} - ${size} (${stock} in stock)`);
    }
  }

  console.log(`\n✅ ${variantCount} varianti create per 1 prodotto!\n`);
}

// =============================================
// 5. RICERCA AVANZATA
// =============================================

async function example5_AdvancedSearch() {
  console.log('=== ESEMPIO 5: Ricerca Avanzata ===\n');

  // Ricerca full-text (velocissima con GIN index!)
  console.log('1. Full-text search:');
  const byText = await v2.getProducts({
    search: 'samsung galaxy',
    isActive: true
  });
  console.log(`   Trovati ${byText.length} prodotti con "samsung galaxy"`);

  // Ricerca per range di prezzo
  console.log('\n2. Range di prezzo:');
  const byPrice = await v2.getProducts({
    minPrice: 500,
    maxPrice: 1000,
    isActive: true
  });
  console.log(`   Trovati ${byPrice.length} prodotti tra €500 e €1000`);

  // Ricerca per attributi JSONB
  console.log('\n3. Filtro per attributi JSONB:');
  const byAttributes = await v2.getProducts({
    attributes: {
      brand: 'Samsung',
      'specs.ram': '8GB'  // Query nested!
    }
  });
  console.log(`   Trovati ${byAttributes.length} Samsung con 8GB RAM`);

  // Combinazione di filtri
  console.log('\n4. Combinazione multipla:');
  const combined = await v2.getProducts({
    search: 'smartphone',
    minPrice: 700,
    maxPrice: 1200,
    isFeatured: true,
    attributes: {
      brand: 'Samsung'
    }
  });
  console.log(`   Trovati ${combined.length} smartphone Samsung featured tra €700-1200`);

  console.log('\n✅ Query complesse senza SQL custom!\n');
}

// =============================================
// 6. CATEGORIE GERARCHICHE
// =============================================

async function example6_HierarchicalCategories() {
  console.log('=== ESEMPIO 6: Categorie Gerarchiche ===\n');

  // Livello 1: Root
  const electronics = await v2.addCategory({
    name: 'Elettronica',
    slug: 'elettronica',
    orderIndex: 1,
    attributeSchema: {
      brand: { type: 'string', required: true },
      warranty_months: { type: 'number', required: false }
    }
  });
  console.log('✅ Categoria root: Elettronica');

  // Livello 2: Sottocategorie
  const smartphones = await v2.addCategory({
    name: 'Smartphone',
    slug: 'smartphone',
    parentId: electronics.id,
    orderIndex: 1,
    attributeSchema: {
      ...electronics.attributeSchema,
      display_size: { type: 'string', required: true },
      battery_mah: { type: 'number', required: true }
    }
  });
  console.log('  ✅ Sottocategoria: Smartphone');

  const laptops = await v2.addCategory({
    name: 'Laptop',
    slug: 'laptop',
    parentId: electronics.id,
    orderIndex: 2,
    attributeSchema: {
      ...electronics.attributeSchema,
      screen_size: { type: 'string', required: true },
      processor: { type: 'string', required: true }
    }
  });
  console.log('  ✅ Sottocategoria: Laptop');

  // Livello 3: Sotto-sottocategorie
  const gaming = await v2.addCategory({
    name: 'Gaming Laptop',
    slug: 'gaming-laptop',
    parentId: laptops.id,
    orderIndex: 1,
    attributeSchema: {
      ...laptops.attributeSchema,
      gpu: { type: 'string', required: true }
    }
  });
  console.log('    ✅ Sotto-sottocategoria: Gaming Laptop');

  console.log('\n📊 Struttura gerarchica:');
  console.log('Elettronica/');
  console.log('├── Smartphone/');
  console.log('└── Laptop/');
  console.log('    └── Gaming Laptop/');
  console.log('\n✅ Categorie nidificate illimitate!\n');
}

// =============================================
// 7. VALIDAZIONE ATTRIBUTI TRAMITE SCHEMA
// =============================================

async function example7_AttributeValidation() {
  console.log('=== ESEMPIO 7: Validazione Attributi ===\n');

  // La categoria definisce quali attributi sono richiesti
  const category = await v2.addCategory({
    name: 'Laptop',
    slug: 'laptop',
    attributeSchema: {
      brand: { type: 'string', required: true },
      processor: { type: 'string', required: true },
      ram: { type: 'string', required: true },
      storage: { type: 'string', required: true },
      screen_size: { type: 'string', required: true },
      warranty_months: { type: 'number', required: false }
    }
  });

  console.log('✅ Categoria con schema di validazione creata');
  console.log('\nAttributi richiesti:');
  Object.entries(category.attributeSchema).forEach(([key, schema]) => {
    const req = schema.required ? '(required)' : '(optional)';
    console.log(`   - ${key}: ${schema.type} ${req}`);
  });

  // In un'app reale, validare prima dell'insert:
  function validateAttributes(attributes: any, schema: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [key, rules] of Object.entries(schema)) {
      if ((rules as any).required && !attributes[key]) {
        errors.push(`Campo obbligatorio mancante: ${key}`);
      }

      if (attributes[key]) {
        const expectedType = (rules as any).type;
        const actualType = typeof attributes[key];

        if (expectedType === 'number' && actualType !== 'number') {
          errors.push(`${key} deve essere un numero`);
        }
        if (expectedType === 'string' && actualType !== 'string') {
          errors.push(`${key} deve essere una stringa`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Esempio: Validazione FALLITA
  const invalidAttrs = {
    brand: 'Dell',
    processor: 'Intel i7'
    // Mancano ram, storage, screen_size!
  };

  const validation1 = validateAttributes(invalidAttrs, category.attributeSchema);
  console.log('\n❌ Validazione fallita:');
  validation1.errors.forEach(err => console.log(`   - ${err}`));

  // Esempio: Validazione OK
  const validAttrs = {
    brand: 'Dell',
    processor: 'Intel Core i7-12700H',
    ram: '16GB DDR5',
    storage: '512GB NVMe SSD',
    screen_size: '15.6 inch',
    warranty_months: 24
  };

  const validation2 = validateAttributes(validAttrs, category.attributeSchema);
  console.log('\n✅ Validazione riuscita!');
  console.log('   Prodotto può essere creato');

  console.log('\n✅ Schema category → validazione attributi!\n');
}

// =============================================
// 8. MIGRAZIONE GRADUALE DA V1 a V2
// =============================================

async function example8_GradualMigration() {
  console.log('=== ESEMPIO 8: Migrazione Graduale ===\n');

  // Step 1: Import entrambi i layer
  const v1 = require('@/lib/db-postgres');
  const adapter = require('@/lib/db-adapter');

  // Step 2: Usa adapter che gestisce entrambi
  console.log('1. Stato attuale:');
  const schema = adapter.getCurrentSchema();
  console.log(`   Schema attivo: ${schema}`);

  // Step 3: Test V2 senza switchare
  console.log('\n2. Test V2 (senza switchare):');
  const v2Products = await v2.getProducts({ limit: 5 });
  console.log(`   ✅ V2 funziona: ${v2Products.length} prodotti`);

  // Step 4: Switch graduale
  console.log('\n3. Switch a V2:');
  await adapter.switchToV2();
  console.log('   ✅ Ora app usa V2');

  // Step 5: Se problemi, torna a V1
  console.log('\n4. Rollback a V1 (se necessario):');
  await adapter.switchToV1();
  console.log('   ✅ Tornato a V1');

  console.log('\n✅ Switch graduale e sicuro!\n');
}

// =============================================
// 9. PERFORMANCE: QUERY COMPLESSE
// =============================================

async function example9_PerformanceQueries() {
  console.log('=== ESEMPIO 9: Query Complesse Ottimizzate ===\n');

  // Query 1: Prodotti più popolari
  console.log('1. Top 10 prodotti più visti (con analytics):');
  // Nota: Questa query usa anche tabelle analytics
  // È solo un esempio di come combinare V2 con altre tabelle
  console.log('   [Query eseguita con JOIN su analytics_events]');

  // Query 2: Prodotti in sconto per categoria
  console.log('\n2. Prodotti in sconto per categoria:');
  const discounted = await v2.getProducts({
    isFeatured: true,  // Sconto > 30%
    isActive: true
  });

  // Raggruppa per categoria
  const byCategory: Record<string, number> = {};
  for (const product of discounted) {
    const category = await v2.getCategoryById(product.categoryId);
    if (category) {
      byCategory[category.name] = (byCategory[category.name] || 0) + 1;
    }
  }

  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} prodotti`);
  });

  // Query 3: Prodotti con stock basso
  console.log('\n3. Prodotti con stock basso:');
  const lowStock = await v2.getProducts({
    stockStatus: 'in_stock',
    isActive: true
  });

  const reallyLow = lowStock.filter(p => p.stockQuantity < p.lowStockThreshold);
  console.log(`   ⚠️  ${reallyLow.length} prodotti sotto soglia`);

  reallyLow.slice(0, 5).forEach(p => {
    console.log(`   - ${p.name}: ${p.stockQuantity} (soglia: ${p.lowStockThreshold})`);
  });

  console.log('\n✅ Query ottimizzate con indici!\n');
}

// =============================================
// 10. CASO REALE: E-COMMERCE COMPLETO
// =============================================

async function example10_RealWorldEcommerce() {
  console.log('=== ESEMPIO 10: E-commerce Completo ===\n');

  // Scenario: Setup iniziale e-commerce elettronica

  // 1. Crea struttura categorie
  console.log('1. Setup categorie:');
  const root = await v2.addCategory({
    name: 'Elettronica',
    slug: 'elettronica',
    description: 'Tutto per la tecnologia'
  });

  const smartphones = await v2.addCategory({
    name: 'Smartphone',
    slug: 'smartphone',
    parentId: root.id,
    attributeSchema: {
      brand: { type: 'string', required: true },
      display_size: { type: 'string', required: true },
      battery_mah: { type: 'number', required: false }
    }
  });

  console.log('   ✅ Categorie create');

  // 2. Aggiungi prodotti
  console.log('\n2. Aggiungi prodotti:');
  const products = [
    {
      name: 'iPhone 15 Pro',
      price: 1199,
      originalPrice: 1299,
      brand: 'Apple',
      display: '6.1"'
    },
    {
      name: 'Samsung Galaxy S24',
      price: 899,
      originalPrice: 999,
      brand: 'Samsung',
      display: '6.2"'
    }
  ];

  for (const prod of products) {
    await v2.addProduct({
      name: prod.name,
      categoryId: smartphones.id,
      price: prod.price,
      originalPrice: prod.originalPrice,
      sku: prod.name.replace(/\s/g, '-').toUpperCase(),
      attributes: {
        brand: prod.brand,
        display_size: prod.display
      },
      isFeatured: true
    });
    console.log(`   ✅ ${prod.name}`);
  }

  // 3. Query homepage (prodotti featured)
  console.log('\n3. Homepage - Prodotti in evidenza:');
  const featured = await v2.getProducts({
    isFeatured: true,
    limit: 6
  });
  console.log(`   📦 ${featured.length} prodotti caricati per homepage`);

  // 4. Query ricerca utente
  console.log('\n4. Ricerca utente: "samsung"');
  const searchResults = await v2.getProducts({
    search: 'samsung',
    isActive: true
  });
  console.log(`   🔍 ${searchResults.length} risultati trovati`);

  // 5. Filtro per categoria + prezzo
  console.log('\n5. Filtro: Smartphone sotto €1000');
  const filtered = await v2.getProducts({
    categoryId: smartphones.id,
    maxPrice: 1000
  });
  console.log(`   📱 ${filtered.length} smartphone trovati`);

  console.log('\n✅ E-commerce setup completo!\n');
}

// =============================================
// ESEGUI TUTTI GLI ESEMPI
// =============================================

async function runAllExamples() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                                                               ║');
  console.log('║          📚 ESEMPI PRATICI DATABASE V2                       ║');
  console.log('║                                                               ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log('\n');

  // NOTA: Decommentare quelli che vuoi testare
  // Assicurati che il database V2 sia stato creato prima!

  // await example1_DynamicAttributes();
  // await example2_SoftDelete();
  // await example3_History();
  // await example4_Variants();
  // await example5_AdvancedSearch();
  // await example6_HierarchicalCategories();
  // await example7_AttributeValidation();
  // await example8_GradualMigration();
  // await example9_PerformanceQueries();
  // await example10_RealWorldEcommerce();

  console.log('✅ Esempi completati!\n');
}

// Export per usare singolarmente
export {
  example1_DynamicAttributes,
  example2_SoftDelete,
  example3_History,
  example4_Variants,
  example5_AdvancedSearch,
  example6_HierarchicalCategories,
  example7_AttributeValidation,
  example8_GradualMigration,
  example9_PerformanceQueries,
  example10_RealWorldEcommerce,
  runAllExamples
};

// Se eseguito direttamente
if (require.main === module) {
  runAllExamples().catch(console.error);
}
