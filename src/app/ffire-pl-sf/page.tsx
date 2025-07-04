'use client';

import React, { useState } from 'react';
import { CheckCircle, Shield, Star, Truck, CreditCard } from 'lucide-react';

const CleanFatOnFireLandingPolish = () => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [formData, setFormData] = useState({
    imie: '',
    telefon: '',
    adres: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderClick = () => {
    setShowOrderPopup(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!formData.imie || !formData.telefon || !formData.adres) {
      alert('Proszę wypełnić wszystkie wymagane pola.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const completeData = {
        ...formData,
        timestamp: Math.floor(Date.now() / 1000),
        product: 'FatOnFire - Naturalny Suplement',
        price: 219.00
      };

      // Symulacja wywołania API
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Twoje zamówienie zostało pomyślnie zarejestrowane! Wkrótce skontaktujemy się z Tobą.');
      setShowOrderPopup(false);
      setFormData({ imie: '', telefon: '', adres: '' });
    } catch (error) {
      console.error('Błąd:', error);
      alert('Wystąpił błąd. Proszę spróbować ponownie.');
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
            FatOnFire - Naturalny Suplement do Kontroli Apetytu
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            Naturalna formuła stworzona, aby wspierać Twoje cele wellness
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
              alt="FatOnFire Naturalny Suplement"
              className="w-64 h-auto mx-auto object-contain rounded-lg mb-6"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
          <h3 className="text-3xl font-bold text-center mb-2">Dlaczego Wybrać FatOnFire</h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Naturalny suplement sformułowany z wysokiej jakości składnikami
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🌿</div>
              <h4 className="font-bold text-gray-900 mb-2">Naturalne Składniki</h4>
              <p className="text-gray-600 text-sm">Formuła oparta na ekstraktach roślinnych i naturalnych związkach</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-bold text-gray-900 mb-2">Najwyższa Jakość</h4>
              <p className="text-gray-600 text-sm">Produkowany w certyfikowanych zakładach o wysokich standardach jakości</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-900 mb-2">Unikalna Formuła</h4>
              <p className="text-gray-600 text-sm">Specjalna kombinacja 7 naturalnych składników</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">💊</div>
              <h4 className="font-bold text-gray-900 mb-2">Łatwe w Użyciu</h4>
              <p className="text-gray-600 text-sm">Praktyczne kapsułki do codziennego stosowania</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-gray-900 mb-2">Przystępna Cena</h4>
              <p className="text-gray-600 text-sm">Ekonomiczne rozwiązanie dla Twojej rutyny wellness</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl mb-3">🔬</div>
              <h4 className="font-bold text-gray-900 mb-2">Testowane Jakość</h4>
              <p className="text-gray-600 text-sm">Każda partia jest testowana pod kątem czystości i skuteczności</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-center mb-2">Doświadczenia Użytkowników</h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Co mówią osoby, które wypróbowały FatOnFire
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Anna K., 45 lat</div>
                  <div className="text-gray-500 text-sm">Warszawa</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Byłam miło zaskoczona jakością produktu. Łatwo wpisuje się w codzienną rutynę i zauważyłam poprawę ogólnego samopoczucia."</p>
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Piotr M., 52 lata</div>
                  <div className="text-gray-500 text-sm">Kraków</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Produkt wydaje mi się dobrej jakości. Doceniłem to, że jest sformułowany z naturalnymi składnikami i łatwy w stosowaniu."</p>
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Magdalena L., 38 lat</div>
                  <div className="text-gray-500 text-sm">Gdańsk</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Jestem zadowolona z naturalnego składu produktu. Wpisuje się idealnie w mój zdrowy styl życia i rutynę codzienną."</p>
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Ewa S., 41 lat</div>
                  <div className="text-gray-500 text-sm">Wrocław</div>
                  <div className="flex mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Doceniam wysoką jakość produktu i naturalne podejście do wsparcia wellness. Łatwo dopasować do codziennej rutyny."</p>
            </div>
          </div>
        </section>

        {/* Offer */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Nasza Oferta</h3>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">219 ZŁ</div>
              <div className="text-xl">2 Opakowania - Kuracja na 2 Miesiące</div>
              <div className="text-sm text-blue-100 mt-2">
                Specjalna cena za kompletny pakiet
              </div>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-6 px-8 rounded-lg text-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl mb-4"
          >
            ZAMÓW TERAZ
          </button>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Gwarancja Jakości
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              Szybka Dostawa
            </div>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Płatność przy Odbiorze
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

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Uzupełnij Zamówienie</h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Podsumowanie zamówienia</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">FatOnFire - 2 Opakowania</div>
                    <div className="text-sm text-green-600">✅ Bezpłatna dostawa</div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">219 ZŁ</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imię i Nazwisko</label>
                  <input
                    type="text"
                    value={formData.imie}
                    onChange={(e) => handleFormChange('imie', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Twoje pełne imię i nazwisko"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numer Telefonu</label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => handleFormChange('telefon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Twój numer telefonu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pełny Adres</label>
                  <textarea
                    value={formData.adres}
                    onChange={(e) => handleFormChange('adres', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                    placeholder="Ulica, numer, miasto, kod pocztowy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 my-4 text-gray-700">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Płatność przy odbiorze</span>
              </div>

              <button
                onClick={handleOrderSubmit}
                disabled={!formData.imie || !formData.telefon || !formData.adres || isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? 'PRZETWARZANIE...' : 'POTWIERDŹ ZAMÓWIENIE - 219 ZŁ'}
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-center mb-6">Często Zadawane Pytania</h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Czym jest FatOnFire?</h4>
              <p className="text-gray-700">FatOnFire to naturalny suplement diety sformułowany z unikalną kombinacją 7 naturalnych składników, stworzony aby wspierać Twoje cele wellness w naturalny i bezpieczny sposób.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Jak stosować?</h4>
              <p className="text-gray-700">Zaleca się przyjmowanie 2 kapsułek dziennie, zgodnie z instrukcją na opakowaniu. Ważne jest przeczytanie i przestrzeganie instrukcji użytkowania dla najlepszych doświadczeń.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Czy jest bezpieczny w użyciu?</h4>
              <p className="text-gray-700">FatOnFire jest sformułowany z naturalnych składników i produkowany zgodnie ze standardami jakości. Jak w przypadku każdego suplementu, zaleca się konsultację ze specjalistą przed użyciem, szczególnie w przypadku istniejących schorzeń.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Czy oferujecie gwarancję?</h4>
              <p className="text-gray-700">Tak, oferujemy gwarancję satysfakcji z jakości naszego produktu. Aby uzyskać pełne informacje o polityce zwrotów, prosimy o kontakt z nami.</p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 mb-8">
          <h4 className="font-semibold mb-3">Ważne Informacje:</h4>
          <div className="space-y-2">
            <p>
              <strong>Charakter Produktu:</strong> FatOnFire to suplement diety, a nie lek.
              Nie jest przeznaczony do diagnozowania, leczenia, uzdrawiania lub zapobiegania jakimkolwiek chorobom.
            </p>
            <p>
              <strong>Wyniki:</strong> Wyniki mogą się różnić w zależności od osoby.
              Suplementy diety nie zastępują zróżnicowanej i zbilansowanej diety oraz zdrowego stylu życia.
            </p>
            <p>
              <strong>Konsultacja Lekarska:</strong> Zaleca się konsultację z lekarzem przed użyciem,
              szczególnie w przypadku istniejących schorzeń, ciąży, karmienia piersią lub stosowania leków.
            </p>
            <p>
              <strong>Bezpieczeństwo:</strong> Przechowywać w miejscu niedostępnym dla dzieci. Nie przekraczać zalecanej dawki dziennej.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 FatOnFire Polska. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-4 space-x-4 text-sm">
            <a href="#" className="hover:text-gray-300">Polityka Prywatności</a>
            <a href="#" className="hover:text-gray-300">Regulamin</a>
            <a href="#" className="hover:text-gray-300">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CleanFatOnFireLandingPolish;