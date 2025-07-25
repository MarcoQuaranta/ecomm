'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, Thermometer, Zap, Wind, Shield, Wifi, Volume2, Menu, X } from 'lucide-react';

// COMPONENTE HEADER
const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <img
            src="/images/logo.png"
            alt="AirMax Logo"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Catalogo</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contatti</a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Home</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Catalogo</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Contatti</a>
        </div>
      )}
    </header>
  );
};


// COMPONENTE LANDING
const AirConditionerLanding: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('white');
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [timeLeft, setTimeLeft] = useState(57 * 60);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 57 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const colors = [
    { name: 'white', label: 'Bianco Perla', hex: '#FFFFFF' },
    { name: 'black', label: 'Nero Elegante', hex: '#1a1a1a' },
    { name: 'silver', label: 'Argento', hex: '#C0C0C0' }
  ];

  const features = [
    { image: "1x4.webp", title: "Risparmio Energetico", description: "Classe energetica A+++ con un risparmio fino al 92% in bolletta rispetto ai modelli tradizionali" },
    { image: "2x4.webp", title: "Silenziosità Assoluta", description: "Livello sonoro di soli 20 dB(A) con modalità notte ultra-silenziosa per il massimo comfort" },
    { image: "3x4.webp", title: "Controllo Intelligente", description: "Gestione completa tramite telecomando e app smartphone per un controllo totale ovunque tu sia" },
    { image: "4x4.webp", title: "Installazione Facile", description: "Setup rapido e semplice senza bisogno del tecnico - pronto all'uso in pochi minuti" }
  ];

  const specs = [
    { label: "Potenza", value: "12.000 BTU/h" },
    { label: "Classe Energetica", value: "A+++" },
    { label: "Livello Sonoro", value: "20 dB(A)" },
    { label: "Temperature raggiungibili", value: "16-32 °C" },
    { label: "Controllo WiFi", value: "Sì, App iOS/Android" },
    { label: "Garanzia", value: "5 anni" }
  ];

  return (

    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5fbff] to-[#d6eafc]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#eaf6fd]/40 to-[#cae2f7]/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              AirMax® Climate Technology
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              AirMax Pro
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Il condizionatore a muro che ridefinisce il comfort domestico.
              <span className="font-semibold text-blue-700"> Design Minimalista, tecnologia avanzata, nessuna installazione.</span>
            </p>

            {/* Reviews Section */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">4,8</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span
                className="text-blue-600 font-medium cursor-pointer hover:text-blue-700"
                onClick={() => {
                  const reviewsSection = document.querySelector('.reviews-section');
                  reviewsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                (1.285)
              </span>
              <span className="text-gray-400">|</span>
              <button
                className="text-blue-600 hover:text-blue-700 font-medium underline"
                onClick={() => {
                  const reviewsSection = document.querySelector('.reviews-section');
                  reviewsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Visualizza Recensioni
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="text-gray-400 text-sm">
                ✓ Spedizione gratuita &nbsp;&nbsp; ✓ Senza installazione &nbsp;&nbsp; ✓ 5 anni garanzia
              </div>
            </div>
          </div>

          {/* Sezione principale */}

          <div className="relative max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start h-full">

              {/* COLONNA SINISTRA: parete + condizionatore stilizzato */}
              <div className="lg:col-span-2 min-h-full flex flex-col justify-between space-y-6">
                {/* Blocco con parete e condizionatore */}
                <div className="rounded-2xl shadow-xl p-4 transform hover:scale-105 transition-all duration-500">
                  {/* Modern Bedroom Wall Background */}
                  <div
                    className="aspect-[4/4.5] md:aspect-[16/9] rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundImage: `url('/images/parete_cell.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Desktop background */}
                    <div
                      className="hidden md:block absolute inset-0 rounded-xl"
                      style={{
                        backgroundImage: `url('/images/parete.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>

                    {/* Shadow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-24 md:w-72 md:h-24 sm:w-60 sm:h-20 bg-black/12 rounded-lg blur-sm transform translate-y-1"></div>
                    </div>

                    {/* COMPONENTE CONDIZIONATORE STILIZZATO */}
                    <div className="relative z-10 flex justify-center">
                      <div
                        className={`relative w-[340px] md:w-[400px] h-[120px] md:h-[140px] rounded-[20px] overflow-hidden border shadow-xl transition-all duration-500 ${selectedColor === 'white'
                          ? 'bg-gradient-to-b from-gray-100 to-white border-gray-200'
                          : selectedColor === 'black'
                            ? 'bg-gradient-to-b from-zinc-800 to-black border-zinc-700'
                            : 'bg-gradient-to-b from-gray-300 to-gray-200 border-gray-400'
                          }`}
                        style={{
                          boxShadow:
                            'inset 0 10px 20px rgba(255,255,255,0.3), inset 0 -10px 20px rgba(0,0,0,0.1)',
                        }}
                      >
                        {/* Display */}
                        <div className="absolute top-4 right-5 bg-[#f5f5f5]/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-inner flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full border border-white bg-[#18730a] shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-4 h-4">
                              <path d="M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42A7 7 0 1 1 7.59 6.59L6.17 5.17a9 9 0 1 0 12.66 0z" />
                            </svg>
                          </div>
                          <span className="text-[#18730a] font-sans text-sm font-semibold tracking-widest">19°C</span>
                        </div>

                        {/* Bocchetta */}
                        <div className="absolute bottom-4 left-6 right-6 h-6 bg-gradient-to-b from-gray-600 to-black rounded-md shadow-inner border border-gray-700 flex items-center justify-evenly px-4">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-0.5 h-4 rounded-full bg-gray-300 opacity-70"></div>
                          ))}
                        </div>

                        {/* Flusso d'aria */}
                        <div className="absolute -bottom-6 left-10 right-10 flex justify-between pointer-events-none">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-12 md:h-16 rounded-full bg-gradient-to-b from-blue-400 to-transparent opacity-40 animate-pulse"
                              style={{ animationDelay: `${i * 150}ms` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Immagine reale solo da desktop */}
                <div className="hidden lg:flex flex-col items-center space-y-2">
                  <h3 className="text-gray-800 font-semibold text-lg md:text-xl text-center leading-tight" style={{ paddingTop: '20px' }}>
                    Come si presenta realmente il prodotto:
                  </h3>
                  <img
                    src="/images/condizionatore.png"
                    alt="Condizionatore reale"
                    className="w-[280px] md:w-[340px] lg:w-[400px] h-auto object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* COLONNA DESTRA: scelta stile + immagine reale da mobile */}
              <div className="lg:col-span-1 min-h-[700px] flex flex-col justify-between mt-6 lg:mt-0">
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-xl font-bold text-gray-900 mb-6 text-center">Scegli il Tuo Stile</h3>

                  <div className="flex lg:flex-col justify-center gap-4 mb-8">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex lg:flex-row flex-col items-center p-4 lg:p-3 rounded-lg transition-all duration-300 lg:w-full w-24 ${selectedColor === color.name
                          ? 'bg-gray-50 shadow-lg scale-105 border-2 border-blue-500'
                          : 'bg-gray-50 shadow-md hover:shadow-lg border-2 border-transparent'
                          }`}
                      >
                        <div
                          className="w-8 h-8 lg:w-6 lg:h-6 rounded-full mb-1 lg:mb-0 lg:mr-3 border border-gray-200 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="font-medium text-gray-900 text-xs lg:text-sm">{color.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Countdown */}
                  <div className="col-span-3 mt-4 mb-6 flex justify-center">
                    <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg text-center w-full max-w-2xl hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-yellow-300 animate-pulse">⚡</span>
                        <span className="font-bold text-sm uppercase tracking-wide">Offerta Limitata</span>
                        <span className="text-yellow-300 animate-pulse">⚡</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className="text-lg font-medium">Scade tra:</span>
                        <div className="bg-white text-red-500 px-3 py-1 rounded-lg font-mono text-xl font-bold shadow-inner">
                          {formatTime(timeLeft)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prezzi */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-red-500 line-through text-lg font-medium">
                      €299<span className="text-sm">90</span>
                    </span>
                    <span className="text-green-600 font-bold text-2xl lg:text-3xl">
                      €89<span className="text-lg lg:text-xl">00</span>
                    </span>
                  </div>

                  {/* Pulsanti */}
                  <div className="flex flex-col gap-3 mb-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full">
                      <span style={{ fontSize: '22px' }}>Ordina Ora</span> <br></br><span style={{ fontSize: '15px' }}>Paghi alla Consegna</span>
                    </button>

                    <div className="w-full">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full"
                      >
                        {isExpanded ? 'Chiudi' : 'Scopri di Più'}
                      </button>

                      {/* Contenuto espandibile */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed">
                          <p className="mb-3">
                            Scopri <strong>Frost</strong>, il climatizzatore a parete 2 in 1 che riscalda e raffresca ambienti fino a 80 m² in meno di 20 minuti. Grazie all'innovativa tecnologia FPS, consuma fino al 90% in meno rispetto ai sistemi tradizionali, garantendo un'efficienza energetica sorprendente.
                          </p>
                          <p className="mb-3">
                            Frost offre un riscaldamento e un raffreddamento rapidi, è dotato di un deumidificatore integrato che mantiene l'aria sempre fresca e piacevole, e dispone di oscillazione automatica e timer programmabile fino a 24 ore, per un controllo totale della temperatura.
                          </p>
                          <p className="mb-3">
                            Con la modalità Eco, puoi godere della massima potenza senza sprechi inutili. Ideale sia per l'inverno che per l'estate, è perfetto per l'utilizzo in casa o in ufficio.
                          </p>
                          <p className="font-semibold text-blue-700">
                            💡 Scegli Frost: il massimo del comfort, con il minimo dei consumi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info pagamento */}
                  <div className="text-center text-xs lg:text-sm text-gray-600 space-y-1" style={{ fontSize: '20px', color: '#b59a07' }}>
                    <div style={{ paddingBottom: '5px' }}>✓ Pagamento alla Consegna</div>
                    <div style={{ paddingBottom: '5px' }}>✓ Spedizione Gratuita</div>
                    <div style={{ paddingBottom: '5px' }}>✓ 5 anni garanzia</div>
                  </div>

                  {/* Immagine reale solo da mobile */}
                  <div className="lg:hidden flex flex-col items-center space-y-2 mt-8">
                    <h3 className="text-gray-800 font-semibold text-lg text-center leading-tight">
                      Come si presenta realmente il prodotto:
                    </h3>
                    <img
                      src="/images/condizionatore.png"
                      alt="Condizionatore reale"
                      className="w-[400px] h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* FINE SEZIONE PRINCIPALE */}


      {/* Nuova Sezione Specifiche - Come nello Screenshot */}
      < section className="py-20 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden" >
        <div className="max-w-7xl mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-0 lg:items-center">

            {/* Contenuto Sinistra */}
            <div className="text-white px-4 lg:pr-8 lg:pl-0 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Una nuova era della<br />
                <span className="text-blue-100">regolazione della Temperatura</span>
              </h2>

              <p className="text-xl text-blue-100 mb-8 lg:mb-16 leading-relaxed">
                Tecnologia inverter di ultima generazione che raggiunge rapidamente la temperatura desiderata
                e la mantiene costante con un consumo energetico ridotto al minimo.
              </p>

              {/* Immagine Mobile - Sotto il sottotitolo */}
              <div className="lg:hidden mb-12">
                <img
                  src="/images/condizionatore.png"
                  alt="VINKO AirMax Pro Condizionatore"
                  className="w-full h-auto max-w-none scale-125 transform translate-x-12 origin-left"
                />
              </div>

              {/* Specifiche Grandi */}
              <div className="grid md:grid-cols-2 gap-12 px-0">

                {/* Capacità Raffrescamento */}
                <div className="text-center lg:text-left">
                  <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                    12.000
                  </div>
                  <div className="text-2xl font-bold text-blue-100 mb-4">
                    BTU/h Raffrescamento
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Potenza sufficiente per rinfrescare ambienti fino a 120 mq o mantenere
                    tre stanze fresche simultaneamente
                  </p>
                </div>

                {/* Efficienza Energetica */}
                <div className="text-center lg:text-left">
                  <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                    A+++
                  </div>
                  <div className="text-2xl font-bold text-blue-100 mb-4">
                    Classe Energetica
                  </div>
                  <p className="text-blue-200 leading-relaxed">
                    Risparmio del 92% sui consumi | Inverter con controllo preciso della temperatura -
                    più efficiente della maggior parte dei condizionatori tradizionali
                  </p>
                </div>

              </div>
            </div>

            {/* Immagine Desktop - A destra */}
            <div className="hidden lg:block relative lg:ml-8">
              <img
                src="/images/condizionatore.png"
                alt="AirMax Pro Condizionatore"
                className="w-full h-auto max-w-none 
               scale-110 sm:scale-125 md:scale-130 
               lg:scale-[1.25] xl:scale-[1.3] 
               transform 
               translate-x-2 sm:translate-x-4 md:translate-x-6 
               lg:translate-x-6 xl:translate-x-8 
               origin-left"
              />
            </div>



          </div>
        </div>
      </section >

      {/* Features Section */}
      < section className="py-20 bg-white" >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tecnologia Avanzata, <span className="text-blue-600">Design Moderno</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ogni dettaglio è stato progettato per offrire la massima efficienza energetica
              e il comfort superiore che meriti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <img
                    src={`/images/${feature.image}`}
                    alt={feature.title}
                    className="w-[250px] h-[250px] object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <center>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ marginTop: '40px' }}>
            Ordina Ora - €89,00
          </button>
        </center>
      </section >

      {/* Tech Specs */}
      < section className="py-20 bg-gray-900 text-white" >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Specifiche Tecniche</h2>
            <p className="text-xl text-gray-300">Prestazioni professionali per la tua casa</p>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-6 border-b border-gray-700 last:border-b-0 lg:border-b lg:last:border-b">
                  <span className="text-gray-300 font-medium">{spec.label}</span>
                  <span className="text-white font-bold text-lg">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >





      {(() => {
        const [timeLeft, setTimeLeft] = React.useState<number | null>(null);

        React.useEffect(() => {
          const COUNTDOWN_KEY = 'countdown_expiry_timestamp';
          const COUNTDOWN_MINUTES = 57;

          const getOrSetExpiry = () => {
            // Simulated localStorage - using memory instead
            if (!window.countdownExpiry) {
              window.countdownExpiry = Date.now() + COUNTDOWN_MINUTES * 60 * 1000;
            }
            return window.countdownExpiry;
          };

          const expiry = getOrSetExpiry();

          const update = () => {
            const now = Date.now();
            const diff = expiry - now;
            setTimeLeft(diff > 0 ? diff : 0);
          };

          update();
          const interval = setInterval(update, 1000);
          return () => clearInterval(interval);
        }, []);

        const format = (ms: number) => {
          const s = Math.floor(ms / 1000);
          const h = String(Math.floor(s / 3600)).padStart(2, '0');
          const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
          const sec = String(s % 60).padStart(2, '0');
          return { h, m, sec };
        };

        if (timeLeft === null) return null;
        const { h, m, sec } = format(timeLeft);

        return (
          <div className="max-w-[1350px] mx-auto px-4 mt-12">
            <div className="bg-[#e73270] p-4 md:p-8 text-white rounded-xl space-y-6">
              {/* Prezzo + descrizione */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <img
                  src="/images/condizionatore.png"
                  alt="Caliburn"
                  className="w-[95%] md:w-[70%] mx-auto rounded-lg"
                />
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <span className="text-lg text-white/70 line-through">€299,90</span>
                    <div className="text-4xl md:text-5xl font-bold">€89,00</div>
                  </div>
                  <div className="text-sm mt-1">Risparmi 210,90€</div>
                </div>
              </div>

              {/* Countdown + scorte */}
              <div className="bg-[#d6286b] rounded-lg px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Countdown - 50% */}
                <div className="w-full md:w-1/2 text-center">
                  <p className="text-sm font-semibold tracking-wider mb-1">
                    LE VENDITE CHIUDONO IN:
                  </p>
                  <div className="bg-[#b02055] text-3xl font-bold px-4 py-2 rounded-md inline-block">
                    {h} : {m} : {sec}
                  </div>
                  <p className="text-xs mt-1">ore : min : sec</p>
                </div>

                {/* Scorte - 50% */}
                <div className="w-full md:w-1/2">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                    🔥 Rimangono solo <span className="font-bold text-white">22 pezzi</span>
                  </p>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div className="h-full w-[22%] bg-gradient-to-r from-lime-400 via-yellow-400 to-red-500" />
                  </div>
                  <p className="text-xs text-yellow-200 mt-1">
                    ⚠️ Disponibilità quasi terminata
                  </p>
                </div>
              </div>


              {/* CTA */}
              <div className="bg-yellow-400 text-black text-center font-bold text-lg py-4 rounded-md shadow-lg cursor-pointer hover:scale-[1.02] transition-all">
                ORDINA ADESSO - ULTIMI PEZZI
              </div>

              {/* Garanzie */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/90">
                <div className="flex items-center gap-2">✅ 30 giorni Soddisfatti o Rimborsati</div>
                <div className="flex items-center gap-2">📦 Spedizione Gratuita</div>
                <div className="flex items-center gap-2">💳 Pagamento alla Consegna</div>
              </div>

              {/* Avviso finale */}
              <div className="text-xs text-yellow-200 mt-2 text-center">
                ⚠️ Una volta esaurite le scorte, la prossima produzione sarà disponibile solo tra 10-12 mesi
              </div>
            </div>
          </div>
        );
      })()}

      <section className="py-20 bg-white reviews-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-xl text-gray-600">Oltre 1.285 recensioni verificate</p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Freccia sinistra */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl"
              onClick={() => {
                const container = document.querySelector('.reviews-container');
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
            >
              ‹
            </button>

            {/* Freccia destra */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl"
              onClick={() => {
                const container = document.querySelector('.reviews-container');
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
            >
              ›
            </button>

            <div className="overflow-hidden">
              <div className="reviews-container flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x snap-x snap-mandatory px-10 md:px-16 py-4">

                {/* Recensione */}
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Marco Rossi</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                    ✔ Recensione verificata
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Installato un mese fa, fantastico! Casa sempre alla temperatura perfetta e bolletta dimezzata. Silenzioso come promesso.
                  </p>
                </div>
                {/* Recensione */}
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Anna Verdi</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                    ✔ Recensione verificata
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Ottimo prodotto! Il controllo WiFi è fantastico e l'efficienza energetica è davvero notevole. Lo consiglio a tutti.
                  </p>
                </div>
                {/* Recensione */}
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">
                      L
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Luca Bianchi</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                    ✔ Recensione verificata
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Perfetto per il mio ufficio. Design elegante e prestazioni eccellenti. La modalità eco è davvero utile.
                  </p>
                </div>
                {/* Recensione */}
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">
                      F
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Francesca Neri</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                    ✔ Recensione verificata
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Incredibile rapporto qualità-prezzo. L'installazione è stata semplice e ora godiamo di un clima perfetto in casa.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="border border-blue-200 bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-800">
                Per prevenire recensioni false, solo chi ha acquistato il prodotto può lasciare una recensione verificata.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
    .reviews-container::-webkit-scrollbar {
      display: none;
    }
  `}</style>
      </section>


      {/* CTA Section */}
      < section className="py-20 bg-gray-900 text-white" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto per il Comfort Perfetto?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Installazione facile, senza tecnico.<br></br>
            Garanzia Soddisfatti o Rimborsati 30 giorni.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Ordina Ora - €89,00
            </button>
            <div className="text-gray-400">
              ✓ Spedizione gratuita ✓ Installazione rapida ✓ 5 anni garanzia
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4" style={{ fontSize: '20px' }}><b>Pagamento sicuro in contanti</b></p>

          </div>
        </div>
      </section >

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Logo Section */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src="/images/logo.png"
                alt="AirMax Logo"
                className="h-24 md:h-32 w-auto mb-6"
              />
              <p className="text-gray-600 text-center md:text-left max-w-md leading-relaxed">
                Leader nell'innovazione climatica, progettiamo soluzioni all'avanguardia
                per il comfort domestico con tecnologie eco-sostenibili.<br></br>Collaboriamo con importanti Brand come AirMax Technologies per produrre i migliori elettrodomestici al miglior prezzo possibile.
              </p>
            </div>

            {/* Company Info */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-6 text-blue-700">AirMax Technologies S.r.l.</h3>

              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800">Sede Legale</p>
                  <p>Via Milano 145, 20100 Milano (MI)</p>
                  <p>Italia</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Contatti</p>
                  <p>Tel: +39 02 1234 5678</p>
                  <p>Email: info@airmax.it</p>
                  <p>Assistenza: supporto@airmax.it</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Dati Aziendali</p>
                  <p>P.IVA: IT 12345678901</p>
                  <p>REA: MI-1234567</p>
                  <p>Cap. Sociale: €100.000,00 i.v.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 AirMax Technologies. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Termini & Condizioni</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default AirConditionerLanding;