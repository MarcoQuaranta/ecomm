# 🚀 GUIDA RAPIDA MIGRAZIONE DATABASE

## ⏱️ In 5 Minuti

### 1️⃣ **Esegui Migrazione** (3 min)

```bash
npm run db:migrate:v2
```

Aspetta che completi. Vedrai:
- ✅ Backup creato
- ✅ Nuove tabelle create
- ✅ Dati migrati

### 2️⃣ **Verifica** (1 min)

```bash
npm run db:migrate:v2:verify
```

Tutti i test devono essere ✅

### 3️⃣ **Switch** (1 min)

Modifica **un solo file**: `src/lib/db.ts`

```typescript
// PRIMA:
export * from './db-postgres';

// DOPO:
export * from './db-adapter';
```

### 4️⃣ **Testa App**

```bash
npm run dev
```

Apri http://localhost:3000 e verifica:
- [ ] Homepage carica
- [ ] Prodotti visibili
- [ ] Categorie funzionano
- [ ] Admin panel OK

### ✅ FATTO!

Il tuo database è ora:
- ✅ Flessibile (JSONB attributes)
- ✅ Sicuro (soft delete)
- ✅ Tracciato (audit trail)
- ✅ Scalabile (performance)

---

## 🆘 Se Qualcosa Va Storto

```bash
npm run db:rollback
```

Torna tutto come prima in 10 secondi.

---

## 📚 Documentazione Completa

- **README Migrazione**: `scripts/migration/README.md` (tutto quello che devi sapere)
- **Riepilogo Completo**: `MIGRATION-SUMMARY.md` (architettura dettagliata)
- **Esempi Codice**: `examples/v2-usage-examples.ts` (10 esempi pratici)

---

## 🎯 Comandi Utili

```bash
# Migrazione completa
npm run db:migrate:v2

# Solo backup
npm run db:migrate:v2:backup

# Solo schema
npm run db:migrate:v2:schema

# Solo dati
npm run db:migrate:v2:data

# Verifica post-migrazione
npm run db:migrate:v2:verify

# Rollback completo
npm run db:rollback
```

---

## 💡 Nuove Feature Disponibili

### Attributi Dinamici (NO ALTER TABLE!)

```typescript
// Aggiungi qualsiasi campo senza migrazione!
await updateProduct(id, {
  attributes: {
    brand: 'Samsung',
    warranty_months: 24,
    specs: {
      ram: '8GB',
      storage: '256GB'
    }
  }
});
```

### Soft Delete & Restore

```typescript
// Elimina (recuperabile!)
await deleteProduct(id);

// Ripristina
await restoreProduct(id);
```

### History Automatico

```typescript
// Vedi tutte le modifiche
const history = await getProductHistory(id);

// Rollback a versione precedente
const previous = history[1].data;
await updateProduct(id, previous);
```

### Varianti Prodotto

```typescript
// Taglie, colori, SKU multipli
await addVariant({
  productId: product.id,
  sku: 'PROD-RED-M',
  variantName: 'Rosso - M',
  attributes: {
    color: 'Rosso',
    size: 'M'
  }
});
```

---

## ⚠️ Note Importanti

1. **Backup automatico**: Salvato in `backups/backup-latest.json`
2. **Vecchie tabelle**: INTATTE, non toccate
3. **Zero downtime**: App funziona durante migrazione
4. **Rollback**: Sempre possibile

---

## 🎉 Dopo la Migrazione

Il database **non si "sputtanerà"** più perché:

- ❌ PRIMA: Aggiungere campo = `ALTER TABLE` (blocca DB)
- ✅ ADESSO: Aggiungere campo = `UPDATE attributes` (istantaneo)

- ❌ PRIMA: Delete = dati persi per sempre
- ✅ ADESSO: Soft delete = recuperabile

- ❌ PRIMA: Nessun tracking modifiche
- ✅ ADESSO: History automatico di tutto

---

**Pronto? GO! 🚀**

```bash
npm run db:migrate:v2
```
