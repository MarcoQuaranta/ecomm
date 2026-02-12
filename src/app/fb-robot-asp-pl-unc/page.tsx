'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart, CheckCircle, ArrowDown, X, Clock, Zap, Package, Eye, Menu,
  Timer, Sparkles, Navigation, Smartphone, Battery, Wind, ShieldCheck,
  Star, Check, Truck, Lock, CreditCard, ChevronDown, ChevronUp, HelpCircle,
  ThumbsUp, RefreshCw, Trash2, Droplets, Cpu, Gauge, Wifi, Layers, Volume2, Maximize, Shield,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* --- COMPONENTS --- */

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 bg-brand-red/10 text-brand-red font-bold py-2 px-4 rounded-lg border border-brand-red/20 animate-pulse text-red-600 bg-red-50 border-red-200">
      <Timer size={20} />
      <span>Oferta wygasa za: {formatTime(timeLeft)}</span>
    </div>
  );
};

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    '/images/robot-asp/1.png',
    '/images/robot-asp/2.png',
    '/images/robot-asp/3.png',
    '/images/robot-asp/4.png',
    '/images/robot-asp/5.png',
    '/images/robot-asp/6.png',
    '/images/robot-asp/7.png',
    '/images/robot-asp/8.png',
    '/images/robot-asp/9.png',
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, autoPlay]);

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full md:w-[700px] mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(255,87,34,0.3)] border border-white/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`NovaClean X1 - Zdjęcie ${index + 1}`}
              className="w-full flex-shrink-0 object-cover aspect-square"
            />
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-40 cursor-pointer"
          aria-label="Poprzednie zdjęcie"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-40 cursor-pointer"
          aria-label="Następne zdjęcie"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg animate-bounce">
          ✅ STACJA W ZESTAWIE
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-[#111] to-transparent"></div>
      </div>

      <div className="flex justify-center gap-2 mt-4 px-2 overflow-x-auto pb-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentSlide
                ? 'ring-2 ring-orange-500 scale-105'
                : 'opacity-50 hover:opacity-80'
            }`}
            aria-label={`Przejdź do zdjęcia ${index + 1}`}
          >
            <img
              src={src}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      bg: "bg-blue-500",
      title: "2-w-1: Odkurza i Myje",
      desc: "Cyklonowy silnik odkurza kurz, a ściereczka z mikrofibry usuwa uporczywe plamy. Jeden przejazd, podwójny efekt."
    },
    {
      icon: <Navigation className="w-8 h-8 text-white" />,
      bg: "bg-purple-500",
      title: "Nawigacja Smart 3.0",
      desc: "Nie spada ze schodów i nie uderza gwałtownie. Czujniki IR mapują pomieszczenie, omijając przeszkody i czyszcząc pod łóżkami i sofami."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      bg: "bg-green-500",
      title: "Pełna Kontrola",
      desc: "Używaj pilota lub dołączonej aplikacji. Uruchom sprzątanie z biura i wróć do lśniącego domu."
    },
    {
       icon: <Battery className="w-8 h-8 text-white" />,
       bg: "bg-yellow-500",
       title: "Automatyczne Ładowanie",
       desc: "Gdy bateria się rozładuje, sam wraca do NovaStation, ładuje się, opróżnia i kontynuuje od miejsca, gdzie skończył."
    },
    {
       icon: <Wind className="w-8 h-8 text-white" />,
       bg: "bg-teal-500",
       title: "Super Cichy",
       desc: "Mniej niż 65dB. Możesz oglądać telewizję lub usypiać dzieci, podczas gdy on cicho pracuje."
    },
    {
       icon: <ShieldCheck className="w-8 h-8 text-white" />,
       bg: "bg-red-500",
       title: "Filtr HEPA",
       desc: "Wyłapuje 99,9% alergenów i drobnego kurzu. Idealny dla alergików i właścicieli zwierząt."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <span className="text-brand-orange text-orange-600 font-bold tracking-widest text-sm uppercase">Zaawansowana Technologia</span>
           <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
             Wszystko, czego oczekujesz od robota.<br />
             <span className="text-gray-400">Bez szalonej ceny.</span>
           </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-24 h-24 ${f.bg} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500`}></div>

              <div className={`mb-4 w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StationUpgrade: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">

          <div className="w-full md:w-1/2">
            <div className="inline-block bg-white/10 backdrop-blur border border-white/20 text-orange-500 font-bold px-4 py-1 rounded-full text-xs mb-6 uppercase tracking-widest">
              W CENIE (WARTOŚĆ 789 PLN)
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
              TAK, STACJA JEST<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">W ZESTAWIE.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Dobrze przeczytałeś. Nie płacisz dodatkowo. <strong>NovaStation™ Omni All-in-One</strong> jest w pakiecie podstawowym. Robot sam wraca, opróżnia się i czyści.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Trash2 className="text-orange-500 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Auto-Opróżnianie</h4>
                <p className="text-gray-400 text-sm">Wyciąga brud z robota do szczelnego worka 3L (wystarczy na 2 miesiące).</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Droplets className="text-blue-500 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Wymiana Wody i Mycie</h4>
                <p className="text-gray-400 text-sm">Myje brudne ściereczki i napełnia zbiornik robota czystą wodą.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Wind className="text-gray-300 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Suszenie na Ciepło</h4>
                <p className="text-gray-400 text-sm">Suszy mopa w 45°C, zapobiegając pleśni i nieprzyjemnym zapachom.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition duration-300">
                <Zap className="text-yellow-400 mb-3 w-8 h-8" />
                <h4 className="font-bold text-lg mb-1">Ładowanie +30%</h4>
                <p className="text-gray-400 text-sm">Inteligentne szybkie ładowanie, by szybciej wrócić do pracy.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full"></div>
             <img
               src="/images/robot-asp/2.png"
               alt="NovaStation Omni Dock"
               className="relative z-10 rounded-2xl shadow-2xl border border-white/10 w-full object-cover transform hover:scale-105 transition duration-500"
             />

             <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-xl z-20 border-l-4 border-orange-500 max-w-xs hidden md:block">
                <div className="font-bold uppercase text-xs text-gray-500">Wartość 789 PLN</div>
                <div className="font-black text-xl text-orange-500">GRATIS DZIŚ</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ReviewCard: React.FC<{ name: string; country: string; flag: string; text: string; date: string }> = ({ name, country, flag, text, date }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
           {name.charAt(0)}
        </div>
        <div>
           <div className="font-bold text-sm text-gray-900">{name}</div>
           <span className="text-xs text-gray-400 flex items-center gap-1">
             {flag} {country} • {date}
           </span>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
      </div>
    </div>
    <p className="text-gray-700 italic text-sm leading-relaxed mb-4 flex-grow">"{text}"</p>
    <div className="mt-auto flex items-center text-xs text-green-700 font-bold bg-green-50 w-fit px-2 py-1 rounded-md">
      <Check size={12} className="mr-1" /> Zweryfikowany Zakup
    </div>
  </div>
);

const Reviews: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
           <div className="text-5xl font-black text-gray-900">4.9<span className="text-2xl text-gray-400">/5</span></div>
           <div className="flex flex-col items-center md:items-start">
              <div className="flex text-yellow-400 mb-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <p className="text-gray-500 text-sm font-medium">Na podstawie <span className="underline">1 248 opinii</span> klientów</p>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ReviewCard
            name="Marek Kowalski"
            country="Polska"
            flag="🇵🇱"
            date="2 dni temu"
            text="Szczerze, byłem sceptyczny ze względu na cenę. Ale odkurza lepiej niż mój stary iRobot za 1800 zł. Sierść psa już nie jest problemem."
          />
          <ReviewCard
            name="Anna Wiśniewska"
            country="Polska"
            flag="🇵🇱"
            date="tydzień temu"
            text="Dotarł w 24 godziny. Mycie nie jest tak głębokie jak ręczne, ale do codziennego utrzymania czystości jest idealny. Polecam!"
          />
          <ReviewCard
            name="Piotr Nowak"
            country="Polska"
            flag="🇵🇱"
            date="3 dni temu"
            text="Bateria nie do zdarcia. Czyści całe moje 80m² mieszkanie i jeszcze zostaje ładunek. Najlepszy zakup roku dla żony (i dla mnie)."
          />
        </div>
      </div>
    </section>
  );
};

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string; detail?: string }> = ({ icon, label, value, detail }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors">
    <div className="text-brand-orange p-2 bg-orange-50 rounded-lg text-orange-600">
      {icon}
    </div>
    <div>
      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="font-bold text-gray-900 text-lg">{value}</div>
      {detail && <div className="text-xs text-gray-400 mt-1">{detail}</div>}
    </div>
  </div>
);

const TechSpecs: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Specyfikacja Techniczna</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Komponenty klasy przemysłowej zaprojektowane na ponad 10 lat użytkowania.
            Porównaj z modelami za 4000 zł.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpecItem
            icon={<Gauge size={24} />}
            label="Moc Ssania"
            value="6000 Pa"
            detail="Silnik Brushless Nidec™ (Japonia)"
          />
          <SpecItem
            icon={<Battery size={24} />}
            label="Bateria"
            value="5200 mAh"
            detail="Do 180 min ciągłej pracy"
          />
          <SpecItem
            icon={<Cpu size={24} />}
            label="Nawigacja"
            value="LiDAR LDS 4.0"
            detail="Mapowanie Laserowe 360° + SLAM AI"
          />
           <SpecItem
            icon={<Volume2 size={24} />}
            label="Głośność"
            value="< 55 dB"
            detail="Tryb Nocny Ultra-Cichy"
          />
          <SpecItem
            icon={<Wifi size={24} />}
            label="Łączność"
            value="WiFi 2.4/5 GHz"
            detail="Kompatybilny z Alexa, Google Home i App"
          />
           <SpecItem
            icon={<Layers size={24} />}
            label="Pojemność Kurzu"
            value="3 Litry (Stacja)"
            detail="400ml wewnętrzny zbiornik robota"
          />
          <SpecItem
            icon={<Maximize size={24} />}
            label="Pokonywanie Przeszkód"
            value="20 mm"
            detail="Koła Off-Road antypoślizgowe"
          />
          <SpecItem
            icon={<Shield size={24} />}
            label="Filtracja"
            value="HEPA H13"
            detail="Zatrzymuje 99,97% mikrocząstek"
          />
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-xs text-gray-400">
           * Specyfikacja zweryfikowana w niezależnym laboratorium TÜV Rheinland. Certyfikacja CE/RoHS w zestawie.
        </div>
      </div>
    </section>
  );
};

const Guarantee: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-orange-50 border-y border-orange-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-orange-500 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-300">
              <span className="text-orange-500 font-black text-3xl md:text-4xl">30</span>
              <span className="text-gray-900 font-bold text-xs uppercase tracking-wider">Dni na</span>
              <span className="text-orange-500 font-bold text-sm uppercase">Test</span>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase italic">
              100% Satysfakcji lub Zwrot Pieniędzy
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Wiemy, że zakupy online mogą być stresujące. Dlatego dajemy Ci <span className="font-bold">30 dni</span> na przetestowanie NovaClean X1 w domu. Jeśli nie czyści tak, jak obiecujemy, lub po prostu nie podoba Ci się kolor, odbierzemy go i zwrócimy każdą złotówkę.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <ShieldCheck className="text-green-500" /> Bez Ryzyka
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <RefreshCw className="text-blue-500" /> Darmowy Zwrot
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <ThumbsUp className="text-orange-500" /> Wsparcie PL
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-900 text-lg pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-orange-500 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Czy dobrze radzi sobie z sierścią zwierząt?",
      answer: "Absolutnie tak. Centralna szczotka w kształcie V i potężne ssanie cyklonowe zostały zaprojektowane specjalnie do wyłapywania sierści psów i kotów bez plątania."
    },
    {
      question: "Gdzie mogę znaleźć części zamienne?",
      answer: "Oferujemy zestawy części zamiennych (szczotki, filtry HEPA, ściereczki) bezpośrednio na naszej stronie w cenach fabrycznych. Dodatkowo komponenty są uniwersalne i łatwo dostępne."
    },
    {
      question: "Czy gwarancja obejmuje usterki?",
      answer: "Tak, oferujemy 2-letnią Gwarancję Bezpośrednią. Jeśli robot ma wadę techniczną, wymienimy go bezpłatnie na nowy. 100% polskie wsparcie."
    },
    {
      question: "Jak działa płatność przy odbiorze?",
      answer: "To bardzo proste. Zamawiasz teraz, wypełniając formularz, nie płacisz nic online. Zapłacisz gotówką bezpośrednio kurierowi przy dostawie paczki (zwykle w ciągu 24/48 godzin)."
    },
    {
      question: "Czy potrzebuje WiFi do działania?",
      answer: "Nie! Robot działa doskonale po prostu naciskając przycisk 'Start' lub używając dołączonego pilota. Aplikacja WiFi to opcjonalny dodatek dla tych, którzy chcą programować go poza domem."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <HelpCircle className="text-orange-500 w-8 h-8" />
          <h2 className="text-3xl font-bold text-center text-gray-900">Często Zadawane Pytania</h2>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      // Get optional form fields
      const postalCodeInput = e.currentTarget.querySelector('input[name="postal-code"]') as HTMLInputElement;
      const postalCode = postalCodeInput?.value || '';
      const addressLevel2Input = e.currentTarget.querySelector('input[name="address-level2"]') as HTMLInputElement;
      const addressLevel2 = addressLevel2Input?.value || '';

      const params = new URLSearchParams({
        uid: '0191dbf2-738a-7d28-82a0-18c3859d5e8f',
        key: '151af1e45a084aaf75c15f',
        offer: '1257',
        lp: '1276',
        name: formData.name,
        tel: formData.phone,
        'street-address': formData.address,
        tmfp: tmfp,
      });

      // Add postal-code if present
      if (postalCode) {
        params.append('postal-code', postalCode);
      }

      // Add ip and ua only if fingerprint is missing
      if (!tmfp) {
        params.append('ua', navigator.userAgent);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmContent = urlParams.get('utm_content');
      const utmTerm = urlParams.get('utm_term');
      const subid = urlParams.get('subid');
      const subid2 = urlParams.get('subid2');
      const subid3 = urlParams.get('subid3');
      const subid4 = urlParams.get('subid4');
      const pubid = urlParams.get('pubid');

      if (addressLevel2) params.append('address-level2', addressLevel2);
      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);
      if (subid) params.append('subid', subid);
      if (subid2) params.append('subid2', subid2);
      if (subid3) params.append('subid3', subid3);
      if (subid4) params.append('subid4', subid4);
      if (pubid) params.append('pubid', pubid);

      const response = await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      console.log('[Network API] Response status:', response.status);

      router.push('/ty/ty-fb-robot-asp-pl-unc');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-robot-asp-pl-unc');
    }
  };

  return (
    <section id="order-form" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-orange-100">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-500 relative">

        <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse">
           🔥 Duże zainteresowanie: Tylko 3 sztuki ze Stacją OMNI w zestawie!
        </div>

        <div className="bg-white p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Formularz Zamówienia</h3>
            <p className="text-gray-500">Wypełnij poniżej, aby otrzymać kompletny pakiet.</p>
          </div>

          <div className="bg-orange-50 rounded-xl border-2 border-orange-500 p-5 mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">LIMITOWANA OFERTA</div>

             <div className="flex items-center gap-4 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                   <Package size={32} className="text-orange-500" />
                </div>
                <div>
                   <h4 className="font-black text-xl text-gray-900">NovaClean X1 ZESTAW</h4>
                   <div className="text-sm text-gray-600">Robot + Stacja + Akcesoria</div>
                </div>
             </div>

             <div className="space-y-2 border-t border-orange-200 pt-3 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                   <span>NovaClean Robot X1</span>
                   <span>789 PLN</span>
                </div>
                <div className="flex justify-between items-center font-bold text-orange-500">
                   <span className="flex items-center gap-1"><Sparkles size={14} /> Stacja Omni-Clean</span>
                   <span className="bg-orange-500 text-white px-1 rounded text-xs">GRATIS</span>
                </div>
                <div className="flex justify-between items-center font-bold text-green-600">
                   <span className="flex items-center gap-1"><Truck size={14} /> Dostawa Express</span>
                   <span className="bg-green-600 text-white px-1 rounded text-xs">GRATIS</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold">
                   <span>Rabat Promocyjny</span>
                   <span>- 450 PLN</span>
                </div>
             </div>

             <div className="flex justify-between items-end border-t-2 border-orange-200 mt-3 pt-2">
                <div className="text-xs text-gray-500 font-medium">Do zapłaty<br/>przy odbiorze:</div>
                <div className="text-3xl font-black text-green-700">339 PLN</div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tmfp" />

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Imię i Nazwisko</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="Np: Jan Kowalski"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Telefon (dla kuriera)</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="Np: +48 600 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Pełny Adres</label>
              <input
                type="text"
                name="address"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-medium text-gray-900"
                placeholder="ul. Przykładowa 10, 00-001 Warszawa"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 border-2 border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between cursor-pointer relative">
               <div className="absolute -top-3 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">METODA PŁATNOŚCI</div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Płatność przy Odbiorze</span>
               </div>
               <CreditCard className="text-green-600 opacity-50" />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-black text-xl py-5 rounded-xl shadow-xl shadow-orange-500/40 transform hover:scale-[1.01] transition-all duration-200 uppercase flex justify-center items-center gap-2 group"
            >
              ZAMÓW ZA 339 PLN
              <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                 <Truck size={20} />
              </span>
            </button>

            <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mt-4">
               <Lock size={12} /> Twoje dane są bezpieczne i szyfrowane SSL 256-bit
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/* --- MAIN PAGE COMPONENT --- */

export default function NovaCleanLandingPL() {
  const [viewers, setViewers] = useState(12);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newVal = prev + change;
        return newVal < 8 ? 8 : newVal > 25 ? 25 : newVal;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'features', label: 'Funkcje' },
    { id: 'station', label: 'Stacja' },
    { id: 'reviews', label: 'Opinie' },
    { id: 'specs', label: 'Specyfikacja' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <>
      <Script
        src="https://offers.uncappednetwork.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <img
        src="https://offers.uncappednetwork.com/forms/api/ck/?o=1257&uid=0191dbf2-738a-7d28-82a0-18c3859d5e8f&lp=1276"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="min-h-screen pb-24 md:pb-0 font-sans text-gray-900 bg-gray-50">

        <div className="fixed top-24 right-4 z-40 bg-white/90 backdrop-blur shadow-lg rounded-full px-4 py-2 border border-gray-200 hidden md:flex items-center gap-2 animate-fade-in-up pointer-events-none">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold text-gray-700"><span className="text-gray-900">{viewers}</span> osób ogląda tę stronę</span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg flex items-center justify-center text-white font-black italic text-lg">N</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">NovaClean <span className="text-orange-500">X1</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
             {navLinks.map(link => (
               <button
                 key={link.id}
                 onClick={() => scrollToSection(link.id)}
                 className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
               >
                 {link.label}
               </button>
             ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full items-center gap-1 shadow-inner border border-green-200">
              <CheckCircle size={14} /> DARMOWA DOSTAWA
            </div>
            <button onClick={() => scrollToSection('order-form')} className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-transform active:scale-95">
              ZAMÓW TERAZ
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl md:hidden flex flex-col animate-fade-in-down origin-top">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="py-4 px-6 text-left font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500 border-b border-gray-50 last:border-none transition-colors flex justify-between items-center"
              >
                {link.label}
                <ArrowDown size={16} className="-rotate-90 opacity-30" />
              </button>
            ))}
            <div className="p-4 bg-gray-50">
               <button
                 onClick={() => scrollToSection('order-form')}
                 className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
               >
                 PRZEJDŹ DO OFERTY
               </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <div className="relative bg-[#111] text-white pt-10 pb-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-4 animate-pulse shadow-[0_0_15px_rgba(211,47,47,0.5)]">
              ⚠️ BŁYSKAWICZNA OFERTA: STACJA OMNI GRATIS
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
              NIGDY GO NIE DOTYKAJ.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">SAM SIĘ CZYŚCI.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Robot, który Odkurza, Myje i <span className="text-white font-bold underline decoration-orange-500">Sam się Opróżnia</span>. Technologia za 3500 zł, dziś w cenie obiadu.
            </p>

            <div className="mb-8 relative group perspective-1000">
              <HeroCarousel />

              <div className="absolute top-4 right-4 md:-right-4 bg-white text-gray-900 p-4 rounded-xl shadow-2xl transform rotate-3 border-4 border-orange-500 z-30">
                <div className="text-xs text-gray-500 font-bold uppercase">Wartość Zestawu 1578 PLN</div>
                <div className="text-sm text-gray-500">Cena regularna <span className="line-through text-gray-400 decoration-red-500 decoration-2">789 PLN</span></div>
                <div className="text-4xl font-black text-green-700 tracking-tighter">339<span className="text-xl align-top"> PLN</span></div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mb-10 gap-4">
              <CountdownTimer />
            </div>

            <button
              onClick={() => scrollToSection('order-form')}
              className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-2xl px-8 py-6 rounded-full shadow-[0_0_40px_rgba(255,87,34,0.6)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto ring-4 ring-orange-500/30"
            >
              ZAMÓW ZANIM SIĘ SKOŃCZY
              <ArrowDown size={32} className="animate-bounce" />
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> Płatność przy Odbiorze</span>
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> 2 Lata Gwarancji</span>
               <span className="flex items-center gap-1"><CheckCircle size={16} className="text-orange-500" /> Satysfakcja lub Zwrot</span>
            </div>
          </div>
        </div>

        <section className="py-16 px-4 bg-white">
           <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                 <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                    <h3 className="flex items-center gap-2 text-red-600 font-bold text-xl mb-4">
                       <X size={24} className="bg-red-200 rounded-full p-1" />
                       Stara Metoda
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                       <li className="flex gap-2">❌ Opróżnianie pojemnika za każdym razem.</li>
                       <li className="flex gap-2">❌ Ręczne mycie brudnego mopa.</li>
                       <li className="flex gap-2">❌ Kurz wraca po godzinie.</li>
                       <li className="flex gap-2">❌ Ogłuszający hałas odkurzacza.</li>
                    </ul>
                 </div>
                 <div className="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">NOVA CLEAN</div>
                    <h3 className="flex items-center gap-2 text-green-700 font-bold text-xl mb-4">
                       <CheckCircle size={24} className="bg-green-200 rounded-full p-1" />
                       Twoje Nowe Życie
                    </h3>
                    <ul className="space-y-3 text-gray-700 font-medium">
                       <li className="flex gap-2">✅ Auto-opróżnianie na 60 dni.</li>
                       <li className="flex gap-2">✅ Automatycznie myty mop.</li>
                       <li className="flex gap-2">✅ Dom zawsze gotowy na gości.</li>
                       <li className="flex gap-2">✅ Więcej wolnego czasu dla Ciebie i rodziny.</li>
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        <div id="features">
          <Features />
        </div>

        <div id="station">
          <StationUpgrade />
        </div>

        <section className="py-16 px-4 bg-white border-t border-gray-100">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Co otrzymujesz za tylko 339 PLN?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col md:flex-row items-center gap-8">
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse z-10">WSZYSTKO W ZESTAWIE</div>
                    <img src="/images/robot-asp/1.png" className="rounded-xl shadow-lg w-full" alt="Zawartość opakowania" />
                 </div>
                 <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Zestaw "Ultimate Clean"</h3>
                    <ul className="space-y-3">
                       <li className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg shadow-sm border border-orange-200">
                          <CheckCircle size={18} className="text-orange-500" />
                          <span className="font-bold">1x NovaStation™ Omni (Wartość 789 PLN)</span>
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 1x NovaClean X1 Robot
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 1x Pilot (Baterie w zestawie)
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 2x Dodatkowe Szczotki Boczne
                       </li>
                       <li className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          <CheckCircle size={18} className="text-green-500" /> 2x Worki na Kurz 3L
                       </li>
                    </ul>
                    <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200 inline-block">
                       🎁 BONUS: Ekspresowa Dostawa Ubezpieczona (Gratis)
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="py-16 px-4 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Jak mamy taką cenę?</h2>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
               <div className="flex flex-col md:grid md:grid-cols-5 gap-4 items-center justify-center">

                  <div className="col-span-2 w-full">
                     <div className="text-gray-400 text-sm mb-2 font-mono">ZNANE MARKI</div>
                     <div className="flex justify-between items-center text-xs text-gray-500 mb-1 px-4">
                        <span>Fabryka</span>
                        <span>Marketing</span>
                        <span>Sklepy</span>
                     </div>
                     <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex w-full">
                        <div className="w-1/4 bg-gray-500"></div>
                        <div className="w-2/4 bg-red-500"></div>
                        <div className="w-1/4 bg-red-700"></div>
                     </div>
                     <div className="mt-2 text-red-400 font-bold text-xl">2000 - 4000 PLN</div>
                  </div>

                  <div className="col-span-1 flex justify-center items-center my-4 md:my-0">
                     <div className="w-10 h-10 rounded-full bg-white text-gray-900 font-black flex items-center justify-center shadow-lg text-sm">VS</div>
                  </div>

                  <div className="col-span-2 w-full transform md:scale-110 transition-transform">
                     <div className="text-orange-500 text-sm mb-2 font-bold tracking-widest">NOVACLEAN</div>
                     <div className="flex justify-between items-center text-xs text-gray-300 mb-1 px-4">
                        <span>Fabryka</span>
                        <span>Ty</span>
                     </div>
                     <div className="h-6 bg-gray-800 rounded-full overflow-hidden flex w-full border border-orange-500 shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                        <div className="w-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">DIRECT TO CONSUMER</div>
                     </div>
                     <div className="mt-2 text-green-600 font-black text-3xl">339 PLN</div>
                  </div>
               </div>
            </div>

            <p className="mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
               Wyeliminowaliśmy koszty brandingu, reklam telewizyjnych i pośredników. Płacisz tylko za technologię, nie za logo.
            </p>
          </div>
        </section>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="specs">
          <TechSpecs />
        </div>

        <Guarantee />

        <div id="faq">
          <FAQ />
        </div>

        <OrderForm />
      </main>


      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:hidden z-50 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] pb-safe transition-transform duration-300">
        <div className="flex items-center gap-3">
           <div className="flex-1">
              <div className="text-[10px] text-red-500 font-bold animate-pulse uppercase tracking-wider">⚡ Tylko 7 sztuk</div>
              <div className="text-2xl font-black text-green-700 leading-none">339<span className="text-sm"> PLN</span></div>
           </div>
           <button
             onClick={() => scrollToSection('order-form')}
             className="flex-[1.5] bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
           >
             ZAMÓW
             <ArrowDown size={20} className="animate-bounce" />
           </button>
        </div>
      </div>
      </div>
    </>
  );
}
