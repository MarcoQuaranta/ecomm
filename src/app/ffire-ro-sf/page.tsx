'use client';

import React, { useState } from 'react';
import { CheckCircle, Shield, Star, Truck, CreditCard } from 'lucide-react';

const CleanFatOnFireLanding = () => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefono: '',
    indirizzo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderClick = () => {
    setShowOrderPopup(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!formData.nome || !formData.telefono || !formData.indirizzo) {
      alert('Te rugăm să completezi toate câmpurile obligatorii.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const completeData = {
        ...formData,
        timestamp: Math.floor(Date.now() / 1000),
        product: 'FatOnFire - Supliment Natural',
        price: 219.00
      };

      // Simulare API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Comanda ta a fost înregistrată cu succes! Vei fi contactat în curând.');
      setShowOrderPopup(false);
      setFormData({ nome: '', telefono: '', indirizzo: '' });
    } catch (error) {
      console.error('Eroare:', error);
      alert('A apărut o eroare. Te rugăm să încerci din nou.');
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
            FatOnFire - Suplimentul Natural pentru Controlul Apetitului
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            O formulă naturală concepută pentru a susține obiectivele tale de wellness
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4">

        {/* Product Image */}
        <section className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
            <img
              src="/images/fatonfire/product.webp"
              alt="FatOnFire Supliment Natural"
              className="w-64 h-auto mx-auto object-contain rounded-lg mb-6"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
          <h3 className="text-3xl font-bold text-center mb-2">De Ce Să Alegi FatOnFire</h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Un supliment natural formulat cu ingrediente de calitate
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🌿</div>
              <h4 className="font-bold text-gray-900 mb-2">Ingrediente Naturale</h4>
              <p className="text-gray-600 text-sm">Formulă bazată pe extracte vegetale și compuși naturali</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-bold text-gray-900 mb-2">Calitate Premium</h4>
              <p className="text-gray-600 text-sm">Produs în fabrici certificate cu standarde înalte de calitate</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-900 mb-2">Formulă Unică</h4>
              <p className="text-gray-600 text-sm">Combinație specială de 7 ingrediente naturale</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">💊</div>
              <h4 className="font-bold text-gray-900 mb-2">Ușor de Utilizat</h4>
              <p className="text-gray-600 text-sm">Capsule practice pentru administrare zilnică</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-gray-900 mb-2">Preț Accesibil</h4>
              <p className="text-gray-600 text-sm">Soluție economică pentru rutina ta de wellness</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🔬</div>
              <h4 className="font-bold text-gray-900 mb-2">Testat pentru Calitate</h4>
              <p className="text-gray-600 text-sm">Fiecare lot este testat pentru puritate și potență</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-center mb-2">Experiențele Utilizatorilor</h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Ce spun cei care au încercat FatOnFire
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Maria P., 45 ani</div>
                  <div className="text-gray-500 text-sm">București</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Am fost plăcut surprinsă de calitatea produsului. Este ușor de integrat în rutina zilnică și am observat o îmbunătățire a stării generale de bine."</p>
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Gheorghe T., 52 ani</div>
                  <div className="text-gray-500 text-sm">Cluj</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Produsul mi se pare de bună calitate. Am apreciat faptul că este formulat cu ingrediente naturale și este ușor de administrat."</p>
            </div>
          </div>
        </section>

        {/* Offer */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Oferta Noastră</h3>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">219 LEI</div>
              <div className="text-xl">2 Cutii - Tratament pentru 2 Luni</div>
              <div className="text-sm text-blue-100 mt-2">
                Preț special pentru pachetul complet
              </div>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-6 px-8 rounded-lg text-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl mb-4"
          >
            COMANDĂ ACUM
          </button>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Garanție de Calitate
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              Livrare Rapidă
            </div>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Plată la Livrare
            </div>
          </div>
        </section>

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                onClick={() => setShowOrderPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Completează Comanda</h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Rezumatul comenzii</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">FatOnFire - 2 Cutii</div>
                    <div className="text-sm text-green-600">✅ Livrare gratuită</div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">219 LEI</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nume și Prenume</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleFormChange('nome', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Numele tău complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numărul de Telefon</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleFormChange('telefono', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Numărul tău de telefon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresa Completă</label>
                  <textarea
                    value={formData.indirizzo}
                    onChange={(e) => handleFormChange('indirizzo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    placeholder="Strada, numărul, orașul, codul poștal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 my-4 text-gray-700">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Plată la livrare</span>
              </div>

              <button
                onClick={handleOrderSubmit}
                disabled={!formData.nome || !formData.telefono || !formData.indirizzo || isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? 'SE PROCESEAZĂ...' : 'CONFIRMĂ COMANDA - 219 LEI'}
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-center mb-6">Întrebări Frecvente</h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Ce este FatOnFire?</h4>
              <p className="text-gray-700">FatOnFire este un supliment alimentar natural formulat cu o combinație unică de 7 ingrediente naturale, conceput pentru a susține obiectivele tale de wellness într-un mod natural și sigur.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Cum se administrează?</h4>
              <p className="text-gray-700">Se recomandă administrarea a 2 capsule pe zi, conform instrucțiunilor de pe ambalaj. Este important să citești și să urmezi instrucțiunile de utilizare pentru cea mai bună experiență.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Este sigur de utilizat?</h4>
              <p className="text-gray-700">FatOnFire este formulat cu ingrediente naturale și este produs respectând standardele de calitate. Ca pentru orice supliment, se recomandă consultarea unui specialist înainte de utilizare, mai ales dacă ai condiții medicale preexistente.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Oferă garanție?</h4>
              <p className="text-gray-700">Da, oferim o garanție de satisfacție pentru calitatea produsului nostru. Pentru detalii complete despre politica de returnare, te rugăm să ne contactezi.</p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 mb-8">
          <h4 className="font-semibold mb-3">Informații Importante:</h4>
          <div className="space-y-2">
            <p>
              <strong>Natura Produsului:</strong> FatOnFire este un supliment alimentar și nu un medicament.
              Nu este destinat să diagnosticheze, să trateze, să vindece sau să prevină vreo boală.
            </p>
            <p>
              <strong>Rezultate:</strong> Rezultatele pot varia de la persoană la persoană.
              Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos.
            </p>
            <p>
              <strong>Consultare Medicală:</strong> Se recomandă consultarea unui medic înainte de utilizare,
              mai ales în cazul condițiilor medicale preexistente, sarcinii, alăptării sau utilizării de medicamente.
            </p>
            <p>
              <strong>Siguranță:</strong> A se păstra departe de accesul copiilor. Nu depăși doza zilnică recomandată.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 FatOnFire România. Toate drepturile rezervate.</p>
          <div className="mt-4 space-x-4 text-sm">
            <a href="#" className="hover:text-gray-300">Politica de Confidențialitate</a>
            <a href="#" className="hover:text-gray-300">Termeni și Condiții</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CleanFatOnFireLanding;