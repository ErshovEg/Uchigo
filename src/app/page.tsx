'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchTeacherForm } from '@/components/SearchTeacherForm';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Платформа для преподавателей и учеников
          </h1>
          <p className="text-xl mb-8">
            Платформа позволяет преподавателям бесплатно создать свою страницу с учебными материалами. 
            Ученик получает доступ по коду, который даёт преподаватель.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
            >
              <Link href="/register">Стать преподавателем</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Link href="/login">Войти</Link>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Найти преподавателя</h2>
          <SearchTeacherForm onError={setError} />
          {error && (
            <p className="text-red-500 mt-4 text-center">{error}</p>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 