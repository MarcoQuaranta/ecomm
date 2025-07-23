'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Zap, Shield, Truck, Phone, Clock, ThermometerSun, Volume2, Smartphone, Wrench, Award, AlertCircle } from 'lucide-react';

const AirCoolLanding = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [stockCount, setStockCount] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Marco R.",
      text: "Finalmente un condizionatore che non si sente! Lo uso in camera da letto e non disturba il sonno. Installazione super facile!",
      rating: 5
    },
    {
      name: "Giulia M.",
      text: "App fantastica, posso accenderlo dal lavoro e trovare casa già fresca. Bolletta dimezzata rispetto al vecchio!",
      rating: 5
    },
    {
      name: "Antonio L.",
      text: "Qualità-prezzo imbattibile. Scalda e raffredda perfettamente. Montato da solo in 30 minuti.",
      rating: 5
    },
    {
      name: "Francesca T.",
      text: "Design bellissimo, si integra perfettamente con l'arredamento moderno. Consigliatissimo!",
      rating: 5
    },
    {
      name: "Roberto C.",
      text: "Classe A+++, consumi bassissimi. L'investimento si ripaga in un anno con il risparmio energetico.",
      rating: 5
    },
    {
      name: "Elena P.",
      text: "Servizio clienti eccellente, spedizione velocissima. Prodotto arrivato perfetto e funziona alla grande!",
      rating: 5
    }
  ];

  const features = [
    { icon: "❄️", title: "Raffredda in 5 min", desc: "Temperatura ideale rapidissima" },
    { icon: "🔥", title: "Scalda in inverno", desc: "Pompa di calore efficiente" },
    { icon: "🔇", title: "Silenzioso 20dB", desc: "Più silenzioso di un sussurro" },
    { icon: "📱", title: "Controllo App", desc: "Gestisci da smartphone" },
    { icon: "⚡", title: "Classe A+++", desc: "Risparmio fino al 60%" },
    { icon: "🔧", title: "Facile installazione", desc: "Anche senza tecnico" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header con Urgenza */}
      <div className="bg-red-600 text-white py-2 text-center font-bold">
        🚨 OFFERTA LAMPO - SOLO OGGI! Rimangono {stockCount} pezzi
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">AIRCOOL PRO</span><br />
              Il Condizionatore Smart che<br />
              <span className="text-green-600">Ti Fa Risparmiare!</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Finalmente addio a bollette salate e notti insonni! <br />
              <strong>Silenzioso, intelligente e classe A+++</strong>
            </p>
          </div>

          {/* Hero Grid: Slider + Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Image Slider */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/api/placeholder/500/500"
                    alt="AirCool Pro Condizionatore"
                    className="w-full h-full object-cover"
                  />
                  {/* Placeholder per le tue immagini - sostituisci con i tuoi URL */}
                </div>
                <div className="flex gap-2 justify-center">
                  <button className="w-16 h-16 rounded-lg overflow-hidden border-2 border-blue-500">
                    <img src="/api/placeholder/64/64" alt="Vista 1" className="w-full h-full object-cover" />
                  </button>
                  <button className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300 opacity-60">
                    <img src="/api/placeholder/64/64" alt="Vista 2" className="w-full h-full object-cover" />
                  </button>
                  <button className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300 opacity-60">
                    <img src="/api/placeholder/64/64" alt="Vista 3" className="w-full h-full object-cover" />
                  </button>
                  <button className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300 opacity-60">
                    <img src="/api/placeholder/64/64" alt="Vista 4" className="w-full h-full object-cover" />
                  </button>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg mb-4 font-bold">
                  🚨 OFFERTA LIMITATA - SOLO OGGI!
                </div>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <span className="text-2xl text-gray-500 line-through">€699</span>
                  <span className="text-4xl font-bold text-green-600">€499</span>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4">
                  <strong>RISPARMI €200!</strong>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-red-600 mb-2 text-center">⏰ Offerta scade tra:</p>
                <div className="flex justify-center gap-2">
                  <div className="bg-red-600 text-white px-3 py-2 rounded text-lg font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-red-600 text-lg">:</span>
                  <div className="bg-red-600 text-white px-3 py-2 rounded text-lg font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-red-600 text-lg">:</span>
                  <div className="bg-red-600 text-white px-3 py-2 rounded text-lg font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Order Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome e Cognome *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Mario Rossi" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefono *</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="+39 123 456 7890" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="mario.rossi@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Indirizzo di Consegna *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Via Roma 123" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CAP *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="20100" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Città *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Milano" />
                  </div>
                </div>
              </div>

              {/* Final Price */}
              <div className="bg-green-50 p-4 rounded-lg mb-6 text-center">
                <div className="text-sm text-gray-600 mb-1">Prezzo finale:</div>
                <div className="text-3xl font-bold text-green-600">€499</div>
                <div className="text-sm text-green-700">Spedizione GRATUITA inclusa</div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors mb-4">
                🛒 ORDINA SUBITO - PAGAMENTO ALLA CONSEGNA
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>✅ Consegna in 24-48h • ✅ Garanzia 2 anni</p>
                <p>✅ Pagamento sicuro • ✅ Reso gratuito 30gg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Agitation */}
      <div className="bg-red-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
            BASTA con Bollette Salate e Notti Insonni! 😤
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-bold text-lg mb-2">Bollette Astronomiche?</h3>
              <p>Il tuo vecchio condizionatore ti sta prosciugando il conto?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">😴</div>
              <h3 className="font-bold text-lg mb-2">Rumore Insopportabile?</h3>
              <p>Non riesci a dormire per il chiasso del condizionatore?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">🥵</div>
              <h3 className="font-bold text-lg mb-2">Sempre Troppo Caldo/Freddo?</h3>
              <p>Temperature mai perfette, sempre a smanettare?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Bullets */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            AIRCOOL PRO - <span className="text-blue-600">Caratteristiche Uniche</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-lg"><strong>Risparmio energetico garantito:</strong> Consuma fino al 90% in meno rispetto ai sistemi tradizionali grazie alla tecnologia avanzata</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-lg"><strong>Raffreddamento e riscaldamento rapido:</strong> Raggiunge la temperatura ideale in meno di 5 minuti</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-lg"><strong>Deumidificatore integrato:</strong> Mantiene l'aria fresca e piacevole eliminando l'umidità in eccesso</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-lg"><strong>Oscillazione automatica:</strong> Distribuisce l'aria uniformemente in tutta la stanza</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-lg"><strong>Timer programmabile 24h:</strong> Imposta accensione e spegnimento automatici per il massimo controllo</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-lg"><strong>Modalità ECO intelligente:</strong> Ottimizza automaticamente i consumi mantenendo il comfort ideale</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-lg"><strong>Perfetto per casa e ufficio:</strong> Ideale per ambienti fino a 35 mq, design discreto e silenzioso</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-lg"><strong>Controllo temperatura preciso:</strong> Mantiene automaticamente la temperatura desiderata con precisione al grado</span>
              </div>
            </div>
          </div>

          {/* Original Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Perché Scegliere AIRCOOL PRO?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Classe A+++:</strong> Risparmia fino al 60% in bolletta</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>20dB Silenzioso:</strong> Più silenzioso di una biblioteca</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>2 in 1:</strong> Raffredda in estate, scalda in inverno</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Smart Control:</strong> App intuitiva + telecomando</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Installazione Easy:</strong> Anche senza tecnico</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Design Moderno:</strong> Si integra in ogni casa</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Garanzia 2 anni:</strong> Assistenza italiana inclusa</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 w-6 h-6" />
                <span><strong>Spedizione Gratuita:</strong> A casa tua in 24-48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Confronta e Scopri la Differenza
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Caratteristica</th>
                  <th className="p-4 text-center bg-green-600">
                    <div className="font-bold">AIRCOOL PRO</div>
                    <div className="text-sm">LA NOSTRA SCELTA</div>
                  </th>
                  <th className="p-4 text-center">Concorrente A</th>
                  <th className="p-4 text-center">Concorrente B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Classe Energetica</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-green-600">A+++</strong></td>
                  <td className="p-4 text-center">A++</td>
                  <td className="p-4 text-center">A+</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Rumorosità</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-green-600">20 dB</strong></td>
                  <td className="p-4 text-center">35 dB</td>
                  <td className="p-4 text-center">42 dB</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Controllo App</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-green-600">✅ Inclusa</strong></td>
                  <td className="p-4 text-center">❌ No</td>
                  <td className="p-4 text-center">⚠️ A pagamento</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Installazione</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-green-600">Fai da te</strong></td>
                  <td className="p-4 text-center">Solo tecnico</td>
                  <td className="p-4 text-center">Solo tecnico</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Garanzia</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-green-600">2 anni</strong></td>
                  <td className="p-4 text-center">1 anno</td>
                  <td className="p-4 text-center">1 anno</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Prezzo</td>
                  <td className="p-4 text-center bg-green-50"><strong className="text-red-600">€499</strong></td>
                  <td className="p-4 text-center">€699</td>
                  <td className="p-4 text-center">€799</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Social Proof - Testimonials */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Cosa Dicono i Nostri Clienti ⭐⭐⭐⭐⭐
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-blue-600">- {testimonial.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-blue-100 inline-block px-6 py-3 rounded-lg">
              <span className="text-2xl font-bold text-blue-800">98.7% di Clienti Soddisfatti</span>
              <div className="text-sm text-blue-600">Su oltre 15.000 recensioni verificate</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Domande Frequenti 🤔
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-2">🔧 È davvero facile da installare?</h3>
              <p className="text-gray-700">Assolutamente sì! Include tutto il necessario e istruzioni video. La maggior parte dei clienti lo installa in 30-45 minuti senza tecnico.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-2">💰 Quanto posso risparmiare davvero?</h3>
              <p className="text-gray-700">Con la classe A+++, i nostri clienti risparmiano mediamente 40-60% sulla bolletta rispetto ai vecchi condizionatori. Su base annua sono 200-400€!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
              <h3 className="font-bold text-lg mb-2">📱 Come funziona l'app?</h3>
              <p className="text-gray-700">Semplicissima! Scarichi l'app gratuita, colleghi il condizionatore al WiFi e puoi controllarlo da ovunque. Programmazione, temperature, modalità eco... tutto a portata di tap!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-2">🚚 I tempi di consegna sono garantiti?</h3>
              <p className="text-gray-700">Sì! Spediamo entro 24h dall'ordine e la consegna avviene in 24-48h con corriere espresso. Tracciamento incluso e possibilità di pagare alla consegna.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-2">🛡️ E se non sono soddisfatto?</h3>
              <p className="text-gray-700">Hai 30 giorni per testarlo. Se non sei completamente soddisfatto, ritiro gratuito e rimborso totale. Inoltre, garanzia di 2 anni per qualsiasi problema.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            ⚠️ ULTIMI {stockCount} PEZZI DISPONIBILI! ⚠️
          </h2>
          <p className="text-xl mb-6">
            Non perdere questa occasione irripetibile.<br />
            <strong>Il prezzo tornerà a €699 a mezzanotte!</strong>
          </p>

          <div className="bg-white text-black p-6 rounded-xl max-w-md mx-auto mb-6">
            <div className="text-3xl font-bold text-red-600 mb-2">SOLO €499</div>
            <div className="text-sm text-gray-600 mb-4">invece di €699 - RISPARMI €200</div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors">
              🛒 ORDINA SUBITO - SPEDIZIONE GRATUITA
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Spedizione GRATUITA</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Garanzia 2 anni</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Consegna 24-48h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Pagamenti Sicuri</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-semibold">Spedizione Tracciata</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-semibold">Garanzia Italiana</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-semibold">Assistenza 7/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-4">© 2024 AirCool Pro. Tutti i diritti riservati.</p>
          <p className="text-sm text-gray-400">
            Sede legale: Via Roma 123, 20100 Milano (MI) - P.IVA: 12345678901<br />
            Assistenza clienti: info@aircoolpro.it | 📞 800-123-456 (gratuito)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirCoolLanding;