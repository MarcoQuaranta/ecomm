# PowerWind X — Stato Lavori

## Prodotto
- **Nome**: PowerWind X™
- **Tipo**: Decespugliatore a batteria telescopico (71-210 cm)
- **Venditore**: Mirko
- **Cartella**: `src/app/mirko/powerwind/`
- **Immagini**: `public/images/mirko/powerwind/` (carosello: 7, angle: 4, recensioni: 4 — tutte webp)

## STATO: COMPLETATO (Fase 1 + 3 + 4)

### Fase 1 — Copy italiano
- content.json creato e revisionato
- 4 feature box: SmartTorque, 4 Lame, Taglia-bordi, Telescopico
- Linguaggio semplificato, offerta/package accorpati (7 voci)

### Fase 3 — Traduzioni (5 nazioni × 2 piattaforme = 10 landing)
| Nazione | Lingua | Prezzo | Cartelle |
|---------|--------|--------|----------|
| Croazia | Croato | 104€ → 69€ | powerwind-hr-gg, powerwind-hr-fb |
| Bulgaria | Bulgaro (cirillico) | 119€ → 79€ | powerwind-bg-gg, powerwind-bg-fb |
| Polonia | Polacco | 449 zł → 299 zł | powerwind-pl-gg, powerwind-pl-fb |
| Spagna | Spagnolo (EU) | 111€ → 74€ | powerwind-es-gg, powerwind-es-fb |
| Portogallo | Portoghese (EU) | 111€ → 74€ | powerwind-pt-gg, powerwind-pt-fb |

- Tutte revisionate (zero testi italiani, zero errori grammaticali)
- Nomi/città recensioni adattati per ogni paese

### Fase 4 — Tracciamento
- **Google Ads ID**: AW-17935100960
- **Facebook Pixel**: 1576025786901423
- **Network**: Uncapped Network (offers.uncappednetwork.com/forms/api/)
- Conversion labels per nazione inserite
- ty/page.tsx con conversione hardcodata (gtag per -gg, fbq per -fb)
- page.tsx con networkConfig (uid/key diversi per GG e FB)
- fingerprintScript e clickPixel in tutti i content.json
- Test curl: 10/10 superati (code 200)
