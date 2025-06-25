'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from './components/ui/buttons';
import Card from './components/ui/card';
import Input from './components/ui/input';

const categories = [
  { name: 'Infusi e Tisane', image: '/images/categorie/infusi.jpg' },
  { name: 'Oli Essenziali', image: '/images/categorie/oli.jpg' },
  { name: 'Integratori', image: '/images/categorie/integratori.jpg' },
  { name: 'Cosmetici Naturali', image: '/images/categorie/cosmetici.jpg' },
];

const featuredProducts = [
  { title: 'Keto Brucia', price: '€49,90', image: '/images/prodotti/keto-brucia.png' },
  { title: 'Dolor Fix', price: '€42,50', image: '/images/prodotti/dolor-fix.png' },
  { title: 'Varico Lift', price: '€55,50', image: '/images/prodotti/varico-lift.jpg' },
  { title: 'Glutei Fit', price: '€58,00', image: '/images/prodotti/glutei-fit.png' },
];

const testimonials = [
  { name: 'Sara B.', feedback: 'Prodotti di altissima qualità, servizio eccellente!', avatar: '/images/testimonial/sara.webp' },
  { name: 'Marco R.', feedback: 'L’erboristeria più fornita e professionale che conosca.', avatar: '/images/testimonial/marco.webp' },
  { name: 'Elena G.', feedback: 'Consiglio vivamente per la varietà di tisane e integratori.', avatar: '/images/testimonial/federica.png' },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <section
        className="w-full h-screen bg-center bg-cover relative"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Benvenuti all'Erboristeria Urbino
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Scopri i benefici della natura attraverso le nostre selezioni di erbe, infusi e prodotti biologici.
          </motion.p>

          <Button size="lg" className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg">
            Scopri Ora
          </Button>
        </div>
      </section>



      {/* Featured Products */}
      <section className="bg-white py-16 px-6 w-full max-w-7xl">
        <h2 className="text-3xl font-semibold text-center mb-8">Prodotti in Evidenza</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <Card key={prod.title} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={prod.image} alt={prod.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium">{prod.title}</h3>
                <p className="mt-2 font-semibold text-green-700">{prod.price}</p>
                <Button className="mt-4 w-full py-2 rounded-lg">Acquista</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-8">Cosa Dicono di Noi</h2>
        <motion.div
          className="flex overflow-x-auto space-x-6 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[300px] flex-shrink-0 p-6 bg-white rounded-2xl shadow-lg">
              <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-full mx-auto" />
              <p className="mt-4 italic">“{t.feedback}”</p>
              <h4 className="mt-4 font-medium">- {t.name}</h4>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-700 text-white py-12 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Rimani Aggiornato</h2>
          <p className="mb-6">Iscriviti alla nostra newsletter per offerte esclusive e novità naturali.</p>
          <div className="flex justify-center">
            <Input placeholder="La tua email" className="rounded-l-md border-0 focus:outline-none p-3 w-full max-w-sm" />
            <Button className="p-3 rounded-r-md">Iscriviti</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Erboristeria Urbino</h4>
            <p>Via Manzoni 12</p>
            <p>Email: info@erboristeriaurbino.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Link Utili</h4>
            <ul>
              <li className="hover:text-white"><a href="#">Chi Siamo</a></li>
              <li className="hover:text-white"><a href="#">Prodotti</a></li>
              <li className="hover:text-white"><a href="#">Contatti</a></li>
              <li className="hover:text-white"><a href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Seguici</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-6">© {new Date().getFullYear()} Erboristeria Agrigento - Tutti i diritti riservati.</div>
      </footer>
    </main>
  );
}
