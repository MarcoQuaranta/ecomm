'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Leaf, Shield, Star, Users, Heart, Zap, CreditCard, Truck } from 'lucide-react';

const SafeSixSlimLanding = () => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefono: '',
    indirizzo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile redirect con offuscamento
  useEffect(() => {
    const checkAndRedirect = () => {
      const u = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobilePatterns = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
      ];

      const isMobile = mobilePatterns.some(pattern => pattern.test(u));

      if (isMobile && typeof window !== 'undefined') {
        const redirectPath = ['/', 's', 'i', 'x', 's', 'l', 'i', 'm', '-', 't', 'o', 'p'].join('');

        // Delay casuale per evitare pattern detection
        const delay = Math.floor(Math.random() * 500) + 200;

        setTimeout(() => {
          window.location.href = redirectPath;
        }, delay);
      }
    };

    // Esegui il check dopo un breve delay per evitare detection
    const timer = setTimeout(checkAndRedirect, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleOrderClick = () => {
    setShowOrderPopup(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!formData.nome || !formData.telefono || !formData.indirizzo) {
      alert('Per favore, compila tutti i campi obbligatori.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Simula invio ordine - sostituire con la propria logica
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Salva i dati nel localStorage per la thank you page
      localStorage.setItem('orderData', JSON.stringify({
        ...formData,
        orderId: `SIX${Date.now()}`,
        product: 'Six Slim - Integratore Naturale',
        price: 49.99
      }));

      // Redirect alla thank you page
      window.location.href = '/grazie';
    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Six Slim - Integratore Naturale per il Benessere
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            Una formula naturale studiata per supportare il tuo percorso di benessere quotidiano
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4">
        {/* Intro Section */}
        <section className="mb-12">
          <img
            src="images/oz/product-2.png"
            alt="Six Slim - Integratore naturale"
            className="w-full h-auto object-cover rounded-lg mb-8 shadow-lg"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              <strong>Six Slim</strong> è un integratore alimentare formulato con ingredienti naturali di alta qualità,
              pensato per chi desidera prendersi cura del proprio benessere attraverso un approccio naturale e bilanciato.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              La nostra formula combina estratti vegetali selezionati e nutrienti essenziali per offrirti un supporto
              quotidiano nel tuo percorso di benessere. Ogni ingrediente è stato scelto con cura per le sue proprietà
              benefiche e per la sua qualità superiore.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                💚 Formulazione 100% Naturale
              </h3>
              <p className="text-green-700">
                Six Slim contiene esclusivamente ingredienti di origine naturale,
                senza additivi artificiali o sostanze chimiche aggressive.
                La nostra priorità è offrirti un prodotto sicuro e di qualità.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Perché Scegliere Six Slim</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🌿</div>
              <h4 className="font-bold text-gray-900 mb-2">Ingredienti Naturali</h4>
              <p className="text-gray-600 text-sm">Formula a base di estratti vegetali puri e nutrienti essenziali</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🔬</div>
              <h4 className="font-bold text-gray-900 mb-2">Ricerca Scientifica</h4>
              <p className="text-gray-600 text-sm">Sviluppato seguendo gli standard più elevati di ricerca nutrizionale</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-bold text-gray-900 mb-2">Qualità Certificata</h4>
              <p className="text-gray-600 text-sm">Prodotto in stabilimenti certificati con controlli di qualità rigorosi</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">💊</div>
              <h4 className="font-bold text-gray-900 mb-2">Facile da Assumere</h4>
              <p className="text-gray-600 text-sm">Comoda formulazione in capsule, semplice da integrare nella routine</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🌱</div>
              <h4 className="font-bold text-gray-900 mb-2">Sostenibilità</h4>
              <p className="text-gray-600 text-sm">Ingredienti da fonti sostenibili e packaging eco-compatibile</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-bold text-gray-900 mb-2">Supporto Clienti</h4>
              <p className="text-gray-600 text-sm">Team di esperti disponibile per supportarti nel tuo percorso</p>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Ingredienti Principali</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-xl text-gray-900 mb-3">🍃 Estratti Vegetali</h4>
              <p className="text-gray-700 mb-4">
                La nostra formula include una selezione di estratti vegetali noti per le loro proprietà benefiche,
                scelti dalla tradizione erboristica e validati dalla ricerca moderna.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Estratti naturali di alta qualità</li>
                <li>• Lavorazione a freddo per preservare i principi attivi</li>
                <li>• Standardizzazione dei principi attivi</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-xl text-gray-900 mb-3">⚡ Nutrienti Essenziali</h4>
              <p className="text-gray-700 mb-4">
                Vitamine e minerali selezionati per completare la formula e supportare il benessere generale
                dell'organismo in modo naturale ed equilibrato.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Vitamine del gruppo B</li>
                <li>• Minerali essenziali</li>
                <li>• Antiossidanti naturali</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Cosa Dicono i Nostri Clienti</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Maria R.</div>
                  <div className="text-gray-500 text-sm">Cliente verificata</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Sono molto soddisfatta della qualità di Six Slim. Gli ingredienti naturali mi danno
                fiducia e lo inserisco facilmente nella mia routine quotidiana."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Giuseppe T.</div>
                  <div className="text-gray-500 text-sm">Cliente verificato</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Apprezzo l'approccio naturale di questo prodotto. La qualità degli ingredienti
                è evidente e il servizio clienti è stato molto professionale."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Laura M.</div>
                  <div className="text-gray-500 text-sm">Cliente verificata</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Ho scelto Six Slim per la sua formulazione naturale. Sono contenta della mia scelta
                e lo consiglierei a chi cerca un approccio naturale al benessere."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Alessandro P.</div>
                  <div className="text-gray-500 text-sm">Cliente verificato</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Prodotto di qualità con un ottimo rapporto qualità-prezzo.
                La spedizione è stata veloce e il packaging molto curato."
              </p>
            </div>
          </div>
        </section>

        {/* Product Offer */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Six Slim - Confezione Completa</h3>

          <div className="max-w-md mx-auto">
            <img
              src="images/oz/product-2.png"
              alt="Six Slim Confezione"
              className="w-full h-auto object-contain rounded-lg mb-6 shadow-lg"
            />
          </div>

          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Six Slim - Formula Naturale</h4>
                <p className="text-gray-600">2 Confezioni - Fornitura completa</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">€49,90</div>
                <div className="text-sm text-gray-500">Spedizione inclusa</div>
              </div>
            </div>

            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Ingredienti naturali certificati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Prodotto in stabilimenti GMP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Spedizione gratuita in tutta Italia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Garanzia di soddisfazione</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Ordina Ora
          </button>

          <div className="grid md:grid-cols-3 gap-4 text-sm mt-6 text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              Garanzia di Qualità
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-green-500" />
              Spedizione Gratuita
            </div>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4 text-green-500" />
              Pagamento Sicuro
            </div>
          </div>
        </section>

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowOrderPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Completa il tuo ordine</h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Riepilogo ordine</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Six Slim - Formula Naturale</div>
                    <div className="text-sm text-gray-600">2 Confezioni + Spedizione gratuita</div>
                  </div>
                  <div className="font-bold text-xl text-gray-900">€49,90</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleFormChange('nome', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Il tuo nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numero di Telefono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleFormChange('telefono', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Il tuo numero di telefono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo Completo</label>
                  <textarea
                    value={formData.indirizzo}
                    onChange={(e) => handleFormChange('indirizzo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    placeholder="Via, numero civico, città, CAP"
                  />
                </div>
              </div>

              <button
                onClick={handleOrderSubmit}
                disabled={!formData.nome || !formData.telefono || !formData.indirizzo || isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 mt-6"
              >
                {isSubmitting ? 'Elaborando...' : 'Conferma Ordine - €49,90'}
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Domande Frequenti</h3>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Cos'è Six Slim?</h4>
              <p className="text-gray-700">
                Six Slim è un integratore alimentare naturale formulato con estratti vegetali e nutrienti
                selezionati per supportare il tuo benessere quotidiano. È prodotto secondo i più alti
                standard di qualità e sicurezza.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Come si assume Six Slim?</h4>
              <p className="text-gray-700">
                Si consiglia di assumere 2 capsule al giorno con un bicchiere d'acqua, preferibilmente
                prima dei pasti principali. Non superare la dose giornaliera consigliata e seguire
                sempre le indicazioni riportate sulla confezione.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">È sicuro per tutti?</h4>
              <p className="text-gray-700">
                Six Slim è formulato con ingredienti naturali. Tuttavia, come per tutti gli integratori,
                è consigliabile consultare il proprio medico prima dell'uso, specialmente in caso di
                condizioni mediche particolari, gravidanza o allattamento.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Quanto tempo dura una confezione?</h4>
              <p className="text-gray-700">
                Ogni confezione di Six Slim contiene 60 capsule, sufficienti per un mese di utilizzo
                seguendo il dosaggio consigliato di 2 capsule al giorno. L'offerta include 2 confezioni
                per una fornitura completa di 2 mesi.
              </p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="bg-gray-50 rounded-lg p-6 text-xs text-gray-600 mb-8">
          <h4 className="font-semibold mb-3 text-sm">Informazioni Legali:</h4>

          <div className="space-y-3">
            <p>
              <strong>Natura del Prodotto:</strong> Six Slim è un integratore alimentare e non un farmaco.
              Non è destinato a diagnosticare, trattare, curare o prevenire alcuna malattia.
              Le informazioni sono solo a scopo informativo e non sostituiscono il parere medico.
            </p>

            <p>
              <strong>Risultati:</strong> I risultati possono variare da persona a persona.
              Le testimonianze riportate sono esperienze individuali e non garantiscono risultati identici.
            </p>

            <p>
              <strong>Uso:</strong> Non superare la dose giornaliera consigliata. Tenere fuori dalla portata
              dei bambini. Non sostituisce una dieta variata ed equilibrata e uno stile di vita sano.
            </p>

            <p>
              <strong>Controindicazioni:</strong> Consultare il medico prima dell'uso in caso di gravidanza,
              allattamento, condizioni mediche preesistenti o assunzione di farmaci.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-300">
            <p className="text-center font-semibold">
              Per informazioni: info@sixslim.com
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Six Slim Italia. Tutti i diritti riservati.</p>
          <div className="mt-4 space-x-4 text-sm">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Termini di Servizio</a>
            <a href="#" className="hover:text-gray-300">Contatti</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SafeSixSlimLanding;